export const API_CONFIG = {
  useMock: import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_URL,
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  mockDelay: { min: 150, max: 600 },
} as const;

export function mockDelay(): Promise<void> {
  const { min, max } = API_CONFIG.mockDelay;
  const ms = min + Math.random() * (max - min);
  return new Promise(resolve => setTimeout(resolve, ms));
}
