import { API_CONFIG } from '../../config/api.config';
import type { AlertsService } from '../contracts';

const base = API_CONFIG.baseUrl;

export const alertsService: AlertsService = {
  async getActive() {
    const r = await fetch(`${base}/alerts/active`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getAll() {
    const r = await fetch(`${base}/alerts`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async resolve(alertId) {
    await fetch(`${base}/alerts/${alertId}/resolve`, { method: 'POST' });
  },
};
