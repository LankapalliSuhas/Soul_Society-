
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StockTable({ inventory = [] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-widest">
            <th className="py-4 px-4 font-normal">SKU / Item</th>
            <th className="py-4 px-4 font-normal text-right">Current Stock</th>
            <th className="py-4 px-4 font-normal text-right">Status</th>
            <th className="py-4 px-4 font-normal text-right">Confidence</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {inventory.map((item, i) => (
              <motion.tr
                key={item.sku}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, stiffness: 100, damping: 30 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors group"
              >
                <td className="py-4 px-4">
                  <div className="text-white/90 font-medium">{item.name || item.sku}</div>
                  <div className="text-white/40 text-xs font-mono mt-1">{item.sku} • {item.shelf_id || 'UNKNOWN'}</div>
                </td>
                <td className="py-4 px-4 text-right text-lg font-light text-white/80">
                  {item.estimated_quantity ?? item.stock}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`text-xs tracking-widest uppercase px-2 py-1 rounded ${item.status === 'CRITICAL' || item.status === 'OUT_OF_STOCK' || item.status === 'critical'
                      ? 'bg-[#E11D48]/20 text-[#E11D48]'
                      : item.status === 'LOW' || item.status === 'low'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-white/10 text-white/60'
                    }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-mono text-white/40 text-sm">
                  {((item.confidence || 0) * 100).toFixed(0)}%
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
