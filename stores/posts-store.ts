"use client";

import { create } from 'zustand';
import type { Post, PostStatus, Platform } from '@/types';

interface PostsState {
  posts: Post[];
  filter: PostStatus | 'all';
  platformFilter: Platform | 'all';
  searchQuery: string;
  isLoading: boolean;

  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  setFilter: (filter: PostStatus | 'all') => void;
  setPlatformFilter: (platform: Platform | 'all') => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;

  // Derived
  filteredPosts: () => Post[];
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  filter: 'all',
  platformFilter: 'all',
  searchQuery: '',
  isLoading: false,

  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
  updatePost: (id, updates) =>
    set((s) => ({
      posts: s.posts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deletePost: (id) =>
    set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),
  setFilter: (filter) => set({ filter }),
  setPlatformFilter: (platformFilter) => set({ platformFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setLoading: (isLoading) => set({ isLoading }),

  filteredPosts: () => {
    const { posts, filter, platformFilter, searchQuery } = get();
    return posts.filter((post) => {
      if (filter !== 'all' && post.status !== filter) return false;
      if (platformFilter !== 'all' && !post.platforms.includes(platformFilter)) return false;
      if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  },
}));
