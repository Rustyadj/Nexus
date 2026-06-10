import { mockDelay } from '../../config/api.config';
import type { NetworkService } from '../contracts';
import type { NetworkSummary, NetworkEdge, Port, WifiNetwork, DnsEntry } from '../types';
import { MOCK_DEVICES } from './devices.mock';

const now = Date.now();
const historyPoints = Array.from({ length: 20 }, (_, i) => ({
  t: now - (19 - i) * 3 * 60000,
  down: 180 + Math.random() * 100,
  up: 40 + Math.random() * 40,
}));

export const networkService: NetworkService = {
  async getSummary(): Promise<NetworkSummary> {
    await mockDelay();
    return {
      bandwidth: 256.7,
      bandwidthTrend: 12,
      connections: 42,
      packetLoss: 0.2,
      errors: 0,
      healthScore: 98,
      topTalkers: [
        { deviceId: 'd2', deviceName: 'MacBook Pro', bandwidth: 98.3 },
        { deviceId: 'd3', deviceName: 'Windows Desktop', bandwidth: 67.2 },
        { deviceId: 'd6', deviceName: 'Samsung TV', bandwidth: 34.3 },
        { deviceId: 'd1', deviceName: 'iPhone 17 Pro', bandwidth: 22.1 },
      ],
      history: historyPoints,
    };
  },

  async getTopology() {
    await mockDelay();
    const router: import('../types').Device = {
      id: 'router', name: 'Router', type: 'router', status: 'online',
      ip: '192.168.1.1', mac: 'AA:BB:CC:DD:EE:FF', os: 'RouterOS 7.1',
      network: 'Ethernet', lastSeen: 'now', bandwidth: 256.7, metadata: {},
    };
    const edges: NetworkEdge[] = MOCK_DEVICES.map(d => ({
      source: 'router',
      target: d.id,
      type: d.network.includes('Ethernet') ? 'ethernet' : 'wifi',
      signalStrength: d.status === 'offline' ? 0 : 60 + Math.random() * 40,
      bandwidth: d.bandwidth,
    }));
    return { devices: [router, ...MOCK_DEVICES], edges };
  },

  async getPorts(): Promise<Port[]> {
    await mockDelay();
    return [
      { port: 22, protocol: 'tcp', service: 'SSH', state: 'open', deviceId: 'd3', deviceName: 'Windows Desktop' },
      { port: 80, protocol: 'tcp', service: 'HTTP', state: 'open', deviceId: 'd3', deviceName: 'Windows Desktop' },
      { port: 443, protocol: 'tcp', service: 'HTTPS', state: 'open', deviceId: 'd3', deviceName: 'Windows Desktop' },
      { port: 5353, protocol: 'udp', service: 'mDNS', state: 'open', deviceId: 'd2', deviceName: 'MacBook Pro' },
      { port: 9100, protocol: 'tcp', service: 'JetDirect', state: 'open', deviceId: 'd8', deviceName: 'HP Printer' },
      { port: 3389, protocol: 'tcp', service: 'RDP', state: 'filtered', deviceId: 'd3', deviceName: 'Windows Desktop' },
    ];
  },

  async getWifi(): Promise<WifiNetwork[]> {
    await mockDelay();
    return [
      { ssid: 'Home Network', bssid: 'AA:BB:CC:11:22:33', channel: 6, frequency: 2.4, signal: -42, security: 'WPA3', clients: 6 },
      { ssid: 'Home Network 5G', bssid: 'AA:BB:CC:11:22:34', channel: 36, frequency: 5.0, signal: -55, security: 'WPA3', clients: 3 },
      { ssid: 'Neighbor_WiFi', bssid: 'DD:EE:FF:00:11:22', channel: 11, frequency: 2.4, signal: -78, security: 'WPA2', clients: 0 },
    ];
  },

  async getDns(): Promise<DnsEntry[]> {
    await mockDelay();
    return [
      { domain: 'google.com', type: 'A', value: '142.250.80.46', ttl: 300, cached: true },
      { domain: 'apple.com', type: 'A', value: '17.253.144.10', ttl: 3600, cached: true },
      { domain: 'icloud.com', type: 'CNAME', value: 'icloud.com.akadns.net', ttl: 60, cached: false },
      { domain: 'netflix.com', type: 'A', value: '52.5.215.214', ttl: 60, cached: true },
      { domain: 'amazonaws.com', type: 'A', value: '54.239.28.85', ttl: 30, cached: false },
    ];
  },
};
