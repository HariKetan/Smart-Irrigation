import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create zones
  const zone1 = await prisma.zone.create({
    data: {
      name: 'North Field',
      description: 'Main irrigation zone for the north field',
      area: 5000.0
    }
  });

  const zone2 = await prisma.zone.create({
    data: {
      name: 'South Field',
      description: 'Secondary irrigation zone for the south field',
      area: 3000.0
    }
  });

  const zone3 = await prisma.zone.create({
    data: {
      name: 'Greenhouse',
      description: 'Controlled environment greenhouse',
      area: 500.0
    }
  });

  console.log('✅ Zones created');

  // Create sensors
  const sensors = await Promise.all([
    prisma.sensor.create({
      data: {
        name: 'Moisture Sensor 1',
        type: 'MOISTURE',
        location: 'North Field - Center',
        zoneId: zone1.id
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'Temperature Sensor 1',
        type: 'TEMPERATURE',
        location: 'North Field - Center',
        zoneId: zone1.id
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'Humidity Sensor 1',
        type: 'HUMIDITY',
        location: 'North Field - Center',
        zoneId: zone1.id
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'Moisture Sensor 2',
        type: 'MOISTURE',
        location: 'South Field - East',
        zoneId: zone2.id
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'PH Sensor 1',
        type: 'PH',
        location: 'Greenhouse - Zone A',
        zoneId: zone3.id
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'Water Flow Sensor 1',
        type: 'WATER_FLOW',
        location: 'Main Pipeline',
        zoneId: null
      }
    })
  ]);

  console.log('✅ Sensors created');

  // Create sample readings for each sensor
  const readings = [];
  const now = new Date();

  for (const sensor of sensors) {
    // Create 10 sample readings for each sensor
    for (let i = 0; i < 10; i++) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000)); // Each hour back
      
      let value: number;
      let unit: string;

      switch (sensor.type) {
        case 'MOISTURE':
          value = Math.random() * 100; // 0-100%
          unit = '%';
          break;
        case 'TEMPERATURE':
          value = 15 + Math.random() * 25; // 15-40°C
          unit = '°C';
          break;
        case 'HUMIDITY':
          value = 30 + Math.random() * 50; // 30-80%
          unit = '%';
          break;
        case 'PH':
          value = 6.0 + Math.random() * 2; // 6.0-8.0
          unit = 'pH';
          break;
        case 'NUTRIENT':
          value = Math.random() * 1000; // 0-1000 ppm
          unit = 'ppm';
          break;
        case 'WATER_FLOW':
          value = Math.random() * 10; // 0-10 L/min
          unit = 'L/min';
          break;
        default:
          value = Math.random() * 100;
          unit = 'units';
      }

      readings.push({
        sensorId: sensor.id,
        value: parseFloat(value.toFixed(2)),
        unit,
        timestamp
      });
    }
  }

  await prisma.reading.createMany({
    data: readings
  });

  console.log('✅ Sample readings created');

  // Create irrigation schedules
  await Promise.all([
    prisma.irrigationSchedule.create({
      data: {
        zoneId: zone1.id,
        startTime: new Date('2024-01-01T06:00:00Z'),
        duration: 30,
        frequency: 'daily'
      }
    }),
    prisma.irrigationSchedule.create({
      data: {
        zoneId: zone2.id,
        startTime: new Date('2024-01-01T18:00:00Z'),
        duration: 20,
        frequency: 'daily'
      }
    }),
    prisma.irrigationSchedule.create({
      data: {
        zoneId: zone3.id,
        startTime: new Date('2024-01-01T08:00:00Z'),
        duration: 15,
        frequency: 'twice_daily'
      }
    })
  ]);

  console.log('✅ Irrigation schedules created');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 