import React, { useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, Clock, Monitor } from 'lucide-react';
import { ALERTS, type Alert } from '../mockData';

const colors: Record<Alert['severity'], string> = {
  high: 'var(--red)',
  medium: 'var(--yellow)',
  low: 'var(--blue)',
};

const AlertCard: React.FC<{ alert: Alert; onResolve?: () => void }> = ({ alert, onResolve }) => {
  const color = colors[alert.severity];
  return (
    <article style={{
      padding: 15, borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)',
      border: `1px solid ${alert.resolved ? 'var(--border)' : `color-mix(in srgb, ${color} 24%, var(--border))`}`,
      opacity: alert.resolved ? .72 : 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, display: 'grid', placeItems: 'center',
          color, background: `color-mix(in srgb, ${color} 13%, transparent)`, flexShrink: 0,
        }}>
          {alert.resolved ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              padding: '2px 7px', borderRadius: 4, color, fontSize: 9, fontWeight: 700,
              letterSpacing: '.06em', textTransform: 'uppercase', background: `color-mix(in srgb, ${color} 13%, transparent)`,
            }}>
              {alert.severity}
            </span>
            {alert.resolved && <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>Resolved</span>}
          </div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 13, marginTop: 8 }}>{alert.title}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 11, lineHeight: 1.55, marginTop: 4 }}>{alert.description}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, color: 'var(--text-muted)', fontSize: 10 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Monitor size={11} /> {alert.deviceName}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={11} /> {alert.timeAgo}</span>
          </div>
        </div>
        {onResolve && (
          <button className="btn btn-ghost" onClick={onResolve} style={{ padding: '6px 9px', fontSize: 11 }}>
            <Check size={12} /> Resolve
          </button>
        )}
      </div>
    </article>
  );
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState(ALERTS);
  const active = alerts.filter(alert => !alert.resolved);
  const resolved = alerts.filter(alert => alert.resolved);

  const resolve = (id: string) => setAlerts(current => current.map(alert => alert.id === id ? { ...alert, resolved: true } : alert));

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Alerts</h1>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>Review and resolve network security events</div>
        </div>
        <button className="btn btn-ghost" onClick={() => setAlerts(current => current.map(alert => ({ ...alert, resolved: true })))}>
          <CheckCircle2 size={14} /> Resolve all
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
        {[
          { label: 'Total alerts', value: alerts.length, color: 'var(--text-primary)' },
          { label: 'High priority', value: alerts.filter(a => a.severity === 'high').length, color: 'var(--red)' },
          { label: 'Medium priority', value: alerts.filter(a => a.severity === 'medium').length, color: 'var(--yellow)' },
          { label: 'Low priority', value: alerts.filter(a => a.severity === 'low').length, color: 'var(--blue)' },
        ].map(item => (
          <div className="card" key={item.label} style={{ padding: '13px 15px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em' }}>{item.label}</div>
            <div style={{ color: item.color, fontSize: 24, fontWeight: 700, marginTop: 2 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        {[
          { title: `Active Alerts (${active.length})`, data: active, active: true },
          { title: `Resolved Alerts (${resolved.length})`, data: resolved, active: false },
        ].map(column => (
          <section className="card" key={column.title} style={{ minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '13px 15px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: 12 }}>{column.title}</div>
            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
              {column.data.map(alert => <AlertCard key={alert.id} alert={alert} onResolve={column.active ? () => resolve(alert.id) : undefined} />)}
              {!column.data.length && <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No alerts here.</div>}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
