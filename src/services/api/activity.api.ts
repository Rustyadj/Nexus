import { API_CONFIG } from '../../config/api.config';
import type { ActivityService } from '../contracts';
import type { PaginationParams } from '../types';

const base = API_CONFIG.baseUrl;

export const activityService: ActivityService = {
  async getRecent(limit = 50) {
    const r = await fetch(`${base}/activity/recent?limit=${limit}`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getForDevice(deviceId, params: PaginationParams = {}) {
    const p = new URLSearchParams(params as Record<string, string>);
    const r = await fetch(`${base}/devices/${deviceId}/activity?${p}`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
};
