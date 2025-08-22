
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Farm
 * 
 */
export type Farm = $Result.DefaultSelection<Prisma.$FarmPayload>
/**
 * Model Section
 * 
 */
export type Section = $Result.DefaultSelection<Prisma.$SectionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MoistureReading
 * 
 */
export type MoistureReading = $Result.DefaultSelection<Prisma.$MoistureReadingPayload>
/**
 * Model IrrigationEvent
 * 
 */
export type IrrigationEvent = $Result.DefaultSelection<Prisma.$IrrigationEventPayload>
/**
 * Model MoistureDeviceStatus
 * 
 */
export type MoistureDeviceStatus = $Result.DefaultSelection<Prisma.$MoistureDeviceStatusPayload>
/**
 * Model IrrigationDeviceStatus
 * 
 */
export type IrrigationDeviceStatus = $Result.DefaultSelection<Prisma.$IrrigationDeviceStatusPayload>
/**
 * Model DeviceAck
 * 
 */
export type DeviceAck = $Result.DefaultSelection<Prisma.$DeviceAckPayload>
/**
 * Model IrrigationSchedule
 * 
 */
export type IrrigationSchedule = $Result.DefaultSelection<Prisma.$IrrigationSchedulePayload>
/**
 * Model ScheduledIrrigation
 * 
 */
export type ScheduledIrrigation = $Result.DefaultSelection<Prisma.$ScheduledIrrigationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Farms
 * const farms = await prisma.farm.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Farms
   * const farms = await prisma.farm.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<ExtArgs>;

  /**
   * `prisma.section`: Exposes CRUD operations for the **Section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sections
    * const sections = await prisma.section.findMany()
    * ```
    */
  get section(): Prisma.SectionDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.moistureReading`: Exposes CRUD operations for the **MoistureReading** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MoistureReadings
    * const moistureReadings = await prisma.moistureReading.findMany()
    * ```
    */
  get moistureReading(): Prisma.MoistureReadingDelegate<ExtArgs>;

  /**
   * `prisma.irrigationEvent`: Exposes CRUD operations for the **IrrigationEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IrrigationEvents
    * const irrigationEvents = await prisma.irrigationEvent.findMany()
    * ```
    */
  get irrigationEvent(): Prisma.IrrigationEventDelegate<ExtArgs>;

  /**
   * `prisma.moistureDeviceStatus`: Exposes CRUD operations for the **MoistureDeviceStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MoistureDeviceStatuses
    * const moistureDeviceStatuses = await prisma.moistureDeviceStatus.findMany()
    * ```
    */
  get moistureDeviceStatus(): Prisma.MoistureDeviceStatusDelegate<ExtArgs>;

  /**
   * `prisma.irrigationDeviceStatus`: Exposes CRUD operations for the **IrrigationDeviceStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IrrigationDeviceStatuses
    * const irrigationDeviceStatuses = await prisma.irrigationDeviceStatus.findMany()
    * ```
    */
  get irrigationDeviceStatus(): Prisma.IrrigationDeviceStatusDelegate<ExtArgs>;

  /**
   * `prisma.deviceAck`: Exposes CRUD operations for the **DeviceAck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceAcks
    * const deviceAcks = await prisma.deviceAck.findMany()
    * ```
    */
  get deviceAck(): Prisma.DeviceAckDelegate<ExtArgs>;

  /**
   * `prisma.irrigationSchedule`: Exposes CRUD operations for the **IrrigationSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IrrigationSchedules
    * const irrigationSchedules = await prisma.irrigationSchedule.findMany()
    * ```
    */
  get irrigationSchedule(): Prisma.IrrigationScheduleDelegate<ExtArgs>;

  /**
   * `prisma.scheduledIrrigation`: Exposes CRUD operations for the **ScheduledIrrigation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScheduledIrrigations
    * const scheduledIrrigations = await prisma.scheduledIrrigation.findMany()
    * ```
    */
  get scheduledIrrigation(): Prisma.ScheduledIrrigationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "farm" | "section" | "user" | "moistureReading" | "irrigationEvent" | "moistureDeviceStatus" | "irrigationDeviceStatus" | "deviceAck" | "irrigationSchedule" | "scheduledIrrigation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Farm: {
        payload: Prisma.$FarmPayload<ExtArgs>
        fields: Prisma.FarmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findFirst: {
            args: Prisma.FarmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findMany: {
            args: Prisma.FarmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          create: {
            args: Prisma.FarmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          createMany: {
            args: Prisma.FarmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          delete: {
            args: Prisma.FarmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          update: {
            args: Prisma.FarmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          deleteMany: {
            args: Prisma.FarmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FarmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          aggregate: {
            args: Prisma.FarmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarm>
          }
          groupBy: {
            args: Prisma.FarmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmCountArgs<ExtArgs>
            result: $Utils.Optional<FarmCountAggregateOutputType> | number
          }
        }
      }
      Section: {
        payload: Prisma.$SectionPayload<ExtArgs>
        fields: Prisma.SectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findFirst: {
            args: Prisma.SectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findMany: {
            args: Prisma.SectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          create: {
            args: Prisma.SectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          createMany: {
            args: Prisma.SectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          delete: {
            args: Prisma.SectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          update: {
            args: Prisma.SectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          deleteMany: {
            args: Prisma.SectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          aggregate: {
            args: Prisma.SectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSection>
          }
          groupBy: {
            args: Prisma.SectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MoistureReading: {
        payload: Prisma.$MoistureReadingPayload<ExtArgs>
        fields: Prisma.MoistureReadingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoistureReadingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoistureReadingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>
          }
          findFirst: {
            args: Prisma.MoistureReadingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoistureReadingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>
          }
          findMany: {
            args: Prisma.MoistureReadingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>[]
          }
          create: {
            args: Prisma.MoistureReadingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>
          }
          createMany: {
            args: Prisma.MoistureReadingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoistureReadingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>[]
          }
          delete: {
            args: Prisma.MoistureReadingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>
          }
          update: {
            args: Prisma.MoistureReadingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>
          }
          deleteMany: {
            args: Prisma.MoistureReadingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoistureReadingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MoistureReadingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureReadingPayload>
          }
          aggregate: {
            args: Prisma.MoistureReadingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMoistureReading>
          }
          groupBy: {
            args: Prisma.MoistureReadingGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoistureReadingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoistureReadingCountArgs<ExtArgs>
            result: $Utils.Optional<MoistureReadingCountAggregateOutputType> | number
          }
        }
      }
      IrrigationEvent: {
        payload: Prisma.$IrrigationEventPayload<ExtArgs>
        fields: Prisma.IrrigationEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IrrigationEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IrrigationEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>
          }
          findFirst: {
            args: Prisma.IrrigationEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IrrigationEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>
          }
          findMany: {
            args: Prisma.IrrigationEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>[]
          }
          create: {
            args: Prisma.IrrigationEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>
          }
          createMany: {
            args: Prisma.IrrigationEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IrrigationEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>[]
          }
          delete: {
            args: Prisma.IrrigationEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>
          }
          update: {
            args: Prisma.IrrigationEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>
          }
          deleteMany: {
            args: Prisma.IrrigationEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IrrigationEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IrrigationEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationEventPayload>
          }
          aggregate: {
            args: Prisma.IrrigationEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIrrigationEvent>
          }
          groupBy: {
            args: Prisma.IrrigationEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<IrrigationEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.IrrigationEventCountArgs<ExtArgs>
            result: $Utils.Optional<IrrigationEventCountAggregateOutputType> | number
          }
        }
      }
      MoistureDeviceStatus: {
        payload: Prisma.$MoistureDeviceStatusPayload<ExtArgs>
        fields: Prisma.MoistureDeviceStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoistureDeviceStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoistureDeviceStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>
          }
          findFirst: {
            args: Prisma.MoistureDeviceStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoistureDeviceStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>
          }
          findMany: {
            args: Prisma.MoistureDeviceStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>[]
          }
          create: {
            args: Prisma.MoistureDeviceStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>
          }
          createMany: {
            args: Prisma.MoistureDeviceStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoistureDeviceStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>[]
          }
          delete: {
            args: Prisma.MoistureDeviceStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>
          }
          update: {
            args: Prisma.MoistureDeviceStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>
          }
          deleteMany: {
            args: Prisma.MoistureDeviceStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoistureDeviceStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MoistureDeviceStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoistureDeviceStatusPayload>
          }
          aggregate: {
            args: Prisma.MoistureDeviceStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMoistureDeviceStatus>
          }
          groupBy: {
            args: Prisma.MoistureDeviceStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoistureDeviceStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoistureDeviceStatusCountArgs<ExtArgs>
            result: $Utils.Optional<MoistureDeviceStatusCountAggregateOutputType> | number
          }
        }
      }
      IrrigationDeviceStatus: {
        payload: Prisma.$IrrigationDeviceStatusPayload<ExtArgs>
        fields: Prisma.IrrigationDeviceStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IrrigationDeviceStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IrrigationDeviceStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>
          }
          findFirst: {
            args: Prisma.IrrigationDeviceStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IrrigationDeviceStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>
          }
          findMany: {
            args: Prisma.IrrigationDeviceStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>[]
          }
          create: {
            args: Prisma.IrrigationDeviceStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>
          }
          createMany: {
            args: Prisma.IrrigationDeviceStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IrrigationDeviceStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>[]
          }
          delete: {
            args: Prisma.IrrigationDeviceStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>
          }
          update: {
            args: Prisma.IrrigationDeviceStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>
          }
          deleteMany: {
            args: Prisma.IrrigationDeviceStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IrrigationDeviceStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IrrigationDeviceStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationDeviceStatusPayload>
          }
          aggregate: {
            args: Prisma.IrrigationDeviceStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIrrigationDeviceStatus>
          }
          groupBy: {
            args: Prisma.IrrigationDeviceStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<IrrigationDeviceStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.IrrigationDeviceStatusCountArgs<ExtArgs>
            result: $Utils.Optional<IrrigationDeviceStatusCountAggregateOutputType> | number
          }
        }
      }
      DeviceAck: {
        payload: Prisma.$DeviceAckPayload<ExtArgs>
        fields: Prisma.DeviceAckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceAckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceAckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>
          }
          findFirst: {
            args: Prisma.DeviceAckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceAckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>
          }
          findMany: {
            args: Prisma.DeviceAckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>[]
          }
          create: {
            args: Prisma.DeviceAckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>
          }
          createMany: {
            args: Prisma.DeviceAckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceAckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>[]
          }
          delete: {
            args: Prisma.DeviceAckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>
          }
          update: {
            args: Prisma.DeviceAckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>
          }
          deleteMany: {
            args: Prisma.DeviceAckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceAckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DeviceAckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceAckPayload>
          }
          aggregate: {
            args: Prisma.DeviceAckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeviceAck>
          }
          groupBy: {
            args: Prisma.DeviceAckGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceAckGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceAckCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceAckCountAggregateOutputType> | number
          }
        }
      }
      IrrigationSchedule: {
        payload: Prisma.$IrrigationSchedulePayload<ExtArgs>
        fields: Prisma.IrrigationScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IrrigationScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IrrigationScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>
          }
          findFirst: {
            args: Prisma.IrrigationScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IrrigationScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>
          }
          findMany: {
            args: Prisma.IrrigationScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>[]
          }
          create: {
            args: Prisma.IrrigationScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>
          }
          createMany: {
            args: Prisma.IrrigationScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IrrigationScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>[]
          }
          delete: {
            args: Prisma.IrrigationScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>
          }
          update: {
            args: Prisma.IrrigationScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>
          }
          deleteMany: {
            args: Prisma.IrrigationScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IrrigationScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IrrigationScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IrrigationSchedulePayload>
          }
          aggregate: {
            args: Prisma.IrrigationScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIrrigationSchedule>
          }
          groupBy: {
            args: Prisma.IrrigationScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<IrrigationScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.IrrigationScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<IrrigationScheduleCountAggregateOutputType> | number
          }
        }
      }
      ScheduledIrrigation: {
        payload: Prisma.$ScheduledIrrigationPayload<ExtArgs>
        fields: Prisma.ScheduledIrrigationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduledIrrigationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduledIrrigationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>
          }
          findFirst: {
            args: Prisma.ScheduledIrrigationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduledIrrigationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>
          }
          findMany: {
            args: Prisma.ScheduledIrrigationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>[]
          }
          create: {
            args: Prisma.ScheduledIrrigationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>
          }
          createMany: {
            args: Prisma.ScheduledIrrigationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduledIrrigationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>[]
          }
          delete: {
            args: Prisma.ScheduledIrrigationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>
          }
          update: {
            args: Prisma.ScheduledIrrigationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>
          }
          deleteMany: {
            args: Prisma.ScheduledIrrigationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduledIrrigationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScheduledIrrigationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledIrrigationPayload>
          }
          aggregate: {
            args: Prisma.ScheduledIrrigationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScheduledIrrigation>
          }
          groupBy: {
            args: Prisma.ScheduledIrrigationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduledIrrigationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduledIrrigationCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduledIrrigationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FarmCountOutputType
   */

  export type FarmCountOutputType = {
    sections: number
    moistureReadings: number
    irrigationEvents: number
    moistureDeviceStatuses: number
    irrigationDeviceStatuses: number
    deviceAcks: number
    irrigationSchedules: number
    scheduledIrrigations: number
  }

  export type FarmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | FarmCountOutputTypeCountSectionsArgs
    moistureReadings?: boolean | FarmCountOutputTypeCountMoistureReadingsArgs
    irrigationEvents?: boolean | FarmCountOutputTypeCountIrrigationEventsArgs
    moistureDeviceStatuses?: boolean | FarmCountOutputTypeCountMoistureDeviceStatusesArgs
    irrigationDeviceStatuses?: boolean | FarmCountOutputTypeCountIrrigationDeviceStatusesArgs
    deviceAcks?: boolean | FarmCountOutputTypeCountDeviceAcksArgs
    irrigationSchedules?: boolean | FarmCountOutputTypeCountIrrigationSchedulesArgs
    scheduledIrrigations?: boolean | FarmCountOutputTypeCountScheduledIrrigationsArgs
  }

  // Custom InputTypes
  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmCountOutputType
     */
    select?: FarmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountMoistureReadingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoistureReadingWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountIrrigationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationEventWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountMoistureDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoistureDeviceStatusWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountIrrigationDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationDeviceStatusWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountDeviceAcksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceAckWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountIrrigationSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationScheduleWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountScheduledIrrigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledIrrigationWhereInput
  }


  /**
   * Count Type SectionCountOutputType
   */

  export type SectionCountOutputType = {
    moistureReadings: number
    irrigationEvents: number
    moistureDeviceStatuses: number
    irrigationDeviceStatuses: number
    deviceAcks: number
    scheduledIrrigations: number
  }

  export type SectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    moistureReadings?: boolean | SectionCountOutputTypeCountMoistureReadingsArgs
    irrigationEvents?: boolean | SectionCountOutputTypeCountIrrigationEventsArgs
    moistureDeviceStatuses?: boolean | SectionCountOutputTypeCountMoistureDeviceStatusesArgs
    irrigationDeviceStatuses?: boolean | SectionCountOutputTypeCountIrrigationDeviceStatusesArgs
    deviceAcks?: boolean | SectionCountOutputTypeCountDeviceAcksArgs
    scheduledIrrigations?: boolean | SectionCountOutputTypeCountScheduledIrrigationsArgs
  }

  // Custom InputTypes
  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCountOutputType
     */
    select?: SectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountMoistureReadingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoistureReadingWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountIrrigationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationEventWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountMoistureDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoistureDeviceStatusWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountIrrigationDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationDeviceStatusWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountDeviceAcksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceAckWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountScheduledIrrigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledIrrigationWhereInput
  }


  /**
   * Count Type IrrigationScheduleCountOutputType
   */

  export type IrrigationScheduleCountOutputType = {
    scheduledIrrigations: number
  }

  export type IrrigationScheduleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scheduledIrrigations?: boolean | IrrigationScheduleCountOutputTypeCountScheduledIrrigationsArgs
  }

  // Custom InputTypes
  /**
   * IrrigationScheduleCountOutputType without action
   */
  export type IrrigationScheduleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationScheduleCountOutputType
     */
    select?: IrrigationScheduleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IrrigationScheduleCountOutputType without action
   */
  export type IrrigationScheduleCountOutputTypeCountScheduledIrrigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledIrrigationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Farm
   */

  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _avg: FarmAvgAggregateOutputType | null
    _sum: FarmSumAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmAvgAggregateOutputType = {
    id: number | null
  }

  export type FarmSumAggregateOutputType = {
    id: number | null
  }

  export type FarmMinAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmMaxAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmCountAggregateOutputType = {
    id: number
    name: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FarmAvgAggregateInputType = {
    id?: true
  }

  export type FarmSumAggregateInputType = {
    id?: true
  }

  export type FarmMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FarmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farm to aggregate.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FarmAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FarmSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithAggregationInput | FarmOrderByWithAggregationInput[]
    by: FarmScalarFieldEnum[] | FarmScalarFieldEnum
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _avg?: FarmAvgAggregateInputType
    _sum?: FarmSumAggregateInputType
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }

  export type FarmGroupByOutputType = {
    id: number
    name: string
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: FarmCountAggregateOutputType | null
    _avg: FarmAvgAggregateOutputType | null
    _sum: FarmSumAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sections?: boolean | Farm$sectionsArgs<ExtArgs>
    moistureReadings?: boolean | Farm$moistureReadingsArgs<ExtArgs>
    irrigationEvents?: boolean | Farm$irrigationEventsArgs<ExtArgs>
    moistureDeviceStatuses?: boolean | Farm$moistureDeviceStatusesArgs<ExtArgs>
    irrigationDeviceStatuses?: boolean | Farm$irrigationDeviceStatusesArgs<ExtArgs>
    deviceAcks?: boolean | Farm$deviceAcksArgs<ExtArgs>
    irrigationSchedules?: boolean | Farm$irrigationSchedulesArgs<ExtArgs>
    scheduledIrrigations?: boolean | Farm$scheduledIrrigationsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FarmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | Farm$sectionsArgs<ExtArgs>
    moistureReadings?: boolean | Farm$moistureReadingsArgs<ExtArgs>
    irrigationEvents?: boolean | Farm$irrigationEventsArgs<ExtArgs>
    moistureDeviceStatuses?: boolean | Farm$moistureDeviceStatusesArgs<ExtArgs>
    irrigationDeviceStatuses?: boolean | Farm$irrigationDeviceStatusesArgs<ExtArgs>
    deviceAcks?: boolean | Farm$deviceAcksArgs<ExtArgs>
    irrigationSchedules?: boolean | Farm$irrigationSchedulesArgs<ExtArgs>
    scheduledIrrigations?: boolean | Farm$scheduledIrrigationsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FarmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farm"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
      moistureReadings: Prisma.$MoistureReadingPayload<ExtArgs>[]
      irrigationEvents: Prisma.$IrrigationEventPayload<ExtArgs>[]
      moistureDeviceStatuses: Prisma.$MoistureDeviceStatusPayload<ExtArgs>[]
      irrigationDeviceStatuses: Prisma.$IrrigationDeviceStatusPayload<ExtArgs>[]
      deviceAcks: Prisma.$DeviceAckPayload<ExtArgs>[]
      irrigationSchedules: Prisma.$IrrigationSchedulePayload<ExtArgs>[]
      scheduledIrrigations: Prisma.$ScheduledIrrigationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["farm"]>
    composites: {}
  }

  type FarmGetPayload<S extends boolean | null | undefined | FarmDefaultArgs> = $Result.GetResult<Prisma.$FarmPayload, S>

  type FarmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FarmFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FarmCountAggregateInputType | true
    }

  export interface FarmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farm'], meta: { name: 'Farm' } }
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmFindUniqueArgs>(args: SelectSubset<T, FarmFindUniqueArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Farm that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmFindFirstArgs>(args?: SelectSubset<T, FarmFindFirstArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Farm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmWithIdOnly = await prisma.farm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmFindManyArgs>(args?: SelectSubset<T, FarmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
     */
    create<T extends FarmCreateArgs>(args: SelectSubset<T, FarmCreateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Farms.
     * @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmCreateManyArgs>(args?: SelectSubset<T, FarmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farms and returns the data saved in the database.
     * @param {FarmCreateManyAndReturnArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
     */
    delete<T extends FarmDeleteArgs>(args: SelectSubset<T, FarmDeleteArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmUpdateArgs>(args: SelectSubset<T, FarmUpdateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmDeleteManyArgs>(args?: SelectSubset<T, FarmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmUpdateManyArgs>(args: SelectSubset<T, FarmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
     */
    upsert<T extends FarmUpsertArgs>(args: SelectSubset<T, FarmUpsertArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): Prisma.PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farm model
   */
  readonly fields: FarmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends Farm$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany"> | Null>
    moistureReadings<T extends Farm$moistureReadingsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$moistureReadingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "findMany"> | Null>
    irrigationEvents<T extends Farm$irrigationEventsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$irrigationEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "findMany"> | Null>
    moistureDeviceStatuses<T extends Farm$moistureDeviceStatusesArgs<ExtArgs> = {}>(args?: Subset<T, Farm$moistureDeviceStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "findMany"> | Null>
    irrigationDeviceStatuses<T extends Farm$irrigationDeviceStatusesArgs<ExtArgs> = {}>(args?: Subset<T, Farm$irrigationDeviceStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "findMany"> | Null>
    deviceAcks<T extends Farm$deviceAcksArgs<ExtArgs> = {}>(args?: Subset<T, Farm$deviceAcksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "findMany"> | Null>
    irrigationSchedules<T extends Farm$irrigationSchedulesArgs<ExtArgs> = {}>(args?: Subset<T, Farm$irrigationSchedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "findMany"> | Null>
    scheduledIrrigations<T extends Farm$scheduledIrrigationsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$scheduledIrrigationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Farm model
   */ 
  interface FarmFieldRefs {
    readonly id: FieldRef<"Farm", 'Int'>
    readonly name: FieldRef<"Farm", 'String'>
    readonly location: FieldRef<"Farm", 'String'>
    readonly createdAt: FieldRef<"Farm", 'DateTime'>
    readonly updatedAt: FieldRef<"Farm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farm findUnique
   */
  export type FarmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findFirst
   */
  export type FarmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farms to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm create
   */
  export type FarmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to create a Farm.
     */
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }

  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm createManyAndReturn
   */
  export type FarmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm update
   */
  export type FarmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to update a Farm.
     */
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
  }

  /**
   * Farm upsert
   */
  export type FarmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The filter to search for the Farm to update in case it exists.
     */
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     */
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }

  /**
   * Farm delete
   */
  export type FarmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter which Farm to delete.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farms to delete
     */
    where?: FarmWhereInput
  }

  /**
   * Farm.sections
   */
  export type Farm$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Farm.moistureReadings
   */
  export type Farm$moistureReadingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    where?: MoistureReadingWhereInput
    orderBy?: MoistureReadingOrderByWithRelationInput | MoistureReadingOrderByWithRelationInput[]
    cursor?: MoistureReadingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoistureReadingScalarFieldEnum | MoistureReadingScalarFieldEnum[]
  }

  /**
   * Farm.irrigationEvents
   */
  export type Farm$irrigationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    where?: IrrigationEventWhereInput
    orderBy?: IrrigationEventOrderByWithRelationInput | IrrigationEventOrderByWithRelationInput[]
    cursor?: IrrigationEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IrrigationEventScalarFieldEnum | IrrigationEventScalarFieldEnum[]
  }

  /**
   * Farm.moistureDeviceStatuses
   */
  export type Farm$moistureDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    where?: MoistureDeviceStatusWhereInput
    orderBy?: MoistureDeviceStatusOrderByWithRelationInput | MoistureDeviceStatusOrderByWithRelationInput[]
    cursor?: MoistureDeviceStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoistureDeviceStatusScalarFieldEnum | MoistureDeviceStatusScalarFieldEnum[]
  }

  /**
   * Farm.irrigationDeviceStatuses
   */
  export type Farm$irrigationDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    where?: IrrigationDeviceStatusWhereInput
    orderBy?: IrrigationDeviceStatusOrderByWithRelationInput | IrrigationDeviceStatusOrderByWithRelationInput[]
    cursor?: IrrigationDeviceStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IrrigationDeviceStatusScalarFieldEnum | IrrigationDeviceStatusScalarFieldEnum[]
  }

  /**
   * Farm.deviceAcks
   */
  export type Farm$deviceAcksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    where?: DeviceAckWhereInput
    orderBy?: DeviceAckOrderByWithRelationInput | DeviceAckOrderByWithRelationInput[]
    cursor?: DeviceAckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceAckScalarFieldEnum | DeviceAckScalarFieldEnum[]
  }

  /**
   * Farm.irrigationSchedules
   */
  export type Farm$irrigationSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    where?: IrrigationScheduleWhereInput
    orderBy?: IrrigationScheduleOrderByWithRelationInput | IrrigationScheduleOrderByWithRelationInput[]
    cursor?: IrrigationScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IrrigationScheduleScalarFieldEnum | IrrigationScheduleScalarFieldEnum[]
  }

  /**
   * Farm.scheduledIrrigations
   */
  export type Farm$scheduledIrrigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    where?: ScheduledIrrigationWhereInput
    orderBy?: ScheduledIrrigationOrderByWithRelationInput | ScheduledIrrigationOrderByWithRelationInput[]
    cursor?: ScheduledIrrigationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduledIrrigationScalarFieldEnum | ScheduledIrrigationScalarFieldEnum[]
  }

  /**
   * Farm without action
   */
  export type FarmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
  }


  /**
   * Model Section
   */

  export type AggregateSection = {
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  export type SectionAvgAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
  }

  export type SectionSumAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
  }

  export type SectionMinAggregateOutputType = {
    id: number | null
    name: string | null
    farm_id: number | null
    section_number: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    farm_id: number | null
    section_number: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectionCountAggregateOutputType = {
    id: number
    name: number
    farm_id: number
    section_number: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SectionAvgAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
  }

  export type SectionSumAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
  }

  export type SectionMinAggregateInputType = {
    id?: true
    name?: true
    farm_id?: true
    section_number?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectionMaxAggregateInputType = {
    id?: true
    name?: true
    farm_id?: true
    section_number?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectionCountAggregateInputType = {
    id?: true
    name?: true
    farm_id?: true
    section_number?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Section to aggregate.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sections
    **/
    _count?: true | SectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionMaxAggregateInputType
  }

  export type GetSectionAggregateType<T extends SectionAggregateArgs> = {
        [P in keyof T & keyof AggregateSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSection[P]>
      : GetScalarType<T[P], AggregateSection[P]>
  }




  export type SectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithAggregationInput | SectionOrderByWithAggregationInput[]
    by: SectionScalarFieldEnum[] | SectionScalarFieldEnum
    having?: SectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCountAggregateInputType | true
    _avg?: SectionAvgAggregateInputType
    _sum?: SectionSumAggregateInputType
    _min?: SectionMinAggregateInputType
    _max?: SectionMaxAggregateInputType
  }

  export type SectionGroupByOutputType = {
    id: number
    name: string
    farm_id: number
    section_number: number
    createdAt: Date
    updatedAt: Date
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  type GetSectionGroupByPayload<T extends SectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionGroupByOutputType[P]>
            : GetScalarType<T[P], SectionGroupByOutputType[P]>
        }
      >
    >


  export type SectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    farm_id?: boolean
    section_number?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    moistureReadings?: boolean | Section$moistureReadingsArgs<ExtArgs>
    irrigationEvents?: boolean | Section$irrigationEventsArgs<ExtArgs>
    moistureDeviceStatuses?: boolean | Section$moistureDeviceStatusesArgs<ExtArgs>
    irrigationDeviceStatuses?: boolean | Section$irrigationDeviceStatusesArgs<ExtArgs>
    deviceAcks?: boolean | Section$deviceAcksArgs<ExtArgs>
    scheduledIrrigations?: boolean | Section$scheduledIrrigationsArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    farm_id?: boolean
    section_number?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectScalar = {
    id?: boolean
    name?: boolean
    farm_id?: boolean
    section_number?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    moistureReadings?: boolean | Section$moistureReadingsArgs<ExtArgs>
    irrigationEvents?: boolean | Section$irrigationEventsArgs<ExtArgs>
    moistureDeviceStatuses?: boolean | Section$moistureDeviceStatusesArgs<ExtArgs>
    irrigationDeviceStatuses?: boolean | Section$irrigationDeviceStatusesArgs<ExtArgs>
    deviceAcks?: boolean | Section$deviceAcksArgs<ExtArgs>
    scheduledIrrigations?: boolean | Section$scheduledIrrigationsArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $SectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Section"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      moistureReadings: Prisma.$MoistureReadingPayload<ExtArgs>[]
      irrigationEvents: Prisma.$IrrigationEventPayload<ExtArgs>[]
      moistureDeviceStatuses: Prisma.$MoistureDeviceStatusPayload<ExtArgs>[]
      irrigationDeviceStatuses: Prisma.$IrrigationDeviceStatusPayload<ExtArgs>[]
      deviceAcks: Prisma.$DeviceAckPayload<ExtArgs>[]
      scheduledIrrigations: Prisma.$ScheduledIrrigationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      farm_id: number
      section_number: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["section"]>
    composites: {}
  }

  type SectionGetPayload<S extends boolean | null | undefined | SectionDefaultArgs> = $Result.GetResult<Prisma.$SectionPayload, S>

  type SectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SectionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SectionCountAggregateInputType | true
    }

  export interface SectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Section'], meta: { name: 'Section' } }
    /**
     * Find zero or one Section that matches the filter.
     * @param {SectionFindUniqueArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFindUniqueArgs>(args: SelectSubset<T, SectionFindUniqueArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Section that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SectionFindUniqueOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFindFirstArgs>(args?: SelectSubset<T, SectionFindFirstArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sections
     * const sections = await prisma.section.findMany()
     * 
     * // Get first 10 Sections
     * const sections = await prisma.section.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionWithIdOnly = await prisma.section.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionFindManyArgs>(args?: SelectSubset<T, SectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Section.
     * @param {SectionCreateArgs} args - Arguments to create a Section.
     * @example
     * // Create one Section
     * const Section = await prisma.section.create({
     *   data: {
     *     // ... data to create a Section
     *   }
     * })
     * 
     */
    create<T extends SectionCreateArgs>(args: SelectSubset<T, SectionCreateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sections.
     * @param {SectionCreateManyArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCreateManyArgs>(args?: SelectSubset<T, SectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sections and returns the data saved in the database.
     * @param {SectionCreateManyAndReturnArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sections and only return the `id`
     * const sectionWithIdOnly = await prisma.section.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectionCreateManyAndReturnArgs>(args?: SelectSubset<T, SectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Section.
     * @param {SectionDeleteArgs} args - Arguments to delete one Section.
     * @example
     * // Delete one Section
     * const Section = await prisma.section.delete({
     *   where: {
     *     // ... filter to delete one Section
     *   }
     * })
     * 
     */
    delete<T extends SectionDeleteArgs>(args: SelectSubset<T, SectionDeleteArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Section.
     * @param {SectionUpdateArgs} args - Arguments to update one Section.
     * @example
     * // Update one Section
     * const section = await prisma.section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionUpdateArgs>(args: SelectSubset<T, SectionUpdateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sections.
     * @param {SectionDeleteManyArgs} args - Arguments to filter Sections to delete.
     * @example
     * // Delete a few Sections
     * const { count } = await prisma.section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionDeleteManyArgs>(args?: SelectSubset<T, SectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionUpdateManyArgs>(args: SelectSubset<T, SectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Section.
     * @param {SectionUpsertArgs} args - Arguments to update or create a Section.
     * @example
     * // Update or create a Section
     * const section = await prisma.section.upsert({
     *   create: {
     *     // ... data to create a Section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Section we want to update
     *   }
     * })
     */
    upsert<T extends SectionUpsertArgs>(args: SelectSubset<T, SectionUpsertArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCountArgs} args - Arguments to filter Sections to count.
     * @example
     * // Count the number of Sections
     * const count = await prisma.section.count({
     *   where: {
     *     // ... the filter for the Sections we want to count
     *   }
     * })
    **/
    count<T extends SectionCountArgs>(
      args?: Subset<T, SectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectionAggregateArgs>(args: Subset<T, SectionAggregateArgs>): Prisma.PrismaPromise<GetSectionAggregateType<T>>

    /**
     * Group by Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionGroupByArgs['orderBy'] }
        : { orderBy?: SectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Section model
   */
  readonly fields: SectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    moistureReadings<T extends Section$moistureReadingsArgs<ExtArgs> = {}>(args?: Subset<T, Section$moistureReadingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "findMany"> | Null>
    irrigationEvents<T extends Section$irrigationEventsArgs<ExtArgs> = {}>(args?: Subset<T, Section$irrigationEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "findMany"> | Null>
    moistureDeviceStatuses<T extends Section$moistureDeviceStatusesArgs<ExtArgs> = {}>(args?: Subset<T, Section$moistureDeviceStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "findMany"> | Null>
    irrigationDeviceStatuses<T extends Section$irrigationDeviceStatusesArgs<ExtArgs> = {}>(args?: Subset<T, Section$irrigationDeviceStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "findMany"> | Null>
    deviceAcks<T extends Section$deviceAcksArgs<ExtArgs> = {}>(args?: Subset<T, Section$deviceAcksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "findMany"> | Null>
    scheduledIrrigations<T extends Section$scheduledIrrigationsArgs<ExtArgs> = {}>(args?: Subset<T, Section$scheduledIrrigationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Section model
   */ 
  interface SectionFieldRefs {
    readonly id: FieldRef<"Section", 'Int'>
    readonly name: FieldRef<"Section", 'String'>
    readonly farm_id: FieldRef<"Section", 'Int'>
    readonly section_number: FieldRef<"Section", 'Int'>
    readonly createdAt: FieldRef<"Section", 'DateTime'>
    readonly updatedAt: FieldRef<"Section", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Section findUnique
   */
  export type SectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findUniqueOrThrow
   */
  export type SectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findFirst
   */
  export type SectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findFirstOrThrow
   */
  export type SectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findMany
   */
  export type SectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Sections to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section create
   */
  export type SectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Section.
     */
    data: XOR<SectionCreateInput, SectionUncheckedCreateInput>
  }

  /**
   * Section createMany
   */
  export type SectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section createManyAndReturn
   */
  export type SectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Section update
   */
  export type SectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Section.
     */
    data: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
    /**
     * Choose, which Section to update.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section updateMany
   */
  export type SectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
  }

  /**
   * Section upsert
   */
  export type SectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Section to update in case it exists.
     */
    where: SectionWhereUniqueInput
    /**
     * In case the Section found by the `where` argument doesn't exist, create a new Section with this data.
     */
    create: XOR<SectionCreateInput, SectionUncheckedCreateInput>
    /**
     * In case the Section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
  }

  /**
   * Section delete
   */
  export type SectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter which Section to delete.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section deleteMany
   */
  export type SectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sections to delete
     */
    where?: SectionWhereInput
  }

  /**
   * Section.moistureReadings
   */
  export type Section$moistureReadingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    where?: MoistureReadingWhereInput
    orderBy?: MoistureReadingOrderByWithRelationInput | MoistureReadingOrderByWithRelationInput[]
    cursor?: MoistureReadingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoistureReadingScalarFieldEnum | MoistureReadingScalarFieldEnum[]
  }

  /**
   * Section.irrigationEvents
   */
  export type Section$irrigationEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    where?: IrrigationEventWhereInput
    orderBy?: IrrigationEventOrderByWithRelationInput | IrrigationEventOrderByWithRelationInput[]
    cursor?: IrrigationEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IrrigationEventScalarFieldEnum | IrrigationEventScalarFieldEnum[]
  }

  /**
   * Section.moistureDeviceStatuses
   */
  export type Section$moistureDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    where?: MoistureDeviceStatusWhereInput
    orderBy?: MoistureDeviceStatusOrderByWithRelationInput | MoistureDeviceStatusOrderByWithRelationInput[]
    cursor?: MoistureDeviceStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoistureDeviceStatusScalarFieldEnum | MoistureDeviceStatusScalarFieldEnum[]
  }

  /**
   * Section.irrigationDeviceStatuses
   */
  export type Section$irrigationDeviceStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    where?: IrrigationDeviceStatusWhereInput
    orderBy?: IrrigationDeviceStatusOrderByWithRelationInput | IrrigationDeviceStatusOrderByWithRelationInput[]
    cursor?: IrrigationDeviceStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IrrigationDeviceStatusScalarFieldEnum | IrrigationDeviceStatusScalarFieldEnum[]
  }

  /**
   * Section.deviceAcks
   */
  export type Section$deviceAcksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    where?: DeviceAckWhereInput
    orderBy?: DeviceAckOrderByWithRelationInput | DeviceAckOrderByWithRelationInput[]
    cursor?: DeviceAckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceAckScalarFieldEnum | DeviceAckScalarFieldEnum[]
  }

  /**
   * Section.scheduledIrrigations
   */
  export type Section$scheduledIrrigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    where?: ScheduledIrrigationWhereInput
    orderBy?: ScheduledIrrigationOrderByWithRelationInput | ScheduledIrrigationOrderByWithRelationInput[]
    cursor?: ScheduledIrrigationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduledIrrigationScalarFieldEnum | ScheduledIrrigationScalarFieldEnum[]
  }

  /**
   * Section without action
   */
  export type SectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    farm_ids: number | null
  }

  export type UserSumAggregateOutputType = {
    farm_ids: number[]
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    farm_ids: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    farm_ids?: true
  }

  export type UserSumAggregateInputType = {
    farm_ids?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    farm_ids?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    farm_ids: number[]
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    farm_ids?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    farm_ids?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    farm_ids?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      farm_ids: number[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly farm_ids: FieldRef<"User", 'Int[]'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model MoistureReading
   */

  export type AggregateMoistureReading = {
    _count: MoistureReadingCountAggregateOutputType | null
    _avg: MoistureReadingAvgAggregateOutputType | null
    _sum: MoistureReadingSumAggregateOutputType | null
    _min: MoistureReadingMinAggregateOutputType | null
    _max: MoistureReadingMaxAggregateOutputType | null
  }

  export type MoistureReadingAvgAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    value: number | null
  }

  export type MoistureReadingSumAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    value: number | null
  }

  export type MoistureReadingMinAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    value: number | null
    timestamp: Date | null
  }

  export type MoistureReadingMaxAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    value: number | null
    timestamp: Date | null
  }

  export type MoistureReadingCountAggregateOutputType = {
    id: number
    farm_id: number
    section_number: number
    value: number
    timestamp: number
    _all: number
  }


  export type MoistureReadingAvgAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    value?: true
  }

  export type MoistureReadingSumAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    value?: true
  }

  export type MoistureReadingMinAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    value?: true
    timestamp?: true
  }

  export type MoistureReadingMaxAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    value?: true
    timestamp?: true
  }

  export type MoistureReadingCountAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    value?: true
    timestamp?: true
    _all?: true
  }

  export type MoistureReadingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoistureReading to aggregate.
     */
    where?: MoistureReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureReadings to fetch.
     */
    orderBy?: MoistureReadingOrderByWithRelationInput | MoistureReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoistureReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MoistureReadings
    **/
    _count?: true | MoistureReadingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoistureReadingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoistureReadingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoistureReadingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoistureReadingMaxAggregateInputType
  }

  export type GetMoistureReadingAggregateType<T extends MoistureReadingAggregateArgs> = {
        [P in keyof T & keyof AggregateMoistureReading]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMoistureReading[P]>
      : GetScalarType<T[P], AggregateMoistureReading[P]>
  }




  export type MoistureReadingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoistureReadingWhereInput
    orderBy?: MoistureReadingOrderByWithAggregationInput | MoistureReadingOrderByWithAggregationInput[]
    by: MoistureReadingScalarFieldEnum[] | MoistureReadingScalarFieldEnum
    having?: MoistureReadingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoistureReadingCountAggregateInputType | true
    _avg?: MoistureReadingAvgAggregateInputType
    _sum?: MoistureReadingSumAggregateInputType
    _min?: MoistureReadingMinAggregateInputType
    _max?: MoistureReadingMaxAggregateInputType
  }

  export type MoistureReadingGroupByOutputType = {
    id: number
    farm_id: number
    section_number: number
    value: number
    timestamp: Date
    _count: MoistureReadingCountAggregateOutputType | null
    _avg: MoistureReadingAvgAggregateOutputType | null
    _sum: MoistureReadingSumAggregateOutputType | null
    _min: MoistureReadingMinAggregateOutputType | null
    _max: MoistureReadingMaxAggregateOutputType | null
  }

  type GetMoistureReadingGroupByPayload<T extends MoistureReadingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoistureReadingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoistureReadingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoistureReadingGroupByOutputType[P]>
            : GetScalarType<T[P], MoistureReadingGroupByOutputType[P]>
        }
      >
    >


  export type MoistureReadingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    farm_id?: boolean
    section_number?: boolean
    value?: boolean
    timestamp?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moistureReading"]>

  export type MoistureReadingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    farm_id?: boolean
    section_number?: boolean
    value?: boolean
    timestamp?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moistureReading"]>

  export type MoistureReadingSelectScalar = {
    id?: boolean
    farm_id?: boolean
    section_number?: boolean
    value?: boolean
    timestamp?: boolean
  }

  export type MoistureReadingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type MoistureReadingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $MoistureReadingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MoistureReading"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      farm_id: number
      section_number: number
      value: number
      timestamp: Date
    }, ExtArgs["result"]["moistureReading"]>
    composites: {}
  }

  type MoistureReadingGetPayload<S extends boolean | null | undefined | MoistureReadingDefaultArgs> = $Result.GetResult<Prisma.$MoistureReadingPayload, S>

  type MoistureReadingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MoistureReadingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MoistureReadingCountAggregateInputType | true
    }

  export interface MoistureReadingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MoistureReading'], meta: { name: 'MoistureReading' } }
    /**
     * Find zero or one MoistureReading that matches the filter.
     * @param {MoistureReadingFindUniqueArgs} args - Arguments to find a MoistureReading
     * @example
     * // Get one MoistureReading
     * const moistureReading = await prisma.moistureReading.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoistureReadingFindUniqueArgs>(args: SelectSubset<T, MoistureReadingFindUniqueArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MoistureReading that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MoistureReadingFindUniqueOrThrowArgs} args - Arguments to find a MoistureReading
     * @example
     * // Get one MoistureReading
     * const moistureReading = await prisma.moistureReading.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoistureReadingFindUniqueOrThrowArgs>(args: SelectSubset<T, MoistureReadingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MoistureReading that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureReadingFindFirstArgs} args - Arguments to find a MoistureReading
     * @example
     * // Get one MoistureReading
     * const moistureReading = await prisma.moistureReading.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoistureReadingFindFirstArgs>(args?: SelectSubset<T, MoistureReadingFindFirstArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MoistureReading that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureReadingFindFirstOrThrowArgs} args - Arguments to find a MoistureReading
     * @example
     * // Get one MoistureReading
     * const moistureReading = await prisma.moistureReading.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoistureReadingFindFirstOrThrowArgs>(args?: SelectSubset<T, MoistureReadingFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MoistureReadings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureReadingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MoistureReadings
     * const moistureReadings = await prisma.moistureReading.findMany()
     * 
     * // Get first 10 MoistureReadings
     * const moistureReadings = await prisma.moistureReading.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moistureReadingWithIdOnly = await prisma.moistureReading.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoistureReadingFindManyArgs>(args?: SelectSubset<T, MoistureReadingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MoistureReading.
     * @param {MoistureReadingCreateArgs} args - Arguments to create a MoistureReading.
     * @example
     * // Create one MoistureReading
     * const MoistureReading = await prisma.moistureReading.create({
     *   data: {
     *     // ... data to create a MoistureReading
     *   }
     * })
     * 
     */
    create<T extends MoistureReadingCreateArgs>(args: SelectSubset<T, MoistureReadingCreateArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MoistureReadings.
     * @param {MoistureReadingCreateManyArgs} args - Arguments to create many MoistureReadings.
     * @example
     * // Create many MoistureReadings
     * const moistureReading = await prisma.moistureReading.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoistureReadingCreateManyArgs>(args?: SelectSubset<T, MoistureReadingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MoistureReadings and returns the data saved in the database.
     * @param {MoistureReadingCreateManyAndReturnArgs} args - Arguments to create many MoistureReadings.
     * @example
     * // Create many MoistureReadings
     * const moistureReading = await prisma.moistureReading.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MoistureReadings and only return the `id`
     * const moistureReadingWithIdOnly = await prisma.moistureReading.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoistureReadingCreateManyAndReturnArgs>(args?: SelectSubset<T, MoistureReadingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MoistureReading.
     * @param {MoistureReadingDeleteArgs} args - Arguments to delete one MoistureReading.
     * @example
     * // Delete one MoistureReading
     * const MoistureReading = await prisma.moistureReading.delete({
     *   where: {
     *     // ... filter to delete one MoistureReading
     *   }
     * })
     * 
     */
    delete<T extends MoistureReadingDeleteArgs>(args: SelectSubset<T, MoistureReadingDeleteArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MoistureReading.
     * @param {MoistureReadingUpdateArgs} args - Arguments to update one MoistureReading.
     * @example
     * // Update one MoistureReading
     * const moistureReading = await prisma.moistureReading.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoistureReadingUpdateArgs>(args: SelectSubset<T, MoistureReadingUpdateArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MoistureReadings.
     * @param {MoistureReadingDeleteManyArgs} args - Arguments to filter MoistureReadings to delete.
     * @example
     * // Delete a few MoistureReadings
     * const { count } = await prisma.moistureReading.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoistureReadingDeleteManyArgs>(args?: SelectSubset<T, MoistureReadingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoistureReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureReadingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MoistureReadings
     * const moistureReading = await prisma.moistureReading.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoistureReadingUpdateManyArgs>(args: SelectSubset<T, MoistureReadingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MoistureReading.
     * @param {MoistureReadingUpsertArgs} args - Arguments to update or create a MoistureReading.
     * @example
     * // Update or create a MoistureReading
     * const moistureReading = await prisma.moistureReading.upsert({
     *   create: {
     *     // ... data to create a MoistureReading
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MoistureReading we want to update
     *   }
     * })
     */
    upsert<T extends MoistureReadingUpsertArgs>(args: SelectSubset<T, MoistureReadingUpsertArgs<ExtArgs>>): Prisma__MoistureReadingClient<$Result.GetResult<Prisma.$MoistureReadingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MoistureReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureReadingCountArgs} args - Arguments to filter MoistureReadings to count.
     * @example
     * // Count the number of MoistureReadings
     * const count = await prisma.moistureReading.count({
     *   where: {
     *     // ... the filter for the MoistureReadings we want to count
     *   }
     * })
    **/
    count<T extends MoistureReadingCountArgs>(
      args?: Subset<T, MoistureReadingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoistureReadingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MoistureReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureReadingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoistureReadingAggregateArgs>(args: Subset<T, MoistureReadingAggregateArgs>): Prisma.PrismaPromise<GetMoistureReadingAggregateType<T>>

    /**
     * Group by MoistureReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureReadingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoistureReadingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoistureReadingGroupByArgs['orderBy'] }
        : { orderBy?: MoistureReadingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoistureReadingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoistureReadingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MoistureReading model
   */
  readonly fields: MoistureReadingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MoistureReading.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoistureReadingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MoistureReading model
   */ 
  interface MoistureReadingFieldRefs {
    readonly id: FieldRef<"MoistureReading", 'Int'>
    readonly farm_id: FieldRef<"MoistureReading", 'Int'>
    readonly section_number: FieldRef<"MoistureReading", 'Int'>
    readonly value: FieldRef<"MoistureReading", 'Float'>
    readonly timestamp: FieldRef<"MoistureReading", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MoistureReading findUnique
   */
  export type MoistureReadingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * Filter, which MoistureReading to fetch.
     */
    where: MoistureReadingWhereUniqueInput
  }

  /**
   * MoistureReading findUniqueOrThrow
   */
  export type MoistureReadingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * Filter, which MoistureReading to fetch.
     */
    where: MoistureReadingWhereUniqueInput
  }

  /**
   * MoistureReading findFirst
   */
  export type MoistureReadingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * Filter, which MoistureReading to fetch.
     */
    where?: MoistureReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureReadings to fetch.
     */
    orderBy?: MoistureReadingOrderByWithRelationInput | MoistureReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoistureReadings.
     */
    cursor?: MoistureReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoistureReadings.
     */
    distinct?: MoistureReadingScalarFieldEnum | MoistureReadingScalarFieldEnum[]
  }

  /**
   * MoistureReading findFirstOrThrow
   */
  export type MoistureReadingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * Filter, which MoistureReading to fetch.
     */
    where?: MoistureReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureReadings to fetch.
     */
    orderBy?: MoistureReadingOrderByWithRelationInput | MoistureReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoistureReadings.
     */
    cursor?: MoistureReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoistureReadings.
     */
    distinct?: MoistureReadingScalarFieldEnum | MoistureReadingScalarFieldEnum[]
  }

  /**
   * MoistureReading findMany
   */
  export type MoistureReadingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * Filter, which MoistureReadings to fetch.
     */
    where?: MoistureReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureReadings to fetch.
     */
    orderBy?: MoistureReadingOrderByWithRelationInput | MoistureReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MoistureReadings.
     */
    cursor?: MoistureReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureReadings.
     */
    skip?: number
    distinct?: MoistureReadingScalarFieldEnum | MoistureReadingScalarFieldEnum[]
  }

  /**
   * MoistureReading create
   */
  export type MoistureReadingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * The data needed to create a MoistureReading.
     */
    data: XOR<MoistureReadingCreateInput, MoistureReadingUncheckedCreateInput>
  }

  /**
   * MoistureReading createMany
   */
  export type MoistureReadingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MoistureReadings.
     */
    data: MoistureReadingCreateManyInput | MoistureReadingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MoistureReading createManyAndReturn
   */
  export type MoistureReadingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MoistureReadings.
     */
    data: MoistureReadingCreateManyInput | MoistureReadingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoistureReading update
   */
  export type MoistureReadingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * The data needed to update a MoistureReading.
     */
    data: XOR<MoistureReadingUpdateInput, MoistureReadingUncheckedUpdateInput>
    /**
     * Choose, which MoistureReading to update.
     */
    where: MoistureReadingWhereUniqueInput
  }

  /**
   * MoistureReading updateMany
   */
  export type MoistureReadingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MoistureReadings.
     */
    data: XOR<MoistureReadingUpdateManyMutationInput, MoistureReadingUncheckedUpdateManyInput>
    /**
     * Filter which MoistureReadings to update
     */
    where?: MoistureReadingWhereInput
  }

  /**
   * MoistureReading upsert
   */
  export type MoistureReadingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * The filter to search for the MoistureReading to update in case it exists.
     */
    where: MoistureReadingWhereUniqueInput
    /**
     * In case the MoistureReading found by the `where` argument doesn't exist, create a new MoistureReading with this data.
     */
    create: XOR<MoistureReadingCreateInput, MoistureReadingUncheckedCreateInput>
    /**
     * In case the MoistureReading was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoistureReadingUpdateInput, MoistureReadingUncheckedUpdateInput>
  }

  /**
   * MoistureReading delete
   */
  export type MoistureReadingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
    /**
     * Filter which MoistureReading to delete.
     */
    where: MoistureReadingWhereUniqueInput
  }

  /**
   * MoistureReading deleteMany
   */
  export type MoistureReadingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoistureReadings to delete
     */
    where?: MoistureReadingWhereInput
  }

  /**
   * MoistureReading without action
   */
  export type MoistureReadingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureReading
     */
    select?: MoistureReadingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureReadingInclude<ExtArgs> | null
  }


  /**
   * Model IrrigationEvent
   */

  export type AggregateIrrigationEvent = {
    _count: IrrigationEventCountAggregateOutputType | null
    _avg: IrrigationEventAvgAggregateOutputType | null
    _sum: IrrigationEventSumAggregateOutputType | null
    _min: IrrigationEventMinAggregateOutputType | null
    _max: IrrigationEventMaxAggregateOutputType | null
  }

  export type IrrigationEventAvgAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    water_ml: number | null
  }

  export type IrrigationEventSumAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    water_ml: number | null
  }

  export type IrrigationEventMinAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    water_ml: number | null
    start_time: Date | null
    end_time: Date | null
  }

  export type IrrigationEventMaxAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    water_ml: number | null
    start_time: Date | null
    end_time: Date | null
  }

  export type IrrigationEventCountAggregateOutputType = {
    id: number
    farm_id: number
    section_number: number
    water_ml: number
    start_time: number
    end_time: number
    _all: number
  }


  export type IrrigationEventAvgAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    water_ml?: true
  }

  export type IrrigationEventSumAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    water_ml?: true
  }

  export type IrrigationEventMinAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    water_ml?: true
    start_time?: true
    end_time?: true
  }

  export type IrrigationEventMaxAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    water_ml?: true
    start_time?: true
    end_time?: true
  }

  export type IrrigationEventCountAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    water_ml?: true
    start_time?: true
    end_time?: true
    _all?: true
  }

  export type IrrigationEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationEvent to aggregate.
     */
    where?: IrrigationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationEvents to fetch.
     */
    orderBy?: IrrigationEventOrderByWithRelationInput | IrrigationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IrrigationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IrrigationEvents
    **/
    _count?: true | IrrigationEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IrrigationEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IrrigationEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IrrigationEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IrrigationEventMaxAggregateInputType
  }

  export type GetIrrigationEventAggregateType<T extends IrrigationEventAggregateArgs> = {
        [P in keyof T & keyof AggregateIrrigationEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIrrigationEvent[P]>
      : GetScalarType<T[P], AggregateIrrigationEvent[P]>
  }




  export type IrrigationEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationEventWhereInput
    orderBy?: IrrigationEventOrderByWithAggregationInput | IrrigationEventOrderByWithAggregationInput[]
    by: IrrigationEventScalarFieldEnum[] | IrrigationEventScalarFieldEnum
    having?: IrrigationEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IrrigationEventCountAggregateInputType | true
    _avg?: IrrigationEventAvgAggregateInputType
    _sum?: IrrigationEventSumAggregateInputType
    _min?: IrrigationEventMinAggregateInputType
    _max?: IrrigationEventMaxAggregateInputType
  }

  export type IrrigationEventGroupByOutputType = {
    id: number
    farm_id: number
    section_number: number
    water_ml: number
    start_time: Date
    end_time: Date
    _count: IrrigationEventCountAggregateOutputType | null
    _avg: IrrigationEventAvgAggregateOutputType | null
    _sum: IrrigationEventSumAggregateOutputType | null
    _min: IrrigationEventMinAggregateOutputType | null
    _max: IrrigationEventMaxAggregateOutputType | null
  }

  type GetIrrigationEventGroupByPayload<T extends IrrigationEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IrrigationEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IrrigationEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IrrigationEventGroupByOutputType[P]>
            : GetScalarType<T[P], IrrigationEventGroupByOutputType[P]>
        }
      >
    >


  export type IrrigationEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    farm_id?: boolean
    section_number?: boolean
    water_ml?: boolean
    start_time?: boolean
    end_time?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationEvent"]>

  export type IrrigationEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    farm_id?: boolean
    section_number?: boolean
    water_ml?: boolean
    start_time?: boolean
    end_time?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationEvent"]>

  export type IrrigationEventSelectScalar = {
    id?: boolean
    farm_id?: boolean
    section_number?: boolean
    water_ml?: boolean
    start_time?: boolean
    end_time?: boolean
  }

  export type IrrigationEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type IrrigationEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $IrrigationEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IrrigationEvent"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      farm_id: number
      section_number: number
      water_ml: number
      start_time: Date
      end_time: Date
    }, ExtArgs["result"]["irrigationEvent"]>
    composites: {}
  }

  type IrrigationEventGetPayload<S extends boolean | null | undefined | IrrigationEventDefaultArgs> = $Result.GetResult<Prisma.$IrrigationEventPayload, S>

  type IrrigationEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IrrigationEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IrrigationEventCountAggregateInputType | true
    }

  export interface IrrigationEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IrrigationEvent'], meta: { name: 'IrrigationEvent' } }
    /**
     * Find zero or one IrrigationEvent that matches the filter.
     * @param {IrrigationEventFindUniqueArgs} args - Arguments to find a IrrigationEvent
     * @example
     * // Get one IrrigationEvent
     * const irrigationEvent = await prisma.irrigationEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IrrigationEventFindUniqueArgs>(args: SelectSubset<T, IrrigationEventFindUniqueArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IrrigationEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IrrigationEventFindUniqueOrThrowArgs} args - Arguments to find a IrrigationEvent
     * @example
     * // Get one IrrigationEvent
     * const irrigationEvent = await prisma.irrigationEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IrrigationEventFindUniqueOrThrowArgs>(args: SelectSubset<T, IrrigationEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IrrigationEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationEventFindFirstArgs} args - Arguments to find a IrrigationEvent
     * @example
     * // Get one IrrigationEvent
     * const irrigationEvent = await prisma.irrigationEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IrrigationEventFindFirstArgs>(args?: SelectSubset<T, IrrigationEventFindFirstArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IrrigationEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationEventFindFirstOrThrowArgs} args - Arguments to find a IrrigationEvent
     * @example
     * // Get one IrrigationEvent
     * const irrigationEvent = await prisma.irrigationEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IrrigationEventFindFirstOrThrowArgs>(args?: SelectSubset<T, IrrigationEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IrrigationEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IrrigationEvents
     * const irrigationEvents = await prisma.irrigationEvent.findMany()
     * 
     * // Get first 10 IrrigationEvents
     * const irrigationEvents = await prisma.irrigationEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const irrigationEventWithIdOnly = await prisma.irrigationEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IrrigationEventFindManyArgs>(args?: SelectSubset<T, IrrigationEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IrrigationEvent.
     * @param {IrrigationEventCreateArgs} args - Arguments to create a IrrigationEvent.
     * @example
     * // Create one IrrigationEvent
     * const IrrigationEvent = await prisma.irrigationEvent.create({
     *   data: {
     *     // ... data to create a IrrigationEvent
     *   }
     * })
     * 
     */
    create<T extends IrrigationEventCreateArgs>(args: SelectSubset<T, IrrigationEventCreateArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IrrigationEvents.
     * @param {IrrigationEventCreateManyArgs} args - Arguments to create many IrrigationEvents.
     * @example
     * // Create many IrrigationEvents
     * const irrigationEvent = await prisma.irrigationEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IrrigationEventCreateManyArgs>(args?: SelectSubset<T, IrrigationEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IrrigationEvents and returns the data saved in the database.
     * @param {IrrigationEventCreateManyAndReturnArgs} args - Arguments to create many IrrigationEvents.
     * @example
     * // Create many IrrigationEvents
     * const irrigationEvent = await prisma.irrigationEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IrrigationEvents and only return the `id`
     * const irrigationEventWithIdOnly = await prisma.irrigationEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IrrigationEventCreateManyAndReturnArgs>(args?: SelectSubset<T, IrrigationEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IrrigationEvent.
     * @param {IrrigationEventDeleteArgs} args - Arguments to delete one IrrigationEvent.
     * @example
     * // Delete one IrrigationEvent
     * const IrrigationEvent = await prisma.irrigationEvent.delete({
     *   where: {
     *     // ... filter to delete one IrrigationEvent
     *   }
     * })
     * 
     */
    delete<T extends IrrigationEventDeleteArgs>(args: SelectSubset<T, IrrigationEventDeleteArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IrrigationEvent.
     * @param {IrrigationEventUpdateArgs} args - Arguments to update one IrrigationEvent.
     * @example
     * // Update one IrrigationEvent
     * const irrigationEvent = await prisma.irrigationEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IrrigationEventUpdateArgs>(args: SelectSubset<T, IrrigationEventUpdateArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IrrigationEvents.
     * @param {IrrigationEventDeleteManyArgs} args - Arguments to filter IrrigationEvents to delete.
     * @example
     * // Delete a few IrrigationEvents
     * const { count } = await prisma.irrigationEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IrrigationEventDeleteManyArgs>(args?: SelectSubset<T, IrrigationEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IrrigationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IrrigationEvents
     * const irrigationEvent = await prisma.irrigationEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IrrigationEventUpdateManyArgs>(args: SelectSubset<T, IrrigationEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IrrigationEvent.
     * @param {IrrigationEventUpsertArgs} args - Arguments to update or create a IrrigationEvent.
     * @example
     * // Update or create a IrrigationEvent
     * const irrigationEvent = await prisma.irrigationEvent.upsert({
     *   create: {
     *     // ... data to create a IrrigationEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IrrigationEvent we want to update
     *   }
     * })
     */
    upsert<T extends IrrigationEventUpsertArgs>(args: SelectSubset<T, IrrigationEventUpsertArgs<ExtArgs>>): Prisma__IrrigationEventClient<$Result.GetResult<Prisma.$IrrigationEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IrrigationEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationEventCountArgs} args - Arguments to filter IrrigationEvents to count.
     * @example
     * // Count the number of IrrigationEvents
     * const count = await prisma.irrigationEvent.count({
     *   where: {
     *     // ... the filter for the IrrigationEvents we want to count
     *   }
     * })
    **/
    count<T extends IrrigationEventCountArgs>(
      args?: Subset<T, IrrigationEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IrrigationEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IrrigationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IrrigationEventAggregateArgs>(args: Subset<T, IrrigationEventAggregateArgs>): Prisma.PrismaPromise<GetIrrigationEventAggregateType<T>>

    /**
     * Group by IrrigationEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IrrigationEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IrrigationEventGroupByArgs['orderBy'] }
        : { orderBy?: IrrigationEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IrrigationEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIrrigationEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IrrigationEvent model
   */
  readonly fields: IrrigationEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IrrigationEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IrrigationEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IrrigationEvent model
   */ 
  interface IrrigationEventFieldRefs {
    readonly id: FieldRef<"IrrigationEvent", 'Int'>
    readonly farm_id: FieldRef<"IrrigationEvent", 'Int'>
    readonly section_number: FieldRef<"IrrigationEvent", 'Int'>
    readonly water_ml: FieldRef<"IrrigationEvent", 'Float'>
    readonly start_time: FieldRef<"IrrigationEvent", 'DateTime'>
    readonly end_time: FieldRef<"IrrigationEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IrrigationEvent findUnique
   */
  export type IrrigationEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationEvent to fetch.
     */
    where: IrrigationEventWhereUniqueInput
  }

  /**
   * IrrigationEvent findUniqueOrThrow
   */
  export type IrrigationEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationEvent to fetch.
     */
    where: IrrigationEventWhereUniqueInput
  }

  /**
   * IrrigationEvent findFirst
   */
  export type IrrigationEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationEvent to fetch.
     */
    where?: IrrigationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationEvents to fetch.
     */
    orderBy?: IrrigationEventOrderByWithRelationInput | IrrigationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationEvents.
     */
    cursor?: IrrigationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationEvents.
     */
    distinct?: IrrigationEventScalarFieldEnum | IrrigationEventScalarFieldEnum[]
  }

  /**
   * IrrigationEvent findFirstOrThrow
   */
  export type IrrigationEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationEvent to fetch.
     */
    where?: IrrigationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationEvents to fetch.
     */
    orderBy?: IrrigationEventOrderByWithRelationInput | IrrigationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationEvents.
     */
    cursor?: IrrigationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationEvents.
     */
    distinct?: IrrigationEventScalarFieldEnum | IrrigationEventScalarFieldEnum[]
  }

  /**
   * IrrigationEvent findMany
   */
  export type IrrigationEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationEvents to fetch.
     */
    where?: IrrigationEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationEvents to fetch.
     */
    orderBy?: IrrigationEventOrderByWithRelationInput | IrrigationEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IrrigationEvents.
     */
    cursor?: IrrigationEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationEvents.
     */
    skip?: number
    distinct?: IrrigationEventScalarFieldEnum | IrrigationEventScalarFieldEnum[]
  }

  /**
   * IrrigationEvent create
   */
  export type IrrigationEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * The data needed to create a IrrigationEvent.
     */
    data: XOR<IrrigationEventCreateInput, IrrigationEventUncheckedCreateInput>
  }

  /**
   * IrrigationEvent createMany
   */
  export type IrrigationEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IrrigationEvents.
     */
    data: IrrigationEventCreateManyInput | IrrigationEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IrrigationEvent createManyAndReturn
   */
  export type IrrigationEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IrrigationEvents.
     */
    data: IrrigationEventCreateManyInput | IrrigationEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IrrigationEvent update
   */
  export type IrrigationEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * The data needed to update a IrrigationEvent.
     */
    data: XOR<IrrigationEventUpdateInput, IrrigationEventUncheckedUpdateInput>
    /**
     * Choose, which IrrigationEvent to update.
     */
    where: IrrigationEventWhereUniqueInput
  }

  /**
   * IrrigationEvent updateMany
   */
  export type IrrigationEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IrrigationEvents.
     */
    data: XOR<IrrigationEventUpdateManyMutationInput, IrrigationEventUncheckedUpdateManyInput>
    /**
     * Filter which IrrigationEvents to update
     */
    where?: IrrigationEventWhereInput
  }

  /**
   * IrrigationEvent upsert
   */
  export type IrrigationEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * The filter to search for the IrrigationEvent to update in case it exists.
     */
    where: IrrigationEventWhereUniqueInput
    /**
     * In case the IrrigationEvent found by the `where` argument doesn't exist, create a new IrrigationEvent with this data.
     */
    create: XOR<IrrigationEventCreateInput, IrrigationEventUncheckedCreateInput>
    /**
     * In case the IrrigationEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IrrigationEventUpdateInput, IrrigationEventUncheckedUpdateInput>
  }

  /**
   * IrrigationEvent delete
   */
  export type IrrigationEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
    /**
     * Filter which IrrigationEvent to delete.
     */
    where: IrrigationEventWhereUniqueInput
  }

  /**
   * IrrigationEvent deleteMany
   */
  export type IrrigationEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationEvents to delete
     */
    where?: IrrigationEventWhereInput
  }

  /**
   * IrrigationEvent without action
   */
  export type IrrigationEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationEvent
     */
    select?: IrrigationEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationEventInclude<ExtArgs> | null
  }


  /**
   * Model MoistureDeviceStatus
   */

  export type AggregateMoistureDeviceStatus = {
    _count: MoistureDeviceStatusCountAggregateOutputType | null
    _avg: MoistureDeviceStatusAvgAggregateOutputType | null
    _sum: MoistureDeviceStatusSumAggregateOutputType | null
    _min: MoistureDeviceStatusMinAggregateOutputType | null
    _max: MoistureDeviceStatusMaxAggregateOutputType | null
  }

  export type MoistureDeviceStatusAvgAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    uptime: number | null
    reporting_interval: number | null
    deep_sleep_duration: number | null
  }

  export type MoistureDeviceStatusSumAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    uptime: bigint | null
    reporting_interval: number | null
    deep_sleep_duration: number | null
  }

  export type MoistureDeviceStatusMinAggregateOutputType = {
    id: number | null
    device_id: string | null
    farm_id: number | null
    section_number: number | null
    mqtt: boolean | null
    wifi: boolean | null
    uptime: bigint | null
    timestamp: Date | null
    last_error: string | null
    enable_deep_sleep: boolean | null
    reporting_interval: number | null
    deep_sleep_duration: number | null
    createdAt: Date | null
  }

  export type MoistureDeviceStatusMaxAggregateOutputType = {
    id: number | null
    device_id: string | null
    farm_id: number | null
    section_number: number | null
    mqtt: boolean | null
    wifi: boolean | null
    uptime: bigint | null
    timestamp: Date | null
    last_error: string | null
    enable_deep_sleep: boolean | null
    reporting_interval: number | null
    deep_sleep_duration: number | null
    createdAt: Date | null
  }

  export type MoistureDeviceStatusCountAggregateOutputType = {
    id: number
    device_id: number
    farm_id: number
    section_number: number
    mqtt: number
    wifi: number
    uptime: number
    timestamp: number
    last_error: number
    enable_deep_sleep: number
    reporting_interval: number
    deep_sleep_duration: number
    createdAt: number
    _all: number
  }


  export type MoistureDeviceStatusAvgAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    uptime?: true
    reporting_interval?: true
    deep_sleep_duration?: true
  }

  export type MoistureDeviceStatusSumAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    uptime?: true
    reporting_interval?: true
    deep_sleep_duration?: true
  }

  export type MoistureDeviceStatusMinAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    mqtt?: true
    wifi?: true
    uptime?: true
    timestamp?: true
    last_error?: true
    enable_deep_sleep?: true
    reporting_interval?: true
    deep_sleep_duration?: true
    createdAt?: true
  }

  export type MoistureDeviceStatusMaxAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    mqtt?: true
    wifi?: true
    uptime?: true
    timestamp?: true
    last_error?: true
    enable_deep_sleep?: true
    reporting_interval?: true
    deep_sleep_duration?: true
    createdAt?: true
  }

  export type MoistureDeviceStatusCountAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    mqtt?: true
    wifi?: true
    uptime?: true
    timestamp?: true
    last_error?: true
    enable_deep_sleep?: true
    reporting_interval?: true
    deep_sleep_duration?: true
    createdAt?: true
    _all?: true
  }

  export type MoistureDeviceStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoistureDeviceStatus to aggregate.
     */
    where?: MoistureDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureDeviceStatuses to fetch.
     */
    orderBy?: MoistureDeviceStatusOrderByWithRelationInput | MoistureDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoistureDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureDeviceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MoistureDeviceStatuses
    **/
    _count?: true | MoistureDeviceStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoistureDeviceStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoistureDeviceStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoistureDeviceStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoistureDeviceStatusMaxAggregateInputType
  }

  export type GetMoistureDeviceStatusAggregateType<T extends MoistureDeviceStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateMoistureDeviceStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMoistureDeviceStatus[P]>
      : GetScalarType<T[P], AggregateMoistureDeviceStatus[P]>
  }




  export type MoistureDeviceStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoistureDeviceStatusWhereInput
    orderBy?: MoistureDeviceStatusOrderByWithAggregationInput | MoistureDeviceStatusOrderByWithAggregationInput[]
    by: MoistureDeviceStatusScalarFieldEnum[] | MoistureDeviceStatusScalarFieldEnum
    having?: MoistureDeviceStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoistureDeviceStatusCountAggregateInputType | true
    _avg?: MoistureDeviceStatusAvgAggregateInputType
    _sum?: MoistureDeviceStatusSumAggregateInputType
    _min?: MoistureDeviceStatusMinAggregateInputType
    _max?: MoistureDeviceStatusMaxAggregateInputType
  }

  export type MoistureDeviceStatusGroupByOutputType = {
    id: number
    device_id: string
    farm_id: number
    section_number: number
    mqtt: boolean
    wifi: boolean
    uptime: bigint
    timestamp: Date
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt: Date
    _count: MoistureDeviceStatusCountAggregateOutputType | null
    _avg: MoistureDeviceStatusAvgAggregateOutputType | null
    _sum: MoistureDeviceStatusSumAggregateOutputType | null
    _min: MoistureDeviceStatusMinAggregateOutputType | null
    _max: MoistureDeviceStatusMaxAggregateOutputType | null
  }

  type GetMoistureDeviceStatusGroupByPayload<T extends MoistureDeviceStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoistureDeviceStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoistureDeviceStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoistureDeviceStatusGroupByOutputType[P]>
            : GetScalarType<T[P], MoistureDeviceStatusGroupByOutputType[P]>
        }
      >
    >


  export type MoistureDeviceStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    mqtt?: boolean
    wifi?: boolean
    uptime?: boolean
    timestamp?: boolean
    last_error?: boolean
    enable_deep_sleep?: boolean
    reporting_interval?: boolean
    deep_sleep_duration?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moistureDeviceStatus"]>

  export type MoistureDeviceStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    mqtt?: boolean
    wifi?: boolean
    uptime?: boolean
    timestamp?: boolean
    last_error?: boolean
    enable_deep_sleep?: boolean
    reporting_interval?: boolean
    deep_sleep_duration?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moistureDeviceStatus"]>

  export type MoistureDeviceStatusSelectScalar = {
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    mqtt?: boolean
    wifi?: boolean
    uptime?: boolean
    timestamp?: boolean
    last_error?: boolean
    enable_deep_sleep?: boolean
    reporting_interval?: boolean
    deep_sleep_duration?: boolean
    createdAt?: boolean
  }

  export type MoistureDeviceStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type MoistureDeviceStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $MoistureDeviceStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MoistureDeviceStatus"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      device_id: string
      farm_id: number
      section_number: number
      mqtt: boolean
      wifi: boolean
      uptime: bigint
      timestamp: Date
      last_error: string
      enable_deep_sleep: boolean
      reporting_interval: number
      deep_sleep_duration: number
      createdAt: Date
    }, ExtArgs["result"]["moistureDeviceStatus"]>
    composites: {}
  }

  type MoistureDeviceStatusGetPayload<S extends boolean | null | undefined | MoistureDeviceStatusDefaultArgs> = $Result.GetResult<Prisma.$MoistureDeviceStatusPayload, S>

  type MoistureDeviceStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MoistureDeviceStatusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MoistureDeviceStatusCountAggregateInputType | true
    }

  export interface MoistureDeviceStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MoistureDeviceStatus'], meta: { name: 'MoistureDeviceStatus' } }
    /**
     * Find zero or one MoistureDeviceStatus that matches the filter.
     * @param {MoistureDeviceStatusFindUniqueArgs} args - Arguments to find a MoistureDeviceStatus
     * @example
     * // Get one MoistureDeviceStatus
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoistureDeviceStatusFindUniqueArgs>(args: SelectSubset<T, MoistureDeviceStatusFindUniqueArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MoistureDeviceStatus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MoistureDeviceStatusFindUniqueOrThrowArgs} args - Arguments to find a MoistureDeviceStatus
     * @example
     * // Get one MoistureDeviceStatus
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoistureDeviceStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, MoistureDeviceStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MoistureDeviceStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureDeviceStatusFindFirstArgs} args - Arguments to find a MoistureDeviceStatus
     * @example
     * // Get one MoistureDeviceStatus
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoistureDeviceStatusFindFirstArgs>(args?: SelectSubset<T, MoistureDeviceStatusFindFirstArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MoistureDeviceStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureDeviceStatusFindFirstOrThrowArgs} args - Arguments to find a MoistureDeviceStatus
     * @example
     * // Get one MoistureDeviceStatus
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoistureDeviceStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, MoistureDeviceStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MoistureDeviceStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureDeviceStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MoistureDeviceStatuses
     * const moistureDeviceStatuses = await prisma.moistureDeviceStatus.findMany()
     * 
     * // Get first 10 MoistureDeviceStatuses
     * const moistureDeviceStatuses = await prisma.moistureDeviceStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moistureDeviceStatusWithIdOnly = await prisma.moistureDeviceStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoistureDeviceStatusFindManyArgs>(args?: SelectSubset<T, MoistureDeviceStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MoistureDeviceStatus.
     * @param {MoistureDeviceStatusCreateArgs} args - Arguments to create a MoistureDeviceStatus.
     * @example
     * // Create one MoistureDeviceStatus
     * const MoistureDeviceStatus = await prisma.moistureDeviceStatus.create({
     *   data: {
     *     // ... data to create a MoistureDeviceStatus
     *   }
     * })
     * 
     */
    create<T extends MoistureDeviceStatusCreateArgs>(args: SelectSubset<T, MoistureDeviceStatusCreateArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MoistureDeviceStatuses.
     * @param {MoistureDeviceStatusCreateManyArgs} args - Arguments to create many MoistureDeviceStatuses.
     * @example
     * // Create many MoistureDeviceStatuses
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoistureDeviceStatusCreateManyArgs>(args?: SelectSubset<T, MoistureDeviceStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MoistureDeviceStatuses and returns the data saved in the database.
     * @param {MoistureDeviceStatusCreateManyAndReturnArgs} args - Arguments to create many MoistureDeviceStatuses.
     * @example
     * // Create many MoistureDeviceStatuses
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MoistureDeviceStatuses and only return the `id`
     * const moistureDeviceStatusWithIdOnly = await prisma.moistureDeviceStatus.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoistureDeviceStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, MoistureDeviceStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MoistureDeviceStatus.
     * @param {MoistureDeviceStatusDeleteArgs} args - Arguments to delete one MoistureDeviceStatus.
     * @example
     * // Delete one MoistureDeviceStatus
     * const MoistureDeviceStatus = await prisma.moistureDeviceStatus.delete({
     *   where: {
     *     // ... filter to delete one MoistureDeviceStatus
     *   }
     * })
     * 
     */
    delete<T extends MoistureDeviceStatusDeleteArgs>(args: SelectSubset<T, MoistureDeviceStatusDeleteArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MoistureDeviceStatus.
     * @param {MoistureDeviceStatusUpdateArgs} args - Arguments to update one MoistureDeviceStatus.
     * @example
     * // Update one MoistureDeviceStatus
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoistureDeviceStatusUpdateArgs>(args: SelectSubset<T, MoistureDeviceStatusUpdateArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MoistureDeviceStatuses.
     * @param {MoistureDeviceStatusDeleteManyArgs} args - Arguments to filter MoistureDeviceStatuses to delete.
     * @example
     * // Delete a few MoistureDeviceStatuses
     * const { count } = await prisma.moistureDeviceStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoistureDeviceStatusDeleteManyArgs>(args?: SelectSubset<T, MoistureDeviceStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoistureDeviceStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureDeviceStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MoistureDeviceStatuses
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoistureDeviceStatusUpdateManyArgs>(args: SelectSubset<T, MoistureDeviceStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MoistureDeviceStatus.
     * @param {MoistureDeviceStatusUpsertArgs} args - Arguments to update or create a MoistureDeviceStatus.
     * @example
     * // Update or create a MoistureDeviceStatus
     * const moistureDeviceStatus = await prisma.moistureDeviceStatus.upsert({
     *   create: {
     *     // ... data to create a MoistureDeviceStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MoistureDeviceStatus we want to update
     *   }
     * })
     */
    upsert<T extends MoistureDeviceStatusUpsertArgs>(args: SelectSubset<T, MoistureDeviceStatusUpsertArgs<ExtArgs>>): Prisma__MoistureDeviceStatusClient<$Result.GetResult<Prisma.$MoistureDeviceStatusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MoistureDeviceStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureDeviceStatusCountArgs} args - Arguments to filter MoistureDeviceStatuses to count.
     * @example
     * // Count the number of MoistureDeviceStatuses
     * const count = await prisma.moistureDeviceStatus.count({
     *   where: {
     *     // ... the filter for the MoistureDeviceStatuses we want to count
     *   }
     * })
    **/
    count<T extends MoistureDeviceStatusCountArgs>(
      args?: Subset<T, MoistureDeviceStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoistureDeviceStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MoistureDeviceStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureDeviceStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoistureDeviceStatusAggregateArgs>(args: Subset<T, MoistureDeviceStatusAggregateArgs>): Prisma.PrismaPromise<GetMoistureDeviceStatusAggregateType<T>>

    /**
     * Group by MoistureDeviceStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoistureDeviceStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoistureDeviceStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoistureDeviceStatusGroupByArgs['orderBy'] }
        : { orderBy?: MoistureDeviceStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoistureDeviceStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoistureDeviceStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MoistureDeviceStatus model
   */
  readonly fields: MoistureDeviceStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MoistureDeviceStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoistureDeviceStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MoistureDeviceStatus model
   */ 
  interface MoistureDeviceStatusFieldRefs {
    readonly id: FieldRef<"MoistureDeviceStatus", 'Int'>
    readonly device_id: FieldRef<"MoistureDeviceStatus", 'String'>
    readonly farm_id: FieldRef<"MoistureDeviceStatus", 'Int'>
    readonly section_number: FieldRef<"MoistureDeviceStatus", 'Int'>
    readonly mqtt: FieldRef<"MoistureDeviceStatus", 'Boolean'>
    readonly wifi: FieldRef<"MoistureDeviceStatus", 'Boolean'>
    readonly uptime: FieldRef<"MoistureDeviceStatus", 'BigInt'>
    readonly timestamp: FieldRef<"MoistureDeviceStatus", 'DateTime'>
    readonly last_error: FieldRef<"MoistureDeviceStatus", 'String'>
    readonly enable_deep_sleep: FieldRef<"MoistureDeviceStatus", 'Boolean'>
    readonly reporting_interval: FieldRef<"MoistureDeviceStatus", 'Int'>
    readonly deep_sleep_duration: FieldRef<"MoistureDeviceStatus", 'Int'>
    readonly createdAt: FieldRef<"MoistureDeviceStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MoistureDeviceStatus findUnique
   */
  export type MoistureDeviceStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which MoistureDeviceStatus to fetch.
     */
    where: MoistureDeviceStatusWhereUniqueInput
  }

  /**
   * MoistureDeviceStatus findUniqueOrThrow
   */
  export type MoistureDeviceStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which MoistureDeviceStatus to fetch.
     */
    where: MoistureDeviceStatusWhereUniqueInput
  }

  /**
   * MoistureDeviceStatus findFirst
   */
  export type MoistureDeviceStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which MoistureDeviceStatus to fetch.
     */
    where?: MoistureDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureDeviceStatuses to fetch.
     */
    orderBy?: MoistureDeviceStatusOrderByWithRelationInput | MoistureDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoistureDeviceStatuses.
     */
    cursor?: MoistureDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureDeviceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoistureDeviceStatuses.
     */
    distinct?: MoistureDeviceStatusScalarFieldEnum | MoistureDeviceStatusScalarFieldEnum[]
  }

  /**
   * MoistureDeviceStatus findFirstOrThrow
   */
  export type MoistureDeviceStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which MoistureDeviceStatus to fetch.
     */
    where?: MoistureDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureDeviceStatuses to fetch.
     */
    orderBy?: MoistureDeviceStatusOrderByWithRelationInput | MoistureDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoistureDeviceStatuses.
     */
    cursor?: MoistureDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureDeviceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoistureDeviceStatuses.
     */
    distinct?: MoistureDeviceStatusScalarFieldEnum | MoistureDeviceStatusScalarFieldEnum[]
  }

  /**
   * MoistureDeviceStatus findMany
   */
  export type MoistureDeviceStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which MoistureDeviceStatuses to fetch.
     */
    where?: MoistureDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoistureDeviceStatuses to fetch.
     */
    orderBy?: MoistureDeviceStatusOrderByWithRelationInput | MoistureDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MoistureDeviceStatuses.
     */
    cursor?: MoistureDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoistureDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoistureDeviceStatuses.
     */
    skip?: number
    distinct?: MoistureDeviceStatusScalarFieldEnum | MoistureDeviceStatusScalarFieldEnum[]
  }

  /**
   * MoistureDeviceStatus create
   */
  export type MoistureDeviceStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a MoistureDeviceStatus.
     */
    data: XOR<MoistureDeviceStatusCreateInput, MoistureDeviceStatusUncheckedCreateInput>
  }

  /**
   * MoistureDeviceStatus createMany
   */
  export type MoistureDeviceStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MoistureDeviceStatuses.
     */
    data: MoistureDeviceStatusCreateManyInput | MoistureDeviceStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MoistureDeviceStatus createManyAndReturn
   */
  export type MoistureDeviceStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MoistureDeviceStatuses.
     */
    data: MoistureDeviceStatusCreateManyInput | MoistureDeviceStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoistureDeviceStatus update
   */
  export type MoistureDeviceStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a MoistureDeviceStatus.
     */
    data: XOR<MoistureDeviceStatusUpdateInput, MoistureDeviceStatusUncheckedUpdateInput>
    /**
     * Choose, which MoistureDeviceStatus to update.
     */
    where: MoistureDeviceStatusWhereUniqueInput
  }

  /**
   * MoistureDeviceStatus updateMany
   */
  export type MoistureDeviceStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MoistureDeviceStatuses.
     */
    data: XOR<MoistureDeviceStatusUpdateManyMutationInput, MoistureDeviceStatusUncheckedUpdateManyInput>
    /**
     * Filter which MoistureDeviceStatuses to update
     */
    where?: MoistureDeviceStatusWhereInput
  }

  /**
   * MoistureDeviceStatus upsert
   */
  export type MoistureDeviceStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the MoistureDeviceStatus to update in case it exists.
     */
    where: MoistureDeviceStatusWhereUniqueInput
    /**
     * In case the MoistureDeviceStatus found by the `where` argument doesn't exist, create a new MoistureDeviceStatus with this data.
     */
    create: XOR<MoistureDeviceStatusCreateInput, MoistureDeviceStatusUncheckedCreateInput>
    /**
     * In case the MoistureDeviceStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoistureDeviceStatusUpdateInput, MoistureDeviceStatusUncheckedUpdateInput>
  }

  /**
   * MoistureDeviceStatus delete
   */
  export type MoistureDeviceStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter which MoistureDeviceStatus to delete.
     */
    where: MoistureDeviceStatusWhereUniqueInput
  }

  /**
   * MoistureDeviceStatus deleteMany
   */
  export type MoistureDeviceStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoistureDeviceStatuses to delete
     */
    where?: MoistureDeviceStatusWhereInput
  }

  /**
   * MoistureDeviceStatus without action
   */
  export type MoistureDeviceStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoistureDeviceStatus
     */
    select?: MoistureDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoistureDeviceStatusInclude<ExtArgs> | null
  }


  /**
   * Model IrrigationDeviceStatus
   */

  export type AggregateIrrigationDeviceStatus = {
    _count: IrrigationDeviceStatusCountAggregateOutputType | null
    _avg: IrrigationDeviceStatusAvgAggregateOutputType | null
    _sum: IrrigationDeviceStatusSumAggregateOutputType | null
    _min: IrrigationDeviceStatusMinAggregateOutputType | null
    _max: IrrigationDeviceStatusMaxAggregateOutputType | null
  }

  export type IrrigationDeviceStatusAvgAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    uptime: number | null
    wifi: number | null
    mqtt: number | null
    valve_on: number | null
    latest_moisture: number | null
    min_threshold: number | null
    max_threshold: number | null
    pulse_count: number | null
    water_ml: number | null
  }

  export type IrrigationDeviceStatusSumAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
    uptime: bigint | null
    wifi: number | null
    mqtt: number | null
    valve_on: number | null
    latest_moisture: number | null
    min_threshold: number | null
    max_threshold: number | null
    pulse_count: number | null
    water_ml: number | null
  }

  export type IrrigationDeviceStatusMinAggregateOutputType = {
    id: number | null
    device_id: string | null
    farm_id: number | null
    section_number: number | null
    uptime: bigint | null
    wifi: number | null
    mqtt: number | null
    last_error: string | null
    valve_on: number | null
    mode: string | null
    latest_moisture: number | null
    min_threshold: number | null
    max_threshold: number | null
    pulse_count: number | null
    water_ml: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type IrrigationDeviceStatusMaxAggregateOutputType = {
    id: number | null
    device_id: string | null
    farm_id: number | null
    section_number: number | null
    uptime: bigint | null
    wifi: number | null
    mqtt: number | null
    last_error: string | null
    valve_on: number | null
    mode: string | null
    latest_moisture: number | null
    min_threshold: number | null
    max_threshold: number | null
    pulse_count: number | null
    water_ml: number | null
    timestamp: Date | null
    createdAt: Date | null
  }

  export type IrrigationDeviceStatusCountAggregateOutputType = {
    id: number
    device_id: number
    farm_id: number
    section_number: number
    uptime: number
    wifi: number
    mqtt: number
    last_error: number
    valve_on: number
    mode: number
    latest_moisture: number
    min_threshold: number
    max_threshold: number
    pulse_count: number
    water_ml: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type IrrigationDeviceStatusAvgAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    uptime?: true
    wifi?: true
    mqtt?: true
    valve_on?: true
    latest_moisture?: true
    min_threshold?: true
    max_threshold?: true
    pulse_count?: true
    water_ml?: true
  }

  export type IrrigationDeviceStatusSumAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
    uptime?: true
    wifi?: true
    mqtt?: true
    valve_on?: true
    latest_moisture?: true
    min_threshold?: true
    max_threshold?: true
    pulse_count?: true
    water_ml?: true
  }

  export type IrrigationDeviceStatusMinAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    uptime?: true
    wifi?: true
    mqtt?: true
    last_error?: true
    valve_on?: true
    mode?: true
    latest_moisture?: true
    min_threshold?: true
    max_threshold?: true
    pulse_count?: true
    water_ml?: true
    timestamp?: true
    createdAt?: true
  }

  export type IrrigationDeviceStatusMaxAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    uptime?: true
    wifi?: true
    mqtt?: true
    last_error?: true
    valve_on?: true
    mode?: true
    latest_moisture?: true
    min_threshold?: true
    max_threshold?: true
    pulse_count?: true
    water_ml?: true
    timestamp?: true
    createdAt?: true
  }

  export type IrrigationDeviceStatusCountAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    uptime?: true
    wifi?: true
    mqtt?: true
    last_error?: true
    valve_on?: true
    mode?: true
    latest_moisture?: true
    min_threshold?: true
    max_threshold?: true
    pulse_count?: true
    water_ml?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type IrrigationDeviceStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationDeviceStatus to aggregate.
     */
    where?: IrrigationDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationDeviceStatuses to fetch.
     */
    orderBy?: IrrigationDeviceStatusOrderByWithRelationInput | IrrigationDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IrrigationDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationDeviceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IrrigationDeviceStatuses
    **/
    _count?: true | IrrigationDeviceStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IrrigationDeviceStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IrrigationDeviceStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IrrigationDeviceStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IrrigationDeviceStatusMaxAggregateInputType
  }

  export type GetIrrigationDeviceStatusAggregateType<T extends IrrigationDeviceStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateIrrigationDeviceStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIrrigationDeviceStatus[P]>
      : GetScalarType<T[P], AggregateIrrigationDeviceStatus[P]>
  }




  export type IrrigationDeviceStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationDeviceStatusWhereInput
    orderBy?: IrrigationDeviceStatusOrderByWithAggregationInput | IrrigationDeviceStatusOrderByWithAggregationInput[]
    by: IrrigationDeviceStatusScalarFieldEnum[] | IrrigationDeviceStatusScalarFieldEnum
    having?: IrrigationDeviceStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IrrigationDeviceStatusCountAggregateInputType | true
    _avg?: IrrigationDeviceStatusAvgAggregateInputType
    _sum?: IrrigationDeviceStatusSumAggregateInputType
    _min?: IrrigationDeviceStatusMinAggregateInputType
    _max?: IrrigationDeviceStatusMaxAggregateInputType
  }

  export type IrrigationDeviceStatusGroupByOutputType = {
    id: number
    device_id: string
    farm_id: number
    section_number: number
    uptime: bigint
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold: number
    max_threshold: number
    pulse_count: number
    water_ml: number
    timestamp: Date
    createdAt: Date
    _count: IrrigationDeviceStatusCountAggregateOutputType | null
    _avg: IrrigationDeviceStatusAvgAggregateOutputType | null
    _sum: IrrigationDeviceStatusSumAggregateOutputType | null
    _min: IrrigationDeviceStatusMinAggregateOutputType | null
    _max: IrrigationDeviceStatusMaxAggregateOutputType | null
  }

  type GetIrrigationDeviceStatusGroupByPayload<T extends IrrigationDeviceStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IrrigationDeviceStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IrrigationDeviceStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IrrigationDeviceStatusGroupByOutputType[P]>
            : GetScalarType<T[P], IrrigationDeviceStatusGroupByOutputType[P]>
        }
      >
    >


  export type IrrigationDeviceStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    uptime?: boolean
    wifi?: boolean
    mqtt?: boolean
    last_error?: boolean
    valve_on?: boolean
    mode?: boolean
    latest_moisture?: boolean
    min_threshold?: boolean
    max_threshold?: boolean
    pulse_count?: boolean
    water_ml?: boolean
    timestamp?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationDeviceStatus"]>

  export type IrrigationDeviceStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    uptime?: boolean
    wifi?: boolean
    mqtt?: boolean
    last_error?: boolean
    valve_on?: boolean
    mode?: boolean
    latest_moisture?: boolean
    min_threshold?: boolean
    max_threshold?: boolean
    pulse_count?: boolean
    water_ml?: boolean
    timestamp?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationDeviceStatus"]>

  export type IrrigationDeviceStatusSelectScalar = {
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    uptime?: boolean
    wifi?: boolean
    mqtt?: boolean
    last_error?: boolean
    valve_on?: boolean
    mode?: boolean
    latest_moisture?: boolean
    min_threshold?: boolean
    max_threshold?: boolean
    pulse_count?: boolean
    water_ml?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type IrrigationDeviceStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type IrrigationDeviceStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $IrrigationDeviceStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IrrigationDeviceStatus"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      device_id: string
      farm_id: number
      section_number: number
      uptime: bigint
      wifi: number
      mqtt: number
      last_error: string
      valve_on: number
      mode: string
      latest_moisture: number
      min_threshold: number
      max_threshold: number
      pulse_count: number
      water_ml: number
      timestamp: Date
      createdAt: Date
    }, ExtArgs["result"]["irrigationDeviceStatus"]>
    composites: {}
  }

  type IrrigationDeviceStatusGetPayload<S extends boolean | null | undefined | IrrigationDeviceStatusDefaultArgs> = $Result.GetResult<Prisma.$IrrigationDeviceStatusPayload, S>

  type IrrigationDeviceStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IrrigationDeviceStatusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IrrigationDeviceStatusCountAggregateInputType | true
    }

  export interface IrrigationDeviceStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IrrigationDeviceStatus'], meta: { name: 'IrrigationDeviceStatus' } }
    /**
     * Find zero or one IrrigationDeviceStatus that matches the filter.
     * @param {IrrigationDeviceStatusFindUniqueArgs} args - Arguments to find a IrrigationDeviceStatus
     * @example
     * // Get one IrrigationDeviceStatus
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IrrigationDeviceStatusFindUniqueArgs>(args: SelectSubset<T, IrrigationDeviceStatusFindUniqueArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IrrigationDeviceStatus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IrrigationDeviceStatusFindUniqueOrThrowArgs} args - Arguments to find a IrrigationDeviceStatus
     * @example
     * // Get one IrrigationDeviceStatus
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IrrigationDeviceStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, IrrigationDeviceStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IrrigationDeviceStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationDeviceStatusFindFirstArgs} args - Arguments to find a IrrigationDeviceStatus
     * @example
     * // Get one IrrigationDeviceStatus
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IrrigationDeviceStatusFindFirstArgs>(args?: SelectSubset<T, IrrigationDeviceStatusFindFirstArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IrrigationDeviceStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationDeviceStatusFindFirstOrThrowArgs} args - Arguments to find a IrrigationDeviceStatus
     * @example
     * // Get one IrrigationDeviceStatus
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IrrigationDeviceStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, IrrigationDeviceStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IrrigationDeviceStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationDeviceStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IrrigationDeviceStatuses
     * const irrigationDeviceStatuses = await prisma.irrigationDeviceStatus.findMany()
     * 
     * // Get first 10 IrrigationDeviceStatuses
     * const irrigationDeviceStatuses = await prisma.irrigationDeviceStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const irrigationDeviceStatusWithIdOnly = await prisma.irrigationDeviceStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IrrigationDeviceStatusFindManyArgs>(args?: SelectSubset<T, IrrigationDeviceStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IrrigationDeviceStatus.
     * @param {IrrigationDeviceStatusCreateArgs} args - Arguments to create a IrrigationDeviceStatus.
     * @example
     * // Create one IrrigationDeviceStatus
     * const IrrigationDeviceStatus = await prisma.irrigationDeviceStatus.create({
     *   data: {
     *     // ... data to create a IrrigationDeviceStatus
     *   }
     * })
     * 
     */
    create<T extends IrrigationDeviceStatusCreateArgs>(args: SelectSubset<T, IrrigationDeviceStatusCreateArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IrrigationDeviceStatuses.
     * @param {IrrigationDeviceStatusCreateManyArgs} args - Arguments to create many IrrigationDeviceStatuses.
     * @example
     * // Create many IrrigationDeviceStatuses
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IrrigationDeviceStatusCreateManyArgs>(args?: SelectSubset<T, IrrigationDeviceStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IrrigationDeviceStatuses and returns the data saved in the database.
     * @param {IrrigationDeviceStatusCreateManyAndReturnArgs} args - Arguments to create many IrrigationDeviceStatuses.
     * @example
     * // Create many IrrigationDeviceStatuses
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IrrigationDeviceStatuses and only return the `id`
     * const irrigationDeviceStatusWithIdOnly = await prisma.irrigationDeviceStatus.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IrrigationDeviceStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, IrrigationDeviceStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IrrigationDeviceStatus.
     * @param {IrrigationDeviceStatusDeleteArgs} args - Arguments to delete one IrrigationDeviceStatus.
     * @example
     * // Delete one IrrigationDeviceStatus
     * const IrrigationDeviceStatus = await prisma.irrigationDeviceStatus.delete({
     *   where: {
     *     // ... filter to delete one IrrigationDeviceStatus
     *   }
     * })
     * 
     */
    delete<T extends IrrigationDeviceStatusDeleteArgs>(args: SelectSubset<T, IrrigationDeviceStatusDeleteArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IrrigationDeviceStatus.
     * @param {IrrigationDeviceStatusUpdateArgs} args - Arguments to update one IrrigationDeviceStatus.
     * @example
     * // Update one IrrigationDeviceStatus
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IrrigationDeviceStatusUpdateArgs>(args: SelectSubset<T, IrrigationDeviceStatusUpdateArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IrrigationDeviceStatuses.
     * @param {IrrigationDeviceStatusDeleteManyArgs} args - Arguments to filter IrrigationDeviceStatuses to delete.
     * @example
     * // Delete a few IrrigationDeviceStatuses
     * const { count } = await prisma.irrigationDeviceStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IrrigationDeviceStatusDeleteManyArgs>(args?: SelectSubset<T, IrrigationDeviceStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IrrigationDeviceStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationDeviceStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IrrigationDeviceStatuses
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IrrigationDeviceStatusUpdateManyArgs>(args: SelectSubset<T, IrrigationDeviceStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IrrigationDeviceStatus.
     * @param {IrrigationDeviceStatusUpsertArgs} args - Arguments to update or create a IrrigationDeviceStatus.
     * @example
     * // Update or create a IrrigationDeviceStatus
     * const irrigationDeviceStatus = await prisma.irrigationDeviceStatus.upsert({
     *   create: {
     *     // ... data to create a IrrigationDeviceStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IrrigationDeviceStatus we want to update
     *   }
     * })
     */
    upsert<T extends IrrigationDeviceStatusUpsertArgs>(args: SelectSubset<T, IrrigationDeviceStatusUpsertArgs<ExtArgs>>): Prisma__IrrigationDeviceStatusClient<$Result.GetResult<Prisma.$IrrigationDeviceStatusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IrrigationDeviceStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationDeviceStatusCountArgs} args - Arguments to filter IrrigationDeviceStatuses to count.
     * @example
     * // Count the number of IrrigationDeviceStatuses
     * const count = await prisma.irrigationDeviceStatus.count({
     *   where: {
     *     // ... the filter for the IrrigationDeviceStatuses we want to count
     *   }
     * })
    **/
    count<T extends IrrigationDeviceStatusCountArgs>(
      args?: Subset<T, IrrigationDeviceStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IrrigationDeviceStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IrrigationDeviceStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationDeviceStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IrrigationDeviceStatusAggregateArgs>(args: Subset<T, IrrigationDeviceStatusAggregateArgs>): Prisma.PrismaPromise<GetIrrigationDeviceStatusAggregateType<T>>

    /**
     * Group by IrrigationDeviceStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationDeviceStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IrrigationDeviceStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IrrigationDeviceStatusGroupByArgs['orderBy'] }
        : { orderBy?: IrrigationDeviceStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IrrigationDeviceStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIrrigationDeviceStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IrrigationDeviceStatus model
   */
  readonly fields: IrrigationDeviceStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IrrigationDeviceStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IrrigationDeviceStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IrrigationDeviceStatus model
   */ 
  interface IrrigationDeviceStatusFieldRefs {
    readonly id: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly device_id: FieldRef<"IrrigationDeviceStatus", 'String'>
    readonly farm_id: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly section_number: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly uptime: FieldRef<"IrrigationDeviceStatus", 'BigInt'>
    readonly wifi: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly mqtt: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly last_error: FieldRef<"IrrigationDeviceStatus", 'String'>
    readonly valve_on: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly mode: FieldRef<"IrrigationDeviceStatus", 'String'>
    readonly latest_moisture: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly min_threshold: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly max_threshold: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly pulse_count: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly water_ml: FieldRef<"IrrigationDeviceStatus", 'Int'>
    readonly timestamp: FieldRef<"IrrigationDeviceStatus", 'DateTime'>
    readonly createdAt: FieldRef<"IrrigationDeviceStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IrrigationDeviceStatus findUnique
   */
  export type IrrigationDeviceStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationDeviceStatus to fetch.
     */
    where: IrrigationDeviceStatusWhereUniqueInput
  }

  /**
   * IrrigationDeviceStatus findUniqueOrThrow
   */
  export type IrrigationDeviceStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationDeviceStatus to fetch.
     */
    where: IrrigationDeviceStatusWhereUniqueInput
  }

  /**
   * IrrigationDeviceStatus findFirst
   */
  export type IrrigationDeviceStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationDeviceStatus to fetch.
     */
    where?: IrrigationDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationDeviceStatuses to fetch.
     */
    orderBy?: IrrigationDeviceStatusOrderByWithRelationInput | IrrigationDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationDeviceStatuses.
     */
    cursor?: IrrigationDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationDeviceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationDeviceStatuses.
     */
    distinct?: IrrigationDeviceStatusScalarFieldEnum | IrrigationDeviceStatusScalarFieldEnum[]
  }

  /**
   * IrrigationDeviceStatus findFirstOrThrow
   */
  export type IrrigationDeviceStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationDeviceStatus to fetch.
     */
    where?: IrrigationDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationDeviceStatuses to fetch.
     */
    orderBy?: IrrigationDeviceStatusOrderByWithRelationInput | IrrigationDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationDeviceStatuses.
     */
    cursor?: IrrigationDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationDeviceStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationDeviceStatuses.
     */
    distinct?: IrrigationDeviceStatusScalarFieldEnum | IrrigationDeviceStatusScalarFieldEnum[]
  }

  /**
   * IrrigationDeviceStatus findMany
   */
  export type IrrigationDeviceStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationDeviceStatuses to fetch.
     */
    where?: IrrigationDeviceStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationDeviceStatuses to fetch.
     */
    orderBy?: IrrigationDeviceStatusOrderByWithRelationInput | IrrigationDeviceStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IrrigationDeviceStatuses.
     */
    cursor?: IrrigationDeviceStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationDeviceStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationDeviceStatuses.
     */
    skip?: number
    distinct?: IrrigationDeviceStatusScalarFieldEnum | IrrigationDeviceStatusScalarFieldEnum[]
  }

  /**
   * IrrigationDeviceStatus create
   */
  export type IrrigationDeviceStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a IrrigationDeviceStatus.
     */
    data: XOR<IrrigationDeviceStatusCreateInput, IrrigationDeviceStatusUncheckedCreateInput>
  }

  /**
   * IrrigationDeviceStatus createMany
   */
  export type IrrigationDeviceStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IrrigationDeviceStatuses.
     */
    data: IrrigationDeviceStatusCreateManyInput | IrrigationDeviceStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IrrigationDeviceStatus createManyAndReturn
   */
  export type IrrigationDeviceStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IrrigationDeviceStatuses.
     */
    data: IrrigationDeviceStatusCreateManyInput | IrrigationDeviceStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IrrigationDeviceStatus update
   */
  export type IrrigationDeviceStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a IrrigationDeviceStatus.
     */
    data: XOR<IrrigationDeviceStatusUpdateInput, IrrigationDeviceStatusUncheckedUpdateInput>
    /**
     * Choose, which IrrigationDeviceStatus to update.
     */
    where: IrrigationDeviceStatusWhereUniqueInput
  }

  /**
   * IrrigationDeviceStatus updateMany
   */
  export type IrrigationDeviceStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IrrigationDeviceStatuses.
     */
    data: XOR<IrrigationDeviceStatusUpdateManyMutationInput, IrrigationDeviceStatusUncheckedUpdateManyInput>
    /**
     * Filter which IrrigationDeviceStatuses to update
     */
    where?: IrrigationDeviceStatusWhereInput
  }

  /**
   * IrrigationDeviceStatus upsert
   */
  export type IrrigationDeviceStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the IrrigationDeviceStatus to update in case it exists.
     */
    where: IrrigationDeviceStatusWhereUniqueInput
    /**
     * In case the IrrigationDeviceStatus found by the `where` argument doesn't exist, create a new IrrigationDeviceStatus with this data.
     */
    create: XOR<IrrigationDeviceStatusCreateInput, IrrigationDeviceStatusUncheckedCreateInput>
    /**
     * In case the IrrigationDeviceStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IrrigationDeviceStatusUpdateInput, IrrigationDeviceStatusUncheckedUpdateInput>
  }

  /**
   * IrrigationDeviceStatus delete
   */
  export type IrrigationDeviceStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
    /**
     * Filter which IrrigationDeviceStatus to delete.
     */
    where: IrrigationDeviceStatusWhereUniqueInput
  }

  /**
   * IrrigationDeviceStatus deleteMany
   */
  export type IrrigationDeviceStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationDeviceStatuses to delete
     */
    where?: IrrigationDeviceStatusWhereInput
  }

  /**
   * IrrigationDeviceStatus without action
   */
  export type IrrigationDeviceStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationDeviceStatus
     */
    select?: IrrigationDeviceStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationDeviceStatusInclude<ExtArgs> | null
  }


  /**
   * Model DeviceAck
   */

  export type AggregateDeviceAck = {
    _count: DeviceAckCountAggregateOutputType | null
    _avg: DeviceAckAvgAggregateOutputType | null
    _sum: DeviceAckSumAggregateOutputType | null
    _min: DeviceAckMinAggregateOutputType | null
    _max: DeviceAckMaxAggregateOutputType | null
  }

  export type DeviceAckAvgAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
  }

  export type DeviceAckSumAggregateOutputType = {
    id: number | null
    farm_id: number | null
    section_number: number | null
  }

  export type DeviceAckMinAggregateOutputType = {
    id: number | null
    device_id: string | null
    farm_id: number | null
    section_number: number | null
    timestamp: Date | null
  }

  export type DeviceAckMaxAggregateOutputType = {
    id: number | null
    device_id: string | null
    farm_id: number | null
    section_number: number | null
    timestamp: Date | null
  }

  export type DeviceAckCountAggregateOutputType = {
    id: number
    device_id: number
    farm_id: number
    section_number: number
    ack_json: number
    timestamp: number
    _all: number
  }


  export type DeviceAckAvgAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
  }

  export type DeviceAckSumAggregateInputType = {
    id?: true
    farm_id?: true
    section_number?: true
  }

  export type DeviceAckMinAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    timestamp?: true
  }

  export type DeviceAckMaxAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    timestamp?: true
  }

  export type DeviceAckCountAggregateInputType = {
    id?: true
    device_id?: true
    farm_id?: true
    section_number?: true
    ack_json?: true
    timestamp?: true
    _all?: true
  }

  export type DeviceAckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceAck to aggregate.
     */
    where?: DeviceAckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceAcks to fetch.
     */
    orderBy?: DeviceAckOrderByWithRelationInput | DeviceAckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceAckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceAcks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceAcks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceAcks
    **/
    _count?: true | DeviceAckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceAckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceAckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceAckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceAckMaxAggregateInputType
  }

  export type GetDeviceAckAggregateType<T extends DeviceAckAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceAck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceAck[P]>
      : GetScalarType<T[P], AggregateDeviceAck[P]>
  }




  export type DeviceAckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceAckWhereInput
    orderBy?: DeviceAckOrderByWithAggregationInput | DeviceAckOrderByWithAggregationInput[]
    by: DeviceAckScalarFieldEnum[] | DeviceAckScalarFieldEnum
    having?: DeviceAckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceAckCountAggregateInputType | true
    _avg?: DeviceAckAvgAggregateInputType
    _sum?: DeviceAckSumAggregateInputType
    _min?: DeviceAckMinAggregateInputType
    _max?: DeviceAckMaxAggregateInputType
  }

  export type DeviceAckGroupByOutputType = {
    id: number
    device_id: string | null
    farm_id: number
    section_number: number
    ack_json: JsonValue
    timestamp: Date
    _count: DeviceAckCountAggregateOutputType | null
    _avg: DeviceAckAvgAggregateOutputType | null
    _sum: DeviceAckSumAggregateOutputType | null
    _min: DeviceAckMinAggregateOutputType | null
    _max: DeviceAckMaxAggregateOutputType | null
  }

  type GetDeviceAckGroupByPayload<T extends DeviceAckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceAckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceAckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceAckGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceAckGroupByOutputType[P]>
        }
      >
    >


  export type DeviceAckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    ack_json?: boolean
    timestamp?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceAck"]>

  export type DeviceAckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    ack_json?: boolean
    timestamp?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceAck"]>

  export type DeviceAckSelectScalar = {
    id?: boolean
    device_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    ack_json?: boolean
    timestamp?: boolean
  }

  export type DeviceAckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type DeviceAckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $DeviceAckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeviceAck"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      device_id: string | null
      farm_id: number
      section_number: number
      ack_json: Prisma.JsonValue
      timestamp: Date
    }, ExtArgs["result"]["deviceAck"]>
    composites: {}
  }

  type DeviceAckGetPayload<S extends boolean | null | undefined | DeviceAckDefaultArgs> = $Result.GetResult<Prisma.$DeviceAckPayload, S>

  type DeviceAckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeviceAckFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeviceAckCountAggregateInputType | true
    }

  export interface DeviceAckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeviceAck'], meta: { name: 'DeviceAck' } }
    /**
     * Find zero or one DeviceAck that matches the filter.
     * @param {DeviceAckFindUniqueArgs} args - Arguments to find a DeviceAck
     * @example
     * // Get one DeviceAck
     * const deviceAck = await prisma.deviceAck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceAckFindUniqueArgs>(args: SelectSubset<T, DeviceAckFindUniqueArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DeviceAck that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DeviceAckFindUniqueOrThrowArgs} args - Arguments to find a DeviceAck
     * @example
     * // Get one DeviceAck
     * const deviceAck = await prisma.deviceAck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceAckFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceAckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DeviceAck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAckFindFirstArgs} args - Arguments to find a DeviceAck
     * @example
     * // Get one DeviceAck
     * const deviceAck = await prisma.deviceAck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceAckFindFirstArgs>(args?: SelectSubset<T, DeviceAckFindFirstArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DeviceAck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAckFindFirstOrThrowArgs} args - Arguments to find a DeviceAck
     * @example
     * // Get one DeviceAck
     * const deviceAck = await prisma.deviceAck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceAckFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceAckFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DeviceAcks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceAcks
     * const deviceAcks = await prisma.deviceAck.findMany()
     * 
     * // Get first 10 DeviceAcks
     * const deviceAcks = await prisma.deviceAck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceAckWithIdOnly = await prisma.deviceAck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceAckFindManyArgs>(args?: SelectSubset<T, DeviceAckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DeviceAck.
     * @param {DeviceAckCreateArgs} args - Arguments to create a DeviceAck.
     * @example
     * // Create one DeviceAck
     * const DeviceAck = await prisma.deviceAck.create({
     *   data: {
     *     // ... data to create a DeviceAck
     *   }
     * })
     * 
     */
    create<T extends DeviceAckCreateArgs>(args: SelectSubset<T, DeviceAckCreateArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DeviceAcks.
     * @param {DeviceAckCreateManyArgs} args - Arguments to create many DeviceAcks.
     * @example
     * // Create many DeviceAcks
     * const deviceAck = await prisma.deviceAck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceAckCreateManyArgs>(args?: SelectSubset<T, DeviceAckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeviceAcks and returns the data saved in the database.
     * @param {DeviceAckCreateManyAndReturnArgs} args - Arguments to create many DeviceAcks.
     * @example
     * // Create many DeviceAcks
     * const deviceAck = await prisma.deviceAck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeviceAcks and only return the `id`
     * const deviceAckWithIdOnly = await prisma.deviceAck.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceAckCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceAckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DeviceAck.
     * @param {DeviceAckDeleteArgs} args - Arguments to delete one DeviceAck.
     * @example
     * // Delete one DeviceAck
     * const DeviceAck = await prisma.deviceAck.delete({
     *   where: {
     *     // ... filter to delete one DeviceAck
     *   }
     * })
     * 
     */
    delete<T extends DeviceAckDeleteArgs>(args: SelectSubset<T, DeviceAckDeleteArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DeviceAck.
     * @param {DeviceAckUpdateArgs} args - Arguments to update one DeviceAck.
     * @example
     * // Update one DeviceAck
     * const deviceAck = await prisma.deviceAck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceAckUpdateArgs>(args: SelectSubset<T, DeviceAckUpdateArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DeviceAcks.
     * @param {DeviceAckDeleteManyArgs} args - Arguments to filter DeviceAcks to delete.
     * @example
     * // Delete a few DeviceAcks
     * const { count } = await prisma.deviceAck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceAckDeleteManyArgs>(args?: SelectSubset<T, DeviceAckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceAcks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceAcks
     * const deviceAck = await prisma.deviceAck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceAckUpdateManyArgs>(args: SelectSubset<T, DeviceAckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeviceAck.
     * @param {DeviceAckUpsertArgs} args - Arguments to update or create a DeviceAck.
     * @example
     * // Update or create a DeviceAck
     * const deviceAck = await prisma.deviceAck.upsert({
     *   create: {
     *     // ... data to create a DeviceAck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceAck we want to update
     *   }
     * })
     */
    upsert<T extends DeviceAckUpsertArgs>(args: SelectSubset<T, DeviceAckUpsertArgs<ExtArgs>>): Prisma__DeviceAckClient<$Result.GetResult<Prisma.$DeviceAckPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DeviceAcks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAckCountArgs} args - Arguments to filter DeviceAcks to count.
     * @example
     * // Count the number of DeviceAcks
     * const count = await prisma.deviceAck.count({
     *   where: {
     *     // ... the filter for the DeviceAcks we want to count
     *   }
     * })
    **/
    count<T extends DeviceAckCountArgs>(
      args?: Subset<T, DeviceAckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceAckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceAck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeviceAckAggregateArgs>(args: Subset<T, DeviceAckAggregateArgs>): Prisma.PrismaPromise<GetDeviceAckAggregateType<T>>

    /**
     * Group by DeviceAck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeviceAckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceAckGroupByArgs['orderBy'] }
        : { orderBy?: DeviceAckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeviceAckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceAckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeviceAck model
   */
  readonly fields: DeviceAckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceAck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceAckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeviceAck model
   */ 
  interface DeviceAckFieldRefs {
    readonly id: FieldRef<"DeviceAck", 'Int'>
    readonly device_id: FieldRef<"DeviceAck", 'String'>
    readonly farm_id: FieldRef<"DeviceAck", 'Int'>
    readonly section_number: FieldRef<"DeviceAck", 'Int'>
    readonly ack_json: FieldRef<"DeviceAck", 'Json'>
    readonly timestamp: FieldRef<"DeviceAck", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeviceAck findUnique
   */
  export type DeviceAckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * Filter, which DeviceAck to fetch.
     */
    where: DeviceAckWhereUniqueInput
  }

  /**
   * DeviceAck findUniqueOrThrow
   */
  export type DeviceAckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * Filter, which DeviceAck to fetch.
     */
    where: DeviceAckWhereUniqueInput
  }

  /**
   * DeviceAck findFirst
   */
  export type DeviceAckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * Filter, which DeviceAck to fetch.
     */
    where?: DeviceAckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceAcks to fetch.
     */
    orderBy?: DeviceAckOrderByWithRelationInput | DeviceAckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceAcks.
     */
    cursor?: DeviceAckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceAcks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceAcks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceAcks.
     */
    distinct?: DeviceAckScalarFieldEnum | DeviceAckScalarFieldEnum[]
  }

  /**
   * DeviceAck findFirstOrThrow
   */
  export type DeviceAckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * Filter, which DeviceAck to fetch.
     */
    where?: DeviceAckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceAcks to fetch.
     */
    orderBy?: DeviceAckOrderByWithRelationInput | DeviceAckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceAcks.
     */
    cursor?: DeviceAckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceAcks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceAcks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceAcks.
     */
    distinct?: DeviceAckScalarFieldEnum | DeviceAckScalarFieldEnum[]
  }

  /**
   * DeviceAck findMany
   */
  export type DeviceAckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * Filter, which DeviceAcks to fetch.
     */
    where?: DeviceAckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceAcks to fetch.
     */
    orderBy?: DeviceAckOrderByWithRelationInput | DeviceAckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceAcks.
     */
    cursor?: DeviceAckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceAcks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceAcks.
     */
    skip?: number
    distinct?: DeviceAckScalarFieldEnum | DeviceAckScalarFieldEnum[]
  }

  /**
   * DeviceAck create
   */
  export type DeviceAckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * The data needed to create a DeviceAck.
     */
    data: XOR<DeviceAckCreateInput, DeviceAckUncheckedCreateInput>
  }

  /**
   * DeviceAck createMany
   */
  export type DeviceAckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeviceAcks.
     */
    data: DeviceAckCreateManyInput | DeviceAckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeviceAck createManyAndReturn
   */
  export type DeviceAckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DeviceAcks.
     */
    data: DeviceAckCreateManyInput | DeviceAckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeviceAck update
   */
  export type DeviceAckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * The data needed to update a DeviceAck.
     */
    data: XOR<DeviceAckUpdateInput, DeviceAckUncheckedUpdateInput>
    /**
     * Choose, which DeviceAck to update.
     */
    where: DeviceAckWhereUniqueInput
  }

  /**
   * DeviceAck updateMany
   */
  export type DeviceAckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceAcks.
     */
    data: XOR<DeviceAckUpdateManyMutationInput, DeviceAckUncheckedUpdateManyInput>
    /**
     * Filter which DeviceAcks to update
     */
    where?: DeviceAckWhereInput
  }

  /**
   * DeviceAck upsert
   */
  export type DeviceAckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * The filter to search for the DeviceAck to update in case it exists.
     */
    where: DeviceAckWhereUniqueInput
    /**
     * In case the DeviceAck found by the `where` argument doesn't exist, create a new DeviceAck with this data.
     */
    create: XOR<DeviceAckCreateInput, DeviceAckUncheckedCreateInput>
    /**
     * In case the DeviceAck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceAckUpdateInput, DeviceAckUncheckedUpdateInput>
  }

  /**
   * DeviceAck delete
   */
  export type DeviceAckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
    /**
     * Filter which DeviceAck to delete.
     */
    where: DeviceAckWhereUniqueInput
  }

  /**
   * DeviceAck deleteMany
   */
  export type DeviceAckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceAcks to delete
     */
    where?: DeviceAckWhereInput
  }

  /**
   * DeviceAck without action
   */
  export type DeviceAckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceAck
     */
    select?: DeviceAckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceAckInclude<ExtArgs> | null
  }


  /**
   * Model IrrigationSchedule
   */

  export type AggregateIrrigationSchedule = {
    _count: IrrigationScheduleCountAggregateOutputType | null
    _avg: IrrigationScheduleAvgAggregateOutputType | null
    _sum: IrrigationScheduleSumAggregateOutputType | null
    _min: IrrigationScheduleMinAggregateOutputType | null
    _max: IrrigationScheduleMaxAggregateOutputType | null
  }

  export type IrrigationScheduleAvgAggregateOutputType = {
    farm_id: number | null
    section_numbers: number | null
    duration_minutes: number | null
    days_of_week: number | null
    day_of_month: number | null
    min_temperature: number | null
    max_temperature: number | null
    min_moisture: number | null
  }

  export type IrrigationScheduleSumAggregateOutputType = {
    farm_id: number | null
    section_numbers: number[]
    duration_minutes: number | null
    days_of_week: number[]
    day_of_month: number | null
    min_temperature: number | null
    max_temperature: number | null
    min_moisture: number | null
  }

  export type IrrigationScheduleMinAggregateOutputType = {
    id: string | null
    name: string | null
    farm_id: number | null
    start_time: string | null
    duration_minutes: number | null
    frequency: string | null
    day_of_month: number | null
    is_active: boolean | null
    weather_dependent: boolean | null
    min_temperature: number | null
    max_temperature: number | null
    min_moisture: number | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IrrigationScheduleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    farm_id: number | null
    start_time: string | null
    duration_minutes: number | null
    frequency: string | null
    day_of_month: number | null
    is_active: boolean | null
    weather_dependent: boolean | null
    min_temperature: number | null
    max_temperature: number | null
    min_moisture: number | null
    created_by: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type IrrigationScheduleCountAggregateOutputType = {
    id: number
    name: number
    farm_id: number
    section_numbers: number
    start_time: number
    duration_minutes: number
    frequency: number
    days_of_week: number
    day_of_month: number
    is_active: number
    weather_dependent: number
    min_temperature: number
    max_temperature: number
    min_moisture: number
    created_by: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type IrrigationScheduleAvgAggregateInputType = {
    farm_id?: true
    section_numbers?: true
    duration_minutes?: true
    days_of_week?: true
    day_of_month?: true
    min_temperature?: true
    max_temperature?: true
    min_moisture?: true
  }

  export type IrrigationScheduleSumAggregateInputType = {
    farm_id?: true
    section_numbers?: true
    duration_minutes?: true
    days_of_week?: true
    day_of_month?: true
    min_temperature?: true
    max_temperature?: true
    min_moisture?: true
  }

  export type IrrigationScheduleMinAggregateInputType = {
    id?: true
    name?: true
    farm_id?: true
    start_time?: true
    duration_minutes?: true
    frequency?: true
    day_of_month?: true
    is_active?: true
    weather_dependent?: true
    min_temperature?: true
    max_temperature?: true
    min_moisture?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type IrrigationScheduleMaxAggregateInputType = {
    id?: true
    name?: true
    farm_id?: true
    start_time?: true
    duration_minutes?: true
    frequency?: true
    day_of_month?: true
    is_active?: true
    weather_dependent?: true
    min_temperature?: true
    max_temperature?: true
    min_moisture?: true
    created_by?: true
    created_at?: true
    updated_at?: true
  }

  export type IrrigationScheduleCountAggregateInputType = {
    id?: true
    name?: true
    farm_id?: true
    section_numbers?: true
    start_time?: true
    duration_minutes?: true
    frequency?: true
    days_of_week?: true
    day_of_month?: true
    is_active?: true
    weather_dependent?: true
    min_temperature?: true
    max_temperature?: true
    min_moisture?: true
    created_by?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type IrrigationScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationSchedule to aggregate.
     */
    where?: IrrigationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationSchedules to fetch.
     */
    orderBy?: IrrigationScheduleOrderByWithRelationInput | IrrigationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IrrigationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IrrigationSchedules
    **/
    _count?: true | IrrigationScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IrrigationScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IrrigationScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IrrigationScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IrrigationScheduleMaxAggregateInputType
  }

  export type GetIrrigationScheduleAggregateType<T extends IrrigationScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateIrrigationSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIrrigationSchedule[P]>
      : GetScalarType<T[P], AggregateIrrigationSchedule[P]>
  }




  export type IrrigationScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IrrigationScheduleWhereInput
    orderBy?: IrrigationScheduleOrderByWithAggregationInput | IrrigationScheduleOrderByWithAggregationInput[]
    by: IrrigationScheduleScalarFieldEnum[] | IrrigationScheduleScalarFieldEnum
    having?: IrrigationScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IrrigationScheduleCountAggregateInputType | true
    _avg?: IrrigationScheduleAvgAggregateInputType
    _sum?: IrrigationScheduleSumAggregateInputType
    _min?: IrrigationScheduleMinAggregateInputType
    _max?: IrrigationScheduleMaxAggregateInputType
  }

  export type IrrigationScheduleGroupByOutputType = {
    id: string
    name: string
    farm_id: number
    section_numbers: number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week: number[]
    day_of_month: number | null
    is_active: boolean
    weather_dependent: boolean
    min_temperature: number | null
    max_temperature: number | null
    min_moisture: number | null
    created_by: string
    created_at: Date
    updated_at: Date
    _count: IrrigationScheduleCountAggregateOutputType | null
    _avg: IrrigationScheduleAvgAggregateOutputType | null
    _sum: IrrigationScheduleSumAggregateOutputType | null
    _min: IrrigationScheduleMinAggregateOutputType | null
    _max: IrrigationScheduleMaxAggregateOutputType | null
  }

  type GetIrrigationScheduleGroupByPayload<T extends IrrigationScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IrrigationScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IrrigationScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IrrigationScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], IrrigationScheduleGroupByOutputType[P]>
        }
      >
    >


  export type IrrigationScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    farm_id?: boolean
    section_numbers?: boolean
    start_time?: boolean
    duration_minutes?: boolean
    frequency?: boolean
    days_of_week?: boolean
    day_of_month?: boolean
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: boolean
    max_temperature?: boolean
    min_moisture?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    scheduledIrrigations?: boolean | IrrigationSchedule$scheduledIrrigationsArgs<ExtArgs>
    _count?: boolean | IrrigationScheduleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationSchedule"]>

  export type IrrigationScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    farm_id?: boolean
    section_numbers?: boolean
    start_time?: boolean
    duration_minutes?: boolean
    frequency?: boolean
    days_of_week?: boolean
    day_of_month?: boolean
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: boolean
    max_temperature?: boolean
    min_moisture?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["irrigationSchedule"]>

  export type IrrigationScheduleSelectScalar = {
    id?: boolean
    name?: boolean
    farm_id?: boolean
    section_numbers?: boolean
    start_time?: boolean
    duration_minutes?: boolean
    frequency?: boolean
    days_of_week?: boolean
    day_of_month?: boolean
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: boolean
    max_temperature?: boolean
    min_moisture?: boolean
    created_by?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type IrrigationScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    scheduledIrrigations?: boolean | IrrigationSchedule$scheduledIrrigationsArgs<ExtArgs>
    _count?: boolean | IrrigationScheduleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IrrigationScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $IrrigationSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IrrigationSchedule"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      scheduledIrrigations: Prisma.$ScheduledIrrigationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      farm_id: number
      section_numbers: number[]
      start_time: string
      duration_minutes: number
      frequency: string
      days_of_week: number[]
      day_of_month: number | null
      is_active: boolean
      weather_dependent: boolean
      min_temperature: number | null
      max_temperature: number | null
      min_moisture: number | null
      created_by: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["irrigationSchedule"]>
    composites: {}
  }

  type IrrigationScheduleGetPayload<S extends boolean | null | undefined | IrrigationScheduleDefaultArgs> = $Result.GetResult<Prisma.$IrrigationSchedulePayload, S>

  type IrrigationScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IrrigationScheduleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IrrigationScheduleCountAggregateInputType | true
    }

  export interface IrrigationScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IrrigationSchedule'], meta: { name: 'IrrigationSchedule' } }
    /**
     * Find zero or one IrrigationSchedule that matches the filter.
     * @param {IrrigationScheduleFindUniqueArgs} args - Arguments to find a IrrigationSchedule
     * @example
     * // Get one IrrigationSchedule
     * const irrigationSchedule = await prisma.irrigationSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IrrigationScheduleFindUniqueArgs>(args: SelectSubset<T, IrrigationScheduleFindUniqueArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IrrigationSchedule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IrrigationScheduleFindUniqueOrThrowArgs} args - Arguments to find a IrrigationSchedule
     * @example
     * // Get one IrrigationSchedule
     * const irrigationSchedule = await prisma.irrigationSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IrrigationScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, IrrigationScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IrrigationSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationScheduleFindFirstArgs} args - Arguments to find a IrrigationSchedule
     * @example
     * // Get one IrrigationSchedule
     * const irrigationSchedule = await prisma.irrigationSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IrrigationScheduleFindFirstArgs>(args?: SelectSubset<T, IrrigationScheduleFindFirstArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IrrigationSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationScheduleFindFirstOrThrowArgs} args - Arguments to find a IrrigationSchedule
     * @example
     * // Get one IrrigationSchedule
     * const irrigationSchedule = await prisma.irrigationSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IrrigationScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, IrrigationScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IrrigationSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IrrigationSchedules
     * const irrigationSchedules = await prisma.irrigationSchedule.findMany()
     * 
     * // Get first 10 IrrigationSchedules
     * const irrigationSchedules = await prisma.irrigationSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const irrigationScheduleWithIdOnly = await prisma.irrigationSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IrrigationScheduleFindManyArgs>(args?: SelectSubset<T, IrrigationScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IrrigationSchedule.
     * @param {IrrigationScheduleCreateArgs} args - Arguments to create a IrrigationSchedule.
     * @example
     * // Create one IrrigationSchedule
     * const IrrigationSchedule = await prisma.irrigationSchedule.create({
     *   data: {
     *     // ... data to create a IrrigationSchedule
     *   }
     * })
     * 
     */
    create<T extends IrrigationScheduleCreateArgs>(args: SelectSubset<T, IrrigationScheduleCreateArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IrrigationSchedules.
     * @param {IrrigationScheduleCreateManyArgs} args - Arguments to create many IrrigationSchedules.
     * @example
     * // Create many IrrigationSchedules
     * const irrigationSchedule = await prisma.irrigationSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IrrigationScheduleCreateManyArgs>(args?: SelectSubset<T, IrrigationScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IrrigationSchedules and returns the data saved in the database.
     * @param {IrrigationScheduleCreateManyAndReturnArgs} args - Arguments to create many IrrigationSchedules.
     * @example
     * // Create many IrrigationSchedules
     * const irrigationSchedule = await prisma.irrigationSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IrrigationSchedules and only return the `id`
     * const irrigationScheduleWithIdOnly = await prisma.irrigationSchedule.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IrrigationScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, IrrigationScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IrrigationSchedule.
     * @param {IrrigationScheduleDeleteArgs} args - Arguments to delete one IrrigationSchedule.
     * @example
     * // Delete one IrrigationSchedule
     * const IrrigationSchedule = await prisma.irrigationSchedule.delete({
     *   where: {
     *     // ... filter to delete one IrrigationSchedule
     *   }
     * })
     * 
     */
    delete<T extends IrrigationScheduleDeleteArgs>(args: SelectSubset<T, IrrigationScheduleDeleteArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IrrigationSchedule.
     * @param {IrrigationScheduleUpdateArgs} args - Arguments to update one IrrigationSchedule.
     * @example
     * // Update one IrrigationSchedule
     * const irrigationSchedule = await prisma.irrigationSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IrrigationScheduleUpdateArgs>(args: SelectSubset<T, IrrigationScheduleUpdateArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IrrigationSchedules.
     * @param {IrrigationScheduleDeleteManyArgs} args - Arguments to filter IrrigationSchedules to delete.
     * @example
     * // Delete a few IrrigationSchedules
     * const { count } = await prisma.irrigationSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IrrigationScheduleDeleteManyArgs>(args?: SelectSubset<T, IrrigationScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IrrigationSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IrrigationSchedules
     * const irrigationSchedule = await prisma.irrigationSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IrrigationScheduleUpdateManyArgs>(args: SelectSubset<T, IrrigationScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IrrigationSchedule.
     * @param {IrrigationScheduleUpsertArgs} args - Arguments to update or create a IrrigationSchedule.
     * @example
     * // Update or create a IrrigationSchedule
     * const irrigationSchedule = await prisma.irrigationSchedule.upsert({
     *   create: {
     *     // ... data to create a IrrigationSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IrrigationSchedule we want to update
     *   }
     * })
     */
    upsert<T extends IrrigationScheduleUpsertArgs>(args: SelectSubset<T, IrrigationScheduleUpsertArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IrrigationSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationScheduleCountArgs} args - Arguments to filter IrrigationSchedules to count.
     * @example
     * // Count the number of IrrigationSchedules
     * const count = await prisma.irrigationSchedule.count({
     *   where: {
     *     // ... the filter for the IrrigationSchedules we want to count
     *   }
     * })
    **/
    count<T extends IrrigationScheduleCountArgs>(
      args?: Subset<T, IrrigationScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IrrigationScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IrrigationSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IrrigationScheduleAggregateArgs>(args: Subset<T, IrrigationScheduleAggregateArgs>): Prisma.PrismaPromise<GetIrrigationScheduleAggregateType<T>>

    /**
     * Group by IrrigationSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IrrigationScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IrrigationScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IrrigationScheduleGroupByArgs['orderBy'] }
        : { orderBy?: IrrigationScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IrrigationScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIrrigationScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IrrigationSchedule model
   */
  readonly fields: IrrigationScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IrrigationSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IrrigationScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    scheduledIrrigations<T extends IrrigationSchedule$scheduledIrrigationsArgs<ExtArgs> = {}>(args?: Subset<T, IrrigationSchedule$scheduledIrrigationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IrrigationSchedule model
   */ 
  interface IrrigationScheduleFieldRefs {
    readonly id: FieldRef<"IrrigationSchedule", 'String'>
    readonly name: FieldRef<"IrrigationSchedule", 'String'>
    readonly farm_id: FieldRef<"IrrigationSchedule", 'Int'>
    readonly section_numbers: FieldRef<"IrrigationSchedule", 'Int[]'>
    readonly start_time: FieldRef<"IrrigationSchedule", 'String'>
    readonly duration_minutes: FieldRef<"IrrigationSchedule", 'Int'>
    readonly frequency: FieldRef<"IrrigationSchedule", 'String'>
    readonly days_of_week: FieldRef<"IrrigationSchedule", 'Int[]'>
    readonly day_of_month: FieldRef<"IrrigationSchedule", 'Int'>
    readonly is_active: FieldRef<"IrrigationSchedule", 'Boolean'>
    readonly weather_dependent: FieldRef<"IrrigationSchedule", 'Boolean'>
    readonly min_temperature: FieldRef<"IrrigationSchedule", 'Float'>
    readonly max_temperature: FieldRef<"IrrigationSchedule", 'Float'>
    readonly min_moisture: FieldRef<"IrrigationSchedule", 'Int'>
    readonly created_by: FieldRef<"IrrigationSchedule", 'String'>
    readonly created_at: FieldRef<"IrrigationSchedule", 'DateTime'>
    readonly updated_at: FieldRef<"IrrigationSchedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IrrigationSchedule findUnique
   */
  export type IrrigationScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationSchedule to fetch.
     */
    where: IrrigationScheduleWhereUniqueInput
  }

  /**
   * IrrigationSchedule findUniqueOrThrow
   */
  export type IrrigationScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationSchedule to fetch.
     */
    where: IrrigationScheduleWhereUniqueInput
  }

  /**
   * IrrigationSchedule findFirst
   */
  export type IrrigationScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationSchedule to fetch.
     */
    where?: IrrigationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationSchedules to fetch.
     */
    orderBy?: IrrigationScheduleOrderByWithRelationInput | IrrigationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationSchedules.
     */
    cursor?: IrrigationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationSchedules.
     */
    distinct?: IrrigationScheduleScalarFieldEnum | IrrigationScheduleScalarFieldEnum[]
  }

  /**
   * IrrigationSchedule findFirstOrThrow
   */
  export type IrrigationScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationSchedule to fetch.
     */
    where?: IrrigationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationSchedules to fetch.
     */
    orderBy?: IrrigationScheduleOrderByWithRelationInput | IrrigationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IrrigationSchedules.
     */
    cursor?: IrrigationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IrrigationSchedules.
     */
    distinct?: IrrigationScheduleScalarFieldEnum | IrrigationScheduleScalarFieldEnum[]
  }

  /**
   * IrrigationSchedule findMany
   */
  export type IrrigationScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * Filter, which IrrigationSchedules to fetch.
     */
    where?: IrrigationScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IrrigationSchedules to fetch.
     */
    orderBy?: IrrigationScheduleOrderByWithRelationInput | IrrigationScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IrrigationSchedules.
     */
    cursor?: IrrigationScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IrrigationSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IrrigationSchedules.
     */
    skip?: number
    distinct?: IrrigationScheduleScalarFieldEnum | IrrigationScheduleScalarFieldEnum[]
  }

  /**
   * IrrigationSchedule create
   */
  export type IrrigationScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a IrrigationSchedule.
     */
    data: XOR<IrrigationScheduleCreateInput, IrrigationScheduleUncheckedCreateInput>
  }

  /**
   * IrrigationSchedule createMany
   */
  export type IrrigationScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IrrigationSchedules.
     */
    data: IrrigationScheduleCreateManyInput | IrrigationScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IrrigationSchedule createManyAndReturn
   */
  export type IrrigationScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IrrigationSchedules.
     */
    data: IrrigationScheduleCreateManyInput | IrrigationScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * IrrigationSchedule update
   */
  export type IrrigationScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a IrrigationSchedule.
     */
    data: XOR<IrrigationScheduleUpdateInput, IrrigationScheduleUncheckedUpdateInput>
    /**
     * Choose, which IrrigationSchedule to update.
     */
    where: IrrigationScheduleWhereUniqueInput
  }

  /**
   * IrrigationSchedule updateMany
   */
  export type IrrigationScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IrrigationSchedules.
     */
    data: XOR<IrrigationScheduleUpdateManyMutationInput, IrrigationScheduleUncheckedUpdateManyInput>
    /**
     * Filter which IrrigationSchedules to update
     */
    where?: IrrigationScheduleWhereInput
  }

  /**
   * IrrigationSchedule upsert
   */
  export type IrrigationScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the IrrigationSchedule to update in case it exists.
     */
    where: IrrigationScheduleWhereUniqueInput
    /**
     * In case the IrrigationSchedule found by the `where` argument doesn't exist, create a new IrrigationSchedule with this data.
     */
    create: XOR<IrrigationScheduleCreateInput, IrrigationScheduleUncheckedCreateInput>
    /**
     * In case the IrrigationSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IrrigationScheduleUpdateInput, IrrigationScheduleUncheckedUpdateInput>
  }

  /**
   * IrrigationSchedule delete
   */
  export type IrrigationScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
    /**
     * Filter which IrrigationSchedule to delete.
     */
    where: IrrigationScheduleWhereUniqueInput
  }

  /**
   * IrrigationSchedule deleteMany
   */
  export type IrrigationScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IrrigationSchedules to delete
     */
    where?: IrrigationScheduleWhereInput
  }

  /**
   * IrrigationSchedule.scheduledIrrigations
   */
  export type IrrigationSchedule$scheduledIrrigationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    where?: ScheduledIrrigationWhereInput
    orderBy?: ScheduledIrrigationOrderByWithRelationInput | ScheduledIrrigationOrderByWithRelationInput[]
    cursor?: ScheduledIrrigationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduledIrrigationScalarFieldEnum | ScheduledIrrigationScalarFieldEnum[]
  }

  /**
   * IrrigationSchedule without action
   */
  export type IrrigationScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IrrigationSchedule
     */
    select?: IrrigationScheduleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IrrigationScheduleInclude<ExtArgs> | null
  }


  /**
   * Model ScheduledIrrigation
   */

  export type AggregateScheduledIrrigation = {
    _count: ScheduledIrrigationCountAggregateOutputType | null
    _avg: ScheduledIrrigationAvgAggregateOutputType | null
    _sum: ScheduledIrrigationSumAggregateOutputType | null
    _min: ScheduledIrrigationMinAggregateOutputType | null
    _max: ScheduledIrrigationMaxAggregateOutputType | null
  }

  export type ScheduledIrrigationAvgAggregateOutputType = {
    farm_id: number | null
    section_number: number | null
    duration_minutes: number | null
    water_used: number | null
  }

  export type ScheduledIrrigationSumAggregateOutputType = {
    farm_id: number | null
    section_number: number | null
    duration_minutes: number | null
    water_used: number | null
  }

  export type ScheduledIrrigationMinAggregateOutputType = {
    id: string | null
    schedule_id: string | null
    farm_id: number | null
    section_number: number | null
    scheduled_time: Date | null
    executed_time: Date | null
    status: string | null
    skip_reason: string | null
    duration_minutes: number | null
    water_used: number | null
    created_at: Date | null
  }

  export type ScheduledIrrigationMaxAggregateOutputType = {
    id: string | null
    schedule_id: string | null
    farm_id: number | null
    section_number: number | null
    scheduled_time: Date | null
    executed_time: Date | null
    status: string | null
    skip_reason: string | null
    duration_minutes: number | null
    water_used: number | null
    created_at: Date | null
  }

  export type ScheduledIrrigationCountAggregateOutputType = {
    id: number
    schedule_id: number
    farm_id: number
    section_number: number
    scheduled_time: number
    executed_time: number
    status: number
    skip_reason: number
    duration_minutes: number
    water_used: number
    created_at: number
    _all: number
  }


  export type ScheduledIrrigationAvgAggregateInputType = {
    farm_id?: true
    section_number?: true
    duration_minutes?: true
    water_used?: true
  }

  export type ScheduledIrrigationSumAggregateInputType = {
    farm_id?: true
    section_number?: true
    duration_minutes?: true
    water_used?: true
  }

  export type ScheduledIrrigationMinAggregateInputType = {
    id?: true
    schedule_id?: true
    farm_id?: true
    section_number?: true
    scheduled_time?: true
    executed_time?: true
    status?: true
    skip_reason?: true
    duration_minutes?: true
    water_used?: true
    created_at?: true
  }

  export type ScheduledIrrigationMaxAggregateInputType = {
    id?: true
    schedule_id?: true
    farm_id?: true
    section_number?: true
    scheduled_time?: true
    executed_time?: true
    status?: true
    skip_reason?: true
    duration_minutes?: true
    water_used?: true
    created_at?: true
  }

  export type ScheduledIrrigationCountAggregateInputType = {
    id?: true
    schedule_id?: true
    farm_id?: true
    section_number?: true
    scheduled_time?: true
    executed_time?: true
    status?: true
    skip_reason?: true
    duration_minutes?: true
    water_used?: true
    created_at?: true
    _all?: true
  }

  export type ScheduledIrrigationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduledIrrigation to aggregate.
     */
    where?: ScheduledIrrigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledIrrigations to fetch.
     */
    orderBy?: ScheduledIrrigationOrderByWithRelationInput | ScheduledIrrigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduledIrrigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledIrrigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledIrrigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScheduledIrrigations
    **/
    _count?: true | ScheduledIrrigationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduledIrrigationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduledIrrigationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduledIrrigationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduledIrrigationMaxAggregateInputType
  }

  export type GetScheduledIrrigationAggregateType<T extends ScheduledIrrigationAggregateArgs> = {
        [P in keyof T & keyof AggregateScheduledIrrigation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScheduledIrrigation[P]>
      : GetScalarType<T[P], AggregateScheduledIrrigation[P]>
  }




  export type ScheduledIrrigationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledIrrigationWhereInput
    orderBy?: ScheduledIrrigationOrderByWithAggregationInput | ScheduledIrrigationOrderByWithAggregationInput[]
    by: ScheduledIrrigationScalarFieldEnum[] | ScheduledIrrigationScalarFieldEnum
    having?: ScheduledIrrigationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduledIrrigationCountAggregateInputType | true
    _avg?: ScheduledIrrigationAvgAggregateInputType
    _sum?: ScheduledIrrigationSumAggregateInputType
    _min?: ScheduledIrrigationMinAggregateInputType
    _max?: ScheduledIrrigationMaxAggregateInputType
  }

  export type ScheduledIrrigationGroupByOutputType = {
    id: string
    schedule_id: string
    farm_id: number
    section_number: number
    scheduled_time: Date
    executed_time: Date | null
    status: string
    skip_reason: string | null
    duration_minutes: number
    water_used: number | null
    created_at: Date
    _count: ScheduledIrrigationCountAggregateOutputType | null
    _avg: ScheduledIrrigationAvgAggregateOutputType | null
    _sum: ScheduledIrrigationSumAggregateOutputType | null
    _min: ScheduledIrrigationMinAggregateOutputType | null
    _max: ScheduledIrrigationMaxAggregateOutputType | null
  }

  type GetScheduledIrrigationGroupByPayload<T extends ScheduledIrrigationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduledIrrigationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduledIrrigationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduledIrrigationGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduledIrrigationGroupByOutputType[P]>
        }
      >
    >


  export type ScheduledIrrigationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schedule_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    scheduled_time?: boolean
    executed_time?: boolean
    status?: boolean
    skip_reason?: boolean
    duration_minutes?: boolean
    water_used?: boolean
    created_at?: boolean
    schedule?: boolean | IrrigationScheduleDefaultArgs<ExtArgs>
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduledIrrigation"]>

  export type ScheduledIrrigationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schedule_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    scheduled_time?: boolean
    executed_time?: boolean
    status?: boolean
    skip_reason?: boolean
    duration_minutes?: boolean
    water_used?: boolean
    created_at?: boolean
    schedule?: boolean | IrrigationScheduleDefaultArgs<ExtArgs>
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduledIrrigation"]>

  export type ScheduledIrrigationSelectScalar = {
    id?: boolean
    schedule_id?: boolean
    farm_id?: boolean
    section_number?: boolean
    scheduled_time?: boolean
    executed_time?: boolean
    status?: boolean
    skip_reason?: boolean
    duration_minutes?: boolean
    water_used?: boolean
    created_at?: boolean
  }

  export type ScheduledIrrigationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule?: boolean | IrrigationScheduleDefaultArgs<ExtArgs>
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }
  export type ScheduledIrrigationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule?: boolean | IrrigationScheduleDefaultArgs<ExtArgs>
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $ScheduledIrrigationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScheduledIrrigation"
    objects: {
      schedule: Prisma.$IrrigationSchedulePayload<ExtArgs>
      farm: Prisma.$FarmPayload<ExtArgs>
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schedule_id: string
      farm_id: number
      section_number: number
      scheduled_time: Date
      executed_time: Date | null
      status: string
      skip_reason: string | null
      duration_minutes: number
      water_used: number | null
      created_at: Date
    }, ExtArgs["result"]["scheduledIrrigation"]>
    composites: {}
  }

  type ScheduledIrrigationGetPayload<S extends boolean | null | undefined | ScheduledIrrigationDefaultArgs> = $Result.GetResult<Prisma.$ScheduledIrrigationPayload, S>

  type ScheduledIrrigationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScheduledIrrigationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScheduledIrrigationCountAggregateInputType | true
    }

  export interface ScheduledIrrigationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScheduledIrrigation'], meta: { name: 'ScheduledIrrigation' } }
    /**
     * Find zero or one ScheduledIrrigation that matches the filter.
     * @param {ScheduledIrrigationFindUniqueArgs} args - Arguments to find a ScheduledIrrigation
     * @example
     * // Get one ScheduledIrrigation
     * const scheduledIrrigation = await prisma.scheduledIrrigation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduledIrrigationFindUniqueArgs>(args: SelectSubset<T, ScheduledIrrigationFindUniqueArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ScheduledIrrigation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScheduledIrrigationFindUniqueOrThrowArgs} args - Arguments to find a ScheduledIrrigation
     * @example
     * // Get one ScheduledIrrigation
     * const scheduledIrrigation = await prisma.scheduledIrrigation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduledIrrigationFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduledIrrigationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ScheduledIrrigation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledIrrigationFindFirstArgs} args - Arguments to find a ScheduledIrrigation
     * @example
     * // Get one ScheduledIrrigation
     * const scheduledIrrigation = await prisma.scheduledIrrigation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduledIrrigationFindFirstArgs>(args?: SelectSubset<T, ScheduledIrrigationFindFirstArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ScheduledIrrigation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledIrrigationFindFirstOrThrowArgs} args - Arguments to find a ScheduledIrrigation
     * @example
     * // Get one ScheduledIrrigation
     * const scheduledIrrigation = await prisma.scheduledIrrigation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduledIrrigationFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduledIrrigationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ScheduledIrrigations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledIrrigationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScheduledIrrigations
     * const scheduledIrrigations = await prisma.scheduledIrrigation.findMany()
     * 
     * // Get first 10 ScheduledIrrigations
     * const scheduledIrrigations = await prisma.scheduledIrrigation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduledIrrigationWithIdOnly = await prisma.scheduledIrrigation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduledIrrigationFindManyArgs>(args?: SelectSubset<T, ScheduledIrrigationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ScheduledIrrigation.
     * @param {ScheduledIrrigationCreateArgs} args - Arguments to create a ScheduledIrrigation.
     * @example
     * // Create one ScheduledIrrigation
     * const ScheduledIrrigation = await prisma.scheduledIrrigation.create({
     *   data: {
     *     // ... data to create a ScheduledIrrigation
     *   }
     * })
     * 
     */
    create<T extends ScheduledIrrigationCreateArgs>(args: SelectSubset<T, ScheduledIrrigationCreateArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ScheduledIrrigations.
     * @param {ScheduledIrrigationCreateManyArgs} args - Arguments to create many ScheduledIrrigations.
     * @example
     * // Create many ScheduledIrrigations
     * const scheduledIrrigation = await prisma.scheduledIrrigation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduledIrrigationCreateManyArgs>(args?: SelectSubset<T, ScheduledIrrigationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScheduledIrrigations and returns the data saved in the database.
     * @param {ScheduledIrrigationCreateManyAndReturnArgs} args - Arguments to create many ScheduledIrrigations.
     * @example
     * // Create many ScheduledIrrigations
     * const scheduledIrrigation = await prisma.scheduledIrrigation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScheduledIrrigations and only return the `id`
     * const scheduledIrrigationWithIdOnly = await prisma.scheduledIrrigation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduledIrrigationCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduledIrrigationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ScheduledIrrigation.
     * @param {ScheduledIrrigationDeleteArgs} args - Arguments to delete one ScheduledIrrigation.
     * @example
     * // Delete one ScheduledIrrigation
     * const ScheduledIrrigation = await prisma.scheduledIrrigation.delete({
     *   where: {
     *     // ... filter to delete one ScheduledIrrigation
     *   }
     * })
     * 
     */
    delete<T extends ScheduledIrrigationDeleteArgs>(args: SelectSubset<T, ScheduledIrrigationDeleteArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ScheduledIrrigation.
     * @param {ScheduledIrrigationUpdateArgs} args - Arguments to update one ScheduledIrrigation.
     * @example
     * // Update one ScheduledIrrigation
     * const scheduledIrrigation = await prisma.scheduledIrrigation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduledIrrigationUpdateArgs>(args: SelectSubset<T, ScheduledIrrigationUpdateArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ScheduledIrrigations.
     * @param {ScheduledIrrigationDeleteManyArgs} args - Arguments to filter ScheduledIrrigations to delete.
     * @example
     * // Delete a few ScheduledIrrigations
     * const { count } = await prisma.scheduledIrrigation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduledIrrigationDeleteManyArgs>(args?: SelectSubset<T, ScheduledIrrigationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduledIrrigations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledIrrigationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScheduledIrrigations
     * const scheduledIrrigation = await prisma.scheduledIrrigation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduledIrrigationUpdateManyArgs>(args: SelectSubset<T, ScheduledIrrigationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScheduledIrrigation.
     * @param {ScheduledIrrigationUpsertArgs} args - Arguments to update or create a ScheduledIrrigation.
     * @example
     * // Update or create a ScheduledIrrigation
     * const scheduledIrrigation = await prisma.scheduledIrrigation.upsert({
     *   create: {
     *     // ... data to create a ScheduledIrrigation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScheduledIrrigation we want to update
     *   }
     * })
     */
    upsert<T extends ScheduledIrrigationUpsertArgs>(args: SelectSubset<T, ScheduledIrrigationUpsertArgs<ExtArgs>>): Prisma__ScheduledIrrigationClient<$Result.GetResult<Prisma.$ScheduledIrrigationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ScheduledIrrigations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledIrrigationCountArgs} args - Arguments to filter ScheduledIrrigations to count.
     * @example
     * // Count the number of ScheduledIrrigations
     * const count = await prisma.scheduledIrrigation.count({
     *   where: {
     *     // ... the filter for the ScheduledIrrigations we want to count
     *   }
     * })
    **/
    count<T extends ScheduledIrrigationCountArgs>(
      args?: Subset<T, ScheduledIrrigationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduledIrrigationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScheduledIrrigation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledIrrigationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduledIrrigationAggregateArgs>(args: Subset<T, ScheduledIrrigationAggregateArgs>): Prisma.PrismaPromise<GetScheduledIrrigationAggregateType<T>>

    /**
     * Group by ScheduledIrrigation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledIrrigationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduledIrrigationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduledIrrigationGroupByArgs['orderBy'] }
        : { orderBy?: ScheduledIrrigationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduledIrrigationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduledIrrigationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScheduledIrrigation model
   */
  readonly fields: ScheduledIrrigationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScheduledIrrigation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduledIrrigationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedule<T extends IrrigationScheduleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IrrigationScheduleDefaultArgs<ExtArgs>>): Prisma__IrrigationScheduleClient<$Result.GetResult<Prisma.$IrrigationSchedulePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScheduledIrrigation model
   */ 
  interface ScheduledIrrigationFieldRefs {
    readonly id: FieldRef<"ScheduledIrrigation", 'String'>
    readonly schedule_id: FieldRef<"ScheduledIrrigation", 'String'>
    readonly farm_id: FieldRef<"ScheduledIrrigation", 'Int'>
    readonly section_number: FieldRef<"ScheduledIrrigation", 'Int'>
    readonly scheduled_time: FieldRef<"ScheduledIrrigation", 'DateTime'>
    readonly executed_time: FieldRef<"ScheduledIrrigation", 'DateTime'>
    readonly status: FieldRef<"ScheduledIrrigation", 'String'>
    readonly skip_reason: FieldRef<"ScheduledIrrigation", 'String'>
    readonly duration_minutes: FieldRef<"ScheduledIrrigation", 'Int'>
    readonly water_used: FieldRef<"ScheduledIrrigation", 'Float'>
    readonly created_at: FieldRef<"ScheduledIrrigation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScheduledIrrigation findUnique
   */
  export type ScheduledIrrigationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledIrrigation to fetch.
     */
    where: ScheduledIrrigationWhereUniqueInput
  }

  /**
   * ScheduledIrrigation findUniqueOrThrow
   */
  export type ScheduledIrrigationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledIrrigation to fetch.
     */
    where: ScheduledIrrigationWhereUniqueInput
  }

  /**
   * ScheduledIrrigation findFirst
   */
  export type ScheduledIrrigationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledIrrigation to fetch.
     */
    where?: ScheduledIrrigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledIrrigations to fetch.
     */
    orderBy?: ScheduledIrrigationOrderByWithRelationInput | ScheduledIrrigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduledIrrigations.
     */
    cursor?: ScheduledIrrigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledIrrigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledIrrigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduledIrrigations.
     */
    distinct?: ScheduledIrrigationScalarFieldEnum | ScheduledIrrigationScalarFieldEnum[]
  }

  /**
   * ScheduledIrrigation findFirstOrThrow
   */
  export type ScheduledIrrigationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledIrrigation to fetch.
     */
    where?: ScheduledIrrigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledIrrigations to fetch.
     */
    orderBy?: ScheduledIrrigationOrderByWithRelationInput | ScheduledIrrigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduledIrrigations.
     */
    cursor?: ScheduledIrrigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledIrrigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledIrrigations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduledIrrigations.
     */
    distinct?: ScheduledIrrigationScalarFieldEnum | ScheduledIrrigationScalarFieldEnum[]
  }

  /**
   * ScheduledIrrigation findMany
   */
  export type ScheduledIrrigationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * Filter, which ScheduledIrrigations to fetch.
     */
    where?: ScheduledIrrigationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledIrrigations to fetch.
     */
    orderBy?: ScheduledIrrigationOrderByWithRelationInput | ScheduledIrrigationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScheduledIrrigations.
     */
    cursor?: ScheduledIrrigationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledIrrigations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledIrrigations.
     */
    skip?: number
    distinct?: ScheduledIrrigationScalarFieldEnum | ScheduledIrrigationScalarFieldEnum[]
  }

  /**
   * ScheduledIrrigation create
   */
  export type ScheduledIrrigationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * The data needed to create a ScheduledIrrigation.
     */
    data: XOR<ScheduledIrrigationCreateInput, ScheduledIrrigationUncheckedCreateInput>
  }

  /**
   * ScheduledIrrigation createMany
   */
  export type ScheduledIrrigationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScheduledIrrigations.
     */
    data: ScheduledIrrigationCreateManyInput | ScheduledIrrigationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduledIrrigation createManyAndReturn
   */
  export type ScheduledIrrigationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ScheduledIrrigations.
     */
    data: ScheduledIrrigationCreateManyInput | ScheduledIrrigationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScheduledIrrigation update
   */
  export type ScheduledIrrigationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * The data needed to update a ScheduledIrrigation.
     */
    data: XOR<ScheduledIrrigationUpdateInput, ScheduledIrrigationUncheckedUpdateInput>
    /**
     * Choose, which ScheduledIrrigation to update.
     */
    where: ScheduledIrrigationWhereUniqueInput
  }

  /**
   * ScheduledIrrigation updateMany
   */
  export type ScheduledIrrigationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScheduledIrrigations.
     */
    data: XOR<ScheduledIrrigationUpdateManyMutationInput, ScheduledIrrigationUncheckedUpdateManyInput>
    /**
     * Filter which ScheduledIrrigations to update
     */
    where?: ScheduledIrrigationWhereInput
  }

  /**
   * ScheduledIrrigation upsert
   */
  export type ScheduledIrrigationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * The filter to search for the ScheduledIrrigation to update in case it exists.
     */
    where: ScheduledIrrigationWhereUniqueInput
    /**
     * In case the ScheduledIrrigation found by the `where` argument doesn't exist, create a new ScheduledIrrigation with this data.
     */
    create: XOR<ScheduledIrrigationCreateInput, ScheduledIrrigationUncheckedCreateInput>
    /**
     * In case the ScheduledIrrigation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduledIrrigationUpdateInput, ScheduledIrrigationUncheckedUpdateInput>
  }

  /**
   * ScheduledIrrigation delete
   */
  export type ScheduledIrrigationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
    /**
     * Filter which ScheduledIrrigation to delete.
     */
    where: ScheduledIrrigationWhereUniqueInput
  }

  /**
   * ScheduledIrrigation deleteMany
   */
  export type ScheduledIrrigationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduledIrrigations to delete
     */
    where?: ScheduledIrrigationWhereInput
  }

  /**
   * ScheduledIrrigation without action
   */
  export type ScheduledIrrigationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledIrrigation
     */
    select?: ScheduledIrrigationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledIrrigationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FarmScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const SectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    farm_id: 'farm_id',
    section_number: 'section_number',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SectionScalarFieldEnum = (typeof SectionScalarFieldEnum)[keyof typeof SectionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    farm_ids: 'farm_ids',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MoistureReadingScalarFieldEnum: {
    id: 'id',
    farm_id: 'farm_id',
    section_number: 'section_number',
    value: 'value',
    timestamp: 'timestamp'
  };

  export type MoistureReadingScalarFieldEnum = (typeof MoistureReadingScalarFieldEnum)[keyof typeof MoistureReadingScalarFieldEnum]


  export const IrrigationEventScalarFieldEnum: {
    id: 'id',
    farm_id: 'farm_id',
    section_number: 'section_number',
    water_ml: 'water_ml',
    start_time: 'start_time',
    end_time: 'end_time'
  };

  export type IrrigationEventScalarFieldEnum = (typeof IrrigationEventScalarFieldEnum)[keyof typeof IrrigationEventScalarFieldEnum]


  export const MoistureDeviceStatusScalarFieldEnum: {
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

  export type MoistureDeviceStatusScalarFieldEnum = (typeof MoistureDeviceStatusScalarFieldEnum)[keyof typeof MoistureDeviceStatusScalarFieldEnum]


  export const IrrigationDeviceStatusScalarFieldEnum: {
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

  export type IrrigationDeviceStatusScalarFieldEnum = (typeof IrrigationDeviceStatusScalarFieldEnum)[keyof typeof IrrigationDeviceStatusScalarFieldEnum]


  export const DeviceAckScalarFieldEnum: {
    id: 'id',
    device_id: 'device_id',
    farm_id: 'farm_id',
    section_number: 'section_number',
    ack_json: 'ack_json',
    timestamp: 'timestamp'
  };

  export type DeviceAckScalarFieldEnum = (typeof DeviceAckScalarFieldEnum)[keyof typeof DeviceAckScalarFieldEnum]


  export const IrrigationScheduleScalarFieldEnum: {
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

  export type IrrigationScheduleScalarFieldEnum = (typeof IrrigationScheduleScalarFieldEnum)[keyof typeof IrrigationScheduleScalarFieldEnum]


  export const ScheduledIrrigationScalarFieldEnum: {
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

  export type ScheduledIrrigationScalarFieldEnum = (typeof ScheduledIrrigationScalarFieldEnum)[keyof typeof ScheduledIrrigationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type FarmWhereInput = {
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    id?: IntFilter<"Farm"> | number
    name?: StringFilter<"Farm"> | string
    location?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeFilter<"Farm"> | Date | string
    sections?: SectionListRelationFilter
    moistureReadings?: MoistureReadingListRelationFilter
    irrigationEvents?: IrrigationEventListRelationFilter
    moistureDeviceStatuses?: MoistureDeviceStatusListRelationFilter
    irrigationDeviceStatuses?: IrrigationDeviceStatusListRelationFilter
    deviceAcks?: DeviceAckListRelationFilter
    irrigationSchedules?: IrrigationScheduleListRelationFilter
    scheduledIrrigations?: ScheduledIrrigationListRelationFilter
  }

  export type FarmOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sections?: SectionOrderByRelationAggregateInput
    moistureReadings?: MoistureReadingOrderByRelationAggregateInput
    irrigationEvents?: IrrigationEventOrderByRelationAggregateInput
    moistureDeviceStatuses?: MoistureDeviceStatusOrderByRelationAggregateInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusOrderByRelationAggregateInput
    deviceAcks?: DeviceAckOrderByRelationAggregateInput
    irrigationSchedules?: IrrigationScheduleOrderByRelationAggregateInput
    scheduledIrrigations?: ScheduledIrrigationOrderByRelationAggregateInput
  }

  export type FarmWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    name?: StringFilter<"Farm"> | string
    location?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeFilter<"Farm"> | Date | string
    sections?: SectionListRelationFilter
    moistureReadings?: MoistureReadingListRelationFilter
    irrigationEvents?: IrrigationEventListRelationFilter
    moistureDeviceStatuses?: MoistureDeviceStatusListRelationFilter
    irrigationDeviceStatuses?: IrrigationDeviceStatusListRelationFilter
    deviceAcks?: DeviceAckListRelationFilter
    irrigationSchedules?: IrrigationScheduleListRelationFilter
    scheduledIrrigations?: ScheduledIrrigationListRelationFilter
  }, "id">

  export type FarmOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FarmCountOrderByAggregateInput
    _avg?: FarmAvgOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
    _sum?: FarmSumOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    OR?: FarmScalarWhereWithAggregatesInput[]
    NOT?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Farm"> | number
    name?: StringWithAggregatesFilter<"Farm"> | string
    location?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
  }

  export type SectionWhereInput = {
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    id?: IntFilter<"Section"> | number
    name?: StringFilter<"Section"> | string
    farm_id?: IntFilter<"Section"> | number
    section_number?: IntFilter<"Section"> | number
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    moistureReadings?: MoistureReadingListRelationFilter
    irrigationEvents?: IrrigationEventListRelationFilter
    moistureDeviceStatuses?: MoistureDeviceStatusListRelationFilter
    irrigationDeviceStatuses?: IrrigationDeviceStatusListRelationFilter
    deviceAcks?: DeviceAckListRelationFilter
    scheduledIrrigations?: ScheduledIrrigationListRelationFilter
  }

  export type SectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farm?: FarmOrderByWithRelationInput
    moistureReadings?: MoistureReadingOrderByRelationAggregateInput
    irrigationEvents?: IrrigationEventOrderByRelationAggregateInput
    moistureDeviceStatuses?: MoistureDeviceStatusOrderByRelationAggregateInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusOrderByRelationAggregateInput
    deviceAcks?: DeviceAckOrderByRelationAggregateInput
    scheduledIrrigations?: ScheduledIrrigationOrderByRelationAggregateInput
  }

  export type SectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    farm_section_number_unique?: SectionFarm_section_number_uniqueCompoundUniqueInput
    farm_section_name_unique?: SectionFarm_section_name_uniqueCompoundUniqueInput
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    name?: StringFilter<"Section"> | string
    farm_id?: IntFilter<"Section"> | number
    section_number?: IntFilter<"Section"> | number
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    moistureReadings?: MoistureReadingListRelationFilter
    irrigationEvents?: IrrigationEventListRelationFilter
    moistureDeviceStatuses?: MoistureDeviceStatusListRelationFilter
    irrigationDeviceStatuses?: IrrigationDeviceStatusListRelationFilter
    deviceAcks?: DeviceAckListRelationFilter
    scheduledIrrigations?: ScheduledIrrigationListRelationFilter
  }, "id" | "farm_section_number_unique" | "farm_section_name_unique">

  export type SectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SectionCountOrderByAggregateInput
    _avg?: SectionAvgOrderByAggregateInput
    _max?: SectionMaxOrderByAggregateInput
    _min?: SectionMinOrderByAggregateInput
    _sum?: SectionSumOrderByAggregateInput
  }

  export type SectionScalarWhereWithAggregatesInput = {
    AND?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    OR?: SectionScalarWhereWithAggregatesInput[]
    NOT?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Section"> | number
    name?: StringWithAggregatesFilter<"Section"> | string
    farm_id?: IntWithAggregatesFilter<"Section"> | number
    section_number?: IntWithAggregatesFilter<"Section"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    farm_ids?: IntNullableListFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    farm_ids?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    farm_ids?: IntNullableListFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    farm_ids?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    farm_ids?: IntNullableListFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MoistureReadingWhereInput = {
    AND?: MoistureReadingWhereInput | MoistureReadingWhereInput[]
    OR?: MoistureReadingWhereInput[]
    NOT?: MoistureReadingWhereInput | MoistureReadingWhereInput[]
    id?: IntFilter<"MoistureReading"> | number
    farm_id?: IntFilter<"MoistureReading"> | number
    section_number?: IntFilter<"MoistureReading"> | number
    value?: FloatFilter<"MoistureReading"> | number
    timestamp?: DateTimeFilter<"MoistureReading"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }

  export type MoistureReadingOrderByWithRelationInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
    farm?: FarmOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
  }

  export type MoistureReadingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MoistureReadingWhereInput | MoistureReadingWhereInput[]
    OR?: MoistureReadingWhereInput[]
    NOT?: MoistureReadingWhereInput | MoistureReadingWhereInput[]
    farm_id?: IntFilter<"MoistureReading"> | number
    section_number?: IntFilter<"MoistureReading"> | number
    value?: FloatFilter<"MoistureReading"> | number
    timestamp?: DateTimeFilter<"MoistureReading"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }, "id">

  export type MoistureReadingOrderByWithAggregationInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
    _count?: MoistureReadingCountOrderByAggregateInput
    _avg?: MoistureReadingAvgOrderByAggregateInput
    _max?: MoistureReadingMaxOrderByAggregateInput
    _min?: MoistureReadingMinOrderByAggregateInput
    _sum?: MoistureReadingSumOrderByAggregateInput
  }

  export type MoistureReadingScalarWhereWithAggregatesInput = {
    AND?: MoistureReadingScalarWhereWithAggregatesInput | MoistureReadingScalarWhereWithAggregatesInput[]
    OR?: MoistureReadingScalarWhereWithAggregatesInput[]
    NOT?: MoistureReadingScalarWhereWithAggregatesInput | MoistureReadingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MoistureReading"> | number
    farm_id?: IntWithAggregatesFilter<"MoistureReading"> | number
    section_number?: IntWithAggregatesFilter<"MoistureReading"> | number
    value?: FloatWithAggregatesFilter<"MoistureReading"> | number
    timestamp?: DateTimeWithAggregatesFilter<"MoistureReading"> | Date | string
  }

  export type IrrigationEventWhereInput = {
    AND?: IrrigationEventWhereInput | IrrigationEventWhereInput[]
    OR?: IrrigationEventWhereInput[]
    NOT?: IrrigationEventWhereInput | IrrigationEventWhereInput[]
    id?: IntFilter<"IrrigationEvent"> | number
    farm_id?: IntFilter<"IrrigationEvent"> | number
    section_number?: IntFilter<"IrrigationEvent"> | number
    water_ml?: FloatFilter<"IrrigationEvent"> | number
    start_time?: DateTimeFilter<"IrrigationEvent"> | Date | string
    end_time?: DateTimeFilter<"IrrigationEvent"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }

  export type IrrigationEventOrderByWithRelationInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    water_ml?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    farm?: FarmOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
  }

  export type IrrigationEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: IrrigationEventWhereInput | IrrigationEventWhereInput[]
    OR?: IrrigationEventWhereInput[]
    NOT?: IrrigationEventWhereInput | IrrigationEventWhereInput[]
    farm_id?: IntFilter<"IrrigationEvent"> | number
    section_number?: IntFilter<"IrrigationEvent"> | number
    water_ml?: FloatFilter<"IrrigationEvent"> | number
    start_time?: DateTimeFilter<"IrrigationEvent"> | Date | string
    end_time?: DateTimeFilter<"IrrigationEvent"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }, "id">

  export type IrrigationEventOrderByWithAggregationInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    water_ml?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    _count?: IrrigationEventCountOrderByAggregateInput
    _avg?: IrrigationEventAvgOrderByAggregateInput
    _max?: IrrigationEventMaxOrderByAggregateInput
    _min?: IrrigationEventMinOrderByAggregateInput
    _sum?: IrrigationEventSumOrderByAggregateInput
  }

  export type IrrigationEventScalarWhereWithAggregatesInput = {
    AND?: IrrigationEventScalarWhereWithAggregatesInput | IrrigationEventScalarWhereWithAggregatesInput[]
    OR?: IrrigationEventScalarWhereWithAggregatesInput[]
    NOT?: IrrigationEventScalarWhereWithAggregatesInput | IrrigationEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"IrrigationEvent"> | number
    farm_id?: IntWithAggregatesFilter<"IrrigationEvent"> | number
    section_number?: IntWithAggregatesFilter<"IrrigationEvent"> | number
    water_ml?: FloatWithAggregatesFilter<"IrrigationEvent"> | number
    start_time?: DateTimeWithAggregatesFilter<"IrrigationEvent"> | Date | string
    end_time?: DateTimeWithAggregatesFilter<"IrrigationEvent"> | Date | string
  }

  export type MoistureDeviceStatusWhereInput = {
    AND?: MoistureDeviceStatusWhereInput | MoistureDeviceStatusWhereInput[]
    OR?: MoistureDeviceStatusWhereInput[]
    NOT?: MoistureDeviceStatusWhereInput | MoistureDeviceStatusWhereInput[]
    id?: IntFilter<"MoistureDeviceStatus"> | number
    device_id?: StringFilter<"MoistureDeviceStatus"> | string
    farm_id?: IntFilter<"MoistureDeviceStatus"> | number
    section_number?: IntFilter<"MoistureDeviceStatus"> | number
    mqtt?: BoolFilter<"MoistureDeviceStatus"> | boolean
    wifi?: BoolFilter<"MoistureDeviceStatus"> | boolean
    uptime?: BigIntFilter<"MoistureDeviceStatus"> | bigint | number
    timestamp?: DateTimeFilter<"MoistureDeviceStatus"> | Date | string
    last_error?: StringFilter<"MoistureDeviceStatus"> | string
    enable_deep_sleep?: BoolFilter<"MoistureDeviceStatus"> | boolean
    reporting_interval?: IntFilter<"MoistureDeviceStatus"> | number
    deep_sleep_duration?: IntFilter<"MoistureDeviceStatus"> | number
    createdAt?: DateTimeFilter<"MoistureDeviceStatus"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }

  export type MoistureDeviceStatusOrderByWithRelationInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    mqtt?: SortOrder
    wifi?: SortOrder
    uptime?: SortOrder
    timestamp?: SortOrder
    last_error?: SortOrder
    enable_deep_sleep?: SortOrder
    reporting_interval?: SortOrder
    deep_sleep_duration?: SortOrder
    createdAt?: SortOrder
    farm?: FarmOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
  }

  export type MoistureDeviceStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MoistureDeviceStatusWhereInput | MoistureDeviceStatusWhereInput[]
    OR?: MoistureDeviceStatusWhereInput[]
    NOT?: MoistureDeviceStatusWhereInput | MoistureDeviceStatusWhereInput[]
    device_id?: StringFilter<"MoistureDeviceStatus"> | string
    farm_id?: IntFilter<"MoistureDeviceStatus"> | number
    section_number?: IntFilter<"MoistureDeviceStatus"> | number
    mqtt?: BoolFilter<"MoistureDeviceStatus"> | boolean
    wifi?: BoolFilter<"MoistureDeviceStatus"> | boolean
    uptime?: BigIntFilter<"MoistureDeviceStatus"> | bigint | number
    timestamp?: DateTimeFilter<"MoistureDeviceStatus"> | Date | string
    last_error?: StringFilter<"MoistureDeviceStatus"> | string
    enable_deep_sleep?: BoolFilter<"MoistureDeviceStatus"> | boolean
    reporting_interval?: IntFilter<"MoistureDeviceStatus"> | number
    deep_sleep_duration?: IntFilter<"MoistureDeviceStatus"> | number
    createdAt?: DateTimeFilter<"MoistureDeviceStatus"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }, "id">

  export type MoistureDeviceStatusOrderByWithAggregationInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    mqtt?: SortOrder
    wifi?: SortOrder
    uptime?: SortOrder
    timestamp?: SortOrder
    last_error?: SortOrder
    enable_deep_sleep?: SortOrder
    reporting_interval?: SortOrder
    deep_sleep_duration?: SortOrder
    createdAt?: SortOrder
    _count?: MoistureDeviceStatusCountOrderByAggregateInput
    _avg?: MoistureDeviceStatusAvgOrderByAggregateInput
    _max?: MoistureDeviceStatusMaxOrderByAggregateInput
    _min?: MoistureDeviceStatusMinOrderByAggregateInput
    _sum?: MoistureDeviceStatusSumOrderByAggregateInput
  }

  export type MoistureDeviceStatusScalarWhereWithAggregatesInput = {
    AND?: MoistureDeviceStatusScalarWhereWithAggregatesInput | MoistureDeviceStatusScalarWhereWithAggregatesInput[]
    OR?: MoistureDeviceStatusScalarWhereWithAggregatesInput[]
    NOT?: MoistureDeviceStatusScalarWhereWithAggregatesInput | MoistureDeviceStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MoistureDeviceStatus"> | number
    device_id?: StringWithAggregatesFilter<"MoistureDeviceStatus"> | string
    farm_id?: IntWithAggregatesFilter<"MoistureDeviceStatus"> | number
    section_number?: IntWithAggregatesFilter<"MoistureDeviceStatus"> | number
    mqtt?: BoolWithAggregatesFilter<"MoistureDeviceStatus"> | boolean
    wifi?: BoolWithAggregatesFilter<"MoistureDeviceStatus"> | boolean
    uptime?: BigIntWithAggregatesFilter<"MoistureDeviceStatus"> | bigint | number
    timestamp?: DateTimeWithAggregatesFilter<"MoistureDeviceStatus"> | Date | string
    last_error?: StringWithAggregatesFilter<"MoistureDeviceStatus"> | string
    enable_deep_sleep?: BoolWithAggregatesFilter<"MoistureDeviceStatus"> | boolean
    reporting_interval?: IntWithAggregatesFilter<"MoistureDeviceStatus"> | number
    deep_sleep_duration?: IntWithAggregatesFilter<"MoistureDeviceStatus"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MoistureDeviceStatus"> | Date | string
  }

  export type IrrigationDeviceStatusWhereInput = {
    AND?: IrrigationDeviceStatusWhereInput | IrrigationDeviceStatusWhereInput[]
    OR?: IrrigationDeviceStatusWhereInput[]
    NOT?: IrrigationDeviceStatusWhereInput | IrrigationDeviceStatusWhereInput[]
    id?: IntFilter<"IrrigationDeviceStatus"> | number
    device_id?: StringFilter<"IrrigationDeviceStatus"> | string
    farm_id?: IntFilter<"IrrigationDeviceStatus"> | number
    section_number?: IntFilter<"IrrigationDeviceStatus"> | number
    uptime?: BigIntFilter<"IrrigationDeviceStatus"> | bigint | number
    wifi?: IntFilter<"IrrigationDeviceStatus"> | number
    mqtt?: IntFilter<"IrrigationDeviceStatus"> | number
    last_error?: StringFilter<"IrrigationDeviceStatus"> | string
    valve_on?: IntFilter<"IrrigationDeviceStatus"> | number
    mode?: StringFilter<"IrrigationDeviceStatus"> | string
    latest_moisture?: IntFilter<"IrrigationDeviceStatus"> | number
    min_threshold?: IntFilter<"IrrigationDeviceStatus"> | number
    max_threshold?: IntFilter<"IrrigationDeviceStatus"> | number
    pulse_count?: IntFilter<"IrrigationDeviceStatus"> | number
    water_ml?: IntFilter<"IrrigationDeviceStatus"> | number
    timestamp?: DateTimeFilter<"IrrigationDeviceStatus"> | Date | string
    createdAt?: DateTimeFilter<"IrrigationDeviceStatus"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }

  export type IrrigationDeviceStatusOrderByWithRelationInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    wifi?: SortOrder
    mqtt?: SortOrder
    last_error?: SortOrder
    valve_on?: SortOrder
    mode?: SortOrder
    latest_moisture?: SortOrder
    min_threshold?: SortOrder
    max_threshold?: SortOrder
    pulse_count?: SortOrder
    water_ml?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    farm?: FarmOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
  }

  export type IrrigationDeviceStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: IrrigationDeviceStatusWhereInput | IrrigationDeviceStatusWhereInput[]
    OR?: IrrigationDeviceStatusWhereInput[]
    NOT?: IrrigationDeviceStatusWhereInput | IrrigationDeviceStatusWhereInput[]
    device_id?: StringFilter<"IrrigationDeviceStatus"> | string
    farm_id?: IntFilter<"IrrigationDeviceStatus"> | number
    section_number?: IntFilter<"IrrigationDeviceStatus"> | number
    uptime?: BigIntFilter<"IrrigationDeviceStatus"> | bigint | number
    wifi?: IntFilter<"IrrigationDeviceStatus"> | number
    mqtt?: IntFilter<"IrrigationDeviceStatus"> | number
    last_error?: StringFilter<"IrrigationDeviceStatus"> | string
    valve_on?: IntFilter<"IrrigationDeviceStatus"> | number
    mode?: StringFilter<"IrrigationDeviceStatus"> | string
    latest_moisture?: IntFilter<"IrrigationDeviceStatus"> | number
    min_threshold?: IntFilter<"IrrigationDeviceStatus"> | number
    max_threshold?: IntFilter<"IrrigationDeviceStatus"> | number
    pulse_count?: IntFilter<"IrrigationDeviceStatus"> | number
    water_ml?: IntFilter<"IrrigationDeviceStatus"> | number
    timestamp?: DateTimeFilter<"IrrigationDeviceStatus"> | Date | string
    createdAt?: DateTimeFilter<"IrrigationDeviceStatus"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }, "id">

  export type IrrigationDeviceStatusOrderByWithAggregationInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    wifi?: SortOrder
    mqtt?: SortOrder
    last_error?: SortOrder
    valve_on?: SortOrder
    mode?: SortOrder
    latest_moisture?: SortOrder
    min_threshold?: SortOrder
    max_threshold?: SortOrder
    pulse_count?: SortOrder
    water_ml?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: IrrigationDeviceStatusCountOrderByAggregateInput
    _avg?: IrrigationDeviceStatusAvgOrderByAggregateInput
    _max?: IrrigationDeviceStatusMaxOrderByAggregateInput
    _min?: IrrigationDeviceStatusMinOrderByAggregateInput
    _sum?: IrrigationDeviceStatusSumOrderByAggregateInput
  }

  export type IrrigationDeviceStatusScalarWhereWithAggregatesInput = {
    AND?: IrrigationDeviceStatusScalarWhereWithAggregatesInput | IrrigationDeviceStatusScalarWhereWithAggregatesInput[]
    OR?: IrrigationDeviceStatusScalarWhereWithAggregatesInput[]
    NOT?: IrrigationDeviceStatusScalarWhereWithAggregatesInput | IrrigationDeviceStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    device_id?: StringWithAggregatesFilter<"IrrigationDeviceStatus"> | string
    farm_id?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    section_number?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    uptime?: BigIntWithAggregatesFilter<"IrrigationDeviceStatus"> | bigint | number
    wifi?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    mqtt?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    last_error?: StringWithAggregatesFilter<"IrrigationDeviceStatus"> | string
    valve_on?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    mode?: StringWithAggregatesFilter<"IrrigationDeviceStatus"> | string
    latest_moisture?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    min_threshold?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    max_threshold?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    pulse_count?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    water_ml?: IntWithAggregatesFilter<"IrrigationDeviceStatus"> | number
    timestamp?: DateTimeWithAggregatesFilter<"IrrigationDeviceStatus"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"IrrigationDeviceStatus"> | Date | string
  }

  export type DeviceAckWhereInput = {
    AND?: DeviceAckWhereInput | DeviceAckWhereInput[]
    OR?: DeviceAckWhereInput[]
    NOT?: DeviceAckWhereInput | DeviceAckWhereInput[]
    id?: IntFilter<"DeviceAck"> | number
    device_id?: StringNullableFilter<"DeviceAck"> | string | null
    farm_id?: IntFilter<"DeviceAck"> | number
    section_number?: IntFilter<"DeviceAck"> | number
    ack_json?: JsonFilter<"DeviceAck">
    timestamp?: DateTimeFilter<"DeviceAck"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }

  export type DeviceAckOrderByWithRelationInput = {
    id?: SortOrder
    device_id?: SortOrderInput | SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    ack_json?: SortOrder
    timestamp?: SortOrder
    farm?: FarmOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
  }

  export type DeviceAckWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DeviceAckWhereInput | DeviceAckWhereInput[]
    OR?: DeviceAckWhereInput[]
    NOT?: DeviceAckWhereInput | DeviceAckWhereInput[]
    device_id?: StringNullableFilter<"DeviceAck"> | string | null
    farm_id?: IntFilter<"DeviceAck"> | number
    section_number?: IntFilter<"DeviceAck"> | number
    ack_json?: JsonFilter<"DeviceAck">
    timestamp?: DateTimeFilter<"DeviceAck"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }, "id">

  export type DeviceAckOrderByWithAggregationInput = {
    id?: SortOrder
    device_id?: SortOrderInput | SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    ack_json?: SortOrder
    timestamp?: SortOrder
    _count?: DeviceAckCountOrderByAggregateInput
    _avg?: DeviceAckAvgOrderByAggregateInput
    _max?: DeviceAckMaxOrderByAggregateInput
    _min?: DeviceAckMinOrderByAggregateInput
    _sum?: DeviceAckSumOrderByAggregateInput
  }

  export type DeviceAckScalarWhereWithAggregatesInput = {
    AND?: DeviceAckScalarWhereWithAggregatesInput | DeviceAckScalarWhereWithAggregatesInput[]
    OR?: DeviceAckScalarWhereWithAggregatesInput[]
    NOT?: DeviceAckScalarWhereWithAggregatesInput | DeviceAckScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DeviceAck"> | number
    device_id?: StringNullableWithAggregatesFilter<"DeviceAck"> | string | null
    farm_id?: IntWithAggregatesFilter<"DeviceAck"> | number
    section_number?: IntWithAggregatesFilter<"DeviceAck"> | number
    ack_json?: JsonWithAggregatesFilter<"DeviceAck">
    timestamp?: DateTimeWithAggregatesFilter<"DeviceAck"> | Date | string
  }

  export type IrrigationScheduleWhereInput = {
    AND?: IrrigationScheduleWhereInput | IrrigationScheduleWhereInput[]
    OR?: IrrigationScheduleWhereInput[]
    NOT?: IrrigationScheduleWhereInput | IrrigationScheduleWhereInput[]
    id?: StringFilter<"IrrigationSchedule"> | string
    name?: StringFilter<"IrrigationSchedule"> | string
    farm_id?: IntFilter<"IrrigationSchedule"> | number
    section_numbers?: IntNullableListFilter<"IrrigationSchedule">
    start_time?: StringFilter<"IrrigationSchedule"> | string
    duration_minutes?: IntFilter<"IrrigationSchedule"> | number
    frequency?: StringFilter<"IrrigationSchedule"> | string
    days_of_week?: IntNullableListFilter<"IrrigationSchedule">
    day_of_month?: IntNullableFilter<"IrrigationSchedule"> | number | null
    is_active?: BoolFilter<"IrrigationSchedule"> | boolean
    weather_dependent?: BoolFilter<"IrrigationSchedule"> | boolean
    min_temperature?: FloatNullableFilter<"IrrigationSchedule"> | number | null
    max_temperature?: FloatNullableFilter<"IrrigationSchedule"> | number | null
    min_moisture?: IntNullableFilter<"IrrigationSchedule"> | number | null
    created_by?: StringFilter<"IrrigationSchedule"> | string
    created_at?: DateTimeFilter<"IrrigationSchedule"> | Date | string
    updated_at?: DateTimeFilter<"IrrigationSchedule"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    scheduledIrrigations?: ScheduledIrrigationListRelationFilter
  }

  export type IrrigationScheduleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_numbers?: SortOrder
    start_time?: SortOrder
    duration_minutes?: SortOrder
    frequency?: SortOrder
    days_of_week?: SortOrder
    day_of_month?: SortOrderInput | SortOrder
    is_active?: SortOrder
    weather_dependent?: SortOrder
    min_temperature?: SortOrderInput | SortOrder
    max_temperature?: SortOrderInput | SortOrder
    min_moisture?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    farm?: FarmOrderByWithRelationInput
    scheduledIrrigations?: ScheduledIrrigationOrderByRelationAggregateInput
  }

  export type IrrigationScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: IrrigationScheduleWhereInput | IrrigationScheduleWhereInput[]
    OR?: IrrigationScheduleWhereInput[]
    NOT?: IrrigationScheduleWhereInput | IrrigationScheduleWhereInput[]
    name?: StringFilter<"IrrigationSchedule"> | string
    farm_id?: IntFilter<"IrrigationSchedule"> | number
    section_numbers?: IntNullableListFilter<"IrrigationSchedule">
    start_time?: StringFilter<"IrrigationSchedule"> | string
    duration_minutes?: IntFilter<"IrrigationSchedule"> | number
    frequency?: StringFilter<"IrrigationSchedule"> | string
    days_of_week?: IntNullableListFilter<"IrrigationSchedule">
    day_of_month?: IntNullableFilter<"IrrigationSchedule"> | number | null
    is_active?: BoolFilter<"IrrigationSchedule"> | boolean
    weather_dependent?: BoolFilter<"IrrigationSchedule"> | boolean
    min_temperature?: FloatNullableFilter<"IrrigationSchedule"> | number | null
    max_temperature?: FloatNullableFilter<"IrrigationSchedule"> | number | null
    min_moisture?: IntNullableFilter<"IrrigationSchedule"> | number | null
    created_by?: StringFilter<"IrrigationSchedule"> | string
    created_at?: DateTimeFilter<"IrrigationSchedule"> | Date | string
    updated_at?: DateTimeFilter<"IrrigationSchedule"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    scheduledIrrigations?: ScheduledIrrigationListRelationFilter
  }, "id">

  export type IrrigationScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_numbers?: SortOrder
    start_time?: SortOrder
    duration_minutes?: SortOrder
    frequency?: SortOrder
    days_of_week?: SortOrder
    day_of_month?: SortOrderInput | SortOrder
    is_active?: SortOrder
    weather_dependent?: SortOrder
    min_temperature?: SortOrderInput | SortOrder
    max_temperature?: SortOrderInput | SortOrder
    min_moisture?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: IrrigationScheduleCountOrderByAggregateInput
    _avg?: IrrigationScheduleAvgOrderByAggregateInput
    _max?: IrrigationScheduleMaxOrderByAggregateInput
    _min?: IrrigationScheduleMinOrderByAggregateInput
    _sum?: IrrigationScheduleSumOrderByAggregateInput
  }

  export type IrrigationScheduleScalarWhereWithAggregatesInput = {
    AND?: IrrigationScheduleScalarWhereWithAggregatesInput | IrrigationScheduleScalarWhereWithAggregatesInput[]
    OR?: IrrigationScheduleScalarWhereWithAggregatesInput[]
    NOT?: IrrigationScheduleScalarWhereWithAggregatesInput | IrrigationScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IrrigationSchedule"> | string
    name?: StringWithAggregatesFilter<"IrrigationSchedule"> | string
    farm_id?: IntWithAggregatesFilter<"IrrigationSchedule"> | number
    section_numbers?: IntNullableListFilter<"IrrigationSchedule">
    start_time?: StringWithAggregatesFilter<"IrrigationSchedule"> | string
    duration_minutes?: IntWithAggregatesFilter<"IrrigationSchedule"> | number
    frequency?: StringWithAggregatesFilter<"IrrigationSchedule"> | string
    days_of_week?: IntNullableListFilter<"IrrigationSchedule">
    day_of_month?: IntNullableWithAggregatesFilter<"IrrigationSchedule"> | number | null
    is_active?: BoolWithAggregatesFilter<"IrrigationSchedule"> | boolean
    weather_dependent?: BoolWithAggregatesFilter<"IrrigationSchedule"> | boolean
    min_temperature?: FloatNullableWithAggregatesFilter<"IrrigationSchedule"> | number | null
    max_temperature?: FloatNullableWithAggregatesFilter<"IrrigationSchedule"> | number | null
    min_moisture?: IntNullableWithAggregatesFilter<"IrrigationSchedule"> | number | null
    created_by?: StringWithAggregatesFilter<"IrrigationSchedule"> | string
    created_at?: DateTimeWithAggregatesFilter<"IrrigationSchedule"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"IrrigationSchedule"> | Date | string
  }

  export type ScheduledIrrigationWhereInput = {
    AND?: ScheduledIrrigationWhereInput | ScheduledIrrigationWhereInput[]
    OR?: ScheduledIrrigationWhereInput[]
    NOT?: ScheduledIrrigationWhereInput | ScheduledIrrigationWhereInput[]
    id?: StringFilter<"ScheduledIrrigation"> | string
    schedule_id?: StringFilter<"ScheduledIrrigation"> | string
    farm_id?: IntFilter<"ScheduledIrrigation"> | number
    section_number?: IntFilter<"ScheduledIrrigation"> | number
    scheduled_time?: DateTimeFilter<"ScheduledIrrigation"> | Date | string
    executed_time?: DateTimeNullableFilter<"ScheduledIrrigation"> | Date | string | null
    status?: StringFilter<"ScheduledIrrigation"> | string
    skip_reason?: StringNullableFilter<"ScheduledIrrigation"> | string | null
    duration_minutes?: IntFilter<"ScheduledIrrigation"> | number
    water_used?: FloatNullableFilter<"ScheduledIrrigation"> | number | null
    created_at?: DateTimeFilter<"ScheduledIrrigation"> | Date | string
    schedule?: XOR<IrrigationScheduleRelationFilter, IrrigationScheduleWhereInput>
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }

  export type ScheduledIrrigationOrderByWithRelationInput = {
    id?: SortOrder
    schedule_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    scheduled_time?: SortOrder
    executed_time?: SortOrderInput | SortOrder
    status?: SortOrder
    skip_reason?: SortOrderInput | SortOrder
    duration_minutes?: SortOrder
    water_used?: SortOrderInput | SortOrder
    created_at?: SortOrder
    schedule?: IrrigationScheduleOrderByWithRelationInput
    farm?: FarmOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
  }

  export type ScheduledIrrigationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduledIrrigationWhereInput | ScheduledIrrigationWhereInput[]
    OR?: ScheduledIrrigationWhereInput[]
    NOT?: ScheduledIrrigationWhereInput | ScheduledIrrigationWhereInput[]
    schedule_id?: StringFilter<"ScheduledIrrigation"> | string
    farm_id?: IntFilter<"ScheduledIrrigation"> | number
    section_number?: IntFilter<"ScheduledIrrigation"> | number
    scheduled_time?: DateTimeFilter<"ScheduledIrrigation"> | Date | string
    executed_time?: DateTimeNullableFilter<"ScheduledIrrigation"> | Date | string | null
    status?: StringFilter<"ScheduledIrrigation"> | string
    skip_reason?: StringNullableFilter<"ScheduledIrrigation"> | string | null
    duration_minutes?: IntFilter<"ScheduledIrrigation"> | number
    water_used?: FloatNullableFilter<"ScheduledIrrigation"> | number | null
    created_at?: DateTimeFilter<"ScheduledIrrigation"> | Date | string
    schedule?: XOR<IrrigationScheduleRelationFilter, IrrigationScheduleWhereInput>
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    section?: XOR<SectionRelationFilter, SectionWhereInput>
  }, "id">

  export type ScheduledIrrigationOrderByWithAggregationInput = {
    id?: SortOrder
    schedule_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    scheduled_time?: SortOrder
    executed_time?: SortOrderInput | SortOrder
    status?: SortOrder
    skip_reason?: SortOrderInput | SortOrder
    duration_minutes?: SortOrder
    water_used?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: ScheduledIrrigationCountOrderByAggregateInput
    _avg?: ScheduledIrrigationAvgOrderByAggregateInput
    _max?: ScheduledIrrigationMaxOrderByAggregateInput
    _min?: ScheduledIrrigationMinOrderByAggregateInput
    _sum?: ScheduledIrrigationSumOrderByAggregateInput
  }

  export type ScheduledIrrigationScalarWhereWithAggregatesInput = {
    AND?: ScheduledIrrigationScalarWhereWithAggregatesInput | ScheduledIrrigationScalarWhereWithAggregatesInput[]
    OR?: ScheduledIrrigationScalarWhereWithAggregatesInput[]
    NOT?: ScheduledIrrigationScalarWhereWithAggregatesInput | ScheduledIrrigationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScheduledIrrigation"> | string
    schedule_id?: StringWithAggregatesFilter<"ScheduledIrrigation"> | string
    farm_id?: IntWithAggregatesFilter<"ScheduledIrrigation"> | number
    section_number?: IntWithAggregatesFilter<"ScheduledIrrigation"> | number
    scheduled_time?: DateTimeWithAggregatesFilter<"ScheduledIrrigation"> | Date | string
    executed_time?: DateTimeNullableWithAggregatesFilter<"ScheduledIrrigation"> | Date | string | null
    status?: StringWithAggregatesFilter<"ScheduledIrrigation"> | string
    skip_reason?: StringNullableWithAggregatesFilter<"ScheduledIrrigation"> | string | null
    duration_minutes?: IntWithAggregatesFilter<"ScheduledIrrigation"> | number
    water_used?: FloatNullableWithAggregatesFilter<"ScheduledIrrigation"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"ScheduledIrrigation"> | Date | string
  }

  export type FarmCreateInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmCreateManyInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FarmUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCreateInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutSectionsInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutSectionsNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionCreateManyInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    farm_ids?: UserCreatefarm_idsInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    farm_ids?: UserCreatefarm_idsInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    farm_ids?: UserUpdatefarm_idsInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    farm_ids?: UserUpdatefarm_idsInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    farm_ids?: UserCreatefarm_idsInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    farm_ids?: UserUpdatefarm_idsInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    farm_ids?: UserUpdatefarm_idsInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureReadingCreateInput = {
    value: number
    timestamp?: Date | string
    farm: FarmCreateNestedOneWithoutMoistureReadingsInput
    section: SectionCreateNestedOneWithoutMoistureReadingsInput
  }

  export type MoistureReadingUncheckedCreateInput = {
    id?: number
    farm_id: number
    section_number: number
    value: number
    timestamp?: Date | string
  }

  export type MoistureReadingUpdateInput = {
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutMoistureReadingsNestedInput
    section?: SectionUpdateOneRequiredWithoutMoistureReadingsNestedInput
  }

  export type MoistureReadingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureReadingCreateManyInput = {
    id?: number
    farm_id: number
    section_number: number
    value: number
    timestamp?: Date | string
  }

  export type MoistureReadingUpdateManyMutationInput = {
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureReadingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationEventCreateInput = {
    water_ml: number
    start_time: Date | string
    end_time: Date | string
    farm: FarmCreateNestedOneWithoutIrrigationEventsInput
    section: SectionCreateNestedOneWithoutIrrigationEventsInput
  }

  export type IrrigationEventUncheckedCreateInput = {
    id?: number
    farm_id: number
    section_number: number
    water_ml: number
    start_time: Date | string
    end_time: Date | string
  }

  export type IrrigationEventUpdateInput = {
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutIrrigationEventsNestedInput
    section?: SectionUpdateOneRequiredWithoutIrrigationEventsNestedInput
  }

  export type IrrigationEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationEventCreateManyInput = {
    id?: number
    farm_id: number
    section_number: number
    water_ml: number
    start_time: Date | string
    end_time: Date | string
  }

  export type IrrigationEventUpdateManyMutationInput = {
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureDeviceStatusCreateInput = {
    device_id: string
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutMoistureDeviceStatusesInput
    section: SectionCreateNestedOneWithoutMoistureDeviceStatusesInput
  }

  export type MoistureDeviceStatusUncheckedCreateInput = {
    id?: number
    device_id: string
    farm_id: number
    section_number: number
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
  }

  export type MoistureDeviceStatusUpdateInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutMoistureDeviceStatusesNestedInput
    section?: SectionUpdateOneRequiredWithoutMoistureDeviceStatusesNestedInput
  }

  export type MoistureDeviceStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureDeviceStatusCreateManyInput = {
    id?: number
    device_id: string
    farm_id: number
    section_number: number
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
  }

  export type MoistureDeviceStatusUpdateManyMutationInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureDeviceStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationDeviceStatusCreateInput = {
    device_id: string
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutIrrigationDeviceStatusesInput
    section: SectionCreateNestedOneWithoutIrrigationDeviceStatusesInput
  }

  export type IrrigationDeviceStatusUncheckedCreateInput = {
    id?: number
    device_id: string
    farm_id: number
    section_number: number
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type IrrigationDeviceStatusUpdateInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutIrrigationDeviceStatusesNestedInput
    section?: SectionUpdateOneRequiredWithoutIrrigationDeviceStatusesNestedInput
  }

  export type IrrigationDeviceStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationDeviceStatusCreateManyInput = {
    id?: number
    device_id: string
    farm_id: number
    section_number: number
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type IrrigationDeviceStatusUpdateManyMutationInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationDeviceStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceAckCreateInput = {
    device_id?: string | null
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    farm: FarmCreateNestedOneWithoutDeviceAcksInput
    section: SectionCreateNestedOneWithoutDeviceAcksInput
  }

  export type DeviceAckUncheckedCreateInput = {
    id?: number
    device_id?: string | null
    farm_id: number
    section_number: number
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type DeviceAckUpdateInput = {
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutDeviceAcksNestedInput
    section?: SectionUpdateOneRequiredWithoutDeviceAcksNestedInput
  }

  export type DeviceAckUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceAckCreateManyInput = {
    id?: number
    device_id?: string | null
    farm_id: number
    section_number: number
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type DeviceAckUpdateManyMutationInput = {
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceAckUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationScheduleCreateInput = {
    id?: string
    name: string
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    farm: FarmCreateNestedOneWithoutIrrigationSchedulesInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutScheduleInput
  }

  export type IrrigationScheduleUncheckedCreateInput = {
    id?: string
    name: string
    farm_id: number
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type IrrigationScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutIrrigationSchedulesNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutScheduleNestedInput
  }

  export type IrrigationScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type IrrigationScheduleCreateManyInput = {
    id?: string
    name: string
    farm_id: number
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IrrigationScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationCreateInput = {
    id?: string
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
    schedule: IrrigationScheduleCreateNestedOneWithoutScheduledIrrigationsInput
    farm: FarmCreateNestedOneWithoutScheduledIrrigationsInput
    section: SectionCreateNestedOneWithoutScheduledIrrigationsInput
  }

  export type ScheduledIrrigationUncheckedCreateInput = {
    id?: string
    schedule_id: string
    farm_id: number
    section_number: number
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type ScheduledIrrigationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule?: IrrigationScheduleUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
    farm?: FarmUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
    section?: SectionUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
  }

  export type ScheduledIrrigationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule_id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationCreateManyInput = {
    id?: string
    schedule_id: string
    farm_id: number
    section_number: number
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type ScheduledIrrigationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule_id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SectionListRelationFilter = {
    every?: SectionWhereInput
    some?: SectionWhereInput
    none?: SectionWhereInput
  }

  export type MoistureReadingListRelationFilter = {
    every?: MoistureReadingWhereInput
    some?: MoistureReadingWhereInput
    none?: MoistureReadingWhereInput
  }

  export type IrrigationEventListRelationFilter = {
    every?: IrrigationEventWhereInput
    some?: IrrigationEventWhereInput
    none?: IrrigationEventWhereInput
  }

  export type MoistureDeviceStatusListRelationFilter = {
    every?: MoistureDeviceStatusWhereInput
    some?: MoistureDeviceStatusWhereInput
    none?: MoistureDeviceStatusWhereInput
  }

  export type IrrigationDeviceStatusListRelationFilter = {
    every?: IrrigationDeviceStatusWhereInput
    some?: IrrigationDeviceStatusWhereInput
    none?: IrrigationDeviceStatusWhereInput
  }

  export type DeviceAckListRelationFilter = {
    every?: DeviceAckWhereInput
    some?: DeviceAckWhereInput
    none?: DeviceAckWhereInput
  }

  export type IrrigationScheduleListRelationFilter = {
    every?: IrrigationScheduleWhereInput
    some?: IrrigationScheduleWhereInput
    none?: IrrigationScheduleWhereInput
  }

  export type ScheduledIrrigationListRelationFilter = {
    every?: ScheduledIrrigationWhereInput
    some?: ScheduledIrrigationWhereInput
    none?: ScheduledIrrigationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MoistureReadingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IrrigationEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MoistureDeviceStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IrrigationDeviceStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceAckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IrrigationScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduledIrrigationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FarmRelationFilter = {
    is?: FarmWhereInput
    isNot?: FarmWhereInput
  }

  export type SectionFarm_section_number_uniqueCompoundUniqueInput = {
    farm_id: number
    section_number: number
  }

  export type SectionFarm_section_name_uniqueCompoundUniqueInput = {
    farm_id: number
    name: string
  }

  export type SectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionAvgOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
  }

  export type SectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionSumOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    farm_ids?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    farm_ids?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    farm_ids?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SectionRelationFilter = {
    is?: SectionWhereInput
    isNot?: SectionWhereInput
  }

  export type MoistureReadingCountOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
  }

  export type MoistureReadingAvgOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    value?: SortOrder
  }

  export type MoistureReadingMaxOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
  }

  export type MoistureReadingMinOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    value?: SortOrder
    timestamp?: SortOrder
  }

  export type MoistureReadingSumOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IrrigationEventCountOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    water_ml?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
  }

  export type IrrigationEventAvgOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    water_ml?: SortOrder
  }

  export type IrrigationEventMaxOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    water_ml?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
  }

  export type IrrigationEventMinOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    water_ml?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
  }

  export type IrrigationEventSumOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    water_ml?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type MoistureDeviceStatusCountOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    mqtt?: SortOrder
    wifi?: SortOrder
    uptime?: SortOrder
    timestamp?: SortOrder
    last_error?: SortOrder
    enable_deep_sleep?: SortOrder
    reporting_interval?: SortOrder
    deep_sleep_duration?: SortOrder
    createdAt?: SortOrder
  }

  export type MoistureDeviceStatusAvgOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    reporting_interval?: SortOrder
    deep_sleep_duration?: SortOrder
  }

  export type MoistureDeviceStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    mqtt?: SortOrder
    wifi?: SortOrder
    uptime?: SortOrder
    timestamp?: SortOrder
    last_error?: SortOrder
    enable_deep_sleep?: SortOrder
    reporting_interval?: SortOrder
    deep_sleep_duration?: SortOrder
    createdAt?: SortOrder
  }

  export type MoistureDeviceStatusMinOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    mqtt?: SortOrder
    wifi?: SortOrder
    uptime?: SortOrder
    timestamp?: SortOrder
    last_error?: SortOrder
    enable_deep_sleep?: SortOrder
    reporting_interval?: SortOrder
    deep_sleep_duration?: SortOrder
    createdAt?: SortOrder
  }

  export type MoistureDeviceStatusSumOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    reporting_interval?: SortOrder
    deep_sleep_duration?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IrrigationDeviceStatusCountOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    wifi?: SortOrder
    mqtt?: SortOrder
    last_error?: SortOrder
    valve_on?: SortOrder
    mode?: SortOrder
    latest_moisture?: SortOrder
    min_threshold?: SortOrder
    max_threshold?: SortOrder
    pulse_count?: SortOrder
    water_ml?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type IrrigationDeviceStatusAvgOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    wifi?: SortOrder
    mqtt?: SortOrder
    valve_on?: SortOrder
    latest_moisture?: SortOrder
    min_threshold?: SortOrder
    max_threshold?: SortOrder
    pulse_count?: SortOrder
    water_ml?: SortOrder
  }

  export type IrrigationDeviceStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    wifi?: SortOrder
    mqtt?: SortOrder
    last_error?: SortOrder
    valve_on?: SortOrder
    mode?: SortOrder
    latest_moisture?: SortOrder
    min_threshold?: SortOrder
    max_threshold?: SortOrder
    pulse_count?: SortOrder
    water_ml?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type IrrigationDeviceStatusMinOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    wifi?: SortOrder
    mqtt?: SortOrder
    last_error?: SortOrder
    valve_on?: SortOrder
    mode?: SortOrder
    latest_moisture?: SortOrder
    min_threshold?: SortOrder
    max_threshold?: SortOrder
    pulse_count?: SortOrder
    water_ml?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type IrrigationDeviceStatusSumOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    uptime?: SortOrder
    wifi?: SortOrder
    mqtt?: SortOrder
    valve_on?: SortOrder
    latest_moisture?: SortOrder
    min_threshold?: SortOrder
    max_threshold?: SortOrder
    pulse_count?: SortOrder
    water_ml?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DeviceAckCountOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    ack_json?: SortOrder
    timestamp?: SortOrder
  }

  export type DeviceAckAvgOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
  }

  export type DeviceAckMaxOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    timestamp?: SortOrder
  }

  export type DeviceAckMinOrderByAggregateInput = {
    id?: SortOrder
    device_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    timestamp?: SortOrder
  }

  export type DeviceAckSumOrderByAggregateInput = {
    id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IrrigationScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    section_numbers?: SortOrder
    start_time?: SortOrder
    duration_minutes?: SortOrder
    frequency?: SortOrder
    days_of_week?: SortOrder
    day_of_month?: SortOrder
    is_active?: SortOrder
    weather_dependent?: SortOrder
    min_temperature?: SortOrder
    max_temperature?: SortOrder
    min_moisture?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IrrigationScheduleAvgOrderByAggregateInput = {
    farm_id?: SortOrder
    section_numbers?: SortOrder
    duration_minutes?: SortOrder
    days_of_week?: SortOrder
    day_of_month?: SortOrder
    min_temperature?: SortOrder
    max_temperature?: SortOrder
    min_moisture?: SortOrder
  }

  export type IrrigationScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    start_time?: SortOrder
    duration_minutes?: SortOrder
    frequency?: SortOrder
    day_of_month?: SortOrder
    is_active?: SortOrder
    weather_dependent?: SortOrder
    min_temperature?: SortOrder
    max_temperature?: SortOrder
    min_moisture?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IrrigationScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    farm_id?: SortOrder
    start_time?: SortOrder
    duration_minutes?: SortOrder
    frequency?: SortOrder
    day_of_month?: SortOrder
    is_active?: SortOrder
    weather_dependent?: SortOrder
    min_temperature?: SortOrder
    max_temperature?: SortOrder
    min_moisture?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IrrigationScheduleSumOrderByAggregateInput = {
    farm_id?: SortOrder
    section_numbers?: SortOrder
    duration_minutes?: SortOrder
    days_of_week?: SortOrder
    day_of_month?: SortOrder
    min_temperature?: SortOrder
    max_temperature?: SortOrder
    min_moisture?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IrrigationScheduleRelationFilter = {
    is?: IrrigationScheduleWhereInput
    isNot?: IrrigationScheduleWhereInput
  }

  export type ScheduledIrrigationCountOrderByAggregateInput = {
    id?: SortOrder
    schedule_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    scheduled_time?: SortOrder
    executed_time?: SortOrder
    status?: SortOrder
    skip_reason?: SortOrder
    duration_minutes?: SortOrder
    water_used?: SortOrder
    created_at?: SortOrder
  }

  export type ScheduledIrrigationAvgOrderByAggregateInput = {
    farm_id?: SortOrder
    section_number?: SortOrder
    duration_minutes?: SortOrder
    water_used?: SortOrder
  }

  export type ScheduledIrrigationMaxOrderByAggregateInput = {
    id?: SortOrder
    schedule_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    scheduled_time?: SortOrder
    executed_time?: SortOrder
    status?: SortOrder
    skip_reason?: SortOrder
    duration_minutes?: SortOrder
    water_used?: SortOrder
    created_at?: SortOrder
  }

  export type ScheduledIrrigationMinOrderByAggregateInput = {
    id?: SortOrder
    schedule_id?: SortOrder
    farm_id?: SortOrder
    section_number?: SortOrder
    scheduled_time?: SortOrder
    executed_time?: SortOrder
    status?: SortOrder
    skip_reason?: SortOrder
    duration_minutes?: SortOrder
    water_used?: SortOrder
    created_at?: SortOrder
  }

  export type ScheduledIrrigationSumOrderByAggregateInput = {
    farm_id?: SortOrder
    section_number?: SortOrder
    duration_minutes?: SortOrder
    water_used?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SectionCreateNestedManyWithoutFarmInput = {
    create?: XOR<SectionCreateWithoutFarmInput, SectionUncheckedCreateWithoutFarmInput> | SectionCreateWithoutFarmInput[] | SectionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutFarmInput | SectionCreateOrConnectWithoutFarmInput[]
    createMany?: SectionCreateManyFarmInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type MoistureReadingCreateNestedManyWithoutFarmInput = {
    create?: XOR<MoistureReadingCreateWithoutFarmInput, MoistureReadingUncheckedCreateWithoutFarmInput> | MoistureReadingCreateWithoutFarmInput[] | MoistureReadingUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutFarmInput | MoistureReadingCreateOrConnectWithoutFarmInput[]
    createMany?: MoistureReadingCreateManyFarmInputEnvelope
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
  }

  export type IrrigationEventCreateNestedManyWithoutFarmInput = {
    create?: XOR<IrrigationEventCreateWithoutFarmInput, IrrigationEventUncheckedCreateWithoutFarmInput> | IrrigationEventCreateWithoutFarmInput[] | IrrigationEventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutFarmInput | IrrigationEventCreateOrConnectWithoutFarmInput[]
    createMany?: IrrigationEventCreateManyFarmInputEnvelope
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
  }

  export type MoistureDeviceStatusCreateNestedManyWithoutFarmInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutFarmInput, MoistureDeviceStatusUncheckedCreateWithoutFarmInput> | MoistureDeviceStatusCreateWithoutFarmInput[] | MoistureDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutFarmInput | MoistureDeviceStatusCreateOrConnectWithoutFarmInput[]
    createMany?: MoistureDeviceStatusCreateManyFarmInputEnvelope
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
  }

  export type IrrigationDeviceStatusCreateNestedManyWithoutFarmInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutFarmInput, IrrigationDeviceStatusUncheckedCreateWithoutFarmInput> | IrrigationDeviceStatusCreateWithoutFarmInput[] | IrrigationDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutFarmInput | IrrigationDeviceStatusCreateOrConnectWithoutFarmInput[]
    createMany?: IrrigationDeviceStatusCreateManyFarmInputEnvelope
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
  }

  export type DeviceAckCreateNestedManyWithoutFarmInput = {
    create?: XOR<DeviceAckCreateWithoutFarmInput, DeviceAckUncheckedCreateWithoutFarmInput> | DeviceAckCreateWithoutFarmInput[] | DeviceAckUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutFarmInput | DeviceAckCreateOrConnectWithoutFarmInput[]
    createMany?: DeviceAckCreateManyFarmInputEnvelope
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
  }

  export type IrrigationScheduleCreateNestedManyWithoutFarmInput = {
    create?: XOR<IrrigationScheduleCreateWithoutFarmInput, IrrigationScheduleUncheckedCreateWithoutFarmInput> | IrrigationScheduleCreateWithoutFarmInput[] | IrrigationScheduleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationScheduleCreateOrConnectWithoutFarmInput | IrrigationScheduleCreateOrConnectWithoutFarmInput[]
    createMany?: IrrigationScheduleCreateManyFarmInputEnvelope
    connect?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
  }

  export type ScheduledIrrigationCreateNestedManyWithoutFarmInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutFarmInput, ScheduledIrrigationUncheckedCreateWithoutFarmInput> | ScheduledIrrigationCreateWithoutFarmInput[] | ScheduledIrrigationUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutFarmInput | ScheduledIrrigationCreateOrConnectWithoutFarmInput[]
    createMany?: ScheduledIrrigationCreateManyFarmInputEnvelope
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
  }

  export type SectionUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<SectionCreateWithoutFarmInput, SectionUncheckedCreateWithoutFarmInput> | SectionCreateWithoutFarmInput[] | SectionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutFarmInput | SectionCreateOrConnectWithoutFarmInput[]
    createMany?: SectionCreateManyFarmInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type MoistureReadingUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<MoistureReadingCreateWithoutFarmInput, MoistureReadingUncheckedCreateWithoutFarmInput> | MoistureReadingCreateWithoutFarmInput[] | MoistureReadingUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutFarmInput | MoistureReadingCreateOrConnectWithoutFarmInput[]
    createMany?: MoistureReadingCreateManyFarmInputEnvelope
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
  }

  export type IrrigationEventUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<IrrigationEventCreateWithoutFarmInput, IrrigationEventUncheckedCreateWithoutFarmInput> | IrrigationEventCreateWithoutFarmInput[] | IrrigationEventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutFarmInput | IrrigationEventCreateOrConnectWithoutFarmInput[]
    createMany?: IrrigationEventCreateManyFarmInputEnvelope
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
  }

  export type MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutFarmInput, MoistureDeviceStatusUncheckedCreateWithoutFarmInput> | MoistureDeviceStatusCreateWithoutFarmInput[] | MoistureDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutFarmInput | MoistureDeviceStatusCreateOrConnectWithoutFarmInput[]
    createMany?: MoistureDeviceStatusCreateManyFarmInputEnvelope
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
  }

  export type IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutFarmInput, IrrigationDeviceStatusUncheckedCreateWithoutFarmInput> | IrrigationDeviceStatusCreateWithoutFarmInput[] | IrrigationDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutFarmInput | IrrigationDeviceStatusCreateOrConnectWithoutFarmInput[]
    createMany?: IrrigationDeviceStatusCreateManyFarmInputEnvelope
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
  }

  export type DeviceAckUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<DeviceAckCreateWithoutFarmInput, DeviceAckUncheckedCreateWithoutFarmInput> | DeviceAckCreateWithoutFarmInput[] | DeviceAckUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutFarmInput | DeviceAckCreateOrConnectWithoutFarmInput[]
    createMany?: DeviceAckCreateManyFarmInputEnvelope
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
  }

  export type IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<IrrigationScheduleCreateWithoutFarmInput, IrrigationScheduleUncheckedCreateWithoutFarmInput> | IrrigationScheduleCreateWithoutFarmInput[] | IrrigationScheduleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationScheduleCreateOrConnectWithoutFarmInput | IrrigationScheduleCreateOrConnectWithoutFarmInput[]
    createMany?: IrrigationScheduleCreateManyFarmInputEnvelope
    connect?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
  }

  export type ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutFarmInput, ScheduledIrrigationUncheckedCreateWithoutFarmInput> | ScheduledIrrigationCreateWithoutFarmInput[] | ScheduledIrrigationUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutFarmInput | ScheduledIrrigationCreateOrConnectWithoutFarmInput[]
    createMany?: ScheduledIrrigationCreateManyFarmInputEnvelope
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SectionUpdateManyWithoutFarmNestedInput = {
    create?: XOR<SectionCreateWithoutFarmInput, SectionUncheckedCreateWithoutFarmInput> | SectionCreateWithoutFarmInput[] | SectionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutFarmInput | SectionCreateOrConnectWithoutFarmInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutFarmInput | SectionUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: SectionCreateManyFarmInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutFarmInput | SectionUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutFarmInput | SectionUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type MoistureReadingUpdateManyWithoutFarmNestedInput = {
    create?: XOR<MoistureReadingCreateWithoutFarmInput, MoistureReadingUncheckedCreateWithoutFarmInput> | MoistureReadingCreateWithoutFarmInput[] | MoistureReadingUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutFarmInput | MoistureReadingCreateOrConnectWithoutFarmInput[]
    upsert?: MoistureReadingUpsertWithWhereUniqueWithoutFarmInput | MoistureReadingUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: MoistureReadingCreateManyFarmInputEnvelope
    set?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    disconnect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    delete?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    update?: MoistureReadingUpdateWithWhereUniqueWithoutFarmInput | MoistureReadingUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: MoistureReadingUpdateManyWithWhereWithoutFarmInput | MoistureReadingUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: MoistureReadingScalarWhereInput | MoistureReadingScalarWhereInput[]
  }

  export type IrrigationEventUpdateManyWithoutFarmNestedInput = {
    create?: XOR<IrrigationEventCreateWithoutFarmInput, IrrigationEventUncheckedCreateWithoutFarmInput> | IrrigationEventCreateWithoutFarmInput[] | IrrigationEventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutFarmInput | IrrigationEventCreateOrConnectWithoutFarmInput[]
    upsert?: IrrigationEventUpsertWithWhereUniqueWithoutFarmInput | IrrigationEventUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: IrrigationEventCreateManyFarmInputEnvelope
    set?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    disconnect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    delete?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    update?: IrrigationEventUpdateWithWhereUniqueWithoutFarmInput | IrrigationEventUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: IrrigationEventUpdateManyWithWhereWithoutFarmInput | IrrigationEventUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: IrrigationEventScalarWhereInput | IrrigationEventScalarWhereInput[]
  }

  export type MoistureDeviceStatusUpdateManyWithoutFarmNestedInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutFarmInput, MoistureDeviceStatusUncheckedCreateWithoutFarmInput> | MoistureDeviceStatusCreateWithoutFarmInput[] | MoistureDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutFarmInput | MoistureDeviceStatusCreateOrConnectWithoutFarmInput[]
    upsert?: MoistureDeviceStatusUpsertWithWhereUniqueWithoutFarmInput | MoistureDeviceStatusUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: MoistureDeviceStatusCreateManyFarmInputEnvelope
    set?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    disconnect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    delete?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    update?: MoistureDeviceStatusUpdateWithWhereUniqueWithoutFarmInput | MoistureDeviceStatusUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: MoistureDeviceStatusUpdateManyWithWhereWithoutFarmInput | MoistureDeviceStatusUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: MoistureDeviceStatusScalarWhereInput | MoistureDeviceStatusScalarWhereInput[]
  }

  export type IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutFarmInput, IrrigationDeviceStatusUncheckedCreateWithoutFarmInput> | IrrigationDeviceStatusCreateWithoutFarmInput[] | IrrigationDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutFarmInput | IrrigationDeviceStatusCreateOrConnectWithoutFarmInput[]
    upsert?: IrrigationDeviceStatusUpsertWithWhereUniqueWithoutFarmInput | IrrigationDeviceStatusUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: IrrigationDeviceStatusCreateManyFarmInputEnvelope
    set?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    disconnect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    delete?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    update?: IrrigationDeviceStatusUpdateWithWhereUniqueWithoutFarmInput | IrrigationDeviceStatusUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: IrrigationDeviceStatusUpdateManyWithWhereWithoutFarmInput | IrrigationDeviceStatusUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: IrrigationDeviceStatusScalarWhereInput | IrrigationDeviceStatusScalarWhereInput[]
  }

  export type DeviceAckUpdateManyWithoutFarmNestedInput = {
    create?: XOR<DeviceAckCreateWithoutFarmInput, DeviceAckUncheckedCreateWithoutFarmInput> | DeviceAckCreateWithoutFarmInput[] | DeviceAckUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutFarmInput | DeviceAckCreateOrConnectWithoutFarmInput[]
    upsert?: DeviceAckUpsertWithWhereUniqueWithoutFarmInput | DeviceAckUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: DeviceAckCreateManyFarmInputEnvelope
    set?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    disconnect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    delete?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    update?: DeviceAckUpdateWithWhereUniqueWithoutFarmInput | DeviceAckUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: DeviceAckUpdateManyWithWhereWithoutFarmInput | DeviceAckUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: DeviceAckScalarWhereInput | DeviceAckScalarWhereInput[]
  }

  export type IrrigationScheduleUpdateManyWithoutFarmNestedInput = {
    create?: XOR<IrrigationScheduleCreateWithoutFarmInput, IrrigationScheduleUncheckedCreateWithoutFarmInput> | IrrigationScheduleCreateWithoutFarmInput[] | IrrigationScheduleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationScheduleCreateOrConnectWithoutFarmInput | IrrigationScheduleCreateOrConnectWithoutFarmInput[]
    upsert?: IrrigationScheduleUpsertWithWhereUniqueWithoutFarmInput | IrrigationScheduleUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: IrrigationScheduleCreateManyFarmInputEnvelope
    set?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    disconnect?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    delete?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    connect?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    update?: IrrigationScheduleUpdateWithWhereUniqueWithoutFarmInput | IrrigationScheduleUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: IrrigationScheduleUpdateManyWithWhereWithoutFarmInput | IrrigationScheduleUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: IrrigationScheduleScalarWhereInput | IrrigationScheduleScalarWhereInput[]
  }

  export type ScheduledIrrigationUpdateManyWithoutFarmNestedInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutFarmInput, ScheduledIrrigationUncheckedCreateWithoutFarmInput> | ScheduledIrrigationCreateWithoutFarmInput[] | ScheduledIrrigationUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutFarmInput | ScheduledIrrigationCreateOrConnectWithoutFarmInput[]
    upsert?: ScheduledIrrigationUpsertWithWhereUniqueWithoutFarmInput | ScheduledIrrigationUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: ScheduledIrrigationCreateManyFarmInputEnvelope
    set?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    disconnect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    delete?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    update?: ScheduledIrrigationUpdateWithWhereUniqueWithoutFarmInput | ScheduledIrrigationUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: ScheduledIrrigationUpdateManyWithWhereWithoutFarmInput | ScheduledIrrigationUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SectionUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<SectionCreateWithoutFarmInput, SectionUncheckedCreateWithoutFarmInput> | SectionCreateWithoutFarmInput[] | SectionUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutFarmInput | SectionCreateOrConnectWithoutFarmInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutFarmInput | SectionUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: SectionCreateManyFarmInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutFarmInput | SectionUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutFarmInput | SectionUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<MoistureReadingCreateWithoutFarmInput, MoistureReadingUncheckedCreateWithoutFarmInput> | MoistureReadingCreateWithoutFarmInput[] | MoistureReadingUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutFarmInput | MoistureReadingCreateOrConnectWithoutFarmInput[]
    upsert?: MoistureReadingUpsertWithWhereUniqueWithoutFarmInput | MoistureReadingUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: MoistureReadingCreateManyFarmInputEnvelope
    set?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    disconnect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    delete?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    update?: MoistureReadingUpdateWithWhereUniqueWithoutFarmInput | MoistureReadingUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: MoistureReadingUpdateManyWithWhereWithoutFarmInput | MoistureReadingUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: MoistureReadingScalarWhereInput | MoistureReadingScalarWhereInput[]
  }

  export type IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<IrrigationEventCreateWithoutFarmInput, IrrigationEventUncheckedCreateWithoutFarmInput> | IrrigationEventCreateWithoutFarmInput[] | IrrigationEventUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutFarmInput | IrrigationEventCreateOrConnectWithoutFarmInput[]
    upsert?: IrrigationEventUpsertWithWhereUniqueWithoutFarmInput | IrrigationEventUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: IrrigationEventCreateManyFarmInputEnvelope
    set?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    disconnect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    delete?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    update?: IrrigationEventUpdateWithWhereUniqueWithoutFarmInput | IrrigationEventUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: IrrigationEventUpdateManyWithWhereWithoutFarmInput | IrrigationEventUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: IrrigationEventScalarWhereInput | IrrigationEventScalarWhereInput[]
  }

  export type MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutFarmInput, MoistureDeviceStatusUncheckedCreateWithoutFarmInput> | MoistureDeviceStatusCreateWithoutFarmInput[] | MoistureDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutFarmInput | MoistureDeviceStatusCreateOrConnectWithoutFarmInput[]
    upsert?: MoistureDeviceStatusUpsertWithWhereUniqueWithoutFarmInput | MoistureDeviceStatusUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: MoistureDeviceStatusCreateManyFarmInputEnvelope
    set?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    disconnect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    delete?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    update?: MoistureDeviceStatusUpdateWithWhereUniqueWithoutFarmInput | MoistureDeviceStatusUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: MoistureDeviceStatusUpdateManyWithWhereWithoutFarmInput | MoistureDeviceStatusUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: MoistureDeviceStatusScalarWhereInput | MoistureDeviceStatusScalarWhereInput[]
  }

  export type IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutFarmInput, IrrigationDeviceStatusUncheckedCreateWithoutFarmInput> | IrrigationDeviceStatusCreateWithoutFarmInput[] | IrrigationDeviceStatusUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutFarmInput | IrrigationDeviceStatusCreateOrConnectWithoutFarmInput[]
    upsert?: IrrigationDeviceStatusUpsertWithWhereUniqueWithoutFarmInput | IrrigationDeviceStatusUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: IrrigationDeviceStatusCreateManyFarmInputEnvelope
    set?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    disconnect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    delete?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    update?: IrrigationDeviceStatusUpdateWithWhereUniqueWithoutFarmInput | IrrigationDeviceStatusUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: IrrigationDeviceStatusUpdateManyWithWhereWithoutFarmInput | IrrigationDeviceStatusUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: IrrigationDeviceStatusScalarWhereInput | IrrigationDeviceStatusScalarWhereInput[]
  }

  export type DeviceAckUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<DeviceAckCreateWithoutFarmInput, DeviceAckUncheckedCreateWithoutFarmInput> | DeviceAckCreateWithoutFarmInput[] | DeviceAckUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutFarmInput | DeviceAckCreateOrConnectWithoutFarmInput[]
    upsert?: DeviceAckUpsertWithWhereUniqueWithoutFarmInput | DeviceAckUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: DeviceAckCreateManyFarmInputEnvelope
    set?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    disconnect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    delete?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    update?: DeviceAckUpdateWithWhereUniqueWithoutFarmInput | DeviceAckUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: DeviceAckUpdateManyWithWhereWithoutFarmInput | DeviceAckUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: DeviceAckScalarWhereInput | DeviceAckScalarWhereInput[]
  }

  export type IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<IrrigationScheduleCreateWithoutFarmInput, IrrigationScheduleUncheckedCreateWithoutFarmInput> | IrrigationScheduleCreateWithoutFarmInput[] | IrrigationScheduleUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: IrrigationScheduleCreateOrConnectWithoutFarmInput | IrrigationScheduleCreateOrConnectWithoutFarmInput[]
    upsert?: IrrigationScheduleUpsertWithWhereUniqueWithoutFarmInput | IrrigationScheduleUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: IrrigationScheduleCreateManyFarmInputEnvelope
    set?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    disconnect?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    delete?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    connect?: IrrigationScheduleWhereUniqueInput | IrrigationScheduleWhereUniqueInput[]
    update?: IrrigationScheduleUpdateWithWhereUniqueWithoutFarmInput | IrrigationScheduleUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: IrrigationScheduleUpdateManyWithWhereWithoutFarmInput | IrrigationScheduleUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: IrrigationScheduleScalarWhereInput | IrrigationScheduleScalarWhereInput[]
  }

  export type ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutFarmInput, ScheduledIrrigationUncheckedCreateWithoutFarmInput> | ScheduledIrrigationCreateWithoutFarmInput[] | ScheduledIrrigationUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutFarmInput | ScheduledIrrigationCreateOrConnectWithoutFarmInput[]
    upsert?: ScheduledIrrigationUpsertWithWhereUniqueWithoutFarmInput | ScheduledIrrigationUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: ScheduledIrrigationCreateManyFarmInputEnvelope
    set?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    disconnect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    delete?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    update?: ScheduledIrrigationUpdateWithWhereUniqueWithoutFarmInput | ScheduledIrrigationUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: ScheduledIrrigationUpdateManyWithWhereWithoutFarmInput | ScheduledIrrigationUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
  }

  export type FarmCreateNestedOneWithoutSectionsInput = {
    create?: XOR<FarmCreateWithoutSectionsInput, FarmUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutSectionsInput
    connect?: FarmWhereUniqueInput
  }

  export type MoistureReadingCreateNestedManyWithoutSectionInput = {
    create?: XOR<MoistureReadingCreateWithoutSectionInput, MoistureReadingUncheckedCreateWithoutSectionInput> | MoistureReadingCreateWithoutSectionInput[] | MoistureReadingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutSectionInput | MoistureReadingCreateOrConnectWithoutSectionInput[]
    createMany?: MoistureReadingCreateManySectionInputEnvelope
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
  }

  export type IrrigationEventCreateNestedManyWithoutSectionInput = {
    create?: XOR<IrrigationEventCreateWithoutSectionInput, IrrigationEventUncheckedCreateWithoutSectionInput> | IrrigationEventCreateWithoutSectionInput[] | IrrigationEventUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutSectionInput | IrrigationEventCreateOrConnectWithoutSectionInput[]
    createMany?: IrrigationEventCreateManySectionInputEnvelope
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
  }

  export type MoistureDeviceStatusCreateNestedManyWithoutSectionInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutSectionInput, MoistureDeviceStatusUncheckedCreateWithoutSectionInput> | MoistureDeviceStatusCreateWithoutSectionInput[] | MoistureDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutSectionInput | MoistureDeviceStatusCreateOrConnectWithoutSectionInput[]
    createMany?: MoistureDeviceStatusCreateManySectionInputEnvelope
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
  }

  export type IrrigationDeviceStatusCreateNestedManyWithoutSectionInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutSectionInput, IrrigationDeviceStatusUncheckedCreateWithoutSectionInput> | IrrigationDeviceStatusCreateWithoutSectionInput[] | IrrigationDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutSectionInput | IrrigationDeviceStatusCreateOrConnectWithoutSectionInput[]
    createMany?: IrrigationDeviceStatusCreateManySectionInputEnvelope
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
  }

  export type DeviceAckCreateNestedManyWithoutSectionInput = {
    create?: XOR<DeviceAckCreateWithoutSectionInput, DeviceAckUncheckedCreateWithoutSectionInput> | DeviceAckCreateWithoutSectionInput[] | DeviceAckUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutSectionInput | DeviceAckCreateOrConnectWithoutSectionInput[]
    createMany?: DeviceAckCreateManySectionInputEnvelope
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
  }

  export type ScheduledIrrigationCreateNestedManyWithoutSectionInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutSectionInput, ScheduledIrrigationUncheckedCreateWithoutSectionInput> | ScheduledIrrigationCreateWithoutSectionInput[] | ScheduledIrrigationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutSectionInput | ScheduledIrrigationCreateOrConnectWithoutSectionInput[]
    createMany?: ScheduledIrrigationCreateManySectionInputEnvelope
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
  }

  export type MoistureReadingUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<MoistureReadingCreateWithoutSectionInput, MoistureReadingUncheckedCreateWithoutSectionInput> | MoistureReadingCreateWithoutSectionInput[] | MoistureReadingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutSectionInput | MoistureReadingCreateOrConnectWithoutSectionInput[]
    createMany?: MoistureReadingCreateManySectionInputEnvelope
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
  }

  export type IrrigationEventUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<IrrigationEventCreateWithoutSectionInput, IrrigationEventUncheckedCreateWithoutSectionInput> | IrrigationEventCreateWithoutSectionInput[] | IrrigationEventUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutSectionInput | IrrigationEventCreateOrConnectWithoutSectionInput[]
    createMany?: IrrigationEventCreateManySectionInputEnvelope
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
  }

  export type MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutSectionInput, MoistureDeviceStatusUncheckedCreateWithoutSectionInput> | MoistureDeviceStatusCreateWithoutSectionInput[] | MoistureDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutSectionInput | MoistureDeviceStatusCreateOrConnectWithoutSectionInput[]
    createMany?: MoistureDeviceStatusCreateManySectionInputEnvelope
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
  }

  export type IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutSectionInput, IrrigationDeviceStatusUncheckedCreateWithoutSectionInput> | IrrigationDeviceStatusCreateWithoutSectionInput[] | IrrigationDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutSectionInput | IrrigationDeviceStatusCreateOrConnectWithoutSectionInput[]
    createMany?: IrrigationDeviceStatusCreateManySectionInputEnvelope
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
  }

  export type DeviceAckUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<DeviceAckCreateWithoutSectionInput, DeviceAckUncheckedCreateWithoutSectionInput> | DeviceAckCreateWithoutSectionInput[] | DeviceAckUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutSectionInput | DeviceAckCreateOrConnectWithoutSectionInput[]
    createMany?: DeviceAckCreateManySectionInputEnvelope
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
  }

  export type ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutSectionInput, ScheduledIrrigationUncheckedCreateWithoutSectionInput> | ScheduledIrrigationCreateWithoutSectionInput[] | ScheduledIrrigationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutSectionInput | ScheduledIrrigationCreateOrConnectWithoutSectionInput[]
    createMany?: ScheduledIrrigationCreateManySectionInputEnvelope
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
  }

  export type FarmUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<FarmCreateWithoutSectionsInput, FarmUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutSectionsInput
    upsert?: FarmUpsertWithoutSectionsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutSectionsInput, FarmUpdateWithoutSectionsInput>, FarmUncheckedUpdateWithoutSectionsInput>
  }

  export type MoistureReadingUpdateManyWithoutSectionNestedInput = {
    create?: XOR<MoistureReadingCreateWithoutSectionInput, MoistureReadingUncheckedCreateWithoutSectionInput> | MoistureReadingCreateWithoutSectionInput[] | MoistureReadingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutSectionInput | MoistureReadingCreateOrConnectWithoutSectionInput[]
    upsert?: MoistureReadingUpsertWithWhereUniqueWithoutSectionInput | MoistureReadingUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: MoistureReadingCreateManySectionInputEnvelope
    set?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    disconnect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    delete?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    update?: MoistureReadingUpdateWithWhereUniqueWithoutSectionInput | MoistureReadingUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: MoistureReadingUpdateManyWithWhereWithoutSectionInput | MoistureReadingUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: MoistureReadingScalarWhereInput | MoistureReadingScalarWhereInput[]
  }

  export type IrrigationEventUpdateManyWithoutSectionNestedInput = {
    create?: XOR<IrrigationEventCreateWithoutSectionInput, IrrigationEventUncheckedCreateWithoutSectionInput> | IrrigationEventCreateWithoutSectionInput[] | IrrigationEventUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutSectionInput | IrrigationEventCreateOrConnectWithoutSectionInput[]
    upsert?: IrrigationEventUpsertWithWhereUniqueWithoutSectionInput | IrrigationEventUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: IrrigationEventCreateManySectionInputEnvelope
    set?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    disconnect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    delete?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    update?: IrrigationEventUpdateWithWhereUniqueWithoutSectionInput | IrrigationEventUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: IrrigationEventUpdateManyWithWhereWithoutSectionInput | IrrigationEventUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: IrrigationEventScalarWhereInput | IrrigationEventScalarWhereInput[]
  }

  export type MoistureDeviceStatusUpdateManyWithoutSectionNestedInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutSectionInput, MoistureDeviceStatusUncheckedCreateWithoutSectionInput> | MoistureDeviceStatusCreateWithoutSectionInput[] | MoistureDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutSectionInput | MoistureDeviceStatusCreateOrConnectWithoutSectionInput[]
    upsert?: MoistureDeviceStatusUpsertWithWhereUniqueWithoutSectionInput | MoistureDeviceStatusUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: MoistureDeviceStatusCreateManySectionInputEnvelope
    set?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    disconnect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    delete?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    update?: MoistureDeviceStatusUpdateWithWhereUniqueWithoutSectionInput | MoistureDeviceStatusUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: MoistureDeviceStatusUpdateManyWithWhereWithoutSectionInput | MoistureDeviceStatusUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: MoistureDeviceStatusScalarWhereInput | MoistureDeviceStatusScalarWhereInput[]
  }

  export type IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutSectionInput, IrrigationDeviceStatusUncheckedCreateWithoutSectionInput> | IrrigationDeviceStatusCreateWithoutSectionInput[] | IrrigationDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutSectionInput | IrrigationDeviceStatusCreateOrConnectWithoutSectionInput[]
    upsert?: IrrigationDeviceStatusUpsertWithWhereUniqueWithoutSectionInput | IrrigationDeviceStatusUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: IrrigationDeviceStatusCreateManySectionInputEnvelope
    set?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    disconnect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    delete?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    update?: IrrigationDeviceStatusUpdateWithWhereUniqueWithoutSectionInput | IrrigationDeviceStatusUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: IrrigationDeviceStatusUpdateManyWithWhereWithoutSectionInput | IrrigationDeviceStatusUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: IrrigationDeviceStatusScalarWhereInput | IrrigationDeviceStatusScalarWhereInput[]
  }

  export type DeviceAckUpdateManyWithoutSectionNestedInput = {
    create?: XOR<DeviceAckCreateWithoutSectionInput, DeviceAckUncheckedCreateWithoutSectionInput> | DeviceAckCreateWithoutSectionInput[] | DeviceAckUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutSectionInput | DeviceAckCreateOrConnectWithoutSectionInput[]
    upsert?: DeviceAckUpsertWithWhereUniqueWithoutSectionInput | DeviceAckUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: DeviceAckCreateManySectionInputEnvelope
    set?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    disconnect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    delete?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    update?: DeviceAckUpdateWithWhereUniqueWithoutSectionInput | DeviceAckUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: DeviceAckUpdateManyWithWhereWithoutSectionInput | DeviceAckUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: DeviceAckScalarWhereInput | DeviceAckScalarWhereInput[]
  }

  export type ScheduledIrrigationUpdateManyWithoutSectionNestedInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutSectionInput, ScheduledIrrigationUncheckedCreateWithoutSectionInput> | ScheduledIrrigationCreateWithoutSectionInput[] | ScheduledIrrigationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutSectionInput | ScheduledIrrigationCreateOrConnectWithoutSectionInput[]
    upsert?: ScheduledIrrigationUpsertWithWhereUniqueWithoutSectionInput | ScheduledIrrigationUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: ScheduledIrrigationCreateManySectionInputEnvelope
    set?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    disconnect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    delete?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    update?: ScheduledIrrigationUpdateWithWhereUniqueWithoutSectionInput | ScheduledIrrigationUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: ScheduledIrrigationUpdateManyWithWhereWithoutSectionInput | ScheduledIrrigationUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
  }

  export type MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<MoistureReadingCreateWithoutSectionInput, MoistureReadingUncheckedCreateWithoutSectionInput> | MoistureReadingCreateWithoutSectionInput[] | MoistureReadingUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureReadingCreateOrConnectWithoutSectionInput | MoistureReadingCreateOrConnectWithoutSectionInput[]
    upsert?: MoistureReadingUpsertWithWhereUniqueWithoutSectionInput | MoistureReadingUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: MoistureReadingCreateManySectionInputEnvelope
    set?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    disconnect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    delete?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    connect?: MoistureReadingWhereUniqueInput | MoistureReadingWhereUniqueInput[]
    update?: MoistureReadingUpdateWithWhereUniqueWithoutSectionInput | MoistureReadingUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: MoistureReadingUpdateManyWithWhereWithoutSectionInput | MoistureReadingUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: MoistureReadingScalarWhereInput | MoistureReadingScalarWhereInput[]
  }

  export type IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<IrrigationEventCreateWithoutSectionInput, IrrigationEventUncheckedCreateWithoutSectionInput> | IrrigationEventCreateWithoutSectionInput[] | IrrigationEventUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationEventCreateOrConnectWithoutSectionInput | IrrigationEventCreateOrConnectWithoutSectionInput[]
    upsert?: IrrigationEventUpsertWithWhereUniqueWithoutSectionInput | IrrigationEventUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: IrrigationEventCreateManySectionInputEnvelope
    set?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    disconnect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    delete?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    connect?: IrrigationEventWhereUniqueInput | IrrigationEventWhereUniqueInput[]
    update?: IrrigationEventUpdateWithWhereUniqueWithoutSectionInput | IrrigationEventUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: IrrigationEventUpdateManyWithWhereWithoutSectionInput | IrrigationEventUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: IrrigationEventScalarWhereInput | IrrigationEventScalarWhereInput[]
  }

  export type MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<MoistureDeviceStatusCreateWithoutSectionInput, MoistureDeviceStatusUncheckedCreateWithoutSectionInput> | MoistureDeviceStatusCreateWithoutSectionInput[] | MoistureDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: MoistureDeviceStatusCreateOrConnectWithoutSectionInput | MoistureDeviceStatusCreateOrConnectWithoutSectionInput[]
    upsert?: MoistureDeviceStatusUpsertWithWhereUniqueWithoutSectionInput | MoistureDeviceStatusUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: MoistureDeviceStatusCreateManySectionInputEnvelope
    set?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    disconnect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    delete?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    connect?: MoistureDeviceStatusWhereUniqueInput | MoistureDeviceStatusWhereUniqueInput[]
    update?: MoistureDeviceStatusUpdateWithWhereUniqueWithoutSectionInput | MoistureDeviceStatusUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: MoistureDeviceStatusUpdateManyWithWhereWithoutSectionInput | MoistureDeviceStatusUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: MoistureDeviceStatusScalarWhereInput | MoistureDeviceStatusScalarWhereInput[]
  }

  export type IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<IrrigationDeviceStatusCreateWithoutSectionInput, IrrigationDeviceStatusUncheckedCreateWithoutSectionInput> | IrrigationDeviceStatusCreateWithoutSectionInput[] | IrrigationDeviceStatusUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: IrrigationDeviceStatusCreateOrConnectWithoutSectionInput | IrrigationDeviceStatusCreateOrConnectWithoutSectionInput[]
    upsert?: IrrigationDeviceStatusUpsertWithWhereUniqueWithoutSectionInput | IrrigationDeviceStatusUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: IrrigationDeviceStatusCreateManySectionInputEnvelope
    set?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    disconnect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    delete?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    connect?: IrrigationDeviceStatusWhereUniqueInput | IrrigationDeviceStatusWhereUniqueInput[]
    update?: IrrigationDeviceStatusUpdateWithWhereUniqueWithoutSectionInput | IrrigationDeviceStatusUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: IrrigationDeviceStatusUpdateManyWithWhereWithoutSectionInput | IrrigationDeviceStatusUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: IrrigationDeviceStatusScalarWhereInput | IrrigationDeviceStatusScalarWhereInput[]
  }

  export type DeviceAckUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<DeviceAckCreateWithoutSectionInput, DeviceAckUncheckedCreateWithoutSectionInput> | DeviceAckCreateWithoutSectionInput[] | DeviceAckUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: DeviceAckCreateOrConnectWithoutSectionInput | DeviceAckCreateOrConnectWithoutSectionInput[]
    upsert?: DeviceAckUpsertWithWhereUniqueWithoutSectionInput | DeviceAckUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: DeviceAckCreateManySectionInputEnvelope
    set?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    disconnect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    delete?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    connect?: DeviceAckWhereUniqueInput | DeviceAckWhereUniqueInput[]
    update?: DeviceAckUpdateWithWhereUniqueWithoutSectionInput | DeviceAckUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: DeviceAckUpdateManyWithWhereWithoutSectionInput | DeviceAckUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: DeviceAckScalarWhereInput | DeviceAckScalarWhereInput[]
  }

  export type ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutSectionInput, ScheduledIrrigationUncheckedCreateWithoutSectionInput> | ScheduledIrrigationCreateWithoutSectionInput[] | ScheduledIrrigationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutSectionInput | ScheduledIrrigationCreateOrConnectWithoutSectionInput[]
    upsert?: ScheduledIrrigationUpsertWithWhereUniqueWithoutSectionInput | ScheduledIrrigationUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: ScheduledIrrigationCreateManySectionInputEnvelope
    set?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    disconnect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    delete?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    update?: ScheduledIrrigationUpdateWithWhereUniqueWithoutSectionInput | ScheduledIrrigationUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: ScheduledIrrigationUpdateManyWithWhereWithoutSectionInput | ScheduledIrrigationUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
  }

  export type UserCreatefarm_idsInput = {
    set: number[]
  }

  export type UserUpdatefarm_idsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type FarmCreateNestedOneWithoutMoistureReadingsInput = {
    create?: XOR<FarmCreateWithoutMoistureReadingsInput, FarmUncheckedCreateWithoutMoistureReadingsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutMoistureReadingsInput
    connect?: FarmWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutMoistureReadingsInput = {
    create?: XOR<SectionCreateWithoutMoistureReadingsInput, SectionUncheckedCreateWithoutMoistureReadingsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutMoistureReadingsInput
    connect?: SectionWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FarmUpdateOneRequiredWithoutMoistureReadingsNestedInput = {
    create?: XOR<FarmCreateWithoutMoistureReadingsInput, FarmUncheckedCreateWithoutMoistureReadingsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutMoistureReadingsInput
    upsert?: FarmUpsertWithoutMoistureReadingsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutMoistureReadingsInput, FarmUpdateWithoutMoistureReadingsInput>, FarmUncheckedUpdateWithoutMoistureReadingsInput>
  }

  export type SectionUpdateOneRequiredWithoutMoistureReadingsNestedInput = {
    create?: XOR<SectionCreateWithoutMoistureReadingsInput, SectionUncheckedCreateWithoutMoistureReadingsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutMoistureReadingsInput
    upsert?: SectionUpsertWithoutMoistureReadingsInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutMoistureReadingsInput, SectionUpdateWithoutMoistureReadingsInput>, SectionUncheckedUpdateWithoutMoistureReadingsInput>
  }

  export type FarmCreateNestedOneWithoutIrrigationEventsInput = {
    create?: XOR<FarmCreateWithoutIrrigationEventsInput, FarmUncheckedCreateWithoutIrrigationEventsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutIrrigationEventsInput
    connect?: FarmWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutIrrigationEventsInput = {
    create?: XOR<SectionCreateWithoutIrrigationEventsInput, SectionUncheckedCreateWithoutIrrigationEventsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutIrrigationEventsInput
    connect?: SectionWhereUniqueInput
  }

  export type FarmUpdateOneRequiredWithoutIrrigationEventsNestedInput = {
    create?: XOR<FarmCreateWithoutIrrigationEventsInput, FarmUncheckedCreateWithoutIrrigationEventsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutIrrigationEventsInput
    upsert?: FarmUpsertWithoutIrrigationEventsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutIrrigationEventsInput, FarmUpdateWithoutIrrigationEventsInput>, FarmUncheckedUpdateWithoutIrrigationEventsInput>
  }

  export type SectionUpdateOneRequiredWithoutIrrigationEventsNestedInput = {
    create?: XOR<SectionCreateWithoutIrrigationEventsInput, SectionUncheckedCreateWithoutIrrigationEventsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutIrrigationEventsInput
    upsert?: SectionUpsertWithoutIrrigationEventsInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutIrrigationEventsInput, SectionUpdateWithoutIrrigationEventsInput>, SectionUncheckedUpdateWithoutIrrigationEventsInput>
  }

  export type FarmCreateNestedOneWithoutMoistureDeviceStatusesInput = {
    create?: XOR<FarmCreateWithoutMoistureDeviceStatusesInput, FarmUncheckedCreateWithoutMoistureDeviceStatusesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutMoistureDeviceStatusesInput
    connect?: FarmWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutMoistureDeviceStatusesInput = {
    create?: XOR<SectionCreateWithoutMoistureDeviceStatusesInput, SectionUncheckedCreateWithoutMoistureDeviceStatusesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutMoistureDeviceStatusesInput
    connect?: SectionWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type FarmUpdateOneRequiredWithoutMoistureDeviceStatusesNestedInput = {
    create?: XOR<FarmCreateWithoutMoistureDeviceStatusesInput, FarmUncheckedCreateWithoutMoistureDeviceStatusesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutMoistureDeviceStatusesInput
    upsert?: FarmUpsertWithoutMoistureDeviceStatusesInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutMoistureDeviceStatusesInput, FarmUpdateWithoutMoistureDeviceStatusesInput>, FarmUncheckedUpdateWithoutMoistureDeviceStatusesInput>
  }

  export type SectionUpdateOneRequiredWithoutMoistureDeviceStatusesNestedInput = {
    create?: XOR<SectionCreateWithoutMoistureDeviceStatusesInput, SectionUncheckedCreateWithoutMoistureDeviceStatusesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutMoistureDeviceStatusesInput
    upsert?: SectionUpsertWithoutMoistureDeviceStatusesInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutMoistureDeviceStatusesInput, SectionUpdateWithoutMoistureDeviceStatusesInput>, SectionUncheckedUpdateWithoutMoistureDeviceStatusesInput>
  }

  export type FarmCreateNestedOneWithoutIrrigationDeviceStatusesInput = {
    create?: XOR<FarmCreateWithoutIrrigationDeviceStatusesInput, FarmUncheckedCreateWithoutIrrigationDeviceStatusesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutIrrigationDeviceStatusesInput
    connect?: FarmWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutIrrigationDeviceStatusesInput = {
    create?: XOR<SectionCreateWithoutIrrigationDeviceStatusesInput, SectionUncheckedCreateWithoutIrrigationDeviceStatusesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutIrrigationDeviceStatusesInput
    connect?: SectionWhereUniqueInput
  }

  export type FarmUpdateOneRequiredWithoutIrrigationDeviceStatusesNestedInput = {
    create?: XOR<FarmCreateWithoutIrrigationDeviceStatusesInput, FarmUncheckedCreateWithoutIrrigationDeviceStatusesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutIrrigationDeviceStatusesInput
    upsert?: FarmUpsertWithoutIrrigationDeviceStatusesInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutIrrigationDeviceStatusesInput, FarmUpdateWithoutIrrigationDeviceStatusesInput>, FarmUncheckedUpdateWithoutIrrigationDeviceStatusesInput>
  }

  export type SectionUpdateOneRequiredWithoutIrrigationDeviceStatusesNestedInput = {
    create?: XOR<SectionCreateWithoutIrrigationDeviceStatusesInput, SectionUncheckedCreateWithoutIrrigationDeviceStatusesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutIrrigationDeviceStatusesInput
    upsert?: SectionUpsertWithoutIrrigationDeviceStatusesInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutIrrigationDeviceStatusesInput, SectionUpdateWithoutIrrigationDeviceStatusesInput>, SectionUncheckedUpdateWithoutIrrigationDeviceStatusesInput>
  }

  export type FarmCreateNestedOneWithoutDeviceAcksInput = {
    create?: XOR<FarmCreateWithoutDeviceAcksInput, FarmUncheckedCreateWithoutDeviceAcksInput>
    connectOrCreate?: FarmCreateOrConnectWithoutDeviceAcksInput
    connect?: FarmWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutDeviceAcksInput = {
    create?: XOR<SectionCreateWithoutDeviceAcksInput, SectionUncheckedCreateWithoutDeviceAcksInput>
    connectOrCreate?: SectionCreateOrConnectWithoutDeviceAcksInput
    connect?: SectionWhereUniqueInput
  }

  export type FarmUpdateOneRequiredWithoutDeviceAcksNestedInput = {
    create?: XOR<FarmCreateWithoutDeviceAcksInput, FarmUncheckedCreateWithoutDeviceAcksInput>
    connectOrCreate?: FarmCreateOrConnectWithoutDeviceAcksInput
    upsert?: FarmUpsertWithoutDeviceAcksInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutDeviceAcksInput, FarmUpdateWithoutDeviceAcksInput>, FarmUncheckedUpdateWithoutDeviceAcksInput>
  }

  export type SectionUpdateOneRequiredWithoutDeviceAcksNestedInput = {
    create?: XOR<SectionCreateWithoutDeviceAcksInput, SectionUncheckedCreateWithoutDeviceAcksInput>
    connectOrCreate?: SectionCreateOrConnectWithoutDeviceAcksInput
    upsert?: SectionUpsertWithoutDeviceAcksInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutDeviceAcksInput, SectionUpdateWithoutDeviceAcksInput>, SectionUncheckedUpdateWithoutDeviceAcksInput>
  }

  export type IrrigationScheduleCreatesection_numbersInput = {
    set: number[]
  }

  export type IrrigationScheduleCreatedays_of_weekInput = {
    set: number[]
  }

  export type FarmCreateNestedOneWithoutIrrigationSchedulesInput = {
    create?: XOR<FarmCreateWithoutIrrigationSchedulesInput, FarmUncheckedCreateWithoutIrrigationSchedulesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutIrrigationSchedulesInput
    connect?: FarmWhereUniqueInput
  }

  export type ScheduledIrrigationCreateNestedManyWithoutScheduleInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutScheduleInput, ScheduledIrrigationUncheckedCreateWithoutScheduleInput> | ScheduledIrrigationCreateWithoutScheduleInput[] | ScheduledIrrigationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutScheduleInput | ScheduledIrrigationCreateOrConnectWithoutScheduleInput[]
    createMany?: ScheduledIrrigationCreateManyScheduleInputEnvelope
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
  }

  export type ScheduledIrrigationUncheckedCreateNestedManyWithoutScheduleInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutScheduleInput, ScheduledIrrigationUncheckedCreateWithoutScheduleInput> | ScheduledIrrigationCreateWithoutScheduleInput[] | ScheduledIrrigationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutScheduleInput | ScheduledIrrigationCreateOrConnectWithoutScheduleInput[]
    createMany?: ScheduledIrrigationCreateManyScheduleInputEnvelope
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
  }

  export type IrrigationScheduleUpdatesection_numbersInput = {
    set?: number[]
    push?: number | number[]
  }

  export type IrrigationScheduleUpdatedays_of_weekInput = {
    set?: number[]
    push?: number | number[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FarmUpdateOneRequiredWithoutIrrigationSchedulesNestedInput = {
    create?: XOR<FarmCreateWithoutIrrigationSchedulesInput, FarmUncheckedCreateWithoutIrrigationSchedulesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutIrrigationSchedulesInput
    upsert?: FarmUpsertWithoutIrrigationSchedulesInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutIrrigationSchedulesInput, FarmUpdateWithoutIrrigationSchedulesInput>, FarmUncheckedUpdateWithoutIrrigationSchedulesInput>
  }

  export type ScheduledIrrigationUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutScheduleInput, ScheduledIrrigationUncheckedCreateWithoutScheduleInput> | ScheduledIrrigationCreateWithoutScheduleInput[] | ScheduledIrrigationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutScheduleInput | ScheduledIrrigationCreateOrConnectWithoutScheduleInput[]
    upsert?: ScheduledIrrigationUpsertWithWhereUniqueWithoutScheduleInput | ScheduledIrrigationUpsertWithWhereUniqueWithoutScheduleInput[]
    createMany?: ScheduledIrrigationCreateManyScheduleInputEnvelope
    set?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    disconnect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    delete?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    update?: ScheduledIrrigationUpdateWithWhereUniqueWithoutScheduleInput | ScheduledIrrigationUpdateWithWhereUniqueWithoutScheduleInput[]
    updateMany?: ScheduledIrrigationUpdateManyWithWhereWithoutScheduleInput | ScheduledIrrigationUpdateManyWithWhereWithoutScheduleInput[]
    deleteMany?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
  }

  export type ScheduledIrrigationUncheckedUpdateManyWithoutScheduleNestedInput = {
    create?: XOR<ScheduledIrrigationCreateWithoutScheduleInput, ScheduledIrrigationUncheckedCreateWithoutScheduleInput> | ScheduledIrrigationCreateWithoutScheduleInput[] | ScheduledIrrigationUncheckedCreateWithoutScheduleInput[]
    connectOrCreate?: ScheduledIrrigationCreateOrConnectWithoutScheduleInput | ScheduledIrrigationCreateOrConnectWithoutScheduleInput[]
    upsert?: ScheduledIrrigationUpsertWithWhereUniqueWithoutScheduleInput | ScheduledIrrigationUpsertWithWhereUniqueWithoutScheduleInput[]
    createMany?: ScheduledIrrigationCreateManyScheduleInputEnvelope
    set?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    disconnect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    delete?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    connect?: ScheduledIrrigationWhereUniqueInput | ScheduledIrrigationWhereUniqueInput[]
    update?: ScheduledIrrigationUpdateWithWhereUniqueWithoutScheduleInput | ScheduledIrrigationUpdateWithWhereUniqueWithoutScheduleInput[]
    updateMany?: ScheduledIrrigationUpdateManyWithWhereWithoutScheduleInput | ScheduledIrrigationUpdateManyWithWhereWithoutScheduleInput[]
    deleteMany?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
  }

  export type IrrigationScheduleCreateNestedOneWithoutScheduledIrrigationsInput = {
    create?: XOR<IrrigationScheduleCreateWithoutScheduledIrrigationsInput, IrrigationScheduleUncheckedCreateWithoutScheduledIrrigationsInput>
    connectOrCreate?: IrrigationScheduleCreateOrConnectWithoutScheduledIrrigationsInput
    connect?: IrrigationScheduleWhereUniqueInput
  }

  export type FarmCreateNestedOneWithoutScheduledIrrigationsInput = {
    create?: XOR<FarmCreateWithoutScheduledIrrigationsInput, FarmUncheckedCreateWithoutScheduledIrrigationsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutScheduledIrrigationsInput
    connect?: FarmWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutScheduledIrrigationsInput = {
    create?: XOR<SectionCreateWithoutScheduledIrrigationsInput, SectionUncheckedCreateWithoutScheduledIrrigationsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutScheduledIrrigationsInput
    connect?: SectionWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IrrigationScheduleUpdateOneRequiredWithoutScheduledIrrigationsNestedInput = {
    create?: XOR<IrrigationScheduleCreateWithoutScheduledIrrigationsInput, IrrigationScheduleUncheckedCreateWithoutScheduledIrrigationsInput>
    connectOrCreate?: IrrigationScheduleCreateOrConnectWithoutScheduledIrrigationsInput
    upsert?: IrrigationScheduleUpsertWithoutScheduledIrrigationsInput
    connect?: IrrigationScheduleWhereUniqueInput
    update?: XOR<XOR<IrrigationScheduleUpdateToOneWithWhereWithoutScheduledIrrigationsInput, IrrigationScheduleUpdateWithoutScheduledIrrigationsInput>, IrrigationScheduleUncheckedUpdateWithoutScheduledIrrigationsInput>
  }

  export type FarmUpdateOneRequiredWithoutScheduledIrrigationsNestedInput = {
    create?: XOR<FarmCreateWithoutScheduledIrrigationsInput, FarmUncheckedCreateWithoutScheduledIrrigationsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutScheduledIrrigationsInput
    upsert?: FarmUpsertWithoutScheduledIrrigationsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutScheduledIrrigationsInput, FarmUpdateWithoutScheduledIrrigationsInput>, FarmUncheckedUpdateWithoutScheduledIrrigationsInput>
  }

  export type SectionUpdateOneRequiredWithoutScheduledIrrigationsNestedInput = {
    create?: XOR<SectionCreateWithoutScheduledIrrigationsInput, SectionUncheckedCreateWithoutScheduledIrrigationsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutScheduledIrrigationsInput
    upsert?: SectionUpsertWithoutScheduledIrrigationsInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutScheduledIrrigationsInput, SectionUpdateWithoutScheduledIrrigationsInput>, SectionUncheckedUpdateWithoutScheduledIrrigationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SectionCreateWithoutFarmInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutFarmInput = {
    id?: number
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutFarmInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutFarmInput, SectionUncheckedCreateWithoutFarmInput>
  }

  export type SectionCreateManyFarmInputEnvelope = {
    data: SectionCreateManyFarmInput | SectionCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type MoistureReadingCreateWithoutFarmInput = {
    value: number
    timestamp?: Date | string
    section: SectionCreateNestedOneWithoutMoistureReadingsInput
  }

  export type MoistureReadingUncheckedCreateWithoutFarmInput = {
    id?: number
    section_number: number
    value: number
    timestamp?: Date | string
  }

  export type MoistureReadingCreateOrConnectWithoutFarmInput = {
    where: MoistureReadingWhereUniqueInput
    create: XOR<MoistureReadingCreateWithoutFarmInput, MoistureReadingUncheckedCreateWithoutFarmInput>
  }

  export type MoistureReadingCreateManyFarmInputEnvelope = {
    data: MoistureReadingCreateManyFarmInput | MoistureReadingCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type IrrigationEventCreateWithoutFarmInput = {
    water_ml: number
    start_time: Date | string
    end_time: Date | string
    section: SectionCreateNestedOneWithoutIrrigationEventsInput
  }

  export type IrrigationEventUncheckedCreateWithoutFarmInput = {
    id?: number
    section_number: number
    water_ml: number
    start_time: Date | string
    end_time: Date | string
  }

  export type IrrigationEventCreateOrConnectWithoutFarmInput = {
    where: IrrigationEventWhereUniqueInput
    create: XOR<IrrigationEventCreateWithoutFarmInput, IrrigationEventUncheckedCreateWithoutFarmInput>
  }

  export type IrrigationEventCreateManyFarmInputEnvelope = {
    data: IrrigationEventCreateManyFarmInput | IrrigationEventCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type MoistureDeviceStatusCreateWithoutFarmInput = {
    device_id: string
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
    section: SectionCreateNestedOneWithoutMoistureDeviceStatusesInput
  }

  export type MoistureDeviceStatusUncheckedCreateWithoutFarmInput = {
    id?: number
    device_id: string
    section_number: number
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
  }

  export type MoistureDeviceStatusCreateOrConnectWithoutFarmInput = {
    where: MoistureDeviceStatusWhereUniqueInput
    create: XOR<MoistureDeviceStatusCreateWithoutFarmInput, MoistureDeviceStatusUncheckedCreateWithoutFarmInput>
  }

  export type MoistureDeviceStatusCreateManyFarmInputEnvelope = {
    data: MoistureDeviceStatusCreateManyFarmInput | MoistureDeviceStatusCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type IrrigationDeviceStatusCreateWithoutFarmInput = {
    device_id: string
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
    section: SectionCreateNestedOneWithoutIrrigationDeviceStatusesInput
  }

  export type IrrigationDeviceStatusUncheckedCreateWithoutFarmInput = {
    id?: number
    device_id: string
    section_number: number
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type IrrigationDeviceStatusCreateOrConnectWithoutFarmInput = {
    where: IrrigationDeviceStatusWhereUniqueInput
    create: XOR<IrrigationDeviceStatusCreateWithoutFarmInput, IrrigationDeviceStatusUncheckedCreateWithoutFarmInput>
  }

  export type IrrigationDeviceStatusCreateManyFarmInputEnvelope = {
    data: IrrigationDeviceStatusCreateManyFarmInput | IrrigationDeviceStatusCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type DeviceAckCreateWithoutFarmInput = {
    device_id?: string | null
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    section: SectionCreateNestedOneWithoutDeviceAcksInput
  }

  export type DeviceAckUncheckedCreateWithoutFarmInput = {
    id?: number
    device_id?: string | null
    section_number: number
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type DeviceAckCreateOrConnectWithoutFarmInput = {
    where: DeviceAckWhereUniqueInput
    create: XOR<DeviceAckCreateWithoutFarmInput, DeviceAckUncheckedCreateWithoutFarmInput>
  }

  export type DeviceAckCreateManyFarmInputEnvelope = {
    data: DeviceAckCreateManyFarmInput | DeviceAckCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type IrrigationScheduleCreateWithoutFarmInput = {
    id?: string
    name: string
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutScheduleInput
  }

  export type IrrigationScheduleUncheckedCreateWithoutFarmInput = {
    id?: string
    name: string
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutScheduleInput
  }

  export type IrrigationScheduleCreateOrConnectWithoutFarmInput = {
    where: IrrigationScheduleWhereUniqueInput
    create: XOR<IrrigationScheduleCreateWithoutFarmInput, IrrigationScheduleUncheckedCreateWithoutFarmInput>
  }

  export type IrrigationScheduleCreateManyFarmInputEnvelope = {
    data: IrrigationScheduleCreateManyFarmInput | IrrigationScheduleCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type ScheduledIrrigationCreateWithoutFarmInput = {
    id?: string
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
    schedule: IrrigationScheduleCreateNestedOneWithoutScheduledIrrigationsInput
    section: SectionCreateNestedOneWithoutScheduledIrrigationsInput
  }

  export type ScheduledIrrigationUncheckedCreateWithoutFarmInput = {
    id?: string
    schedule_id: string
    section_number: number
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type ScheduledIrrigationCreateOrConnectWithoutFarmInput = {
    where: ScheduledIrrigationWhereUniqueInput
    create: XOR<ScheduledIrrigationCreateWithoutFarmInput, ScheduledIrrigationUncheckedCreateWithoutFarmInput>
  }

  export type ScheduledIrrigationCreateManyFarmInputEnvelope = {
    data: ScheduledIrrigationCreateManyFarmInput | ScheduledIrrigationCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type SectionUpsertWithWhereUniqueWithoutFarmInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutFarmInput, SectionUncheckedUpdateWithoutFarmInput>
    create: XOR<SectionCreateWithoutFarmInput, SectionUncheckedCreateWithoutFarmInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutFarmInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutFarmInput, SectionUncheckedUpdateWithoutFarmInput>
  }

  export type SectionUpdateManyWithWhereWithoutFarmInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutFarmInput>
  }

  export type SectionScalarWhereInput = {
    AND?: SectionScalarWhereInput | SectionScalarWhereInput[]
    OR?: SectionScalarWhereInput[]
    NOT?: SectionScalarWhereInput | SectionScalarWhereInput[]
    id?: IntFilter<"Section"> | number
    name?: StringFilter<"Section"> | string
    farm_id?: IntFilter<"Section"> | number
    section_number?: IntFilter<"Section"> | number
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
  }

  export type MoistureReadingUpsertWithWhereUniqueWithoutFarmInput = {
    where: MoistureReadingWhereUniqueInput
    update: XOR<MoistureReadingUpdateWithoutFarmInput, MoistureReadingUncheckedUpdateWithoutFarmInput>
    create: XOR<MoistureReadingCreateWithoutFarmInput, MoistureReadingUncheckedCreateWithoutFarmInput>
  }

  export type MoistureReadingUpdateWithWhereUniqueWithoutFarmInput = {
    where: MoistureReadingWhereUniqueInput
    data: XOR<MoistureReadingUpdateWithoutFarmInput, MoistureReadingUncheckedUpdateWithoutFarmInput>
  }

  export type MoistureReadingUpdateManyWithWhereWithoutFarmInput = {
    where: MoistureReadingScalarWhereInput
    data: XOR<MoistureReadingUpdateManyMutationInput, MoistureReadingUncheckedUpdateManyWithoutFarmInput>
  }

  export type MoistureReadingScalarWhereInput = {
    AND?: MoistureReadingScalarWhereInput | MoistureReadingScalarWhereInput[]
    OR?: MoistureReadingScalarWhereInput[]
    NOT?: MoistureReadingScalarWhereInput | MoistureReadingScalarWhereInput[]
    id?: IntFilter<"MoistureReading"> | number
    farm_id?: IntFilter<"MoistureReading"> | number
    section_number?: IntFilter<"MoistureReading"> | number
    value?: FloatFilter<"MoistureReading"> | number
    timestamp?: DateTimeFilter<"MoistureReading"> | Date | string
  }

  export type IrrigationEventUpsertWithWhereUniqueWithoutFarmInput = {
    where: IrrigationEventWhereUniqueInput
    update: XOR<IrrigationEventUpdateWithoutFarmInput, IrrigationEventUncheckedUpdateWithoutFarmInput>
    create: XOR<IrrigationEventCreateWithoutFarmInput, IrrigationEventUncheckedCreateWithoutFarmInput>
  }

  export type IrrigationEventUpdateWithWhereUniqueWithoutFarmInput = {
    where: IrrigationEventWhereUniqueInput
    data: XOR<IrrigationEventUpdateWithoutFarmInput, IrrigationEventUncheckedUpdateWithoutFarmInput>
  }

  export type IrrigationEventUpdateManyWithWhereWithoutFarmInput = {
    where: IrrigationEventScalarWhereInput
    data: XOR<IrrigationEventUpdateManyMutationInput, IrrigationEventUncheckedUpdateManyWithoutFarmInput>
  }

  export type IrrigationEventScalarWhereInput = {
    AND?: IrrigationEventScalarWhereInput | IrrigationEventScalarWhereInput[]
    OR?: IrrigationEventScalarWhereInput[]
    NOT?: IrrigationEventScalarWhereInput | IrrigationEventScalarWhereInput[]
    id?: IntFilter<"IrrigationEvent"> | number
    farm_id?: IntFilter<"IrrigationEvent"> | number
    section_number?: IntFilter<"IrrigationEvent"> | number
    water_ml?: FloatFilter<"IrrigationEvent"> | number
    start_time?: DateTimeFilter<"IrrigationEvent"> | Date | string
    end_time?: DateTimeFilter<"IrrigationEvent"> | Date | string
  }

  export type MoistureDeviceStatusUpsertWithWhereUniqueWithoutFarmInput = {
    where: MoistureDeviceStatusWhereUniqueInput
    update: XOR<MoistureDeviceStatusUpdateWithoutFarmInput, MoistureDeviceStatusUncheckedUpdateWithoutFarmInput>
    create: XOR<MoistureDeviceStatusCreateWithoutFarmInput, MoistureDeviceStatusUncheckedCreateWithoutFarmInput>
  }

  export type MoistureDeviceStatusUpdateWithWhereUniqueWithoutFarmInput = {
    where: MoistureDeviceStatusWhereUniqueInput
    data: XOR<MoistureDeviceStatusUpdateWithoutFarmInput, MoistureDeviceStatusUncheckedUpdateWithoutFarmInput>
  }

  export type MoistureDeviceStatusUpdateManyWithWhereWithoutFarmInput = {
    where: MoistureDeviceStatusScalarWhereInput
    data: XOR<MoistureDeviceStatusUpdateManyMutationInput, MoistureDeviceStatusUncheckedUpdateManyWithoutFarmInput>
  }

  export type MoistureDeviceStatusScalarWhereInput = {
    AND?: MoistureDeviceStatusScalarWhereInput | MoistureDeviceStatusScalarWhereInput[]
    OR?: MoistureDeviceStatusScalarWhereInput[]
    NOT?: MoistureDeviceStatusScalarWhereInput | MoistureDeviceStatusScalarWhereInput[]
    id?: IntFilter<"MoistureDeviceStatus"> | number
    device_id?: StringFilter<"MoistureDeviceStatus"> | string
    farm_id?: IntFilter<"MoistureDeviceStatus"> | number
    section_number?: IntFilter<"MoistureDeviceStatus"> | number
    mqtt?: BoolFilter<"MoistureDeviceStatus"> | boolean
    wifi?: BoolFilter<"MoistureDeviceStatus"> | boolean
    uptime?: BigIntFilter<"MoistureDeviceStatus"> | bigint | number
    timestamp?: DateTimeFilter<"MoistureDeviceStatus"> | Date | string
    last_error?: StringFilter<"MoistureDeviceStatus"> | string
    enable_deep_sleep?: BoolFilter<"MoistureDeviceStatus"> | boolean
    reporting_interval?: IntFilter<"MoistureDeviceStatus"> | number
    deep_sleep_duration?: IntFilter<"MoistureDeviceStatus"> | number
    createdAt?: DateTimeFilter<"MoistureDeviceStatus"> | Date | string
  }

  export type IrrigationDeviceStatusUpsertWithWhereUniqueWithoutFarmInput = {
    where: IrrigationDeviceStatusWhereUniqueInput
    update: XOR<IrrigationDeviceStatusUpdateWithoutFarmInput, IrrigationDeviceStatusUncheckedUpdateWithoutFarmInput>
    create: XOR<IrrigationDeviceStatusCreateWithoutFarmInput, IrrigationDeviceStatusUncheckedCreateWithoutFarmInput>
  }

  export type IrrigationDeviceStatusUpdateWithWhereUniqueWithoutFarmInput = {
    where: IrrigationDeviceStatusWhereUniqueInput
    data: XOR<IrrigationDeviceStatusUpdateWithoutFarmInput, IrrigationDeviceStatusUncheckedUpdateWithoutFarmInput>
  }

  export type IrrigationDeviceStatusUpdateManyWithWhereWithoutFarmInput = {
    where: IrrigationDeviceStatusScalarWhereInput
    data: XOR<IrrigationDeviceStatusUpdateManyMutationInput, IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmInput>
  }

  export type IrrigationDeviceStatusScalarWhereInput = {
    AND?: IrrigationDeviceStatusScalarWhereInput | IrrigationDeviceStatusScalarWhereInput[]
    OR?: IrrigationDeviceStatusScalarWhereInput[]
    NOT?: IrrigationDeviceStatusScalarWhereInput | IrrigationDeviceStatusScalarWhereInput[]
    id?: IntFilter<"IrrigationDeviceStatus"> | number
    device_id?: StringFilter<"IrrigationDeviceStatus"> | string
    farm_id?: IntFilter<"IrrigationDeviceStatus"> | number
    section_number?: IntFilter<"IrrigationDeviceStatus"> | number
    uptime?: BigIntFilter<"IrrigationDeviceStatus"> | bigint | number
    wifi?: IntFilter<"IrrigationDeviceStatus"> | number
    mqtt?: IntFilter<"IrrigationDeviceStatus"> | number
    last_error?: StringFilter<"IrrigationDeviceStatus"> | string
    valve_on?: IntFilter<"IrrigationDeviceStatus"> | number
    mode?: StringFilter<"IrrigationDeviceStatus"> | string
    latest_moisture?: IntFilter<"IrrigationDeviceStatus"> | number
    min_threshold?: IntFilter<"IrrigationDeviceStatus"> | number
    max_threshold?: IntFilter<"IrrigationDeviceStatus"> | number
    pulse_count?: IntFilter<"IrrigationDeviceStatus"> | number
    water_ml?: IntFilter<"IrrigationDeviceStatus"> | number
    timestamp?: DateTimeFilter<"IrrigationDeviceStatus"> | Date | string
    createdAt?: DateTimeFilter<"IrrigationDeviceStatus"> | Date | string
  }

  export type DeviceAckUpsertWithWhereUniqueWithoutFarmInput = {
    where: DeviceAckWhereUniqueInput
    update: XOR<DeviceAckUpdateWithoutFarmInput, DeviceAckUncheckedUpdateWithoutFarmInput>
    create: XOR<DeviceAckCreateWithoutFarmInput, DeviceAckUncheckedCreateWithoutFarmInput>
  }

  export type DeviceAckUpdateWithWhereUniqueWithoutFarmInput = {
    where: DeviceAckWhereUniqueInput
    data: XOR<DeviceAckUpdateWithoutFarmInput, DeviceAckUncheckedUpdateWithoutFarmInput>
  }

  export type DeviceAckUpdateManyWithWhereWithoutFarmInput = {
    where: DeviceAckScalarWhereInput
    data: XOR<DeviceAckUpdateManyMutationInput, DeviceAckUncheckedUpdateManyWithoutFarmInput>
  }

  export type DeviceAckScalarWhereInput = {
    AND?: DeviceAckScalarWhereInput | DeviceAckScalarWhereInput[]
    OR?: DeviceAckScalarWhereInput[]
    NOT?: DeviceAckScalarWhereInput | DeviceAckScalarWhereInput[]
    id?: IntFilter<"DeviceAck"> | number
    device_id?: StringNullableFilter<"DeviceAck"> | string | null
    farm_id?: IntFilter<"DeviceAck"> | number
    section_number?: IntFilter<"DeviceAck"> | number
    ack_json?: JsonFilter<"DeviceAck">
    timestamp?: DateTimeFilter<"DeviceAck"> | Date | string
  }

  export type IrrigationScheduleUpsertWithWhereUniqueWithoutFarmInput = {
    where: IrrigationScheduleWhereUniqueInput
    update: XOR<IrrigationScheduleUpdateWithoutFarmInput, IrrigationScheduleUncheckedUpdateWithoutFarmInput>
    create: XOR<IrrigationScheduleCreateWithoutFarmInput, IrrigationScheduleUncheckedCreateWithoutFarmInput>
  }

  export type IrrigationScheduleUpdateWithWhereUniqueWithoutFarmInput = {
    where: IrrigationScheduleWhereUniqueInput
    data: XOR<IrrigationScheduleUpdateWithoutFarmInput, IrrigationScheduleUncheckedUpdateWithoutFarmInput>
  }

  export type IrrigationScheduleUpdateManyWithWhereWithoutFarmInput = {
    where: IrrigationScheduleScalarWhereInput
    data: XOR<IrrigationScheduleUpdateManyMutationInput, IrrigationScheduleUncheckedUpdateManyWithoutFarmInput>
  }

  export type IrrigationScheduleScalarWhereInput = {
    AND?: IrrigationScheduleScalarWhereInput | IrrigationScheduleScalarWhereInput[]
    OR?: IrrigationScheduleScalarWhereInput[]
    NOT?: IrrigationScheduleScalarWhereInput | IrrigationScheduleScalarWhereInput[]
    id?: StringFilter<"IrrigationSchedule"> | string
    name?: StringFilter<"IrrigationSchedule"> | string
    farm_id?: IntFilter<"IrrigationSchedule"> | number
    section_numbers?: IntNullableListFilter<"IrrigationSchedule">
    start_time?: StringFilter<"IrrigationSchedule"> | string
    duration_minutes?: IntFilter<"IrrigationSchedule"> | number
    frequency?: StringFilter<"IrrigationSchedule"> | string
    days_of_week?: IntNullableListFilter<"IrrigationSchedule">
    day_of_month?: IntNullableFilter<"IrrigationSchedule"> | number | null
    is_active?: BoolFilter<"IrrigationSchedule"> | boolean
    weather_dependent?: BoolFilter<"IrrigationSchedule"> | boolean
    min_temperature?: FloatNullableFilter<"IrrigationSchedule"> | number | null
    max_temperature?: FloatNullableFilter<"IrrigationSchedule"> | number | null
    min_moisture?: IntNullableFilter<"IrrigationSchedule"> | number | null
    created_by?: StringFilter<"IrrigationSchedule"> | string
    created_at?: DateTimeFilter<"IrrigationSchedule"> | Date | string
    updated_at?: DateTimeFilter<"IrrigationSchedule"> | Date | string
  }

  export type ScheduledIrrigationUpsertWithWhereUniqueWithoutFarmInput = {
    where: ScheduledIrrigationWhereUniqueInput
    update: XOR<ScheduledIrrigationUpdateWithoutFarmInput, ScheduledIrrigationUncheckedUpdateWithoutFarmInput>
    create: XOR<ScheduledIrrigationCreateWithoutFarmInput, ScheduledIrrigationUncheckedCreateWithoutFarmInput>
  }

  export type ScheduledIrrigationUpdateWithWhereUniqueWithoutFarmInput = {
    where: ScheduledIrrigationWhereUniqueInput
    data: XOR<ScheduledIrrigationUpdateWithoutFarmInput, ScheduledIrrigationUncheckedUpdateWithoutFarmInput>
  }

  export type ScheduledIrrigationUpdateManyWithWhereWithoutFarmInput = {
    where: ScheduledIrrigationScalarWhereInput
    data: XOR<ScheduledIrrigationUpdateManyMutationInput, ScheduledIrrigationUncheckedUpdateManyWithoutFarmInput>
  }

  export type ScheduledIrrigationScalarWhereInput = {
    AND?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
    OR?: ScheduledIrrigationScalarWhereInput[]
    NOT?: ScheduledIrrigationScalarWhereInput | ScheduledIrrigationScalarWhereInput[]
    id?: StringFilter<"ScheduledIrrigation"> | string
    schedule_id?: StringFilter<"ScheduledIrrigation"> | string
    farm_id?: IntFilter<"ScheduledIrrigation"> | number
    section_number?: IntFilter<"ScheduledIrrigation"> | number
    scheduled_time?: DateTimeFilter<"ScheduledIrrigation"> | Date | string
    executed_time?: DateTimeNullableFilter<"ScheduledIrrigation"> | Date | string | null
    status?: StringFilter<"ScheduledIrrigation"> | string
    skip_reason?: StringNullableFilter<"ScheduledIrrigation"> | string | null
    duration_minutes?: IntFilter<"ScheduledIrrigation"> | number
    water_used?: FloatNullableFilter<"ScheduledIrrigation"> | number | null
    created_at?: DateTimeFilter<"ScheduledIrrigation"> | Date | string
  }

  export type FarmCreateWithoutSectionsInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutSectionsInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutSectionsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutSectionsInput, FarmUncheckedCreateWithoutSectionsInput>
  }

  export type MoistureReadingCreateWithoutSectionInput = {
    value: number
    timestamp?: Date | string
    farm: FarmCreateNestedOneWithoutMoistureReadingsInput
  }

  export type MoistureReadingUncheckedCreateWithoutSectionInput = {
    id?: number
    value: number
    timestamp?: Date | string
  }

  export type MoistureReadingCreateOrConnectWithoutSectionInput = {
    where: MoistureReadingWhereUniqueInput
    create: XOR<MoistureReadingCreateWithoutSectionInput, MoistureReadingUncheckedCreateWithoutSectionInput>
  }

  export type MoistureReadingCreateManySectionInputEnvelope = {
    data: MoistureReadingCreateManySectionInput | MoistureReadingCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type IrrigationEventCreateWithoutSectionInput = {
    water_ml: number
    start_time: Date | string
    end_time: Date | string
    farm: FarmCreateNestedOneWithoutIrrigationEventsInput
  }

  export type IrrigationEventUncheckedCreateWithoutSectionInput = {
    id?: number
    water_ml: number
    start_time: Date | string
    end_time: Date | string
  }

  export type IrrigationEventCreateOrConnectWithoutSectionInput = {
    where: IrrigationEventWhereUniqueInput
    create: XOR<IrrigationEventCreateWithoutSectionInput, IrrigationEventUncheckedCreateWithoutSectionInput>
  }

  export type IrrigationEventCreateManySectionInputEnvelope = {
    data: IrrigationEventCreateManySectionInput | IrrigationEventCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type MoistureDeviceStatusCreateWithoutSectionInput = {
    device_id: string
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutMoistureDeviceStatusesInput
  }

  export type MoistureDeviceStatusUncheckedCreateWithoutSectionInput = {
    id?: number
    device_id: string
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
  }

  export type MoistureDeviceStatusCreateOrConnectWithoutSectionInput = {
    where: MoistureDeviceStatusWhereUniqueInput
    create: XOR<MoistureDeviceStatusCreateWithoutSectionInput, MoistureDeviceStatusUncheckedCreateWithoutSectionInput>
  }

  export type MoistureDeviceStatusCreateManySectionInputEnvelope = {
    data: MoistureDeviceStatusCreateManySectionInput | MoistureDeviceStatusCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type IrrigationDeviceStatusCreateWithoutSectionInput = {
    device_id: string
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutIrrigationDeviceStatusesInput
  }

  export type IrrigationDeviceStatusUncheckedCreateWithoutSectionInput = {
    id?: number
    device_id: string
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type IrrigationDeviceStatusCreateOrConnectWithoutSectionInput = {
    where: IrrigationDeviceStatusWhereUniqueInput
    create: XOR<IrrigationDeviceStatusCreateWithoutSectionInput, IrrigationDeviceStatusUncheckedCreateWithoutSectionInput>
  }

  export type IrrigationDeviceStatusCreateManySectionInputEnvelope = {
    data: IrrigationDeviceStatusCreateManySectionInput | IrrigationDeviceStatusCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type DeviceAckCreateWithoutSectionInput = {
    device_id?: string | null
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    farm: FarmCreateNestedOneWithoutDeviceAcksInput
  }

  export type DeviceAckUncheckedCreateWithoutSectionInput = {
    id?: number
    device_id?: string | null
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type DeviceAckCreateOrConnectWithoutSectionInput = {
    where: DeviceAckWhereUniqueInput
    create: XOR<DeviceAckCreateWithoutSectionInput, DeviceAckUncheckedCreateWithoutSectionInput>
  }

  export type DeviceAckCreateManySectionInputEnvelope = {
    data: DeviceAckCreateManySectionInput | DeviceAckCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type ScheduledIrrigationCreateWithoutSectionInput = {
    id?: string
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
    schedule: IrrigationScheduleCreateNestedOneWithoutScheduledIrrigationsInput
    farm: FarmCreateNestedOneWithoutScheduledIrrigationsInput
  }

  export type ScheduledIrrigationUncheckedCreateWithoutSectionInput = {
    id?: string
    schedule_id: string
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type ScheduledIrrigationCreateOrConnectWithoutSectionInput = {
    where: ScheduledIrrigationWhereUniqueInput
    create: XOR<ScheduledIrrigationCreateWithoutSectionInput, ScheduledIrrigationUncheckedCreateWithoutSectionInput>
  }

  export type ScheduledIrrigationCreateManySectionInputEnvelope = {
    data: ScheduledIrrigationCreateManySectionInput | ScheduledIrrigationCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithoutSectionsInput = {
    update: XOR<FarmUpdateWithoutSectionsInput, FarmUncheckedUpdateWithoutSectionsInput>
    create: XOR<FarmCreateWithoutSectionsInput, FarmUncheckedCreateWithoutSectionsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutSectionsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutSectionsInput, FarmUncheckedUpdateWithoutSectionsInput>
  }

  export type FarmUpdateWithoutSectionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type MoistureReadingUpsertWithWhereUniqueWithoutSectionInput = {
    where: MoistureReadingWhereUniqueInput
    update: XOR<MoistureReadingUpdateWithoutSectionInput, MoistureReadingUncheckedUpdateWithoutSectionInput>
    create: XOR<MoistureReadingCreateWithoutSectionInput, MoistureReadingUncheckedCreateWithoutSectionInput>
  }

  export type MoistureReadingUpdateWithWhereUniqueWithoutSectionInput = {
    where: MoistureReadingWhereUniqueInput
    data: XOR<MoistureReadingUpdateWithoutSectionInput, MoistureReadingUncheckedUpdateWithoutSectionInput>
  }

  export type MoistureReadingUpdateManyWithWhereWithoutSectionInput = {
    where: MoistureReadingScalarWhereInput
    data: XOR<MoistureReadingUpdateManyMutationInput, MoistureReadingUncheckedUpdateManyWithoutSectionInput>
  }

  export type IrrigationEventUpsertWithWhereUniqueWithoutSectionInput = {
    where: IrrigationEventWhereUniqueInput
    update: XOR<IrrigationEventUpdateWithoutSectionInput, IrrigationEventUncheckedUpdateWithoutSectionInput>
    create: XOR<IrrigationEventCreateWithoutSectionInput, IrrigationEventUncheckedCreateWithoutSectionInput>
  }

  export type IrrigationEventUpdateWithWhereUniqueWithoutSectionInput = {
    where: IrrigationEventWhereUniqueInput
    data: XOR<IrrigationEventUpdateWithoutSectionInput, IrrigationEventUncheckedUpdateWithoutSectionInput>
  }

  export type IrrigationEventUpdateManyWithWhereWithoutSectionInput = {
    where: IrrigationEventScalarWhereInput
    data: XOR<IrrigationEventUpdateManyMutationInput, IrrigationEventUncheckedUpdateManyWithoutSectionInput>
  }

  export type MoistureDeviceStatusUpsertWithWhereUniqueWithoutSectionInput = {
    where: MoistureDeviceStatusWhereUniqueInput
    update: XOR<MoistureDeviceStatusUpdateWithoutSectionInput, MoistureDeviceStatusUncheckedUpdateWithoutSectionInput>
    create: XOR<MoistureDeviceStatusCreateWithoutSectionInput, MoistureDeviceStatusUncheckedCreateWithoutSectionInput>
  }

  export type MoistureDeviceStatusUpdateWithWhereUniqueWithoutSectionInput = {
    where: MoistureDeviceStatusWhereUniqueInput
    data: XOR<MoistureDeviceStatusUpdateWithoutSectionInput, MoistureDeviceStatusUncheckedUpdateWithoutSectionInput>
  }

  export type MoistureDeviceStatusUpdateManyWithWhereWithoutSectionInput = {
    where: MoistureDeviceStatusScalarWhereInput
    data: XOR<MoistureDeviceStatusUpdateManyMutationInput, MoistureDeviceStatusUncheckedUpdateManyWithoutSectionInput>
  }

  export type IrrigationDeviceStatusUpsertWithWhereUniqueWithoutSectionInput = {
    where: IrrigationDeviceStatusWhereUniqueInput
    update: XOR<IrrigationDeviceStatusUpdateWithoutSectionInput, IrrigationDeviceStatusUncheckedUpdateWithoutSectionInput>
    create: XOR<IrrigationDeviceStatusCreateWithoutSectionInput, IrrigationDeviceStatusUncheckedCreateWithoutSectionInput>
  }

  export type IrrigationDeviceStatusUpdateWithWhereUniqueWithoutSectionInput = {
    where: IrrigationDeviceStatusWhereUniqueInput
    data: XOR<IrrigationDeviceStatusUpdateWithoutSectionInput, IrrigationDeviceStatusUncheckedUpdateWithoutSectionInput>
  }

  export type IrrigationDeviceStatusUpdateManyWithWhereWithoutSectionInput = {
    where: IrrigationDeviceStatusScalarWhereInput
    data: XOR<IrrigationDeviceStatusUpdateManyMutationInput, IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionInput>
  }

  export type DeviceAckUpsertWithWhereUniqueWithoutSectionInput = {
    where: DeviceAckWhereUniqueInput
    update: XOR<DeviceAckUpdateWithoutSectionInput, DeviceAckUncheckedUpdateWithoutSectionInput>
    create: XOR<DeviceAckCreateWithoutSectionInput, DeviceAckUncheckedCreateWithoutSectionInput>
  }

  export type DeviceAckUpdateWithWhereUniqueWithoutSectionInput = {
    where: DeviceAckWhereUniqueInput
    data: XOR<DeviceAckUpdateWithoutSectionInput, DeviceAckUncheckedUpdateWithoutSectionInput>
  }

  export type DeviceAckUpdateManyWithWhereWithoutSectionInput = {
    where: DeviceAckScalarWhereInput
    data: XOR<DeviceAckUpdateManyMutationInput, DeviceAckUncheckedUpdateManyWithoutSectionInput>
  }

  export type ScheduledIrrigationUpsertWithWhereUniqueWithoutSectionInput = {
    where: ScheduledIrrigationWhereUniqueInput
    update: XOR<ScheduledIrrigationUpdateWithoutSectionInput, ScheduledIrrigationUncheckedUpdateWithoutSectionInput>
    create: XOR<ScheduledIrrigationCreateWithoutSectionInput, ScheduledIrrigationUncheckedCreateWithoutSectionInput>
  }

  export type ScheduledIrrigationUpdateWithWhereUniqueWithoutSectionInput = {
    where: ScheduledIrrigationWhereUniqueInput
    data: XOR<ScheduledIrrigationUpdateWithoutSectionInput, ScheduledIrrigationUncheckedUpdateWithoutSectionInput>
  }

  export type ScheduledIrrigationUpdateManyWithWhereWithoutSectionInput = {
    where: ScheduledIrrigationScalarWhereInput
    data: XOR<ScheduledIrrigationUpdateManyMutationInput, ScheduledIrrigationUncheckedUpdateManyWithoutSectionInput>
  }

  export type FarmCreateWithoutMoistureReadingsInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutMoistureReadingsInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutMoistureReadingsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutMoistureReadingsInput, FarmUncheckedCreateWithoutMoistureReadingsInput>
  }

  export type SectionCreateWithoutMoistureReadingsInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutSectionsInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutMoistureReadingsInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutMoistureReadingsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutMoistureReadingsInput, SectionUncheckedCreateWithoutMoistureReadingsInput>
  }

  export type FarmUpsertWithoutMoistureReadingsInput = {
    update: XOR<FarmUpdateWithoutMoistureReadingsInput, FarmUncheckedUpdateWithoutMoistureReadingsInput>
    create: XOR<FarmCreateWithoutMoistureReadingsInput, FarmUncheckedCreateWithoutMoistureReadingsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutMoistureReadingsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutMoistureReadingsInput, FarmUncheckedUpdateWithoutMoistureReadingsInput>
  }

  export type FarmUpdateWithoutMoistureReadingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutMoistureReadingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type SectionUpsertWithoutMoistureReadingsInput = {
    update: XOR<SectionUpdateWithoutMoistureReadingsInput, SectionUncheckedUpdateWithoutMoistureReadingsInput>
    create: XOR<SectionCreateWithoutMoistureReadingsInput, SectionUncheckedCreateWithoutMoistureReadingsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutMoistureReadingsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutMoistureReadingsInput, SectionUncheckedUpdateWithoutMoistureReadingsInput>
  }

  export type SectionUpdateWithoutMoistureReadingsInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutSectionsNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutMoistureReadingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type FarmCreateWithoutIrrigationEventsInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutIrrigationEventsInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutIrrigationEventsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutIrrigationEventsInput, FarmUncheckedCreateWithoutIrrigationEventsInput>
  }

  export type SectionCreateWithoutIrrigationEventsInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutSectionsInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutIrrigationEventsInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutIrrigationEventsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutIrrigationEventsInput, SectionUncheckedCreateWithoutIrrigationEventsInput>
  }

  export type FarmUpsertWithoutIrrigationEventsInput = {
    update: XOR<FarmUpdateWithoutIrrigationEventsInput, FarmUncheckedUpdateWithoutIrrigationEventsInput>
    create: XOR<FarmCreateWithoutIrrigationEventsInput, FarmUncheckedCreateWithoutIrrigationEventsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutIrrigationEventsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutIrrigationEventsInput, FarmUncheckedUpdateWithoutIrrigationEventsInput>
  }

  export type FarmUpdateWithoutIrrigationEventsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutIrrigationEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type SectionUpsertWithoutIrrigationEventsInput = {
    update: XOR<SectionUpdateWithoutIrrigationEventsInput, SectionUncheckedUpdateWithoutIrrigationEventsInput>
    create: XOR<SectionCreateWithoutIrrigationEventsInput, SectionUncheckedCreateWithoutIrrigationEventsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutIrrigationEventsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutIrrigationEventsInput, SectionUncheckedUpdateWithoutIrrigationEventsInput>
  }

  export type SectionUpdateWithoutIrrigationEventsInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutSectionsNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutIrrigationEventsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type FarmCreateWithoutMoistureDeviceStatusesInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutMoistureDeviceStatusesInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutMoistureDeviceStatusesInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutMoistureDeviceStatusesInput, FarmUncheckedCreateWithoutMoistureDeviceStatusesInput>
  }

  export type SectionCreateWithoutMoistureDeviceStatusesInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutSectionsInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutMoistureDeviceStatusesInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutMoistureDeviceStatusesInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutMoistureDeviceStatusesInput, SectionUncheckedCreateWithoutMoistureDeviceStatusesInput>
  }

  export type FarmUpsertWithoutMoistureDeviceStatusesInput = {
    update: XOR<FarmUpdateWithoutMoistureDeviceStatusesInput, FarmUncheckedUpdateWithoutMoistureDeviceStatusesInput>
    create: XOR<FarmCreateWithoutMoistureDeviceStatusesInput, FarmUncheckedCreateWithoutMoistureDeviceStatusesInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutMoistureDeviceStatusesInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutMoistureDeviceStatusesInput, FarmUncheckedUpdateWithoutMoistureDeviceStatusesInput>
  }

  export type FarmUpdateWithoutMoistureDeviceStatusesInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutMoistureDeviceStatusesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type SectionUpsertWithoutMoistureDeviceStatusesInput = {
    update: XOR<SectionUpdateWithoutMoistureDeviceStatusesInput, SectionUncheckedUpdateWithoutMoistureDeviceStatusesInput>
    create: XOR<SectionCreateWithoutMoistureDeviceStatusesInput, SectionUncheckedCreateWithoutMoistureDeviceStatusesInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutMoistureDeviceStatusesInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutMoistureDeviceStatusesInput, SectionUncheckedUpdateWithoutMoistureDeviceStatusesInput>
  }

  export type SectionUpdateWithoutMoistureDeviceStatusesInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutSectionsNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutMoistureDeviceStatusesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type FarmCreateWithoutIrrigationDeviceStatusesInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutIrrigationDeviceStatusesInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutIrrigationDeviceStatusesInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutIrrigationDeviceStatusesInput, FarmUncheckedCreateWithoutIrrigationDeviceStatusesInput>
  }

  export type SectionCreateWithoutIrrigationDeviceStatusesInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutSectionsInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutIrrigationDeviceStatusesInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutIrrigationDeviceStatusesInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutIrrigationDeviceStatusesInput, SectionUncheckedCreateWithoutIrrigationDeviceStatusesInput>
  }

  export type FarmUpsertWithoutIrrigationDeviceStatusesInput = {
    update: XOR<FarmUpdateWithoutIrrigationDeviceStatusesInput, FarmUncheckedUpdateWithoutIrrigationDeviceStatusesInput>
    create: XOR<FarmCreateWithoutIrrigationDeviceStatusesInput, FarmUncheckedCreateWithoutIrrigationDeviceStatusesInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutIrrigationDeviceStatusesInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutIrrigationDeviceStatusesInput, FarmUncheckedUpdateWithoutIrrigationDeviceStatusesInput>
  }

  export type FarmUpdateWithoutIrrigationDeviceStatusesInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutIrrigationDeviceStatusesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type SectionUpsertWithoutIrrigationDeviceStatusesInput = {
    update: XOR<SectionUpdateWithoutIrrigationDeviceStatusesInput, SectionUncheckedUpdateWithoutIrrigationDeviceStatusesInput>
    create: XOR<SectionCreateWithoutIrrigationDeviceStatusesInput, SectionUncheckedCreateWithoutIrrigationDeviceStatusesInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutIrrigationDeviceStatusesInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutIrrigationDeviceStatusesInput, SectionUncheckedUpdateWithoutIrrigationDeviceStatusesInput>
  }

  export type SectionUpdateWithoutIrrigationDeviceStatusesInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutSectionsNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutIrrigationDeviceStatusesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type FarmCreateWithoutDeviceAcksInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutDeviceAcksInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutDeviceAcksInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutDeviceAcksInput, FarmUncheckedCreateWithoutDeviceAcksInput>
  }

  export type SectionCreateWithoutDeviceAcksInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutSectionsInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutDeviceAcksInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutDeviceAcksInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutDeviceAcksInput, SectionUncheckedCreateWithoutDeviceAcksInput>
  }

  export type FarmUpsertWithoutDeviceAcksInput = {
    update: XOR<FarmUpdateWithoutDeviceAcksInput, FarmUncheckedUpdateWithoutDeviceAcksInput>
    create: XOR<FarmCreateWithoutDeviceAcksInput, FarmUncheckedCreateWithoutDeviceAcksInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutDeviceAcksInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutDeviceAcksInput, FarmUncheckedUpdateWithoutDeviceAcksInput>
  }

  export type FarmUpdateWithoutDeviceAcksInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutDeviceAcksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type SectionUpsertWithoutDeviceAcksInput = {
    update: XOR<SectionUpdateWithoutDeviceAcksInput, SectionUncheckedUpdateWithoutDeviceAcksInput>
    create: XOR<SectionCreateWithoutDeviceAcksInput, SectionUncheckedCreateWithoutDeviceAcksInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutDeviceAcksInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutDeviceAcksInput, SectionUncheckedUpdateWithoutDeviceAcksInput>
  }

  export type SectionUpdateWithoutDeviceAcksInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutSectionsNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutDeviceAcksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type FarmCreateWithoutIrrigationSchedulesInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutIrrigationSchedulesInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutIrrigationSchedulesInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutIrrigationSchedulesInput, FarmUncheckedCreateWithoutIrrigationSchedulesInput>
  }

  export type ScheduledIrrigationCreateWithoutScheduleInput = {
    id?: string
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
    farm: FarmCreateNestedOneWithoutScheduledIrrigationsInput
    section: SectionCreateNestedOneWithoutScheduledIrrigationsInput
  }

  export type ScheduledIrrigationUncheckedCreateWithoutScheduleInput = {
    id?: string
    farm_id: number
    section_number: number
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type ScheduledIrrigationCreateOrConnectWithoutScheduleInput = {
    where: ScheduledIrrigationWhereUniqueInput
    create: XOR<ScheduledIrrigationCreateWithoutScheduleInput, ScheduledIrrigationUncheckedCreateWithoutScheduleInput>
  }

  export type ScheduledIrrigationCreateManyScheduleInputEnvelope = {
    data: ScheduledIrrigationCreateManyScheduleInput | ScheduledIrrigationCreateManyScheduleInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithoutIrrigationSchedulesInput = {
    update: XOR<FarmUpdateWithoutIrrigationSchedulesInput, FarmUncheckedUpdateWithoutIrrigationSchedulesInput>
    create: XOR<FarmCreateWithoutIrrigationSchedulesInput, FarmUncheckedCreateWithoutIrrigationSchedulesInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutIrrigationSchedulesInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutIrrigationSchedulesInput, FarmUncheckedUpdateWithoutIrrigationSchedulesInput>
  }

  export type FarmUpdateWithoutIrrigationSchedulesInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutIrrigationSchedulesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type ScheduledIrrigationUpsertWithWhereUniqueWithoutScheduleInput = {
    where: ScheduledIrrigationWhereUniqueInput
    update: XOR<ScheduledIrrigationUpdateWithoutScheduleInput, ScheduledIrrigationUncheckedUpdateWithoutScheduleInput>
    create: XOR<ScheduledIrrigationCreateWithoutScheduleInput, ScheduledIrrigationUncheckedCreateWithoutScheduleInput>
  }

  export type ScheduledIrrigationUpdateWithWhereUniqueWithoutScheduleInput = {
    where: ScheduledIrrigationWhereUniqueInput
    data: XOR<ScheduledIrrigationUpdateWithoutScheduleInput, ScheduledIrrigationUncheckedUpdateWithoutScheduleInput>
  }

  export type ScheduledIrrigationUpdateManyWithWhereWithoutScheduleInput = {
    where: ScheduledIrrigationScalarWhereInput
    data: XOR<ScheduledIrrigationUpdateManyMutationInput, ScheduledIrrigationUncheckedUpdateManyWithoutScheduleInput>
  }

  export type IrrigationScheduleCreateWithoutScheduledIrrigationsInput = {
    id?: string
    name: string
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
    farm: FarmCreateNestedOneWithoutIrrigationSchedulesInput
  }

  export type IrrigationScheduleUncheckedCreateWithoutScheduledIrrigationsInput = {
    id?: string
    name: string
    farm_id: number
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type IrrigationScheduleCreateOrConnectWithoutScheduledIrrigationsInput = {
    where: IrrigationScheduleWhereUniqueInput
    create: XOR<IrrigationScheduleCreateWithoutScheduledIrrigationsInput, IrrigationScheduleUncheckedCreateWithoutScheduledIrrigationsInput>
  }

  export type FarmCreateWithoutScheduledIrrigationsInput = {
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutScheduledIrrigationsInput = {
    id?: number
    name: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutFarmInput
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutFarmInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutFarmInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutFarmInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutFarmInput
    irrigationSchedules?: IrrigationScheduleUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutScheduledIrrigationsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutScheduledIrrigationsInput, FarmUncheckedCreateWithoutScheduledIrrigationsInput>
  }

  export type SectionCreateWithoutScheduledIrrigationsInput = {
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutSectionsInput
    moistureReadings?: MoistureReadingCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutScheduledIrrigationsInput = {
    id?: number
    name: string
    farm_id: number
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    moistureReadings?: MoistureReadingUncheckedCreateNestedManyWithoutSectionInput
    irrigationEvents?: IrrigationEventUncheckedCreateNestedManyWithoutSectionInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedCreateNestedManyWithoutSectionInput
    deviceAcks?: DeviceAckUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutScheduledIrrigationsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutScheduledIrrigationsInput, SectionUncheckedCreateWithoutScheduledIrrigationsInput>
  }

  export type IrrigationScheduleUpsertWithoutScheduledIrrigationsInput = {
    update: XOR<IrrigationScheduleUpdateWithoutScheduledIrrigationsInput, IrrigationScheduleUncheckedUpdateWithoutScheduledIrrigationsInput>
    create: XOR<IrrigationScheduleCreateWithoutScheduledIrrigationsInput, IrrigationScheduleUncheckedCreateWithoutScheduledIrrigationsInput>
    where?: IrrigationScheduleWhereInput
  }

  export type IrrigationScheduleUpdateToOneWithWhereWithoutScheduledIrrigationsInput = {
    where?: IrrigationScheduleWhereInput
    data: XOR<IrrigationScheduleUpdateWithoutScheduledIrrigationsInput, IrrigationScheduleUncheckedUpdateWithoutScheduledIrrigationsInput>
  }

  export type IrrigationScheduleUpdateWithoutScheduledIrrigationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutIrrigationSchedulesNestedInput
  }

  export type IrrigationScheduleUncheckedUpdateWithoutScheduledIrrigationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUpsertWithoutScheduledIrrigationsInput = {
    update: XOR<FarmUpdateWithoutScheduledIrrigationsInput, FarmUncheckedUpdateWithoutScheduledIrrigationsInput>
    create: XOR<FarmCreateWithoutScheduledIrrigationsInput, FarmUncheckedCreateWithoutScheduledIrrigationsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutScheduledIrrigationsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutScheduledIrrigationsInput, FarmUncheckedUpdateWithoutScheduledIrrigationsInput>
  }

  export type FarmUpdateWithoutScheduledIrrigationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutScheduledIrrigationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutFarmNestedInput
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutFarmNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutFarmNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutFarmNestedInput
    irrigationSchedules?: IrrigationScheduleUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type SectionUpsertWithoutScheduledIrrigationsInput = {
    update: XOR<SectionUpdateWithoutScheduledIrrigationsInput, SectionUncheckedUpdateWithoutScheduledIrrigationsInput>
    create: XOR<SectionCreateWithoutScheduledIrrigationsInput, SectionUncheckedCreateWithoutScheduledIrrigationsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutScheduledIrrigationsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutScheduledIrrigationsInput, SectionUncheckedUpdateWithoutScheduledIrrigationsInput>
  }

  export type SectionUpdateWithoutScheduledIrrigationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutSectionsNestedInput
    moistureReadings?: MoistureReadingUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutScheduledIrrigationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionCreateManyFarmInput = {
    id?: number
    name: string
    section_number?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoistureReadingCreateManyFarmInput = {
    id?: number
    section_number: number
    value: number
    timestamp?: Date | string
  }

  export type IrrigationEventCreateManyFarmInput = {
    id?: number
    section_number: number
    water_ml: number
    start_time: Date | string
    end_time: Date | string
  }

  export type MoistureDeviceStatusCreateManyFarmInput = {
    id?: number
    device_id: string
    section_number: number
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
  }

  export type IrrigationDeviceStatusCreateManyFarmInput = {
    id?: number
    device_id: string
    section_number: number
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type DeviceAckCreateManyFarmInput = {
    id?: number
    device_id?: string | null
    section_number: number
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type IrrigationScheduleCreateManyFarmInput = {
    id?: string
    name: string
    section_numbers?: IrrigationScheduleCreatesection_numbersInput | number[]
    start_time: string
    duration_minutes: number
    frequency: string
    days_of_week?: IrrigationScheduleCreatedays_of_weekInput | number[]
    day_of_month?: number | null
    is_active?: boolean
    weather_dependent?: boolean
    min_temperature?: number | null
    max_temperature?: number | null
    min_moisture?: number | null
    created_by: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScheduledIrrigationCreateManyFarmInput = {
    id?: string
    schedule_id: string
    section_number: number
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type SectionUpdateWithoutFarmInput = {
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moistureReadings?: MoistureReadingUncheckedUpdateManyWithoutSectionNestedInput
    irrigationEvents?: IrrigationEventUncheckedUpdateManyWithoutSectionNestedInput
    moistureDeviceStatuses?: MoistureDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    irrigationDeviceStatuses?: IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionNestedInput
    deviceAcks?: DeviceAckUncheckedUpdateManyWithoutSectionNestedInput
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureReadingUpdateWithoutFarmInput = {
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutMoistureReadingsNestedInput
  }

  export type MoistureReadingUncheckedUpdateWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureReadingUncheckedUpdateManyWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationEventUpdateWithoutFarmInput = {
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutIrrigationEventsNestedInput
  }

  export type IrrigationEventUncheckedUpdateWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationEventUncheckedUpdateManyWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureDeviceStatusUpdateWithoutFarmInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutMoistureDeviceStatusesNestedInput
  }

  export type MoistureDeviceStatusUncheckedUpdateWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureDeviceStatusUncheckedUpdateManyWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationDeviceStatusUpdateWithoutFarmInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutIrrigationDeviceStatusesNestedInput
  }

  export type IrrigationDeviceStatusUncheckedUpdateWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationDeviceStatusUncheckedUpdateManyWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceAckUpdateWithoutFarmInput = {
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutDeviceAcksNestedInput
  }

  export type DeviceAckUncheckedUpdateWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    section_number?: IntFieldUpdateOperationsInput | number
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceAckUncheckedUpdateManyWithoutFarmInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    section_number?: IntFieldUpdateOperationsInput | number
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationScheduleUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledIrrigations?: ScheduledIrrigationUpdateManyWithoutScheduleNestedInput
  }

  export type IrrigationScheduleUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    scheduledIrrigations?: ScheduledIrrigationUncheckedUpdateManyWithoutScheduleNestedInput
  }

  export type IrrigationScheduleUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section_numbers?: IrrigationScheduleUpdatesection_numbersInput | number[]
    start_time?: StringFieldUpdateOperationsInput | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    frequency?: StringFieldUpdateOperationsInput | string
    days_of_week?: IrrigationScheduleUpdatedays_of_weekInput | number[]
    day_of_month?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    weather_dependent?: BoolFieldUpdateOperationsInput | boolean
    min_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    max_temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    min_moisture?: NullableIntFieldUpdateOperationsInput | number | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule?: IrrigationScheduleUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
    section?: SectionUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
  }

  export type ScheduledIrrigationUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule_id?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule_id?: StringFieldUpdateOperationsInput | string
    section_number?: IntFieldUpdateOperationsInput | number
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureReadingCreateManySectionInput = {
    id?: number
    value: number
    timestamp?: Date | string
  }

  export type IrrigationEventCreateManySectionInput = {
    id?: number
    water_ml: number
    start_time: Date | string
    end_time: Date | string
  }

  export type MoistureDeviceStatusCreateManySectionInput = {
    id?: number
    device_id: string
    mqtt: boolean
    wifi: boolean
    uptime: bigint | number
    timestamp?: Date | string
    last_error: string
    enable_deep_sleep: boolean
    reporting_interval: number
    deep_sleep_duration: number
    createdAt?: Date | string
  }

  export type IrrigationDeviceStatusCreateManySectionInput = {
    id?: number
    device_id: string
    uptime: bigint | number
    wifi: number
    mqtt: number
    last_error: string
    valve_on: number
    mode: string
    latest_moisture: number
    min_threshold?: number
    max_threshold?: number
    pulse_count: number
    water_ml: number
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type DeviceAckCreateManySectionInput = {
    id?: number
    device_id?: string | null
    ack_json: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type ScheduledIrrigationCreateManySectionInput = {
    id?: string
    schedule_id: string
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type MoistureReadingUpdateWithoutSectionInput = {
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutMoistureReadingsNestedInput
  }

  export type MoistureReadingUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureReadingUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationEventUpdateWithoutSectionInput = {
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutIrrigationEventsNestedInput
  }

  export type IrrigationEventUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationEventUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    water_ml?: FloatFieldUpdateOperationsInput | number
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureDeviceStatusUpdateWithoutSectionInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutMoistureDeviceStatusesNestedInput
  }

  export type MoistureDeviceStatusUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoistureDeviceStatusUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    mqtt?: BoolFieldUpdateOperationsInput | boolean
    wifi?: BoolFieldUpdateOperationsInput | boolean
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    last_error?: StringFieldUpdateOperationsInput | string
    enable_deep_sleep?: BoolFieldUpdateOperationsInput | boolean
    reporting_interval?: IntFieldUpdateOperationsInput | number
    deep_sleep_duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationDeviceStatusUpdateWithoutSectionInput = {
    device_id?: StringFieldUpdateOperationsInput | string
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutIrrigationDeviceStatusesNestedInput
  }

  export type IrrigationDeviceStatusUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IrrigationDeviceStatusUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: StringFieldUpdateOperationsInput | string
    uptime?: BigIntFieldUpdateOperationsInput | bigint | number
    wifi?: IntFieldUpdateOperationsInput | number
    mqtt?: IntFieldUpdateOperationsInput | number
    last_error?: StringFieldUpdateOperationsInput | string
    valve_on?: IntFieldUpdateOperationsInput | number
    mode?: StringFieldUpdateOperationsInput | string
    latest_moisture?: IntFieldUpdateOperationsInput | number
    min_threshold?: IntFieldUpdateOperationsInput | number
    max_threshold?: IntFieldUpdateOperationsInput | number
    pulse_count?: IntFieldUpdateOperationsInput | number
    water_ml?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceAckUpdateWithoutSectionInput = {
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutDeviceAcksNestedInput
  }

  export type DeviceAckUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceAckUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    device_id?: NullableStringFieldUpdateOperationsInput | string | null
    ack_json?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule?: IrrigationScheduleUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
    farm?: FarmUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
  }

  export type ScheduledIrrigationUncheckedUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule_id?: StringFieldUpdateOperationsInput | string
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationUncheckedUpdateManyWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    schedule_id?: StringFieldUpdateOperationsInput | string
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationCreateManyScheduleInput = {
    id?: string
    farm_id: number
    section_number: number
    scheduled_time: Date | string
    executed_time?: Date | string | null
    status: string
    skip_reason?: string | null
    duration_minutes: number
    water_used?: number | null
    created_at?: Date | string
  }

  export type ScheduledIrrigationUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
    section?: SectionUpdateOneRequiredWithoutScheduledIrrigationsNestedInput
  }

  export type ScheduledIrrigationUncheckedUpdateWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledIrrigationUncheckedUpdateManyWithoutScheduleInput = {
    id?: StringFieldUpdateOperationsInput | string
    farm_id?: IntFieldUpdateOperationsInput | number
    section_number?: IntFieldUpdateOperationsInput | number
    scheduled_time?: DateTimeFieldUpdateOperationsInput | Date | string
    executed_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    skip_reason?: NullableStringFieldUpdateOperationsInput | string | null
    duration_minutes?: IntFieldUpdateOperationsInput | number
    water_used?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use FarmCountOutputTypeDefaultArgs instead
     */
    export type FarmCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FarmCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SectionCountOutputTypeDefaultArgs instead
     */
    export type SectionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SectionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IrrigationScheduleCountOutputTypeDefaultArgs instead
     */
    export type IrrigationScheduleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IrrigationScheduleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FarmDefaultArgs instead
     */
    export type FarmArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FarmDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SectionDefaultArgs instead
     */
    export type SectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SectionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MoistureReadingDefaultArgs instead
     */
    export type MoistureReadingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MoistureReadingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IrrigationEventDefaultArgs instead
     */
    export type IrrigationEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IrrigationEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MoistureDeviceStatusDefaultArgs instead
     */
    export type MoistureDeviceStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MoistureDeviceStatusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IrrigationDeviceStatusDefaultArgs instead
     */
    export type IrrigationDeviceStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IrrigationDeviceStatusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeviceAckDefaultArgs instead
     */
    export type DeviceAckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeviceAckDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IrrigationScheduleDefaultArgs instead
     */
    export type IrrigationScheduleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IrrigationScheduleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScheduledIrrigationDefaultArgs instead
     */
    export type ScheduledIrrigationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScheduledIrrigationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}