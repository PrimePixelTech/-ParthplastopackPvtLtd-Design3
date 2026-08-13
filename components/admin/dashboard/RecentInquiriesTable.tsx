'use client';

import { motion } from 'framer-motion';
import { Search, Filter, Eye } from 'lucide-react';
import { IInquiry } from '@/models/Inquiry';
import Link from 'next/link';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Deal Closed': return 'bg-emerald-100 text-emerald-700';
    case 'Quote Sent': return 'bg-blue-100 text-blue-700';
    case 'Sample Sent': return 'bg-purple-100 text-purple-700';
    case 'Contacted': return 'bg-orange-100 text-orange-700';
    case 'New': return 'bg-rose-100 text-rose-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

interface RecentInquiriesTableProps {
  inquiries: IInquiry[] | null;
}

export default function RecentInquiriesTable({ inquiries }: RecentInquiriesTableProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Recent Inquiries</h3>
          <p className="text-sm text-slate-500">Latest leads and product quotes.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search inquiries..." 
              className="pl-9 pr-4 py-2 bg-white/60 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="p-2 bg-white/60 border border-slate-200 hover:bg-white rounded-xl transition-colors text-slate-600 flex items-center justify-center">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold first:pl-6 last:pr-6 whitespace-nowrap">Name</th>
              <th className="p-4 font-semibold whitespace-nowrap">Company</th>
              <th className="p-4 font-semibold whitespace-nowrap">Type</th>
              <th className="p-4 font-semibold whitespace-nowrap text-center">Status</th>
              <th className="p-4 font-semibold whitespace-nowrap">Date</th>
              <th className="p-4 font-semibold last:pr-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50">
            {(inquiries || []).map((inquiry, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                key={inquiry._id?.toString()} 
                className="hover:bg-white/60 transition-colors group"
              >
                <td className="p-4 first:pl-6 text-sm font-semibold text-slate-900">{inquiry.name}</td>
                <td className="p-4 text-sm font-medium text-slate-700">{inquiry.company || '-'}</td>
                <td className="p-4">
                  <p className="text-sm text-slate-900 font-medium truncate max-w-[150px] sm:max-w-[200px]">{inquiry.type}</p>
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500 whitespace-nowrap">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                <td className="p-4 last:pr-6">
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/inquiries`} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-blue-600 transition-colors" title="View"><Eye size={16} /></Link>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-white/40 flex justify-center bg-slate-50/30">
        <Link href="/admin/inquiries" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          View All Inquiries &rarr;
        </Link>
      </div>
    </motion.div>
  );
}
