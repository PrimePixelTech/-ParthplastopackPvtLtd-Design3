'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Safe sessionStorage check (guarded against Safari Private Mode SecurityError)
    try {
      if (typeof window !== 'undefined') {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (hasSeenSplash) {
          return; // Already seen in this session — do not show splash
        }
        sessionStorage.setItem('hasSeenSplash', 'true');
      }
    } catch {
      // Storage unavailable / blocked — skip splash to prevent blocking user
      return;
    }

    setIsVisible(true);

    // 2. Hard timeout protection — dismiss after 2500ms max to allow background loading
    const hardTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // 3. Dismiss immediately on any user touch/scroll/keypress
    const dismissEarly = () => setIsVisible(false);
    window.addEventListener('touchstart', dismissEarly, { passive: true, once: true });
    window.addEventListener('scroll', dismissEarly, { passive: true, once: true });

    // 4. Smooth progress counter over 2 seconds
    const duration = 2000;
    const interval = 40;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsVisible(false), 50);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(hardTimeout);
      window.removeEventListener('touchstart', dismissEarly);
      window.removeEventListener('scroll', dismissEarly);
    };
  }, []);

  const text = "Premium Packaging Solutions";

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
          {/* Animated Background Particles / Rings */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-[300px] h-[300px] rounded-full border border-primary/20"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            className="absolute w-[400px] h-[400px] rounded-full border border-primary/10"
          />

          <div className="flex flex-col items-center gap-10 relative z-10">
            {/* Animated Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Pulsing Background Glow */}
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-8 bg-gradient-to-tr from-primary/[0.08] to-accent/[0.08] rounded-[40px] blur-2xl" 
              />
              
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/PPPLOGO.webp"
                  alt="Parth Plasto Pack"
                  width={240}
                  height={70}
                  className="relative object-contain drop-shadow-md"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Loading Progress Section */}
            <div className="flex flex-col items-center gap-4 w-64">
              <div className="flex justify-between w-full px-1 mb-[-4px]">
                <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Loading</span>
                <span className="text-[10px] text-primary font-bold tracking-widest">{progress}%</span>
              </div>
              
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                  className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-full relative overflow-hidden" 
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </motion.div>
              </div>

              {/* Staggered Subtitle Text */}
              <div className="mt-2 flex space-x-1">
                {text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`text-[9px] font-medium tracking-[0.2em] uppercase ${char === " " ? "w-2" : ""} text-gray-500`}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
