import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OccupancyCounter from '../components/OccupancyCounter';
import LaneCard from '../components/LaneCard';
import EventTimeline from '../components/EventTimeline';
import { getOccupancy, getQueueLanes, getInventory } from '../services/api';
import { ShieldAlert, Activity } from 'lucide-react';

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
      setDataLoaded(true);
    }
    fetchInitial();

    const handleMockToggle = () => {
      setDataLoaded(false);
      fetchInitial();
    };

    window.addEventListener('mockDataChanged', handleMockToggle);
    return () => window.removeEventListener('mockDataChanged', handleMockToggle);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-8 pb-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[150px] pointer-events-none" />
      
      {!dataLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]"></div>
             <p className="text-red-500 font-mono tracking-widest text-sm animate-pulse">ESTABLISHING UPLINK TO COMMAND CENTER...</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-12 gap-8 relative z-10 max-w-[1600px] mx-auto"
        >
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-48">
              <OccupancyCounter occupancy={data.occupancy?.occupancy} trend={5} />
              
              <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <h3 className="text-neutral-500 text-xs font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                  <ShieldAlert size={14} className="text-amber-500" />
                  Critical Inventory
                </h3>
                <div className="text-7xl font-black tracking-tighter text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                  {data.inventory.filter(i => i.status?.toLowerCase() === 'critical').length}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-neutral-400 mt-2 uppercase">SKUs require immediate restock</div>
              </div>
            </div>

            <div className="flex-1 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl font-black tracking-widest text-white uppercase">Checkout Flow</h2>
                  <p className="text-xs font-mono tracking-widest text-neutral-500 mt-2 uppercase">Live automated queue surveillance</p>
                </div>
                <div className="hidden md:flex gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mt-1" />
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-1" />
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500/20 mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.queue.map((lane, i) => <LaneCard key={lane.lane || i} lane={lane} />)}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl p-6 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="mb-6 flex justify-between items-center border-b border-white/10 pb-6">
              <h2 className="text-2xl font-black tracking-widest text-white uppercase flex items-center gap-3">
                 <Activity size={24} className="text-emerald-500" />
                 Sensor Feed
              </h2>
              <div className="flex items-center gap-2 border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-500/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest">LIVE</span>
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
