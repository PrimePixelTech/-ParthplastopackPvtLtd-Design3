'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createInquiry } from '@/actions/inquiry.actions';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
}

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await createInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        product: data.product,
        quantity: data.quantity,
        message: data.message || `Interested in ${data.product}`,
        type: 'Product Quote'
      });
      
      if (response.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          reset();
          onClose();
        }, 2500);
      } else {
        console.error('Error submitting quote:', response.error);
        alert('Failed to submit request. Please try again or contact us directly.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit request. Please try again or contact us directly.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-premium-xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h3 className="text-lg font-bold font-display text-dark">Request a Quote</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Get custom pricing for your requirements</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200:bg-slate-700 flex items-center justify-center transition-colors text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold text-dark">Quote Requested!</h4>
                    <p className="text-gray-500 mt-2">Our team will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input
                          {...register('name', { required: true })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                          placeholder="Your name"
                        />
                        {errors.name && <span className="text-xs text-red-500 mt-1">Required</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                        <input
                          {...register('company')}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                            placeholder="you@company.com"
                          />
                        </div>
                        {errors.email && <span className="text-xs text-red-500 mt-1">Valid email required</span>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            {...register('phone', { required: true })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        {errors.phone && <span className="text-xs text-red-500 mt-1">Required</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Interest</label>
                      <div className="relative">
                        <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          {...register('product')}
                          defaultValue={productName || ''}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                          placeholder="e.g. HDPE Containers, Protein Jars"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Estimated Quantity</label>
                      <input
                        {...register('quantity')}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                        placeholder="e.g. 5,000 pieces per month"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                      <textarea
                        {...register('message')}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-gray-400:text-gray-500"
                        placeholder="Tell us about your packaging requirements..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full btn-primary py-3.5 text-sm gap-2"
                    >
                      <Send size={16} />
                      Submit Quote Request
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
