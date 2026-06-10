import { API_CONFIG } from '../../config/api.config';
import type { MapService } from '../contracts';

const base = API_CONFIG.baseUrl;

export const mapService: MapService = {
  async getDevices() {
    const r = await fetch(`${base}/map/devices`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getTimeline(deviceId) {
    const r = await fetch(`${base}/map/timeline?deviceId=${deviceId}`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getGeofences() {
    const r = await fetch(`${base}/map/geofences`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
};
