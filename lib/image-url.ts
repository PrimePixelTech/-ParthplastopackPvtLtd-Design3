/**
 * Safe Image URL Normalizer
 * Normalizes image paths from database, user uploads, or static references.
 * Ensures consistent, valid URLs for Next.js Image components across Desktop and Mobile Safari.
 *
 * Handles:
 *  - Cloudinary HTTPS URLs (pass through)
 *  - HTTP → HTTPS upgrade for known safe hosts
 *  - Relative paths (public/images, ./images, images/)
 *  - Root-relative paths (/images/...)
 *  - Rejects localhost, 127.0.0.1, 0.0.0.0, file://, C:\ paths
 */

export const DEFAULT_FALLBACK_IMAGE = '/images/products/jar1.webp';
export const PLACEHOLDER_IMAGE = '/images/placeholder.webp';

/** Hosts that are safe to upgrade from http:// to https:// */
const SAFE_HTTPS_HOSTS = [
  'res.cloudinary.com',
  'images.unsplash.com',
  'i.pravatar.cc',
  'api.dicebear.com',
];

/** Hosts that must never be used in production image URLs */
const BLOCKED_HOSTS = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
];

export function normalizeImageUrl(url?: string | null, fallback: string = DEFAULT_FALLBACK_IMAGE): string {
  if (!url || typeof url !== 'string') {
    return fallback;
  }

  const trimmed = url.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return fallback;
  }

  // Reject Windows filesystem paths or file:// protocol
  if (trimmed.includes(':\\') || trimmed.startsWith('file://')) {
    return fallback;
  }

  // Handle full URLs (https:// and http://)
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    try {
      const parsed = new URL(trimmed);

      // Block localhost / loopback addresses
      if (BLOCKED_HOSTS.some(h => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`))) {
        return fallback;
      }

      // Upgrade http:// → https:// for known safe hosts to prevent mixed-content on Vercel
      if (parsed.protocol === 'http:') {
        if (SAFE_HTTPS_HOSTS.some(h => parsed.hostname === h)) {
          parsed.protocol = 'https:';
          return parsed.toString();
        }
        // Unknown HTTP host — still allow but log warning in dev
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          console.warn(`[normalizeImageUrl] HTTP image URL may cause mixed-content issues: ${trimmed}`);
        }
      }

      return trimmed;
    } catch {
      // Malformed URL
      return fallback;
    }
  }

  // Fix local relative paths:
  // "public/images/..." → "/images/..."
  if (trimmed.startsWith('public/images/')) {
    return '/' + trimmed.substring('public/'.length);
  }
  if (trimmed.startsWith('/public/images/')) {
    return trimmed.substring('/public'.length);
  }

  // "./assets/images/..." → "/images/..."
  if (trimmed.startsWith('./assets/images/')) {
    return '/images/' + trimmed.substring('./assets/images/'.length);
  }
  // "./images/..." → "/images/..."
  if (trimmed.startsWith('./images/')) {
    return '/images/' + trimmed.substring('./images/'.length);
  }

  // "images/..." → "/images/..."
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

/** Returns true if the URL is an external (absolute) URL vs a local path */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('https://') || url.startsWith('http://');
}
