// 05_FRONTEND/src/pages/Inventory.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getInventory } from '../services/api';
import StockTable from '../components/StockTable';
import StockChart from '../charts/StockChart';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory().then(res => {
      if (res.data) setInventory(res.data);
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
        <h1 className="text-3xl font-light tracking-wide text-neutral-900 uppercase">Curated Origins</h1>
        <p className="text-neutral-500 mt-2">Hand-selected produce, artisan bakes, and reserves.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-[#111111]/40 border border-neutral-200 rounded-lg p-1">
          <StockTable inventory={inventory} />
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bg-[#111111]/40 border border-neutral-200 rounded-lg p-6">
            <h3 className="text-neutral-500 text-xs tracking-widest uppercase mb-6">Stock Aggregates</h3>
            <StockChart data={inventory} />
          </div>

          <div className="bg-[#E11D48]/10 border border-[#E11D48]/30 rounded-lg p-6">
            <h3 className="text-[#E11D48] text-xs tracking-widest uppercase mb-2">Restock Alerts</h3>
            <p className="text-neutral-700 text-sm">
              {inventory.filter(i => i.status?.toLowerCase() === 'critical').length} items require immediate attention.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
