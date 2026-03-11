// Post Scheduler Service - Adapted from P1 (Postiz) post scheduling system
// Handles creating, scheduling, and managing posts across platforms

import { PostDetails, PostResponse } from './providers';

export type PostStatus = 'draft' | 'scheduled' | 'queued' | 'publishing' | 'posted' | 'failed';

export interface ScheduledPost {
  id: string;
  userId: string;
  content: string;
  platforms: string[];
  mediaUrls: string[];
  mediaType: 'text' | 'image' | 'video' | 'carousel';
  scheduledAt: string;
  publishedAt?: string;
  status: PostStatus;
  tags: string[];
  campaign?: string;
  aiGenerated: boolean;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  platformResults?: PostResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  content: string;
  platforms: string[];
  mediaUrls?: string[];
  mediaType?: 'text' | 'image' | 'video' | 'carousel';
  scheduledAt?: string; // ISO date string; if not provided, post immediately
  tags?: string[];
  campaign?: string;
  aiGenerated?: boolean;
}

// Time slot suggestions based on platform best practices (from P1's autopost system)
export const OPTIMAL_POST_TIMES: Record<string, { day: string; times: string[] }[]> = {
  instagram: [
    { day: 'Monday', times: ['11:00', '14:00', '17:00'] },
    { day: 'Tuesday', times: ['09:00', '13:00', '19:00'] },
    { day: 'Wednesday', times: ['11:00', '15:00', '19:00'] },
    { day: 'Thursday', times: ['12:00', '15:00', '19:00'] },
    { day: 'Friday', times: ['10:00', '14:00', '17:00'] },
    { day: 'Saturday', times: ['09:00', '12:00', '15:00'] },
    { day: 'Sunday', times: ['10:00', '13:00', '17:00'] },
  ],
  x: [
    { day: 'Monday', times: ['08:00', '12:00', '17:00'] },
    { day: 'Tuesday', times: ['09:00', '12:00', '18:00'] },
    { day: 'Wednesday', times: ['09:00', '12:00', '17:00'] },
    { day: 'Thursday', times: ['09:00', '12:00', '18:00'] },
    { day: 'Friday', times: ['09:00', '12:00', '15:00'] },
    { day: 'Saturday', times: ['10:00', '13:00'] },
    { day: 'Sunday', times: ['10:00', '14:00'] },
  ],
  youtube: [
    { day: 'Monday', times: ['14:00', '16:00'] },
    { day: 'Tuesday', times: ['14:00', '16:00'] },
    { day: 'Wednesday', times: ['14:00', '16:00'] },
    { day: 'Thursday', times: ['12:00', '15:00'] },
    { day: 'Friday', times: ['12:00', '15:00'] },
    { day: 'Saturday', times: ['09:00', '11:00'] },
    { day: 'Sunday', times: ['09:00', '11:00'] },
  ],
  tiktok: [
    { day: 'Monday', times: ['06:00', '10:00', '22:00'] },
    { day: 'Tuesday', times: ['02:00', '04:00', '09:00'] },
    { day: 'Wednesday', times: ['07:00', '08:00', '23:00'] },
    { day: 'Thursday', times: ['09:00', '12:00', '19:00'] },
    { day: 'Friday', times: ['05:00', '13:00', '15:00'] },
    { day: 'Saturday', times: ['11:00', '19:00', '20:00'] },
    { day: 'Sunday', times: ['07:00', '08:00', '16:00'] },
  ],
  linkedin: [
    { day: 'Monday', times: ['07:45', '10:45', '12:45'] },
    { day: 'Tuesday', times: ['07:45', '10:45', '12:45'] },
    { day: 'Wednesday', times: ['07:45', '10:45', '12:45'] },
    { day: 'Thursday', times: ['07:45', '10:45', '12:45'] },
    { day: 'Friday', times: ['07:45', '10:45', '12:45'] },
  ],
  facebook: [
    { day: 'Monday', times: ['09:00', '12:00', '15:00'] },
    { day: 'Tuesday', times: ['09:00', '12:00', '15:00'] },
    { day: 'Wednesday', times: ['09:00', '12:00', '15:00'] },
    { day: 'Thursday', times: ['09:00', '12:00', '15:00'] },
    { day: 'Friday', times: ['09:00', '12:00', '15:00'] },
    { day: 'Saturday', times: ['10:00', '13:00'] },
    { day: 'Sunday', times: ['10:00', '13:00'] },
  ],
};

// Find next optimal posting time for a platform
export function findNextOptimalTime(platform: string): Date {
  const times = OPTIMAL_POST_TIMES[platform];
  if (!times) {
    // Default: next hour
    const next = new Date();
    next.setHours(next.getHours() + 1, 0, 0, 0);
    return next;
  }

  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const checkDate = new Date(now);
    checkDate.setDate(checkDate.getDate() + dayOffset);
    const dayName = days[checkDate.getDay()];
    const dayTimes = times.find(t => t.day === dayName);
    
    if (dayTimes) {
      for (const time of dayTimes.times) {
        const [hours, minutes] = time.split(':').map(Number);
        const candidate = new Date(checkDate);
        candidate.setHours(hours, minutes, 0, 0);
        
        if (candidate > now) {
          return candidate;
        }
      }
    }
  }

  // Fallback
  const next = new Date();
  next.setDate(next.getDate() + 1);
  next.setHours(9, 0, 0, 0);
  return next;
}

// Generate hashtag suggestions based on content
export function suggestHashtags(content: string, platform: string): string[] {
  const words = content.toLowerCase().split(/\s+/);
  const suggestions: string[] = [];
  
  const trendingTags: Record<string, string[]> = {
    instagram: ['instagood', 'photooftheday', 'love', 'fashion', 'beautiful', 'happy', 'cute', 'tbt', 'like4like', 'followme'],
    x: ['trending', 'viral', 'breaking', 'tech', 'news', 'innovation'],
    tiktok: ['fyp', 'foryou', 'viral', 'trending', 'foryoupage'],
    linkedin: ['leadership', 'innovation', 'business', 'marketing', 'careers'],
    youtube: ['subscribe', 'tutorial', 'review', 'howto', 'vlog'],
  };

  // Extract potential hashtags from content
  const hashtagRegex = /#(\w+)/g;
  let match;
  while ((match = hashtagRegex.exec(content)) !== null) {
    suggestions.push(match[1]);
  }

  // Add platform-specific trending tags
  const platformTags = trendingTags[platform] || [];
  for (const tag of platformTags.slice(0, 5)) {
    if (!suggestions.includes(tag)) {
      suggestions.push(tag);
    }
  }

  return suggestions.slice(0, 10);
}
