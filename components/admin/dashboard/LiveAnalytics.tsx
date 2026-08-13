'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Activity, Server, Users, HardDrive } from 'lucide-react';
import { useDashboardStore } from '@/lib/dashboardStore';

export default function LiveAnalytics() {
  const { liveMode } = useDashboardStore();
  const [activeUsers, setActiveUsers] = useState(142);
  const [cpuUsage, setCpuUsage] = useState(45);
  const [ramUsage, setRamUsage] = useState(62);
  const [latency, setLatency] = useState(120);

  useEffect(() => {
    if (!liveMode) return;

    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
      setCpuUsage(Math.floor(40 + Math.random() * 20));
      setRamUsage(Math.floor(60 + Math.random() * 10));
      setLatency(Math.floor(100 + Math.random() * 50));
    }, 2000);

    return () => clearInterval(interval);
  }, [liveMode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="p-6 bg-slate-900 rounded-3xl shadow-xl text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Activity size={18} className="text-blue-400" /> Live System Status
            </h3>
            <p className="text-sm text-slate-400 mt-1">Real-time infrastructure monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {liveMode && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${liveMode ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{liveMode ? 'Live' : 'Paused'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Users size={16} /> <span className="text-xs font-medium uppercase">Active Users</span>
            </div>
            <div className="text-3xl font-bold text-white">{activeUsers}</div>
          </div>

          <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Activity size={16} /> <span className="text-xs font-medium uppercase">API Latency</span>
            </div>
            <div className="text-3xl font-bold text-emerald-400">{latency}ms</div>
          </div>

          <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <div className="flex items-center gap-2">
                <Server size={16} /> <span className="text-xs font-medium uppercase">CPU Load</span>
              </div>
              <span className="text-xs font-bold text-blue-400">{cpuUsage}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-4">
              <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${cpuUsage}%` }} />
            </div>
          </div>

          <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <div className="flex items-center gap-2">
                <HardDrive size={16} /> <span className="text-xs font-medium uppercase">Memory</span>
              </div>
              <span className="text-xs font-bold text-purple-400">{ramUsage}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-4">
              <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${ramUsage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
