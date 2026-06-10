import { mockDelay } from '../../config/api.config';
import type { MapService } from '../contracts';
import type { Geofence } from '../types';
import { MOCK_DEVICES } from './devices.mock';

export const mapService: MapService = {
  async getDevices() {
    await mockDelay();
    return MOCK_DEVICES.filter(d => d.location);
  },

  async getTimeline(deviceId) {
    await mockDelay();
    const device = MOCK_DEVICES.find(d => d.id === deviceId);
    if (!device?.location) return [];
    const { lat, lng } = device.location;
    return Array.from({ length: 8 }, (_, i) => ({
      lat: lat + (Math.random() - 0.5) * 0.05,
      lng: lng + (Math.random() - 0.5) * 0.05,
      timestamp: new Date(Date.now() - (7 - i) * 60 * 60000).toISOString(),
    }));
  },

  async getGeofences(): Promise<Geofence[]> {
    await mockDelay();
    return [
      { id: 'gf1', name: 'Home', center: { lat: 32.78, lng: -96.80 }, radius: 0.5, devicesInside: ['d1', 'd6', 'd8'], color: '#00ff88' },
      { id: 'gf2', name: 'Work Zone', center: { lat: 32.79, lng: -96.82 }, radius: 1.0, devicesInside: [], color: '#4d9eff' },
    ];
  },
};
