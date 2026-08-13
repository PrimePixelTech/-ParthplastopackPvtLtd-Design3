'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PixelReveal from '@/components/ui/PixelReveal';
import {
  Download, Send, ChevronRight, Check, Package, Ruler, Weight,
  Palette, Layers, Star, Share2,
} from 'lucide-react';
import QuoteModal from '@/components/shared/QuoteModal';
import ProductCard from '@/components/products/ProductCard';

interface ProductDetailClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const images = product.gallery || ['/images/products/placeholder.webp'];

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <div className="section-container">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-gray-400 mb-8"
      >
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        <ChevronRight size={14} />
        <span className="text-dark font-medium truncate">{product.name}</span>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          {/* Main Image */}
          <div className="relative bg-gradient-to-b from-[#F9FAFB] to-white rounded-[2rem] border border-white shadow-[0_20px_60px_rgb(0,0,0,0.05)] p-4 sm:p-6 overflow-hidden group">
            {/* Soft radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,transparent_70%)] opacity-80" />
            
            <div className="relative aspect-square w-full max-h-[380px] mx-auto flex items-center justify-center z-10">
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="flex items-center justify-center w-full h-full"
              >
                <div className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-700">
                  <PixelReveal
                    imageSrc={images[selectedImage]}
                    transitionColor="#F9FAFB"
                  />
                </div>
              </motion.div>
            </div>

            {/* Badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                {product.badge}
              </span>
            )}

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={handleShare}
                title="Share Product"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-primary/10 flex items-center justify-center transition-colors"
              >
                <Share2 size={16} className="text-gray-400 hover:text-primary" />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden bg-white flex items-center justify-center p-2 transition-all ${
                    selectedImage === i
                      ? 'border-primary shadow-glow-primary'
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt="" width={60} height={60} className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 flex flex-col h-full"
        >
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary mb-1 inline-block">
              {product.categoryLabel}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium font-display text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Premium Specifications */}
          <div className="mt-3 flex-1 flex flex-col justify-center">
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
              Specifications
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {product.material && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Layers size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Material</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.material}</span>
                  </div>
                </div>
              )}
              {product.overFlowVolume && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Package size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">O.F. Volume</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.overFlowVolume}</span>
                  </div>
                </div>
              )}
              {product.heightOfContainer && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Ruler size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Height</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.heightOfContainer}</span>
                  </div>
                </div>
              )}
              {product.neckSize && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Ruler size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Neck Size</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.neckSize}</span>
                  </div>
                </div>
              )}
              {product.maximumDiaOfContainer && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Ruler size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Max Dia</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.maximumDiaOfContainer}</span>
                  </div>
                </div>
              )}
              {product.wallThickness && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Layers size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Wall Thick.</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.wallThickness}</span>
                  </div>
                </div>
              )}
              {product.capFitting && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Palette size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Cap Fitting</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.capFitting}</span>
                  </div>
                </div>
              )}
              {product.labelType && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Palette size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Label Type</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.labelType}</span>
                  </div>
                </div>
              )}
              {product.weightOfContainer && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Weight size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Weight</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.weightOfContainer}</span>
                  </div>
                </div>
              )}
              {product.powderVolume && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-[#3b82f6]">
                    <Package size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">Powder Vol.</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.powderVolume}</span>
                  </div>
                </div>
              )}
              {product.moq && (
                <div className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all">
                  <div className="text-sky-500">
                    <Package size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col overflow-hidden leading-tight">
                    <span className="text-[9px] text-slate-400 font-medium truncate uppercase tracking-wider">MOQ</span>
                    <span className="text-[11px] font-bold text-slate-700 truncate">{product.moq}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsQuoteOpen(true)}
              className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white py-3 px-2 sm:px-6 rounded-xl text-[10px] sm:text-xs font-bold w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <Send size={14} className="relative z-10 shrink-0" />
              <span className="relative z-10 tracking-wide uppercase truncate">Request Quote</span>
            </motion.button>
            <a
              href="#"
              className="py-3 px-2 sm:px-6 rounded-xl border-2 border-slate-200 text-[10px] sm:text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-all w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide uppercase group"
            >
              <Download size={14} className="shrink-0 text-slate-400 group-hover:text-primary transition-colors" />
              <span className="truncate">Catalog</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold font-display text-dark mb-8">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((rp, i) => (
              <ProductCard key={rp.id} product={rp} index={i} />
            ))}
          </div>
        </div>
      )}

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} productName={product.name} />
    </div>
  );
}
