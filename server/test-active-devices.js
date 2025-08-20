const { PrismaClient } = require("./src/generated/prisma/index.js");

const prisma = new PrismaClient();

async function testActiveDeviceCalculation() {
    console.log("🧪 Testing Active Device Calculation Logic...\n");

    try {
        // Get all irrigation device statuses
        const irrigationStatuses = await prisma.irrigationDeviceStatus.findMany({
            orderBy: { timestamp: "desc" },
        });

        // Get all moisture device statuses
        const moistureStatuses = await prisma.moistureDeviceStatus.findMany({
            orderBy: { timestamp: "desc" },
        });

        console.log(`📊 Found ${irrigationStatuses.length} irrigation device status records`);
        console.log(`📊 Found ${moistureStatuses.length} moisture device status records\n`);

        // Calculate active devices (within last 5 minutes)
        const now = Date.now();
        const fiveMinutesAgo = now - 5 * 60 * 1000;

        console.log("🔍 Calculating active devices...");
        console.log("Current time:", new Date(now).toISOString());
        console.log("Five minutes ago:", new Date(fiveMinutesAgo).toISOString());
        console.log("");

        // Calculate active valve sections
        const activeValveSections = new Set();
        irrigationStatuses.forEach((device) => {
            let deviceTime;
            if (typeof device.timestamp === "number") {
                deviceTime = device.timestamp;
            } else if (typeof device.timestamp === "string") {
                deviceTime = new Date(device.timestamp).getTime();
            } else if (typeof device.timestamp === "bigint") {
                deviceTime = Number(device.timestamp);
            } else {
                console.warn("Unknown timestamp format for device:", device);
                return;
            }

            const isActive = deviceTime > fiveMinutesAgo;
            console.log(
                `Valve ${device.device_id} (Section ${device.section_number}): ${new Date(deviceTime).toISOString()} - ${
                    isActive ? "ACTIVE" : "INACTIVE"
                }`
            );
            
            if (isActive) {
                activeValveSections.add(device.section_number);
            }
        });

        console.log("");

        // Calculate active sensor sections
        const activeSensorSections = new Set();
        moistureStatuses.forEach((device) => {
            let deviceTime;
            if (typeof device.timestamp === "number") {
                deviceTime = device.timestamp;
            } else if (typeof device.timestamp === "string") {
                deviceTime = new Date(device.timestamp).getTime();
            } else if (typeof device.timestamp === "bigint") {
                deviceTime = Number(device.timestamp);
            } else {
                console.warn("Unknown timestamp format for device:", device);
                return;
            }

            const isActive = deviceTime > fiveMinutesAgo;
            console.log(
                `Sensor ${device.device_id} (Section ${device.section_number}): ${new Date(deviceTime).toISOString()} - ${
                    isActive ? "ACTIVE" : "INACTIVE"
                }`
            );
            
            if (isActive) {
                activeSensorSections.add(device.section_number);
            }
        });

        console.log("");
        console.log("📋 Results:");
        console.log(`Active Valve Sections: ${activeValveSections.size}`);
        console.log(`Active Sensor Sections: ${activeSensorSections.size}`);
        console.log(`Active Valve Sections: [${Array.from(activeValveSections).join(", ")}]`);
        console.log(`Active Sensor Sections: [${Array.from(activeSensorSections).join(", ")}]`);

        // Get total sections for comparison
        const sections = await prisma.section.findMany({
            where: { farm_id: 1 },
        });

        console.log(`\n📊 Total Sections: ${sections.length}`);
        console.log(`📊 Sections: [${sections.map(s => s.section_number).join(", ")}]`);

        console.log("\n✅ Test completed!");

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testActiveDeviceCalculation(); 