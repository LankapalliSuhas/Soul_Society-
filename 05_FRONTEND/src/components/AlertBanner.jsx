// 05_FRONTEND/src/components/AlertBanner.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function AlertBanner({ event }) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        className="bg-[#050505] border-b border-[#E11D48]/30 px-8 py-3 flex items-center justify-between z-40 sticky top-[73px]"
      >
        <div className="flex items-center gap-3">
          <div className="text-[#E11D48] relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-40"></span>
            <AlertCircle size={16} className="relative" />
          </div>
          <span className="text-[#E11D48] text-sm uppercase tracking-widest font-medium">SYSTEM ALERT</span>
          <span className="text-white/80 text-sm ml-4">
            {event.detail || event.payload?.message || "Critical system threshold crossed."}
          </span>
        </div>
        <span className="text-white/40 font-mono text-xs">
          {new Date(event.time || event.timestamp).toLocaleTimeString()}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
