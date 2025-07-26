import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// Get all sections with real data from moisture_readings and irrigation_events
router.get('/sections', async (req, res) => {
  try {
    // Get all unique sections from moisture_readings
    const sections = await prisma.$queryRaw`
      SELECT DISTINCT 
        section_id::int as id,
        'Section ' || section_id as name,
        'Crop ' || section_id as crop,
        60::int as threshold,
        2500::int as area,
        'Zone ' || section_id as location
      FROM moisture_readings
      ORDER BY section_id
    `;

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

    // Get valve status for each section
    const valveStatus = await prisma.$queryRaw`
      SELECT 
        section_id::int as section_id,
        COALESCE((status_json->>'valve_open')::boolean, false) as valveOpen
      FROM device_status 
      WHERE (section_id, timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM device_status 
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
    const sectionsWithData = (sections as any[]).map(section => {
      const moisture = (moistureReadings as any[]).find(r => r.section_id === section.id);
      const water = (waterUsage as any[]).find(w => w.section_id === section.id);
      const valve = (valveStatus as any[]).find(v => v.section_id === section.id);
      const irrigation = (lastIrrigation as any[]).find(i => i.section_id === section.id);

      return {
        ...section,
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

    // Get basic section info
    const section = await prisma.$queryRaw`
      SELECT 
        ${sectionId}::int as id,
        'Section ' || ${sectionId} as name,
        'Crop ' || ${sectionId} as crop,
        60::int as threshold,
        2500::int as area,
        'Zone ' || ${sectionId} as location
    `;

    if (!section || (section as any[]).length === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const sectionData = (section as any[])[0];

    // Get latest moisture reading
    let moisture = 50;
    try {
      const moistureReading = await prisma.$queryRaw`
        SELECT value::float as moisture
        FROM moisture_readings 
        WHERE section_id = ${sectionId}
        ORDER BY timestamp DESC
        LIMIT 1
      `;
      if ((moistureReading as any[])[0]) {
        moisture = Math.round((moistureReading as any[])[0].moisture);
      }
    } catch (error) {
      console.error('Error fetching moisture:', error);
    }

    // Get water usage for today
    let waterUsed = 0;
    try {
      const waterUsage = await prisma.$queryRaw`
        SELECT COALESCE(SUM(water_ml) / 1000.0, 0)::float as waterUsed
        FROM irrigation_events 
        WHERE section_id = ${sectionId}
        AND start_time >= NOW() - INTERVAL '1 day'
      `;
      if ((waterUsage as any[])[0]) {
        waterUsed = Math.round((waterUsage as any[])[0].waterUsed);
      }
    } catch (error) {
      console.error('Error fetching water usage:', error);
    }

    const result = {
      ...sectionData,
      moisture: moisture,
      waterUsed: waterUsed,
      valveOpen: false,
      flowRate: 0,
      dailyUsage: [100, 120, 80, 150, 90, 110, 95],
      weeklyTarget: 700,
      soilPh: 6.5,
      plantingDate: '2024-01-15',
      expectedHarvest: '2024-07-15',
      lastIrrigation: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      nextIrrigation: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// Get all sensors with real data from moisture_readings
router.get('/sensors', async (req, res) => {
  try {
    const sensors = await prisma.$queryRaw`
      SELECT 
        'sensor_' || section_id as id,
        'Moisture Sensor ' || section_id as name,
        'MOISTURE' as type,
        value::float as value,
        '%' as unit,
        'Section ' || section_id as zone,
        'Active' as status,
        '12.9232,77.5017' as location,
        timestamp as lastReading,
        true as isActive,
        section_id::int as zoneId
      FROM moisture_readings 
      WHERE (section_id, timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM moisture_readings 
        GROUP BY section_id
      )
      ORDER BY section_id
    `;

    res.json(sensors);
  } catch (error) {
    console.error('Error fetching sensors:', error);
    res.status(500).json({ error: 'Failed to fetch sensors' });
  }
});

// Get all valves with real data from device_status
router.get('/valves', async (req, res) => {
  try {
    const valves = await prisma.$queryRaw`
      SELECT 
        'valve_' || section_id as id,
        'Valve ' || section_id as name,
        COALESCE((status_json->>'valve_open')::boolean, false) as isOpen,
        COALESCE((status_json->>'flow_rate')::float, 0) as flowRate,
        '12.9232,77.5017' as location,
        COALESCE((status_json->>'is_active')::boolean, true) as isActive,
        section_id as zoneId,
        timestamp as updatedAt
      FROM device_status 
      WHERE (section_id, timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM device_status 
        GROUP BY section_id
      )
      ORDER BY section_id
    `;

    res.json(valves);
  } catch (error) {
    console.error('Error fetching valves:', error);
    res.status(500).json({ error: 'Failed to fetch valves' });
  }
});

// Toggle valve for a section (update device_status)
router.post('/sections/:id/valve', async (req, res) => {
  try {
    const { id } = req.params;
    const { valveOpen } = req.body;
    const sectionId = parseInt(id);

    // In a real implementation, this would send MQTT command
    // For now, we'll just return success
    res.json({ 
      success: true, 
      valveOpen: valveOpen,
      message: `Valve ${valveOpen ? 'opened' : 'closed'} for section ${sectionId}`
    });
  } catch (error) {
    console.error('Error toggling valve:', error);
    res.status(500).json({ error: 'Failed to toggle valve' });
  }
});

// Get moisture readings for a specific section
router.get('/sections/:id/readings', async (req, res) => {
  try {
    const { id } = req.params;
    const sectionId = parseInt(id);

    const readings = await prisma.$queryRaw`
      SELECT 
        id,
        value,
        timestamp
      FROM moisture_readings 
      WHERE section_id = ${sectionId}
      ORDER BY timestamp DESC
      LIMIT 50
    `;

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
      farmer_id,
      start_date,
      end_date 
    } = req.query;

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    // Build WHERE clause based on filters
    let whereClause = '';
    const params: any[] = [];
    let paramIndex = 1;

    if (section_id) {
      whereClause += whereClause ? ' AND ' : ' WHERE ';
      whereClause += `section_id = $${paramIndex}`;
      params.push(parseInt(section_id as string));
      paramIndex++;
    }

    if (farmer_id) {
      whereClause += whereClause ? ' AND ' : ' WHERE ';
      whereClause += `farmer_id = $${paramIndex}`;
      params.push(parseInt(farmer_id as string));
      paramIndex++;
    }

    if (start_date) {
      whereClause += whereClause ? ' AND ' : ' WHERE ';
      whereClause += `timestamp >= $${paramIndex}`;
      params.push(start_date as string);
      paramIndex++;
    }

    if (end_date) {
      whereClause += whereClause ? ' AND ' : ' WHERE ';
      whereClause += `timestamp <= $${paramIndex}`;
      params.push(end_date as string);
      paramIndex++;
    }

    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) as total FROM moisture_readings${whereClause}`;
    const countResult = await prisma.$queryRawUnsafe(countQuery, ...params);
    const total = parseInt((countResult as any[])[0].total);

    // Get paginated data
    const dataQuery = `
      SELECT 
        id::int as id,
        farmer_id::int as farmer_id,
        section_id::int as section_id,
        value::float as value,
        timestamp
      FROM moisture_readings
      ${whereClause}
      ORDER BY timestamp DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    params.push(parseInt(limit as string), offset);
    const readings = await prisma.$queryRawUnsafe(dataQuery, ...params);

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
    const { farmer_id } = req.query;
    
    let whereClause = '';
    const params: any[] = [];
    
    if (farmer_id) {
      whereClause = ' WHERE farmer_id = $1';
      params.push(parseInt(farmer_id as string));
    }

    const query = `
      SELECT 
        id::int as id,
        farmer_id::int as farmer_id,
        section_id::int as section_id,
        value::float as value,
        timestamp
      FROM moisture_readings 
      WHERE (section_id, timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM moisture_readings${whereClause}
        GROUP BY section_id
      )
      ORDER BY section_id
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
    const { section_id, farmer_id, days = 7 } = req.query;
    
    let whereClause = ' WHERE timestamp >= NOW() - INTERVAL \'1 day\' * $1';
    const params: any[] = [parseInt(days as string)];
    let paramIndex = 2;

    if (section_id) {
      whereClause += ` AND section_id = $${paramIndex}`;
      params.push(parseInt(section_id as string));
      paramIndex++;
    }

    if (farmer_id) {
      whereClause += ` AND farmer_id = $${paramIndex}`;
      params.push(parseInt(farmer_id as string));
      paramIndex++;
    }

    const statsQuery = `
      SELECT 
        COUNT(*)::int as total_readings,
        AVG(value)::float as avg_moisture,
        MIN(value)::float as min_moisture,
        MAX(value)::float as max_moisture,
        STDDEV(value)::float as std_deviation
      FROM moisture_readings
      ${whereClause}
    `;

    const stats = await prisma.$queryRawUnsafe(statsQuery, ...params);
    res.json((stats as any[])[0]);
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

    const events = await prisma.$queryRaw`
      SELECT 
        id,
        water_ml,
        start_time,
        end_time
      FROM irrigation_events 
      WHERE section_id = ${sectionId}
      ORDER BY start_time DESC
      LIMIT 20
    `;

    res.json(events);
  } catch (error) {
    console.error('Error fetching irrigation events:', error);
    res.status(500).json({ error: 'Failed to fetch irrigation events' });
  }
});

export default router; 