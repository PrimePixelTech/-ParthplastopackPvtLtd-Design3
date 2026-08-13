'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Award, Leaf, Wrench, Globe } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { staggerContainer, staggerItem } from '@/lib/animations';

const features = [
  { icon: Shield, title: 'ISO Certified', description: 'ISO 15378 certified manufacturing with GMP compliance' },
  { icon: Award, title: 'Food Grade', description: '100% virgin food-grade FDA compliant polymers' },
  { icon: Wrench, title: 'Custom Moulding', description: 'Tailored packaging solutions with rapid prototyping' },
  { icon: Globe, title: 'Export Quality', description: 'Meeting international packaging standards globally' },
  { icon: Leaf, title: 'Eco Conscious', description: 'Recyclable materials and sustainable practices' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[80px] pointer-events-none" />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <ScrollReveal variant="slideLeft">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-premium-lg">
                <Image
                  src="/images/products.webp"
                  alt="Parth Plasto Pack Manufacturing Facility"
                  width={640}
                  height={480}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 glass-strong rounded-2xl p-4 md:p-5 shadow-premium-lg"
              >
                <div className="text-3xl md:text-4xl font-bold font-display text-gradient">25+</div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">Years of Excellence</div>
              </motion.div>

              {/* Decorative border */}
              <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-primary/10 rounded-3xl -z-10" />
            </div>
          </ScrollReveal>

          {/* Right — Content */}
          <ScrollReveal variant="slideRight">
            <div>
              <span className="badge-primary mb-4 inline-block">About Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight text-dark leading-tight">
                Trusted Manufacturer of{' '}
                <span className="text-gradient">Premium Packaging</span>
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed text-base md:text-lg">
                Parth Plasto Pack Pvt. Ltd. is a leading manufacturer of high-end plastic packaging
                solutions for the pharmaceutical, nutraceutical, and healthcare industries. With over
                25 years of experience, we combine cutting-edge injection moulding technology with
                uncompromising quality standards.
              </p>
              <p className="mt-4 text-gray-500 leading-relaxed text-base md:text-lg">
                Our state-of-the-art cleanroom facility in Ahmedabad, Gujarat produces over 500+
                packaging products serving 1000+ clients across 20+ states in India and global markets.
              </p>

              {/* Feature Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={staggerContainer}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={staggerItem}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-light border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center shrink-0">
                      <feature.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-dark">{feature.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
