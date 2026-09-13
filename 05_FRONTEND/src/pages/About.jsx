import React from 'react';
import { Shield, Cpu, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    { icon: <Eye size={32} />, title: "Computer Vision", desc: "Edge AI cameras identifying items instantly." },
    { icon: <Cpu size={32} />, title: "Sensor Fusion", desc: "Combining weight and visual data for 99.9% accuracy." },
    { icon: <Shield size={32} />, title: "Loss Prevention", desc: "Real-time discrepancy detection." },
    { icon: <Zap size={32} />, title: "Frictionless UI", desc: "No scanning, no waiting in lines." },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-20 pb-24 px-8">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-neutral-900 mb-6 tracking-tight"
        >
          Built for the Future of Retail.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed"
        >
          Soul Society's intelligent carts combine state-of-the-art computer vision, sensor fusion, and seamless UI to redefine the shopping experience.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {f.icon}
            </div>
            <h3 className="font-bold text-xl mb-3">{f.title}</h3>
            <p className="text-neutral-500 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-3xl mx-auto mt-32 text-center bg-neutral-900 text-white p-12 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6">Smart India Hackathon Team</h2>
        <p className="text-neutral-400 mb-8">Phantom (P1) • Soham (P2) • Akash (P3) • Cherry (P4) • Mighty (P5) • Team+1 (P6)</p>
      </div>
    </div>
  );
}
