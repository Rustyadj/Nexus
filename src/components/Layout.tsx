import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    background: 'var(--bg-primary)',
  }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
      <TopBar />
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  </div>
);

export default Layout;
