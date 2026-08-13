import { create } from 'zustand';
import { SettingsFormValues } from '@/lib/validations/settings.schema';

interface SettingsStore {
  data: SettingsFormValues | null;
  originalData: SettingsFormValues | null;
  isDirty: boolean;
  isSaving: boolean;
  isLoading: boolean;
  
  setData: (data: SettingsFormValues) => void;
  updateSection: <K extends keyof SettingsFormValues>(section: K, values: Partial<SettingsFormValues[K]>) => void;
  setIsSaving: (saving: boolean) => void;
  undoChanges: () => void;
  resetToDefault: (defaultData: SettingsFormValues) => void;
  discardChanges: () => void;
  checkDirtyState: () => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  data: null,
  originalData: null,
  isDirty: false,
  isSaving: false,
  isLoading: true,

  setData: (data) => {
    set({ data, originalData: JSON.parse(JSON.stringify(data)), isDirty: false, isLoading: false });
  },

  updateSection: (section, values) => {
    set((state) => {
      if (!state.data) return state;
      const newData = {
        ...state.data,
        [section]: {
          ...state.data[section],
          ...values,
        },
      };
      return { data: newData };
    });
    get().checkDirtyState();
  },

  setIsSaving: (saving) => set({ isSaving: saving }),

  undoChanges: () => {
    const { originalData } = get();
    if (originalData) {
      set({ data: JSON.parse(JSON.stringify(originalData)), isDirty: false });
    }
  },

  resetToDefault: (defaultData) => {
    set({ data: JSON.parse(JSON.stringify(defaultData)) });
    get().checkDirtyState();
  },

  discardChanges: () => {
    get().undoChanges();
  },

  checkDirtyState: () => {
    const { data, originalData } = get();
    if (!data || !originalData) return;
    
    // Deep comparison
    const isDirty = JSON.stringify(data) !== JSON.stringify(originalData);
    set({ isDirty });
  },
}));
