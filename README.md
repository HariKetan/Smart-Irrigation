# Smart Irrigation System - Refactored

A comprehensive IoT-based smart irrigation system with real-time monitoring, automated scheduling, and intelligent water management.

## 🚀 Features

### Core Functionality

- **Real-time Monitoring**: Live soil moisture and irrigation status
- **Automated Scheduling**: Intelligent irrigation scheduling with weather considerations
- **Multi-Farm Support**: Manage multiple farms and sections
- **Device Management**: ESP32-based moisture sensors and irrigation controllers
- **Analytics Dashboard**: Comprehensive water usage and efficiency analytics
- **WebSocket Real-time Updates**: Live data streaming to the frontend

### Technical Features

- **Environment-based Configuration**: All settings configurable via environment variables
- **Centralized MQTT Service**: Robust MQTT communication with automatic reconnection
- **TypeScript Support**: Full type safety across the entire stack
- **Modern UI**: React-based dashboard with responsive design
- **Database Integration**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based user authentication and authorization

## 🏗️ Architecture

```
Smart Irrigation System
├── client/                 # Next.js React Frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/          # Utilities and configuration
│   │   └── types/        # TypeScript type definitions
├── server/                # Node.js Express Backend
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── services/     # Business logic services
│   │   ├── lib/          # Utilities and configuration
│   │   └── prisma/       # Database schema and migrations
└── areca/                 # ESP32 Firmware & Python Backend
    ├── esp32_irrigation_controller/
    ├── esp32_moisture_sensor/
    └── python_backend.py
```

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Recharts** - Data visualization
- **WebSocket** - Real-time communication

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **MQTT** - IoT communication
- **WebSocket** - Real-time updates
- **JWT** - Authentication

### IoT

- **ESP32** - Microcontroller
- **Arduino** - Firmware development
- **MQTT** - Device communication
- **Python** - Data processing backend

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Python 3.8+
- Arduino IDE (for ESP32 firmware)
- MQTT Broker (Mosquitto recommended)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Smart-Irrigation
```

### 2. Environment Setup

#### Server Environment

```bash
cd server
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/irrigation_db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# MQTT Configuration
MQTT_BROKER_URL=mqtt://your-mqtt-broker:1883
MQTT_USERNAME=your-username
MQTT_PASSWORD=your-password

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

#### Client Environment

```bash
cd client
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Client Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000

# Google Maps Configuration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_MAPS=true
NEXT_PUBLIC_ENABLE_REAL_TIME=true
```

### 3. Database Setup

```bash
cd server
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Install Dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd client
npm install
```

### 5. Start Development Servers

#### Server

```bash
cd server
npm run dev
```

#### Client

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api/health

## 📊 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user profile

### Sections & Irrigation

- `GET /api/real/sections` - Get all sections with real-time data
- `GET /api/real/sections/:farmId/:sectionNumber` - Get specific section
- `POST /api/real/sections/:farmId/:sectionNumber/valve` - Toggle valve
- `POST /api/real/sections/:farmId/:sectionNumber/mode` - Set irrigation mode
- `POST /api/real/:farmId/:sectionNumber/irrigate` - Start irrigation
- `POST /api/real/sections/:farmId/:sectionNumber/stop-irrigation` - Stop irrigation

### Bulk Operations

- `POST /api/real/sections/bulk/irrigate` - Bulk irrigation
- `POST /api/real/sections/bulk/stop-irrigation` - Bulk stop irrigation
- `POST /api/real/sections/bulk/mode` - Bulk mode change
- `POST /api/real/sections/bulk/config` - Bulk configuration update

### Analytics

- `GET /api/real/analytics/water-usage/:farmId` - Water usage analytics
- `GET /api/real/analytics/efficiency/:farmId` - Efficiency reports
- `GET /api/real/analytics/moisture-trends` - Moisture trends
- `GET /api/real/analytics/valve-activity` - Valve activity

### Scheduling

- `GET /api/scheduling` - Get irrigation schedules
- `POST /api/scheduling` - Create new schedule
- `PUT /api/scheduling/:id` - Update schedule
- `DELETE /api/scheduling/:id` - Delete schedule

## 🔧 Configuration

### Environment Variables

The system uses comprehensive environment variable configuration for all settings:

#### Server Configuration

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `MQTT_BROKER_URL` - MQTT broker URL
- `CORS_ORIGIN` - Allowed CORS origins

#### Client Configuration

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_WS_URL` - WebSocket URL
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- Feature flags for enabling/disabling features

### MQTT Topics

The system uses a structured MQTT topic hierarchy:

```
farm/{farmId}/section/{sectionNumber}/{messageType}
```

Message types:

- `moisture` - Soil moisture readings
- `irrigation` - Irrigation events
- `status` - Device status updates
- `ack` - Command acknowledgments
- `config` - Configuration updates
- `command` - Irrigation commands
- `mode` - Mode change commands

## 🗄️ Database Schema

The system uses PostgreSQL with the following main tables:

- `farms` - Farm information
- `sections` - Irrigation sections
- `moisture_readings` - Soil moisture data
- `irrigation_events` - Irrigation event logs
- `irrigation_schedules` - Scheduled irrigation
- `device_status` - Device health monitoring

## 🔌 IoT Integration

### ESP32 Devices

The system supports two types of ESP32 devices:

1. **Moisture Sensors**

   - Monitor soil moisture levels
   - Publish data to MQTT
   - Support deep sleep for power saving

2. **Irrigation Controllers**
   - Control irrigation valves
   - Monitor water flow
   - Execute irrigation commands

### Device Configuration

Devices are configured via MQTT topics:

- `farm/{farmId}/section/{sectionNumber}/config` - Device configuration
- `farm/{farmId}/section/{sectionNumber}/mode` - Operation mode
- `farm/{farmId}/section/{sectionNumber}/command` - Irrigation commands

## 📈 Analytics & Reporting

The system provides comprehensive analytics:

- **Water Usage Analytics**: Daily, weekly, monthly water consumption
- **Efficiency Reports**: Water usage optimization recommendations
- **Moisture Trends**: Soil moisture pattern analysis
- **Valve Activity**: Irrigation system usage statistics

## 🔒 Security

- JWT-based authentication
- Role-based access control
- Environment variable configuration
- Input validation and sanitization
- CORS protection
- Rate limiting

## 🧪 Testing

```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test
```

## 📦 Deployment

### Production Build

#### Server

```bash
cd server
npm run build
npm start
```

#### Client

```bash
cd client
npm run build
npm start
```

### Docker Deployment

Docker configurations are available for containerized deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🔄 Changelog

### v2.0.0 (Refactored)

- ✅ Centralized configuration management
- ✅ Environment variable support
- ✅ MQTT service refactoring
- ✅ TypeScript improvements
- ✅ Code cleanup and optimization
- ✅ Enhanced error handling
- ✅ Improved documentation
- ✅ Security enhancements
