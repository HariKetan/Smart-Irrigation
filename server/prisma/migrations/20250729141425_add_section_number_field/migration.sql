/*
  Warnings:

  - The primary key for the `irrigation_schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `irrigation_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `irrigation_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `irrigation_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `irrigation_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `irrigation_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `zoneId` on the `irrigation_schedules` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `readings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sensors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `valves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zones` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_by` to the `irrigation_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration_minutes` to the `irrigation_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farm_id` to the `irrigation_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `irrigation_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `irrigation_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `irrigation_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_sensorId_fkey";

-- DropForeignKey
ALTER TABLE "sensors" DROP CONSTRAINT "sensors_zoneId_fkey";

-- DropForeignKey
ALTER TABLE "valves" DROP CONSTRAINT "valves_zoneId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "farm_ids" INTEGER[];

-- AlterTable
ALTER TABLE "irrigation_schedules" DROP CONSTRAINT "irrigation_schedules_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "duration",
DROP COLUMN "isActive",
DROP COLUMN "startTime",
DROP COLUMN "updatedAt",
DROP COLUMN "zoneId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "day_of_month" INTEGER,
ADD COLUMN     "days_of_week" INTEGER[],
ADD COLUMN     "duration_minutes" INTEGER NOT NULL,
ADD COLUMN     "farm_id" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "max_temperature" DOUBLE PRECISION,
ADD COLUMN     "min_moisture" INTEGER,
ADD COLUMN     "min_temperature" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "section_ids" INTEGER[],
ADD COLUMN     "start_time" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weather_dependent" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "irrigation_schedules_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "irrigation_schedules_id_seq";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "readings";

-- DropTable
DROP TABLE "sensors";

-- DropTable
DROP TABLE "valves";

-- DropTable
DROP TABLE "zones";

-- DropEnum
DROP TYPE "SensorType";

-- CreateTable
CREATE TABLE "farms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_number" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moisture_readings" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moisture_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "irrigation_events" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "water_ml" DOUBLE PRECISION NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "irrigation_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moisture_device_status" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "mqtt" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "uptime" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "last_error" TEXT NOT NULL,
    "enable_deep_sleep" BOOLEAN NOT NULL,
    "reporting_interval" INTEGER NOT NULL,
    "deep_sleep_duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moisture_device_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "irrigation_device_status" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "uptime" BIGINT NOT NULL,
    "wifi" INTEGER NOT NULL,
    "mqtt" INTEGER NOT NULL,
    "last_error" TEXT NOT NULL,
    "valve_on" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "latest_moisture" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL,
    "pulse_count" INTEGER NOT NULL,
    "water_ml" INTEGER NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "irrigation_device_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_acks" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT,
    "farm_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "ack_json" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_acks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_irrigations" (
    "id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "scheduled_time" TIMESTAMP(3) NOT NULL,
    "executed_time" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "skip_reason" TEXT,
    "duration_minutes" INTEGER NOT NULL,
    "water_used" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduled_irrigations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sections_farm_id_section_number_key" ON "sections"("farm_id", "section_number");

-- CreateIndex
CREATE UNIQUE INDEX "sections_farm_id_name_key" ON "sections"("farm_id", "name");

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_readings" ADD CONSTRAINT "moisture_readings_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_readings" ADD CONSTRAINT "moisture_readings_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_events" ADD CONSTRAINT "irrigation_events_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_events" ADD CONSTRAINT "irrigation_events_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_device_status" ADD CONSTRAINT "moisture_device_status_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_device_status" ADD CONSTRAINT "moisture_device_status_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_device_status" ADD CONSTRAINT "irrigation_device_status_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_device_status" ADD CONSTRAINT "irrigation_device_status_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_acks" ADD CONSTRAINT "device_acks_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_acks" ADD CONSTRAINT "device_acks_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_schedules" ADD CONSTRAINT "irrigation_schedules_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_irrigations" ADD CONSTRAINT "scheduled_irrigations_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "irrigation_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_irrigations" ADD CONSTRAINT "scheduled_irrigations_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_irrigations" ADD CONSTRAINT "scheduled_irrigations_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
