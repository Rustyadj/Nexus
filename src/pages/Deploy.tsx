import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight, Clock3, Plus, Rocket, XCircle } from 'lucide-react';

type Status = 'running' | 'success' | 'failed';
type Deployment = { id: number; name: string; target: string; status: Status; time: string; progress?: number; logs: string[] };

const deployments: Deployment[] = [
  { id: 1, name: 'NEXUS Agent v4.8.2', target: 'MacBook Pro', status: 'running', time: 'Started 2 min ago', progress: 68, logs: ['Preparing package...', 'Verifying target compatibility...', 'Installing NEXUS Agent v4.8.2 (68%)'] },
  { id: 2, name: 'Security Policy Update', target: 'All online devices', status: 'running', time: 'Started 6 min ago', progress: 41, logs: ['Policy bundle downloaded', '7 of 18 devices updated', 'Continuing deployment...'] },
  { id: 3, name: 'WhatsApp 2.26.10', target: 'iPhone 17 Pro', status: 'success', time: 'Today at 5:50 AM', logs: ['Package verified', 'Installation complete', 'Health check passed'] },
  { id: 4, name: 'Printer Firmware 5.2', target: 'HP Printer', status: 'failed', time: 'Yesterday at 11:42 PM', logs: ['Firmware uploaded', 'Device did not respond', 'Deployment failed: connection timeout'] },
  { id: 5, name: 'Endpoint Certificates', target: 'Windows Desktop', status: 'success', time: 'Yesterday at 8:15 PM', logs: ['Certificate generated', 'Certificate installed', 'TLS handshake verified'] },
];

const statusMeta: Record<Status, { color: string; icon: React.ReactNode }> = {
  running: { color: 'var(--blue)', icon: <Clock3 size={14} /> },
  success: { color: 'var(--accent)', icon: <CheckCircle2 size={14} /> },
  failed: { color: 'var(--red)', icon: <XCircle size={14} /> },
};

const Deploy: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(1);
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div><h1 className="page-title">Deployments</h1><div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>Manage software, policies, and firmware across devices</div></div>
        <button className="btn btn-primary"><Plus size={14} /> New Deployment</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
        {[
          ['Active', '2', 'var(--blue)'], ['Completed today', '1', 'var(--accent)'], ['Failed', '1', 'var(--red)'],
        ].map(([label, value, color]) => <div className="card" key={label} style={{ padding: '12px 15px' }}><div style={{ color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase' }}>{label}</div><div style={{ color, fontSize: 23, fontWeight: 700 }}>{value}</div></div>)}
      </div>

      <div className="card" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(150px, 1fr) 110px 160px 32px', padding: '11px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase' }}>
          <span>Deployment</span><span>Target</span><span>Status</span><span>Timestamp</span><span />
        </div>
        {deployments.map(deployment => {
          const meta = statusMeta[deployment.status];
          const open = expanded === deployment.id;
          return <div key={deployment.id} style={{ borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => setExpanded(open ? null : deployment.id)} style={{
              width: '100%', display: 'grid', gridTemplateColumns: 'minmax(220px, 1.4fr) minmax(150px, 1fr) 110px 160px 32px',
              alignItems: 'center', padding: '14px 16px', background: open ? 'var(--bg-card-hover)' : 'transparent', textAlign: 'left',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 30, height: 30, borderRadius: 7, display: 'grid', placeItems: 'center', color: meta.color, background: `color-mix(in srgb, ${meta.color} 12%, transparent)` }}><Rocket size={14} /></span>
                <span><b style={{ display: 'block', color: 'var(--text-primary)', fontSize: 12 }}>{deployment.name}</b>{deployment.status === 'running' && <span style={{ display: 'block', width: 150, height: 3, background: 'var(--border)', borderRadius: 2, marginTop: 6 }}><span style={{ display: 'block', width: `${deployment.progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} /></span>}</span>
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{deployment.target}</span>
              <span style={{ color: meta.color, fontSize: 10, display: 'flex', alignItems: 'center', gap: 5, textTransform: 'capitalize' }}>{meta.icon}{deployment.status}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{deployment.time}</span>
              <span style={{ color: 'var(--text-muted)' }}>{open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
            </button>
            {open && <div style={{ margin: '0 16px 14px 56px', padding: '11px 13px', background: '#090b0e', border: '1px solid var(--border)', borderRadius: 7, fontFamily: 'var(--font-mono)', fontSize: 10 }}>
              {deployment.logs.map((log, index) => <div key={log} style={{ color: index === deployment.logs.length - 1 ? meta.color : 'var(--text-muted)', padding: '3px 0' }}><span style={{ color: 'var(--text-muted)', marginRight: 10 }}>[{String(index + 1).padStart(2, '0')}]</span>{log}</div>)}
            </div>}
          </div>;
        })}
      </div>
    </div>
  );
};

export default Deploy;
