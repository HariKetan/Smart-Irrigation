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
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "farm_ids" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moisture_readings" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_number" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moisture_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "irrigation_events" (
    "id" SERIAL NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_number" INTEGER NOT NULL,
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
    "section_number" INTEGER NOT NULL,
    "mqtt" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "uptime" BIGINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "section_number" INTEGER NOT NULL,
    "uptime" BIGINT NOT NULL,
    "wifi" INTEGER NOT NULL,
    "mqtt" INTEGER NOT NULL,
    "last_error" TEXT NOT NULL,
    "valve_on" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "latest_moisture" INTEGER NOT NULL,
    "threshold" INTEGER NOT NULL DEFAULT 50,
    "min_threshold" INTEGER NOT NULL DEFAULT 30,
    "max_threshold" INTEGER NOT NULL DEFAULT 70,
    "pulse_count" INTEGER NOT NULL,
    "water_ml" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "irrigation_device_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_acks" (
    "id" SERIAL NOT NULL,
    "device_id" TEXT,
    "farm_id" INTEGER NOT NULL,
    "section_number" INTEGER NOT NULL,
    "ack_json" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_acks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "irrigation_schedules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_numbers" INTEGER[],
    "start_time" TEXT NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "days_of_week" INTEGER[],
    "day_of_month" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "weather_dependent" BOOLEAN NOT NULL DEFAULT false,
    "min_temperature" DOUBLE PRECISION,
    "max_temperature" DOUBLE PRECISION,
    "min_moisture" INTEGER,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "irrigation_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_irrigations" (
    "id" TEXT NOT NULL,
    "schedule_id" TEXT NOT NULL,
    "farm_id" INTEGER NOT NULL,
    "section_number" INTEGER NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "moisture_readings_farm_id_section_number_idx" ON "moisture_readings"("farm_id", "section_number");

-- CreateIndex
CREATE INDEX "irrigation_events_farm_id_section_number_idx" ON "irrigation_events"("farm_id", "section_number");

-- CreateIndex
CREATE INDEX "moisture_device_status_farm_id_section_number_idx" ON "moisture_device_status"("farm_id", "section_number");

-- CreateIndex
CREATE INDEX "irrigation_device_status_farm_id_section_number_idx" ON "irrigation_device_status"("farm_id", "section_number");

-- CreateIndex
CREATE INDEX "device_acks_farm_id_section_number_idx" ON "device_acks"("farm_id", "section_number");

-- CreateIndex
CREATE INDEX "scheduled_irrigations_farm_id_section_number_idx" ON "scheduled_irrigations"("farm_id", "section_number");

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_readings" ADD CONSTRAINT "moisture_readings_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_readings" ADD CONSTRAINT "moisture_readings_farm_id_section_number_fkey" FOREIGN KEY ("farm_id", "section_number") REFERENCES "sections"("farm_id", "section_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_events" ADD CONSTRAINT "irrigation_events_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_events" ADD CONSTRAINT "irrigation_events_farm_id_section_number_fkey" FOREIGN KEY ("farm_id", "section_number") REFERENCES "sections"("farm_id", "section_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_device_status" ADD CONSTRAINT "moisture_device_status_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_device_status" ADD CONSTRAINT "moisture_device_status_farm_id_section_number_fkey" FOREIGN KEY ("farm_id", "section_number") REFERENCES "sections"("farm_id", "section_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_device_status" ADD CONSTRAINT "irrigation_device_status_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_device_status" ADD CONSTRAINT "irrigation_device_status_farm_id_section_number_fkey" FOREIGN KEY ("farm_id", "section_number") REFERENCES "sections"("farm_id", "section_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_acks" ADD CONSTRAINT "device_acks_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_acks" ADD CONSTRAINT "device_acks_farm_id_section_number_fkey" FOREIGN KEY ("farm_id", "section_number") REFERENCES "sections"("farm_id", "section_number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "irrigation_schedules" ADD CONSTRAINT "irrigation_schedules_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_irrigations" ADD CONSTRAINT "scheduled_irrigations_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "irrigation_schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_irrigations" ADD CONSTRAINT "scheduled_irrigations_farm_id_fkey" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_irrigations" ADD CONSTRAINT "scheduled_irrigations_farm_id_section_number_fkey" FOREIGN KEY ("farm_id", "section_number") REFERENCES "sections"("farm_id", "section_number") ON DELETE CASCADE ON UPDATE CASCADE;
