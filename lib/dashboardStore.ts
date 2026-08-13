import { create } from 'zustand';

interface DashboardState {
  dateRange: 'today' | 'yesterday' | 'last7' | 'last30' | 'thisMonth' | 'lastMonth' | 'custom';
  setDateRange: (range: DashboardState['dateRange']) => void;
  globalSearch: string;
  setGlobalSearch: (query: string) => void;
  liveMode: boolean;
  setLiveMode: (isLive: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dateRange: 'last7',
  setDateRange: (range) => set({ dateRange: range }),
  globalSearch: '',
  setGlobalSearch: (query) => set({ globalSearch: query }),
  liveMode: true,
  setLiveMode: (isLive) => set({ liveMode: isLive }),
}));
