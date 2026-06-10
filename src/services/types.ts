// ── Core domain types (canonical, service-layer contract) ────────────────────

export type DeviceType = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'router' | 'tv' | 'printer' | 'iot' | 'server';
export type DeviceStatus = 'online' | 'offline' | 'warning';
export type MessageType = 'sms' | 'mms' | 'app';
export type AlertSeverity = 'high' | 'medium' | 'low';
export type LogLevel = 'info' | 'warn' | 'error';
export type NetworkLinkType = 'wifi' | 'ethernet' | 'bluetooth' | 'cellular';
export type ActivityType = 'connection' | 'message' | 'photo' | 'alert' | 'login' | 'app' | 'location';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  ip: string;
  mac: string;
  os: string;
  network: string;
  lastSeen: string;
  battery?: number;
  storage?: { used: number; total: number };
  location?: { lat: number; lng: number; city: string; state: string };
  bandwidth: number;
  metadata: Record<string, unknown>;
}

export interface Message {
  id: string;
  deviceId: string;
  from: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: MessageType;
}

export interface Photo {
  id: string;
  deviceId: string;
  name: string;
  url: string;
  thumbnail: string;
  size: number;
  timestamp: string;
}

export interface ActivityEvent {
  id: string;
  deviceId: string;
  deviceName: string;
  type: ActivityType;
  description: string;
  timestamp: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
}

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  source: string;
  timestamp: string;
}

export interface NetworkEdge {
  source: string;
  target: string;
  type: NetworkLinkType;
  signalStrength: number;
  bandwidth: number;
}

export interface Port {
  port: number;
  protocol: 'tcp' | 'udp';
  service: string;
  state: 'open' | 'closed' | 'filtered';
  deviceId: string;
  deviceName: string;
}

export interface WifiNetwork {
  ssid: string;
  bssid: string;
  channel: number;
  frequency: number;
  signal: number;
  security: string;
  clients: number;
}

export interface DnsEntry {
  domain: string;
  type: 'A' | 'AAAA' | 'CNAME' | 'MX';
  value: string;
  ttl: number;
  cached: boolean;
}

export interface Geofence {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
  devicesInside: string[];
  color: string;
}

export interface App {
  id: string;
  deviceId: string;
  name: string;
  version: string;
  size: number;
  installedAt: string;
  category: string;
  icon?: string;
}

export interface SecurityEvent {
  id: string;
  deviceId: string;
  type: 'login' | 'failed_login' | 'app_install' | 'permission_change' | 'network_scan';
  description: string;
  severity: AlertSeverity;
  timestamp: string;
}

// ── Pagination ────────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  since?: string;
}

// ── Aggregates (home page) ────────────────────────────────────────────────────

export interface DeviceSummary {
  total: number;
  online: number;
  offline: number;
  warning: number;
  newToday: number;
}

export interface NetworkSummary {
  bandwidth: number;
  bandwidthTrend: number;
  connections: number;
  packetLoss: number;
  errors: number;
  healthScore: number;
  topTalkers: Array<{ deviceId: string; deviceName: string; bandwidth: number }>;
  history: Array<{ t: number; down: number; up: number }>;
}
