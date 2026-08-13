'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface SmoothImageProps extends ImageProps {
  wrapperClassName?: string;
}

export default function SmoothImage({ src, alt, className, wrapperClassName, ...props }: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative flex items-center justify-center", wrapperClassName)}>
      {/* Shimmer Effect while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200/40 animate-pulse rounded-inherit z-0" />
      )}
      
      <Image
        src={src}
        alt={alt}
        className={cn(
          className,
          "transition-all duration-700 ease-out z-10",
          isLoaded ? "blur-0" : "blur-sm" // Removed opacity-0 to guarantee image visibility
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
