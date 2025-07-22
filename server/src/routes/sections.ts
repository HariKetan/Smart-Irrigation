import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all sections (mapped from zones)
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

    // Transform zones to sections format with mock data
    const sections = zones.map((zone, index) => {
      // Get latest moisture reading if available
      const moistureSensor = zone.sensors.find(s => s.type === 'MOISTURE');
      const moistureReading = moistureSensor?.readings[0];
      const moisture = moistureReading ? moistureReading.value : Math.floor(Math.random() * 30) + 40; // 40-70%

      // Get latest temperature reading if available
      const tempSensor = zone.sensors.find(s => s.type === 'TEMPERATURE');
      const tempReading = tempSensor?.readings[0];
      const temperature = tempReading ? tempReading.value : Math.floor(Math.random() * 15) + 20; // 20-35°C

      return {
        id: zone.id,
        name: zone.name,
        crop: zone.description || `Crop ${zone.id}`,
        moisture: Math.round(moisture),
        threshold: 60, // Default threshold
        temperature: Math.round(temperature),
        waterUsed: Math.floor(Math.random() * 500) + 100, // Mock water usage
        valveOpen: Math.random() > 0.7, // 30% chance of being open
        area: zone.area,
        location: `Zone ${zone.id}`,
        lastIrrigation: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        nextIrrigation: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
      };
    });

    res.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ error: 'Failed to fetch sections' });
  }
});

// Get section by ID
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
      return res.status(404).json({ error: 'Section not found' });
    }

    // Get latest moisture reading if available
    const moistureSensor = zone.sensors.find(s => s.type === 'MOISTURE');
    const moistureReading = moistureSensor?.readings[0];
    const moisture = moistureReading ? moistureReading.value : Math.floor(Math.random() * 30) + 40;

    // Get latest temperature reading if available
    const tempSensor = zone.sensors.find(s => s.type === 'TEMPERATURE');
    const tempReading = tempSensor?.readings[0];
    const temperature = tempReading ? tempReading.value : Math.floor(Math.random() * 15) + 20;

    const section = {
      id: zone.id,
      name: zone.name,
      crop: zone.description || `Crop ${zone.id}`,
      moisture: Math.round(moisture),
      threshold: 60, // Default threshold
      temperature: Math.round(temperature),
      waterUsed: Math.floor(Math.random() * 500) + 100,
      valveOpen: Math.random() > 0.7,
      area: zone.area,
      location: `Zone ${zone.id}`,
      lastIrrigation: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      nextIrrigation: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
    };
    
    res.json(section);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// Toggle valve for a section
router.post('/:id/valve', async (req, res) => {
  try {
    const { id } = req.params;
    const { valveOpen } = req.body;

    // In a real implementation, this would control actual hardware
    // For now, we'll just return success
    res.json({ 
      success: true, 
      valveOpen: valveOpen,
      message: `Valve ${valveOpen ? 'opened' : 'closed'} for section ${id}`
    });
  } catch (error) {
    console.error('Error toggling valve:', error);
    res.status(500).json({ error: 'Failed to toggle valve' });
  }
});

export default router; 