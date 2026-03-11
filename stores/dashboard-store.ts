"use client";

import { create } from 'zustand';
import type { DashboardSection } from '@/types';

interface DashboardState {
  currentSection: DashboardSection;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: { id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; time: string }[];
  isRefreshing: boolean;

  setSection: (section: DashboardSection) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<DashboardState['notifications'][0], 'id'>) => void;
  dismissNotification: (id: string) => void;
  setRefreshing: (refreshing: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentSection: 'dashboard',
  sidebarOpen: false,
  theme: 'dark',
  notifications: [],
  isRefreshing: false,

  setSection: (currentSection) => set({ currentSection }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setTheme: (theme) => set({ theme }),
  addNotification: (notification) =>
    set((s) => ({
      notifications: [
        ...s.notifications,
        { ...notification, id: crypto.randomUUID() },
      ],
    })),
  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
  setRefreshing: (isRefreshing) => set({ isRefreshing }),
}));
