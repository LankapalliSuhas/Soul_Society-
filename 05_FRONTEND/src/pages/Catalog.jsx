import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../services/api';
import { Package, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // We add an event listener for when the global toggle changes the data source
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      fetchInventory().then(data => {
        setProducts(data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    };

    loadData();
    window.addEventListener('mockDataChanged', loadData);
    return () => window.removeEventListener('mockDataChanged', loadData);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">
            System Catalog
          </h1>
          <p className="text-neutral-400 mt-3 text-lg font-mono tracking-wider">BROWSE // SELECT // ACQUIRE</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-red-500/50 transition-colors flex flex-col group backdrop-blur-sm"
              >
                <div className="aspect-square bg-black/50 rounded-xl mb-4 flex items-center justify-center text-neutral-600 group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors border border-transparent group-hover:border-red-500/20">
                  <Package size={48} className="transition-transform group-hover:scale-110 duration-300" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-white leading-tight tracking-wide">{product.name}</h3>
                  <span className="font-mono text-lg text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]">${product.price.toFixed(2)}</span>
                </div>
                <div className="text-xs font-mono text-neutral-500 mb-6 uppercase tracking-wider">
                  <span className="text-amber-500/80">CAT:</span> {product.category} &bull; <span className="text-emerald-500/80">QTY:</span> {product.stock}
                </div>
                
                <button className="mt-auto w-full bg-transparent border border-neutral-700 text-neutral-300 py-3 rounded-lg font-bold tracking-widest uppercase text-sm hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 transition-all flex justify-center items-center gap-2 group/btn">
                  <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
