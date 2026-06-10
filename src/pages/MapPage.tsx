import React, { useState } from 'react';
import { Clock3, LocateFixed, MapPin } from 'lucide-react';
import { DEVICES } from '../mockData';

const tabs = ['Live', 'Timeline', 'Heatmap', 'History', 'Geofences'] as const;
const positions: Record<string, { x: number; y: number }> = {
  d1: { x: 55, y: 62 }, d2: { x: 52, y: 42 }, d3: { x: 58, y: 32 },
  d4: { x: 63, y: 72 }, d5: { x: 28, y: 60 }, d6: { x: 18, y: 55 },
};

const MapPage: React.FC = () => {
  const [tab, setTab] = useState<typeof tabs[number]>('Live');
  const [selectedId, setSelectedId] = useState(DEVICES[0].id);
  const plotted = DEVICES.filter(device => positions[device.id]);

  return (
    <div className="page-wrapper" style={{ gap: 10 }}>
      <div className="page-header"><h1 className="page-title">Map</h1><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Device locations · updated live</div></div>
      <div className="tab-bar" style={{ marginBottom: 0 }}>{tabs.map(item => <button key={item} className={`tab ${tab === item ? 'active' : ''}`} onClick={() => setTab(item)}>{item}</button>)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', gap: 10, flex: 1, minHeight: 0 }}>
        <aside className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '11px 13px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>All Devices</div>
          <div style={{ overflowY: 'auto', padding: 7 }}>
            {DEVICES.map(device => (
              <button key={device.id} onClick={() => setSelectedId(device.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 8px',
                borderRadius: 7, textAlign: 'left', background: selectedId === device.id ? 'var(--accent-dim)' : 'transparent',
                border: 'none', borderLeft: `2px solid ${selectedId === device.id ? 'var(--accent)' : 'transparent'}`,
              }}>
                <span className={`dot ${device.status === 'online' ? 'dot-green' : 'dot-gray'}`} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'var(--text-primary)', fontSize: 11, fontWeight: 600 }}>{device.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 9, marginTop: 2 }}>{device.location.city}, {device.location.state} · {device.lastSeen}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="card" style={{
          position: 'relative', overflow: 'hidden', background: '#0a0e14',
          backgroundImage: 'radial-gradient(circle at 52% 53%, rgba(0,255,136,.08), transparent 24%), linear-gradient(rgba(77,158,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(77,158,255,.025) 1px, transparent 1px)',
          backgroundSize: 'auto, 32px 32px, 32px 32px',
        }}>
          <svg viewBox="0 0 900 560" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
            <path d="M96 115 L145 82 232 75 289 105 361 89 427 107 481 95 548 112 622 97 711 119 773 153 810 204 792 247 823 296 788 334 751 344 724 393 682 421 635 407 606 453 557 464 518 443 481 466 438 450 397 468 354 439 302 444 267 406 217 398 190 349 153 329 144 282 110 252 124 213 92 172 Z" fill="rgba(77,158,255,.075)" stroke="rgba(77,158,255,.28)" strokeWidth="2" />
            <path d="M605 407 L641 483 673 510" fill="none" stroke="rgba(77,158,255,.2)" strokeWidth="8" strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {['+', '−'].map(value => <button key={value} className="btn btn-ghost" style={{ width: 30, height: 30, padding: 0, justifyContent: 'center', background: 'var(--bg-secondary)' }}>{value}</button>)}
            <button className="btn btn-ghost" style={{ width: 30, height: 30, padding: 0, justifyContent: 'center', background: 'var(--bg-secondary)' }}><LocateFixed size={13} /></button>
          </div>
          {plotted.map(device => {
            const point = positions[device.id];
            const selected = selectedId === device.id;
            const color = device.status === 'online' ? 'var(--accent)' : 'var(--text-muted)';
            return (
              <button key={device.id} onClick={() => setSelectedId(device.id)} style={{
                position: 'absolute', left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)',
                background: 'none', border: 'none', color, zIndex: selected ? 3 : 2,
              }}>
                <span style={{
                  width: selected ? 24 : 18, height: selected ? 24 : 18, borderRadius: '50%',
                  display: 'grid', placeItems: 'center', background: '#0b1715', border: `2px solid ${color}`,
                  boxShadow: selected ? `0 0 0 7px color-mix(in srgb, ${color} 15%, transparent), 0 0 18px ${color}` : `0 0 9px ${color}`,
                }}><MapPin size={selected ? 13 : 10} /></span>
                <span style={{
                  position: 'absolute', left: 25, top: -9, background: 'rgba(10,14,20,.93)', border: '1px solid var(--border)',
                  padding: '5px 8px', borderRadius: 6, whiteSpace: 'nowrap', textAlign: 'left',
                }}>
                  <b style={{ color: 'var(--text-primary)', fontSize: 10 }}>{device.name}</b>
                  <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 8 }}>{device.location.city}, {device.location.state} · {device.lastSeen}</span>
                </span>
              </button>
            );
          })}
          <div style={{ position: 'absolute', left: 14, bottom: 12, color: 'var(--text-muted)', fontSize: 9 }}>NEXUS LOCATION GRID · {tab.toUpperCase()}</div>
        </div>
      </div>
      <div className="card" style={{ padding: '9px 13px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--accent)', fontSize: 10, fontWeight: 700 }}>LIVE</span><Clock3 size={12} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-muted)', fontSize: 9 }}>12:00 AM</span>
        <input type="range" min="0" max="24" defaultValue="24" style={{ flex: 1, accentColor: 'var(--accent)' }} />
        <span style={{ color: 'var(--text-muted)', fontSize: 9 }}>Now</span>
      </div>
    </div>
  );
};

export default MapPage;
