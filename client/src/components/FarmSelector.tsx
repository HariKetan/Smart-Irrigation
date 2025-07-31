"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';

interface Farm {
  id: number;
  name: string;
  location?: string;
}

interface FarmSelectorProps {
  onFarmChange: (farmId: number) => void;
  selectedFarmId?: number;
}

export function FarmSelector({ onFarmChange, selectedFarmId }: FarmSelectorProps) {
  const { user } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFarms = async () => {
      try {
        if (user?.farm_ids && user.farm_ids.length > 0) {
          // Get farms that the user has access to
          const allFarms = await api.getFarms() as Farm[];
          const userFarms = allFarms.filter((farm: Farm) => 
            user.farm_ids.includes(farm.id)
          );
          setFarms(userFarms);
          
          // Auto-select first farm if none selected
          if (!selectedFarmId && userFarms.length > 0) {
            onFarmChange(userFarms[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading farms:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFarms();
  }, [user, selectedFarmId, onFarmChange]);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading farms...</div>;
  }

  if (farms.length === 0) {
    return <div className="text-sm text-red-500">No farms available</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="farm-select" className="text-sm font-medium text-gray-700">
        Farm:
      </label>
      <select
        id="farm-select"
        value={selectedFarmId || ''}
        onChange={(e) => onFarmChange(Number(e.target.value))}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {farms.map((farm) => (
          <option key={farm.id} value={farm.id}>
            {farm.name} {farm.location && `(${farm.location})`}
          </option>
        ))}
      </select>
    </div>
  );
} 