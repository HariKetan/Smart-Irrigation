import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

async function seedFarmsAndUsers() {
  try {
    console.log('🌱 Seeding farms and users...');

    // Create farms
    const farm1 = await prisma.farm.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        name: 'Main Farm',
        location: 'Farm Location 1'
      }
    });

    const farm2 = await prisma.farm.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: 'Secondary Farm',
        location: 'Farm Location 2'
      }
    });

    console.log('✅ Farms created:', { farm1: farm1.name, farm2: farm2.name });

    // Create sections for each farm
    // Each farm gets sections 1-4 (hardware limitation)
    // Section numbers can be the same across farms because we identify by farm_id + section_number
    const sections = [];
    
    // First, let's check what sections already exist
    const existingSections = await prisma.section.findMany();
    console.log('Existing sections:', existingSections.map(s => ({ id: s.id, name: s.name, farm_id: s.farm_id, section_number: s.section_number })));
    
    // Create sections for Farm 1 (Main Farm)
    for (let sectionNum = 1; sectionNum <= 4; sectionNum++) {
      try {
        const section = await prisma.section.upsert({
          where: { 
            farm_section_number_unique: {
              farm_id: 1,
              section_number: sectionNum
            }
          },
          update: {},
          create: {
            name: `Section ${sectionNum}`,
            farm_id: 1,
            section_number: sectionNum
          }
        });
        sections.push(section);
        console.log(`✅ Created/Updated Farm 1, Section ${sectionNum}: ID ${section.id}, Section Number ${section.section_number}`);
      } catch (error) {
        console.log(`⚠️  Section ${sectionNum} for Farm 1 already exists or error:`, (error as Error).message);
      }
    }
    
    // Create sections for Farm 2 (Secondary Farm)
    for (let sectionNum = 1; sectionNum <= 4; sectionNum++) {
      try {
        const section = await prisma.section.upsert({
          where: { 
            farm_section_number_unique: {
              farm_id: 2,
              section_number: sectionNum
            }
          },
          update: {},
          create: {
            name: `Section ${sectionNum}`,
            farm_id: 2,
            section_number: sectionNum
          }
        });
        sections.push(section);
        console.log(`✅ Created/Updated Farm 2, Section ${sectionNum}: ID ${section.id}, Section Number ${section.section_number}`);
      } catch (error) {
        console.log(`⚠️  Section ${sectionNum} for Farm 2 already exists or error:`, (error as Error).message);
      }
    }

    console.log('✅ Sections created:', sections.length);

    // Create users with different farm access
    const hashedPassword = await bcrypt.hash('password123', 10);

    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        farm_ids: [1, 2] // Admin has access to both farms
      }
    });

    const farm1User = await prisma.user.upsert({
      where: { email: 'farm1@example.com' },
      update: {},
      create: {
        email: 'farm1@example.com',
        password: hashedPassword,
        name: 'Farm 1 User',
        farm_ids: [1] // Access to Farm 1 only
      }
    });

    const farm2User = await prisma.user.upsert({
      where: { email: 'farm2@example.com' },
      update: {},
      create: {
        email: 'farm2@example.com',
        password: hashedPassword,
        name: 'Farm 2 User',
        farm_ids: [2] // Access to Farm 2 only
      }
    });

    console.log('✅ Users created:');
    console.log('- Admin:', adminUser.email, 'Farms:', adminUser.farm_ids);
    console.log('- Farm1 User:', farm1User.email, 'Farms:', farm1User.farm_ids);
    console.log('- Farm2 User:', farm2User.email, 'Farms:', farm2User.farm_ids);

    console.log('🎉 Seeding completed successfully!');
    console.log('\n📋 Test Users:');
    console.log('Admin: admin@example.com / password123 (Access: Farms 1 & 2)');
    console.log('Farm 1 User: farm1@example.com / password123 (Access: Farm 1 only)');
    console.log('Farm 2 User: farm2@example.com / password123 (Access: Farm 2 only)');
    console.log('\n🏗️  Multi-Farm Setup:');
    console.log('- Farm 1: Sections 1, 2, 3, 4');
    console.log('- Farm 2: Sections 1, 2, 3, 4');
    console.log('- Each farm has unique farm_id but same section numbers');
    console.log('- Sections identified by farm_id + section_id combination');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedFarmsAndUsers(); 