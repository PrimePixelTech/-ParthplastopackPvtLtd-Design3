import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppearanceSettingsType = {
  theme: 'light' | 'dark' | 'system';
  accentColor: 'blue' | 'indigo' | 'purple' | 'emerald' | 'green' | 'orange' | 'amber' | 'rose' | 'pink' | 'red' | 'cyan' | 'slate';
  layoutDensity: 'comfortable' | 'compact';
  sidebar: 'expanded' | 'collapsed' | 'mini';
  navbar: 'sticky' | 'fixed' | 'transparent';
  animationsEnabled: boolean;
  borderRadius: number;
  fontSize: number;
  glassEffect: boolean;
  blurAmount: number;
};

export const defaultAppearance: AppearanceSettingsType = {
  theme: 'system',
  accentColor: 'purple',
  layoutDensity: 'comfortable',
  sidebar: 'expanded',
  navbar: 'sticky',
  animationsEnabled: true,
  borderRadius: 8,
  fontSize: 14,
  glassEffect: true,
  blurAmount: 10,
};

interface AppearanceStore {
  appearance: AppearanceSettingsType;
  setAppearance: (settings: AppearanceSettingsType) => void;
  updateSetting: <K extends keyof AppearanceSettingsType>(key: K, value: AppearanceSettingsType[K]) => void;
  reset: () => void;
  hydrated: boolean;
  setHydrated: () => void;
}

export const useAppearanceStore = create<AppearanceStore>()(
  persist(
    (set) => ({
      appearance: defaultAppearance,
      hydrated: false,
      setAppearance: (settings) => set({ appearance: settings }),
      updateSetting: (key, value) => set((state) => ({
        appearance: { ...state.appearance, [key]: value }
      })),
      reset: () => set({ appearance: defaultAppearance }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'admin-appearance-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);
