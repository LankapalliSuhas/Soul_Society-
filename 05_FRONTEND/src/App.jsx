import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AlertBanner from './components/AlertBanner';
import { connectLiveEvents } from './websocket/liveEvents';
import { DataProvider } from './context/DataContext';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import LiveStatus from './pages/LiveStatus';
import About from './pages/About';

// Legacy admin pages (if needed)
import CommandCenter from './pages/CommandCenter';
import Inventory from './pages/Inventory';
import Queue from './pages/Queue';

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
    <DataProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans text-neutral-900 selection:bg-red-200">
          <Navigation />
          
          {latestAlert && <AlertBanner event={latestAlert} />}

          <main className="flex-1 relative z-10">
            <Routes>
              {/* New Smart Cart Customer Flow */}
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/live" element={<LiveStatus events={events} />} />
              <Route path="/about" element={<About />} />

              {/* Legacy Admin Routes (hidden from nav) */}
              <Route path="/admin" element={<CommandCenter events={events} />} />
              <Route path="/admin/inventory" element={<Inventory />} />
              <Route path="/admin/queue" element={<Queue />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}
