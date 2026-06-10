import { mockDelay } from '../../config/api.config';
import type { DevicesService } from '../contracts';
import type { Device, DeviceSummary } from '../types';

export const MOCK_DEVICES: Device[] = [
  {
    id: 'd1', name: 'iPhone 17 Pro', type: 'phone', status: 'online',
    ip: '192.168.1.15', mac: 'A4:83:E7:12:4B:7D', os: 'iOS 17.4',
    network: 'WiFi – Home Network', lastSeen: '2 min ago',
    battery: 87, storage: { used: 128, total: 256 },
    location: { lat: 32.78, lng: -96.80, city: 'Dallas', state: 'TX' },
    bandwidth: 22.1, metadata: {},
  },
  {
    id: 'd2', name: 'MacBook Pro', type: 'laptop', status: 'online',
    ip: '192.168.1.12', mac: 'F0:18:98:4A:22:BC', os: 'macOS Sequoia 15.2',
    network: 'WiFi – Home Network', lastSeen: '3 min ago',
    battery: 62, storage: { used: 512, total: 1024 },
    location: { lat: 41.88, lng: -87.63, city: 'Chicago', state: 'IL' },
    bandwidth: 98.3, metadata: {},
  },
  {
    id: 'd3', name: 'Windows Desktop', type: 'desktop', status: 'online',
    ip: '192.168.1.13', mac: 'C8:5B:76:9F:3D:11', os: 'Windows 11 Pro',
    network: 'Ethernet – Home Network', lastSeen: '5 min ago',
    storage: { used: 2048, total: 4096 },
    location: { lat: 43.65, lng: -79.38, city: 'Toronto', state: 'ON' },
    bandwidth: 67.2, metadata: {},
  },
  {
    id: 'd4', name: 'Galaxy S23', type: 'phone', status: 'online',
    ip: '192.168.1.18', mac: 'B4:A2:5C:8E:1F:90', os: 'Android 14',
    network: 'WiFi – Home Network', lastSeen: '1 min ago',
    battery: 43, storage: { used: 64, total: 128 },
    location: { lat: 25.77, lng: -80.19, city: 'Miami', state: 'FL' },
    bandwidth: 18.7, metadata: {},
  },
  {
    id: 'd5', name: 'iPad Air', type: 'tablet', status: 'online',
    ip: '192.168.1.16', mac: '8C:4A:B6:3C:77:2E', os: 'iPadOS 17.4',
    network: 'WiFi – Home Network', lastSeen: '10 min ago',
    battery: 91, storage: { used: 96, total: 256 },
    location: { lat: 33.45, lng: -112.07, city: 'Phoenix', state: 'AZ' },
    bandwidth: 12.4, metadata: {},
  },
  {
    id: 'd6', name: 'Samsung TV', type: 'tv', status: 'online',
    ip: '192.168.1.20', mac: '10:D5:42:FA:9B:3C', os: 'Tizen 7.0',
    network: 'WiFi – Home Network', lastSeen: '20 min ago',
    location: { lat: 32.78, lng: -96.80, city: 'Dallas', state: 'TX' },
    bandwidth: 34.3, metadata: {},
  },
  {
    id: 'd7', name: 'PlayStation 5', type: 'desktop', status: 'offline',
    ip: '192.168.1.21', mac: '28:3F:69:CC:4D:A1', os: 'PS5 System 8.0',
    network: 'Ethernet – Home Network', lastSeen: '2 hr ago',
    location: { lat: 32.78, lng: -96.80, city: 'Dallas', state: 'TX' },
    bandwidth: 0, metadata: {},
  },
  {
    id: 'd8', name: 'HP Printer', type: 'printer', status: 'online',
    ip: '192.168.1.22', mac: '70:5A:0F:B3:E2:44', os: 'HP FW 4.2',
    network: 'WiFi – Home Network', lastSeen: '1 hr ago',
    bandwidth: 0.4, metadata: {},
  },
];

export const devicesService: DevicesService = {
  async getAll() {
    await mockDelay();
    return MOCK_DEVICES;
  },

  async getById(id) {
    await mockDelay();
    const device = MOCK_DEVICES.find(d => d.id === id);
    if (!device) throw new Error(`Device ${id} not found`);
    return device;
  },

  async getSummary(): Promise<DeviceSummary> {
    await mockDelay();
    const online = MOCK_DEVICES.filter(d => d.status === 'online').length;
    return {
      total: MOCK_DEVICES.length,
      online,
      offline: MOCK_DEVICES.filter(d => d.status === 'offline').length,
      warning: MOCK_DEVICES.filter(d => d.status === 'warning').length,
      newToday: 3,
    };
  },

  async lock(id) {
    await mockDelay();
    console.log(`[mock] Locked device ${id}`);
  },

  async locate(id) {
    await mockDelay();
    const device = MOCK_DEVICES.find(d => d.id === id);
    return device?.location ?? { lat: 32.78, lng: -96.80 };
  },
};
