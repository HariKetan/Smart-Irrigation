import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all farms
router.get('/', async (req, res) => {
  try {
    const farms = await prisma.farm.findMany({
      include: {
        sections: true,
        _count: {
          select: {
            moistureReadings: true,
            irrigationEvents: true
          }
        }
      }
    });

    res.json(farms);
  } catch (error) {
    console.error('Error fetching farms:', error);
    res.status(500).json({ error: 'Failed to fetch farms' });
  }
});

// Get farm by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const farmId = parseInt(id);

    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
      include: {
        sections: true,
        moistureReadings: {
          take: 10,
          orderBy: { timestamp: 'desc' }
        },
        irrigationEvents: {
          take: 10,
          orderBy: { start_time: 'desc' }
        }
      }
    });

    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    res.json(farm);
  } catch (error) {
    console.error('Error fetching farm:', error);
    res.status(500).json({ error: 'Failed to fetch farm' });
  }
});

// Create new farm
router.post('/', async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Farm name is required' });
    }

    const farm = await prisma.farm.create({
      data: {
        name,
        location: location || null
      },
      include: {
        sections: true
      }
    });

    res.status(201).json(farm);
  } catch (error) {
    console.error('Error creating farm:', error);
    res.status(500).json({ error: 'Failed to create farm' });
  }
});

// Update farm
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const farmId = parseInt(id);

    const farm = await prisma.farm.update({
      where: { id: farmId },
      data: {
        name: name || undefined,
        location: location !== undefined ? location : undefined
      },
      include: {
        sections: true
      }
    });

    res.json(farm);
  } catch (error) {
    console.error('Error updating farm:', error);
    res.status(500).json({ error: 'Failed to update farm' });
  }
});

// Delete farm
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const farmId = parseInt(id);

    await prisma.farm.delete({
      where: { id: farmId }
    });

    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    console.error('Error deleting farm:', error);
    res.status(500).json({ error: 'Failed to delete farm' });
  }
});

export default router; 