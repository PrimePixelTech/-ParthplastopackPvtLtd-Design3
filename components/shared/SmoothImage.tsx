'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';

interface SmoothImageProps extends ImageProps {
  wrapperClassName?: string;
  fallbackSrc?: string;
}

export default function SmoothImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = '/images/products/jar1.webp',
  unoptimized = true,
  ...props
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setUsedFallback(false);
    setIsLoaded(false);
  }, [src]);

  // If no source at all, try fallback or show placeholder
  const activeSrc = imgSrc || fallbackSrc;

  if (hasError || !activeSrc) {
    return (
      <div className={cn('relative flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4 rounded-xl border border-gray-100', wrapperClassName)}>
        <Package className="w-10 h-10 text-gray-300 mb-1" strokeWidth={1.5} />
        <span className="text-[10px] text-gray-400 font-medium text-center truncate max-w-full px-2">
          {alt || 'Parth Plasto Pack'}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative flex items-center justify-center', wrapperClassName)}>
      <Image
        src={activeSrc}
        alt={alt || 'Product Image'}
        unoptimized={unoptimized}
        className={cn(
          className,
          'transition-opacity duration-300 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-80'
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!usedFallback && fallbackSrc && imgSrc !== fallbackSrc) {
            setUsedFallback(true);
            setImgSrc(fallbackSrc);
          } else {
            setHasError(true);
          }
          setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
}
