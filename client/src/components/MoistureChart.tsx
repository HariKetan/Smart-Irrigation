'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface MoistureReading {
  id: number;
  value: number;
  timestamp: string;
}

interface MoistureChartProps {
  data: MoistureReading[];
}

function formatHourLabel(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  const ampm = h < 12 ? 'AM' : 'PM';
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour} ${ampm}`;
}

export function MoistureChart({ data }: MoistureChartProps) {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [chartData, setChartData] = useState<any[]>([]);
  const [lastProcessedDate, setLastProcessedDate] = useState<string>('');

  // Update current date and refresh chart data
  useEffect(() => {
    const updateDate = () => {
      const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
      setCurrentDate(today);
      
      // Only recalculate if we have a new date or no cached data
      if (today !== lastProcessedDate || chartData.length === 0) {
        if (data && data.length > 0) {
          // Filter readings for today only
          const todaysReadings = data.filter(reading => {
            const readingDate = new Date(reading.timestamp).toLocaleDateString('en-CA');
            return readingDate === today;
          });

          // Sort by timestamp
          const sorted = todaysReadings.sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );

          // Create 24-hour timeline with actual data
          const hourlyData = Array.from({ length: 24 }, (_, hour) => {
            const hourReadings = sorted.filter(reading => {
              const readingHour = new Date(reading.timestamp).getHours();
              return readingHour === hour;
            });

            if (hourReadings.length === 0) {
              return {
                hour,
                moisture: null,
                readingCount: 0,
                timeLabel: formatHourLabel(hour)
              };
            }

            // Calculate average moisture for this hour
            const totalMoisture = hourReadings.reduce((sum, reading) => sum + reading.value, 0);
            const averageMoisture = Math.round((totalMoisture / hourReadings.length) * 100) / 100;

            return {
              hour,
              moisture: averageMoisture,
              readingCount: hourReadings.length,
              timeLabel: formatHourLabel(hour)
            };
          });

          // Fill in past hours with the most recent available data
          const currentHour = new Date().getHours();
          for (let hour = 0; hour <= currentHour; hour++) {
            if (hourlyData[hour].moisture === null) {
              // Find the most recent reading before this hour
              const pastReadings = sorted.filter(reading => {
                const readingHour = new Date(reading.timestamp).getHours();
                return readingHour < hour;
              });
              
              if (pastReadings.length > 0) {
                // Use the most recent reading before this hour
                const mostRecent = pastReadings[pastReadings.length - 1];
                hourlyData[hour] = {
                  hour,
                  moisture: mostRecent.value,
                  readingCount: 1,
                  timeLabel: formatHourLabel(hour)
                };
              }
            }
          }

          setChartData(hourlyData);
          setLastProcessedDate(today); // Cache this date
        }
      }
    };

    // Update immediately
    updateDate();

    // Set up daily refresh at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimer = setTimeout(() => {
      updateDate();
      // Then refresh every 24 hours
      setInterval(updateDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    // Cleanup
    return () => {
      clearTimeout(midnightTimer);
    };
  }, [data, lastProcessedDate, chartData.length]); // Only depend on these values

  // Guard empty
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No data available</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Moisture readings will appear here once data is available.</p>
        </div>
      </div>
    );
  }

  // Check if we have any data for today
  const hasTodayData = chartData.some(item => item.moisture !== null);

  if (!hasTodayData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No data for today</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No moisture readings available for {currentDate}</p>
        </div>
      </div>
    );
  }

  const ticks = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="h-64">
      {/* <div className="text-center mb-2 text-sm text-muted-foreground dark:text-gray-300">
        Moisture Trend - {currentDate}
      </div> */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="hour"
            type="number"
            domain={[0, 23]}
            ticks={ticks}
            allowDecimals={false}
            tick={{ 
              fontSize: 12,
              fill: "hsl(var(--foreground))"
            }}
            tickFormatter={(h: number) => formatHourLabel(h)}
            axisLine={{ 
              stroke: "hsl(var(--border))",
              strokeOpacity: 0.5
            }}
            tickLine={{ 
              stroke: "hsl(var(--border))",
              strokeOpacity: 0.5
            }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ 
              fontSize: 12,
              fill: "hsl(var(--foreground))"
            }}
            label={{ 
              value: 'Moisture (%)', 
              angle: -90, 
              position: 'insideLeft',
              fill: "hsl(var(--foreground))",
              fontSize: 12
            }}
            axisLine={{ 
              stroke: "hsl(var(--border))",
              strokeOpacity: 0.5
            }}
            tickLine={{ 
              stroke: "hsl(var(--border))",
              strokeOpacity: 0.5
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              color: "hsl(var(--foreground))"
            }}
            formatter={(value: any, name: any, props: any) => [
              value != null ? `${value}%` : 'No data', 
              'Moisture'
            ]}
            labelFormatter={(h: any) => {
              const item = chartData.find(d => d.hour === h);
              return `Hour: ${item?.timeLabel || formatHourLabel(h)}`;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="moisture" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ 
              fill: "hsl(var(--primary))", 
              strokeWidth: 2, 
              r: 4,
              stroke: "hsl(var(--background))"
            }}
            activeDot={{ 
              r: 6, 
              stroke: "hsl(var(--primary))", 
              strokeWidth: 2,
              fill: "hsl(var(--primary))"
            }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 