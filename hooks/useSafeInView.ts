'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useSafeInView — A bulletproof IntersectionObserver hook that guarantees
 * triggering on iOS Safari, even when the observed element is inside
 * parents with overflow:hidden, transforms, will-change, or opacity:0.
 *
 * Provides a hard fail-safe timeout: if the observer hasn't fired within
 * `fallbackMs` of mounting, the hook forces `isInView = true`.
 *
 * This replaces Framer Motion's `useInView` for critical animations
 * (counters, reveals) that must never get stuck on mobile Safari.
 */
export function useSafeInView(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    once?: boolean;
    /** IntersectionObserver rootMargin — default '100px' */
    margin?: string;
    /** Threshold — kept low (0.01) to ensure iOS Safari triggers */
    threshold?: number;
    /** Hard fail-safe timeout in ms — forces isInView=true if observer hasn't fired */
    fallbackMs?: number;
  } = {}
): boolean {
  const {
    once = true,
    margin = '100px',
    threshold = 0.01,
    fallbackMs = 2000,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  const trigger = useCallback(() => {
    if (hasTriggered.current && once) return;
    hasTriggered.current = true;
    setIsInView(true);
  }, [once]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Already triggered — skip
    if (hasTriggered.current && once) return;

    // 1. Try IntersectionObserver (works on most browsers)
    let observer: IntersectionObserver | null = null;

    if (typeof IntersectionObserver !== 'undefined') {
      try {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                trigger();
                if (once && observer) {
                  observer.disconnect();
                }
              }
            }
          },
          {
            // Use null root (viewport) — avoids iOS issues with nested scroll containers
            root: null,
            rootMargin: margin,
            threshold,
          }
        );

        // Small delay to ensure DOM is fully laid out before observing.
        // iOS Safari sometimes doesn't register elements that are observed
        // before layout completes (especially inside animated containers).
        const observeTimeout = setTimeout(() => {
          if (element && observer && !(hasTriggered.current && once)) {
            observer.observe(element);
          }
        }, 100);

        // 2. Hard fail-safe timeout — guarantee trigger even if observer never fires.
        // This handles: iOS Private Browsing bugs, nested transform/overflow:hidden
        // containers, elements that are already in viewport but observer doesn't notice.
        const fallbackTimeout = setTimeout(() => {
          trigger();
        }, fallbackMs);

        return () => {
          clearTimeout(observeTimeout);
          clearTimeout(fallbackTimeout);
          if (observer) observer.disconnect();
        };
      } catch {
        // IntersectionObserver constructor failed — force trigger
        trigger();
        return;
      }
    } else {
      // No IntersectionObserver support — trigger immediately
      trigger();
    }
  }, [ref, once, margin, threshold, fallbackMs, trigger]);

  return isInView;
}
