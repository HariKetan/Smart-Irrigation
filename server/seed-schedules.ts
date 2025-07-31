import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function seedSchedules() {
  try {
    console.log('🌱 Seeding irrigation schedules...');

    // Morning irrigation schedule
    await prisma.irrigationSchedule.create({
      data: {
        name: 'Morning Irrigation',
        farm_id: 1,
        section_numbers: [1, 2, 3, 4],
        start_time: '06:00',
        duration_minutes: 30,
        frequency: 'daily',
        is_active: true,
        weather_dependent: true,
        min_temperature: 15,
        max_temperature: 35,
        min_moisture: 40,
        created_by: 'admin'
      }
    });

    // Evening irrigation schedule for sections 1 and 2
    await prisma.irrigationSchedule.create({
      data: {
        name: 'Evening Irrigation - Sections 1-2',
        farm_id: 1,
        section_numbers: [1, 2],
        start_time: '18:00',
        duration_minutes: 20,
        frequency: 'daily',
        is_active: true,
        weather_dependent: true,
        min_temperature: 10,
        max_temperature: 30,
        min_moisture: 35,
        created_by: 'admin'
      }
    });

    // Evening irrigation schedule for sections 3 and 4
    await prisma.irrigationSchedule.create({
      data: {
        name: 'Evening Irrigation - Sections 3-4',
        farm_id: 1,
        section_numbers: [3, 4],
        start_time: '19:00',
        duration_minutes: 20,
        frequency: 'daily',
        is_active: true,
        weather_dependent: true,
        min_temperature: 10,
        max_temperature: 30,
        min_moisture: 35,
        created_by: 'admin'
      }
    });

    // Weekly deep irrigation for all sections
    await prisma.irrigationSchedule.create({
      data: {
        name: 'Weekly Deep Irrigation',
        farm_id: 1,
        section_numbers: [1, 2, 3, 4],
        start_time: '08:00',
        duration_minutes: 60,
        frequency: 'weekly',
        days_of_week: [0], // Sunday
        is_active: true,
        weather_dependent: false,
        created_by: 'admin'
      }
    });

    // Create some sample scheduled irrigations
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const scheduledIrrigations = [
      {
        schedule_id: (await prisma.irrigationSchedule.findFirst({ where: { name: 'Morning Irrigation' } }))?.id || '',
        farm_id: 1,
        section_id: 1,
        scheduled_time: yesterday,
        executed_time: yesterday,
        status: 'executed',
        duration_minutes: 30,
        water_used: 15.5,
        created_at: yesterday
      },
      {
        schedule_id: (await prisma.irrigationSchedule.findFirst({ where: { name: 'Morning Irrigation' } }))?.id || '',
        farm_id: 1,
        section_id: 2,
        scheduled_time: yesterday,
        status: 'skipped',
        skip_reason: 'moisture',
        duration_minutes: 30,
        created_at: yesterday
      },
      {
        schedule_id: (await prisma.irrigationSchedule.findFirst({ where: { name: 'Evening Irrigation' } }))?.id || '',
        farm_id: 1,
        section_id: 1,
        scheduled_time: tomorrow,
        status: 'pending',
        duration_minutes: 20,
        created_at: now
      }
    ];

    for (const irrigationData of scheduledIrrigations) {
      if (irrigationData.schedule_id) {
        const irrigation = await prisma.scheduledIrrigation.create({
          data: irrigationData
        });
        console.log(`✅ Created scheduled irrigation: ${irrigation.status}`);
      }
    }

    console.log('🎉 Schedule seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding schedules:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSchedules(); 