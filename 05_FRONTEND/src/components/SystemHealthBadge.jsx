// 05_FRONTEND/src/components/SystemHealthBadge.jsx
import React from 'react';

export default function SystemHealthBadge({ status }) {
  const isHealthy = status === 'connected';
  const colorClass = isHealthy ? 'bg-white/20' : 'bg-[#E11D48]';
  const textClass = isHealthy ? 'text-white/60' : 'text-[#E11D48] drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]';

  return (
    <div className="flex items-center gap-3 border border-white/10 bg-white/5 rounded-full px-4 py-1.5">
      <div className="relative flex h-2 w-2">
        {!isHealthy && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-60"></span>}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClass}`}></span>
      </div>
      <span className={`text-xs uppercase tracking-widest font-medium ${textClass}`}>
        {status}
      </span>
    </div>
  );
}
