import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Helper function to convert BigInt values to numbers for JSON serialization
function convertBigIntsToNumbers(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'bigint') {
    return Number(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntsToNumbers);
  }
  
  if (typeof obj === 'object') {
    const converted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntsToNumbers(value);
    }
    return converted;
  }
  
  return obj;
}

// Get all sections with real data from moisture_readings and irrigation_events
router.get('/sections', async (req, res) => {
  try {
    // Get all sections from the sections table
    const sections = await prisma.section.findMany({
      include: {
        farm: true
      },
      orderBy: {
        id: 'asc'
      }
    });

    // Get latest moisture readings for each section
    const moistureReadings = await prisma.$queryRaw`
      SELECT 
        section_id::int as section_id,
        value::float as moisture
      FROM moisture_readings 
      WHERE (section_id, timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM moisture_readings 
        GROUP BY section_id
      )
    `;

    // Get water usage for each section (last 24 hours)
    const waterUsage = await prisma.$queryRaw`
      SELECT 
        section_id::int as section_id,
        COALESCE(SUM(water_ml) / 1000.0, 0)::float as waterUsed
      FROM irrigation_events 
      WHERE start_time >= NOW() - INTERVAL '1 day'
      GROUP BY section_id
    `;

    // Get valve status for each section from irrigation_device_status
    const valveStatus = await prisma.$queryRaw`
      SELECT 
        section_id::int as section_id,
        COALESCE(valve_on::boolean, false) as valveOpen
      FROM irrigation_device_status 
      WHERE (section_id, timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM irrigation_device_status 
        GROUP BY section_id
      )
    `;

    // Get last irrigation time for each section
    const lastIrrigation = await prisma.$queryRaw`
      SELECT 
        section_id::int as section_id,
        start_time as lastIrrigation
      FROM irrigation_events 
      WHERE (section_id, start_time) IN (
        SELECT section_id, MAX(start_time) 
        FROM irrigation_events 
        GROUP BY section_id
      )
    `;

    // Combine all data
    const sectionsWithData = sections.map(section => {
      const moisture = (moistureReadings as any[]).find(r => r.section_id === section.id);
      const water = (waterUsage as any[]).find(w => w.section_id === section.id);
      const valve = (valveStatus as any[]).find(v => v.section_id === section.id);
      const irrigation = (lastIrrigation as any[]).find(i => i.section_id === section.id);

      return {
        id: section.id,
        name: section.name,
        crop: `Crop ${section.id}`,
        threshold: 60,
        area: 2500,
        location: `Zone ${section.id}`,
        farm: section.farm,
        moisture: moisture ? Math.round(moisture.moisture) : 50,
        waterUsed: water ? Math.round(water.waterUsed) : 0,
        valveOpen: valve ? valve.valveOpen : false,
        lastIrrigation: irrigation ? irrigation.lastIrrigation : new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        nextIrrigation: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    });

    res.json(sectionsWithData);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ error: 'Failed to fetch sections' });
  }
});

// Get section by ID with real data
router.get('/sections/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sectionId = parseInt(id);

    // Get section with farm info
    const section = await prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        farm: true
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Get latest moisture reading
    let moisture = 50;
    try {
      const moistureReading = await prisma.moistureReading.findFirst({
        where: { section_id: sectionId },
        orderBy: { timestamp: 'desc' }
      });
      if (moistureReading) {
        moisture = Math.round(moistureReading.value);
      }
    } catch (error) {
      console.error('Error fetching moisture:', error);
    }

    // Get water usage for today
    let waterUsed = 0;
    try {
      const waterUsage = await prisma.irrigationEvent.aggregate({
        where: {
          section_id: sectionId,
          start_time: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        },
        _sum: {
          water_ml: true
        }
      });
      if (waterUsage._sum?.water_ml) {
        waterUsed = Math.round(waterUsage._sum.water_ml / 1000);
      }
    } catch (error) {
      console.error('Error fetching water usage:', error);
    }

    // Get latest device status
    const latestDeviceStatus = await prisma.irrigationDeviceStatus.findFirst({
      where: { section_id: sectionId },
      orderBy: { createdAt: 'desc' }
    });

    const result = {
      id: section.id,
      name: section.name,
      crop: `Crop ${section.id}`,
      threshold: latestDeviceStatus?.threshold || 60,
      area: 2500,
      location: `Zone ${section.id}`,
      farm: section.farm,
      moisture: moisture,
      waterUsed: waterUsed,
      valveOpen: latestDeviceStatus?.valve_on === 1,
      flowRate: 0,
      dailyUsage: [100, 120, 80, 150, 90, 110, 95],
      weeklyTarget: 700,
      soilPh: 6.5,
      plantingDate: '2024-01-15',
      expectedHarvest: '2024-07-15',
      lastIrrigation: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      nextIrrigation: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      mode: latestDeviceStatus?.mode || 'manual',
      deviceStatus: latestDeviceStatus ? convertBigIntsToNumbers(latestDeviceStatus) : null
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// Toggle valve for a section (MQTT command)
router.post('/sections/:id/valve', async (req, res) => {
  try {
    const { id } = req.params;
    const { valveOpen, duration } = req.body;
    const sectionId = parseInt(id);

    // In a real implementation, this would send MQTT command to the Arduino
    // For now, we'll simulate the response and update the database
    
    // Simulate MQTT command
    const mqttCommand = {
      action: valveOpen ? 'irrigate' : 'stop',
      duration: duration || 60, // default 60 seconds
      timestamp: new Date().toISOString()
    };

    // Update device status in database
    await prisma.irrigationDeviceStatus.create({
      data: {
        device_id: `irrigation_controller_1`,
        farm_id: 1, // Assuming farm_id 1
        section_id: sectionId,
        uptime: Date.now(),
        wifi: 1,
        mqtt: 1,
        last_error: '',
        valve_on: valveOpen ? 1 : 0,
        mode: 'manual',
        latest_moisture: 50,
        threshold: 40,
        pulse_count: 0,
        water_ml: 0,
        timestamp: Date.now()
      }
    });

    res.json({ 
      success: true, 
      valveOpen: valveOpen,
      message: `Valve ${valveOpen ? 'opened' : 'closed'} for section ${sectionId}`,
      mqttCommand: mqttCommand
    });
  } catch (error) {
    console.error('Error toggling valve:', error);
    res.status(500).json({ error: 'Failed to toggle valve' });
  }
});

// Set irrigation mode for a section
router.post('/sections/:id/mode', async (req, res) => {
  try {
    const { id } = req.params;
    const { mode } = req.body;
    const sectionId = parseInt(id);

    if (!['auto', 'manual'].includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode. Must be "auto" or "manual"' });
    }

    // Simulate MQTT command
    const mqttCommand = {
      mode: mode,
      timestamp: new Date().toISOString()
    };

    // Update device status
    await prisma.irrigationDeviceStatus.create({
      data: {
        device_id: `irrigation_controller_1`,
        farm_id: 1,
        section_id: sectionId,
        uptime: Date.now(),
        wifi: 1,
        mqtt: 1,
        last_error: '',
        valve_on: 0,
        mode: mode,
        latest_moisture: 50,
        threshold: 40,
        pulse_count: 0,
        water_ml: 0,
        timestamp: Date.now()
      }
    });

    res.json({ 
      success: true, 
      mode: mode,
      message: `Mode set to ${mode} for section ${sectionId}`,
      mqttCommand: mqttCommand
    });
  } catch (error) {
    console.error('Error setting mode:', error);
    res.status(500).json({ error: 'Failed to set mode' });
  }
});

// Configure device settings
router.post('/sections/:id/config', async (req, res) => {
  try {
    const { id } = req.params;
    const { threshold, enableDeepSleep, deepSleepDuration, reportingInterval } = req.body;
    const sectionId = parseInt(id);

    const config: any = {};
    if (threshold !== undefined) config.threshold = threshold;
    if (enableDeepSleep !== undefined) config.enable_deep_sleep = enableDeepSleep;
    if (deepSleepDuration !== undefined) config.deep_sleep_duration = deepSleepDuration;
    if (reportingInterval !== undefined) config.reporting_interval = reportingInterval;

    // Simulate MQTT command
    const mqttCommand = {
      ...config,
      timestamp: new Date().toISOString()
    };

    res.json({ 
      success: true, 
      config: config,
      message: `Configuration updated for section ${sectionId}`,
      mqttCommand: mqttCommand
    });
  } catch (error) {
    console.error('Error updating config:', error);
    res.status(500).json({ error: 'Failed to update configuration' });
  }
});

// Get all farms
router.get('/farms', async (req, res) => {
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
router.get('/farms/:id', async (req, res) => {
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

// Get moisture readings for a specific section
router.get('/sections/:id/readings', async (req, res) => {
  try {
    const { id } = req.params;
    const sectionId = parseInt(id);

    const readings = await prisma.moistureReading.findMany({
      where: { section_id: sectionId },
      orderBy: { timestamp: 'desc' },
      take: 50
    });

    res.json(readings);
  } catch (error) {
    console.error('Error fetching readings:', error);
    res.status(500).json({ error: 'Failed to fetch readings' });
  }
});

// Get all moisture readings from moisture_readings table
router.get('/moisture-readings', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 100, 
      section_id, 
      farm_id,
      start_date,
      end_date 
    } = req.query;

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    // Build where conditions
    const where: any = {};
    
    if (section_id) {
      where.section_id = parseInt(section_id as string);
    }
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (start_date) {
      where.timestamp = {
        ...where.timestamp,
        gte: new Date(start_date as string)
      };
    }
    
    if (end_date) {
      where.timestamp = {
        ...where.timestamp,
        lte: new Date(end_date as string)
      };
    }

    // Get total count for pagination
    const total = await prisma.moistureReading.count({ where });

    // Get paginated data
    const readings = await prisma.moistureReading.findMany({
      where,
      include: {
        farm: true,
        section: true
      },
      orderBy: { timestamp: 'desc' },
      take: parseInt(limit as string),
      skip: offset
    });

    res.json({
      data: readings,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Error fetching moisture readings:', error);
    res.status(500).json({ error: 'Failed to fetch moisture readings' });
  }
});

// Get latest moisture reading for each section
router.get('/moisture-readings/latest', async (req, res) => {
  try {
    const { farm_id } = req.query;
    
    let whereClause = '';
    let params: any[] = [];
    
    if (farm_id) {
      whereClause = ' WHERE farm_id = $1';
      params = [parseInt(farm_id as string)];
    }

    const query = `
      SELECT 
        mr.id::int as id,
        mr.farm_id::int as farm_id,
        mr.section_id::int as section_id,
        mr.value::float as value,
        mr.timestamp,
        f.name as farm_name,
        s.name as section_name
      FROM moisture_readings mr
      LEFT JOIN farms f ON mr.farm_id = f.id
      LEFT JOIN sections s ON mr.section_id = s.id
      WHERE (mr.section_id, mr.timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM moisture_readings${whereClause}
        GROUP BY section_id
      )
      ORDER BY mr.section_id
    `;

    const latestReadings = await prisma.$queryRawUnsafe(query, ...params);
    res.json(latestReadings);
  } catch (error) {
    console.error('Error fetching latest moisture readings:', error);
    res.status(500).json({ error: 'Failed to fetch latest moisture readings' });
  }
});

// Get moisture readings statistics
router.get('/moisture-readings/stats', async (req, res) => {
  try {
    const { section_id, farm_id, days = 7 } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
    
    const where: any = {
      timestamp: {
        gte: daysAgo
      }
    };

    if (section_id) {
      where.section_id = parseInt(section_id as string);
    }

    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }

    const stats = await prisma.moistureReading.aggregate({
      where,
      _count: { id: true },
      _avg: { value: true },
      _min: { value: true },
      _max: { value: true }
    });

    // Calculate standard deviation
    const readings = await prisma.moistureReading.findMany({
      where,
      select: { value: true }
    });

    const values = readings.map(r => r.value);
    const mean = stats._avg.value || 0;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const stdDeviation = Math.sqrt(variance);

    res.json({
      total_readings: stats._count.id,
      avg_moisture: stats._avg.value,
      min_moisture: stats._min.value,
      max_moisture: stats._max.value,
      std_deviation: stdDeviation
    });
  } catch (error) {
    console.error('Error fetching moisture readings stats:', error);
    res.status(500).json({ error: 'Failed to fetch moisture readings stats' });
  }
});

// Get irrigation events for a specific section
router.get('/sections/:id/irrigation', async (req, res) => {
  try {
    const { id } = req.params;
    const sectionId = parseInt(id);

    const events = await prisma.irrigationEvent.findMany({
      where: { section_id: sectionId },
      orderBy: { start_time: 'desc' },
      take: 20
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching irrigation events:', error);
    res.status(500).json({ error: 'Failed to fetch irrigation events' });
  }
});

// Get all irrigation events from irrigation_events table
router.get('/irrigation-events', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 100, 
      section_id, 
      farm_id,
      start_date,
      end_date 
    } = req.query;

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    // Build where conditions
    const where: any = {};
    
    if (section_id) {
      where.section_id = parseInt(section_id as string);
    }
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (start_date) {
      where.start_time = {
        ...where.start_time,
        gte: new Date(start_date as string)
      };
    }
    
    if (end_date) {
      where.start_time = {
        ...where.start_time,
        lte: new Date(end_date as string)
      };
    }

    // Get total count for pagination
    const total = await prisma.irrigationEvent.count({ where });

    // Get paginated data
    const events = await prisma.irrigationEvent.findMany({
      where,
      include: {
        farm: true,
        section: true
      },
      orderBy: { start_time: 'desc' },
      take: parseInt(limit as string),
      skip: offset
    });

    // Add duration calculation
    const eventsWithDuration = events.map(event => ({
      ...event,
      duration_seconds: (event.end_time.getTime() - event.start_time.getTime()) / 1000
    }));

    res.json({
      data: eventsWithDuration,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Error fetching irrigation events:', error);
    res.status(500).json({ error: 'Failed to fetch irrigation events' });
  }
});

// Get latest irrigation event for each section
router.get('/irrigation-events/latest', async (req, res) => {
  try {
    const { farm_id } = req.query;
    
    let whereClause = '';
    let params: any[] = [];
    
    if (farm_id) {
      whereClause = ' WHERE farm_id = $1';
      params = [parseInt(farm_id as string)];
    }

    const query = `
      SELECT 
        ie.id::int as id,
        ie.farm_id::int as farm_id,
        ie.section_id::int as section_id,
        ie.water_ml::float as water_ml,
        ie.start_time,
        ie.end_time,
        EXTRACT(EPOCH FROM (ie.end_time - ie.start_time))::float as duration_seconds,
        f.name as farm_name,
        s.name as section_name
      FROM irrigation_events ie
      LEFT JOIN farms f ON ie.farm_id = f.id
      LEFT JOIN sections s ON ie.section_id = s.id
      WHERE (ie.section_id, ie.start_time) IN (
        SELECT section_id, MAX(start_time) 
        FROM irrigation_events${whereClause}
        GROUP BY section_id
      )
      ORDER BY ie.section_id
    `;

    const latestEvents = await prisma.$queryRawUnsafe(query, ...params);
    res.json(latestEvents);
  } catch (error) {
    console.error('Error fetching latest irrigation events:', error);
    res.status(500).json({ error: 'Failed to fetch latest irrigation events' });
  }
});

// Get irrigation events statistics
router.get('/irrigation-events/stats', async (req, res) => {
  try {
    const { section_id, farm_id, days = 7 } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
    
    const where: any = {
      start_time: {
        gte: daysAgo
      }
    };

    if (section_id) {
      where.section_id = parseInt(section_id as string);
    }

    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }

    const stats = await prisma.irrigationEvent.aggregate({
      where,
      _count: { id: true },
      _sum: { water_ml: true }
    });

    // Calculate average duration
    const events = await prisma.irrigationEvent.findMany({
      where,
      select: { start_time: true, end_time: true }
    });

    const totalDuration = events.reduce((acc, event) => {
      return acc + (event.end_time.getTime() - event.start_time.getTime());
    }, 0);

    const avgDurationSeconds = events.length > 0 ? totalDuration / events.length / 1000 : 0;
    const totalHoursIrrigated = totalDuration / 1000 / 3600;

    res.json({
      total_events: stats._count.id,
      total_water_liters: stats._sum.water_ml ? stats._sum.water_ml / 1000 : 0,
      avg_water_per_event: stats._count.id > 0 ? (stats._sum.water_ml || 0) / stats._count.id / 1000 : 0,
      avg_duration_seconds: avgDurationSeconds,
      total_hours_irrigated: totalHoursIrrigated
    });
  } catch (error) {
    console.error('Error fetching irrigation events stats:', error);
    res.status(500).json({ error: 'Failed to fetch irrigation events stats' });
  }
});

// Get daily water usage for the last N days
router.get('/irrigation-events/daily-usage', async (req, res) => {
  try {
    const { farm_id, section_id, days = 7 } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
    
    let whereClause = '';
    let params: any[] = [daysAgo];

    if (farm_id) {
      whereClause += ' AND farm_id = $2';
      params.push(parseInt(farm_id as string));
    }

    if (section_id) {
      whereClause += ` AND section_id = $${params.length + 1}`;
      params.push(parseInt(section_id as string));
    }

    const dailyUsage = await prisma.$queryRawUnsafe(`
      SELECT 
        DATE(start_time) as date,
        COALESCE(SUM(water_ml) / 1000.0, 0)::float as water_liters,
        COUNT(*)::int as event_count,
        COALESCE(AVG(EXTRACT(EPOCH FROM (end_time - start_time))) / 60.0, 0)::float as avg_duration_minutes
      FROM irrigation_events
      WHERE start_time >= $1${whereClause}
      GROUP BY DATE(start_time)
      ORDER BY date DESC
    `, ...params);

    res.json(dailyUsage);
  } catch (error) {
    console.error('Error fetching daily water usage:', error);
    res.status(500).json({ error: 'Failed to fetch daily water usage' });
  }
});

// Get water usage by section for the last N days
router.get('/irrigation-events/section-usage', async (req, res) => {
  try {
    const { farm_id, days = 7 } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
    
    let whereClause = '';
    let params: any[] = [daysAgo];

    if (farm_id) {
      whereClause = ' AND ie.farm_id = $2';
      params.push(parseInt(farm_id as string));
    }

    const sectionUsage = await prisma.$queryRawUnsafe(`
      SELECT 
        ie.section_id::int as section_id,
        s.name as section_name,
        COALESCE(SUM(ie.water_ml) / 1000.0, 0)::float as water_liters,
        COUNT(*)::int as event_count,
        COALESCE(AVG(EXTRACT(EPOCH FROM (ie.end_time - ie.start_time))) / 60.0, 0)::float as avg_duration_minutes,
        MAX(ie.start_time) as last_irrigation
      FROM irrigation_events ie
      LEFT JOIN sections s ON ie.section_id = s.id
      WHERE ie.start_time >= $1${whereClause}
      GROUP BY ie.section_id, s.name
      ORDER BY water_liters DESC
    `, ...params);

    res.json(sectionUsage);
  } catch (error) {
    console.error('Error fetching section water usage:', error);
    res.status(500).json({ error: 'Failed to fetch section water usage' });
  }
});

// Get device status for irrigation controllers
router.get('/device-status/irrigation', async (req, res) => {
  try {
    const { farm_id, section_id } = req.query;
    
    const where: any = {};
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (section_id) {
      where.section_id = parseInt(section_id as string);
    }

    const deviceStatus = await prisma.irrigationDeviceStatus.findMany({
      where,
      include: {
        farm: true,
        section: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Convert BigInt values to numbers for JSON serialization
    const convertedDeviceStatus = convertBigIntsToNumbers(deviceStatus);

    res.json(convertedDeviceStatus);
  } catch (error) {
    console.error('Error fetching irrigation device status:', error);
    res.status(500).json({ error: 'Failed to fetch irrigation device status' });
  }
});

// Get device status for moisture sensors
router.get('/device-status/moisture', async (req, res) => {
  try {
    const { farm_id, section_id } = req.query;
    
    const where: any = {};
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (section_id) {
      where.section_id = parseInt(section_id as string);
    }

    const deviceStatus = await prisma.moistureDeviceStatus.findMany({
      where,
      include: {
        farm: true,
        section: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Convert BigInt values to numbers for JSON serialization
    const convertedDeviceStatus = convertBigIntsToNumbers(deviceStatus);

    res.json(convertedDeviceStatus);
  } catch (error) {
    console.error('Error fetching moisture device status:', error);
    res.status(500).json({ error: 'Failed to fetch moisture device status' });
  }
});

// Get device acknowledgments
router.get('/device-acks', async (req, res) => {
  try {
    const { farm_id, section_id, device_id } = req.query;
    
    const where: any = {};
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (section_id) {
      where.section_id = parseInt(section_id as string);
    }
    
    if (device_id) {
      where.device_id = device_id as string;
    }

    const deviceAcks = await prisma.deviceAck.findMany({
      where,
      include: {
        farm: true,
        section: true
      },
      orderBy: { timestamp: 'desc' }
    });

    res.json(deviceAcks);
  } catch (error) {
    console.error('Error fetching device acknowledgments:', error);
    res.status(500).json({ error: 'Failed to fetch device acknowledgments' });
  }
});

export default router; 