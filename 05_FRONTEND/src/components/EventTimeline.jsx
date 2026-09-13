
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventTimeline({ events = [] }) {
  return (
    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-4">
      <AnimatePresence>
        {events.map((ev, i) => (
          <motion.div
            key={`${ev.event_id || i}-${ev.time}`}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ stiffness: 100, damping: 30 }}
            className="flex gap-4 items-start p-4 bg-[#111111]/40 border border-white/5 rounded-lg backdrop-blur-sm"
          >
            <div className="text-neutral-400 font-mono text-xs w-20 shrink-0 mt-0.5">
              {new Date(ev.time || ev.timestamp).toLocaleTimeString([], { hour12: false })}
            </div>
            <div className="flex-1">
              <div className={`text-xs uppercase tracking-widest font-medium mb-1 ${ev.type === 'ALERT' ? 'text-[#E11D48]' : 'text-neutral-800'
                }`}>
                {ev.type || ev.event_type}
              </div>
              <div className="text-neutral-500 text-sm">
                {ev.detail || (ev.payload ? JSON.stringify(ev.payload) : 'Raw event received')}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {events.length === 0 && (
        <div className="text-neutral-400 text-sm py-8 text-center italic">
          Awaiting sensor data...
        </div>
      )}
    </div>
  );
}
