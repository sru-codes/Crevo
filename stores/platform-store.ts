"use client";

import { create } from 'zustand';
import type { SocialAccount, Platform } from '@/types';

interface PlatformState {
  accounts: SocialAccount[];
  isConnecting: boolean;
  connectingPlatform: Platform | null;

  setAccounts: (accounts: SocialAccount[]) => void;
  addAccount: (account: SocialAccount) => void;
  removeAccount: (id: string) => void;
  updateAccount: (id: string, updates: Partial<SocialAccount>) => void;
  setConnecting: (connecting: boolean, platform?: Platform) => void;

  // Derived
  getAccountsByPlatform: (platform: Platform) => SocialAccount[];
  activeAccounts: () => SocialAccount[];
}

export const usePlatformStore = create<PlatformState>((set, get) => ({
  accounts: [],
  isConnecting: false,
  connectingPlatform: null,

  setAccounts: (accounts) => set({ accounts }),
  addAccount: (account) => set((s) => ({ accounts: [...s.accounts, account] })),
  removeAccount: (id) =>
    set((s) => ({ accounts: s.accounts.filter((a) => a.id !== id) })),
  updateAccount: (id, updates) =>
    set((s) => ({
      accounts: s.accounts.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),
  setConnecting: (isConnecting, platform) =>
    set({ isConnecting, connectingPlatform: platform || null }),

  getAccountsByPlatform: (platform) =>
    get().accounts.filter((a) => a.platform === platform),
  activeAccounts: () =>
    get().accounts.filter((a) => a.isActive),
}));
