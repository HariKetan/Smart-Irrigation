
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.FarmScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SectionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  farm_id: 'farm_id',
  section_number: 'section_number',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  farm_ids: 'farm_ids',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MoistureReadingScalarFieldEnum = {
  id: 'id',
  farm_id: 'farm_id',
  section_number: 'section_number',
  value: 'value',
  timestamp: 'timestamp'
};

exports.Prisma.IrrigationEventScalarFieldEnum = {
  id: 'id',
  farm_id: 'farm_id',
  section_number: 'section_number',
  water_ml: 'water_ml',
  start_time: 'start_time',
  end_time: 'end_time'
};

exports.Prisma.MoistureDeviceStatusScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  farm_id: 'farm_id',
  section_number: 'section_number',
  mqtt: 'mqtt',
  wifi: 'wifi',
  uptime: 'uptime',
  timestamp: 'timestamp',
  last_error: 'last_error',
  enable_deep_sleep: 'enable_deep_sleep',
  reporting_interval: 'reporting_interval',
  deep_sleep_duration: 'deep_sleep_duration',
  createdAt: 'createdAt'
};

exports.Prisma.IrrigationDeviceStatusScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  farm_id: 'farm_id',
  section_number: 'section_number',
  uptime: 'uptime',
  wifi: 'wifi',
  mqtt: 'mqtt',
  last_error: 'last_error',
  valve_on: 'valve_on',
  mode: 'mode',
  latest_moisture: 'latest_moisture',
  min_threshold: 'min_threshold',
  max_threshold: 'max_threshold',
  pulse_count: 'pulse_count',
  water_ml: 'water_ml',
  timestamp: 'timestamp',
  createdAt: 'createdAt'
};

exports.Prisma.DeviceAckScalarFieldEnum = {
  id: 'id',
  device_id: 'device_id',
  farm_id: 'farm_id',
  section_number: 'section_number',
  ack_json: 'ack_json',
  timestamp: 'timestamp'
};

exports.Prisma.IrrigationScheduleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  farm_id: 'farm_id',
  section_numbers: 'section_numbers',
  start_time: 'start_time',
  duration_minutes: 'duration_minutes',
  frequency: 'frequency',
  days_of_week: 'days_of_week',
  day_of_month: 'day_of_month',
  is_active: 'is_active',
  weather_dependent: 'weather_dependent',
  min_temperature: 'min_temperature',
  max_temperature: 'max_temperature',
  min_moisture: 'min_moisture',
  created_by: 'created_by',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ScheduledIrrigationScalarFieldEnum = {
  id: 'id',
  schedule_id: 'schedule_id',
  farm_id: 'farm_id',
  section_number: 'section_number',
  scheduled_time: 'scheduled_time',
  executed_time: 'executed_time',
  status: 'status',
  skip_reason: 'skip_reason',
  duration_minutes: 'duration_minutes',
  water_used: 'water_used',
  created_at: 'created_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Farm: 'Farm',
  Section: 'Section',
  User: 'User',
  MoistureReading: 'MoistureReading',
  IrrigationEvent: 'IrrigationEvent',
  MoistureDeviceStatus: 'MoistureDeviceStatus',
  IrrigationDeviceStatus: 'IrrigationDeviceStatus',
  DeviceAck: 'DeviceAck',
  IrrigationSchedule: 'IrrigationSchedule',
  ScheduledIrrigation: 'ScheduledIrrigation'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
