'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Copy, Eye, SlidersHorizontal, Download, Upload, Package, X } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { getProducts, deleteProduct, bulkImportProducts } from '@/actions/product.actions';
import { getCategories } from '@/actions/category.actions';
import DeleteModal from '@/components/admin/DeleteModal';
import AdminLoader from '@/components/admin/AdminLoader';
import Image from 'next/image';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (products.length === 0) {
      alert("No products to export.");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "products_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const importedProducts = JSON.parse(content);
        
        if (!Array.isArray(importedProducts)) {
          alert("Invalid file format. Please upload a valid JSON array of products.");
          return;
        }

        setImporting(true);
        const res = await bulkImportProducts(importedProducts);
        
        if (res.success) {
          alert(`Successfully imported ${res.count} products.`);
          fetchData();
        } else {
          alert(`Failed to import: ${res.error}`);
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
        console.error(err);
      } finally {
        setImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodData, catData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(prodData);
      setCategories(catData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const executeDelete = async () => {
    if (deleteTarget) {
      await deleteProduct(deleteTarget._id);
      fetchData();
      setDeleteTarget(null);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const catId = p.category?._id || (typeof p.category === 'string' ? p.category : 'other');
    const matchesCategory = filterCategory === 'all' || catId === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">Manage your product catalog, pricing, and inventory.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
          />
          <button onClick={handleExport} className="btn-secondary flex-1 sm:flex-none justify-center py-2 px-3 text-sm flex items-center hover:bg-slate-100:bg-slate-800 transition-colors">
            <Download size={16} className="mr-1.5" /> Export
          </button>
          <button onClick={() => fileInputRef.current?.click()} disabled={importing} className="btn-secondary flex-1 sm:flex-none justify-center py-2 px-3 text-sm flex items-center hover:bg-slate-100:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Upload size={16} className="mr-1.5" /> {importing ? 'Importing...' : 'Import'}
          </button>
          <Link href="/admin/products/new" className="btn-primary w-full sm:w-auto justify-center py-2 px-4 text-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-2 sm:mt-0">
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* Table Filters & Actions */}
      <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products by name, SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-64">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-gray-100 text-sm text-slate-500">
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Category</th>
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
                  <td colSpan={5} className="p-0">
                    <AdminLoader text="Loading products..." />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center text-slate-500">No products found.</td></tr>
              ) : (
                filteredProducts.map((product) => (
                  <motion.tr 
                    variants={staggerItem}
                    key={product._id} 
                    className="hover:bg-slate-50/50:bg-slate-800/50 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => { if (product.images && product.images.length > 0) setPreviewImage(product.images[0]) }}
                          className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200 cursor-pointer hover:border-primary transition-colors"
                          title="Click to view full image"
                        >
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                          ) : (
                            <Package size={20} className="text-slate-400" />
                          )}
                        </button>
                        <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{product.sku}</td>
                    <td className="p-4 text-sm text-slate-500">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                        {product.category?.title || 'No Category'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' :
                        product.status === 'DRAFT' ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/products/${product.slug || product._id}`} 
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Preview Product"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link href={`/admin/products/${product._id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50:bg-blue-900/20 rounded-lg transition-colors" title="Edit Product">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => setDeleteTarget(product)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50:bg-red-900/20 rounded-lg transition-colors" title="Delete Product">
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
        itemName={deleteTarget?.name}
        description="Are you sure you want to delete this product? This will permanently remove it from the database."
      />

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            >
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <img 
                src={previewImage} 
                alt="Product Preview" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
