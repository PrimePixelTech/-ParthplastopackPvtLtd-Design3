'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, Download } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '30px 30px',
      }} />

      {/* Decorative blobs */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-[80px]" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wider uppercase backdrop-blur-sm mb-6 border border-white/30 shadow-sm">
            Ready to Scale Your Packaging?
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Let&apos;s Build Your Custom Packaging Solution Today
          </h2>

          <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Get competitive pricing, free samples, and expert consultation for your pharmaceutical and nutraceutical packaging needs.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm group"
            >
              Get a Free Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white hover:text-primary backdrop-blur-sm transition-all duration-300 text-sm group"
            >
              <Phone size={16} className="group-hover:text-primary transition-colors" />
              Call Now
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-white/80 hover:text-white font-medium transition-colors duration-300 text-sm"
            >
              <Download size={16} />
              Download Catalog
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
