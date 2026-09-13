import React, { useState } from 'react';
import { checkoutCart } from '../services/api';
import { CreditCard, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [status, setStatus] = useState('idle'); // idle, processing, success
  const [orderId, setOrderId] = useState(null);

  const handleCheckout = async () => {
    setStatus('processing');
    try {
      const res = await checkoutCart();
      setOrderId(res.orderId);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen flex items-center justify-center p-8 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
        >
          {status === 'idle' && (
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <CreditCard size={32} className="text-red-500" />
              </div>
              <h2 className="text-3xl font-black tracking-widest uppercase mb-2">Secure Checkout</h2>
              <p className="text-neutral-400 mb-8 font-mono text-sm">
                <Lock size={12} className="inline mr-1" />
                256-BIT ENCRYPTION ACTIVE
              </p>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] group-hover:transition-[background-position_1.5s_ease] group-hover:bg-[position:200%_0,0_0]" />
                <span className="relative z-10 flex justify-center items-center gap-2">
                  Confirm Payment
                </span>
              </button>
            </div>
          )}

          {status === 'processing' && (
            <div className="text-center py-10">
              <Loader2 size={48} className="animate-spin text-red-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold tracking-widest uppercase mb-2 animate-pulse text-amber-500">Processing Transaction</h2>
              <p className="text-neutral-500 font-mono text-xs tracking-widest">ESTABLISHING SECURE UPLINK...</p>
            </div>
          )}

          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={40} className="text-emerald-400" />
              </div>
              <h2 className="text-3xl font-black tracking-widest uppercase mb-2 text-emerald-400">Payment Complete</h2>
              <p className="text-neutral-400 mb-6">Your frictionless checkout was successful.</p>
              
              <div className="bg-black/50 border border-white/10 rounded-xl p-6 mb-8">
                <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest mb-1">Transaction ID</div>
                <div className="text-xl font-mono text-white tracking-widest">{orderId}</div>
              </div>

              <Link 
                to="/"
                className="block w-full bg-transparent border border-neutral-700 text-neutral-300 py-4 rounded-xl font-bold tracking-widest uppercase text-sm hover:border-white hover:text-white hover:bg-white/5 transition-colors"
              >
                Return to Dashboard
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
