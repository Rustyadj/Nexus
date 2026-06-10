import { mockDelay } from '../../config/api.config';
import type { AppsService } from '../contracts';
import type { App } from '../types';

const MOCK_APPS: App[] = [
  { id: 'app1', deviceId: 'd1', name: 'WhatsApp', version: '24.6.1', size: 245760000, installedAt: new Date(Date.now() - 25 * 60000).toISOString(), category: 'Social' },
  { id: 'app2', deviceId: 'd1', name: 'Safari', version: '17.4', size: 102400000, installedAt: new Date(Date.now() - 30 * 24 * 3600000).toISOString(), category: 'Browser' },
  { id: 'app3', deviceId: 'd1', name: 'Camera', version: '17.4', size: 51200000, installedAt: new Date(Date.now() - 30 * 24 * 3600000).toISOString(), category: 'System' },
  { id: 'app4', deviceId: 'd1', name: 'Instagram', version: '310.0', size: 358400000, installedAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(), category: 'Social' },
  { id: 'app5', deviceId: 'd2', name: 'Xcode', version: '15.3', size: 15360000000, installedAt: new Date(Date.now() - 14 * 24 * 3600000).toISOString(), category: 'Developer' },
  { id: 'app6', deviceId: 'd2', name: 'Slack', version: '4.38', size: 204800000, installedAt: new Date(Date.now() - 60 * 24 * 3600000).toISOString(), category: 'Productivity' },
];

export const appsService: AppsService = {
  async getForDevice(deviceId) {
    await mockDelay();
    return MOCK_APPS.filter(a => a.deviceId === deviceId);
  },
};
