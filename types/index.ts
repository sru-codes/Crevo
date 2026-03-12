// ============================================
// CREVO — TypeScript Type Definitions
// Shared types across the entire application
// ============================================

// ---- Auth & Users ----
export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  plan: 'free' | 'pro' | 'business';
  stripeCustomerId?: string;
  role: 'admin' | 'user';
  status: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// ---- Social Platforms ----
export type Platform =
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'twitter'
  | 'facebook'
  | 'linkedin'
  | 'discord'
  | 'telegram'
  | 'reddit'
  | 'pinterest'
  | 'threads'
  | 'bluesky'
  | 'mastodon'
  | 'slack'
  | 'dribbble'
  | 'medium';

export interface SocialAccount {
  id: string;
  userId: string;
  platform: Platform;
  username: string;
  displayName: string;
  avatarUrl?: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  followers?: number;
  isActive: boolean;
  connectedAt: Date;
}

// ---- Posts & Content ----
export type PostStatus = 'draft' | 'scheduled' | 'publishing' | 'posted' | 'failed';
export type MediaType = 'text' | 'image' | 'video' | 'carousel' | 'reel' | 'story' | 'thread';

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  mediaType: MediaType;
  platforms: Platform[];
  status: PostStatus;
  scheduledAt?: Date;
  publishedAt?: Date;
  tags: string[];
  campaignId?: string;
  aiGenerated: boolean;
  engagement?: PostEngagement;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostEngagement {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  saves: number;
  clicks: number;
  reach: number;
  impressions: number;
}

// ---- Campaigns ----
export interface Campaign {
  id: string;
  userId: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  platforms: Platform[];
  startDate: Date;
  endDate: Date;
  budget?: number;
  spent?: number;
  postIds: string[];
  goals: CampaignGoal[];
  createdAt: Date;
}

export interface CampaignGoal {
  metric: 'followers' | 'engagement' | 'reach' | 'clicks' | 'conversions';
  target: number;
  current: number;
}

// ---- Analytics ----
export interface AnalyticsData {
  userId: string;
  platform: Platform;
  date: Date;
  followers: number;
  followersChange: number;
  engagement: number;
  engagementRate: number;
  reach: number;
  impressions: number;
  profileViews: number;
  websiteClicks: number;
  topPosts: string[];
}

export interface AggregatedAnalytics {
  totalFollowers: number;
  followerGrowth: number;
  avgEngagementRate: number;
  totalReach: number;
  totalImpressions: number;
  bestPostingTime: string;
  topPlatform: Platform;
  revenueThisMonth: number;
}

// ---- Monetization ----
export type RevenueSource = 'ads' | 'sponsorship' | 'affiliate' | 'donation' | 'subscription' | 'merchandise';

export interface RevenueEntry {
  id: string;
  userId: string;
  source: RevenueSource;
  amount: number;
  currency: string;
  platform?: Platform;
  description: string;
  date: Date;
}

// ---- Automations ----
export type AutomationTrigger =
  | 'new_follower'
  | 'new_post'
  | 'new_comment'
  | 'new_dm'
  | 'scheduled_time'
  | 'follower_milestone'
  | 'engagement_spike';

export type AutomationAction =
  | 'send_dm'
  | 'post_to_platform'
  | 'assign_role'
  | 'send_notification'
  | 'add_to_list'
  | 'trigger_webhook';

export interface Automation {
  id: string;
  userId: string;
  name: string;
  trigger: AutomationTrigger;
  triggerPlatform: Platform;
  action: AutomationAction;
  actionConfig: Record<string, unknown>;
  isActive: boolean;
  executionCount: number;
  lastExecutedAt?: Date;
  createdAt: Date;
}

// ---- Notifications ----
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// ---- AI ----
export interface AIGeneration {
  id: string;
  userId: string;
  type: 'caption' | 'hashtags' | 'script' | 'reply' | 'content_ideas' | 'analytics';
  prompt: string;
  result: string;
  provider: 'nvidia' | 'groq' | 'gemini';
  createdAt: Date;
}

// ---- Community ----
export interface CommunityMessage {
  id: string;
  userId: string;
  platform: Platform;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'dm' | 'comment' | 'mention';
  isRead: boolean;
  repliedAt?: Date;
  createdAt: Date;
}

// ---- Content Calendar ----
export interface CalendarEvent {
  id: string;
  postId?: string;
  title: string;
  date: Date;
  platform: Platform;
  type: 'post' | 'story' | 'live' | 'reminder';
  color: string;
}

// ---- Dashboard Widgets ----
export type DashboardSection =
  | 'dashboard'
  | 'overview'
  | 'posts'
  | 'analytics'
  | 'engagement'
  | 'campaigns'
  | 'customers'
  | 'community'
  | 'monetization'
  | 'ai-assistant'
  | 'ai-copilot'
  | 'automations'
  | 'media'
  | 'integrations'
  | 'calendar'
  | 'post-creator'
  | 'settings'
  | 'users';
