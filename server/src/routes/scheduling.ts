import express from 'express';
import { prisma } from '../lib/prisma';
import { authenticateToken } from '../lib/auth';
import { validateFarmAccess } from '../lib/farmAccess';
import { SchedulingService } from '../services/SchedulingService';
import { CronService } from '../services/CronService';

const router = express.Router();
const schedulingService = new SchedulingService();
const cronService = CronService.getInstance();

// Get all schedules for a farm
router.get('/', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId || 1;
    const schedules = await SchedulingService.getSchedules(farmId);
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// Create a new schedule
router.post('/', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const scheduleData = {
      name: req.body.name,
      farm_id: req.body.farm_id,
      section_numbers: req.body.section_numbers,
      start_time: req.body.start_time,
      duration_minutes: req.body.duration_minutes,
      frequency: req.body.frequency,
      days_of_week: req.body.days_of_week || [],
      day_of_month: req.body.day_of_month,
      is_active: req.body.is_active ?? true,
      weather_dependent: req.body.weather_dependent ?? false,
      min_temperature: req.body.min_temperature,
      max_temperature: req.body.max_temperature,
      min_moisture: req.body.min_moisture,
      created_by: req.user!.id
    };

    const schedule = await SchedulingService.createSchedule(scheduleData);
    res.status(201).json(schedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

// Get a specific schedule
router.get('/:id', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await SchedulingService.getSchedule(id);
    
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Update a schedule
router.put('/:id', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      name: req.body.name,
      farm_id: req.body.farm_id,
      section_numbers: req.body.section_numbers,
      start_time: req.body.start_time,
      duration_minutes: req.body.duration_minutes,
      frequency: req.body.frequency,
      days_of_week: req.body.days_of_week,
      day_of_month: req.body.day_of_month,
      is_active: req.body.is_active,
      weather_dependent: req.body.weather_dependent,
      min_temperature: req.body.min_temperature,
      max_temperature: req.body.max_temperature,
      min_moisture: req.body.min_moisture
    };

    const schedule = await SchedulingService.updateSchedule(id, updateData);
    res.json(schedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ error: 'Failed to update schedule' });
  }
});

// Delete a schedule
router.delete('/:id', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { id } = req.params;
    await SchedulingService.deleteSchedule(id);
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

// Toggle schedule active status
router.patch('/:id/toggle', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await SchedulingService.toggleSchedule(id);
    res.json(schedule);
  } catch (error) {
    console.error('Error toggling schedule:', error);
    res.status(500).json({ error: 'Failed to toggle schedule' });
  }
});

// Get scheduled irrigations
router.get('/:id/irrigations', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId || 1;
    const { status, startDate, endDate, limit, offset } = req.query;
    
    const options: any = {};
    if (status) options.status = status as string;
    if (startDate) options.startDate = new Date(startDate as string);
    if (endDate) options.endDate = new Date(endDate as string);
    if (limit) options.limit = parseInt(limit as string);
    if (offset) options.offset = parseInt(offset as string);

    const irrigations = await SchedulingService.getScheduledIrrigations(farmId, options);
    res.json(irrigations);
  } catch (error) {
    console.error('Error fetching scheduled irrigations:', error);
    res.status(500).json({ error: 'Failed to fetch scheduled irrigations' });
  }
});

// Execute a scheduled irrigation (manual trigger)
router.post('/:id/execute', authenticateToken, validateFarmAccess('body'), async (req, res) => {
  try {
    const { id } = req.params;
    const { sectionId, scheduledTime } = req.body;
    
    const result = await SchedulingService.executeScheduledIrrigation(
      id, 
      sectionId, 
      new Date(scheduledTime)
    );
    
    res.json(result);
  } catch (error) {
    console.error('Error executing scheduled irrigation:', error);
    res.status(500).json({ error: 'Failed to execute scheduled irrigation' });
  }
});

// Get upcoming irrigations
router.get('/upcoming/irrigations', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId || 1;
    const hours = req.query.hours ? parseInt(req.query.hours as string) : 24;
    
    const irrigations = await SchedulingService.getUpcomingIrrigations(farmId, hours);
    res.json(irrigations);
  } catch (error) {
    console.error('Error fetching upcoming irrigations:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming irrigations' });
  }
});

// Get schedule statistics
router.get('/stats/overview', authenticateToken, validateFarmAccess('query'), async (req, res) => {
  try {
    const farmId = req.farmId || 1;
    const days = req.query.days ? parseInt(req.query.days as string) : 30;
    
    const stats = await SchedulingService.getScheduleStats(farmId, days);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching schedule stats:', error);
    res.status(500).json({ error: 'Failed to fetch schedule stats' });
  }
});

// Cron service control endpoints
router.get('/cron/status', authenticateToken, (req, res) => {
  try {
    const cronService = CronService.getInstance();
    const status = cronService.getStatus();
    res.json(status);
  } catch (error) {
    console.error('Error getting cron status:', error);
    res.status(500).json({ error: 'Failed to get cron status' });
  }
});

router.post('/cron/start', authenticateToken, (req, res) => {
  try {
    const cronService = CronService.getInstance();
    cronService.start();
    res.json({ message: 'Cron service started successfully' });
  } catch (error) {
    console.error('Error starting cron service:', error);
    res.status(500).json({ error: 'Failed to start cron service' });
  }
});

router.post('/cron/stop', authenticateToken, (req, res) => {
  try {
    const cronService = CronService.getInstance();
    cronService.stop();
    res.json({ message: 'Cron service stopped successfully' });
  } catch (error) {
    console.error('Error stopping cron service:', error);
    res.status(500).json({ error: 'Failed to stop cron service' });
  }
});

router.post('/cron/trigger', authenticateToken, (req, res) => {
  try {
    const cronService = CronService.getInstance();
    cronService.manualTrigger();
    res.json({ message: 'Manual trigger initiated successfully' });
  } catch (error) {
    console.error('Error triggering cron manually:', error);
    res.status(500).json({ error: 'Failed to trigger cron manually' });
  }
});

export default router; 