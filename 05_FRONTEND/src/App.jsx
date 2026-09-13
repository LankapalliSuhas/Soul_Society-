// 05_FRONTEND/src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CommandCenter from './pages/CommandCenter';
import Inventory from './pages/Inventory';
import LiveEvents from './pages/LiveEvents';
import Queue from './pages/Queue';
import AlertBanner from './components/AlertBanner';
import SystemHealthBadge from './components/SystemHealthBadge';
import { connectLiveEvents } from './websocket/liveEvents';

export default function App() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    const { disconnect } = connectLiveEvents({
      onEvent: (ev) => setEvents((prev) => [ev, ...prev].slice(0, 50)),
      onStatusChange: setStatus
    });
    return disconnect;
  }, []);

  const latestAlert = events.find(e => e.type === 'ALERT' || e.type === 'STOCK_LOW');

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        <header className="flex items-center justify-between px-8 py-6 z-50 border-b border-neutral-200 bg-[#FAFAFA]/80 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-6">
            <div className="text-xl font-medium tracking-widest uppercase">NETRA</div>
            <nav className="flex gap-6 text-sm text-neutral-500 tracking-wider">
              <Link to="/" className="hover:text-neutral-900 transition-colors">Command</Link>
              <Link to="/inventory" className="hover:text-neutral-900 transition-colors">Inventory</Link>
              <Link to="/queue" className="hover:text-neutral-900 transition-colors">Queue</Link>
              <Link to="/events" className="hover:text-neutral-900 transition-colors">Live</Link>
            </nav>
          </div>
          <SystemHealthBadge status={status} />
        </header>

        {latestAlert && <AlertBanner event={latestAlert} />}

        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<CommandCenter events={events} />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/events" element={<LiveEvents events={events} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
