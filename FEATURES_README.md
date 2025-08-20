# 🌱 Smart Irrigation System - Complete Features Guide

A comprehensive IoT-based smart irrigation system with real-time monitoring, automated control, and advanced analytics. Built with Node.js, React, PostgreSQL, and MQTT for seamless IoT device integration.

## 🚀 Table of Contents

- [System Architecture](#system-architecture)
- [Core Features](#core-features)
- [IoT Integration](#iot-integration)
- [Real-time Monitoring](#real-time-monitoring)
- [Automated Irrigation Control](#automated-irrigation-control)
- [Bulk Operations](#bulk-operations)
- [Advanced Analytics](#advanced-analytics)
- [Scheduling System](#scheduling-system)
- [Device Management](#device-management)
- [Security Features](#security-features)
- [API Reference](#api-reference)
- [Installation & Setup](#installation--setup)

## 🏗️ System Architecture

The Smart Irrigation System follows a modern microservices architecture with real-time capabilities:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Node.js API    │    │  PostgreSQL DB  │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   WebSocket     │◄─────────────┘
                        │  (Real-time)    │
                        └─────────────────┘
                                │
                        ┌─────────────────┐
                        │   MQTT Broker   │
                        │   (IoT Hub)     │
                        └─────────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
        ┌───────────────┐              ┌───────────────┐
        │ ESP32 Sensors │              │ ESP32 Valves  │
        │ (Moisture)    │              │ (Irrigation)  │
        └───────────────┘              └───────────────┘
```

## 🔧 Core Features

### 1. Real-time IoT Integration

The system integrates with ESP32 devices using MQTT protocol with SSL/TLS encryption:

```typescript
// MQTT Service Configuration
export class MqttService {
    private client: mqtt.MqttClient | null = null;
    
    public async connect(): Promise<void> {
        this.client = mqtt.connect(mqttConfig.brokerUrl, {
            username: mqttConfig.username,
            password: mqttConfig.password,
            reconnectPeriod: mqttConfig.reconnectPeriod,
            connectTimeout: mqttConfig.connectTimeout,
            clean: true,
            keepalive: 60,
            // MQTTS configuration
            rejectUnauthorized: false, // Allow self-signed certificates
        });
    }
    
    // Subscribe to IoT device topics
    private subscribeToTopics(): void {
        const topics = [
            "farm/+/section/+/moisture",
            "farm/+/section/+/status",
            "farm/+/section/+/irrigation",
            "farm/+/section/+/ack",
            "farm/+/section/+/config",
            "farm/+/test",
        ];
        
        topics.forEach((topic) => {
            this.client!.subscribe(topic);
        });
    }
}
```

### 2. Soil Moisture Monitoring

Real-time soil moisture data collection and processing:

```typescript
// Moisture data handling
private async handleMoistureMessage(
    farmId: number,
    sectionNumber: number,
    data: any
): Promise<void> {
    // Save moisture reading to database
    const serverTimestamp = new Date();
    await prisma.moistureReading.create({
        data: {
            farm_id: farmId,
            section_number: sectionNumber,
            value: parseFloat(data.value),
            timestamp: serverTimestamp,
        },
    });

    // Broadcast real-time update
    broadcastSectionUpdate(farmId, sectionNumber, {
        moisture_value: parseFloat(data.value),
        timestamp: serverTimestamp.toISOString(),
        type: "moisture_update",
    });
}
```

### 3. Automated Irrigation Control

Smart irrigation control with multiple modes:

```typescript
// Irrigation control API
router.post(
    "/:farmId/:sectionNumber/irrigate",
    authenticateToken,
    validateFarmAccess("params"),
    async (req, res) => {
        const { farmId, sectionNumber } = req.params;
        const { duration = 60 } = req.body;

        try {
            // Send irrigation command via MQTT
            await mqttService.sendIrrigationCommand(
                parseInt(farmId),
                parseInt(sectionNumber),
                duration
            );

            // Update database
            await prisma.irrigationEvent.create({
                data: {
                    farm_id: parseInt(farmId),
                    section_number: parseInt(sectionNumber),
                    water_ml: 0, // Will be updated by device
                    start_time: new Date(),
                    end_time: new Date(Date.now() + duration * 1000),
                },
            });

            res.json({ success: true, message: "Irrigation started" });
        } catch (error) {
            res.status(500).json({ error: "Failed to start irrigation" });
        }
    }
);
```

### 4. Multiple Irrigation Modes

Support for different irrigation strategies:

```typescript
// Irrigation modes
export const IRRIGATION_MODES = {
    MANUAL: "manual",
    AUTO: "auto",
    SCHEDULED: "scheduled",
    THRESHOLD_BASED: "threshold_based",
} as const;

// Mode switching
router.post(
    "/:farmId/:sectionNumber/mode",
    authenticateToken,
    validateFarmAccess("params"),
    async (req, res) => {
        const { farmId, sectionNumber } = req.params;
        const { mode } = req.body;

        try {
            // Send mode command to device
            await mqttService.sendModeCommand(
                parseInt(farmId),
                parseInt(sectionNumber),
                mode
            );

            // Update section configuration
            await prisma.section.update({
                where: {
                    farm_id_section_number: {
                        farm_id: parseInt(farmId),
                        section_number: parseInt(sectionNumber),
                    },
                },
                data: { mode },
            });

            res.json({ success: true, mode });
        } catch (error) {
            res.status(500).json({ error: "Failed to update mode" });
        }
    }
);
```

## 🔄 Bulk Operations

Efficient management of multiple irrigation sections simultaneously:

```typescript
// Bulk irrigation control
export default function BulkOperations({ sections, onOperationComplete }: BulkOperationsProps) {
    const [selectedSections, setSelectedSections] = useState<number[]>([]);
    const [operation, setOperation] = useState<"irrigate" | "stop" | "mode" | "config">("irrigate");
    const [duration, setDuration] = useState(60);
    const [loading, setLoading] = useState(false);

    const executeBulkOperation = async () => {
        if (selectedSections.length === 0) return;

        setLoading(true);
        try {
            const sectionNumbers = getSelectedSectionNumbers();
            let response: any;

            switch (operation) {
                case "irrigate":
                    response = await api.bulkIrrigate(sectionNumbers, duration);
                    break;
                case "stop":
                    response = await api.bulkStopIrrigation(sectionNumbers);
                    break;
                case "mode":
                    response = await api.bulkSetMode(sectionNumbers, mode);
                    break;
                case "config":
                    response = await api.bulkUpdateConfig(sectionNumbers, {
                        min_threshold: minThreshold,
                        max_threshold: maxThreshold,
                    });
                    break;
            }

            if (response.success) {
                setResults(response.results);
                onOperationComplete?.();
            }
        } catch (error) {
            console.error("Bulk operation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bulk Operations</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Section selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {sections.map((section) => (
                        <div key={section.id} className="flex items-center space-x-2">
                            <Checkbox
                                checked={selectedSections.includes(section.id)}
                                onCheckedChange={() => handleSectionToggle(section.id)}
                            />
                            <Label>Section {section.section_number}</Label>
                        </div>
                    ))}
                </div>

                {/* Operation controls */}
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <Button onClick={handleSelectAll}>
                            {selectedSections.length === sections.length ? "Deselect All" : "Select All"}
                        </Button>
                        <Button 
                            onClick={executeBulkOperation} 
                            disabled={loading || selectedSections.length === 0}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Execute {operation}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
```

## 📊 Advanced Analytics

Comprehensive analytics and reporting system:

```typescript
// Analytics API endpoints
router.get("/water-usage/:farmId", authenticateToken, validateFarmAccess("params"), async (req, res) => {
    const { farmId } = req.params;
    const { period = "7d", sectionNumber } = req.query;

    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - getDaysFromPeriod(period));

        // Water usage analytics
        const waterUsage = await prisma.irrigationEvent.groupBy({
            by: ["section_number"],
            where: {
                farm_id: parseInt(farmId),
                start_time: { gte: startDate },
                ...(sectionNumber && { section_number: parseInt(sectionNumber as string) }),
            },
            _sum: { water_ml: true },
            _count: { id: true },
        });

        // Efficiency calculations
        const efficiency = await calculateEfficiency(parseInt(farmId), startDate);

        res.json({
            waterUsage: waterUsage.map(usage => ({
                sectionNumber: usage.section_number,
                totalWater: usage._sum.water_ml / 1000, // Convert to liters
                irrigationCount: usage._count.id,
            })),
            efficiency,
            period,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

// Moisture trends analysis
router.get("/moisture-trends", authenticateToken, validateFarmAccess("query"), async (req, res) => {
    const { farmId } = req;
    const { period = "7d" } = req.query;

    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - getDaysFromPeriod(period));

        const moistureTrends = await prisma.$queryRaw`
            SELECT 
                section_number,
                DATE(timestamp) as date,
                AVG(value) as avg_moisture,
                MIN(value) as min_moisture,
                MAX(value) as max_moisture,
                COUNT(*) as readings_count
            FROM moisture_readings 
            WHERE farm_id = ${farmId}
            AND timestamp >= ${startDate}
            GROUP BY section_number, DATE(timestamp)
            ORDER BY section_number, date
        `;

        res.json({ moistureTrends, period });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch moisture trends" });
    }
});
```

## ⏰ Scheduling System

Automated irrigation scheduling with flexible configuration:

```typescript
// Scheduling API
router.post("/", authenticateToken, validateFarmAccess("body"), async (req, res) => {
    const { farmId, sectionNumber, schedule } = req.body;

    try {
        const irrigationSchedule = await prisma.irrigationSchedule.create({
            data: {
                farm_id: farmId,
                section_number: sectionNumber,
                name: schedule.name,
                cron_expression: schedule.cronExpression,
                duration_minutes: schedule.duration,
                enabled: schedule.enabled,
                days_of_week: schedule.daysOfWeek,
                start_time: schedule.startTime,
                end_time: schedule.endTime,
            },
        });

        res.json({ success: true, schedule: irrigationSchedule });
    } catch (error) {
        res.status(500).json({ error: "Failed to create schedule" });
    }
});

// Schedule execution
export class ScheduleService {
    public async executeSchedules(): Promise<void> {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
        const dayOfWeek = now.getDay(); // 0 = Sunday

        const activeSchedules = await prisma.irrigationSchedule.findMany({
            where: {
                enabled: true,
                days_of_week: { has: dayOfWeek.toString() },
                start_time: { lte: currentTime },
                end_time: { gte: currentTime },
            },
        });

        for (const schedule of activeSchedules) {
            await this.executeSchedule(schedule);
        }
    }

    private async executeSchedule(schedule: any): Promise<void> {
        try {
            // Check if irrigation is already running
            const activeIrrigation = await prisma.irrigationEvent.findFirst({
                where: {
                    farm_id: schedule.farm_id,
                    section_number: schedule.section_number,
                    end_time: { gt: new Date() },
                },
            });

            if (!activeIrrigation) {
                // Start scheduled irrigation
                await mqttService.sendIrrigationCommand(
                    schedule.farm_id,
                    schedule.section_number,
                    schedule.duration_minutes
                );

                console.log(`🚰 Executed scheduled irrigation: ${schedule.name}`);
            }
        } catch (error) {
            console.error(`❌ Failed to execute schedule: ${schedule.name}`, error);
        }
    }
}
```

## 📱 Real-time WebSocket Updates

Live updates for real-time dashboard:

```typescript
// WebSocket server setup
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ server });

// WebSocket connection management
wss.on("connection", (ws, req) => {
    console.log("🔌 New WebSocket connection");
    
    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message.toString());
            
            if (data.type === "subscribe") {
                // Subscribe to farm updates
                ws.farmId = data.farmId;
                console.log(`📡 Client subscribed to farm ${data.farmId}`);
            }
        } catch (error) {
            console.error("❌ WebSocket message error:", error);
        }
    });

    ws.on("close", () => {
        console.log("🔌 WebSocket connection closed");
    });
});

// Broadcast updates to connected clients
export function broadcastSectionUpdate(farmId: number, sectionNumber: number, data: any) {
    wss.clients.forEach((client) => {
        if (client.farmId === farmId && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "section_update",
                farmId,
                sectionNumber,
                data,
                timestamp: new Date().toISOString(),
            }));
        }
    });
}
```

## 🔐 Security Features

Comprehensive security implementation:

```typescript
// JWT Authentication
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}

// Farm access validation
export function validateFarmAccess(paramSource: "params" | "query" | "body") {
    return (req: Request, res: Response, next: NextFunction) => {
        const farmId = req[paramSource]?.farmId;
        
        if (!farmId) {
            return res.status(400).json({ error: "Farm ID required" });
        }

        // Validate user has access to this farm
        if (req.user.farmId !== parseInt(farmId)) {
            return res.status(403).json({ error: "Access denied to this farm" });
        }

        req.farmId = parseInt(farmId);
        next();
    };
}

// Rate limiting
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP",
});

app.use("/api/", apiLimiter);
```

## 🗄️ Database Schema

Optimized PostgreSQL schema for IoT data:

```sql
-- Farms table
CREATE TABLE farms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sections table
CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms(id),
    section_number INTEGER NOT NULL,
    name VARCHAR(255),
    mode VARCHAR(50) DEFAULT 'auto',
    min_threshold INTEGER DEFAULT 30,
    max_threshold INTEGER DEFAULT 70,
    UNIQUE(farm_id, section_number)
);

-- Moisture readings table
CREATE TABLE moisture_readings (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms(id),
    section_number INTEGER NOT NULL,
    value DECIMAL(5,2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_moisture_farm_section_time (farm_id, section_number, timestamp)
);

-- Irrigation events table
CREATE TABLE irrigation_events (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES farms(id),
    section_number INTEGER NOT NULL,
    water_ml INTEGER DEFAULT 0,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    INDEX idx_irrigation_farm_section_time (farm_id, section_number, start_time)
);

-- Device status tables
CREATE TABLE moisture_device_status (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(255),
    farm_id INTEGER REFERENCES farms(id),
    section_number INTEGER NOT NULL,
    mqtt BOOLEAN DEFAULT false,
    wifi BOOLEAN DEFAULT false,
    uptime INTEGER DEFAULT 0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_error TEXT,
    enable_deep_sleep BOOLEAN DEFAULT false,
    reporting_interval INTEGER DEFAULT 300,
    deep_sleep_duration INTEGER DEFAULT 3600
);

CREATE TABLE irrigation_device_status (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(255),
    farm_id INTEGER REFERENCES farms(id),
    section_number INTEGER NOT NULL,
    uptime INTEGER DEFAULT 0,
    wifi INTEGER DEFAULT 0,
    mqtt INTEGER DEFAULT 0,
    last_error TEXT,
    valve_on INTEGER DEFAULT 0,
    mode VARCHAR(50) DEFAULT 'auto',
    latest_moisture INTEGER DEFAULT 0,
    min_threshold INTEGER,
    max_threshold INTEGER,
    pulse_count INTEGER DEFAULT 0,
    water_ml INTEGER DEFAULT 0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- MQTT Broker (e.g., Mosquitto, HiveMQ)
- ESP32 devices

### 1. Clone and Setup

```bash
git clone <repository-url>
cd Smart-Irrigation
```

### 2. Environment Configuration

```bash
# Server configuration
cd server
cp env.example .env

# Edit .env file
MQTT_BROKER_URL=mqtts://your-mqtt-broker:8883
MQTT_USERNAME=your-username
MQTT_PASSWORD=your-password
DATABASE_URL="postgresql://username:password@localhost:5432/irrigation_db"
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Database Setup

```bash
cd server
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Client Setup

```bash
cd client
cp env.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_WS_URL=ws://localhost:5001
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 5. Start Services

```bash
# Start server
cd server
npm run dev

# Start client (in new terminal)
cd client
npm run dev
```

## 📡 MQTT Topics Structure

The system uses a hierarchical MQTT topic structure:

```
farm/{farmId}/section/{sectionNumber}/{messageType}
```

### Message Types:

- **moisture** - Soil moisture sensor readings
- **status** - Device status updates (WiFi, MQTT, uptime)
- **irrigation** - Irrigation event notifications
- **ack** - Command acknowledgments
- **config** - Configuration updates
- **command** - Irrigation control commands
- **mode** - Mode change commands

### Example Topics:

```
farm/1/section/1/moisture     # Moisture data for Farm 1, Section 1
farm/1/section/1/status       # Device status for Farm 1, Section 1
farm/1/section/1/command      # Commands sent to Farm 1, Section 1
farm/1/section/1/ack          # Acknowledgments from Farm 1, Section 1
```

## 🔧 API Reference

### Authentication Endpoints

```http
POST /api/auth/login
POST /api/auth/register
GET /api/auth/me
```

### Section Management

```http
GET /api/sections                    # Get all sections
GET /api/sections/:farmId/:sectionNumber  # Get specific section
POST /api/sections/:farmId/:sectionNumber/irrigate  # Start irrigation
POST /api/sections/:farmId/:sectionNumber/stop      # Stop irrigation
POST /api/sections/:farmId/:sectionNumber/mode      # Change mode
PUT /api/sections/:farmId/:sectionNumber/config     # Update config
```

### Bulk Operations

```http
POST /api/sections/bulk/irrigate     # Bulk irrigation
POST /api/sections/bulk/stop         # Bulk stop
POST /api/sections/bulk/mode         # Bulk mode change
POST /api/sections/bulk/config       # Bulk config update
```

### Analytics

```http
GET /api/analytics/water-usage/:farmId
GET /api/analytics/efficiency/:farmId
GET /api/analytics/moisture-trends
GET /api/analytics/valve-activity
```

### Scheduling

```http
GET /api/scheduling                  # Get schedules
POST /api/scheduling                 # Create schedule
PUT /api/scheduling/:id              # Update schedule
DELETE /api/scheduling/:id           # Delete schedule
```

## 🎯 Key Features Summary

- ✅ **Real-time IoT Integration** - MQTT with SSL/TLS encryption
- ✅ **Soil Moisture Monitoring** - Continuous sensor data collection
- ✅ **Automated Irrigation Control** - Multiple modes and scheduling
- ✅ **Bulk Operations** - Efficient multi-section management
- ✅ **Advanced Analytics** - Water usage, efficiency, and trends
- ✅ **Real-time Dashboard** - WebSocket-powered live updates
- ✅ **Device Management** - Status monitoring and configuration
- ✅ **Security** - JWT authentication and farm-level access control
- ✅ **Scheduling System** - Automated irrigation scheduling
- ✅ **Mobile Responsive** - Modern React UI with dark/light themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for smart agriculture and efficient water management** 