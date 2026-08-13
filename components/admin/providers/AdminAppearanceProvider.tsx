'use client';

import React, { useEffect, ReactNode, useState } from 'react';
import { useAppearanceStore, AppearanceSettingsType } from '@/lib/appearanceStore';

export const useAdminAppearance = () => {
  const appearance = useAppearanceStore((state) => state.appearance);
  return appearance;
};

export default function AdminAppearanceProvider({
  settings: initialSettings,
  children,
}: {
  settings: any; // Server-fetched initial settings
  children: ReactNode;
}) {
  const { appearance, setAppearance, hydrated, setHydrated } = useAppearanceStore();
  const [mounted, setMounted] = useState(false);

  // Rehydrate or sync with server
  useEffect(() => {
    setMounted(true);
    if (!hydrated && initialSettings) {
      setAppearance({
        ...useAppearanceStore.getState().appearance, // defaults
        ...initialSettings
      });
      setHydrated();
    }
  }, [hydrated, initialSettings, setAppearance, setHydrated]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Theme
    if (appearance.theme === 'dark') {
      root.classList.add('dark');
    } else if (appearance.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // system sync
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // Font size
    if (appearance.fontSize) {
      root.style.setProperty('--admin-font-size', `${appearance.fontSize}px`);
    }

    // Border Radius
    if (appearance.borderRadius !== undefined) {
      root.style.setProperty('--admin-radius', `${appearance.borderRadius}px`);
    }

    // Sidebar Width
    if (appearance.sidebar === 'expanded') {
      root.style.setProperty('--sidebar-width', '280px');
    } else if (appearance.sidebar === 'collapsed' || appearance.sidebar === 'mini') {
      root.style.setProperty('--sidebar-width', '80px');
    } else {
      root.style.setProperty('--sidebar-width', '0px');
    }

    // Layout Padding
    if (appearance.layoutDensity === 'compact') {
      root.style.setProperty('--layout-padding', '1rem');
    } else {
      root.style.setProperty('--layout-padding', '2rem');
    }

    // Blur Amount
    if (appearance.glassEffect) {
      root.style.setProperty('--admin-blur', `${appearance.blurAmount || 10}px`);
    } else {
      root.style.setProperty('--admin-blur', `0px`);
    }

    // Accent Color mapping
    const accentColors: Record<string, string> = {
      blue: '221 83% 53%',
      indigo: '243 75% 59%',
      purple: '275 39% 43%',
      emerald: '158 64% 52%',
      green: '142 71% 45%',
      orange: '24 98% 50%',
      amber: '45 93% 47%',
      rose: '346 87% 60%',
      pink: '330 81% 60%',
      red: '0 84% 60%',
      cyan: '189 94% 43%',
      slate: '215 16% 47%',
    };
    
    if (appearance.accentColor && accentColors[appearance.accentColor]) {
      root.style.setProperty('--admin-accent', accentColors[appearance.accentColor]);
    }
    
    // Animations
    if (appearance.animationsEnabled === false) {
      root.style.setProperty('--admin-transition-duration', '0ms');
      root.classList.add('disable-animations');
    } else {
      root.style.setProperty('--admin-transition-duration', '300ms');
      root.classList.remove('disable-animations');
    }

  }, [appearance, mounted]);

  return <>{children}</>;
}
