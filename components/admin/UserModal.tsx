'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createUser, updateUser } from '@/actions/user.actions';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any; // null for new user
  onSuccess: () => void;
}

export default function UserModal({ isOpen, onClose, user, onSuccess }: UserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setRole('EMPLOYEE');
      setPassword('');
    }
    setError('');
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = { name, email, role, password };

    try {
      let res;
      if (user) {
        // If editing and password is empty, don't send it to update
        const updateData = password ? data : { name, email, role };
        res = await updateUser(user._id, updateData);
      } else {
        if (!password) {
            setError("Password is required for new users.");
            setLoading(false);
            return;
        }
        res = await createUser(data);
      }

      if (res?.success) {
        onSuccess();
        onClose();
      } else {
        setError(res?.error || 'Something went wrong');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {user ? 'Edit User' : 'Add New User'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {user ? 'Modify existing user details.' : 'Create a new user account with role-based access.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="user-form" onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password {user ? '(Leave blank to keep current)' : '*'}
                  </label>
                  <input
                    type="password"
                    required={!user}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Role</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  >
                    <option value="EMPLOYEE">Employee (Default)</option>
                    <option value="SALES">Sales</option>
                    <option value="MARKETING">Marketing</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-slate-50/50 flex items-center justify-end gap-3 mt-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-gray-200 hover:bg-slate-50 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="user-form"
                disabled={loading}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:hover:bg-primary"
              >
                {loading ? 'Saving...' : user ? 'Update User' : 'Create User'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
