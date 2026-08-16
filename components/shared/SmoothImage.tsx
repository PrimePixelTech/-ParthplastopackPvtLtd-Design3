'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';
import { normalizeImageUrl, isExternalUrl, DEFAULT_FALLBACK_IMAGE } from '@/lib/image-url';

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
  priority,
  width,
  height,
  fill,
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

  // Error placeholder — shown when both primary and fallback images fail
  if (hasError || !activeSrc) {
    return (
      <div className={cn('relative flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-4 rounded-xl border border-gray-100', wrapperClassName)}
           style={{ minHeight: '80px' }}>
        <Package className="w-10 h-10 text-gray-300 mb-1" strokeWidth={1.5} />
        <span className="text-[10px] text-gray-400 font-medium text-center truncate max-w-full px-2">
          {alt || 'Parth Plasto Pack'}
        </span>
      </div>
    );
  }

  const handleError = () => {
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
  };

  const imageClasses = cn(
    className,
    'transition-opacity duration-200 ease-out opacity-100'
  );

  // For EXTERNAL URLs (Cloudinary, etc.): use a plain <img> tag.
  // This avoids the next/image <span> wrapper + overflow:hidden sizing
  // that causes iOS Safari to render a 0-height blank white box inside
  // Framer Motion animated containers.
  if (typeof activeSrc === 'string' && isExternalUrl(activeSrc)) {
    return (
      <div className={cn('relative flex items-center justify-center', wrapperClassName)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeSrc}
          alt={alt || 'Product Image'}
          className={imageClasses}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    );
  }

  // For LOCAL paths (/images/...): use next/image for optimization
  return (
    <div className={cn('relative flex items-center justify-center', wrapperClassName)}>
      <Image
        src={activeSrc}
        alt={alt || 'Product Image'}
        unoptimized={unoptimized}
        priority={priority}
        width={width}
        height={height}
        fill={fill}
        className={imageClasses}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
