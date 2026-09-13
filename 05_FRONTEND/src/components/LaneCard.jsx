
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
      className={`p-6 border rounded-lg backdrop-blur-sm ${isCritical ? 'border-[#E11D48]/50 bg-[#E11D48]/10' : 'border-neutral-200 bg-[#111111]/40'
        }`}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className={`text-lg tracking-widest font-medium ${isCritical ? 'text-[#E11D48]' : 'text-neutral-900'}`}>
          {lane.lane}
        </h3>
        <span className={`text-xs uppercase tracking-widest px-2 py-1 rounded ${isCritical ? 'bg-[#E11D48]/20 text-[#E11D48]' : 'bg-neutral-200 text-neutral-500'
          }`}>
          {lane.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-neutral-400 text-xs uppercase flex items-center gap-1.5"><Users size={12} /> People</span>
          <span className="text-2xl font-light text-neutral-900">{lane.people_count}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-neutral-400 text-xs uppercase flex items-center gap-1.5"><Clock size={12} /> ETA (min)</span>
          <span className={`text-2xl font-light ${isCritical ? 'text-[#E11D48]' : 'text-neutral-900'}`}>
            {lane.estimated_wait_seconds ? Math.round(lane.estimated_wait_seconds / 60) : lane.eta_min}
          </span>
        </div>

        <div className="flex flex-col gap-1 col-span-2 mt-2 pt-4 border-t border-white/5">
          <span className="text-neutral-400 text-xs uppercase flex items-center gap-1.5"><ShoppingCart size={12} /> Avg Item Burden</span>
          <span className="text-sm text-neutral-700">{lane.item_burden || lane.burden}</span>
        </div>
      </div>
    </motion.div>
  );
}
