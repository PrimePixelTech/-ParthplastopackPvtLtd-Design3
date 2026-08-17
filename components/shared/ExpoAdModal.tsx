'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function ExpoAdModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      if (typeof window !== 'undefined') {
        const hasSeenModal = sessionStorage.getItem('expoModalSeen');
        if (!hasSeenModal) {
          const timer = setTimeout(() => {
            setIsOpen(true);
            try {
              sessionStorage.setItem('expoModalSeen', 'true');
            } catch {
              // ignore storage errors
            }
          }, 2000);
          return () => clearTimeout(timer);
        }
      }
    } catch {
      // Storage unavailable / private mode
    }
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md transition-colors backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Image Container */}
            <div className="relative w-full aspect-[668/1024] max-h-[85vh] bg-gray-50 flex items-center justify-center">
              <Image
                src="/images/expo-invitation.jpg"
                alt="Expo Invitation - Parth Plasto Pack Pvt. Ltd."
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
