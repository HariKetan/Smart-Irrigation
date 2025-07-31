'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoistureReading {
  id: number;
  value: number;
  timestamp: string;
}

interface MoistureChartProps {
  data: MoistureReading[];
}

export function MoistureChart({ data }: MoistureChartProps) {
  // Transform data for the chart
  const chartData = data.map(reading => ({
    time: new Date(reading.timestamp).toLocaleTimeString(),
    moisture: reading.value,
    timestamp: reading.timestamp
  })).reverse(); // Show latest data on the right

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
          <p className="mt-1 text-sm text-gray-500">Moisture readings will appear here once data is available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            label={{ value: 'Moisture (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value: any) => [`${value}%`, 'Moisture']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="moisture" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 