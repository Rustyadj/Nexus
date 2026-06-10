import { mockDelay } from '../../config/api.config';
import type { LogsService } from '../contracts';
import type { LogEntry } from '../types';

const MOCK_LOGS: LogEntry[] = [
  { id: 'l1', level: 'info', message: 'Device iPhone 17 Pro connected to WiFi – Home Network', source: 'network', timestamp: new Date(Date.now() - 2 * 60000).toISOString() },
  { id: 'l2', level: 'info', message: 'New message received on iPhone 17 Pro from Cody', source: 'messages', timestamp: new Date(Date.now() - 3 * 60000).toISOString() },
  { id: 'l3', level: 'warn', message: 'High bandwidth usage on MacBook Pro: 98.3 Mbps', source: 'monitor', timestamp: new Date(Date.now() - 8 * 60000).toISOString() },
  { id: 'l4', level: 'error', message: 'Failed login attempt on Windows Desktop from 192.168.1.99', source: 'security', timestamp: new Date(Date.now() - 27 * 60000).toISOString() },
  { id: 'l5', level: 'info', message: '312 photos synced from Galaxy S23', source: 'sync', timestamp: new Date(Date.now() - 35 * 60000).toISOString() },
  { id: 'l6', level: 'info', message: 'App WhatsApp installed on iPhone 17 Pro', source: 'apps', timestamp: new Date(Date.now() - 50 * 60000).toISOString() },
  { id: 'l7', level: 'info', message: 'Samsung TV reconnected after 5 min offline', source: 'network', timestamp: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: 'l8', level: 'warn', message: 'Battery low on Galaxy S23: 43%', source: 'monitor', timestamp: new Date(Date.now() - 90 * 60000).toISOString() },
  { id: 'l9', level: 'error', message: 'PlayStation 5 disconnected unexpectedly', source: 'network', timestamp: new Date(Date.now() - 125 * 60000).toISOString() },
  { id: 'l10', level: 'info', message: 'HP Printer job completed: scan_0042.pdf', source: 'devices', timestamp: new Date(Date.now() - 180 * 60000).toISOString() },
  { id: 'l11', level: 'info', message: 'System health check passed. Score: 98/100', source: 'system', timestamp: new Date(Date.now() - 240 * 60000).toISOString() },
  { id: 'l12', level: 'warn', message: 'Certificate expiry warning: 30 days remaining', source: 'security', timestamp: new Date(Date.now() - 300 * 60000).toISOString() },
];

export const logsService: LogsService = {
  async getAll(params = {}) {
    await mockDelay();
    const { page = 1, limit = 50, level, search } = params;
    let all = [...MOCK_LOGS];
    if (level && level !== 'all') all = all.filter(l => l.level === level);
    if (search) all = all.filter(l => l.message.toLowerCase().includes(search.toLowerCase()) || l.source.includes(search.toLowerCase()));
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
