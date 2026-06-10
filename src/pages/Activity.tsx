import React, { useState } from 'react';
import { Activity as ActivityIcon, Bell, Image, LogIn, MessageSquare, Plug, Smartphone } from 'lucide-react';
import { ACTIVITY_FEED, type ActivityEvent } from '../mockData';

const filters = ['All', 'Connections', 'Messages', 'Photos', 'Alerts', 'Logins'] as const;
type Filter = typeof filters[number];

const config: Record<ActivityEvent['type'], { color: string; icon: React.ReactNode }> = {
  connection: { color: 'var(--accent)', icon: <Plug size={15} /> },
  message: { color: 'var(--blue)', icon: <MessageSquare size={15} /> },
  photo: { color: 'var(--yellow)', icon: <Image size={15} /> },
  alert: { color: 'var(--red)', icon: <Bell size={15} /> },
  login: { color: '#a78bfa', icon: <LogIn size={15} /> },
  app: { color: 'var(--blue)', icon: <Smartphone size={15} /> },
};

const matches = (event: ActivityEvent, filter: Filter) =>
  filter === 'All' || event.type === filter.toLowerCase().replace(/s$/, '');

const bucket = (event: ActivityEvent) => {
  const minutes = Number.parseInt(event.timeAgo, 10);
  if (event.timeAgo.includes('min') && minutes <= 5) return 'Just now';
  if (event.timeAgo.includes('min')) return 'Last hour';
  return 'Earlier today';
};

const Activity: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = ACTIVITY_FEED.filter(event => matches(event, filter));
  const groups = ['Just now', 'Last hour', 'Earlier today']
    .map(label => ({ label, events: visible.filter(event => bucket(event) === label) }))
    .filter(group => group.events.length);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Activity</h1>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>A live record of activity across your devices</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--accent)', fontSize: 11 }}>
          <span className="dot dot-online" /> Live
        </div>
      </div>

      <div className="tab-bar" style={{ marginBottom: 0 }}>
        {filters.map(item => (
          <button key={item} className={`tab ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="card" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 18px 18px' }}>
        {groups.length ? groups.map(group => (
          <section key={group.label}>
            <div style={{
              position: 'sticky', top: 0, zIndex: 2, padding: '15px 0 8px',
              background: 'var(--bg-secondary)', color: 'var(--text-muted)',
              fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
            }}>
              {group.label}
            </div>
            {group.events.map((event, index) => {
              const meta = config[event.type];
              return (
                <div key={event.id} style={{
                  display: 'flex', alignItems: 'center', gap: 13, padding: '13px 2px',
                  borderBottom: index === group.events.length - 1 ? 'none' : '1px solid var(--border)',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0, color: meta.color,
                    background: `color-mix(in srgb, ${meta.color} 13%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${meta.color} 24%, transparent)`,
                  }}>
                    {meta.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: 'var(--text-primary)', fontSize: 12 }}>{event.description}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 2 }}>{event.deviceName}</div>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>{event.timeAgo}</div>
                </div>
              );
            })}
          </section>
        )) : (
          <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center' }}><ActivityIcon size={26} style={{ marginBottom: 8 }} /><div>No activity in this category.</div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
