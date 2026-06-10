import React, { useState, useEffect } from 'react';
import {
  Monitor, Smartphone, Laptop, Tablet, Tv, Printer,
  Lock, MapPin, MoreHorizontal, MessageSquare, Image,
  Folder, Activity, Network, Grid, Shield, Battery,
  Wifi, Search, Plus
} from 'lucide-react';
import { devicesService, messagesService, photosService } from '../services';
import type { Device, Message, Photo } from '../services';

/* ── Device icon by type ──────────────────────────── */
const DeviceIcon: React.FC<{ type: Device['type']; size?: number; color?: string }> = ({ type, size = 14, color }) => {
  const c = color || 'currentColor';
  const props = { size, color: c };
  switch (type) {
    case 'phone': return <Smartphone {...props} />;
    case 'laptop': return <Laptop {...props} />;
    case 'tablet': return <Tablet {...props} />;
    case 'tv': return <Tv {...props} />;
    case 'printer': return <Printer {...props} />;
    default: return <Monitor {...props} />;
  }
};

/* ── Device list item ─────────────────────────────── */
const DeviceRow: React.FC<{ device: Device; selected: boolean; onClick: () => void }> = ({ device, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      background: selected ? 'var(--accent-dim)' : 'transparent',
      border: `1px solid ${selected ? 'var(--border-accent)' : 'transparent'}`,
      borderRadius: 'var(--radius)',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
      transition: 'background 0.12s',
    }}
    onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card-hover)'; }}
    onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
  >
    <div style={{
      width: 32, height: 32,
      borderRadius: 8,
      background: selected ? 'rgba(0,255,136,0.1)' : 'var(--bg-card)',
      border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      color: selected ? 'var(--accent)' : 'var(--text-secondary)',
    }}>
      <DeviceIcon type={device.type} size={14} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: selected ? 'var(--accent)' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {device.name}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{device.ip}</div>
    </div>
    <div className={`dot dot-${device.status === 'online' ? 'online' : 'gray'}`} />
    <span style={{ fontSize: 11, color: device.status === 'online' ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }}>
      {device.status === 'online' ? 'Online' : 'Offline'}
    </span>
  </button>
);

/* ── Tabs ─────────────────────────────────────────── */
const TABS = ['Overview', 'Messages', 'Photos', 'Files', 'Activity', 'Network', 'Apps', 'Security'] as const;
type Tab = typeof TABS[number];

/* ── Detail panel tabs ────────────────────────────── */
const tabIcons: Record<Tab, React.ReactNode> = {
  Overview: <Grid size={13} />,
  Messages: <MessageSquare size={13} />,
  Photos: <Image size={13} />,
  Files: <Folder size={13} />,
  Activity: <Activity size={13} />,
  Network: <Network size={13} />,
  Apps: <Grid size={13} />,
  Security: <Shield size={13} />,
};

/* ── Overview sub-panel ───────────────────────────── */
const OverviewTab: React.FC<{ device: Device }> = ({ device }) => (
  <div style={{ display: 'flex', gap: 16, height: '100%' }}>
    {/* Left: device stats */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'IP Address', value: device.ip },
          { label: 'MAC Address', value: device.mac },
          { label: 'Battery', value: device.battery !== undefined ? `${device.battery}%` : '—' },
          { label: 'Storage', value: device.storage ? `${device.storage.used}/${device.storage.total} GB` : '—' },
          { label: 'OS', value: device.os || '—' },
          { label: 'Network', value: device.network },
        ].map(({ label, value }) => (
          <div key={label} style={{ padding: '10px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
          </div>
        ))}
      </div>

      {device.battery !== undefined && (
        <div style={{ padding: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-secondary)', fontSize: 11 }}>
              <Battery size={12} /> Battery
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: device.battery > 50 ? 'var(--accent)' : device.battery > 20 ? 'var(--yellow)' : 'var(--red)' }}>
              {device.battery}%
            </span>
          </div>
          <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3,
              width: `${device.battery}%`,
              background: device.battery > 50 ? 'var(--accent)' : device.battery > 20 ? 'var(--yellow)' : 'var(--red)',
              transition: 'width 0.4s',
            }} />
          </div>
        </div>
      )}
    </div>

    {/* Right: recent activity + location */}
    <div style={{ width: 220, display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '12px', flex: 1, overflow: 'hidden' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Recent Activity</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { text: 'Message from Cody', time: '2 min ago', dot: 'var(--blue)' },
            { text: '312 new photos', time: '15 min ago', dot: 'var(--yellow)' },
            { text: 'Location updated', time: '18 min ago', dot: 'var(--accent)' },
            { text: 'App installed: WhatsApp', time: '25 min ago', dot: 'var(--blue)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.text}</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Location</div>
          <button style={{ background: 'none', color: 'var(--accent)', fontSize: 10 }}>View on Map →</button>
        </div>
        <div style={{
          height: 80,
          background: 'linear-gradient(135deg, #0a1428 0%, #0d1f3c 100%)',
          borderRadius: 6,
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute',
            width: 12, height: 12,
            background: 'var(--accent)',
            borderRadius: '50%',
            boxShadow: '0 0 12px var(--accent)',
          }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-primary)', marginTop: 6, fontWeight: 500 }}>
          {device.location ? `${device.location.city}, ${device.location.state}` : 'Unknown'}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{device.lastSeen}</div>
      </div>
    </div>
  </div>
);

/* ── Messages tab ─────────────────────────────────── */
const MessagesTab: React.FC<{ messages: Message[]; loading: boolean }> = ({ messages, loading }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', height: '100%' }}>
    {loading
      ? Array.from({ length: 3 }).map((_, i) => <div key={i} style={{ height: 60, background: 'var(--bg-card)', borderRadius: 'var(--radius)', opacity: 0.5 }} />)
      : messages.length === 0
        ? <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 40 }}>No messages on this device.</div>
        : messages.map(msg => (
          <div key={msg.id} style={{ padding: '12px 14px', background: 'var(--bg-card)', border: `1px solid ${!msg.read ? 'var(--border-accent)' : 'var(--border)'}`, borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{msg.from}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!msg.read && <span className="badge badge-green" style={{ fontSize: 9 }}>NEW</span>}
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{msg.content}</div>
          </div>
        ))
    }
  </div>
);

/* ── Photos tab ───────────────────────────────────── */
const PhotosTab: React.FC<{ photos: Photo[]; loading: boolean }> = ({ photos, loading }) => (
  <div style={{ height: '100%', overflowY: 'auto' }}>
    {loading
      ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
          {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ height: 120, background: 'var(--bg-card)', borderRadius: 'var(--radius)', opacity: 0.5 }} />)}
        </div>
      : photos.length === 0
        ? <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 40 }}>No photos on this device.</div>
        : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
            {photos.map(photo => (
              <div key={photo.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <div style={{ height: 90, background: 'linear-gradient(135deg, #1a2240 0%, #0d1520 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image size={24} color="var(--text-muted)" />
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ fontSize: 11, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>{photo.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{(photo.size / 1024 / 1024).toFixed(1)} MB · {new Date(photo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            ))}
          </div>
    }
  </div>
);

/* ── Placeholder tab ──────────────────────────────── */
const PlaceholderTab: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8, color: 'var(--text-muted)' }}>
    <div style={{ fontSize: 32 }}>—</div>
    <div style={{ fontSize: 13 }}>{label} data will appear here</div>
  </div>
);

/* ── Main Devices page ────────────────────────────── */
const Devices: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [messages, setMessages] = useState<Message[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    devicesService.getAll().then(list => {
      setDevices(list);
      if (list.length > 0) setSelectedId(list[0].id);
      setListLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    setTabLoading(true);
    setMessages([]);
    setPhotos([]);
    Promise.all([
      messagesService.getForDevice(selectedId),
      photosService.getForDevice(selectedId),
    ]).then(([msgs, phts]) => {
      setMessages(msgs.data);
      setPhotos(phts.data);
      setTabLoading(false);
    });
  }, [selectedId]);

  const filtered = devices.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.ip.includes(search);
    const matchFilter = filter === 'all' || d.status === filter;
    return matchSearch && matchFilter;
  });

  const selected = devices.find(d => d.id === selectedId) ?? devices[0];

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Left: Device list */}
      <div style={{
        width: 280,
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        background: 'var(--bg-secondary)',
      }}>
        {/* Search + filters */}
        <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={12} style={{ position: 'absolute', left: 8, color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search devices..."
                style={{
                  width: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '6px 8px 6px 26px',
                  color: 'var(--text-primary)',
                  fontSize: 12,
                }}
              />
            </div>
            <button className="btn btn-primary" style={{ padding: '6px 10px', fontSize: 12, flexShrink: 0 }}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'online', 'offline'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 500,
                  background: filter === f ? 'var(--accent-dim)' : 'var(--bg-card)',
                  color: filter === f ? 'var(--accent)' : 'var(--text-secondary)',
                  border: `1px solid ${filter === f ? 'var(--border-accent)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Device list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {filtered.map(d => (
            <DeviceRow key={d.id} device={d} selected={d.id === selectedId} onClick={() => { setSelectedId(d.id); setActiveTab('Overview'); }} />
          ))}
        </div>

        {/* Pagination */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
          <span>Showing 1 to {filtered.length} of {devices.length} devices</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3].map(n => (
              <button key={n} style={{
                width: 22, height: 22, borderRadius: 4, fontSize: 11,
                background: n === 1 ? 'var(--accent-dim)' : 'transparent',
                color: n === 1 ? 'var(--accent)' : 'var(--text-muted)',
                border: `1px solid ${n === 1 ? 'var(--border-accent)' : 'transparent'}`,
                cursor: 'pointer',
              }}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Device detail */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {!selected && <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading…</div>}
        {selected && <>
        {/* Detail header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexShrink: 0,
          background: 'var(--bg-secondary)',
        }}>
          <div style={{
            width: 40, height: 40,
            borderRadius: 10,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)',
          }}>
            <DeviceIcon type={selected.type} size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{selected.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <div className={`dot dot-${selected.status === 'online' ? 'online' : 'gray'}`} />
              <span style={{ fontSize: 11, color: selected.status === 'online' ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 500 }}>
                {selected.status === 'online' ? 'Online' : 'Offline'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Last seen: {selected.lastSeen}</span>
            </div>
          </div>
          {/* Actions */}
          <button className="btn btn-ghost" style={{ gap: 5 }}><Lock size={13} /> Lock</button>
          <button className="btn btn-ghost" style={{ gap: 5 }}><MapPin size={13} /> Locate</button>
          <button className="btn btn-ghost" style={{ padding: '7px 8px' }}><MoreHorizontal size={14} /></button>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div className="tab-bar" style={{ marginBottom: 0, borderBottom: 'none' }}>
            {TABS.map(tab => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, paddingLeft: 10, paddingRight: 10 }}
              >
                {tabIcons[tab]} {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '16px 20px', background: 'var(--bg-primary)' }}>
          {activeTab === 'Overview' && selected && <OverviewTab device={selected} />}
          {activeTab === 'Messages' && <MessagesTab messages={messages} loading={tabLoading} />}
          {activeTab === 'Photos' && <PhotosTab photos={photos} loading={tabLoading} />}
          {activeTab === 'Files' && <PlaceholderTab label="Files" />}
          {activeTab === 'Activity' && <PlaceholderTab label="Activity" />}
          {activeTab === 'Network' && <PlaceholderTab label="Network" />}
          {activeTab === 'Apps' && <PlaceholderTab label="Apps" />}
          {activeTab === 'Security' && <PlaceholderTab label="Security" />}
        </div>
        </>}
      </div>
    </div>
  );
};

export default Devices;
