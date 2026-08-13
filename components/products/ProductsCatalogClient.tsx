'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import CategoryShowcase from '@/components/products/CategoryShowcase';
import { staggerContainer } from '@/lib/animations';

interface ProductsCatalogClientProps {
  initialProducts: any[];
  categories: any[];
}

export default function ProductsCatalogClient({ initialProducts, categories }: ProductsCatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = initialProducts;
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categoryId === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    
    return result;
  }, [activeCategory, searchQuery, initialProducts]);

  return (
    <div className="section-container">
      {/* Aurora Background for Header */}
      <div className="relative mb-8 px-4 py-8 rounded-3xl overflow-hidden bg-white/30 border border-white/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-50%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-400/20 mix-blend-multiply filter blur-[80px] opacity-70 z-0 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-50%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-purple-400/20 mix-blend-multiply filter blur-[80px] opacity-70 z-0 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[20%] left-[30%] w-[25vw] h-[25vw] rounded-full bg-indigo-400/20 mix-blend-multiply filter blur-[60px] opacity-60 z-0 pointer-events-none"
        />

        {/* Page Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-primary mb-3 inline-block">
            Premium Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-slate-900 tracking-tight leading-tight">
            Our Products
          </h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg max-w-2xl font-light">
            Discover our exclusive range of high-quality pharmaceutical and nutraceutical plastic packaging solutions.
          </p>
        </motion.div>
      </div>

      <CategoryShowcase 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <ProductFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultCount={filteredProducts.length}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 min-[1920px]:grid-cols-5 min-[2560px]:grid-cols-6 gap-3 md:gap-5"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product as any} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center bg-white rounded-2xl border border-gray-100"
            >
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-dark">No products found</h3>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search or category filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-4 btn-secondary py-2 px-4 text-sm"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
