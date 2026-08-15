'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

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

  return (
    <div className={cn('relative flex items-center justify-center', wrapperClassName)}>
      <Image
        src={imgSrc || fallbackSrc}
        alt={alt || 'Product Image'}
        unoptimized={unoptimized}
        className={cn(
          className,
          'transition-opacity duration-300 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-90'
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
          setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
}
