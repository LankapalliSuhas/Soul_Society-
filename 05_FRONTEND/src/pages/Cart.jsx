import React, { useEffect, useState } from 'react';
import { fetchCart } from '../services/api';
import { ShoppingCart, ArrowRight, Trash2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      fetchCart().then(data => {
        setCart(data);
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
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 px-8 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black tracking-widest uppercase flex items-center gap-4">
              <ShoppingCart size={32} className="text-red-500" />
              Active Cart
            </h1>
            <p className="text-neutral-500 mt-2 font-mono text-sm tracking-widest">
              <span className="text-emerald-500 animate-pulse inline-block mr-2">●</span>
              NEURAL SENSORS ENGAGED
            </p>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-16 text-center border border-white/10 backdrop-blur-md">
            <Cpu size={64} className="mx-auto text-neutral-700 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              Your cart's sensor array is not detecting any items. Browse the catalog to simulate adding items to the basket.
            </p>
            <Link to="/catalog" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-bold tracking-widest uppercase text-sm hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              View Catalog
            </Link>
          </div>
        ) : (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-md shadow-2xl">
            <ul className="divide-y divide-white/10">
              {cart.items.map((item, idx) => (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="py-6 flex justify-between items-center group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-black rounded-lg border border-white/10 flex items-center justify-center text-neutral-600 group-hover:border-red-500/50 transition-colors">
                      <ShoppingCart size={24} className="group-hover:text-red-500 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-neutral-500 font-mono text-sm mt-1">ID: {item.id} &bull; Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="font-mono text-xl text-white">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-xs text-neutral-500 mt-1">${item.price.toFixed(2)} each</div>
                    </div>
                    <button className="text-neutral-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-neutral-500 font-mono tracking-widest text-sm uppercase">Total Value</p>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                  ${cart.total.toFixed(2)}
                </div>
              </div>
              <Link 
                to="/checkout" 
                className="w-full md:w-auto bg-red-600 text-white px-10 py-4 rounded-lg font-bold tracking-widest uppercase text-sm hover:bg-red-500 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.4)] group"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
