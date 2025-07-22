import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all valves
router.get('/', async (req, res) => {
  try {
    const valves = await prisma.valve.findMany({
      include: {
        zone: true
      }
    });
    res.json(valves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch valves' });
  }
});

// Get valve by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const valve = await prisma.valve.findUnique({
      where: { id: parseInt(id) },
      include: {
        zone: true
      }
    });
    
    if (!valve) {
      return res.status(404).json({ error: 'Valve not found' });
    }
    
    res.json(valve);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch valve' });
  }
});

// Create new valve
router.post('/', async (req, res) => {
  try {
    const { name, location, zoneId } = req.body;
    
    const valve = await prisma.valve.create({
      data: {
        name,
        location,
        zoneId: zoneId ? parseInt(zoneId) : null
      },
      include: {
        zone: true
      }
    });
    
    res.status(201).json(valve);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create valve' });
  }
});

// Update valve
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isOpen, flowRate, location, isActive, zoneId } = req.body;
    
    const valve = await prisma.valve.update({
      where: { id: parseInt(id) },
      data: {
        name,
        isOpen,
        flowRate: flowRate ? parseFloat(flowRate) : undefined,
        location,
        isActive,
        zoneId: zoneId ? parseInt(zoneId) : null
      },
      include: {
        zone: true
      }
    });
    
    res.json(valve);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update valve' });
  }
});

// Toggle valve
router.post('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    
    const currentValve = await prisma.valve.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!currentValve) {
      return res.status(404).json({ error: 'Valve not found' });
    }
    
    const valve = await prisma.valve.update({
      where: { id: parseInt(id) },
      data: {
        isOpen: !currentValve.isOpen,
        flowRate: !currentValve.isOpen ? Math.random() * 5 + 1 : 0 // Random flow rate when opening
      },
      include: {
        zone: true
      }
    });
    
    res.json(valve);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle valve' });
  }
});

// Delete valve
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.valve.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete valve' });
  }
});

export default router; 