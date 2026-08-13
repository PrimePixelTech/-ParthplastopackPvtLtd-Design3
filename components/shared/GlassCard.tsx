'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function GlassCard({
  children,
  className,
  hover = true,
  padding = 'md',
}: GlassCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'glass-card rounded-2xl',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
