'use client';

interface DeviceStatusData {
  device_id: string;
  mqtt: boolean;
  wifi: boolean;
  uptime: number;
  last_error: string;
  mode?: string;
  valve_on?: number;
  latest_moisture?: number;
  threshold?: number;
  reporting_interval?: number;
}

interface DeviceStatusProps {
  data: DeviceStatusData | null;
}

export function DeviceStatus({ data }: DeviceStatusProps) {
  if (!data) {
    return (
      <div className="text-center text-gray-500">
        <p>No device status available</p>
      </div>
    );
  }

  const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      {/* Device ID */}
      <div>
        <h4 className="text-sm font-medium text-gray-900">Device ID</h4>
        <p className="text-sm text-gray-600 font-mono">{data.device_id}</p>
      </div>

      {/* Connection Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900">WiFi Status</h4>
          <div className="flex items-center mt-1">
            {getStatusIcon(data.wifi)}
            <span className={`ml-2 text-sm ${getStatusColor(data.wifi)}`}>
              {data.wifi ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">MQTT Status</h4>
          <div className="flex items-center mt-1">
            {getStatusIcon(data.mqtt)}
            <span className={`ml-2 text-sm ${getStatusColor(data.mqtt)}`}>
              {data.mqtt ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Uptime */}
      <div>
        <h4 className="text-sm font-medium text-gray-900">Uptime</h4>
        <p className="text-sm text-gray-600">{formatUptime(data.uptime)}</p>
      </div>

      {/* Irrigation Controller Specific Data */}
      {data.mode && (
        <>
          <div>
            <h4 className="text-sm font-medium text-gray-900">Mode</h4>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              data.mode === 'auto' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {data.mode.charAt(0).toUpperCase() + data.mode.slice(1)}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900">Valve Status</h4>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              data.valve_on ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {data.valve_on ? 'Open' : 'Closed'}
            </span>
          </div>

          {data.latest_moisture !== undefined && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Latest Moisture</h4>
              <p className="text-sm text-gray-600">{data.latest_moisture}%</p>
            </div>
          )}

          {data.threshold !== undefined && (
            <div>
              <h4 className="text-sm font-medium text-gray-900">Threshold</h4>
              <p className="text-sm text-gray-600">{data.threshold}%</p>
            </div>
          )}
        </>
      )}

      {/* Reporting Interval */}
      {data.reporting_interval && (
        <div>
          <h4 className="text-sm font-medium text-gray-900">Reporting Interval</h4>
          <p className="text-sm text-gray-600">{data.reporting_interval} seconds</p>
        </div>
      )}

      {/* Last Error */}
      {data.last_error && data.last_error !== '' && (
        <div>
          <h4 className="text-sm font-medium text-gray-900">Last Error</h4>
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{data.last_error}</p>
        </div>
      )}
    </div>
  );
} 