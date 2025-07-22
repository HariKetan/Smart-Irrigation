import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all sensors
router.get('/', async (req, res) => {
  try {
    const sensors = await prisma.sensor.findMany({
      include: {
        zone: true,
        readings: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    });
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sensors' });
  }
});

// Get sensor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await prisma.sensor.findUnique({
      where: { id: parseInt(id) },
      include: {
        zone: true,
        readings: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 10
        }
      }
    });
    
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }
    
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sensor' });
  }
});

// Create new sensor
router.post('/', async (req, res) => {
  try {
    const { name, type, location, zoneId } = req.body;
    
    const sensor = await prisma.sensor.create({
      data: {
        name,
        type,
        location,
        zoneId: zoneId ? parseInt(zoneId) : null
      },
      include: {
        zone: true
      }
    });
    
    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sensor' });
  }
});

// Update sensor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, location, isActive, zoneId } = req.body;
    
    const sensor = await prisma.sensor.update({
      where: { id: parseInt(id) },
      data: {
        name,
        type,
        location,
        isActive,
        zoneId: zoneId ? parseInt(zoneId) : null
      },
      include: {
        zone: true
      }
    });
    
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sensor' });
  }
});

// Delete sensor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.sensor.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sensor' });
  }
});

export default router; 