import React from 'react';
import LiveEvents from './LiveEvents';

export default function LiveStatus({ events = [] }) {
  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/5 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <LiveEvents events={events} />
      </div>
    </div>
  );
}
