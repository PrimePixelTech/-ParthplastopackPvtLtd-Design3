'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative inline-block mb-8"
        >
          {/* Animated 404 Text */}
          <h1 className="text-[150px] md:text-[200px] font-black text-slate-200 leading-none tracking-tighter select-none">
            404
          </h1>
          
          {/* Animated Floating Element over the 404 */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center gap-4">
              <Search className="w-12 h-12 text-primary" strokeWidth={3} />
              <div className="text-left">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Status</p>
                <p className="text-xl font-black text-slate-800">Missing in Action</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Oops! Like a jar missing its cap.
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
            We searched every warehouse and production line, but we couldn't find the page you're looking for. It might have been moved, deleted, or never existed!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="btn-secondary py-3 px-6 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
            <Link 
              href="/" 
              className="btn-primary bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-xl w-full sm:w-auto flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Home size={18} />
              Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative floating caps/bottles in background */}
      <motion.div 
        className="absolute top-[20%] right-[15%] opacity-20 hidden md:block"
        animate={{ y: [0, 20, 0], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>
      </motion.div>
    </div>
  );
}
