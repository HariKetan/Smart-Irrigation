import express from 'express';
import { prisma } from '../lib/prisma';
import { authenticateToken } from '../lib/auth';
import { validateFarmAccess } from '../lib/farmAccess';
import mqtt from 'mqtt';

const router = express.Router();

// MQTT client for sending commands to devices
const mqttClient = mqtt.connect('mqtt://192.168.29.247:1883', {
  username: 'arecanut',
  password: '123456',
  reconnectPeriod: 5000,
  connectTimeout: 10000
});

mqttClient.on('connect', () => {
  console.log('✅ MQTT client connected for sending commands');
  
  // Subscribe to device data topics
  mqttClient.subscribe('farm/+/section/+/moisture');
  mqttClient.subscribe('farm/+/section/+/irrigation');
  mqttClient.subscribe('farm/+/section/+/status');
  mqttClient.subscribe('farm/+/section/+/ack');
  console.log('📡 Subscribed to device data topics');
});

mqttClient.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const topicParts = topic.split('/');
    
    if (topicParts.length >= 4) {
      const farmId = parseInt(topicParts[1]);
      const sectionNumber = parseInt(topicParts[3]);
      const messageType = topicParts[4];
      
      console.log(`📨 MQTT message received: ${topic}`, data);
      
      // Broadcast updates based on message type
      switch (messageType) {
        case 'moisture':
          if (data.value !== undefined) {
            console.log(`💧 Broadcasting moisture update: Farm ${farmId}, Section ${sectionNumber}, Value: ${data.value}`);
            broadcastSectionUpdate(farmId, sectionNumber, {
              moisture_value: parseFloat(data.value),
              timestamp: data.timestamp || new Date().toISOString(),
              type: 'moisture_update'
            });
          }
          break;
          
        case 'status':
          // Handle irrigation device status
          if (data.valve_on !== undefined || data.mode !== undefined) {
            console.log(`🚰 Broadcasting irrigation status: Farm ${farmId}, Section ${sectionNumber}, Valve: ${data.valve_on}, Mode: ${data.mode}`);
            broadcastSectionUpdate(farmId, sectionNumber, {
              valve_open: data.valve_on || false,
              mode: data.mode || 'manual',
              water_ml: data.water_ml || 0,
              timestamp: data.timestamp || new Date().toISOString(),
              type: 'irrigation_update'
            });
          }
          break;
          
        case 'ack':
          // Handle command acknowledgments
          console.log(`✅ Command ACK: Farm ${farmId}, Section ${sectionNumber}, Command: ${data.command}, Result: ${data.result}`);
          broadcastSectionUpdate(farmId, sectionNumber, {
            ack: {
              command: data.command,
              result: data.result,
              details: data.details
            },
            timestamp: data.timestamp || new Date().toISOString(),
            type: 'command_ack'
          });
          break;
      }
    }
  } catch (error) {
    console.error('❌ Error processing MQTT message:', error);
  }
});

mqttClient.on('error', (error: Error) => {
  console.error('❌ MQTT client error:', error);
});

mqttClient.on('disconnect', () => {
  console.log('⚠️ MQTT client disconnected');
});

mqttClient.on('reconnect', () => {
  console.log('🔄 MQTT client reconnecting...');
});

// Helper function to send MQTT commands
function sendMqttCommand(topic: string, payload: any) {
  return new Promise((resolve, reject) => {
    if (mqttClient.connected) {
      console.log(`📤 Sending MQTT command to ${topic}:`, payload);
      mqttClient.publish(topic, JSON.stringify(payload), (error: Error | undefined) => {
        if (error) {
          console.error(`❌ MQTT publish error for ${topic}:`, error);
          reject(error);
        } else {
          console.log(`✅ MQTT command sent successfully to ${topic}`);
          resolve(true);
        }
      });
    } else {
      console.error('❌ MQTT client not connected');
      reject(new Error('MQTT client not connected'));
    }
  });
}

// Function to broadcast section updates (will be imported from index.ts)
function broadcastSectionUpdate(farmId: number, sectionNumber: number, data: any) {
  // This will be replaced with the actual import once circular dependency is resolved
  console.log(`Broadcasting update for farm ${farmId}, section ${sectionNumber}:`, data);
}

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
router.get('/sections', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    
    // Get sections for the specific farm
    const sections = await prisma.section.findMany({
      where: {
        farm_id: farmId
      },
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
    const sectionsWithData = sections.map((section: any) => {
      const moisture = (moistureReadings as any[]).find(r => r.section_id === section.id);
      const water = (waterUsage as any[]).find(w => w.section_id === section.id);
      const valve = (valveStatus as any[]).find(v => v.section_id === section.id);
      const irrigation = (lastIrrigation as any[]).find(i => i.section_id === section.id);

      return {
        id: section.id,
        farm_id: section.farm_id,
        section_number: section.section_number,
        name: section.name,
        crop: `Crop ${section.section_number}`,
        threshold: 60,
        area: 2500,
        location: `Zone ${section.section_number}`,
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

// Get section by farm_id and section_number with real data
router.get('/sections/:farmId/:sectionNumber', async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    // Get section with farm info using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      },
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
        where: { section_id: section.id },
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
          section_id: section.id,
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
      where: { section_id: section.id },
      orderBy: { createdAt: 'desc' }
    });

    const result = {
      id: section.id,
      farm_id: section.farm_id,
      section_number: section.section_number,
      name: section.name,
      crop: `Crop ${section.section_number}`,
      threshold: latestDeviceStatus?.threshold || 60,
      area: 2500,
      location: `Zone ${section.section_number}`,
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
router.post('/sections/:farmId/:sectionNumber/valve', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const { valveOpen, duration } = req.body;
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    // Get section using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // In a real implementation, this would send MQTT command to the Arduino
    // For now, we'll simulate the response and update the database
    
    // Simulate MQTT command
    const mqttCommand = {
      action: valveOpen ? 'irrigate' : 'stop',
      duration: duration || 60, // default 60 seconds
      timestamp: new Date().toISOString()
    };

    // Send MQTT command to device
    try {
      const topic = `farm/${farmIdInt}/section/${sectionNumberInt}/command`;
      await sendMqttCommand(topic, mqttCommand);

      res.json({ 
        success: true, 
        valveOpen: valveOpen,
        message: `Valve ${valveOpen ? 'opened' : 'closed'} for farm ${farmIdInt}, section ${sectionNumberInt}`,
        mqttCommand: mqttCommand
      });
    } catch (error) {
      console.error('Error sending MQTT command:', error);
      res.status(500).json({ 
        error: 'Failed to send command to device',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error toggling valve:', error);
    res.status(500).json({ error: 'Failed to toggle valve' });
  }
});

// Set irrigation mode for a section
router.post('/sections/:farmId/:sectionNumber/mode', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const { mode } = req.body;
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    if (!['auto', 'manual'].includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode. Must be "auto" or "manual"' });
    }

    // Get section using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Send MQTT command to device - FIXED: Use /mode topic instead of /config
    const mqttCommand = {
      mode: mode,
      timestamp: new Date().toISOString()
    };

    try {
      const topic = `farm/${farmIdInt}/section/${sectionNumberInt}/mode`; // FIXED: Correct topic
      await sendMqttCommand(topic, mqttCommand);

      res.json({ 
        success: true, 
        mode: mode,
        message: `Mode set to ${mode} for farm ${farmIdInt}, section ${sectionNumberInt}`,
        mqttCommand: mqttCommand
      });

      // Broadcast real-time update
      broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
        mode: mode,
        valve_open: false
      });
    } catch (error) {
      console.error('Error sending MQTT command:', error);
      res.status(500).json({ 
        error: 'Failed to send command to device',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error setting mode:', error);
    res.status(500).json({ error: 'Failed to set mode' });
  }
});

// Start irrigation with duration
router.post('/sections/:farmId/:sectionNumber/irrigate', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const { duration = 60 } = req.body; // duration in seconds
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    if (duration <= 0 || duration > 3600) {
      return res.status(400).json({ error: 'Duration must be between 1 and 3600 seconds' });
    }

    // Get section using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    try {
      // FIXED: First set mode to manual (required for irrigation commands)
      const modeCommand = {
        mode: 'manual',
        timestamp: new Date().toISOString()
      };
      const modeTopic = `farm/${farmIdInt}/section/${sectionNumberInt}/mode`;
      console.log(`🔄 Setting mode to manual for ${modeTopic}`);
      await sendMqttCommand(modeTopic, modeCommand);
      
      // Wait a moment for mode change to take effect
      console.log('⏳ Waiting for mode change to take effect...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send MQTT command to start irrigation
      const mqttCommand = {
        action: 'irrigate',
        duration: duration,
        timestamp: new Date().toISOString()
      };

      const topic = `farm/${farmIdInt}/section/${sectionNumberInt}/command`;
      console.log(`🚰 Starting irrigation for ${duration}s on ${topic}`);
      await sendMqttCommand(topic, mqttCommand);

      console.log(`✅ Irrigation started successfully for farm ${farmIdInt}, section ${sectionNumberInt}`);

      res.json({ 
        success: true, 
        message: `Started irrigation for ${duration} seconds on farm ${farmIdInt}, section ${sectionNumberInt}`,
        duration: duration,
        mqttCommand: mqttCommand
      });

      // Broadcast real-time update
      broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
        valve_open: true,
        mode: 'manual',
        irrigation_duration: duration
      });
    } catch (error) {
      console.error('❌ Error sending irrigation command:', error);
      res.status(500).json({ 
        error: 'Failed to send irrigation command to device',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error starting irrigation:', error);
    res.status(500).json({ error: 'Failed to start irrigation' });
  }
});

// Stop irrigation
router.post('/sections/:farmId/:sectionNumber/stop-irrigation', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    // Get section using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    try {
      // Send MQTT command to stop irrigation
      const mqttCommand = {
        action: 'stop',
        timestamp: new Date().toISOString()
      };
      const topic = `farm/${farmIdInt}/section/${sectionNumberInt}/command`;
      console.log(`🛑 Stopping irrigation on ${topic}`);
      await sendMqttCommand(topic, mqttCommand);

      console.log(`✅ Irrigation stopped successfully for farm ${farmIdInt}, section ${sectionNumberInt}`);

      res.json({ 
        success: true, 
        message: `Stopped irrigation on farm ${farmIdInt}, section ${sectionNumberInt}`,
        mqttCommand: mqttCommand
      });

      // Broadcast real-time update
      broadcastSectionUpdate(farmIdInt, sectionNumberInt, {
        valve_open: false,
        mode: 'manual'
      });
    } catch (error) {
      console.error('❌ Error sending stop command:', error);
      res.status(500).json({ 
        error: 'Failed to send stop command to device',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error stopping irrigation:', error);
    res.status(500).json({ error: 'Failed to stop irrigation' });
  }
});

// Bulk irrigation operations
router.post('/sections/bulk/irrigate', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { sections, duration = 60 } = req.body; // sections: [{farmId, sectionNumber}]
    const farmId = req.farmId || 1;

    if (!Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ error: 'sections must be a non-empty array' });
    }

    if (duration <= 0 || duration > 3600) {
      return res.status(400).json({ error: 'Duration must be between 1 and 3600 seconds' });
    }

    const results: any[] = [];
    const errors: any[] = [];

    // Process each section concurrently
    const promises = sections.map(async (section: any) => {
      try {
        const { farmId: sectionFarmId, sectionNumber } = section;
        const targetFarmId = sectionFarmId || farmId;
        
        // Set mode to manual first
        const modeCommand = {
          mode: 'manual',
          timestamp: new Date().toISOString()
        };
        const modeTopic = `farm/${targetFarmId}/section/${sectionNumber}/mode`;
        console.log(`🔄 Setting mode to manual for ${modeTopic}`);
        await sendMqttCommand(modeTopic, modeCommand);
        
        // Wait a moment for mode change
        await new Promise(resolve => setTimeout(resolve, 500));

        // Send irrigation command
        const mqttCommand = {
          action: 'irrigate',
          duration: duration,
          timestamp: new Date().toISOString()
        };
        const topic = `farm/${targetFarmId}/section/${sectionNumber}/command`;
        console.log(`🚰 Starting irrigation for ${duration}s on ${topic}`);
        await sendMqttCommand(topic, mqttCommand);

        return {
          farmId: targetFarmId,
          sectionNumber,
          success: true,
          message: `Started irrigation for ${duration} seconds`
        };
      } catch (error) {
        return {
          farmId: section.farmId || farmId,
          sectionNumber: section.sectionNumber,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });

    const sectionResults = await Promise.all(promises);
    
    // Separate successes and errors
    sectionResults.forEach(result => {
      if (result.success) {
        results.push(result);
      } else {
        errors.push(result);
      }
    });

    console.log(`✅ Bulk irrigation completed: ${results.length} successful, ${errors.length} failed`);

    res.json({
      success: true,
      message: `Bulk irrigation operation completed`,
      summary: {
        total: sections.length,
        successful: results.length,
        failed: errors.length
      },
      results,
      errors
    });

    // Broadcast updates for successful operations
    results.forEach(result => {
      broadcastSectionUpdate(result.farmId, result.sectionNumber, {
        valve_open: true,
        mode: 'manual',
        irrigation_duration: duration
      });
    });

  } catch (error) {
    console.error('❌ Error in bulk irrigation:', error);
    res.status(500).json({ error: 'Failed to execute bulk irrigation' });
  }
});

// Bulk stop irrigation operations
router.post('/sections/bulk/stop-irrigation', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { sections } = req.body; // sections: [{farmId, sectionNumber}]
    const farmId = req.farmId || 1;

    if (!Array.isArray(sections) || sections.length === 0) {
      return res.status(400).json({ error: 'sections must be a non-empty array' });
    }

    const results: any[] = [];
    const errors: any[] = [];

    // Process each section concurrently
    const promises = sections.map(async (section: any) => {
      try {
        const { farmId: sectionFarmId, sectionNumber } = section;
        const targetFarmId = sectionFarmId || farmId;
        
        // Send stop command
        const mqttCommand = {
          action: 'stop',
          timestamp: new Date().toISOString()
        };
        const topic = `farm/${targetFarmId}/section/${sectionNumber}/command`;
        console.log(`🛑 Stopping irrigation on ${topic}`);
        await sendMqttCommand(topic, mqttCommand);

        return {
          farmId: targetFarmId,
          sectionNumber,
          success: true,
          message: `Stopped irrigation`
        };
      } catch (error) {
        return {
          farmId: section.farmId || farmId,
          sectionNumber: section.sectionNumber,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });

    const sectionResults = await Promise.all(promises);
    
    // Separate successes and errors
    sectionResults.forEach(result => {
      if (result.success) {
        results.push(result);
      } else {
        errors.push(result);
      }
    });

    console.log(`✅ Bulk stop irrigation completed: ${results.length} successful, ${errors.length} failed`);

    res.json({
      success: true,
      message: `Bulk stop irrigation operation completed`,
      summary: {
        total: sections.length,
        successful: results.length,
        failed: errors.length
      },
      results,
      errors
    });

    // Broadcast updates for successful operations
    results.forEach(result => {
      broadcastSectionUpdate(result.farmId, result.sectionNumber, {
        valve_open: false,
        mode: 'manual'
      });
    });

  } catch (error) {
    console.error('❌ Error in bulk stop irrigation:', error);
    res.status(500).json({ error: 'Failed to execute bulk stop irrigation' });
  }
});

// Bulk mode change
router.post('/sections/bulk/mode', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { sectionIds, mode } = req.body;
    const farmId = req.farmId || 1;

    if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
      return res.status(400).json({ error: 'sectionIds must be a non-empty array' });
    }

    if (!['auto', 'manual'].includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode. Must be "auto" or "manual"' });
    }

    const results = [];
    const errors = [];

    // Process each section
    for (const sectionId of sectionIds) {
      try {
        const mqttCommand = {
          mode: mode,
          timestamp: new Date().toISOString()
        };

        const topic = `farm/${farmId}/section/${sectionId}/config`;
        await sendMqttCommand(topic, mqttCommand);

        results.push({
          sectionId,
          success: true,
          message: `Mode set to ${mode}`
        });
      } catch (error) {
        errors.push({
          sectionId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    res.json({
      success: true,
      message: `Bulk mode change completed`,
      summary: {
        total: sectionIds.length,
        successful: results.length,
        failed: errors.length
      },
      results,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Error in bulk mode change:', error);
    res.status(500).json({ error: 'Failed to execute bulk mode change' });
  }
});

// Bulk configuration update
router.post('/sections/bulk/config', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { sectionIds, config } = req.body;
    const farmId = req.farmId || 1;

    if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
      return res.status(400).json({ error: 'sectionIds must be a non-empty array' });
    }

    if (!config || typeof config !== 'object') {
      return res.status(400).json({ error: 'config must be a valid object' });
    }

    const results = [];
    const errors = [];

    // Process each section
    for (const sectionId of sectionIds) {
      try {
        const mqttCommand = {
          ...config,
          timestamp: new Date().toISOString()
        };

        const topic = `farm/${farmId}/section/${sectionId}/config`;
        await sendMqttCommand(topic, mqttCommand);

        results.push({
          sectionId,
          success: true,
          message: 'Configuration updated'
        });
      } catch (error) {
        errors.push({
          sectionId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    res.json({
      success: true,
      message: `Bulk configuration update completed`,
      summary: {
        total: sectionIds.length,
        successful: results.length,
        failed: errors.length
      },
      results,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Error in bulk configuration update:', error);
    res.status(500).json({ error: 'Failed to execute bulk configuration update' });
  }
});

// Configure device settings
router.post('/sections/:farmId/:sectionNumber/config', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const { threshold, enableDeepSleep, deepSleepDuration, reportingInterval } = req.body;
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    // Get section using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const config: any = {};
    if (threshold !== undefined) config.threshold = threshold;
    if (enableDeepSleep !== undefined) config.enable_deep_sleep = enableDeepSleep;
    if (deepSleepDuration !== undefined) config.deep_sleep_duration = deepSleepDuration;
    if (reportingInterval !== undefined) config.reporting_interval = reportingInterval;

    // Send MQTT command to device
    try {
      const topic = `farm/${farmIdInt}/section/${sectionNumberInt}/config`;
      const mqttCommand = {
        ...config,
        timestamp: new Date().toISOString()
      };
      
      await sendMqttCommand(topic, mqttCommand);

      res.json({ 
        success: true, 
        config: config,
        message: `Configuration updated for farm ${farmIdInt}, section ${sectionNumberInt}`,
        mqttCommand: mqttCommand
      });
    } catch (error) {
      console.error('Error sending MQTT command:', error);
      res.status(500).json({ 
        error: 'Failed to send configuration to device',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
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
router.get('/sections/:farmId/:sectionNumber/readings', async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    // Get section using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const readings = await prisma.moistureReading.findMany({
      where: { section_id: section.id },
      orderBy: { timestamp: 'desc' },
      take: 50
    });

    res.json(readings);
  } catch (error) {
    console.error('Error fetching readings:', error);
    res.status(500).json({ error: 'Failed to fetch readings' });
  }
});

// Get device status for a specific section
router.get('/sections/:farmId/:sectionNumber/device-status', async (req, res) => {
  try {
    const { farmId, sectionNumber } = req.params;
    const farmIdInt = parseInt(farmId);
    const sectionNumberInt = parseInt(sectionNumber);

    // Get section using farm_id and section_number
    const section = await prisma.section.findFirst({
      where: { 
        farm_id: farmIdInt,
        section_number: sectionNumberInt
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Get latest moisture device status
    const moistureStatus = await prisma.moistureDeviceStatus.findFirst({
      where: { section_id: section.id },
      orderBy: { createdAt: 'desc' }
    });

    // Get latest irrigation device status
    const irrigationStatus = await prisma.irrigationDeviceStatus.findFirst({
      where: { section_id: section.id },
      orderBy: { createdAt: 'desc' }
    });

    // Combine the statuses, prioritizing irrigation status if both exist
    const deviceStatus = irrigationStatus || moistureStatus;

    if (!deviceStatus) {
      return res.status(404).json({ error: 'No device status found for this section' });
    }

    // Convert BigInt values to numbers
    const convertedStatus = convertBigIntsToNumbers(deviceStatus);

    res.json(convertedStatus);
  } catch (error) {
    console.error('Error fetching device status:', error);
    res.status(500).json({ error: 'Failed to fetch device status' });
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
    const { section_number, farm_id, days = 7 } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
    
    const where: any = {
      timestamp: {
        gte: daysAgo
      }
    };

    if (section_number) {
      where.section_number = parseInt(section_number as string);
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

    const values = readings.map((r: any) => r.value);
    const mean = stats._avg.value || 0;
    const variance = values.reduce((acc: number, val: number) => acc + Math.pow(val - mean, 2), 0) / values.length;
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
    const eventsWithDuration = events.map((event: any) => ({
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
    const { section_number, farm_id, days = 7 } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
    
    const where: any = {
      start_time: {
        gte: daysAgo
      }
    };

    if (section_number) {
      where.section_number = parseInt(section_number as string);
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

    const totalDuration = events.reduce((acc: number, event: any) => {
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
    const { farm_id, section_number, days = 7 } = req.query;
    
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));
    
    let whereClause = '';
    let params: any[] = [daysAgo];

    if (farm_id) {
      whereClause += ' AND farm_id = $2';
      params.push(parseInt(farm_id as string));
    }

    if (section_number) {
      whereClause += ` AND section_number = $${params.length + 1}`;
      params.push(parseInt(section_number as string));
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
    const { farm_id, section_number } = req.query;
    
    const where: any = {};
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (section_number) {
      where.section_number = parseInt(section_number as string);
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
    const { farm_id, section_number } = req.query;
    
    const where: any = {};
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (section_number) {
      where.section_number = parseInt(section_number as string);
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
    const { farm_id, section_number, device_id } = req.query;
    
    const where: any = {};
    
    if (farm_id) {
      where.farm_id = parseInt(farm_id as string);
    }
    
    if (section_number) {
      where.section_number = parseInt(section_number as string);
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

// Get latest moisture readings
router.get('/moisture-readings/latest', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    
    const latestReadings = await prisma.$queryRaw`
      SELECT 
        mr.id,
        mr.farm_id,
        mr.section_id,
        mr.value,
        mr.timestamp,
        f.name as farm_name,
        s.name as section_name
      FROM moisture_readings mr
      JOIN farms f ON mr.farm_id = f.id
      JOIN sections s ON mr.section_id = s.id
      WHERE mr.farm_id = ${farmId}
      AND (mr.section_id, mr.timestamp) IN (
        SELECT section_id, MAX(timestamp) 
        FROM moisture_readings 
        WHERE farm_id = ${farmId}
        GROUP BY section_id
      )
      ORDER BY mr.section_id
    `;

    res.json(convertBigIntsToNumbers(latestReadings));
  } catch (error) {
    console.error('Error fetching latest moisture readings:', error);
    res.status(500).json({ error: 'Failed to fetch latest moisture readings' });
  }
});

// Get section usage statistics
router.get('/irrigation-events/section-usage', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    const { days = '7' } = req.query;
    const daysInt = parseInt(days as string);

    const sectionUsage = await prisma.$queryRaw`
      SELECT 
        ie.section_id::int as section_id,
        COALESCE(SUM(ie.water_ml) / 1000.0, 0)::float as water_liters,
        COUNT(*)::int as event_count,
        COALESCE(AVG(EXTRACT(EPOCH FROM (ie.end_time - ie.start_time)) / 60), 0)::float as avg_duration_minutes,
        MAX(ie.start_time) as last_irrigation
      FROM irrigation_events ie
      JOIN sections s ON ie.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND ie.start_time >= NOW() - INTERVAL '${daysInt} days'
      GROUP BY ie.section_id
      ORDER BY ie.section_id
    `;

    res.json(convertBigIntsToNumbers(sectionUsage));
  } catch (error) {
    console.error('Error fetching section usage:', error);
    res.status(500).json({ error: 'Failed to fetch section usage' });
  }
});

// Get daily usage statistics
router.get('/irrigation-events/daily-usage', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    const { days = '7', section_number } = req.query;
    const daysInt = parseInt(days as string);

    let whereClause = `s.farm_id = ${farmId}`;
    if (section_number) {
      whereClause += ` AND ie.section_number = ${parseInt(section_number as string)}`;
    }

    const dailyUsage = await prisma.$queryRaw`
      SELECT 
        DATE(ie.start_time) as date,
        COALESCE(SUM(ie.water_ml) / 1000.0, 0)::float as water_liters,
        COUNT(*)::int as event_count,
        COALESCE(AVG(EXTRACT(EPOCH FROM (ie.end_time - ie.start_time)) / 60), 0)::float as avg_duration_minutes
      FROM irrigation_events ie
      JOIN sections s ON ie.section_id = s.id
      WHERE ${whereClause}
      AND ie.start_time >= NOW() - INTERVAL '${daysInt} days'
      GROUP BY DATE(ie.start_time)
      ORDER BY date DESC
    `;

    res.json(convertBigIntsToNumbers(dailyUsage));
  } catch (error) {
    console.error('Error fetching daily usage:', error);
    res.status(500).json({ error: 'Failed to fetch daily usage' });
  }
});

// Get moisture readings for a specific section
router.get('/sections/:id/readings', authenticateToken, validateFarmAccess('params'), async (req, res) => {
  try {
    const { id } = req.params;
    const sectionId = parseInt(id);
    const farmId = req.farmId!;

    // Verify section belongs to the farm
    const section = await prisma.section.findFirst({
      where: {
        id: sectionId,
        farm_id: farmId
      }
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const readings = await prisma.moistureReading.findMany({
      where: {
        section_id: sectionId,
        farm_id: farmId
      },
      include: {
        farm: true,
        section: true
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 50 // Limit to last 50 readings
    });

    res.json(convertBigIntsToNumbers(readings));
  } catch (error) {
    console.error('Error fetching section readings:', error);
    res.status(500).json({ error: 'Failed to fetch section readings' });
  }
});

// Analytics endpoints
router.get('/analytics/water-usage', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    const { period = '7' } = req.query;
    const days = parseInt(period as string);

    const waterUsage = await prisma.$queryRaw`
      SELECT 
        DATE(start_time) as date,
        COALESCE(SUM(water_ml) / 1000.0, 0)::float as water_liters,
        COUNT(*)::int as event_count
      FROM irrigation_events ie
      JOIN sections s ON ie.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND ie.start_time >= NOW() - INTERVAL '${days} days'
      GROUP BY DATE(start_time)
      ORDER BY date DESC
    `;

    res.json(convertBigIntsToNumbers(waterUsage));
  } catch (error) {
    console.error('Error fetching water usage analytics:', error);
    res.status(500).json({ error: 'Failed to fetch water usage analytics' });
  }
});

router.get('/analytics/moisture-trends', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    const { period = '7' } = req.query;
    const days = parseInt(period as string);

    const moistureTrends = await prisma.$queryRaw`
      SELECT 
        DATE(timestamp) as date,
        AVG(value)::float as avg_moisture,
        MIN(value)::float as min_moisture,
        MAX(value)::float as max_moisture,
        COUNT(*)::int as reading_count
      FROM moisture_readings mr
      JOIN sections s ON mr.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND mr.timestamp >= NOW() - INTERVAL '${days} days'
      GROUP BY DATE(timestamp)
      ORDER BY date DESC
    `;

    res.json(convertBigIntsToNumbers(moistureTrends));
  } catch (error) {
    console.error('Error fetching moisture trends:', error);
    res.status(500).json({ error: 'Failed to fetch moisture trends' });
  }
});

router.get('/analytics/valve-activity', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    const { period = '7' } = req.query;
    const days = parseInt(period as string);

    const valveActivity = await prisma.$queryRaw`
      SELECT 
        DATE(timestamp) as date,
        COUNT(*) FILTER (WHERE valve_on = 1)::int as active_valves,
        COUNT(*)::int as total_events
      FROM irrigation_device_status ids
      JOIN sections s ON ids.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND ids.timestamp >= EXTRACT(EPOCH FROM (NOW() - INTERVAL '${days} days')) * 1000
      GROUP BY DATE(FROM_UNIXTIME(ids.timestamp / 1000))
      ORDER BY date DESC
    `;

    res.json(convertBigIntsToNumbers(valveActivity));
  } catch (error) {
    console.error('Error fetching valve activity:', error);
    res.status(500).json({ error: 'Failed to fetch valve activity' });
  }
});

router.get('/analytics/summary', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId!;
    const { period = '7' } = req.query;
    const days = parseInt(period as string);

    // Get total water usage
    const waterUsage = await prisma.$queryRaw`
      SELECT COALESCE(SUM(water_ml) / 1000.0, 0)::float as total_water_liters
      FROM irrigation_events ie
      JOIN sections s ON ie.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND ie.start_time >= NOW() - INTERVAL '${days} days'
    `;

    // Get average moisture
    const moisture = await prisma.$queryRaw`
      SELECT AVG(value)::float as avg_moisture
      FROM moisture_readings mr
      JOIN sections s ON mr.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND mr.timestamp >= NOW() - INTERVAL '${days} days'
    `;

    // Get active valves count
    const activeValves = await prisma.$queryRaw`
      SELECT COUNT(DISTINCT section_id)::int as active_valves
      FROM irrigation_device_status ids
      JOIN sections s ON ids.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND ids.valve_on = 1
      AND ids.timestamp >= EXTRACT(EPOCH FROM (NOW() - INTERVAL '${days} days')) * 1000
    `;

    // Get total irrigation events
    const events = await prisma.$queryRaw`
      SELECT COUNT(*)::int as total_events
      FROM irrigation_events ie
      JOIN sections s ON ie.section_id = s.id
      WHERE s.farm_id = ${farmId}
      AND ie.start_time >= NOW() - INTERVAL '${days} days'
    `;

    const summary = {
      totalWaterUsage: (waterUsage as any[])[0]?.total_water_liters || 0,
      averageMoisture: Math.round((moisture as any[])[0]?.avg_moisture || 0),
      activeValves: (activeValves as any[])[0]?.active_valves || 0,
      totalEvents: (events as any[])[0]?.total_events || 0,
      period: days
    };

    res.json(summary);
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    res.status(500).json({ error: 'Failed to fetch analytics summary' });
  }
});

export default router; 