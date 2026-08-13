'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, MoreHorizontal } from 'lucide-react';

interface AnalyticsChartsProps {
  trendData: Array<{ name: string; quotes: number; contacts: number }> | null;
}

const trafficData = [
  { name: 'Organic Search', value: 400, color: '#3b82f6' },
  { name: 'Direct', value: 300, color: '#10b981' },
  { name: 'Social Media', value: 300, color: '#f59e0b' },
  { name: 'Referral', value: 200, color: '#8b5cf6' },
];

export default function AnalyticsCharts({ trendData }: AnalyticsChartsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px] bg-slate-100 rounded-3xl animate-pulse" />
        <div className="h-[400px] bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Revenue Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2 p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
            <p className="text-sm text-slate-500">Monthly revenue and expenses</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
              <Download size={18} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
              />
              <Area type="monotone" dataKey="quotes" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorQuotes)" />
              <Area type="monotone" dataKey="contacts" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorContacts)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Traffic Sources Donut Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Traffic Sources</h3>
            <p className="text-sm text-slate-500">Where your visitors come from</p>
          </div>
        </div>

        <div className="flex-1 min-h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <span className="text-3xl font-bold text-slate-900">1.2K</span>
              <p className="text-xs text-slate-500">Total Visits</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {trafficData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-700 truncate">{item.name}</p>
                <p className="text-xs font-bold text-slate-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
