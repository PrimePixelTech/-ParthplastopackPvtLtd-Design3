'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, RefreshCw, AlertCircle, ArrowLeft, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  folder?: string;
  maxFiles?: number;
  label?: string;
  description?: string;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageUploader({
  value,
  onChange,
  multiple = false,
  folder = 'admin_uploads',
  maxFiles = 10,
  label = 'Images',
  description = 'Supports JPG, PNG, WebP, AVIF up to 10MB',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number | null>(null);

  // Normalize images into an array for easy rendering
  const images: string[] = Array.isArray(value)
    ? value.filter(Boolean)
    : value
    ? [value]
    : [];

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setError(null);
    setSuccessMsg(null);

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
        setError(`Invalid format for ${file.name}. Only JPG, PNG, WebP, and AVIF are allowed.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`File ${file.name} is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max limit is 10MB.`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('folder', folder);

      if (replaceIndexRef.current !== null || !multiple) {
        // Single file upload
        formData.append('file', validFiles[0]);
      } else {
        // Multi file upload
        validFiles.forEach((file) => {
          formData.append('files', file);
        });
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to upload image(s).');
      }

      if (replaceIndexRef.current !== null) {
        // Replacing a specific image
        const targetIdx = replaceIndexRef.current;
        replaceIndexRef.current = null;
        const newImages = [...images];
        newImages[targetIdx] = data.url;
        onChange(multiple ? newImages : data.url);
        setSuccessMsg('Image replaced successfully.');
      } else if (multiple) {
        // Appending to multiple images
        const uploadedUrls: string[] = data.urls || [data.url];
        const combined = [...images, ...uploadedUrls].slice(0, maxFiles);
        onChange(combined);
        setSuccessMsg(`Uploaded ${uploadedUrls.length} image(s) successfully.`);
      } else {
        // Single image update
        onChange(data.url);
        setSuccessMsg('Image uploaded successfully.');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error during upload.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [images, multiple]
  );

  const removeImage = (indexToRemove: number) => {
    if (multiple) {
      const filtered = images.filter((_, idx) => idx !== indexToRemove);
      onChange(filtered);
    } else {
      onChange('');
    }
    setSuccessMsg(null);
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    if (!multiple) return;
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    onChange(newImages);
  };

  const triggerReplace = (index: number) => {
    replaceIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const triggerNewUpload = () => {
    replaceIndexRef.current = null;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        {multiple && images.length > 0 && (
          <span className="text-xs text-slate-400">
            {images.length} / {maxFiles} images
          </span>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2 border border-red-100">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
            <X size={14} />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(',')}
        multiple={multiple && replaceIndexRef.current === null}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
        }}
        disabled={uploading}
      />

      {/* Grid of uploaded images + Drop zone */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className="group relative aspect-square rounded-xl border border-gray-200 bg-gray-50 overflow-hidden shadow-sm flex items-center justify-center"
          >
            <Image
              src={imgUrl}
              alt={`Uploaded ${idx + 1}`}
              fill
              unoptimized
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Badge for main image */}
            {idx === 0 && multiple && (
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded-md uppercase tracking-wider shadow-sm">
                Main
              </span>
            )}

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2 z-20">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setPreviewModalUrl(imgUrl)}
                  className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg transition"
                  title="View Preview"
                >
                  <Eye size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  title="Remove Image"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-1">
                {multiple && (
                  <div className="flex gap-1">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 'left')}
                        className="p-1 bg-white/20 hover:bg-white/40 text-white rounded"
                        title="Move Left"
                      >
                        <ArrowLeft size={12} />
                      </button>
                    )}
                    {idx < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 'right')}
                        className="p-1 bg-white/20 hover:bg-white/40 text-white rounded"
                        title="Move Right"
                      >
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => triggerReplace(idx)}
                  className="ml-auto px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-medium flex items-center gap-1 transition"
                  title="Replace Image"
                >
                  <RefreshCw size={10} /> Replace
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Upload Trigger / Dropzone tile */}
        {(!images.length || (multiple && images.length < maxFiles)) && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerNewUpload}
            className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 p-4 text-center ${
              dragOver
                ? 'border-blue-500 bg-blue-50/50 text-blue-600 scale-[0.99]'
                : 'border-gray-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/20 text-slate-500'
            } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-7 w-7 border-2 border-blue-600 border-t-transparent" />
                <span className="text-[11px] font-medium text-blue-600">Uploading to Cloud...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-blue-100/60 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Upload size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  {images.length > 0 ? 'Add More' : 'Click or Drag'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WebP</span>
              </>
            )}
          </div>
        )}
      </div>

      <p className="text-[11px] text-slate-400">{description}</p>

      {/* Lightbox Preview Modal */}
      {previewModalUrl && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewModalUrl(null)}
        >
          <div
            className="relative max-w-3xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewModalUrl(null)}
              className="absolute -top-10 right-0 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition"
            >
              <X size={20} />
            </button>
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center bg-white/5 rounded-2xl overflow-hidden p-4">
              <Image
                src={previewModalUrl}
                alt="Enlarged Preview"
                width={800}
                height={800}
                unoptimized
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
