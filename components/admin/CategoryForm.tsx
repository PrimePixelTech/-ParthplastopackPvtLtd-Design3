'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory } from '@/actions/category.actions';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    isActive: initialData?.isActive ?? true,
    sortOrder: initialData?.sortOrder || 0,
    image: initialData?.image || '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    setError('');

    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (initialData?._id) {
        result = await updateCategory(initialData._id, formData);
      } else {
        result = await createCategory(formData);
      }

      if (result.success) {
        router.push('/admin/categories');
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">
          {initialData ? 'Edit Category' : 'Create New Category'}
        </h2>
        <Link href="/admin/categories" className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.slug}
              placeholder="Leave blank to auto-generate"
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category Image / Icon</label>
            <div className="flex items-start gap-4">
              {formData.image && (
                <div className="relative w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <Image src={formData.image} alt="Category Icon" width={96} height={96} className="object-contain" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {!formData.image && (
                <label className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:text-blue-500 transition text-gray-500">
                  {uploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  ) : (
                    <>
                      <Upload size={24} className="mb-1" />
                      <span className="text-xs font-medium">Upload</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Is Active</label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Category'}
          </button>
        </div>
      </form>
    </div>
  );
}
