import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventTimeline({ events = [] }) {
  return (
    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <AnimatePresence>
        {events.map((ev, i) => (
          <motion.div
            key={`${ev.event_id || i}-${ev.time}`}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ stiffness: 100, damping: 30 }}
            className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm group hover:border-red-500/30 transition-colors"
          >
            <div className="text-red-400 font-mono text-xs w-20 shrink-0 mt-0.5 tracking-widest drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]">
              {new Date(ev.time || ev.timestamp).toLocaleTimeString([], { hour12: false })}
            </div>
            <div className="flex-1">
              <div className={`text-xs uppercase tracking-widest font-bold mb-1 ${ev.type === 'ALERT' ? 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,1)]' : 'text-neutral-300'
                }`}>
                {ev.type || ev.event_type}
              </div>
              <div className="text-neutral-500 text-sm font-mono tracking-tight group-hover:text-neutral-300 transition-colors">
                {ev.detail || (ev.payload ? JSON.stringify(ev.payload) : 'Raw event received')}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {events.length === 0 && (
        <div className="text-neutral-600 text-sm py-16 flex flex-col items-center justify-center font-mono">
          <div className="w-8 h-8 border-t-2 border-red-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]"></div>
          Awaiting neural sensor data...
        </div>
      )}
    </div>
  );
}
