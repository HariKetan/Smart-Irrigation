import { prisma } from '../lib/prisma';

// MQTT command sending function (placeholder - implement based on your MQTT setup)
async function sendMqttCommand(topic: string, command: any): Promise<void> {
  // TODO: Implement MQTT command sending
  console.log(`Sending MQTT command to ${topic}:`, command);
}

interface CreateScheduleData {
  name: string;
  farm_id: number;
  section_numbers: number[];
  start_time: string;
  duration_minutes: number;
  frequency: string;
  days_of_week?: number[];
  day_of_month?: number;
  is_active?: boolean;
  weather_dependent?: boolean;
  min_temperature?: number;
  max_temperature?: number;
  min_moisture?: number;
  created_by: string;
}

interface UpdateScheduleData {
  name?: string;
  farm_id?: number;
  section_numbers?: number[];
  start_time?: string;
  duration_minutes?: number;
  frequency?: string;
  days_of_week?: number[];
  day_of_month?: number;
  is_active?: boolean;
  weather_dependent?: boolean;
  min_temperature?: number;
  max_temperature?: number;
  min_moisture?: number;
}

export interface ScheduleWithNextRun {
  id: string;
  name: string;
  farm_id: number;
  section_numbers: number[];
  start_time: string;
  duration_minutes: number;
  frequency: string;
  days_of_week: number[];
  day_of_month?: number;
  is_active: boolean;
  weather_dependent: boolean;
  min_temperature?: number;
  max_temperature?: number;
  min_moisture?: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  next_run: Date;
  last_run?: Date;
}

export class SchedulingService {
  // Create a new irrigation schedule
  static async createSchedule(data: CreateScheduleData): Promise<any> {
    return await prisma.irrigationSchedule.create({
      data: {
        name: data.name,
        farm_id: data.farm_id,
        section_numbers: data.section_numbers,
        start_time: data.start_time,
        duration_minutes: data.duration_minutes,
        frequency: data.frequency,
        days_of_week: data.days_of_week || [],
        day_of_month: data.day_of_month,
        is_active: data.is_active ?? true,
        weather_dependent: data.weather_dependent ?? false,
        min_temperature: data.min_temperature,
        max_temperature: data.max_temperature,
        min_moisture: data.min_moisture,
        created_by: data.created_by
      }
    });
  }

  // Get all schedules for a farm
  static async getSchedules(farmId: number): Promise<ScheduleWithNextRun[]> {
    const schedules = await prisma.irrigationSchedule.findMany({
      where: { farm_id: farmId },
      orderBy: { created_at: 'desc' }
    });

    // Calculate next run times and get last runs
    const schedulesWithRuns = await Promise.all(schedules.map(async (schedule) => {
      const nextRun = this.calculateNextRun(schedule);
      const lastRun = await this.getLastRun(schedule.id);
      
              return {
          ...schedule,
          next_run: nextRun,
          last_run: lastRun,
          day_of_month: schedule.day_of_month || undefined,
          min_temperature: schedule.min_temperature || undefined,
          max_temperature: schedule.max_temperature || undefined,
          min_moisture: schedule.min_moisture || undefined
        };
    }));

    return schedulesWithRuns;
  }

  // Get a specific schedule
  static async getSchedule(scheduleId: string): Promise<any> {
    return await prisma.irrigationSchedule.findUnique({
      where: { id: scheduleId },
      include: {
        farm: true
      }
    });
  }

  // Update a schedule
  static async updateSchedule(scheduleId: string, data: Partial<CreateScheduleData>): Promise<any> {
    return await prisma.irrigationSchedule.update({
      where: { id: scheduleId },
      data: {
        name: data.name,
        section_numbers: data.section_numbers, // Assuming section_numbers are the IDs
        start_time: data.start_time,
        duration_minutes: data.duration_minutes,
        frequency: data.frequency,
        days_of_week: data.days_of_week,
        day_of_month: data.day_of_month,
        weather_dependent: data.weather_dependent,
        min_temperature: data.min_temperature,
        max_temperature: data.max_temperature,
        min_moisture: data.min_moisture,
        updated_at: new Date()
      }
    });
  }

  // Delete a schedule
  static async deleteSchedule(scheduleId: string): Promise<any> {
    return await prisma.irrigationSchedule.delete({
      where: { id: scheduleId }
    });
  }

  // Toggle schedule active status
  static async toggleSchedule(scheduleId: string): Promise<any> {
    const schedule = await prisma.irrigationSchedule.findUnique({
      where: { id: scheduleId }
    });

    if (!schedule) throw new Error('Schedule not found');

    return await prisma.irrigationSchedule.update({
      where: { id: scheduleId },
      data: { is_active: !schedule.is_active }
    });
  }

  // Get scheduled irrigations for a farm
  static async getScheduledIrrigations(farmId: number, options: {
    status?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  } = {}): Promise<any[]> {
    const where: any = { farm_id: farmId };
    
    if (options.status) {
      where.status = options.status;
    }
    
    if (options.startDate || options.endDate) {
      where.scheduled_time = {};
      if (options.startDate) where.scheduled_time.gte = options.startDate;
      if (options.endDate) where.scheduled_time.lte = options.endDate;
    }

    return await prisma.scheduledIrrigation.findMany({
      where,
      include: {
        schedule: true,
        section: true
      },
      orderBy: { scheduled_time: 'desc' },
      take: options.limit || 50,
      skip: options.offset || 0
    });
  }

  // Execute a scheduled irrigation
  static async executeScheduledIrrigation(scheduleId: string, sectionId: number, scheduledTime: Date): Promise<any> {
    try {
      // Get the schedule
      const schedule = await this.getSchedule(scheduleId);
      if (!schedule) throw new Error('Schedule not found');

      // Get the section to find section_number
      const section = await prisma.section.findUnique({
        where: { id: sectionId },
        select: { section_number: true }
      });

      if (!section) {
        throw new Error(`Section ${sectionId} not found`);
      }

      // Check weather conditions if weather dependent
      if (schedule.weather_dependent) {
        const shouldSkip = await this.checkWeatherConditions(schedule);
        if (shouldSkip) {
          return await this.markScheduledIrrigationSkipped(scheduleId, sectionId, scheduledTime, 'weather');
        }
      }

      // Check moisture conditions
      if (schedule.min_moisture) {
        const shouldSkip = await this.checkMoistureConditions(schedule, sectionId);
        if (shouldSkip) {
          return await this.markScheduledIrrigationSkipped(scheduleId, sectionId, scheduledTime, 'moisture');
        }
      }

      // Send MQTT command to start irrigation
      const mqttCommand = {
        action: 'irrigate',
        duration: schedule.duration_minutes * 60, // Convert to seconds
        mode: 'manual',
        timestamp: new Date().toISOString()
      };

      const topic = `farm/${schedule.farm_id}/section/${section.section_number}/command`;
      await sendMqttCommand(topic, mqttCommand);

      // Mark as executed
      return await this.markScheduledIrrigationExecuted(scheduleId, sectionId, scheduledTime);

    } catch (error) {
      console.error('Error executing scheduled irrigation:', error);
      return await this.markScheduledIrrigationFailed(scheduleId, sectionId, scheduledTime, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Calculate next run time for a schedule
  static calculateNextRun(schedule: any): Date {
    const now = new Date();
    const [hours, minutes] = schedule.start_time.split(':').map(Number);
    
    let nextRun = new Date();
    nextRun.setHours(hours, minutes, 0, 0);

    // If today's time has passed, move to next occurrence
    if (nextRun <= now) {
      switch (schedule.frequency) {
        case 'daily':
          nextRun.setDate(nextRun.getDate() + 1);
          break;
        case 'weekly':
          if (schedule.days_of_week && schedule.days_of_week.length > 0) {
            const currentDay = now.getDay();
            const nextDay = schedule.days_of_week.find((day: number) => day > currentDay) || schedule.days_of_week[0];
            const daysToAdd = nextDay > currentDay ? nextDay - currentDay : 7 - currentDay + nextDay;
            nextRun.setDate(nextRun.getDate() + daysToAdd);
          } else {
            nextRun.setDate(nextRun.getDate() + 7);
          }
          break;
        case 'monthly':
          if (schedule.day_of_month) {
            nextRun.setDate(schedule.day_of_month);
            if (nextRun <= now) {
              nextRun.setMonth(nextRun.getMonth() + 1);
            }
          } else {
            nextRun.setDate(nextRun.getDate() + 30);
          }
          break;
      }
    }

    return nextRun;
  }

  // Get last run time for a schedule
  static async getLastRun(scheduleId: string): Promise<Date | undefined> {
    const lastRun = await prisma.scheduledIrrigation.findFirst({
      where: { schedule_id: scheduleId },
      orderBy: { scheduled_time: 'desc' }
    });

    return lastRun?.scheduled_time;
  }

  // Check weather conditions
  static async checkWeatherConditions(schedule: any): Promise<boolean> {
    // TODO: Integrate with weather API
    // For now, return false (don't skip)
    return false;
  }

  // Check moisture conditions
  static async checkMoistureConditions(schedule: any, sectionId: number): Promise<boolean> {
    if (!schedule.min_moisture) return false;

    const latestReading = await prisma.moistureReading.findFirst({
      where: {
        farm_id: schedule.farm_id,
        section_id: sectionId
      },
      orderBy: { timestamp: 'desc' }
    });

    if (!latestReading) return false;

    return latestReading.value >= schedule.min_moisture;
  }

  // Mark scheduled irrigation as executed
  static async markScheduledIrrigationExecuted(scheduleId: string, sectionId: number, scheduledTime: Date): Promise<any> {
    // Get the section to find section_number
    const section = await prisma.section.findUnique({
      where: { id: sectionId },
      select: { section_number: true, farm_id: true }
    });

    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    return await prisma.scheduledIrrigation.create({
      data: {
        schedule_id: scheduleId,
        farm_id: section.farm_id,
        section_id: sectionId,
        section_number: section.section_number,
        scheduled_time: scheduledTime,
        executed_time: new Date(),
        status: 'executed',
        duration_minutes: 30, // TODO: Get from schedule
        created_at: new Date()
      }
    });
  }

  // Mark scheduled irrigation as skipped
  static async markScheduledIrrigationSkipped(scheduleId: string, sectionId: number, scheduledTime: Date, reason: string): Promise<any> {
    // Get the section to find section_number
    const section = await prisma.section.findUnique({
      where: { id: sectionId },
      select: { section_number: true, farm_id: true }
    });

    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    return await prisma.scheduledIrrigation.create({
      data: {
        schedule_id: scheduleId,
        farm_id: section.farm_id,
        section_id: sectionId,
        section_number: section.section_number,
        scheduled_time: scheduledTime,
        status: 'skipped',
        skip_reason: reason,
        duration_minutes: 30, // TODO: Get from schedule
        created_at: new Date()
      }
    });
  }

  // Mark scheduled irrigation as failed
  static async markScheduledIrrigationFailed(scheduleId: string, sectionId: number, scheduledTime: Date, error: string): Promise<any> {
    // Get the section to find section_number
    const section = await prisma.section.findUnique({
      where: { id: sectionId },
      select: { section_number: true, farm_id: true }
    });

    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    return await prisma.scheduledIrrigation.create({
      data: {
        schedule_id: scheduleId,
        farm_id: section.farm_id,
        section_id: sectionId,
        section_number: section.section_number,
        scheduled_time: scheduledTime,
        status: 'failed',
        skip_reason: error,
        duration_minutes: 30, // TODO: Get from schedule
        created_at: new Date()
      }
    });
  }

  // Get upcoming scheduled irrigations
  static async getUpcomingIrrigations(farmId: number, hours: number = 24): Promise<any[]> {
    const now = new Date();
    const endTime = new Date(now.getTime() + hours * 60 * 60 * 1000);

    return await prisma.scheduledIrrigation.findMany({
      where: {
        farm_id: farmId,
        scheduled_time: {
          gte: now,
          lte: endTime
        },
        status: 'pending'
      },
      include: {
        schedule: true,
        section: true
      },
      orderBy: { scheduled_time: 'asc' }
    });
  }

  // Get schedule statistics
  static async getScheduleStats(farmId: number, days: number = 30): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await prisma.scheduledIrrigation.groupBy({
      by: ['status'],
      where: {
        farm_id: farmId,
        scheduled_time: {
          gte: startDate
        }
      },
      _count: {
        status: true
      }
    });

    const totalScheduled = await prisma.scheduledIrrigation.count({
      where: {
        farm_id: farmId,
        scheduled_time: {
          gte: startDate
        }
      }
    });

    return {
      total: totalScheduled,
      byStatus: stats.reduce((acc, stat) => {
        acc[stat.status] = stat._count.status;
        return acc;
      }, {} as any)
    };
  }
} 