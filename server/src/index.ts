import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sensorsRouter from './routes/sensors';
import readingsRouter from './routes/readings';
import zonesRouter from './routes/zones';
import sectionsRouter from './routes/sections';
import valvesRouter from './routes/valves';
import authRouter from './routes/auth';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Irrigation System API' });
});

// API routes
app.use('/api/sensors', sensorsRouter);
app.use('/api/readings', readingsRouter);
app.use('/api/zones', zonesRouter);
app.use('/api/sections', sectionsRouter);
app.use('/api/valves', valvesRouter);
app.use('/api/auth', authRouter);

// Sample API routes (keeping for backward compatibility)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'Sample data from server',
    data: [
      { id: 1, name: 'Sensor 1', value: 25.5 },
      { id: 2, name: 'Sensor 2', value: 30.2 },
      { id: 3, name: 'Sensor 3', value: 28.7 },
      { id: 4, name: 'Sensor 4', value: 28.7 }
    ]
  });
});

// Start server
app.listen(Number(PORT), '0.0.0.0', () => {
  // console.log(`Server is running on port ${PORT}`);
  // console.log(`API available at http://localhost:${PORT}`);
  // console.log(`Network access: http://192.168.1.150:${PORT}`);
}); 