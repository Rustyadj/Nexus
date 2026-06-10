import { mockDelay } from '../../config/api.config';
import type { ActivityService } from '../contracts';
import type { ActivityEvent } from '../types';

export const MOCK_ACTIVITY: ActivityEvent[] = [
  { id: 'a1', deviceId: 'd1', deviceName: 'iPhone 17 Pro', type: 'connection', description: 'New device iPhone 17 Pro connected', timestamp: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 'a2', deviceId: 'd1', deviceName: 'iPhone 17 Pro', type: 'message', description: 'Message from Cody on iPhone 17 Pro', timestamp: new Date(Date.now() - 3 * 60000).toISOString() },
  { id: 'a3', deviceId: 'd4', deviceName: 'Galaxy S23', type: 'photo', description: '312 new photos from Galaxy S23', timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'a4', deviceId: 'd2', deviceName: 'MacBook Pro', type: 'alert', description: 'High bandwidth usage on MacBook Pro', timestamp: new Date(Date.now() - 18 * 60000).toISOString() },
  { id: 'a5', deviceId: 'd3', deviceName: 'Windows Desktop', type: 'login', description: 'Login from Windows Desktop', timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: 'a6', deviceId: 'd1', deviceName: 'iPhone 17 Pro', type: 'app', description: 'App installed: WhatsApp on iPhone 17 Pro', timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: 'a7', deviceId: 'd6', deviceName: 'Samsung TV', type: 'connection', description: 'Samsung TV reconnected to network', timestamp: new Date(Date.now() - 32 * 60000).toISOString() },
  { id: 'a8', deviceId: 'd1', deviceName: 'iPhone 17 Pro', type: 'photo', description: '14 new photos from iPhone 17 Pro', timestamp: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: 'a9', deviceId: 'd4', deviceName: 'Galaxy S23', type: 'alert', description: 'Low battery warning on Galaxy S23 (43%)', timestamp: new Date(Date.now() - 65 * 60000).toISOString() },
  { id: 'a10', deviceId: 'd3', deviceName: 'Windows Desktop', type: 'login', description: 'Failed login attempt blocked on Windows Desktop', timestamp: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: 'a11', deviceId: 'd4', deviceName: 'Galaxy S23', type: 'message', description: 'Message from Alex on Galaxy S23', timestamp: new Date(Date.now() - 122 * 60000).toISOString() },
  { id: 'a12', deviceId: 'd7', deviceName: 'PlayStation 5', type: 'connection', description: 'PlayStation 5 went offline', timestamp: new Date(Date.now() - 125 * 60000).toISOString() },
];

export const activityService: ActivityService = {
  async getRecent(limit = 50) {
    await mockDelay();
    return MOCK_ACTIVITY.slice(0, limit);
  },

  async getForDevice(deviceId, params = {}) {
    await mockDelay();
    const { page = 1, limit = 20 } = params;
    const all = MOCK_ACTIVITY.filter(a => a.deviceId === deviceId);
    const start = (page - 1) * limit;
    return {
      data: all.slice(start, start + limit),
      total: all.length,
      page,
      limit,
      hasMore: start + limit < all.length,
    };
  },
};
