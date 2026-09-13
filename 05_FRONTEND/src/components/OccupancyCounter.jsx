
import React from 'react';
import { motion } from 'framer-motion';

export default function OccupancyCounter({ occupancy, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ stiffness: 100, damping: 30 }}
      className="p-8 border border-neutral-200 bg-[#111111]/40 backdrop-blur-sm rounded-lg flex flex-col justify-between h-full"
    >
      <h3 className="text-neutral-500 text-xs tracking-widest uppercase mb-4">Current Occupancy</h3>
      <div className="flex items-end justify-between">
        <div className="text-7xl font-light tracking-tighter text-neutral-900">
          {occupancy ?? '--'}
        </div>
        <div className={`text-sm mb-2 ${trend > 0 ? 'text-[#E11D48]' : 'text-neutral-400'}`}>
          {trend > 0 ? '▲' : '▼'} {Math.abs(trend)} vs 1h
        </div>
      </div>
      <div className="mt-6 h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white/40"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, ((occupancy || 0) / 150) * 100)}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>
    </motion.div>
  );
}
