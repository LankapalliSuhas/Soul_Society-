import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, ShoppingCart } from 'lucide-react';

export default function LaneCard({ lane }) {
  const isCritical = lane.status === 'critical' || lane.status === 'CRITICAL';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      transition={{ stiffness: 100, damping: 30 }}
      className={`p-6 border rounded-2xl backdrop-blur-md transition-colors ${isCritical ? 'border-red-500/50 bg-red-900/20 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'border-white/10 bg-black/40 hover:border-white/20'
        }`}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className={`text-lg font-black tracking-widest uppercase ${isCritical ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]' : 'text-white'}`}>
          {lane.lane}
        </h3>
        <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${isCritical ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
          }`}>
          {lane.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5"><Users size={12} /> People</span>
          <span className="text-2xl font-bold text-white">{lane.people_count}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5"><Clock size={12} /> ETA (min)</span>
          <span className={`text-2xl font-bold ${isCritical ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]' : 'text-white'}`}>
            {lane.estimated_wait_seconds ? Math.round(lane.estimated_wait_seconds / 60) : lane.eta_min}
          </span>
        </div>

        <div className="flex flex-col gap-1 col-span-2 mt-2 pt-4 border-t border-white/10">
          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5"><ShoppingCart size={12} /> Avg Item Burden</span>
          <span className="text-sm font-mono text-neutral-300">{lane.item_burden || lane.burden}</span>
        </div>
      </div>
    </motion.div>
  );
}
