import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Shield, Zap } from 'lucide-react';
import ScrollCartAnimation from '../components/ScrollCartAnimation';

export default function Home() {
  return (
    <div className="min-h-[400vh] bg-black text-white relative">
      {/* Background Canvas Animation */}
      <ScrollCartAnimation />

      {/* Foreground Content */}
      <div className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="backdrop-blur-md bg-black/30 p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(225,29,72,0.15)]"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
              SMART RETAIL.
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 font-light tracking-wide max-w-2xl mx-auto">
              Experience frictionless checkout with the world's most advanced AI-powered shopping cart.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <button className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                Explore Tech
              </button>
            </div>
          </motion.div>
        </section>

        {/* Feature Section 1 */}
        <section className="h-[100vh] flex items-center px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-black/40 p-10 rounded-2xl border-l-2 border-red-500 border-y border-r border-white/10"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="text-red-500" size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Neural Vision Processing</h2>
              <p className="text-neutral-400 leading-relaxed">
                Our carts are equipped with edge-computing vision arrays that detect item placement with 99.8% accuracy. No barcodes, no scanning. Just drop it in.
              </p>
            </motion.div>
            <div className="hidden md:block"></div> {/* Spacer for cart animation visibility */}
          </div>
        </section>

        {/* Feature Section 2 */}
        <section className="h-[100vh] flex items-center px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
             <div className="hidden md:block"></div> {/* Spacer */}
             <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-black/40 p-10 rounded-2xl border-r-2 border-amber-500 border-y border-l border-white/10"
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6">
                <Database className="text-amber-500" size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Sensor Fusion</h2>
              <p className="text-neutral-400 leading-relaxed">
                Combining high-precision load cells with PIR motion sensors, the cart intuitively understands when an item is added or removed, dynamically updating your virtual basket in milliseconds.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA / Final Section */}
        <section className="h-[100vh] flex items-center justify-center px-6">
           <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-gradient-to-br from-black/80 to-red-900/20 p-16 rounded-3xl border border-red-500/30 text-center max-w-4xl w-full"
            >
              <Zap className="text-red-500 mx-auto mb-6" size={48} />
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-widest">
                The Checkout is Dead.
              </h2>
              <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
                Walk in, grab what you need, and walk out. The future of retail is entirely frictionless.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 rounded-lg bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-neutral-200 transition-colors">
                  View Catalog
                </button>
                <button className="px-8 py-4 rounded-lg border border-red-500 text-red-500 font-bold tracking-widest uppercase text-sm hover:bg-red-500/10 transition-colors">
                  Live System Status
                </button>
              </div>
            </motion.div>
        </section>

      </div>
    </div>
  );
}
