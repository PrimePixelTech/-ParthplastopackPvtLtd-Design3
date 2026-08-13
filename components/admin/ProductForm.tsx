'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/actions/product.actions';
import { getCategories } from '@/actions/category.actions';
import { getAttributes } from '@/actions/attribute.actions';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    sku: initialData?.sku || '',
    slug: initialData?.slug || '',
    category: initialData?.category?._id || initialData?.category || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    status: initialData?.status || 'DRAFT',
    price: initialData?.price || 0,
    moq: initialData?.moq || 1000,
    images: initialData?.images || [],
    specifications: {
      overFlowVolume: initialData?.specifications?.overFlowVolume || '',
      heightOfContainer: initialData?.specifications?.heightOfContainer || '',
      neckSize: initialData?.specifications?.neckSize || '',
      maximumDiaOfContainer: initialData?.specifications?.maximumDiaOfContainer || '',
      wallThickness: initialData?.specifications?.wallThickness || '',
      capFitting: initialData?.specifications?.capFitting || '',
      labelType: initialData?.specifications?.labelType || '',
      weightOfContainer: initialData?.specifications?.weightOfContainer || '',
      powderVolume: initialData?.specifications?.powderVolume || '',
      material: initialData?.specifications?.material || '',
    }
  });

  useEffect(() => {
    Promise.all([getCategories(), getAttributes()])
      .then(([cats, attrs]) => {
        setCategories(cats);
        setAttributes(attrs);
      })
      .catch(console.error);
  }, []);

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
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, data.url]
        }));
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSpecChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.category) {
      setError('Please select a category');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (initialData?._id) {
        result = await updateProduct(initialData._id, formData);
      } else {
        result = await createProduct(formData);
      }

      if (result.success) {
        router.push('/admin/products');
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render dynamic input/select for specifications
  const renderSpecInput = (field: string, label: string, placeholder: string) => {
    const attr = attributes.find(a => a.name.toLowerCase() === label.toLowerCase());
    
    if (attr && attr.options && attr.options.length > 0) {
      return (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
          <select 
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            value={(formData.specifications as any)[field] || ''}
            onChange={(e) => handleSpecChange(field, e.target.value)}
          >
            <option value="">Select {label}</option>
            {attr.options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input 
          type="text" placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          value={(formData.specifications as any)[field] || ''}
          onChange={(e) => handleSpecChange(field, e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">
          {initialData ? 'Edit Product' : 'Create New Product'}
        </h2>
        <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SKU *</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.slug}
                placeholder="Leave blank to auto-generate"
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <select 
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">MOQ</label>
              <input 
                type="number" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.moq}
                onChange={(e) => setFormData({...formData, moq: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Product Images</h3>
          
          <div className="flex flex-wrap gap-4 mb-4">
            {formData.images.map((img: string, i: number) => (
              <div key={i} className="relative w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                <Image src={img} alt="" width={96} height={96} className="object-contain" />
                <button 
                  type="button" 
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
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
          </div>
          <p className="text-xs text-gray-400">Upload product images. Recommended size: 800x800px. WebP, PNG, or JPG.</p>
        </div>

        {/* Specifications */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderSpecInput('overFlowVolume', 'Over Flow Volume', 'e.g. 560 +/- 20 ML')}
            {renderSpecInput('heightOfContainer', 'Height Of Container', 'e.g. 114 +/- 1 MM')}
            {renderSpecInput('neckSize', 'Neck Size', 'e.g. 84 +/- 0.5 MM')}
            {renderSpecInput('maximumDiaOfContainer', 'Maximum Dia Of Container', 'e.g. 82 +/- 0.5 MM')}
            {renderSpecInput('wallThickness', 'Wall Thickness', 'e.g. 0.8 +/- 0.1 MM')}
            {renderSpecInput('capFitting', 'Cap Fitting', 'e.g. Push fitting')}
            {renderSpecInput('labelType', 'Label Type', 'e.g. Label & IML')}
            {renderSpecInput('weightOfContainer', 'Weight Of Container (With Cap)', 'e.g. 38 +/- 2 GM')}
            {renderSpecInput('powderVolume', 'Powder Volume (Approx)', 'e.g. 200 To 250 GM')}
            {renderSpecInput('material', 'Material', 'e.g. Food-grade PP plastic')}
          </div>
        </div>

        {/* Descriptions */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Descriptions</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Short Description (Optional)</label>
              <textarea 
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.shortDescription}
                onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Description</label>
              <textarea 
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
