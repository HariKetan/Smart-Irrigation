# Environment Variables Setup Guide

## 🎯 **Required Environment Variables**

Create a `.env` file in the `server/` directory with the following variables:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smart_irrigation"

# JWT Configuration
JWT_SECRET=smart-irrigation-jwt-secret-key-2024-development
JWT_EXPIRES_IN=24h

# MQTT Configuration
MQTT_BROKER_URL=mqtt://192.168.29.247:1883
MQTT_USERNAME=arecanut
MQTT_PASSWORD=123456
MQTT_RECONNECT_PERIOD=5000
MQTT_CONNECT_TIMEOUT=10000

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=logs/server.log

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# WebSocket Configuration
WS_HEARTBEAT_INTERVAL=30000
WS_MAX_CLIENTS=100

# Cron Service Configuration
CRON_ENABLED=true
CRON_CHECK_INTERVAL=60000

# Analytics Configuration
ANALYTICS_RETENTION_DAYS=90
MAX_ANALYTICS_QUERY_DAYS=365
```

## 🔧 **Setup Instructions**

### **1. Create .env File**

```bash
# In the server directory
touch .env
```

### **2. Copy Environment Variables**

Copy the above variables into your `.env` file.

### **3. Database Setup**

Make sure PostgreSQL is running and create the database:

```bash
# Create database
createdb smart_irrigation

# Or using psql
psql -U postgres -c "CREATE DATABASE smart_irrigation;"
```

### **4. Run Database Migrations**

```bash
npm run db:generate
npm run db:migrate
```

### **5. Seed Database**

```bash
npm run db:seed:farms
npm run db:seed:data
```

## 🚨 **Important Notes**

### **Security in Production**

- **Change JWT_SECRET** to a strong, unique key
- **Use strong MQTT credentials** instead of defaults
- **Use environment-specific database URLs**
- **Enable HTTPS** for production

### **MQTT Configuration**

- **MQTT_BROKER_URL**: Your MQTT broker address
- **MQTT_USERNAME/MQTT_PASSWORD**: Your MQTT credentials
- **Update these** to match your MQTT broker setup

### **Database Configuration**

- **DATABASE_URL**: PostgreSQL connection string
- **Format**: `postgresql://username:password@host:port/database`
- **Update** username, password, host, port, and database name

## 🚀 **Testing the Setup**

After setting up the environment variables:

```bash
# Start the server
npm run dev

# Test MQTT connection
node test-moisture-mqtt.js

# Test WebSocket
node test-websocket.js
```

## 📝 **Environment Variable Descriptions**

| Variable          | Description                  | Default               |
| ----------------- | ---------------------------- | --------------------- |
| `PORT`            | Server port                  | 5000                  |
| `DATABASE_URL`    | PostgreSQL connection string | Required              |
| `JWT_SECRET`      | Secret key for JWT tokens    | Required              |
| `MQTT_BROKER_URL` | MQTT broker address          | Required              |
| `MQTT_USERNAME`   | MQTT username                | Required              |
| `MQTT_PASSWORD`   | MQTT password                | Required              |
| `CORS_ORIGIN`     | Allowed CORS origin          | http://localhost:3000 |
| `LOG_LEVEL`       | Logging level                | info                  |
| `CRON_ENABLED`    | Enable cron jobs             | true                  |

## 🔍 **Troubleshooting**

### **Database Connection Issues**

- Check if PostgreSQL is running
- Verify database credentials
- Ensure database exists

### **MQTT Connection Issues**

- Check MQTT broker is running
- Verify MQTT credentials
- Check network connectivity

### **JWT Issues**

- Ensure JWT_SECRET is set
- Use a strong, unique secret key
- Check JWT_EXPIRES_IN format
