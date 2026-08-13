'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/lib/animations';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeUp}
      className={cn(
        'mb-14 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            'badge-primary mb-4 inline-block',
            light && 'bg-white text-white/90'
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight mt-2',
          light ? 'text-white' : 'text-dark'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base md:text-lg max-w-2xl leading-relaxed',
            align === 'center' && 'mx-auto',
            light ? 'text-white/60' : 'text-gray-500'
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
