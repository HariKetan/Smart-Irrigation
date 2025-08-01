const WebSocket = require('ws');

console.log('🔍 Testing WebSocket connection...');

// Connect to WebSocket server
const ws = new WebSocket('ws://localhost:5000');

ws.on('open', () => {
  console.log('✅ WebSocket connected successfully');
  
  // Subscribe to section updates
  const subscribeMessage = {
    type: 'subscribe',
    farmId: 1,
    sectionNumber: 1
  };
  
  console.log('📨 Sending subscribe message:', subscribeMessage);
  ws.send(JSON.stringify(subscribeMessage));
});

ws.on('message', (data) => {
  try {
    const message = JSON.parse(data.toString());
    console.log('📨 Received WebSocket message:', message);
    
    if (message.type === 'section_update') {
      console.log('💧 Section update received:', {
        farm_id: message.data.farm_id,
        section_number: message.data.section_number,
        moisture_value: message.data.moisture_value,
        valve_open: message.data.valve_open,
        mode: message.data.mode
      });
    }
  } catch (error) {
    console.error('❌ Error parsing WebSocket message:', error);
    console.log('Raw message:', data.toString());
  }
});

ws.on('close', () => {
  console.log('🔌 WebSocket disconnected');
});

ws.on('error', (error) => {
  console.error('❌ WebSocket error:', error);
});

// Keep the script running
setTimeout(() => {
  console.log('⏰ Test completed. Disconnecting...');
  ws.close();
  process.exit(0);
}, 30000); // Run for 30 seconds 