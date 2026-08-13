'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { staggerContainer, staggerItem } from '@/lib/animations';

const galleryImages = [
  { src: '/images/machine1.webp', alt: 'Injection Moulding Machine', category: 'Machinery' },
  { src: '/images/storges.webp', alt: 'Warehouse & Storage', category: 'Warehouse' },
  { src: '/images/advance.webp', alt: 'Advanced Manufacturing', category: 'Manufacturing' },
  { src: '/images/quality.webp', alt: 'Quality Testing Lab', category: 'Quality' },
  { src: '/images/products.jpg', alt: 'Product Range', category: 'Products' },
  { src: '/images/team.webp', alt: 'Our Team', category: 'Team' },
];

export default function FactorySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          badge="Our Infrastructure"
          title="World-Class Manufacturing Facility"
          subtitle="State-of-the-art cleanroom manufacturing with advanced injection and blow moulding machinery."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <div className="relative h-32 sm:h-48 md:h-72">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white backdrop-blur-md flex items-center justify-center mb-1 sm:mb-3">
                    <ZoomIn size={16} className="text-white sm:hidden" />
                    <ZoomIn size={20} className="text-white hidden sm:block" />
                  </div>
                  <span className="text-white font-medium text-[10px] sm:text-sm text-center px-2">{img.alt}</span>
                  <span className="text-white/60 text-[8px] sm:text-xs mt-0.5 sm:mt-1">{img.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium">{galleryImages[lightboxIndex].alt}</p>
                <p className="text-white/50 text-sm">{galleryImages[lightboxIndex].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
