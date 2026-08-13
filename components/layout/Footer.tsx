'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, MessageCircle, ArrowUpRight,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  Send, ChevronRight,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Infrastructure', href: '/infrastructure' },
  { name: 'Quality', href: '/quality' },
  { name: 'Contact', href: '/contact' },
];

const productLinks = [
  { name: 'Protein Powder Containers', href: '/products?category=protein-containers' },
  { name: 'HDPE Containers', href: '/products?category=hdpe-containers' },
  { name: 'Medicine Jars', href: '/products?category=medicine-jars' },
  { name: 'Plastic Caps & Closures', href: '/products?category=plastic-caps' },
  { name: 'PET Bottles', href: '/products?category=pet-bottles' },
  { name: 'Effervescent Tubes', href: '/products?category=tubes' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0F172A] text-gray-400 overflow-hidden">
      {/* Gradient border top */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Main Footer */}
      <div className="section-container py-16 md:py-20 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {/* Column 1: Company */}
          <motion.div variants={staggerItem} className="lg:col-span-1">
            <Image
              src="/images/PPPLOGO.webp"
              alt="Parth Plasto Pack"
              width={160}
              height={40}
              className="h-9 object-contain brightness-0 invert opacity-90 mb-4"
            />
            <p className="text-sm leading-relaxed text-gray-500 mb-6">
              Dedicated manufacturers of premium plastic packaging for global pharmaceutical, healthcare, and nutraceutical brands. 25+ years of industrial excellence.
            </p>
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="leading-relaxed">
                  11, Swagat Ind. Park-2, Indore - Ahmedabad Highway, Nr. Bhavda Patiya, Kuha, Ahmedabad, Gujarat, India.
                </p>
                <a
                  href="https://maps.google.com/?q=11,+Swagat+Ind.+Park-2,+Kuha,+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary-300 font-medium text-xs mt-2 transition-colors"
                >
                  View on Maps <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="text-primary/50 group-hover:text-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Products */}
          <motion.div variants={staggerItem}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Our Products
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="text-primary/50 group-hover:text-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Newsletter */}
          <motion.div variants={staggerItem}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Get In Touch
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:sales@parthplastopack.com"
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors group"
              >
                <Mail size={16} className="text-primary group-hover:text-primary-300 transition-colors shrink-0" />
                sales@parthplastopack.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors group"
              >
                <Phone size={16} className="text-primary group-hover:text-primary-300 transition-colors shrink-0" />
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-400 transition-colors group"
              >
                <MessageCircle size={16} className="text-green-500 group-hover:text-green-400 transition-colors shrink-0" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Newsletter */}
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
              Newsletter
            </h4>
            <p className="text-xs text-gray-500 mb-3">Stay updated with our latest products.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 bg-white border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
              <button className="px-3 py-2 bg-primary hover:bg-primary-600 rounded-lg transition-colors">
                <Send size={16} className="text-white" />
              </button>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Parth Plasto Pack Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <Link href="#" className="hover:text-gray-400 transition-colors">Terms & Conditions</Link>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>Made with precision in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
