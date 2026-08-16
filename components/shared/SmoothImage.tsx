'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';
import { normalizeImageUrl, DEFAULT_FALLBACK_IMAGE } from '@/lib/image-url';

interface SmoothImageProps extends Omit<ImageProps, 'src'> {
  src: string | any;
  wrapperClassName?: string;
  fallbackSrc?: string;
}

export default function SmoothImage({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  unoptimized,
  ...props
}: SmoothImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const normalizedInitial = typeof src === 'string' ? normalizeImageUrl(src, fallbackSrc) : src;
  const [imgSrc, setImgSrc] = useState<any>(normalizedInitial || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    const nextNormalized = typeof src === 'string' ? normalizeImageUrl(src, fallbackSrc) : src;
    setImgSrc(nextNormalized || fallbackSrc);
    setHasError(false);
    setUsedFallback(false);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

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
          'transition-opacity duration-200 ease-out opacity-100'
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[SmoothImage] Failed to load image: ${activeSrc}. Falling back to: ${fallbackSrc}`);
          }
          if (!usedFallback && fallbackSrc && activeSrc !== fallbackSrc) {
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
