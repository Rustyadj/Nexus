import { API_CONFIG } from '../../config/api.config';
import type { DevicesService } from '../contracts';

const base = API_CONFIG.baseUrl;

export const devicesService: DevicesService = {
  async getAll() {
    const r = await fetch(`${base}/devices`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getById(id) {
    const r = await fetch(`${base}/devices/${id}`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getSummary() {
    const r = await fetch(`${base}/devices/summary`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async lock(id) {
    await fetch(`${base}/devices/${id}/lock`, { method: 'POST', body: JSON.stringify({ action: 'lock' }), headers: { 'Content-Type': 'application/json' } });
  },
  async locate(id) {
    const r = await fetch(`${base}/devices/${id}/locate`, { method: 'POST' });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
};
