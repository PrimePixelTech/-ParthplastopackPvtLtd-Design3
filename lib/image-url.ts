/**
 * Safe Image URL Normalizer
 * Normalizes image paths from database, user uploads, or static references.
 * Ensures consistent, valid URLs for Next.js Image components across Desktop and Mobile Safari.
 */

export const DEFAULT_FALLBACK_IMAGE = '/images/products/jar1.webp';
export const PLACEHOLDER_IMAGE = '/images/placeholder.webp';

export function normalizeImageUrl(url?: string | null, fallback: string = DEFAULT_FALLBACK_IMAGE): string {
  if (!url || typeof url !== 'string') {
    return fallback;
  }

  const trimmed = url.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return fallback;
  }

  // Handle Windows paths or file:// URLs that might have leaked from local dev
  if (trimmed.includes(':\\') || trimmed.startsWith('file://')) {
    return fallback;
  }

  // Valid remote HTTPS/HTTP URLs (e.g. Cloudinary, Unsplash, etc.)
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed;
  }

  // Fix local relative paths:
  // e.g. "public/images/..." -> "/images/..."
  if (trimmed.startsWith('public/images/')) {
    return '/' + trimmed.substring('public/'.length);
  }
  if (trimmed.startsWith('/public/images/')) {
    return trimmed.substring('/public'.length);
  }

  // e.g. "./assets/images/..." -> "/images/..." or "./images/..."
  if (trimmed.startsWith('./assets/images/')) {
    return '/images/' + trimmed.substring('./assets/images/'.length);
  }
  if (trimmed.startsWith('./images/')) {
    return '/images/' + trimmed.substring('./images/'.length);
  }

  // e.g. "images/..." -> "/images/..."
  if (trimmed.startsWith('images/')) {
    return '/' + trimmed;
  }

  // Already a valid root-relative path (e.g. "/images/products/jar1.webp")
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // Default fallback if path cannot be resolved safely
  return fallback;
}
