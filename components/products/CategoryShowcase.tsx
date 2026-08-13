'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface CategoryShowcaseProps {
  categories: any[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export default function CategoryShowcase({ categories, activeCategory, onCategoryChange }: CategoryShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const displayCategories = categories.filter(c => c.id !== 'all');

  return (
    <div className="w-full mb-12 overflow-hidden relative">
      <div 
        ref={containerRef}
        className="flex overflow-x-auto py-6 gap-6 md:gap-10 px-4 snap-x"
        style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {/* All Products */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.3 }}
            onClick={() => onCategoryChange('all')}
            className="flex flex-col items-center gap-3 cursor-pointer group min-w-[80px] md:min-w-[100px] snap-center"
        >
            <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-full transition-all duration-300 ${
                  activeCategory === 'all' 
                    ? 'p-[2px] shadow-[0_0_20px_rgba(99,102,241,0.5)]' 
                    : 'bg-gray-200 p-[1px] hover:bg-gray-300'
                }`}
            >
                {activeCategory === 'all' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500"
                  />
                )}
                <div className={`w-[72px] h-[72px] md:w-[90px] md:h-[90px] rounded-full bg-white flex items-center justify-center overflow-hidden relative z-10 ${
                  activeCategory === 'all' ? 'border-[3px] border-white' : ''
                }`}>
                    <motion.span 
                      animate={activeCategory === 'all' ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110 block"
                    >
                      📦
                    </motion.span>
                </div>
            </motion.div>
            
            <span className={`text-[10px] md:text-xs text-center font-medium transition-all duration-300 max-w-[120px] leading-tight ${
              activeCategory === 'all' ? 'text-blue-600 font-bold' : 'text-slate-600 group-hover:text-slate-800'
            }`}>
                All Products
            </span>
        </motion.div>

        {/* Dynamic Categories */}
        {displayCategories.map((category, index) => {
          const isActive = activeCategory === category.id;
          const isImage = category.icon && (category.icon.startsWith('/') || category.icon.startsWith('http'));
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.05, duration: 0.3 }}
              onClick={() => onCategoryChange(category.id)}
              className="flex flex-col items-center gap-3 cursor-pointer group min-w-[80px] md:min-w-[100px] snap-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'p-[2px] shadow-[0_0_20px_rgba(99,102,241,0.5)]' 
                    : 'bg-gray-200 p-[1px] hover:bg-gray-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500"
                  />
                )}
                <div className={`w-[72px] h-[72px] md:w-[90px] md:h-[90px] rounded-full bg-white flex items-center justify-center overflow-hidden relative z-10 ${
                  isActive ? 'border-[3px] border-white' : ''
                }`}>
                  {isImage ? (
                    <motion.div 
                      animate={isActive ? { scale: [1, 1.05, 1], y: [-2, 2, -2] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-full h-full p-2 md:p-3"
                    >
                      <Image
                        src={category.icon}
                        alt={category.label}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110 p-1 md:p-2"
                      />
                    </motion.div>
                  ) : (
                    <motion.span 
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110 block"
                    >
                      {category.icon}
                    </motion.span>
                  )}
                </div>
              </motion.div>
              
              <span className={`text-[10px] md:text-xs text-center font-medium transition-all duration-300 max-w-[120px] leading-tight ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-600 group-hover:text-slate-800'
              }`}>
                {category.label.toUpperCase()}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
