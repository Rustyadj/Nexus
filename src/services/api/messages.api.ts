import { API_CONFIG } from '../../config/api.config';
import type { MessagesService } from '../contracts';
import type { PaginationParams } from '../types';

const base = API_CONFIG.baseUrl;

function qs(params: PaginationParams) {
  const p = new URLSearchParams();
  if (params.page) p.set('page', String(params.page));
  if (params.limit) p.set('limit', String(params.limit));
  if (params.since) p.set('since', params.since);
  return p.toString() ? `?${p}` : '';
}

export const messagesService: MessagesService = {
  async getForDevice(deviceId, params = {}) {
    const r = await fetch(`${base}/devices/${deviceId}/messages${qs(params)}`);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async send(deviceId, content) {
    const r = await fetch(`${base}/devices/${deviceId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async delete(deviceId, messageId) {
    await fetch(`${base}/devices/${deviceId}/messages/${messageId}`, { method: 'DELETE' });
  },
  async markRead(deviceId, messageId) {
    await fetch(`${base}/devices/${deviceId}/messages/${messageId}/read`, { method: 'POST' });
  },
};
