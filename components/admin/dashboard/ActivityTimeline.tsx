'use client';

import { motion } from 'framer-motion';
import { UserCheck, Package, CreditCard, Ticket, Settings, ArrowRight } from 'lucide-react';

const timeline = [
  { id: 1, type: 'login', title: 'New Login', desc: 'Admin logged in from Mac OS (Chrome)', time: '10 mins ago', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
  { id: 2, type: 'order', title: 'Order #7352 Created', desc: 'Acme Corp placed a new order for $1,250.00', time: '1 hour ago', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
  { id: 3, type: 'payment', title: 'Payment Received', desc: 'Payment of $3,400.00 cleared for #ORD-7351', time: '3 hours ago', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
  { id: 4, type: 'ticket', title: 'Support Ticket #829', desc: 'Customer reported an issue with shipping.', time: '5 hours ago', icon: Ticket, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' },
  { id: 5, type: 'system', title: 'System Update', desc: 'Server maintenance completed successfully.', time: '1 day ago', icon: Settings, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' },
];

export default function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Activity Timeline</h3>
          <p className="text-sm text-slate-500">Latest actions on the platform.</p>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-200" />
        <div className="space-y-6 relative">
          {timeline.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="flex gap-4 relative group"
              >
                <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border ${item.bg} ${item.border} ${item.color} relative z-10 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[250px]">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <button className="mt-4 w-full py-3 border border-slate-200 hover:border-slate-300 bg-white/50 hover:bg-white text-sm font-semibold text-slate-700 rounded-2xl transition-colors flex items-center justify-center gap-2 group">
        View All Activity <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
