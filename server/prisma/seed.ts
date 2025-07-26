import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create sensors directly (no zones)
  const sensors = await Promise.all([
    prisma.sensor.create({
      data: {
        name: 'Moisture Sensor 1',
        type: 'MOISTURE',
        location: '12.9232,77.5017',
        isActive: true
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'Moisture Sensor 2',
        type: 'MOISTURE',
        location: '12.9235,77.5020',
        isActive: true
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'Moisture Sensor 3',
        type: 'MOISTURE',
        location: '12.9238,77.5023',
        isActive: true
      }
    }),
    prisma.sensor.create({
      data: {
        name: 'Moisture Sensor 4',
        type: 'MOISTURE',
        location: '12.9241,77.5026',
        isActive: true
      }
    })
  ])

  console.log('Created sensors:', sensors.length)

  // Create readings for each sensor
  for (const sensor of sensors) {
    await prisma.reading.create({
      data: {
        sensorId: sensor.id,
        value: Math.random() * 100,
        unit: '%',
        timestamp: new Date()
      }
    })
  }

  console.log('Created readings for all sensors')

  // Create valves directly (no zones)
  const valves = await Promise.all([
    prisma.valve.create({
      data: {
        name: 'Valve 1',
        isOpen: false,
        flowRate: 0,
        location: '12.9232,77.5017',
        isActive: true
      }
    }),
    prisma.valve.create({
      data: {
        name: 'Valve 2',
        isOpen: false,
        flowRate: 0,
        location: '12.9235,77.5020',
        isActive: true
      }
    }),
    prisma.valve.create({
      data: {
        name: 'Valve 3',
        isOpen: false,
        flowRate: 0,
        location: '12.9238,77.5023',
        isActive: true
      }
    }),
    prisma.valve.create({
      data: {
        name: 'Valve 4',
        isOpen: false,
        flowRate: 0,
        location: '12.9241,77.5026',
        isActive: true
      }
    })
  ])

  console.log('Created valves:', valves.length)
  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 