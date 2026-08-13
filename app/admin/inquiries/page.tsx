'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Mail, Clock, Search, Filter, Trash2, Edit2, AlertTriangle } from 'lucide-react';
import { getInquiries, deleteInquiry } from '@/actions/inquiry.actions';
import InquiryDrawer from '@/components/admin/InquiryDrawer';
import AdminLoader from '@/components/admin/AdminLoader';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    const res = await getInquiries();
    if (res.success) {
      setInquiries(res.data);
    }
    setLoading(false);
  };

  const handleUpdateInquiry = (updated: any) => {
    setInquiries(prev => prev.map(inq => inq._id === updated._id ? updated : inq));
    setSelectedInquiry(updated);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    
    const res = await deleteInquiry(deleteConfirmId);
    if (res.success) {
      setInquiries(prev => prev.filter(inq => inq._id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } else {
      alert('Failed to delete inquiry');
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const search = searchQuery.toLowerCase();
    const nameMatch = (inq.name || '').toLowerCase().includes(search);
    const emailMatch = (inq.email || '').toLowerCase().includes(search);
    const companyMatch = (inq.company || '').toLowerCase().includes(search);
    
    const matchesSearch = nameMatch || emailMatch || companyMatch;
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'New').length,
    closed: inquiries.filter(i => i.status === 'Deal Closed').length,
  };

  const statusColors: any = {
    'New': 'bg-blue-100 text-blue-700',
    'Contacted': 'bg-yellow-100 text-yellow-700',
    'Sample Sent': 'bg-purple-100 text-purple-700',
    'Quote Sent': 'bg-indigo-100 text-indigo-700',
    'Deal Closed': 'bg-green-100 text-green-700',
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold text-dark">{stats.total}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">New / Unread</p>
              <p className="text-2xl font-bold text-dark">{stats.new}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Deals Closed</p>
              <p className="text-2xl font-bold text-dark">{stats.closed}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={18} className="text-gray-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Sample Sent">Sample Sent</option>
              <option value="Quote Sent">Quote Sent</option>
              <option value="Deal Closed">Deal Closed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type / Interest</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-0">
                      <AdminLoader text="Loading inquiries..." />
                    </td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 text-sm">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <motion.tr 
                      key={inq._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50:bg-slate-800/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-dark">{inq.name}</div>
                        <div className="text-xs text-gray-500">{inq.company || 'Individual'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-1 ${inq.type === 'Product Quote' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                          {inq.type}
                        </span>
                        <div className="text-xs font-medium text-dark max-w-[200px] truncate">
                          {inq.product || 'General Inquiry'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[inq.status] || 'bg-gray-100'}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                          <a 
                            href={`https://wa.me/${(inq.phone || '').replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"
                            title="Chat on WhatsApp"
                          >
                            <Phone size={14} />
                          </a>
                          <a 
                            href={`mailto:${inq.email}`}
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                            title="Send Email"
                          >
                            <Mail size={14} />
                          </a>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedInquiry(inq); }}
                            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200:bg-slate-600 transition-all"
                            title="Edit Inquiry"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={(e) => handleDeleteClick(e, inq._id)}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Inquiry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <InquiryDrawer 
        inquiry={selectedInquiry} 
        isOpen={!!selectedInquiry} 
        onClose={() => setSelectedInquiry(null)} 
        onUpdate={handleUpdateInquiry}
      />

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden z-10"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Inquiry?</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Are you sure you want to delete this inquiry? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 font-semibold text-slate-700 hover:bg-gray-50:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 py-2.5 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
