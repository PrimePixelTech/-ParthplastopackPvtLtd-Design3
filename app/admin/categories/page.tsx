'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { getCategories, deleteCategory } from '@/actions/category.actions';
import DeleteModal from '@/components/admin/DeleteModal';
import AdminLoader from '@/components/admin/AdminLoader';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const executeDelete = async () => {
    if (deleteTarget) {
      await deleteCategory(deleteTarget._id);
      fetchCategories();
      setDeleteTarget(null);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Categories</h1>
          <p className="text-slate-500 mt-1">Organize your products into categories for easier navigation.</p>
        </div>
        <Link href="/admin/categories/new" className="btn-primary w-full sm:w-auto justify-center py-2 px-4 text-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-2 sm:mt-0">
          <Plus size={16} /> Add Category
        </Link>
      </div>

      {/* Table Filters & Actions */}
      <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-100 text-sm text-slate-500">
                <th className="p-4 font-medium">Category Name</th>
                <th className="p-4 font-medium">URL Slug</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-100"
            >
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-0">
                    <AdminLoader text="Loading categories..." />
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center text-slate-500">No categories found.</td></tr>
              ) : (
                filteredCategories.map((category) => (
                  <motion.tr 
                    variants={staggerItem}
                    key={category._id} 
                    className="hover:bg-slate-50/50:bg-slate-800/50 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 cursor-move hover:bg-slate-200:bg-slate-700 transition-colors" title="Drag to reorder">
                          <ArrowUpDown size={16} className="text-slate-400" />
                        </div>
                        <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                          {category.title}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-500">/{category.slug}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        category.isActive ? 'bg-emerald-50 text-emerald-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {category.isActive ? 'ACTIVE' : 'DRAFT'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/categories/${category._id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50:bg-blue-900/20 rounded-lg transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => setDeleteTarget(category)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>
      </div>
      
      <DeleteModal 
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={executeDelete}
        itemName={deleteTarget?.title}
        description="Are you sure you want to delete this category? This will permanently remove it and might affect products associated with it."
      />
    </div>
  );
}
