// 05_FRONTEND/src/pages/LiveEvents.jsx
import React from 'react';
import { motion } from 'framer-motion';
import EventTimeline from '../components/EventTimeline';

export default function LiveEvents({ events }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="p-8 max-w-5xl mx-auto w-full flex flex-col h-[calc(100vh-100px)]"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-wide text-white/90 uppercase">Neural Sensor Log</h1>
        <p className="text-white/60 mt-2">Real-time data stream from edge compute nodes.</p>
      </div>

      <div className="flex-1 bg-[#111111]/40 border border-white/10 rounded-lg p-6 overflow-hidden flex flex-col">
        <EventTimeline events={events} />
      </div>
    </motion.div>
  );
}
