// 05_FRONTEND/src/charts/StockChart.jsx
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function StockChart({ data = [] }) {
  const chartData = data.slice(0, 5).map(d => ({
    name: d.sku,
    stock: d.estimated_quantity ?? d.stock
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(255,255,255,0.3)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgba(255,255,255,0.0)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
          <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
          <Tooltip
            cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="stock" stroke="rgba(255,255,255,0.6)" fillOpacity={1} fill="url(#colorStock)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
