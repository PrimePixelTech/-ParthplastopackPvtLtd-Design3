'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  categories: any[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export default function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  resultCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-gray-400">
        Showing <span className="font-semibold text-dark">{resultCount}</span> products
      </p>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-semibold text-dark mb-3">Categories</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-1 gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 text-left h-full border',
                activeCategory === cat.id
                  ? 'bg-primary/[0.08] text-primary border-primary/[0.15] shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-dark border-transparent lg:border-transparent bg-gray-50 lg:bg-transparent'
              )}
            >
              <span className="text-base shrink-0 flex items-center justify-center">
                {cat.icon && (cat.icon.startsWith('/') || cat.icon.startsWith('http')) ? (
                  <img src={cat.icon} alt={cat.label} className="w-5 h-5 object-contain" />
                ) : (
                  cat.icon || '📦'
                )}
              </span>
              <span className="flex-1 leading-tight">{cat.label}</span>
              {activeCategory === cat.id && (
                <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
