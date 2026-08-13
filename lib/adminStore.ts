import { create } from 'zustand';

interface AdminStore {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isSidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
