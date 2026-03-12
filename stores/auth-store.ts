"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

// Mock database for users (stored in localStorage via persist)
interface AuthState {
  user: User | null;
  allUsers: User[]; // Admin can see all registered users
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  
  // Admin actions
  verifyUser: (uid: string) => void;
  rejectUser: (uid: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      allUsers: [
        // Default Admin User
        {
          uid: 'admin-123',
          email: 'admin@crevo.com',
          displayName: 'Super Admin',
          photoURL: null,
          plan: 'business',
          role: 'admin',
          status: 'verified',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      isLoading: false,
      isAuthenticated: false,

      login: (email: string) => {
        set({ isLoading: true });
        // Simulate network request
        setTimeout(() => {
          const { allUsers } = get();
          const existingUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
          
          if (existingUser) {
            set({ user: existingUser, isAuthenticated: true, isLoading: false });
          } else {
            alert('User not found. Please register first.');
            set({ isLoading: false });
          }
        }, 800);
      },

      register: (email: string, name: string) => {
        set({ isLoading: true });
        setTimeout(() => {
          const { allUsers } = get();
          const exists = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
          
          if (exists) {
            alert('Email already registered! Please login instead.');
            set({ isLoading: false });
            return;
          }

          const newUser: User = {
            uid: `usr-${Date.now()}`,
            email: email.toLowerCase(),
            displayName: name,
            photoURL: null,
            plan: 'free',
            role: 'user',
            status: 'pending', // <--- Requires admin verification!
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set({ 
            allUsers: [...allUsers, newUser],
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
        }, 800);
      },

      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),

      verifyUser: (uid: string) => {
        const { allUsers, user } = get();
        if (user?.role !== 'admin') return;

        const updatedUsers = allUsers.map(u => 
          u.uid === uid ? { ...u, status: 'verified' as const } : u
        );

        set({ allUsers: updatedUsers });
      },

      rejectUser: (uid: string) => {
        const { allUsers, user } = get();
        if (user?.role !== 'admin') return;

        const updatedUsers = allUsers.map(u => 
          u.uid === uid ? { ...u, status: 'rejected' as const } : u
        );

        set({ allUsers: updatedUsers });
      }
    }),
    {
      name: 'crevo-auth-system',
      partialize: (state) => ({ 
        user: state.user,
        allUsers: state.allUsers,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
