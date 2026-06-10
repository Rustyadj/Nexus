import { mockDelay } from '../../config/api.config';
import type { PhotosService } from '../contracts';
import type { Photo } from '../types';

const MOCK_PHOTOS: Photo[] = [
  { id: 'p1', deviceId: 'd1', name: 'IMG_4821.jpg', url: '', thumbnail: '', size: 3355443, timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'p2', deviceId: 'd1', name: 'IMG_4820.jpg', url: '', thumbnail: '', size: 2936012, timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'p3', deviceId: 'd1', name: 'IMG_4819.jpg', url: '', thumbnail: '', size: 4300800, timestamp: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: 'p4', deviceId: 'd1', name: 'IMG_4818.jpg', url: '', thumbnail: '', size: 3670016, timestamp: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: 'p5', deviceId: 'd1', name: 'IMG_4817.jpg', url: '', thumbnail: '', size: 2201600, timestamp: new Date(Date.now() - 240 * 60000).toISOString() },
  { id: 'p6', deviceId: 'd2', name: 'Screenshot 2026-06-10.png', url: '', thumbnail: '', size: 1258291, timestamp: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: 'p7', deviceId: 'd4', name: 'DCIM_1291.jpg', url: '', thumbnail: '', size: 5033164, timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'p8', deviceId: 'd4', name: 'DCIM_1290.jpg', url: '', thumbnail: '', size: 4089446, timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'p9', deviceId: 'd5', name: 'Scan_0042.pdf', url: '', thumbnail: '', size: 2201600, timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
];

export const photosService: PhotosService = {
  async getForDevice(deviceId, params = {}) {
    await mockDelay();
    const { page = 1, limit = 20 } = params;
    const all = MOCK_PHOTOS.filter(p => p.deviceId === deviceId);
    const start = (page - 1) * limit;
    return {
      data: all.slice(start, start + limit),
      total: all.length,
      page,
      limit,
      hasMore: start + limit < all.length,
    };
  },

  async delete(_deviceId, photoId) {
    await mockDelay();
    const idx = MOCK_PHOTOS.findIndex(p => p.id === photoId);
    if (idx !== -1) MOCK_PHOTOS.splice(idx, 1);
  },
};
