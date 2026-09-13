// 05_FRONTEND/src/pages/CommandCenter.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CartCanvasSequence from '../components/CartCanvasSequence';
import OccupancyCounter from '../components/OccupancyCounter';
import LaneCard from '../components/LaneCard';
import EventTimeline from '../components/EventTimeline';
import { getOccupancy, getQueueLanes, getInventory } from '../services/api';

export default function CommandCenter({ events }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState({ occupancy: null, queue: [], inventory: [] });

  useEffect(() => {
    async function fetchInitial() {
      const [occ, q, inv] = await Promise.all([
        getOccupancy(),
        getQueueLanes(),
        getInventory()
      ]);
      setData({ occupancy: occ.data, queue: q.data || [], inventory: inv.data || [] });
    }
    fetchInitial();
  }, []);

  return (
    <div className="min-h-full px-8 py-8 flex flex-col relative">
      <CartCanvasSequence onLoaded={() => setDataLoaded(true)} />

      {dataLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-12 gap-8 relative z-10 flex-1"
        >
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-8">
              <OccupancyCounter occupancy={data.occupancy?.occupancy} trend={5} />
              <div className="p-8 border border-neutral-200 bg-[#111111]/40 backdrop-blur-sm rounded-lg flex flex-col justify-between">
                <h3 className="text-neutral-500 text-xs tracking-widest uppercase mb-4">Critical Inventory</h3>
                <div className="text-5xl font-light tracking-tighter text-[#E11D48] drop-shadow-[0_0_2px_rgba(225,29,72,0.4)]">
                  {data.inventory.filter(i => i.status?.toLowerCase() === 'critical').length}
                </div>
                <div className="text-sm text-neutral-400 mt-2">SKUs require immediate restock</div>
              </div>
            </div>

            <div className="flex-1 border border-neutral-200 bg-[#FAFAFA]/60 backdrop-blur-md rounded-lg p-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-light tracking-wide text-neutral-900 uppercase">Checkout Flow</h2>
                  <p className="text-sm text-neutral-400 mt-1">Live automated queue surveillance</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.queue.map((lane, i) => <LaneCard key={lane.lane || i} lane={lane} />)}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 border border-neutral-200 bg-[#FAFAFA]/80 backdrop-blur-md rounded-lg p-6 flex flex-col">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-light tracking-wide text-neutral-900 uppercase">Sensor Feed</h2>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/60"></span>
                </span>
                <span className="text-xs text-neutral-400 uppercase tracking-widest">LIVE</span>
              </div>
            </div>
            <div className="flex-1">
              <EventTimeline events={events} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
