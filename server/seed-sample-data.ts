import { PrismaClient } from './src/generated/prisma';

const prisma = new PrismaClient();

async function seedSampleData() {
  console.log('🌱 Seeding sample data...');

  try {
    // Get existing farms and sections
    const farms = await prisma.farm.findMany();
    const sections = await prisma.section.findMany();

    if (farms.length === 0 || sections.length === 0) {
      console.log('❌ No farms or sections found. Please run the farm seed script first.');
      return;
    }

    console.log(`📊 Found ${farms.length} farms and ${sections.length} sections`);

    // Generate sample moisture readings for the last 7 days
    const moistureReadings: any[] = [];
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      
      for (const section of sections) {
        // Generate 4 readings per day (every 6 hours)
        for (let j = 0; j < 4; j++) {
          const readingTime = new Date(date.getTime() + j * 6 * 60 * 60 * 1000);
          const moistureValue = Math.floor(Math.random() * 40) + 20; // 20-60%
          
          moistureReadings.push({
            farm_id: section.farm_id,
            section_id: section.id,
            value: moistureValue,
            timestamp: readingTime
          });
        }
      }
    }

    // Generate sample irrigation events for the last 7 days
    const irrigationEvents: any[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      
      for (const section of sections) {
        // 50% chance of irrigation event per day
        if (Math.random() > 0.5) {
          const startTime = new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000);
          const duration = Math.floor(Math.random() * 30) + 10; // 10-40 minutes
          const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
          const waterMl = Math.floor(Math.random() * 5000) + 1000; // 1-6 liters
          
          irrigationEvents.push({
            farm_id: section.farm_id,
            section_id: section.id,
            start_time: startTime,
            end_time: endTime,
            water_ml: waterMl
          });
        }
      }
    }

    // Generate sample device status records
    const deviceStatuses: any[] = [];
    
    for (const section of sections) {
      const statusTime = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000);
      
      deviceStatuses.push({
        farm_id: section.farm_id,
        section_id: section.id,
        device_id: `device-${section.id}`,
        uptime: BigInt(Math.floor(Math.random() * 86400) + 3600), // 1-24 hours
        wifi: Math.random() > 0.1 ? 1 : 0, // 90% chance of wifi connection
        mqtt: Math.random() > 0.05 ? 1 : 0, // 95% chance of MQTT connection
        last_error: Math.random() > 0.8 ? 'Connection timeout' : '', // 20% chance of error
        valve_on: Math.random() > 0.7 ? 1 : 0, // 30% chance of valve being on
        mode: Math.random() > 0.5 ? 'auto' : 'manual',
        latest_moisture: Math.floor(Math.random() * 40) + 20,
        threshold: 30,
        pulse_count: Math.floor(Math.random() * 1000),
        water_ml: Math.floor(Math.random() * 5000),
        timestamp: BigInt(statusTime.getTime())
      });
    }

    // Insert all sample data
    console.log(`💧 Inserting ${moistureReadings.length} moisture readings...`);
    await prisma.moistureReading.createMany({
      data: moistureReadings,
      skipDuplicates: true
    });

    console.log(`🚿 Inserting ${irrigationEvents.length} irrigation events...`);
    await prisma.irrigationEvent.createMany({
      data: irrigationEvents,
      skipDuplicates: true
    });

    console.log(`📱 Inserting ${deviceStatuses.length} device status records...`);
    await prisma.irrigationDeviceStatus.createMany({
      data: deviceStatuses,
      skipDuplicates: true
    });

    console.log('✅ Sample data seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Moisture readings: ${moistureReadings.length}`);
    console.log(`   - Irrigation events: ${irrigationEvents.length}`);
    console.log(`   - Device status records: ${deviceStatuses.length}`);

  } catch (error) {
    console.error('❌ Error seeding sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSampleData(); 