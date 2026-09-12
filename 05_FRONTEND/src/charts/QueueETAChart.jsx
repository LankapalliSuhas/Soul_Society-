// 05_FRONTEND/src/charts/QueueETAChart.jsx
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function QueueETAChart({ data = [] }) {
  const chartData = data.map(d => ({
    name: d.lane,
    eta: d.estimated_wait_seconds ? Math.round(d.estimated_wait_seconds / 60) : d.eta_min,
    isCritical: (d.status === 'CRITICAL' || d.status === 'critical')
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
          <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="eta" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isCritical ? '#E11D48' : 'rgba(255,255,255,0.4)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
