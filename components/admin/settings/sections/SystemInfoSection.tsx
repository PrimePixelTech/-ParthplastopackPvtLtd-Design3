import { useState, useEffect } from 'react';
import { Server, Database, HardDrive, Cpu, MemoryStick, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSystemInfo } from '@/actions/system.actions';

export default function SystemInfoSection() {
  const [sysInfo, setSysInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await getSystemInfo();
      if (res.success) {
        setSysInfo(res.data);
      }
      setLoading(false);
    };

    fetchInfo();
    const interval = setInterval(fetchInfo, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (percent: number) => {
    if (percent > 85) return 'bg-rose-500';
    if (percent > 70) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden mb-8"
      id="section-system"
    >
      <div className="p-6 border-b border-white/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-500/10 rounded-xl text-slate-600">
            <Server size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">System Information</h2>
            <p className="text-sm text-slate-500">Real-time health and performance metrics.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          All Systems Operational
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* CPU */}
          <div className="p-4 bg-white/60 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Cpu size={16} /> <span className="text-xs font-semibold">CPU Usage</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {loading ? '--' : sysInfo?.cpu?.percent?.toFixed(1) || '0'}
              <span className="text-sm text-slate-500">%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${getStatusColor(sysInfo?.cpu?.percent || 0)}`} 
                style={{ width: `${sysInfo?.cpu?.percent || 0}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-400 mt-2">{sysInfo?.cpu?.cores || 0} Cores</div>
          </div>
          
          {/* RAM */}
          <div className="p-4 bg-white/60 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <MemoryStick size={16} /> <span className="text-xs font-semibold">RAM Usage</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {loading ? '--' : formatBytes(sysInfo?.memory?.used || 0).split(' ')[0]}
              <span className="text-sm text-slate-500">/ {loading ? '--' : formatBytes(sysInfo?.memory?.total || 0)}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${getStatusColor(sysInfo?.memory?.percent || 0)}`} 
                style={{ width: `${sysInfo?.memory?.percent || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Storage (Mocked as real-time storage info requires deeper OS integration like 'diskusage' module) */}
          <div className="p-4 bg-white/60 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <HardDrive size={16} /> <span className="text-xs font-semibold">Storage</span>
            </div>
            <div className="text-2xl font-black text-slate-900">45<span className="text-sm text-slate-500">%</span></div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-amber-500 w-[45%]"></div>
            </div>
            <div className="text-xs text-slate-400 mt-2">Mock Data</div>
          </div>

          {/* Database */}
          <div className="p-4 bg-white/60 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <Database size={16} /> <span className="text-xs font-semibold">Database</span>
            </div>
            <div className={`text-xl font-bold mt-1 ${sysInfo?.database?.status === 'Connected' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {loading ? 'Checking...' : sysInfo?.database?.status || 'Unknown'}
            </div>
            {sysInfo?.database?.status === 'Connected' && (
              <div className="text-xs text-emerald-600 font-medium mt-1">
                {sysInfo?.database?.latency}ms latency
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/60 rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-700 w-1/3">OS Platform</td>
                <td className="px-4 py-3 text-slate-500 font-mono capitalize">{sysInfo?.system?.platform || 'Loading...'}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-700">System Uptime</td>
                <td className="px-4 py-3 text-slate-500 font-mono">
                  {sysInfo?.system?.uptime ? `${Math.floor(sysInfo.system.uptime / 3600)}h ${Math.floor((sysInfo.system.uptime % 3600) / 60)}m` : 'Loading...'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-700">Next.js Version</td>
                <td className="px-4 py-3 text-slate-500 font-mono">15.0.0</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-700">React Version</td>
                <td className="px-4 py-3 text-slate-500 font-mono">19.0.0</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-700">Node.js Version</td>
                <td className="px-4 py-3 text-slate-500 font-mono">{sysInfo?.system?.nodeVersion || 'Loading...'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
