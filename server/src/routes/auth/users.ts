import { Router } from 'express';
import { prisma } from '../../lib/prisma';
import { validateFarmAccess } from '../../lib/farmAccess';

const router = Router();

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        farm_ids: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        farm_ids: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user's farm access
router.put('/:id/farms', async (req, res) => {
  try {
    const { id } = req.params;
    const { farm_ids } = req.body;

    if (!Array.isArray(farm_ids)) {
      return res.status(400).json({ error: 'farm_ids must be an array' });
    }

    // Validate that all farm_ids exist
    const farms = await prisma.farm.findMany({
      where: { id: { in: farm_ids } },
      select: { id: true }
    });

    if (farms.length !== farm_ids.length) {
      return res.status(400).json({ error: 'Some farm IDs do not exist' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { farm_ids },
      select: {
        id: true,
        email: true,
        name: true,
        farm_ids: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user farms:', error);
    res.status(500).json({ error: 'Failed to update user farms' });
  }
});

// Get user's accessible farms
router.get('/:id/farms', async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: { farm_ids: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const farms = await prisma.farm.findMany({
      where: { id: { in: user.farm_ids } },
      select: { id: true, name: true, location: true }
    });

    res.json(farms);
  } catch (error) {
    console.error('Error fetching user farms:', error);
    res.status(500).json({ error: 'Failed to fetch user farms' });
  }
});

export default router; 