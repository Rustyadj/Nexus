import { API_CONFIG } from '../config/api.config';

// ── Mock implementations ──────────────────────────────────────────────────────
import { devicesService as devicesMock } from './mock/devices.mock';
import { messagesService as messagesMock } from './mock/messages.mock';
import { photosService as photosMock } from './mock/photos.mock';
import { activityService as activityMock } from './mock/activity.mock';
import { alertsService as alertsMock } from './mock/alerts.mock';
import { logsService as logsMock } from './mock/logs.mock';
import { networkService as networkMock } from './mock/network.mock';
import { mapService as mapMock } from './mock/map.mock';
import { appsService as appsMock } from './mock/apps.mock';
import { securityService as securityMock } from './mock/security.mock';

// ── Real API implementations ──────────────────────────────────────────────────
import { devicesService as devicesApi } from './api/devices.api';
import { messagesService as messagesApi } from './api/messages.api';
import { activityService as activityApi } from './api/activity.api';
import { alertsService as alertsApi } from './api/alerts.api';
import { networkService as networkApi } from './api/network.api';
import { mapService as mapApi } from './api/map.api';

// ── Active exports — swap real ↔ mock by setting VITE_USE_MOCK=true ───────────
const useMock = API_CONFIG.useMock;

export const devicesService   = useMock ? devicesMock   : devicesApi;
export const messagesService  = useMock ? messagesMock  : messagesApi;
export const photosService    = photosMock;   // no real impl yet
export const activityService  = useMock ? activityMock  : activityApi;
export const alertsService    = useMock ? alertsMock    : alertsApi;
export const logsService      = logsMock;     // no real impl yet
export const networkService   = useMock ? networkMock   : networkApi;
export const mapService       = useMock ? mapMock       : mapApi;
export const appsService      = appsMock;     // no real impl yet
export const securityService  = securityMock; // no real impl yet

export type { DevicesService, MessagesService, PhotosService, ActivityService,
  AlertsService, LogsService, NetworkService, MapService, AppsService, SecurityService,
} from './contracts';

export type { Device, Message, Photo, ActivityEvent, Alert, LogEntry, NetworkEdge,
  Port, WifiNetwork, DnsEntry, Geofence, App, SecurityEvent,
  DeviceSummary, NetworkSummary, PaginatedResult, PaginationParams,
  DeviceType, DeviceStatus, AlertSeverity, LogLevel, ActivityType,
} from './types';
