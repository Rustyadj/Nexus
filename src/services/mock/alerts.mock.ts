import { mockDelay } from '../../config/api.config';
import type { AlertsService } from '../contracts';
import type { Alert } from '../types';

const MOCK_ALERTS: Alert[] = [
  { id: 'al1', deviceId: 'd2', deviceName: 'MacBook Pro', severity: 'high', title: 'High bandwidth usage detected', description: 'MacBook Pro is using 98.3 Mbps — 3x above average for this device.', timestamp: new Date(Date.now() - 18 * 60000).toISOString(), resolved: false },
  { id: 'al2', deviceId: 'd3', deviceName: 'Windows Desktop', severity: 'medium', title: 'Unusual login attempt blocked', description: 'Multiple failed SSH login attempts from unknown source on Windows Desktop.', timestamp: new Date(Date.now() - 25 * 60000).toISOString(), resolved: false },
  { id: 'al3', deviceId: 'd7', deviceName: 'PlayStation 5', severity: 'low', title: 'Device went offline', description: 'PlayStation 5 disconnected unexpectedly and has not reconnected.', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), resolved: false },
  { id: 'al4', deviceId: 'd1', deviceName: 'iPhone 17 Pro', severity: 'medium', title: 'Low storage warning', description: 'iPhone 17 Pro is at 50% storage capacity (128 GB / 256 GB used).', timestamp: new Date(Date.now() - 180 * 60000).toISOString(), resolved: false },
  { id: 'al5', deviceId: 'd4', deviceName: 'Galaxy S23', severity: 'high', title: 'Suspicious app installation', description: 'Unknown app installed on Galaxy S23 outside of app store.', timestamp: new Date(Date.now() - 300 * 60000).toISOString(), resolved: true },
  { id: 'al6', deviceId: 'd3', deviceName: 'Windows Desktop', severity: 'low', title: 'Network scan detected', description: 'Port scan detected originating from 192.168.1.13 (Windows Desktop).', timestamp: new Date(Date.now() - 480 * 60000).toISOString(), resolved: true },
];

export const alertsService: AlertsService = {
  async getActive() {
    await mockDelay();
    return MOCK_ALERTS.filter(a => !a.resolved);
  },

  async getAll() {
    await mockDelay();
    return MOCK_ALERTS;
  },

  async resolve(alertId) {
    await mockDelay();
    const alert = MOCK_ALERTS.find(a => a.id === alertId);
    if (alert) alert.resolved = true;
  },
};
