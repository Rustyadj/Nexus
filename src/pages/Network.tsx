import React, { useState } from 'react';
import { Globe2, Laptop, Monitor, Printer, Router, Smartphone, Tablet, Tv, Wifi } from 'lucide-react';

const tabs = ['Topology', 'Traffic', 'Connections', 'Ports', 'WiFi', 'DNS'] as const;
type Tab = typeof tabs[number];

const devices = [
  { name: 'MacBook Pro', ip: '192.168.1.12', x: 8, y: 51, icon: Laptop, online: true },
  { name: 'Windows Desktop', ip: '192.168.1.13', x: 25, y: 51, icon: Monitor, online: true },
  { name: 'iPhone 17 Pro', ip: '192.168.1.15', x: 42, y: 51, icon: Smartphone, online: true },
  { name: 'Samsung TV', ip: '192.168.1.20', x: 59, y: 51, icon: Tv, online: true },
  { name: 'iPad Air', ip: '192.168.1.16', x: 25, y: 78, icon: Tablet, online: true },
  { name: 'Galaxy S23', ip: '192.168.1.18', x: 42, y: 78, icon: Smartphone, online: true },
  { name: 'HP Printer', ip: '192.168.1.22', x: 59, y: 78, icon: Printer, online: false },
];

const tables: Record<Exclude<Tab, 'Topology' | 'Traffic'>, { headers: string[]; rows: string[][] }> = {
  Connections: {
    headers: ['Device', 'Remote host', 'Protocol', 'Duration', 'State'],
    rows: [
      ['MacBook Pro', 'github.com:443', 'TCP/TLS', '42m', 'Established'],
      ['Windows Desktop', '13.107.42.14:443', 'TCP/TLS', '18m', 'Established'],
      ['iPhone 17 Pro', '17.253.144.10:5223', 'TCP', '12m', 'Established'],
      ['Samsung TV', '52.84.150.27:443', 'TCP/TLS', '8m', 'Established'],
      ['Galaxy S23', '142.250.191.78:443', 'QUIC', '3m', 'Established'],
    ],
  },
  Ports: {
    headers: ['Port', 'Service', 'Device', 'Protocol', 'Status'],
    rows: [
      ['22', 'SSH', 'Windows Desktop', 'TCP', 'Open'],
      ['53', 'DNS', 'Router', 'UDP', 'Open'],
      ['80', 'HTTP', 'HP Printer', 'TCP', 'Open'],
      ['443', 'HTTPS', 'Router', 'TCP', 'Open'],
      ['548', 'AFP', 'MacBook Pro', 'TCP', 'Filtered'],
      ['9100', 'JetDirect', 'HP Printer', 'TCP', 'Open'],
    ],
  },
  WiFi: {
    headers: ['Network', 'Band', 'Channel', 'Signal', 'Clients'],
    rows: [
      ['Home Network', '5 GHz', '44', '-41 dBm', '9'],
      ['Home Network', '2.4 GHz', '6', '-52 dBm', '5'],
      ['NEXUS-IoT', '2.4 GHz', '11', '-61 dBm', '4'],
      ['Guest Network', '5 GHz', '149', '-67 dBm', '0'],
      ['Neighbor-5G', '5 GHz', '36', '-78 dBm', '—'],
    ],
  },
  DNS: {
    headers: ['Domain', 'Type', 'Answer', 'Latency', 'Device'],
    rows: [
      ['github.com', 'A', '140.82.113.4', '18 ms', 'MacBook Pro'],
      ['api.apple.com', 'A', '17.253.144.10', '22 ms', 'iPhone 17 Pro'],
      ['netflix.com', 'A', '52.84.150.27', '31 ms', 'Samsung TV'],
      ['google.com', 'AAAA', '2607:f8b0::4a', '16 ms', 'Galaxy S23'],
      ['microsoft.com', 'A', '13.107.246.45', '20 ms', 'Windows Desktop'],
    ],
  },
};

const Card: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div className="card" style={style}>{children}</div>
);

const Topology: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '260px minmax(0, 1fr)', gap: 12, flex: 1, minHeight: 0 }}>
    <Card style={{ padding: 18, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontWeight: 600, fontSize: 12 }}>Network Health</div>
      <div style={{
        width: 120, height: 120, borderRadius: '50%', border: '5px solid var(--accent)',
        boxShadow: '0 0 24px rgba(0,255,136,.14)', display: 'grid', placeItems: 'center',
        margin: '22px auto 8px', position: 'relative',
      }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontSize: 34, color: 'var(--accent)', fontWeight: 700 }}>98</div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>/ 100</div></div>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--accent)', fontWeight: 600, fontSize: 12, marginBottom: 20 }}>Excellent</div>
      <div style={{ marginTop: 'auto' }}>
        {[
          ['Devices', '18 / 23'], ['Connections', '42'], ['Bandwidth', '256.7 Mbps'], ['Packet Loss', '0.2%'], ['Errors', '0'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
            <span style={{ color: 'var(--text-muted)' }}>{label}</span><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{value}</span>
          </div>
        ))}
      </div>
    </Card>

    <Card style={{ position: 'relative', overflow: 'hidden', minHeight: 390 }}>
      <div style={{ position: 'absolute', top: 16, left: 17, fontWeight: 600, fontSize: 12 }}>Network Topology</div>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <line x1="50" y1="13" x2="50" y2="24" stroke="var(--border-strong)" strokeWidth=".35" />
        <line x1="50" y1="35" x2="50" y2="43" stroke="var(--border-strong)" strokeWidth=".35" />
        <line x1="16" y1="43" x2="67" y2="43" stroke="var(--border-strong)" strokeWidth=".35" />
        {devices.map(device => <line key={device.name} x1={device.x + 8} y1="43" x2={device.x + 8} y2={device.y} stroke="var(--border-strong)" strokeWidth=".35" />)}
      </svg>
      <div style={{ position: 'absolute', left: '44%', top: '8%', display: 'flex', alignItems: 'center', gap: 7, fontSize: 11 }}><Globe2 size={18} color="var(--blue)" /> Internet</div>
      <div style={{
        position: 'absolute', left: '43%', top: '24%', width: '14%', height: '11%', border: '1px solid var(--blue)',
        borderRadius: 7, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}><Router size={17} color="var(--blue)" /><div><b style={{ fontSize: 10 }}>Router</b><div style={{ fontSize: 8, color: 'var(--text-muted)' }}>192.168.1.1</div></div></div>
      {devices.map(device => {
        const Icon = device.icon;
        const color = device.online ? 'var(--accent)' : 'var(--red)';
        return (
          <div key={device.name} style={{
            position: 'absolute', left: `${device.x}%`, top: `${device.y}%`, width: '16%', height: '15%',
            border: `1px solid ${color}`, borderRadius: 7, background: 'var(--bg-secondary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color,
          }}>
            <Icon size={16} />
            <div style={{ color: 'var(--text-primary)', fontSize: 9, fontWeight: 600, marginTop: 3 }}>{device.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 7 }}>{device.ip}</div>
          </div>
        );
      })}
    </Card>
  </div>
);

const Traffic: React.FC = () => {
  const talkers = [['MacBook Pro', 98.3], ['Windows Desktop', 67.2], ['Samsung TV', 34.3], ['iPhone 17 Pro', 22.1]] as const;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(260px, .8fr)', gap: 12, flex: 1, minHeight: 0 }}>
      <Card style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>Bandwidth Usage</b><span style={{ color: 'var(--accent)', fontSize: 11 }}>256.7 Mbps current</span></div>
        <svg viewBox="0 0 700 260" width="100%" height="calc(100% - 30px)" preserveAspectRatio="none" style={{ marginTop: 15 }}>
          {[30, 90, 150, 210].map(y => <line key={y} x1="40" y1={y} x2="690" y2={y} stroke="var(--border)" strokeWidth="1" />)}
          <polyline points="40,165 70,148 100,154 130,131 160,142 190,108 220,119 250,101 280,128 310,121 340,94 370,113 400,135 430,120 460,89 490,107 520,76 550,102 580,91 610,116 640,82 690,98" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" />
          <polyline points="40,218 70,205 100,214 130,198 160,210 190,188 220,203 250,195 280,212 310,198 340,208 370,190 400,214 430,201 460,181 490,202 520,192 550,207 580,187 610,202 640,178 690,194" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinejoin="round" />
          <text x="40" y="250" fill="var(--text-muted)" fontSize="10">-60m</text><text x="350" y="250" fill="var(--text-muted)" fontSize="10">-30m</text><text x="665" y="250" fill="var(--text-muted)" fontSize="10">Now</text>
        </svg>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', fontSize: 10, color: 'var(--text-secondary)' }}><span><i className="dot dot-green" /> Download</span><span><i className="dot" style={{ background: 'var(--blue)' }} /> Upload</span></div>
      </Card>
      <Card style={{ padding: 18 }}>
        <b>Top Talkers</b>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {talkers.map(([name, value], index) => <div key={name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}><span>{index + 1}. {name}</span><span style={{ color: 'var(--text-muted)' }}>{value} Mbps</span></div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 3 }}><div style={{ height: '100%', width: `${value}%`, background: index ? 'var(--blue)' : 'var(--accent)', borderRadius: 3 }} /></div>
          </div>)}
        </div>
      </Card>
    </div>
  );
};

const DataTable: React.FC<{ tab: Exclude<Tab, 'Topology' | 'Traffic'> }> = ({ tab }) => {
  const table = tables[tab];
  return <Card style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${table.headers.length}, minmax(120px, 1fr))`, padding: '11px 15px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontSize: 10, textTransform: 'uppercase' }}>
      {table.headers.map(header => <b key={header}>{header}</b>)}
    </div>
    {table.rows.map((row, index) => <div key={index} style={{ display: 'grid', gridTemplateColumns: `repeat(${row.length}, minmax(120px, 1fr))`, padding: '13px 15px', borderBottom: '1px solid var(--border)', fontSize: 11 }}>
      {row.map((cell, i) => <span key={i} style={{ color: i === row.length - 1 && ['Open', 'Established'].includes(cell) ? 'var(--accent)' : 'var(--text-secondary)' }}>{cell}</span>)}
    </div>)}
  </Card>;
};

const Network: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Topology');
  return (
    <div className="page-wrapper">
      <div className="page-header"><div><h1 className="page-title">Network</h1><div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>Home Network · 192.168.1.0/24</div></div><div style={{ display: 'flex', gap: 7, color: 'var(--accent)', fontSize: 11 }}><Wifi size={14} /> Healthy</div></div>
      <div className="tab-bar" style={{ marginBottom: 0 }}>{tabs.map(item => <button key={item} className={`tab ${tab === item ? 'active' : ''}`} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === 'Topology' ? <Topology /> : tab === 'Traffic' ? <Traffic /> : <DataTable tab={tab} />}
    </div>
  );
};

export default Network;
