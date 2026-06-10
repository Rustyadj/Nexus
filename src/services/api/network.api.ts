import { API_CONFIG } from '../../config/api.config';
import type { NetworkService } from '../contracts';

const base = API_CONFIG.baseUrl;

export const networkService: NetworkService = {
  async getSummary() {
    const r = await fetch(`${base}/network/summary`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getTopology() {
    const r = await fetch(`${base}/network/topology`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getPorts() {
    const r = await fetch(`${base}/network/ports`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getWifi() {
    const r = await fetch(`${base}/network/wifi`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async getDns() {
    const r = await fetch(`${base}/network/dns`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
};
