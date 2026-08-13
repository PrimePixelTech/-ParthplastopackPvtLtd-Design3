'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit2, AlertTriangle, Shield, User as UserIcon } from 'lucide-react';
import { getUsers, deleteUser } from '@/actions/user.actions';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLoader from '@/components/admin/AdminLoader';
import UserModal from '@/components/admin/UserModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
        router.push('/admin/login');
    } else if (status === 'authenticated') {
        const role = (session?.user as any)?.role;
        if (role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
            router.push('/admin'); // Redirect unauthorized users
        } else {
            loadUsers();
        }
    }
  }, [status, session]);

  const loadUsers = async () => {
    setLoading(true);
    const res = await getUsers();
    if (res.success) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    
    const res = await deleteUser(deleteConfirmId);
    if (res.success) {
      setUsers(prev => prev.filter(user => user._id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } else {
      alert(res.error || 'Failed to delete user');
    }
  };
  
  const handleEditClick = (user: any) => {
      setSelectedUser(user);
      setIsModalOpen(true);
  };

  const filteredUsers = users.filter(user => {
    const search = searchQuery.toLowerCase();
    return (user.name || '').toLowerCase().includes(search) || 
           (user.email || '').toLowerCase().includes(search) ||
           (user.role || '').toLowerCase().includes(search);
  });

  const getRoleBadgeColor = (role: string) => {
      switch (role) {
          case 'SUPER_ADMIN': return 'bg-red-100 text-red-700 border-red-200';
          case 'ADMIN': return 'bg-orange-100 text-orange-700 border-orange-200';
          case 'SALES': return 'bg-blue-100 text-blue-700 border-blue-200';
          case 'MARKETING': return 'bg-purple-100 text-purple-700 border-purple-200';
          default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
  };

  if (status === 'loading') {
      return (
          <>
            <AdminHeader />
            <div className="flex h-screen items-center justify-center">
                <AdminLoader text="Checking permissions..." />
            </div>
          </>
      )
  }

  return (
    <>
      <AdminHeader />
      
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                <p className="text-sm text-slate-500 mt-1">Manage team members and role-based access.</p>
            </div>
            
            <button
                onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all"
            >
                <Plus size={18} />
                Add New User
            </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-0">
                      <AdminLoader text="Loading users..." />
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500 text-sm">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900">{user.name}</div>
                                <div className="text-xs text-slate-500">{user.email}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getRoleBadgeColor(user.role)}`}>
                          {user.role === 'SUPER_ADMIN' && <Shield size={12} className="mr-1" />}
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(user)}
                            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-slate-200 transition-all"
                            title="Edit User"
                          >
                            <Edit2 size={14} />
                          </button>
                          {(session?.user as any)?.id !== user._id && (
                              <button 
                                onClick={() => handleDeleteClick(user._id)}
                                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                title="Delete User"
                              >
                                <Trash2 size={14} />
                              </button>
                          )}
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

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSuccess={loadUsers}
      />

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
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
                <h3 className="text-lg font-bold text-slate-900 mb-2">Delete User?</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Are you sure you want to remove this user? They will immediately lose access to the system.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
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
