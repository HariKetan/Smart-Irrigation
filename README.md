# Irrigation System

A full-stack irrigation monitoring system with a Next.js frontend and Express.js backend with PostgreSQL database.

## Project Structure

```
irrigation/
├── client/          # Frontend Next.js application
│   ├── src/
│   │   ├── app/     # Next.js app directory
│   │   └── components/ # React components
│   ├── public/      # Static assets
│   └── package.json # Frontend dependencies
└── server/          # Backend Express.js application
    ├── src/
    │   ├── routes/  # API routes
    │   ├── lib/     # Database and utilities
    │   └── index.ts # Main server file
    ├── prisma/      # Database schema and migrations
    └── package.json # Backend dependencies
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Database Setup

1. Install PostgreSQL on your system
2. Create a new database:
   ```sql
   CREATE DATABASE irrigation_db;
   ```

3. Update the `.env` file in the server directory with your database credentials:
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` and update the DATABASE_URL:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/irrigation_db"
   ```

## Getting Started

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate Prisma client:
   ```bash
   npm run db:generate
   ```

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Seed the database with sample data:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:3000`

## API Endpoints

### Sensors
- `GET /api/sensors` - Get all sensors
- `GET /api/sensors/:id` - Get sensor by ID
- `POST /api/sensors` - Create new sensor
- `PUT /api/sensors/:id` - Update sensor
- `DELETE /api/sensors/:id` - Delete sensor

### Readings
- `GET /api/readings` - Get all readings
- `GET /api/readings/:id` - Get reading by ID
- `POST /api/readings` - Create new reading
- `GET /api/readings/latest/all` - Get latest readings for all sensors

### Zones
- `GET /api/zones` - Get all zones
- `GET /api/zones/:id` - Get zone by ID
- `POST /api/zones` - Create new zone
- `PUT /api/zones/:id` - Update zone
- `DELETE /api/zones/:id` - Delete zone

### Legacy Endpoints
- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/data` - Sample data (for backward compatibility)

## Database Schema

### Models
- **Sensor**: Stores sensor information (type, location, zone)
- **Reading**: Stores sensor readings with timestamps
- **Zone**: Defines irrigation zones
- **IrrigationSchedule**: Manages irrigation schedules

### Sensor Types
- MOISTURE
- TEMPERATURE
- HUMIDITY
- PH
- NUTRIENT
- WATER_FLOW

## Features

- **Frontend**: Modern React with Next.js, TypeScript, and Tailwind CSS
- **Backend**: Express.js server with TypeScript and Prisma ORM
- **Database**: PostgreSQL with proper relationships and constraints
- **Real-time Data**: Sample sensor data with historical readings
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript support
- **Database Management**: Prisma Studio for database visualization

## Development

### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- CORS
- dotenv
- nodemon (dev)

## Database Management

### Prisma Studio
To view and manage your database through a GUI:
```bash
cd server
npm run db:studio
```

This will open Prisma Studio in your browser at `http://localhost:5555`

### Database Migrations
When you make changes to the schema:
```bash
cd server
npm run db:migrate
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Ensure database migrations are up to date
6. Submit a pull request
