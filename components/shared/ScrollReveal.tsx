'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'zoomIn';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -80, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  slideRight: {
    hidden: { opacity: 0, x: 80, filter: 'blur(8px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.5, filter: 'blur(15px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
