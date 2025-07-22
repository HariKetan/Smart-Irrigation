import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all zones
router.get('/', async (req, res) => {
  try {
    const zones = await prisma.zone.findMany({
      include: {
        sensors: {
          include: {
            readings: {
              orderBy: {
                timestamp: 'desc'
              },
              take: 1
            }
          }
        }
      }
    });
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch zones' });
  }
});

// Get zone by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const zone = await prisma.zone.findUnique({
      where: { id: parseInt(id) },
      include: {
        sensors: {
          include: {
            readings: {
              orderBy: {
                timestamp: 'desc'
              },
              take: 5
            }
          }
        }
      }
    });
    
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch zone' });
  }
});

// Create new zone
router.post('/', async (req, res) => {
  try {
    const { name, description, area } = req.body;
    
    const zone = await prisma.zone.create({
      data: {
        name,
        description,
        area: parseFloat(area)
      }
    });
    
    res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create zone' });
  }
});

// Update zone
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, area, isActive } = req.body;
    
    const zone = await prisma.zone.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        area: area ? parseFloat(area) : undefined,
        isActive
      }
    });
    
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update zone' });
  }
});

// Delete zone
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.zone.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete zone' });
  }
});

export default router; 