import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ALERTS } from '../mockData';

const TopBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const alertCount = ALERTS.filter(a => !a.resolved).length;

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 12,
      flexShrink: 0,
    }}>
      {/* Search */}
      <div style={{
        flex: 1,
        maxWidth: 420,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Search size={14} style={{ position: 'absolute', left: 10, color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search or type command…"
          style={{
            width: '100%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '6px 12px 6px 32px',
            color: 'var(--text-primary)',
            fontSize: 13,
          }}
        />
        <kbd style={{
          position: 'absolute', right: 10,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--border)',
          borderRadius: 4,
          padding: '1px 5px',
          fontSize: 10,
          color: 'var(--text-muted)',
        }}>⌘K</kbd>
      </div>

      <div style={{ flex: 1 }} />

      {/* Actions */}
      <button
        onClick={() => navigate('/alerts')}
        style={{
          position: 'relative',
          background: 'transparent',
          color: 'var(--text-secondary)',
          padding: 6,
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Bell size={16} />
        {alertCount > 0 && (
          <span style={{
            position: 'absolute',
            top: 2, right: 2,
            width: 8, height: 8,
            background: 'var(--red)',
            borderRadius: '50%',
            border: '1.5px solid var(--bg-secondary)',
          }} />
        )}
      </button>

      <button
        onClick={() => navigate('/settings')}
        style={{
          background: 'transparent',
          color: 'var(--text-secondary)',
          padding: 6,
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Settings size={16} />
      </button>

      {/* Avatar */}
      <div style={{
        width: 28, height: 28,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4d9eff, #00ff88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700, color: '#000',
        cursor: 'pointer',
        flexShrink: 0,
      }}>R</div>
    </header>
  );
};

export default TopBar;
