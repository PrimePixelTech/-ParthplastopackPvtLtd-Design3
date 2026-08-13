'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { createAttribute, updateAttribute } from '@/actions/attribute.actions';

interface AttributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  attribute?: any; // null for new
  onSuccess: () => void;
}

export default function AttributeModal({ isOpen, onClose, attribute, onSuccess }: AttributeModalProps) {
  const [name, setName] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (attribute) {
      setName(attribute.name || '');
      setOptions(attribute.options || []);
    } else {
      setName('');
      setOptions([]);
    }
    setNewOption('');
    setError('');
  }, [attribute, isOpen]);

  const handleAddOption = () => {
    const trimmed = newOption.trim();
    if (!trimmed) return;
    if (options.some(opt => opt.toLowerCase() === trimmed.toLowerCase())) {
      setError('Option already exists.');
      return;
    }
    setOptions([...options, trimmed]);
    setNewOption('');
    setError('');
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Attribute name is required.');
      return;
    }

    setLoading(true);
    setError('');

    const data = {
      name: name.trim(),
      options: options
    };

    try {
      let result;
      if (attribute && attribute._id) {
        result = await updateAttribute(attribute._id, data);
      } else {
        result = await createAttribute(data);
      }

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-slate-900">
              {attribute ? 'Edit Attribute' : 'Create New Attribute'}
            </h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Attribute Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Material, Color, Capacity"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Dropdown Options
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="e.g., PET"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddOption();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center justify-center shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-slate-50 rounded-xl border border-gray-100">
                  {options.length === 0 ? (
                    <span className="text-sm text-slate-400">No options added yet. Type above and press Enter.</span>
                  ) : (
                    options.map((opt, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 shadow-sm">
                        {opt}
                        <button type="button" onClick={() => handleRemoveOption(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <X size={14} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white transition-colors font-medium text-sm shadow-md disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Attribute'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
