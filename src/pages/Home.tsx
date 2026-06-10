import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Wifi, MessageSquare, Image, AlertTriangle, ChevronRight, Cpu } from 'lucide-react';
import { devicesService, activityService, alertsService, networkService } from '../services';
import type { DeviceSummary, ActivityEvent, Alert, NetworkSummary } from '../services';

/* ── Tiny sparkline ─────────────────────────────────── */
const Spark: React.FC<{ color: string; data: number[] }> = ({ color, data }) => {
  const h = 28, w = 64;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
};

/* ── Summary card ───────────────────────────────────── */
const SummaryCard: React.FC<{
  icon: React.ReactNode; label: string; value: string | number;
  sub?: string; subColor?: string; accent?: boolean; loading?: boolean;
}> = ({ icon, label, value, sub, subColor, accent, loading }) => (
  <div style={{
    flex: 1, background: 'var(--bg-card)',
    border: `1px solid ${accent ? 'var(--border-accent)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-lg)', padding: '16px 18px',
    display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
      {icon}
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, color: loading ? 'var(--text-muted)' : 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
      {loading ? '—' : value}
    </div>
    {sub && <div style={{ fontSize: 11, color: subColor || 'var(--text-muted)' }}>{loading ? '…' : sub}</div>}
  </div>
);

const TYPE_COLOR: Record<string, string> = {
  connection: 'var(--accent)', message: 'var(--blue)', photo: 'var(--yellow)',
  alert: 'var(--red)', login: 'var(--text-secondary)', app: 'var(--blue)', location: 'var(--accent)',
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DeviceSummary | null>(null);
  const [network, setNetwork] = useState<NetworkSummary | null>(null);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      devicesService.getSummary(),
      networkService.getSummary(),
      activityService.getRecent(5),
      alertsService.getActive(),
    ]).then(([sum, net, act, alts]) => {
      setSummary(sum);
      setNetwork(net);
      setActivity(act);
      setAlerts(alts);
      setLoading(false);
    });
  }, []);

  const bwHistory = network?.history.map(h => h.down) ?? [];

  return (
    <div className="page-wrapper" style={{ overflowY: 'auto' }}>
      <div className="page-header">
        <h1 className="page-title">Home</h1>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Last updated: just now</span>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
        <SummaryCard loading={loading} icon={<Monitor size={14} />} label="Total Devices" value={summary?.total ?? 0} sub={`+${summary?.newToday ?? 0} today`} subColor="var(--accent)" />
        <SummaryCard loading={loading} accent icon={<Wifi size={14} />} label="Online" value={summary?.online ?? 0} sub={summary ? `${Math.round((summary.online / summary.total) * 100)}% of total` : ''} subColor="var(--accent)" />
        <SummaryCard loading={loading} icon={<MessageSquare size={14} />} label="Messages" value={7} sub="+6 today" subColor="var(--blue)" />
        <SummaryCard loading={loading} icon={<Image size={14} />} label="Photos" value={312} sub="+17 today" subColor="var(--yellow)" />
        <SummaryCard loading={loading} icon={<AlertTriangle size={14} />} label="Alerts" value={alerts.length} sub="Requires attention" subColor="var(--red)" />
      </div>

      {/* Middle row */}
      <div style={{ display: 'flex', gap: 12, flex: 1, minHeight: 180 }}>
        {/* Recent Activity */}
        <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Recent Activity</span>
            <button onClick={() => navigate('/activity')} style={{ background: 'none', color: 'var(--accent)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 2 }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1 }}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ height: 36, background: 'var(--bg-card-hover)', borderRadius: 4, marginBottom: 6, opacity: 0.5 }} />
              ))
              : activity.map(ev => (
                <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `color-mix(in srgb, ${TYPE_COLOR[ev.type] ?? 'var(--text-muted)'} 15%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: TYPE_COLOR[ev.type] ?? 'var(--text-muted)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.description}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Network Overview */}
        <div style={{ width: 300, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', flexDirection: 'column', gap: 14, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Network Overview</span>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>
                <span style={{ color: 'var(--accent)', fontSize: 10, fontWeight: 600 }}>▲ +{network?.bandwidthTrend ?? 12}%</span> Bandwidth
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>
                {loading ? '—' : network?.bandwidth.toFixed(1)} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-secondary)' }}>Mbps</span>
              </div>
            </div>
            {bwHistory.length > 0 && <Spark color="var(--accent)" data={bwHistory} />}
          </div>
          <div>
            <div className="section-title" style={{ marginBottom: 8 }}>Devices by Type</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
                <svg viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border)" strokeWidth="7" />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="var(--accent)" strokeWidth="7" strokeDasharray={`${2 * Math.PI * 22 * 0.5} ${2 * Math.PI * 22 * 0.5}`} />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="var(--blue)" strokeWidth="7" strokeDasharray={`${2 * Math.PI * 22 * 0.3} ${2 * Math.PI * 22 * 0.7}`} strokeDashoffset={`${-2 * Math.PI * 22 * 0.5}`} />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="var(--yellow)" strokeWidth="7" strokeDasharray={`${2 * Math.PI * 22 * 0.2} ${2 * Math.PI * 22 * 0.8}`} strokeDashoffset={`${-2 * Math.PI * 22 * 0.8}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{summary?.total ?? '—'}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[{ label: 'Mobile', pct: '50%', color: 'var(--accent)' }, { label: 'Desktop', pct: '30%', color: 'var(--blue)' }, { label: 'Other', pct: '20%', color: 'var(--yellow)' }].map(({ label, pct, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, marginLeft: 'auto' }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
        {/* Alerts */}
        <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Alerts</span>
            <button onClick={() => navigate('/alerts')} style={{ background: 'none', color: 'var(--accent)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 2 }}>View all <ChevronRight size={12} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alerts.slice(0, 2).map(al => (
              <div key={al.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-card-hover)', borderRadius: 'var(--radius)', border: `1px solid ${al.severity === 'high' ? 'var(--red-dim)' : 'var(--border)'}` }}>
                <AlertTriangle size={14} color={al.severity === 'high' ? 'var(--red)' : 'var(--yellow)'} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{al.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{al.deviceName}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(al.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Devices by Bandwidth */}
        <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Cpu size={14} color="var(--text-muted)" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Top Devices by Bandwidth</span>
            </div>
            <button onClick={() => navigate('/network')} style={{ background: 'none', color: 'var(--accent)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 2 }}>View all <ChevronRight size={12} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(network?.topTalkers ?? []).map((d, i) => {
              const max = network!.topTalkers[0].bandwidth;
              const pct = (d.bandwidth / max) * 100;
              return (
                <div key={d.deviceId} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 10, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 12, flex: 1, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.deviceName}</span>
                  <div style={{ width: 120, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: i === 0 ? 'var(--accent)' : 'var(--blue)', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', width: 60, textAlign: 'right', flexShrink: 0 }}>{d.bandwidth} Mbps</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
