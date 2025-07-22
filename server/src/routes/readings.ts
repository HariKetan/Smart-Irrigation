import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all readings
router.get('/', async (req, res) => {
  try {
    const { sensorId, limit = '50' } = req.query;
    
    const where = sensorId ? { sensorId: parseInt(sensorId as string) } : {};
    
    const readings = await prisma.reading.findMany({
      where,
      include: {
        sensor: true
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: parseInt(limit as string)
    });
    
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch readings' });
  }
});

// Get reading by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reading = await prisma.reading.findUnique({
      where: { id: parseInt(id) },
      include: {
        sensor: true
      }
    });
    
    if (!reading) {
      return res.status(404).json({ error: 'Reading not found' });
    }
    
    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reading' });
  }
});

// Create new reading
router.post('/', async (req, res) => {
  try {
    const { sensorId, value, unit } = req.body;
    
    const reading = await prisma.reading.create({
      data: {
        sensorId: parseInt(sensorId),
        value: parseFloat(value),
        unit
      },
      include: {
        sensor: true
      }
    });
    
    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reading' });
  }
});

// Get latest readings for all sensors
router.get('/latest/all', async (req, res) => {
  try {
    const sensors = await prisma.sensor.findMany({
      where: { isActive: true },
      include: {
        readings: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    });
    
    const latestReadings = sensors.map((sensor: any) => ({
      sensorId: sensor.id,
      sensorName: sensor.name,
      sensorType: sensor.type,
      location: sensor.location,
      latestReading: sensor.readings[0] || null
    }));
    
    res.json(latestReadings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest readings' });
  }
});

export default router; 