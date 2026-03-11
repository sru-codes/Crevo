// Social Platform Provider Interface - Adapted from P1 (Postiz) for Next.js
// Original: libraries/nestjs-libraries/src/integrations/social/social.integrations.interface.ts

export interface PlatformCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface AuthTokenDetails {
  id: string;
  name: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  picture?: string;
  username: string;
  platform: string;
}

export interface PostMedia {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  thumbnail?: string;
}

export interface PostDetails {
  id: string;
  message: string;
  media?: PostMedia[];
  scheduledAt?: string;
  platforms: string[];
  settings?: Record<string, any>;
}

export interface PostResponse {
  id: string;
  postId: string;
  releaseURL: string;
  status: 'posted' | 'failed' | 'queued';
  platform: string;
  error?: string;
}

export interface AnalyticsData {
  label: string;
  data: Array<{ total: string; date: string }>;
  percentageChange: number;
}

export interface SocialProvider {
  identifier: string;
  name: string;
  icon: string;
  color: string;
  maxLength: number;
  supportedMediaTypes: ('image' | 'video' | 'carousel' | 'story' | 'reel')[];
  scopes: string[];

  generateAuthUrl(credentials: PlatformCredentials): Promise<{ url: string; state: string }>;
  authenticate(code: string, credentials: PlatformCredentials): Promise<AuthTokenDetails>;
  refreshToken(token: string, credentials: PlatformCredentials): Promise<AuthTokenDetails>;
  post(accessToken: string, postDetails: PostDetails): Promise<PostResponse>;
  getAnalytics?(accessToken: string, accountId: string, dateRange: number): Promise<AnalyticsData[]>;
}

// Provider Registry - maps platform identifiers to their config
export const PLATFORM_CONFIGS: Record<string, {
  name: string;
  icon: string;
  color: string;
  maxLength: number;
  supportedMedia: string[];
  oauthUrl: string;
  apiBase: string;
}> = {
  instagram: {
    name: 'Instagram',
    icon: '📸',
    color: '#E4405F',
    maxLength: 2200,
    supportedMedia: ['image', 'video', 'carousel', 'story', 'reel'],
    oauthUrl: 'https://www.facebook.com/v20.0/dialog/oauth',
    apiBase: 'https://graph.facebook.com/v20.0',
  },
  x: {
    name: 'X (Twitter)',
    icon: '𝕏',
    color: '#000000',
    maxLength: 280,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://twitter.com/i/oauth2/authorize',
    apiBase: 'https://api.twitter.com/2',
  },
  youtube: {
    name: 'YouTube',
    icon: '▶️',
    color: '#FF0000',
    maxLength: 5000,
    supportedMedia: ['video'],
    oauthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    apiBase: 'https://www.googleapis.com/youtube/v3',
  },
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    color: '#010101',
    maxLength: 2200,
    supportedMedia: ['video'],
    oauthUrl: 'https://www.tiktok.com/v2/auth/authorize',
    apiBase: 'https://open.tiktokapis.com/v2',
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    maxLength: 63206,
    supportedMedia: ['image', 'video', 'carousel'],
    oauthUrl: 'https://www.facebook.com/v20.0/dialog/oauth',
    apiBase: 'https://graph.facebook.com/v20.0',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0077B5',
    maxLength: 3000,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    apiBase: 'https://api.linkedin.com/v2',
  },
  discord: {
    name: 'Discord',
    icon: '🎮',
    color: '#5865F2',
    maxLength: 2000,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://discord.com/api/oauth2/authorize',
    apiBase: 'https://discord.com/api/v10',
  },
  telegram: {
    name: 'Telegram',
    icon: '✈️',
    color: '#26A5E4',
    maxLength: 4096,
    supportedMedia: ['image', 'video'],
    oauthUrl: '',
    apiBase: 'https://api.telegram.org',
  },
  reddit: {
    name: 'Reddit',
    icon: '🟠',
    color: '#FF4500',
    maxLength: 40000,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://www.reddit.com/api/v1/authorize',
    apiBase: 'https://oauth.reddit.com/api',
  },
  pinterest: {
    name: 'Pinterest',
    icon: '📌',
    color: '#BD081C',
    maxLength: 500,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://www.pinterest.com/oauth/',
    apiBase: 'https://api.pinterest.com/v5',
  },
  threads: {
    name: 'Threads',
    icon: '🧵',
    color: '#000000',
    maxLength: 500,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://www.threads.net/oauth/authorize',
    apiBase: 'https://graph.threads.net/v1.0',
  },
  bluesky: {
    name: 'Bluesky',
    icon: '🦋',
    color: '#0085FF',
    maxLength: 300,
    supportedMedia: ['image'],
    oauthUrl: '',
    apiBase: 'https://bsky.social/xrpc',
  },
  mastodon: {
    name: 'Mastodon',
    icon: '🐘',
    color: '#6364FF',
    maxLength: 500,
    supportedMedia: ['image', 'video'],
    oauthUrl: '/oauth/authorize',
    apiBase: '/api/v1',
  },
  slack: {
    name: 'Slack',
    icon: '💬',
    color: '#4A154B',
    maxLength: 40000,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://slack.com/oauth/v2/authorize',
    apiBase: 'https://slack.com/api',
  },
  twitch: {
    name: 'Twitch',
    icon: '🎮',
    color: '#9146FF',
    maxLength: 500,
    supportedMedia: ['video'],
    oauthUrl: 'https://id.twitch.tv/oauth2/authorize',
    apiBase: 'https://api.twitch.tv/helix',
  },
  wordpress: {
    name: 'WordPress',
    icon: '📝',
    color: '#21759B',
    maxLength: 100000,
    supportedMedia: ['image', 'video'],
    oauthUrl: 'https://public-api.wordpress.com/oauth2/authorize',
    apiBase: 'https://public-api.wordpress.com/rest/v1.1',
  },
  medium: {
    name: 'Medium',
    icon: '📖',
    color: '#000000',
    maxLength: 100000,
    supportedMedia: ['image'],
    oauthUrl: 'https://medium.com/m/oauth/authorize',
    apiBase: 'https://api.medium.com/v1',
  },
  devto: {
    name: 'Dev.to',
    icon: '👩‍💻',
    color: '#0A0A0A',
    maxLength: 100000,
    supportedMedia: ['image'],
    oauthUrl: '',
    apiBase: 'https://dev.to/api',
  },
};

// Helper: Get all supported platforms
export function getAllPlatforms() {
  return Object.entries(PLATFORM_CONFIGS).map(([id, config]) => ({
    id,
    ...config,
  }));
}

// Helper: Get platform by identifier
export function getPlatform(id: string) {
  return PLATFORM_CONFIGS[id] || null;
}
