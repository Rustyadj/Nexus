export type DeviceType = 'mobile' | 'desktop' | 'laptop' | 'tablet' | 'tv' | 'printer';
export type DeviceStatus = 'online' | 'offline';

export interface Message {
  id: string;
  from: string;
  body: string;
  time: string;
  read: boolean;
}

export interface Photo {
  id: string;
  name: string;
  size: string;
  time: string;
  thumb?: string;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ip: string;
  mac: string;
  status: DeviceStatus;
  battery?: number;
  storage?: string;
  os?: string;
  network: string;
  lastSeen: string;
  bandwidth: number;
  location: { city: string; state: string; lat: number; lng: number };
  messages: Message[];
  photos: Photo[];
}

export interface ActivityEvent {
  id: string;
  type: 'connection' | 'message' | 'photo' | 'alert' | 'login' | 'app';
  description: string;
  deviceId: string;
  deviceName: string;
  timeAgo: string;
}

export interface Alert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  deviceId: string;
  deviceName: string;
  timeAgo: string;
  resolved: boolean;
}

export interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  source: string;
  time: string;
}

export const DEVICES: Device[] = [
  {
    id: 'd1',
    name: 'iPhone 17 Pro',
    type: 'mobile',
    ip: '192.168.1.15',
    mac: 'A4:83:E7:12:4B:7D',
    status: 'online',
    battery: 87,
    storage: '128 GB / 256 GB',
    os: 'iOS 17.4',
    network: 'WiFi – Home Network',
    lastSeen: '2 min ago',
    bandwidth: 22.1,
    location: { city: 'Dallas', state: 'TX', lat: 32.78, lng: -96.8 },
    messages: [
      { id: 'm1', from: 'Cody', body: 'Hey, are you coming tonight?', time: '3 min ago', read: false },
      { id: 'm2', from: 'Mom', body: 'Call me when you get a chance', time: '1 hr ago', read: true },
      { id: 'm3', from: 'Work', body: 'Meeting at 3pm confirmed', time: '2 hr ago', read: true },
      { id: 'm4', from: 'Jake', body: 'The package was delivered', time: '5 hr ago', read: true },
    ],
    photos: [
      { id: 'p1', name: 'IMG_4821.jpg', size: '3.2 MB', time: '15 min ago' },
      { id: 'p2', name: 'IMG_4820.jpg', size: '2.8 MB', time: '15 min ago' },
      { id: 'p3', name: 'IMG_4819.jpg', size: '4.1 MB', time: '1 hr ago' },
      { id: 'p4', name: 'IMG_4818.jpg', size: '3.5 MB', time: '2 hr ago' },
      { id: 'p5', name: 'IMG_4817.jpg', size: '2.1 MB', time: '4 hr ago' },
    ],
  },
  {
    id: 'd2',
    name: 'MacBook Pro',
    type: 'laptop',
    ip: '192.168.1.12',
    mac: 'F0:18:98:4A:22:BC',
    status: 'online',
    battery: 62,
    storage: '512 GB / 1 TB',
    os: 'macOS Sequoia 15.2',
    network: 'WiFi – Home Network',
    lastSeen: '3 min ago',
    bandwidth: 98.3,
    location: { city: 'Chicago', state: 'IL', lat: 41.88, lng: -87.63 },
    messages: [
      { id: 'm5', from: 'Slack', body: 'New message in #general', time: '5 min ago', read: false },
    ],
    photos: [
      { id: 'p6', name: 'Screenshot 2026-06-10.png', size: '1.2 MB', time: '10 min ago' },
    ],
  },
  {
    id: 'd3',
    name: 'Windows Desktop',
    type: 'desktop',
    ip: '192.168.1.13',
    mac: 'C8:5B:76:9F:3D:11',
    status: 'online',
    storage: '2 TB / 4 TB',
    os: 'Windows 11 Pro',
    network: 'Ethernet – Home Network',
    lastSeen: '5 min ago',
    bandwidth: 67.2,
    location: { city: 'Toronto', state: 'ON', lat: 43.65, lng: -79.38 },
    messages: [],
    photos: [],
  },
  {
    id: 'd4',
    name: 'Galaxy S23',
    type: 'mobile',
    ip: '192.168.1.18',
    mac: 'B4:A2:5C:8E:1F:90',
    status: 'online',
    battery: 43,
    storage: '64 GB / 128 GB',
    os: 'Android 14',
    network: 'WiFi – Home Network',
    lastSeen: '1 min ago',
    bandwidth: 18.7,
    location: { city: 'Miami', state: 'FL', lat: 25.77, lng: -80.19 },
    messages: [
      { id: 'm6', from: 'Alex', body: 'On my way, 10 mins', time: '2 min ago', read: false },
      { id: 'm7', from: 'Lisa', body: '312 new photos synced', time: '15 min ago', read: true },
    ],
    photos: [
      { id: 'p7', name: 'DCIM_1291.jpg', size: '4.8 MB', time: '15 min ago' },
      { id: 'p8', name: 'DCIM_1290.jpg', size: '3.9 MB', time: '15 min ago' },
    ],
  },
  {
    id: 'd5',
    name: 'iPad Air',
    type: 'tablet',
    ip: '192.168.1.16',
    mac: '8C:4A:B6:3C:77:2E',
    status: 'online',
    battery: 91,
    storage: '96 GB / 256 GB',
    os: 'iPadOS 17.4',
    network: 'WiFi – Home Network',
    lastSeen: '10 min ago',
    bandwidth: 12.4,
    location: { city: 'Phoenix', state: 'AZ', lat: 33.45, lng: -112.07 },
    messages: [],
    photos: [
      { id: 'p9', name: 'Scan_0042.pdf', size: '2.1 MB', time: '30 min ago' },
    ],
  },
  {
    id: 'd6',
    name: 'Samsung TV',
    type: 'tv',
    ip: '192.168.1.20',
    mac: '10:D5:42:FA:9B:3C',
    status: 'online',
    os: 'Tizen 7.0',
    network: 'WiFi – Home Network',
    lastSeen: '20 min ago',
    bandwidth: 34.3,
    location: { city: 'Dallas', state: 'TX', lat: 32.78, lng: -96.8 },
    messages: [],
    photos: [],
  },
  {
    id: 'd7',
    name: 'PlayStation 5',
    type: 'desktop',
    ip: '192.168.1.21',
    mac: '28:3F:69:CC:4D:A1',
    status: 'offline',
    network: 'Ethernet – Home Network',
    lastSeen: '2 hr ago',
    bandwidth: 0,
    location: { city: 'Dallas', state: 'TX', lat: 32.78, lng: -96.8 },
    messages: [],
    photos: [],
  },
  {
    id: 'd8',
    name: 'HP Printer',
    type: 'printer',
    ip: '192.168.1.22',
    mac: '70:5A:0F:B3:E2:44',
    status: 'online',
    network: 'WiFi – Home Network',
    lastSeen: '1 hr ago',
    bandwidth: 0.4,
    location: { city: 'Dallas', state: 'TX', lat: 32.78, lng: -96.8 },
    messages: [],
    photos: [],
  },
];

export const ACTIVITY_FEED: ActivityEvent[] = [
  { id: 'a1', type: 'connection', description: 'New device iPhone 17 Pro connected', deviceId: 'd1', deviceName: 'iPhone 17 Pro', timeAgo: '2 min ago' },
  { id: 'a2', type: 'message', description: 'Message from Cody on iPhone 17 Pro', deviceId: 'd1', deviceName: 'iPhone 17 Pro', timeAgo: '3 min ago' },
  { id: 'a3', type: 'photo', description: '312 new photos from Galaxy S23', deviceId: 'd4', deviceName: 'Galaxy S23', timeAgo: '15 min ago' },
  { id: 'a4', type: 'alert', description: 'High bandwidth usage on MacBook Pro', deviceId: 'd2', deviceName: 'MacBook Pro', timeAgo: '18 min ago' },
  { id: 'a5', type: 'login', description: 'Login from Windows Desktop', deviceId: 'd3', deviceName: 'Windows Desktop', timeAgo: '25 min ago' },
  { id: 'a6', type: 'app', description: 'App installed: WhatsApp on iPhone 17 Pro', deviceId: 'd1', deviceName: 'iPhone 17 Pro', timeAgo: '25 min ago' },
  { id: 'a7', type: 'connection', description: 'Samsung TV reconnected to network', deviceId: 'd6', deviceName: 'Samsung TV', timeAgo: '32 min ago' },
  { id: 'a8', type: 'photo', description: '14 new photos from iPhone 17 Pro', deviceId: 'd1', deviceName: 'iPhone 17 Pro', timeAgo: '1 hr ago' },
  { id: 'a9', type: 'alert', description: 'Low battery warning on Galaxy S23 (43%)', deviceId: 'd4', deviceName: 'Galaxy S23', timeAgo: '1 hr ago' },
  { id: 'a10', type: 'login', description: 'Failed login attempt blocked on Windows Desktop', deviceId: 'd3', deviceName: 'Windows Desktop', timeAgo: '2 hr ago' },
  { id: 'a11', type: 'message', description: 'Message from Alex on Galaxy S23', deviceId: 'd4', deviceName: 'Galaxy S23', timeAgo: '2 hr ago' },
  { id: 'a12', type: 'connection', description: 'PlayStation 5 went offline', deviceId: 'd7', deviceName: 'PlayStation 5', timeAgo: '2 hr ago' },
];

export const ALERTS: Alert[] = [
  { id: 'al1', severity: 'high', title: 'High bandwidth usage detected', description: 'MacBook Pro is using 98.3 Mbps — 3x above average for this device.', deviceId: 'd2', deviceName: 'MacBook Pro', timeAgo: '18 min ago', resolved: false },
  { id: 'al2', severity: 'medium', title: 'Unusual login attempt blocked', description: 'Multiple failed SSH login attempts from unknown source on Windows Desktop.', deviceId: 'd3', deviceName: 'Windows Desktop', timeAgo: '25 min ago', resolved: false },
  { id: 'al3', severity: 'low', title: 'Device went offline', description: 'PlayStation 5 disconnected unexpectedly and has not reconnected.', deviceId: 'd7', deviceName: 'PlayStation 5', timeAgo: '2 hr ago', resolved: false },
  { id: 'al4', severity: 'medium', title: 'Low storage warning', description: 'iPhone 17 Pro is at 50% storage capacity (128 GB / 256 GB used).', deviceId: 'd1', deviceName: 'iPhone 17 Pro', timeAgo: '3 hr ago', resolved: false },
  { id: 'al5', severity: 'high', title: 'Suspicious app installation', description: 'Unknown app installed on Galaxy S23 outside of app store.', deviceId: 'd4', deviceName: 'Galaxy S23', timeAgo: '5 hr ago', resolved: true },
  { id: 'al6', severity: 'low', title: 'Network scan detected', description: 'Port scan detected originating from 192.168.1.13 (Windows Desktop).', deviceId: 'd3', deviceName: 'Windows Desktop', timeAgo: '8 hr ago', resolved: true },
];

export const LOGS: LogEntry[] = [
  { id: 'l1', level: 'info', message: 'Device iPhone 17 Pro connected to WiFi – Home Network', source: 'network', time: '06:10:02' },
  { id: 'l2', level: 'info', message: 'New message received on iPhone 17 Pro from Cody', source: 'messages', time: '06:09:45' },
  { id: 'l3', level: 'warn', message: 'High bandwidth usage on MacBook Pro: 98.3 Mbps', source: 'monitor', time: '06:07:12' },
  { id: 'l4', level: 'error', message: 'Failed login attempt on Windows Desktop from 192.168.1.99', source: 'security', time: '05:58:44' },
  { id: 'l5', level: 'info', message: '312 photos synced from Galaxy S23', source: 'sync', time: '05:55:30' },
  { id: 'l6', level: 'info', message: 'App WhatsApp installed on iPhone 17 Pro', source: 'apps', time: '05:50:11' },
  { id: 'l7', level: 'info', message: 'Samsung TV reconnected after 5 min offline', source: 'network', time: '05:43:00' },
  { id: 'l8', level: 'warn', message: 'Battery low on Galaxy S23: 43%', source: 'monitor', time: '05:30:18' },
  { id: 'l9', level: 'error', message: 'PlayStation 5 disconnected unexpectedly', source: 'network', time: '04:12:55' },
  { id: 'l10', level: 'info', message: 'HP Printer job completed: scan_0042.pdf', source: 'devices', time: '03:45:09' },
  { id: 'l11', level: 'info', message: 'System health check passed. Score: 98/100', source: 'system', time: '03:00:00' },
  { id: 'l12', level: 'warn', message: 'Certificate expiry warning: 30 days remaining', source: 'security', time: '02:15:34' },
];
