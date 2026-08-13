'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Building2, Package, Save, CheckCircle2, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateInquiry } from '@/actions/inquiry.actions';

interface InquiryDrawerProps {
  inquiry: any | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedInquiry: any) => void;
}

const statusOptions = ['New', 'Contacted', 'Sample Sent', 'Quote Sent', 'Deal Closed'];
const statusColors: any = {
  'New': 'bg-blue-100 text-blue-700',
  'Contacted': 'bg-yellow-100 text-yellow-700',
  'Sample Sent': 'bg-purple-100 text-purple-700',
  'Quote Sent': 'bg-indigo-100 text-indigo-700',
  'Deal Closed': 'bg-green-100 text-green-700',
};

export default function InquiryDrawer({ inquiry, isOpen, onClose, onUpdate }: InquiryDrawerProps) {
  const [internalNotes, setInternalNotes] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (inquiry) {
      setInternalNotes(inquiry.internalNotes || '');
      setStatus(inquiry.status || 'New');
    }
  }, [inquiry]);

  if (!inquiry) return null;

  const handleSave = async () => {
    setIsSaving(true);
    const response = await updateInquiry(inquiry._id, { internalNotes, status });
    setIsSaving(false);
    if (response.success) {
      onUpdate(response.data);
    } else {
      alert('Failed to update inquiry');
    }
  };

  const formattedDate = new Date(inquiry.createdAt).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-dark">{inquiry.name}</h2>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[status] || 'bg-gray-100'}`}>
                    {status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  {formattedDate}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-dark hover:bg-gray-50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400">Email</span>
                      <a href={`mailto:${inquiry.email}`} className="text-sm font-medium text-dark hover:text-primary transition-colors">
                        {inquiry.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 shrink-0 shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400">Phone</span>
                      <a href={`tel:${inquiry.phone}`} className="text-sm font-medium text-dark hover:text-green-600 transition-colors">
                        {inquiry.phone}
                      </a>
                    </div>
                    <a 
                      href={`https://wa.me/${(inquiry.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${inquiry.name},%20we%20received%20your%20inquiry%20from%20Parth%20Plasto%20Pack.`}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto text-xs font-semibold text-green-600 bg-green-100 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>

                  {inquiry.company && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <span className="block text-xs text-gray-400">Company</span>
                        <span className="text-sm font-medium text-dark">{inquiry.company}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Requirement Details</h3>
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-white text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider border border-blue-100">
                      {inquiry.type}
                    </span>
                  </div>
                  
                  {inquiry.product && (
                    <div className="mb-4">
                      <span className="block text-xs text-blue-400 mb-1">Product of Interest</span>
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-900 bg-white px-4 py-2.5 rounded-xl border border-blue-100">
                        <Package size={16} className="text-blue-500" />
                        {inquiry.product}
                      </div>
                    </div>
                  )}
                  
                  {inquiry.quantity && (
                    <div className="mb-4">
                      <span className="block text-xs text-blue-400 mb-1">Estimated Quantity</span>
                      <span className="text-sm font-medium text-blue-900">{inquiry.quantity}</span>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-blue-100/50">
                    <span className="block text-xs text-blue-400 mb-2">Message</span>
                    <p className="text-sm text-blue-900/80 leading-relaxed whitespace-pre-wrap">
                      {inquiry.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Manage Lead</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Change Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Internal Notes (Private)</label>
                    <textarea
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      rows={4}
                      placeholder="Add notes about this lead... (e.g. Quoted $5.00/pc, calling back tomorrow)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-yellow-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
