import { prisma } from './src/lib/prisma';

async function updateSchemaWithSectionNumbers() {
  try {
    console.log('🔧 Updating database schema with section_number fields...\n');

    // Update moisture_readings table
    console.log('📊 Updating moisture_readings table...');
    await prisma.$executeRaw`
      ALTER TABLE moisture_readings 
      ADD COLUMN IF NOT EXISTS section_number INT DEFAULT 1;
    `;
    
    // Update section_number based on existing section_id
    await prisma.$executeRaw`
      UPDATE moisture_readings 
      SET section_number = (
        SELECT section_number 
        FROM sections 
        WHERE sections.id = moisture_readings.section_id
      )
      WHERE section_number = 1;
    `;
    console.log('✅ moisture_readings table updated');

    // Update irrigation_events table
    console.log('💧 Updating irrigation_events table...');
    await prisma.$executeRaw`
      ALTER TABLE irrigation_events 
      ADD COLUMN IF NOT EXISTS section_number INT DEFAULT 1;
    `;
    
    await prisma.$executeRaw`
      UPDATE irrigation_events 
      SET section_number = (
        SELECT section_number 
        FROM sections 
        WHERE sections.id = irrigation_events.section_id
      )
      WHERE section_number = 1;
    `;
    console.log('✅ irrigation_events table updated');

    // Update moisture_device_status table
    console.log('📡 Updating moisture_device_status table...');
    await prisma.$executeRaw`
      ALTER TABLE moisture_device_status 
      ADD COLUMN IF NOT EXISTS section_number INT DEFAULT 1;
    `;
    
    await prisma.$executeRaw`
      UPDATE moisture_device_status 
      SET section_number = (
        SELECT section_number 
        FROM sections 
        WHERE sections.id = moisture_device_status.section_id
      )
      WHERE section_number = 1;
    `;
    console.log('✅ moisture_device_status table updated');

    // Update irrigation_device_status table
    console.log('🔧 Updating irrigation_device_status table...');
    await prisma.$executeRaw`
      ALTER TABLE irrigation_device_status 
      ADD COLUMN IF NOT EXISTS section_number INT DEFAULT 1;
    `;
    
    await prisma.$executeRaw`
      UPDATE irrigation_device_status 
      SET section_number = (
        SELECT section_number 
        FROM sections 
        WHERE sections.id = irrigation_device_status.section_id
      )
      WHERE section_number = 1;
    `;
    console.log('✅ irrigation_device_status table updated');

    // Update device_acks table
    console.log('📨 Updating device_acks table...');
    await prisma.$executeRaw`
      ALTER TABLE device_acks 
      ADD COLUMN IF NOT EXISTS section_number INT DEFAULT 1;
    `;
    
    await prisma.$executeRaw`
      UPDATE device_acks 
      SET section_number = (
        SELECT section_number 
        FROM sections 
        WHERE sections.id = device_acks.section_id
      )
      WHERE section_number = 1;
    `;
    console.log('✅ device_acks table updated');

    // Update scheduled_irrigations table
    console.log('⏰ Updating scheduled_irrigations table...');
    await prisma.$executeRaw`
      ALTER TABLE scheduled_irrigations 
      ADD COLUMN IF NOT EXISTS section_number INT DEFAULT 1;
    `;
    
    await prisma.$executeRaw`
      UPDATE scheduled_irrigations 
      SET section_number = (
        SELECT section_number 
        FROM sections 
        WHERE sections.id = scheduled_irrigations.section_id
      )
      WHERE section_number = 1;
    `;
    console.log('✅ scheduled_irrigations table updated');

    // Update irrigation_schedules table (rename section_ids to section_numbers)
    console.log('📅 Updating irrigation_schedules table...');
    await prisma.$executeRaw`
      ALTER TABLE irrigation_schedules 
      RENAME COLUMN section_ids TO section_numbers;
    `;
    console.log('✅ irrigation_schedules table updated');

    // Create indexes for efficient queries
    console.log('🔍 Creating indexes...');
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_moisture_readings_farm_section 
      ON moisture_readings (farm_id, section_number);
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_irrigation_events_farm_section 
      ON irrigation_events (farm_id, section_number);
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_moisture_device_status_farm_section 
      ON moisture_device_status (farm_id, section_number);
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_irrigation_device_status_farm_section 
      ON irrigation_device_status (farm_id, section_number);
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_device_acks_farm_section 
      ON device_acks (farm_id, section_number);
    `;
    
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS idx_scheduled_irrigations_farm_section 
      ON scheduled_irrigations (farm_id, section_number);
    `;
    console.log('✅ Indexes created');

    // Verify the updates
    console.log('\n🔍 Verifying updates...');
    
    const moistureCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM moisture_readings WHERE section_number IS NOT NULL;
    `;
    console.log(`moisture_readings with section_number: ${(moistureCount as any)[0].count}`);

    const irrigationCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM irrigation_events WHERE section_number IS NOT NULL;
    `;
    console.log(`irrigation_events with section_number: ${(irrigationCount as any)[0].count}`);

    const deviceStatusCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM moisture_device_status WHERE section_number IS NOT NULL;
    `;
    console.log(`moisture_device_status with section_number: ${(deviceStatusCount as any)[0].count}`);

    console.log('\n✅ Database schema update completed successfully!');
    console.log('\n📋 Summary of changes:');
    console.log('- Added section_number field to all relevant tables');
    console.log('- Updated section_number values based on existing section relationships');
    console.log('- Created indexes for efficient farm_id + section_number queries');
    console.log('- Renamed section_ids to section_numbers in irrigation_schedules');

  } catch (error) {
    console.error('❌ Error updating schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSchemaWithSectionNumbers(); 