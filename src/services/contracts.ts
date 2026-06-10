import type {
  Device, Message, Photo, ActivityEvent, Alert, LogEntry,
  NetworkEdge, Port, WifiNetwork, DnsEntry, Geofence, App, SecurityEvent,
  DeviceSummary, NetworkSummary,
  PaginatedResult, PaginationParams,
} from './types';

// ── Service interfaces — every implementation must satisfy these ──────────────

export interface DevicesService {
  getAll(): Promise<Device[]>;
  getById(id: string): Promise<Device>;
  getSummary(): Promise<DeviceSummary>;
  lock(id: string): Promise<void>;
  locate(id: string): Promise<{ lat: number; lng: number }>;
}

export interface MessagesService {
  getForDevice(deviceId: string, params?: PaginationParams): Promise<PaginatedResult<Message>>;
  send(deviceId: string, content: string): Promise<Message>;
  delete(deviceId: string, messageId: string): Promise<void>;
  markRead(deviceId: string, messageId: string): Promise<void>;
}

export interface PhotosService {
  getForDevice(deviceId: string, params?: PaginationParams): Promise<PaginatedResult<Photo>>;
  delete(deviceId: string, photoId: string): Promise<void>;
}

export interface ActivityService {
  getRecent(limit?: number): Promise<ActivityEvent[]>;
  getForDevice(deviceId: string, params?: PaginationParams): Promise<PaginatedResult<ActivityEvent>>;
}

export interface AlertsService {
  getActive(): Promise<Alert[]>;
  getAll(): Promise<Alert[]>;
  resolve(alertId: string): Promise<void>;
}

export interface LogsService {
  getAll(params?: PaginationParams & { level?: string; search?: string }): Promise<PaginatedResult<LogEntry>>;
}

export interface NetworkService {
  getSummary(): Promise<NetworkSummary>;
  getTopology(): Promise<{ devices: Device[]; edges: NetworkEdge[] }>;
  getPorts(): Promise<Port[]>;
  getWifi(): Promise<WifiNetwork[]>;
  getDns(): Promise<DnsEntry[]>;
}

export interface MapService {
  getDevices(): Promise<Device[]>;
  getTimeline(deviceId: string): Promise<Array<{ lat: number; lng: number; timestamp: string }>>;
  getGeofences(): Promise<Geofence[]>;
}

export interface AppsService {
  getForDevice(deviceId: string): Promise<App[]>;
}

export interface SecurityService {
  getForDevice(deviceId: string): Promise<SecurityEvent[]>;
}
