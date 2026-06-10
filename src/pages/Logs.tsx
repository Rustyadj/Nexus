import React, { useMemo, useState } from 'react';
import { Download, Pause, Play, Search } from 'lucide-react';
import { LOGS, type LogEntry } from '../mockData';

const colors: Record<LogEntry['level'], string> = {
  error: 'var(--red)',
  warn: 'var(--yellow)',
  info: 'var(--blue)',
};

const Logs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<'all' | LogEntry['level']>('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const filtered = useMemo(() => LOGS.filter(log =>
    (level === 'all' || log.level === level) &&
    `${log.message} ${log.source}`.toLowerCase().includes(search.toLowerCase())
  ), [search, level]);

  const exportCsv = () => {
    const rows = [['time', 'level', 'source', 'message'], ...filtered.map(log => [log.time, log.level, log.source, log.message])];
    const csv = rows.map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexus-logs.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Logs</h1>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>{LOGS.length} events recorded today</div>
        </div>
        <button className={`btn ${autoScroll ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setAutoScroll(value => !value)}>
          {autoScroll ? <Pause size={13} /> : <Play size={13} />} Auto-scroll {autoScroll ? 'on' : 'off'}
        </button>
      </div>

      <div className="card" style={{ padding: 10, display: 'flex', gap: 9, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
          <Search size={13} style={{ position: 'absolute', left: 10, top: 9, color: 'var(--text-muted)' }} />
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search logs..."
            style={{ width: '100%', padding: '7px 10px 7px 31px', color: 'var(--text-primary)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }} />
        </div>
        <select value={level} onChange={event => setLevel(event.target.value as typeof level)}
          style={{ padding: '7px 30px 7px 10px', color: 'var(--text-primary)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <option value="all">All levels</option><option value="info">Info</option><option value="warn">Warn</option><option value="error">Error</option>
        </select>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost" onClick={exportCsv}><Download size={13} /> Export CSV</button>
      </div>

      <div className="card" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-mono)' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '100px 90px 120px minmax(0, 1fr)', padding: '10px 14px',
          borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em',
        }}>
          <span>Time</span><span>Level</span><span>Source</span><span>Message</span>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {filtered.map(log => (
            <div key={log.id} style={{
              display: 'grid', gridTemplateColumns: '100px 90px 120px minmax(0, 1fr)', padding: '11px 14px',
              borderBottom: '1px solid var(--border)', alignItems: 'center', fontSize: 11,
            }}>
              <span style={{ color: 'var(--text-muted)' }}>{log.time}</span>
              <span><span style={{ color: colors[log.level], background: `color-mix(in srgb, ${colors[log.level]} 12%, transparent)`, padding: '2px 7px', borderRadius: 4 }}>{log.level.toUpperCase()}</span></span>
              <span style={{ color: 'var(--text-secondary)' }}>{log.source}</span>
              <span style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logs;
