import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Monitor, Map, Network, Activity, Rocket,
  Bell, ScrollText, Settings, Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { alertsService } from '../services';

const useBadgeCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => { alertsService.getActive().then(a => setCount(a.length)); }, []);
  return count;
};

const NAV = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/devices', label: 'Devices', icon: Monitor },
  { path: '/map', label: 'Map', icon: Map },
  { path: '/network', label: 'Network', icon: Network },
  { path: '/activity', label: 'Activity', icon: Activity },
  { path: '/deploy', label: 'Deploy', icon: Rocket },
  { path: '/alerts', label: 'Alerts', icon: Bell, hasBadge: true },
  { path: '/logs', label: 'Logs', icon: ScrollText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const alertCount = useBadgeCount();

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      height: '100%',
    }}>
      {/* Logo */}
      <div style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        borderBottom: '1px solid var(--border)',
        gap: 10,
        flexShrink: 0,
      }}>
        <div style={{
          width: 26, height: 26,
          background: 'var(--accent)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Shield size={14} color="#000" strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
          NEXUS
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {NAV.map(({ path, label, icon: Icon, hasBadge }) => {
          const badge = hasBadge ? alertCount : 0;
          const active = pathname === path || (path !== '/' && pathname.startsWith(path));
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 'var(--radius)',
                background: active ? 'var(--accent-dim)' : 'transparent',
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                transition: 'background 0.15s, color 0.15s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <Icon size={15} strokeWidth={active ? 2 : 1.75} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge ? (
                <span style={{
                  background: 'var(--red)',
                  color: '#fff',
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 6px',
                  minWidth: 18,
                  textAlign: 'center',
                }}>
                  {badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4d9eff, #00ff88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#000',
          flexShrink: 0,
        }}>R</div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Rusty</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Administrator</div>
        </div>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 5px var(--accent)', flexShrink: 0 }} />
      </div>
      <div style={{ padding: '0 14px 10px', fontSize: 10, color: 'var(--text-muted)' }}>● System Online</div>
    </aside>
  );
};

export default Sidebar;
