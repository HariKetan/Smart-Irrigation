const mqtt = require('mqtt');

// MQTT Configuration
const MQTT_BROKER = '192.168.29.247';
const MQTT_PORT = 1883;
const MQTT_USERNAME = 'arecanut';
const MQTT_PASSWORD = '123456';

console.log('🔍 Testing MQTT moisture data flow...');

// Connect to MQTT broker with authentication
const client = mqtt.connect(`mqtt://${MQTT_BROKER}:${MQTT_PORT}`, {
  clientId: 'moisture-test-client',
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('✅ Connected to MQTT broker');
  
  // Subscribe to moisture topics
  client.subscribe('farm/+/section/+/moisture');
  client.subscribe('farm/+/section/+/status');
  client.subscribe('farm/+/section/+/ack');
  
  console.log('📡 Subscribed to moisture topics');
  console.log('⏳ Waiting for moisture data...');
});

client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const topicParts = topic.split('/');
    
    console.log(`📨 Received message on topic: ${topic}`);
    console.log(`📊 Data:`, data);
    
    if (topicParts[4] === 'moisture') {
      console.log(`💧 MOISTURE DATA: Farm ${topicParts[1]}, Section ${topicParts[3]}, Value: ${data.value}`);
    } else if (topicParts[4] === 'status') {
      console.log(`🚰 STATUS DATA: Farm ${topicParts[1]}, Section ${topicParts[3]}, Valve: ${data.valve_on}, Mode: ${data.mode}`);
    } else if (topicParts[4] === 'ack') {
      console.log(`✅ ACK DATA: Farm ${topicParts[1]}, Section ${topicParts[3]}, Command: ${data.command}, Result: ${data.result}`);
    }
  } catch (error) {
    console.error('❌ Error parsing message:', error);
    console.log('Raw message:', message.toString());
  }
});

client.on('error', (error) => {
  console.error('❌ MQTT error:', error);
});

client.on('disconnect', () => {
  console.log('⚠️ MQTT disconnected');
});

// Keep the script running
setTimeout(() => {
  console.log('⏰ Test completed. Disconnecting...');
  client.end();
  process.exit(0);
}, 30000); // Run for 30 seconds 