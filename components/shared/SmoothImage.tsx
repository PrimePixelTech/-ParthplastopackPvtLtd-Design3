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

  // Render a clean, standard <img> element for ALL images (both local and external).
  // This completely prevents Next.js <Image>'s color:transparent, wrapper element,
  // and flexbox 0-height collapse bugs on iOS Safari / WebKit inside Framer Motion containers.
  return (
    <div
      className={cn('relative flex items-center justify-center w-full h-full min-h-0 min-w-0', wrapperClassName)}
      style={{
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activeSrc}
        alt={alt || 'Product Image'}
        width={width || 200}
        height={height || 200}
        className={imageClasses}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        loading="eager"
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
          aspectRatio: width && height ? `${width}/${height}` : '1/1',
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          opacity: 1,
          visibility: 'visible',
        }}
      />
    </div>
  );
}
