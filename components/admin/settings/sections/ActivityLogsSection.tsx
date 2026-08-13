import { Activity, Download, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ActivityLogsSection({ logs = [] }: { logs?: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden mb-8"
      id="section-logs"
    >
      <div className="p-6 border-b border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-xl text-white">
            <Activity size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Activity Logs</h2>
            <p className="text-sm text-slate-500">Track and monitor all admin actions.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 bg-white/60 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 outline-none w-full md:w-48" />
          </div>
          <button type="button" className="p-2 border border-slate-200 bg-white/60 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
          <button type="button" className="p-2 border border-slate-200 bg-white/60 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors" title="Export CSV">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">User</th>
              <th className="px-6 py-4 font-bold">Action</th>
              <th className="px-6 py-4 font-bold">Date & Time</th>
              <th className="px-6 py-4 font-bold">IP Address</th>
              <th className="px-6 py-4 font-bold">Device & Browser</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white/40">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No activity logs found.
                </td>
              </tr>
            ) : (
              logs.map((log: any, index: number) => (
                <tr key={log._id || index} className="hover:bg-white/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(log.createdAt).toLocaleString(undefined, { 
                      year: 'numeric', month: 'short', day: 'numeric', 
                      hour: '2-digit', minute: '2-digit' 
                    })}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.ipAddress || 'Unknown'}</td>
                  <td className="px-6 py-4 text-slate-500">{log.device || 'Unknown'} • {log.browser || 'Unknown'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-200 flex justify-center">
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 text-sm font-medium">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
