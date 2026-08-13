'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function InfiniteMarquee({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className,
}: InfiniteMarqueeProps) {
  const speedClasses = {
    slow: 'duration-[60s]',
    normal: 'duration-[40s]',
    fast: 'duration-[25s]',
  };

  const directionClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div
      className={cn(
        'marquee-container overflow-hidden mask-fade-r',
        pauseOnHover && '[&:hover_.marquee-content]:![animation-play-state:paused]',
        className
      )}
    >
      <div
        className={cn(
          'marquee-content flex items-center gap-8 w-max',
          directionClass,
          speedClasses[speed]
        )}
        style={{
          animationPlayState: 'running',
        }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>
    </div>
  );
}
