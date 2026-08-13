'use client';

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import SmoothImage from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { imageZoom } from '@/lib/animations';

interface ProductCardProps {
  product: any;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const router = useRouter();
  
  // Holographic glare state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const glareBackground = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.2), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/products/${product.slug}`)}
      onMouseMove={handleMouseMove}
      className="group cursor-pointer h-full"
    >
      <div className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-white/70 backdrop-blur-lg border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.1)] transition-all duration-500">
        
        {/* Holographic Cursor Glare */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glareBackground }}
        />

        {/* Subtle gold/navy gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none z-20" />

        {/* Stage Lighting / Image Area */}
        <div className="relative h-48 md:h-64 bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] flex items-center justify-center p-6 overflow-hidden">
          {/* Radial soft glow behind product */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] opacity-80" />
          
          <motion.div variants={imageZoom} className="relative w-full h-full flex items-center justify-center z-10">
            <SmoothImage
              src={product.image}
              alt={product.name}
              width={240}
              height={240}
              className="object-contain w-full h-full max-h-[140px] md:max-h-[180px] drop-shadow-xl transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
            />
          </motion.div>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 z-20 max-w-[calc(100%-32px)] truncate px-3 py-1 bg-gradient-to-r from-primary to-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-md">
              {product.badge}
            </span>
          )}

          {/* Category label */}
          <span className="absolute bottom-4 left-4 z-20 max-w-[calc(100%-32px)] truncate text-[10px] font-medium text-gray-500 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-gray-100">
            {product.categoryLabel}
          </span>
        </div>

        {/* Content Area */}
        <div className="p-5 md:p-6 flex flex-col flex-grow bg-white/40">
          <h3 className="text-sm md:text-base font-bold text-dark group-hover:text-primary transition-colors line-clamp-2 mb-4 font-display leading-snug">
            {product.name}
          </h3>

          <div className="space-y-2 flex-grow">
            <div className="flex items-center text-xs">
              <span className="w-16 text-gray-400 font-medium">Material</span>
              <span className="text-gray-700 font-medium truncate">{product.material.split('(')[0].trim()}</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-16 text-gray-400 font-medium">Volume</span>
              <span className="text-gray-700 font-medium truncate">{product.overFlowVolume || product.capacity || 'N/A'}</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-16 text-gray-400 font-medium">Cap</span>
              <span className="text-gray-700 font-medium truncate">{product.capFitting || product.color || 'N/A'}</span>
            </div>
          </div>

          <div className="mt-auto pt-5 flex gap-2">
            <div className="flex-[3] bg-gradient-to-r from-primary to-blue-600 text-white py-2 md:py-2.5 text-[10px] md:text-xs font-semibold rounded-xl flex items-center justify-center group/btn shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all">
              <span className="whitespace-nowrap">Details</span>
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform ml-1 shrink-0 md:w-3.5 md:h-3.5" />
            </div>
            <Link
              href="/contact"
              onClick={(e) => e.stopPropagation()}
              className="flex-[2] py-2 md:py-2.5 rounded-xl border border-gray-200 text-[10px] md:text-xs font-semibold text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center whitespace-nowrap"
            >
              Quote
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
