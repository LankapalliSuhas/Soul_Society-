// 05_FRONTEND/src/pages/Queue.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getQueueLanes } from '../services/api';
import LaneCard from '../components/LaneCard';
import QueueETAChart from '../charts/QueueETAChart';

export default function Queue() {
  const [lanes, setLanes] = useState([]);

  useEffect(() => {
    getQueueLanes().then(res => {
      if (res.data) setLanes(res.data);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full"
    >
      <div>
        <h1 className="text-3xl font-light tracking-wide text-neutral-900 uppercase">Calibrated Flow</h1>
        <p className="text-neutral-500 mt-2">Engineered down to the wire. Automated load balancing across lanes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lanes.map((lane, i) => (
          <LaneCard key={lane.lane || i} lane={lane} />
        ))}
      </div>

      <div className="bg-[#111111]/40 border border-neutral-200 rounded-lg p-8 mt-4">
        <h3 className="text-neutral-500 text-xs tracking-widest uppercase mb-8">ETA Distribution</h3>
        <QueueETAChart data={lanes} />
      </div>
    </motion.div>
  );
}
