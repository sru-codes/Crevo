// OAuth Flow Handler - Adapted from P1 (Postiz) OAuth controllers
// Handles the OAuth dance for connecting social media accounts

import { PLATFORM_CONFIGS } from './providers';

interface OAuthState {
  platform: string;
  userId: string;
  returnUrl: string;
  codeVerifier?: string;
  timestamp: number;
}

// Generate OAuth URL for a platform
export function generateOAuthUrl(
  platform: string,
  userId: string,
  returnUrl: string = '/dashboard'
): { url: string; state: string } | null {
  const config = PLATFORM_CONFIGS[platform];
  if (!config || !config.oauthUrl) return null;

  const state = btoa(JSON.stringify({
    platform,
    userId,
    returnUrl,
    timestamp: Date.now(),
  } satisfies OAuthState));

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/oauth/callback`;

  const params: Record<string, string> = {
    response_type: 'code',
    state,
    redirect_uri: redirectUri,
  };

  // Platform-specific OAuth params
  switch (platform) {
    case 'instagram':
    case 'facebook':
      params.client_id = process.env.FACEBOOK_APP_ID || '';
      params.scope = 'instagram_basic,pages_show_list,pages_read_engagement,business_management,instagram_content_publish';
      break;
    case 'x':
      params.client_id = process.env.X_CLIENT_ID || '';
      params.scope = 'tweet.read tweet.write users.read offline.access';
      params.code_challenge_method = 'S256';
      break;
    case 'youtube':
      params.client_id = process.env.GOOGLE_CLIENT_ID || '';
      params.scope = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly';
      params.access_type = 'offline';
      params.prompt = 'consent';
      break;
    case 'tiktok':
      params.client_key = process.env.TIKTOK_CLIENT_KEY || '';
      params.scope = 'user.info.basic,video.publish,video.upload';
      break;
    case 'linkedin':
      params.client_id = process.env.LINKEDIN_CLIENT_ID || '';
      params.scope = 'openid profile w_member_social';
      break;
    case 'discord':
      params.client_id = process.env.DISCORD_CLIENT_ID || '';
      params.scope = 'identify guilds bot';
      break;
    case 'reddit':
      params.client_id = process.env.REDDIT_CLIENT_ID || '';
      params.scope = 'identity submit read';
      params.duration = 'permanent';
      break;
    case 'pinterest':
      params.client_id = process.env.PINTEREST_APP_ID || '';
      params.scope = 'boards:read,pins:read,pins:write';
      break;
    case 'twitch':
      params.client_id = process.env.TWITCH_CLIENT_ID || '';
      params.scope = 'user:read:email channel:manage:broadcast';
      break;
    case 'slack':
      params.client_id = process.env.SLACK_CLIENT_ID || '';
      params.scope = 'chat:write,files:write';
      break;
    default:
      return null;
  }

  const queryString = new URLSearchParams(params).toString();
  return {
    url: `${config.oauthUrl}?${queryString}`,
    state,
  };
}

// Parse OAuth state
export function parseOAuthState(stateStr: string): OAuthState | null {
  try {
    return JSON.parse(atob(stateStr));
  } catch {
    return null;
  }
}

// Exchange code for tokens (server-side)
export async function exchangeCodeForTokens(
  platform: string,
  code: string,
): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  profile?: { id: string; name: string; picture?: string; username?: string };
} | null> {
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/oauth/callback`;

  switch (platform) {
    case 'instagram':
    case 'facebook': {
      // Step 1: Exchange code for short-lived token
      const tokenRes = await fetch(
        `https://graph.facebook.com/v20.0/oauth/access_token?` +
        `client_id=${process.env.FACEBOOK_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&client_secret=${process.env.FACEBOOK_APP_SECRET}` +
        `&code=${code}`
      );
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) return null;

      // Step 2: Exchange for long-lived token
      const longRes = await fetch(
        `https://graph.facebook.com/v20.0/oauth/access_token?` +
        `grant_type=fb_exchange_token` +
        `&client_id=${process.env.FACEBOOK_APP_ID}` +
        `&client_secret=${process.env.FACEBOOK_APP_SECRET}` +
        `&fb_exchange_token=${tokenData.access_token}`
      );
      const longData = await longRes.json();

      // Step 3: Get profile
      const profileRes = await fetch(
        `https://graph.facebook.com/v20.0/me?fields=id,name,picture&access_token=${longData.access_token}`
      );
      const profile = await profileRes.json();

      return {
        accessToken: longData.access_token,
        refreshToken: longData.access_token,
        expiresIn: longData.expires_in,
        profile: {
          id: profile.id,
          name: profile.name,
          picture: profile.picture?.data?.url,
        },
      };
    }

    case 'x': {
      const tokenRes = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: process.env.X_CLIENT_ID || '',
          code_verifier: 'challenge', // Should come from state
        }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) return null;

      const profileRes = await fetch('https://api.twitter.com/2/users/me?user.fields=profile_image_url,username', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profileData = await profileRes.json();

      return {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresIn: tokenData.expires_in,
        profile: {
          id: profileData.data?.id,
          name: profileData.data?.name,
          picture: profileData.data?.profile_image_url,
          username: profileData.data?.username,
        },
      };
    }

    case 'youtube': {
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) return null;

      const channelRes = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true',
        { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
      );
      const channelData = await channelRes.json();
      const channel = channelData.items?.[0];

      return {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresIn: tokenData.expires_in,
        profile: {
          id: channel?.id,
          name: channel?.snippet?.title,
          picture: channel?.snippet?.thumbnails?.default?.url,
          username: channel?.snippet?.customUrl,
        },
      };
    }

    default:
      return null;
  }
}
