import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create zones
  const zones = await Promise.all([
    prisma.zone.create({
      data: {
        name: 'Zone 1',
        description: 'Corn Field',
        area: 2500,
        isActive: true,
      },
    }),
    prisma.zone.create({
      data: {
        name: 'Zone 2',
        description: 'Wheat Field',
        area: 3000,
        isActive: true,
      },
    }),
    prisma.zone.create({
      data: {
        name: 'Zone 3',
        description: 'Vegetable Garden',
        area: 1500,
        isActive: true,
      },
    }),
    prisma.zone.create({
      data: {
        name: 'Zone 4',
        description: 'Fruit Orchard',
        area: 2000,
        isActive: true,
      },
    }),
  ]);

  console.log('Created zones:', zones.length);

  // Create sensors for each zone
  const sensors = [];
  for (let i = 0; i < zones.length; i++) {
    const zone = zones[i];
    
    // Define GPS coordinates for each zone's moisture sensor
    const zoneCoordinates = [
      {
        moisture: '12.9232000,77.5017000'
      },
      {
        moisture: '12.9232200,77.5019000'
      },
      {
        moisture: '12.9230300,77.5019000'
      },
      {
        moisture: '12.9230300,77.5017000'
      }
    ];

    const coords = zoneCoordinates[i]; // Use loop index directly

    // Moisture sensor
    const moistureSensor = await prisma.sensor.create({
      data: {
        name: `Moisture Sensor ${zone.id}`,
        type: 'MOISTURE',
        location: coords.moisture,
        isActive: true,
        zoneId: zone.id,
      },
    });

    sensors.push(moistureSensor);

    // Create readings for the moisture sensor
    await prisma.reading.create({
      data: {
        sensorId: moistureSensor.id,
        value: Math.floor(Math.random() * 30) + 40, // 40-70%
        unit: '%',
      },
    });
  }

  console.log('Created sensors:', sensors.length);

  // Create valves for each zone
  const valves = await Promise.all([
    prisma.valve.create({
      data: {
        name: 'Valve 1',
        isOpen: Math.random() > 0.7,
        flowRate: Math.random() * 5 + 1,
        location: '12.9232000,77.5017000',
        isActive: true,
        zoneId: zones[0].id,
      },
    }),
    prisma.valve.create({
      data: {
        name: 'Valve 2',
        isOpen: Math.random() > 0.7,
        flowRate: Math.random() * 5 + 1,
        location: '12.9232200,77.5019000',
        isActive: true,
        zoneId: zones[1].id,
      },
    }),
    prisma.valve.create({
      data: {
        name: 'Valve 3',
        isOpen: Math.random() > 0.7,
        flowRate: Math.random() * 5 + 1,
        location: '12.9230300,77.5019000',
        isActive: true,
        zoneId: zones[2].id,
      },
    }),
    prisma.valve.create({
      data: {
        name: 'Valve 4',
        isOpen: Math.random() > 0.7,
        flowRate: Math.random() * 5 + 1,
        location: '12.9230300,77.5017000',
        isActive: true,
        zoneId: zones[3].id,
      },
    }),
  ]);

  console.log('Created valves:', valves.length);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 