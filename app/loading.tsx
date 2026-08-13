'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Particles / Rings */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-[300px] h-[300px] rounded-full border border-primary/20"
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
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              initial={{ width: "30%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </motion.div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium tracking-[0.2em] uppercase animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
