import React from 'react';
import { motion } from 'framer-motion';
import EventTimeline from '../components/EventTimeline';
import { Radio } from 'lucide-react';

export default function LiveEvents({ events }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="p-8 max-w-5xl mx-auto w-full flex flex-col h-[calc(100vh-200px)]"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center justify-center">
          <Radio className="text-red-500 animate-pulse" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-widest text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">Neural Sensor Log</h1>
          <p className="text-neutral-500 mt-1 font-mono text-sm tracking-wider">REAL-TIME DATA STREAM FROM EDGE COMPUTE NODES</p>
        </div>
      </div>

      <div className="flex-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="border-b border-white/10 pb-4 mb-4 flex items-center justify-between">
          <div className="text-xs font-mono text-neutral-400 tracking-widest">LIVE EVENT STREAM</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-xs font-mono text-emerald-500 tracking-widest">CONNECTED</span>
          </div>
        </div>
        <EventTimeline events={events} />
      </div>
    </motion.div>
  );
}
