import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Devices from './pages/Devices';
import MapPage from './pages/MapPage';
import Network from './pages/Network';
import Activity from './pages/Activity';
import Deploy from './pages/Deploy';
import Alerts from './pages/Alerts';
import Logs from './pages/Logs';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/network" element={<Network />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/deploy" element={<Deploy />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
