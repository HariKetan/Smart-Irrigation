import cron from 'node-cron';
import { SchedulingService } from './SchedulingService';
import { prisma } from '../lib/prisma';

export class CronService {
  private static instance: CronService;
  private isRunning = false;

  private constructor() {}

  static getInstance(): CronService {
    if (!CronService.instance) {
      CronService.instance = new CronService();
    }
    return CronService.instance;
  }

  // Start the cron service
  start(): void {
    if (this.isRunning) {
      console.log('⚠️ Cron service is already running');
      return;
    }

    console.log('🚀 Starting irrigation scheduling cron service...');

    // Check for scheduled irrigations every minute
    cron.schedule('* * * * *', async () => {
      await this.checkAndExecuteSchedules();
    }, {
      timezone: 'UTC'
    });

    // Clean up old scheduled irrigations daily at 2 AM
    cron.schedule('0 2 * * *', async () => {
      await this.cleanupOldScheduledIrrigations();
    }, {
      timezone: 'UTC'
    });

    // Generate upcoming scheduled irrigations daily at 3 AM
    cron.schedule('0 3 * * *', async () => {
      await this.generateUpcomingScheduledIrrigations();
    }, {
      timezone: 'UTC'
    });

    this.isRunning = true;
    console.log('✅ Cron service started successfully');
  }

  // Stop the cron service
  stop(): void {
    if (!this.isRunning) {
      console.log('⚠️ Cron service is not running');
      return;
    }

    cron.getTasks().forEach(task => task.stop());
    this.isRunning = false;
    console.log('🛑 Cron service stopped');
  }

  // Check and execute scheduled irrigations
  private async checkAndExecuteSchedules(): Promise<void> {
    try {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
      const currentDay = now.getDay(); // 0-6 (Sunday-Saturday)
      const currentDate = now.getDate(); // 1-31

      console.log(`🕐 Checking schedules at ${currentTime} (Day: ${currentDay}, Date: ${currentDate})`);

      // Get all active schedules
      const activeSchedules = await prisma.irrigationSchedule.findMany({
        where: { is_active: true }
      });

      for (const schedule of activeSchedules) {
        try {
          // Check if this schedule should run now
          if (this.shouldScheduleRun(schedule, currentTime, currentDay, currentDate)) {
            console.log(`🌱 Executing schedule: ${schedule.name}`);
            
            // Execute for each section
            for (const sectionNumber of schedule.section_numbers) {
              await this.executeScheduledIrrigation(schedule, sectionNumber, now);
            }
          }
        } catch (error) {
          console.error(`❌ Error processing schedule ${schedule.name}:`, error);
        }
      }
    } catch (error) {
      console.error('❌ Error in checkAndExecuteSchedules:', error);
    }
  }

  // Check if a schedule should run at the current time
  private shouldScheduleRun(schedule: any, currentTime: string, currentDay: number, currentDate: number): boolean {
    // Check if time matches
    if (schedule.start_time !== currentTime) {
      return false;
    }

    // Check frequency
    switch (schedule.frequency) {
      case 'daily':
        return true;
      
      case 'weekly':
        return schedule.days_of_week.includes(currentDay);
      
      case 'monthly':
        return schedule.day_of_month === currentDate;
      
      default:
        return false;
    }
  }

  // Execute a scheduled irrigation
  private async executeScheduledIrrigation(schedule: any, sectionNumber: number, scheduledTime: Date): Promise<void> {
    try {
      // Get the section using farm_id and section_number
      const section = await prisma.section.findFirst({
        where: {
          farm_id: schedule.farm_id,
          section_number: sectionNumber
        }
      });

      if (!section) {
        console.warn(`Section not found: Farm ${schedule.farm_id}, Section ${sectionNumber}`);
        return;
      }

      // Check if this irrigation was already executed today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const existingIrrigation = await prisma.scheduledIrrigation.findFirst({
        where: {
          schedule_id: schedule.id,
          section_id: section.id,
          scheduled_time: {
            gte: today,
            lt: tomorrow
          }
        }
      });

      if (existingIrrigation) {
        console.log(`⏭️ Skipping ${schedule.name} for section ${sectionNumber} - already executed today`);
        return;
      }

      // Create scheduled irrigation record
      const scheduledIrrigation = await prisma.scheduledIrrigation.create({
        data: {
          schedule_id: schedule.id,
          farm_id: schedule.farm_id,
          section_id: section.id,
          section_number: sectionNumber,
          scheduled_time: scheduledTime,
          status: 'pending',
          duration_minutes: schedule.duration_minutes
        }
      });

      console.log(`📝 Created scheduled irrigation record: ${scheduledIrrigation.id}`);

      // Execute the irrigation
      await SchedulingService.executeScheduledIrrigation(
        schedule.id,
        section.id,
        scheduledTime
      );

      console.log(`✅ Successfully executed ${schedule.name} for section ${sectionNumber}`);

    } catch (error) {
      console.error(`❌ Error executing scheduled irrigation for schedule ${schedule.name}, section ${sectionNumber}:`, error);
      
      // Mark as failed
      await prisma.scheduledIrrigation.updateMany({
        where: {
          schedule_id: schedule.id,
          section_number: sectionNumber,
          scheduled_time: scheduledTime
        },
        data: {
          status: 'failed'
        }
      });
    }
  }

  // Clean up old scheduled irrigations (older than 90 days)
  private async cleanupOldScheduledIrrigations(): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 90);

      const deletedCount = await prisma.scheduledIrrigation.deleteMany({
        where: {
          created_at: {
            lt: cutoffDate
          }
        }
      });

      console.log(`🧹 Cleaned up ${deletedCount.count} old scheduled irrigations`);
    } catch (error) {
      console.error('❌ Error cleaning up old scheduled irrigations:', error);
    }
  }

  // Generate upcoming scheduled irrigations for the next 7 days
  private async generateUpcomingScheduledIrrigations(): Promise<void> {
    try {
      const activeSchedules = await prisma.irrigationSchedule.findMany({
        where: { is_active: true }
      });

      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      for (const schedule of activeSchedules) {
        const upcomingTimes = this.generateUpcomingTimes(schedule, now, nextWeek);
        
        for (const scheduledTime of upcomingTimes) {
          // Generate scheduled irrigations for each section in the schedule
          for (const sectionNumber of schedule.section_numbers) {
            // Get the section using farm_id and section_number
            const section = await prisma.section.findFirst({
              where: {
                farm_id: schedule.farm_id,
                section_number: sectionNumber
              }
            });

            if (!section) {
              console.warn(`Section not found: Farm ${schedule.farm_id}, Section ${sectionNumber}`);
              continue;
            }

            // Create scheduled irrigation record
            await prisma.scheduledIrrigation.create({
              data: {
                schedule_id: schedule.id,
                farm_id: schedule.farm_id,
                section_id: section.id,
                section_number: sectionNumber,
                scheduled_time: scheduledTime,
                status: 'pending',
                duration_minutes: schedule.duration_minutes
              }
            });
          }
        }
      }

      console.log('📅 Generated upcoming scheduled irrigations for next 7 days');
    } catch (error) {
      console.error('❌ Error generating upcoming scheduled irrigations:', error);
    }
  }

  // Generate upcoming times for a schedule
  private generateUpcomingTimes(schedule: any, startDate: Date, endDate: Date): Date[] {
    const times: Date[] = [];
    const [hours, minutes] = schedule.start_time.split(':').map(Number);
    
    let currentDate = new Date(startDate);
    currentDate.setHours(hours, minutes, 0, 0);

    while (currentDate <= endDate) {
      let shouldInclude = false;

      switch (schedule.frequency) {
        case 'daily':
          shouldInclude = true;
          break;
        
        case 'weekly':
          shouldInclude = schedule.days_of_week.includes(currentDate.getDay());
          break;
        
        case 'monthly':
          shouldInclude = schedule.day_of_month === currentDate.getDate();
          break;
      }

      if (shouldInclude && currentDate > startDate) {
        times.push(new Date(currentDate));
      }

      // Move to next occurrence
      switch (schedule.frequency) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }

    return times;
  }

  // Manual trigger for testing
  async manualTrigger(): Promise<void> {
    console.log('🔧 Manual trigger initiated');
    await this.checkAndExecuteSchedules();
  }

  // Get service status
  getStatus(): { isRunning: boolean } {
    return { isRunning: this.isRunning };
  }
} 