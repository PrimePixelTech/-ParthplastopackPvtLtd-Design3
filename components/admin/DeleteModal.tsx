'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName
}: DeleteModalProps) {
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="text-red-600" size={24} />
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-600:text-slate-300 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {description}
                  {itemName && (
                    <span className="block mt-2 font-semibold text-slate-700">
                      Target: "{itemName}"
                    </span>
                  )}
                </p>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50:bg-slate-800 transition-colors border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
