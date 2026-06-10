import { mockDelay } from '../../config/api.config';
import type { MessagesService } from '../contracts';
import type { Message } from '../types';

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', deviceId: 'd1', from: 'Cody', content: 'Hey, are you coming tonight?', timestamp: new Date(Date.now() - 3 * 60000).toISOString(), read: false, type: 'sms' },
  { id: 'm2', deviceId: 'd1', from: 'Mom', content: 'Call me when you get a chance', timestamp: new Date(Date.now() - 60 * 60000).toISOString(), read: true, type: 'sms' },
  { id: 'm3', deviceId: 'd1', from: 'Work', content: 'Meeting at 3pm confirmed', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), read: true, type: 'app' },
  { id: 'm4', deviceId: 'd1', from: 'Jake', content: 'The package was delivered', timestamp: new Date(Date.now() - 300 * 60000).toISOString(), read: true, type: 'sms' },
  { id: 'm5', deviceId: 'd2', from: 'Slack', content: 'New message in #general', timestamp: new Date(Date.now() - 5 * 60000).toISOString(), read: false, type: 'app' },
  { id: 'm6', deviceId: 'd4', from: 'Alex', content: 'On my way, 10 mins', timestamp: new Date(Date.now() - 2 * 60000).toISOString(), read: false, type: 'sms' },
  { id: 'm7', deviceId: 'd4', from: 'Lisa', content: '312 new photos synced', timestamp: new Date(Date.now() - 15 * 60000).toISOString(), read: true, type: 'app' },
];

export const messagesService: MessagesService = {
  async getForDevice(deviceId, params = {}) {
    await mockDelay();
    const { page = 1, limit = 20 } = params;
    const all = MOCK_MESSAGES.filter(m => m.deviceId === deviceId);
    const start = (page - 1) * limit;
    return {
      data: all.slice(start, start + limit),
      total: all.length,
      page,
      limit,
      hasMore: start + limit < all.length,
    };
  },

  async send(deviceId, content) {
    await mockDelay();
    const msg: Message = {
      id: `m${Date.now()}`,
      deviceId,
      from: 'Me',
      content,
      timestamp: new Date().toISOString(),
      read: true,
      type: 'sms',
    };
    MOCK_MESSAGES.push(msg);
    return msg;
  },

  async delete(_deviceId, messageId) {
    await mockDelay();
    const idx = MOCK_MESSAGES.findIndex(m => m.id === messageId);
    if (idx !== -1) MOCK_MESSAGES.splice(idx, 1);
  },

  async markRead(_deviceId, messageId) {
    await mockDelay();
    const msg = MOCK_MESSAGES.find(m => m.id === messageId);
    if (msg) msg.read = true;
  },
};
