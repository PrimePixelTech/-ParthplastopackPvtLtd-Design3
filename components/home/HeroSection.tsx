'use client';

import { motion } from 'framer-motion';
import SmoothImage from '@/components/shared/SmoothImage';
import Link from 'next/link';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const stats = [
  { end: 25, suffix: '+', label: 'Years Experience' },
  { end: 500, suffix: '+', label: 'Products' },
  { end: 1000, suffix: '+', label: 'Happy Clients' },
  { end: 20, suffix: '+', label: 'States Covered' },
];

const floatingProducts = [
  { src: '/images/products/jar1.webp', alt: 'Protein Jar', className: 'top-[15%] right-[8%] w-24 md:w-32' },
  { src: '/images/products/tube1.webp', alt: 'Effervescent Tube', className: 'bottom-[30%] right-[15%] w-20 md:w-28' },
  { src: '/images/products/Cap.webp', alt: 'Plastic Cap', className: 'top-[30%] left-[5%] w-16 md:w-24' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F9FAFB]">
      {/* Aurora Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 mix-blend-multiply filter blur-[100px] opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-400/20 mix-blend-multiply filter blur-[100px] opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[30%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-indigo-400/20 mix-blend-multiply filter blur-[80px] opacity-60"
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #0B5ED7 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light/80 z-[1]" />

      {/* Floating Products */}
      {floatingProducts.map((product, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:block z-[20] ${product.className}`}
          animate={{ y: [-10, 15, -10] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        >
          <SmoothImage
            src={product.src}
            alt={product.alt}
            width={130}
            height={130}
            className="object-contain drop-shadow-xl opacity-80"
          />
        </motion.div>
      ))}

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/20 hidden md:block"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="section-container relative z-10 py-32 md:py-40 lg:py-44">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="badge-primary text-[10px] md:text-xs">
              ISO 15378 & GMP Certified Cleanroom Facility
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-dark leading-[1.1]"
          >
            Premium Pharma &{' '}
            <span className="text-gradient">Nutraceutical</span>{' '}
            Packaging Solutions
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed"
          >
            High-quality, sterile, and compliant plastic packaging engineered for global pharmaceutical and nutraceutical standards. Trusted by 1000+ brands.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/products" className="btn-primary py-3.5 px-7 text-sm btn-ripple group">
              Explore Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="btn-secondary py-3.5 px-7 text-sm">
              Request Quote
            </Link>
            <a href="tel:+919876543210" className="btn-ghost py-3.5 px-6 text-sm">
              <Play size={16} className="text-primary" />
              Contact Sales
            </a>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 md:mt-24"
        >
          <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                  duration={2.5}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>

      {/* Wave Divider */}
      <div className="wave-divider z-[3]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
