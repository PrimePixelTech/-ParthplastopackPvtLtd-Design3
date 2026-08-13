'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Phone, MessageCircle, FileText, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Infrastructure', href: '/infrastructure' },
  { name: 'Quality', href: '/quality' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[90] transition-all duration-500',
          isScrolled
            ? 'bg-white/70 backdrop-blur-md border-b border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col select-none shrink-0">
              <Image
                src="/images/PPPLOGO.webp"
                alt="Parth Plasto Pack Logo"
                width={160}
                height={40}
                className={cn(
                  'object-contain transition-all duration-500',
                  isScrolled ? 'h-8' : 'h-9 md:h-10'
                )}
                priority
              />
              <span className="text-[8px] md:text-[9px] text-gray-400 uppercase tracking-[0.15em] font-semibold mt-0.5 leading-none">
                Mfg. of Pharma & Nutraceutical Packaging
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-300 animated-underline"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200/80 flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search size={16} className="text-gray-600" />
              </button>

              {/* Call Button */}
              <a
                href="tel:+919876543210"
                className="hidden md:flex w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 items-center justify-center transition-colors"
                aria-label="Call now"
              >
                <Phone size={16} className="text-primary" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex w-9 h-9 rounded-full bg-green-100 hover:bg-green-200 items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} className="text-green-600" />
              </a>

              {/* Get Quote CTA */}
              <Link
                href="/contact"
                className="hidden sm:flex btn-primary py-2 px-4 text-xs gap-1.5 rounded-xl"
              >
                <FileText size={14} />
                Get Quote
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200/80 flex items-center justify-center transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[85vw] max-w-sm bg-white shadow-premium-xl lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="/images/PPPLOGO.webp"
                    alt="Parth Plasto Pack"
                    width={140}
                    height={35}
                    className="h-8 object-contain"
                  />
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary rounded-xl hover:bg-primary/5 transition-all"
                  >
                    <Phone size={18} className="text-primary" />
                    +91 98765 43210
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-green-600 rounded-xl hover:bg-green-50 transition-all"
                  >
                    <MessageCircle size={18} className="text-green-600" />
                    Chat on WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileOpen(false)}
                    className="btn-primary w-full py-3 text-sm mt-4"
                  >
                    <FileText size={16} />
                    Request a Quote
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-md flex items-start justify-center pt-24"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-premium-xl p-2">
                <div className="flex items-center gap-3 px-4">
                  <Search size={20} className="text-gray-400 shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, categories, materials..."
                    className="w-full py-4 text-lg bg-transparent outline-none placeholder:text-gray-400"
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm font-medium shrink-0"
                  >
                    ESC
                  </button>
                </div>
              </div>
              <div className="mt-3 px-2">
                <p className="text-sm text-white/60">
                  Popular: <span className="text-white/80 cursor-pointer hover:text-white">HDPE Containers</span> · <span className="text-white/80 cursor-pointer hover:text-white">Protein Jars</span> · <span className="text-white/80 cursor-pointer hover:text-white">CRC Caps</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
