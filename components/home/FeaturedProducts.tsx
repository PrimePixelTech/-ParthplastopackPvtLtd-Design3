'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SmoothImage from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem, imageZoom } from '@/lib/animations';
import { getProducts } from '@/actions/product.actions';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const productData = await getProducts();
        const activeProducts = productData.filter((p: any) => p.status === 'ACTIVE');
        
        const mappedProducts = activeProducts.map((p: any) => ({
          id: p._id,
          name: p.name,
          slug: p.slug,
          categoryLabel: p.category?.title || 'Other',
          image: p.images?.[0] || '/images/products/placeholder.webp',
          badge: p.isFeatured ? 'Featured' : p.isTrending ? 'Trending' : '',
          material: p.specifications?.material || 'N/A',
          overFlowVolume: p.specifications?.overFlowVolume || 'N/A',
          capFitting: p.specifications?.capFitting || 'N/A',
        }));

        let featured = mappedProducts.filter(p => p.badge);
        if (featured.length === 0) {
          featured = mappedProducts.slice(0, 4);
        } else {
          featured = featured.slice(0, 4);
        }

        setFeaturedProducts(featured);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="badge-primary mb-3 inline-block">Featured Products</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-dark">
              Premium Packaging
            </h2>
            <p className="mt-3 text-gray-500 text-base md:text-lg max-w-lg">
              Explore our most popular pharmaceutical and nutraceutical packaging solutions.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700 transition-colors group"
          >
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading featured products...</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 min-[1920px]:grid-cols-6 gap-3 md:gap-6"
          >
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="btn-secondary py-3 px-6 text-sm">
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
