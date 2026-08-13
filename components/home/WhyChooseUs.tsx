'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck, Droplets, Sparkles, Cog, Wind, Truck, Palette, Package,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { staggerContainer, staggerItem, iconRotate } from '@/lib/animations';

const features = [
  { icon: ShieldCheck, title: 'Food Grade', description: '100% virgin FDA-compliant food-grade polymers for safety' },
  { icon: Droplets, title: 'Leak Proof', description: 'Precision-threaded necks for airtight, leak-proof sealing' },
  { icon: Sparkles, title: 'Premium Finish', description: 'Crystal-clear finishes with UV protection coatings' },
  { icon: Cog, title: 'Injection Moulding', description: 'State-of-the-art IBM technology for zero-defect production' },
  { icon: Wind, title: 'Blow Moulding', description: 'Advanced EBM for uniform wall thickness and strength' },
  { icon: Truck, title: 'Fast Delivery', description: 'Pan-India logistics covering 20+ states in 7-15 days' },
  { icon: Palette, title: 'Custom Design', description: 'Tailored colors, embossing, labeling, and custom shapes' },
  { icon: Package, title: 'Bulk Orders', description: 'Scalable production from 500 to 1M+ pieces per order' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/[0.03] to-transparent rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          badge="Why Choose Us"
          title="Built for Precision, Designed for Trust"
          subtitle="Every product is engineered with uncompromising quality, cutting-edge technology, and decades of pharmaceutical packaging expertise."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover="hover"
              initial="rest"
              className="group"
            >
              <div className="relative p-3 sm:p-6 rounded-2xl bg-light border border-gray-100 hover:border-primary/[0.15] hover:shadow-premium transition-all duration-500 h-full flex flex-col items-center sm:items-start text-center sm:text-left">
                {/* Icon */}
                <motion.div
                  variants={iconRotate}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-2 sm:mb-4 group-hover:from-primary/[0.15] group-hover:to-secondary/[0.15] transition-all duration-500 shrink-0"
                >
                  <feature.icon size={20} className="text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xs sm:text-base font-semibold text-dark mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-gray-400 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
