import React, { useState } from 'react';
import { Bell, CircleHelp, Globe2, Network, Save, Shield, UserRound, Users } from 'lucide-react';

const sections = ['General', 'Network', 'Security', 'Notifications', 'Users', 'About'] as const;
type Section = typeof sections[number];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', background: 'var(--bg-secondary)', color: 'var(--text-primary)',
  border: '1px solid var(--border)', borderRadius: 'var(--radius)',
};

const Field: React.FC<React.PropsWithChildren<{ label: string; hint?: string }>> = ({ label, hint, children }) => (
  <label style={{ display: 'block' }}>
    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>{label}</span>
    {children}
    {hint && <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 9, marginTop: 5 }}>{hint}</span>}
  </label>
);

const Toggle: React.FC<{ initial?: boolean }> = ({ initial = false }) => {
  const [on, setOn] = useState(initial);
  return <button onClick={() => setOn(value => !value)} aria-label="Toggle setting" style={{
    width: 40, height: 22, borderRadius: 12, padding: 2, background: on ? 'var(--accent)' : 'var(--text-muted)',
    display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', transition: '.18s',
  }}><span style={{ width: 18, height: 18, borderRadius: '50%', background: on ? '#06110c' : '#d4d7db', display: 'block' }} /></button>;
};

const SettingRow: React.FC<{ title: string; description: string; initial?: boolean }> = ({ title, description, initial }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '13px 0', borderBottom: '1px solid var(--border)' }}>
    <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 600 }}>{title}</div><div style={{ color: 'var(--text-muted)', fontSize: 10, marginTop: 2 }}>{description}</div></div>
    <Toggle initial={initial} />
  </div>
);

const SectionContent: React.FC<{ section: Section }> = ({ section }) => {
  if (section === 'General') return <>
    <h2 style={{ fontSize: 14, marginBottom: 4 }}>General Settings</h2><p style={{ color: 'var(--text-muted)', fontSize: 10, marginBottom: 18 }}>Basic preferences for your NEXUS environment.</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <Field label="Workspace name"><input style={inputStyle} defaultValue="Home Network" /></Field>
      <Field label="Administrator"><input style={inputStyle} defaultValue="Rusty" /></Field>
      <Field label="Time zone"><select style={inputStyle} defaultValue="central"><option value="central">Central Time (US & Canada)</option><option>Eastern Time</option><option>Pacific Time</option></select></Field>
      <Field label="Language"><select style={inputStyle}><option>English (US)</option><option>Spanish</option><option>French</option></select></Field>
    </div>
    <div style={{ marginTop: 18 }}><SettingRow title="Compact interface" description="Reduce spacing throughout the dashboard." /><SettingRow title="Automatic updates" description="Keep NEXUS services updated automatically." initial /></div>
  </>;
  if (section === 'Network') return <>
    <h2 style={{ fontSize: 14 }}>Network Settings</h2><p style={{ color: 'var(--text-muted)', fontSize: 10, margin: '4px 0 18px' }}>Configure discovery, scanning, and network defaults.</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <Field label="Gateway address"><input style={inputStyle} defaultValue="192.168.1.1" /></Field>
      <Field label="Subnet"><input style={inputStyle} defaultValue="255.255.255.0" /></Field>
      <Field label="Primary DNS"><input style={inputStyle} defaultValue="1.1.1.1" /></Field>
      <Field label="Scan interval"><select style={inputStyle}><option>Every 5 minutes</option><option>Every 15 minutes</option><option>Hourly</option></select></Field>
    </div><div style={{ marginTop: 18 }}><SettingRow title="Automatic device discovery" description="Discover new devices as soon as they join." initial /><SettingRow title="Deep port scanning" description="Include extended TCP and UDP scans." /></div>
  </>;
  if (section === 'Security') return <>
    <h2 style={{ fontSize: 14 }}>Security</h2><p style={{ color: 'var(--text-muted)', fontSize: 10, margin: '4px 0 18px' }}>Authentication and endpoint protection controls.</p>
    <SettingRow title="Two-factor authentication" description="Require an authenticator code for administrators." initial /><SettingRow title="Block suspicious connections" description="Automatically isolate hosts with repeated failures." initial /><SettingRow title="Security event retention" description="Retain security logs for 90 days." initial />
    <div style={{ marginTop: 16, maxWidth: 320 }}><Field label="Session timeout"><select style={inputStyle}><option>30 minutes</option><option>1 hour</option><option>4 hours</option></select></Field></div>
  </>;
  if (section === 'Notifications') return <>
    <h2 style={{ fontSize: 14 }}>Notifications</h2><p style={{ color: 'var(--text-muted)', fontSize: 10, margin: '4px 0 18px' }}>Choose which events should interrupt you.</p>
    <SettingRow title="Critical alerts" description="Notify immediately for high-severity alerts." initial /><SettingRow title="Device offline" description="Notify when a device is unreachable for 10 minutes." initial /><SettingRow title="Deployment status" description="Notify when deployments finish or fail." initial /><SettingRow title="Daily health summary" description="Send a daily system health digest." />
  </>;
  if (section === 'Users') return <>
    <h2 style={{ fontSize: 14 }}>Users</h2><p style={{ color: 'var(--text-muted)', fontSize: 10, margin: '4px 0 18px' }}>Manage access to this NEXUS workspace.</p>
    {[['Rusty', 'rusty@nexus.local', 'Administrator'], ['Cody', 'cody@nexus.local', 'Viewer'], ['Alex', 'alex@nexus.local', 'Operator']].map(([name, email, role]) => <div key={email} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 700 }}>{name[0]}</span>
      <span style={{ marginLeft: 10, flex: 1 }}><b style={{ display: 'block', fontSize: 11 }}>{name}</b><small style={{ color: 'var(--text-muted)' }}>{email}</small></span><span className="badge badge-muted">{role}</span>
    </div>)}
  </>;
  return <>
    <div style={{ textAlign: 'center', padding: '25px 0' }}><div style={{ width: 52, height: 52, borderRadius: 13, display: 'grid', placeItems: 'center', background: 'var(--accent)', color: '#000', margin: '0 auto 12px' }}><Shield size={27} /></div><h2>NEXUS</h2><div style={{ color: 'var(--accent)', fontSize: 11, marginTop: 3 }}>Version 4.8.2</div></div>
    {[['Build', '2026.06.10.482'], ['License', 'Enterprise'], ['Environment', 'Production'], ['API status', 'Operational']].map(([key, value]) => <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--border)', fontSize: 11 }}><span style={{ color: 'var(--text-muted)' }}>{key}</span><span>{value}</span></div>)}
  </>;
};

const icons: Record<Section, React.ReactNode> = { General: <UserRound size={14} />, Network: <Network size={14} />, Security: <Shield size={14} />, Notifications: <Bell size={14} />, Users: <Users size={14} />, About: <CircleHelp size={14} /> };

const Settings: React.FC = () => {
  const [section, setSection] = useState<Section>('General');
  return <div className="page-wrapper">
    <div className="page-header"><div><h1 className="page-title">Settings</h1><div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>Configure NEXUS for your environment</div></div><button className="btn btn-primary"><Save size={13} /> Save Changes</button></div>
    <div style={{ display: 'grid', gridTemplateColumns: '170px minmax(0, 1fr)', gap: 12, flex: 1, minHeight: 0 }}>
      <nav className="card" style={{ padding: 7 }}>
        {sections.map(item => <button key={item} onClick={() => setSection(item)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 7, textAlign: 'left',
          background: section === item ? 'var(--accent-dim)' : 'transparent', color: section === item ? 'var(--accent)' : 'var(--text-secondary)',
        }}>{icons[item]}{item}</button>)}
        <div style={{ margin: '15px 9px 0', paddingTop: 13, borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 9, display: 'flex', gap: 6 }}><Globe2 size={11} /> nexus.local</div>
      </nav>
      <main className="card" style={{ padding: 20, overflowY: 'auto' }}><SectionContent section={section} /></main>
    </div>
  </div>;
};

export default Settings;
