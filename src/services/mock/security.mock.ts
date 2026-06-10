import { mockDelay } from '../../config/api.config';
import type { SecurityService } from '../contracts';
import type { SecurityEvent } from '../types';

const MOCK_SECURITY: SecurityEvent[] = [
  { id: 's1', deviceId: 'd3', type: 'failed_login', description: 'Failed SSH login from 192.168.1.99', severity: 'high', timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: 's2', deviceId: 'd1', type: 'app_install', description: 'WhatsApp installed from App Store', severity: 'low', timestamp: new Date(Date.now() - 25 * 60000).toISOString() },
  { id: 's3', deviceId: 'd4', type: 'app_install', description: 'Unknown APK sideloaded outside Play Store', severity: 'high', timestamp: new Date(Date.now() - 300 * 60000).toISOString() },
  { id: 's4', deviceId: 'd3', type: 'network_scan', description: 'Port scan detected from this device', severity: 'medium', timestamp: new Date(Date.now() - 480 * 60000).toISOString() },
  { id: 's5', deviceId: 'd1', type: 'login', description: 'Successful Face ID unlock', severity: 'low', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
];

export const securityService: SecurityService = {
  async getForDevice(deviceId) {
    await mockDelay();
    return MOCK_SECURITY.filter(e => e.deviceId === deviceId);
  },
};
