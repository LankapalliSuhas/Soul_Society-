import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Home, Activity, Info, CreditCard, Database } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navigation() {
  const location = useLocation();
  const { isMockData, toggleMockData } = useData();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={16} /> },
    { path: '/catalog', label: 'Catalog', icon: <Package size={16} /> },
    { path: '/cart', label: 'Cart', icon: <ShoppingCart size={16} /> },
    { path: '/checkout', label: 'Checkout', icon: <CreditCard size={16} /> },
    { path: '/live', label: 'Live Status', icon: <Activity size={16} /> },
    { path: '/about', label: 'About', icon: <Info size={16} /> },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-red-500/50 flex items-center justify-center bg-red-500/10 group-hover:bg-red-500/20 transition-all duration-300">
            <span className="text-red-500 font-bold font-mono text-xl tracking-tighter">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-[0.2em] text-white uppercase leading-none">Soul Society</span>
            <span className="text-[10px] text-red-400 font-mono tracking-widest mt-1">SMART RETAIL SYSTEM</span>
          </div>
        </Link>
        
        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 text-sm font-medium tracking-wide transition-all duration-300 relative ${
                location.pathname === item.path
                  ? 'text-red-400'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
              {location.pathname === item.path && (
                <span className="absolute -bottom-[26px] left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              )}
            </Link>
          ))}
          
          {/* Divider */}
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          
          {/* Data Toggle */}
          <button 
            onClick={toggleMockData}
            className="flex items-center gap-3 group"
            title="Toggle between Sample and Real API data"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Data Source</span>
              <span className={`text-xs font-semibold tracking-widest ${isMockData ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isMockData ? 'SAMPLE' : 'REAL'}
              </span>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${isMockData ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-emerald-500/20 border border-emerald-500/50'}`}>
              <div className={`w-4 h-4 rounded-full bg-current transition-transform duration-300 ${isMockData ? 'translate-x-0 text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'translate-x-6 text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'}`}></div>
            </div>
          </button>

        </div>
      </div>
    </nav>
  );
}
