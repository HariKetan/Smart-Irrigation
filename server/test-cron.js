const cron = require('node-cron');

console.log('🧪 Testing cron service functionality...');

// Test 1: Basic cron scheduling
console.log('📅 Test 1: Basic cron scheduling');
let testCount = 0;

const testJob = cron.schedule('*/10 * * * * *', () => {
  testCount++;
  console.log(`⏰ Test job executed ${testCount} times at ${new Date().toLocaleTimeString()}`);
  
  if (testCount >= 3) {
    console.log('✅ Test 1 completed successfully');
    testJob.stop();
  }
}, {
  timezone: 'UTC'
});

// Test 2: Time-based scheduling
console.log('🕐 Test 2: Time-based scheduling');
const now = new Date();
const nextMinute = new Date(now.getTime() + 60000); // Next minute
const nextMinuteTime = nextMinute.toTimeString().slice(0, 5);

console.log(`⏰ Scheduling test for ${nextMinuteTime}`);

const timeTestJob = cron.schedule(`${nextMinute.getMinutes()} ${nextMinute.getHours()} * * *`, () => {
  console.log('✅ Test 2 completed: Time-based scheduling works');
  timeTestJob.stop();
}, {
  timezone: 'UTC'
});

// Test 3: Daily scheduling
console.log('📅 Test 3: Daily scheduling');
const dailyTestJob = cron.schedule('0 2 * * *', () => {
  console.log('✅ Test 3 completed: Daily scheduling works');
  dailyTestJob.stop();
}, {
  timezone: 'UTC'
});

console.log('🚀 All tests scheduled. Waiting for execution...');
console.log('💡 Press Ctrl+C to stop testing');

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping cron tests...');
  testJob.stop();
  timeTestJob.stop();
  dailyTestJob.stop();
  process.exit(0);
}); 