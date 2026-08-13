'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AdminLoaderProps {
  text?: string;
}

export default function AdminLoader({ text = 'Loading...' }: AdminLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-6"
      >
        {/* Pulsing Background Glow */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-4 bg-gradient-to-tr from-red-600/[0.1] to-yellow-500/[0.1] rounded-2xl blur-xl" 
        />
        
        {/* Floating Logo */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/PPPLOGO.webp"
            alt="Parth Plasto Pack"
            width={160}
            height={46}
            className="relative object-contain drop-shadow-sm"
            priority
          />
        </motion.div>
      </motion.div>
      
      {/* Loading Progress Bar effect */}
      <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden mb-3 relative">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-red-600 to-transparent absolute"
        />
      </div>

      <motion.p
        className="text-xs font-semibold text-slate-500 tracking-[0.15em] uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}
