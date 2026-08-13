import React, { useState, useEffect } from 'react';
import logoImg from '../../public_html/assets/images/PPPLOGO.webp';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const [destroyed, setDestroyed] = useState(false);

  useEffect(() => {
    // Increment preloader progress bar simulating load sequences
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          return 100;
        }
        const step = Math.random() * 25 + 15;
        return Math.min(old + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Trigger fade out opacity
      const fadeTimer = setTimeout(() => {
        setFade(true);
      }, 400);

      // Unmount from DOM
      const destroyTimer = setTimeout(() => {
        setDestroyed(true);
      }, 900);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(destroyTimer);
      };
    }
  }, [progress]);

  if (destroyed) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#F8F9FA] z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ease-out select-none ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        
        {/* 3D Spinning Ring Ring around Logo */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          {/* Inner grey ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-gray-200"></div>
          {/* Outer cobalt blue spinner */}
          <div className="absolute inset-0 rounded-full border-[3px] border-t-[#744397] border-r-[#744397] animate-spin"></div>
          {/* Logo center image with soft pulsing */}
          <img src={logoImg} alt="Parth Plasto Pack" className="w-14 h-14 object-contain animate-pulse" />
        </div>

        {/* Text Description */}
        <h2 className="text-xs md:text-sm font-bold tracking-widest text-[#212529] uppercase mb-1">
          Parth Plastopack
        </h2>
        <span className="text-[8px] md:text-[9px] text-gray-400 font-bold tracking-widest uppercase mb-6 leading-none">
          Manufacturing Precision Packaging
        </span>

        {/* Horizontal Progress Track */}
        <div className="w-full h-1 bg-gray-250 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#744397] rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loaded percentage */}
        <span className="text-[10px] text-gray-400 font-bold mt-2">
          {Math.round(progress)}% Loaded
        </span>
      </div>
    </div>
  );
}
