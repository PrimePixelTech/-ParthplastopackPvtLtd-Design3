'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SmoothImage from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { staggerContainer, staggerItem, imageZoom, arrowSlide } from '@/lib/animations';
import { getCategories } from '@/actions/category.actions';
import { normalizeImageUrl } from '@/lib/image-url';

const defaultCategoryCards = [
  { title: 'Protein Powder Containers', image: '/images/products/jar1.webp', count: '15+ Variants', href: '/products?category=protein-containers' },
  { title: 'HDPE Containers', image: '/images/products/Large_j_1.webp', count: '20+ Variants', href: '/products?category=hdpe-containers' },
  { title: 'Medicine Jars', image: '/images/products/medium_j_1.webp', count: '12+ Variants', href: '/products?category=medicine-jars' },
  { title: 'Plastic Caps & Closures', image: '/images/products/Cap.webp', count: '10+ Variants', href: '/products?category=plastic-caps' },
  { title: 'PET Bottles', image: '/images/amber_jars.png', count: '8+ Variants', href: '/products?category=pet-bottles' },
  { title: 'Tablet Containers', image: '/images/products/jar5.webp', count: '10+ Variants', href: '/products?category=tablet-containers' },
  { title: 'Effervescent Tubes', image: '/images/products/tube1.webp', count: '6+ Variants', href: '/products?category=tubes' },
  { title: 'Spoons & Funnels', image: '/images/white_jar.png', count: '5+ Variants', href: '/products?category=accessories' },
  { title: 'Child Resistant Caps', image: '/images/caps_closures.png', count: '8+ Variants', href: '/products?category=plastic-caps' },
];

export default function ProductCategories() {
  const [categories, setCategories] = useState<any[]>(defaultCategoryCards);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        if (Array.isArray(data) && data.length > 0) {
          // Debug: log what URLs are coming from MongoDB
          console.log(
            'CATEGORY IMAGE DEBUG:',
            data.map((c: any) => ({
              title: c.title,
              original: c.image,
              normalized: normalizeImageUrl(c.image),
            }))
          );

          const active = data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            const mapped = active.map((c: any) => ({
              title: c.title,
              image: normalizeImageUrl(c.image),
              count: 'Available',
              href: `/products?category=${c.slug || c._id}`,
            }));
            setCategories(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load categories for homepage:', err);
      }
    }
    loadCategories();
  }, []);

  return (
    <section className="section-padding bg-light relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          badge="Product Categories"
          title="Packaging Solutions for Every Need"
          subtitle="Explore our comprehensive range of pharmaceutical and nutraceutical packaging products designed for safety, compliance, and performance."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[1920px]:grid-cols-5 gap-3 md:gap-6">
          {categories.map((category, i) => (
            <div key={category.title + i}>
              <Link href={category.href}>
                <div
                  className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer h-full"
                  style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}
                >
                  {/* Image Area */}
                  <div
                    className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-3 sm:p-5"
                    style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)', isolation: 'isolate' }}
                  >
                    <div className="w-full h-full flex items-center justify-center relative">
                      <SmoothImage
                        src={category.image}
                        alt={category.title}
                        width={200}
                        height={200}
                        priority={true}
                        className="object-contain max-w-full max-h-36 sm:max-h-40 w-auto h-auto transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Count badge */}
                    <span className="absolute top-3 right-3 text-[10px] font-semibold text-gray-400 bg-white backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-100">
                      {category.count}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex items-center justify-between">
                    <h3 className="text-sm md:text-base font-semibold text-dark group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <ArrowRight
                      size={18}
                      className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>

                  {/* Bottom secondary line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
