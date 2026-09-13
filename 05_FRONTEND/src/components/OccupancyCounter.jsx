import React from 'react';
import { motion } from 'framer-motion';

export default function OccupancyCounter({ occupancy, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ stiffness: 100, damping: 30 }}
      className="p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl flex flex-col justify-between h-full hover:border-red-500/30 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      <h3 className="text-neutral-500 text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Current Occupancy
      </h3>
      <div className="flex items-end justify-between">
        <div className="text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          {occupancy ?? '--'}
        </div>
        <div className={`text-sm mb-2 font-mono font-bold tracking-widest ${trend > 0 ? 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'text-emerald-500'}`}>
          {trend > 0 ? '▲' : '▼'} {Math.abs(trend)} vs 1h
        </div>
      </div>
      <div className="mt-6 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, ((occupancy || 0) / 150) * 100)}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>
    </motion.div>
  );
}
