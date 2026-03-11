// Post Publish API - Schedule or publish posts to connected platforms
import { NextRequest, NextResponse } from 'next/server';
import { PLATFORM_CONFIGS } from '@/lib/platforms/providers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, platforms, mediaUrls, scheduledAt, tags, campaign } = body;

    if (!content || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Content and at least one platform are required' },
        { status: 400 }
      );
    }

    // Validate platforms
    for (const platformId of platforms) {
      const config = PLATFORM_CONFIGS[platformId];
      if (!config) {
        return NextResponse.json(
          { error: `Unknown platform: ${platformId}` },
          { status: 400 }
        );
      }
      if (content.length > config.maxLength) {
        return NextResponse.json(
          { error: `Content exceeds ${config.name}'s maximum length of ${config.maxLength} characters` },
          { status: 400 }
        );
      }
    }

    // TODO: Integration with Firebase to store post and queue for publishing
    // For now, return a mock response
    const results = platforms.map((platformId: string) => ({
      platform: platformId,
      status: scheduledAt ? 'scheduled' : 'queued',
      scheduledAt: scheduledAt || new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      postId: `post_${Date.now()}`,
      results,
    });
  } catch (err) {
    console.error('Post publish error:', err);
    return NextResponse.json(
      { error: 'Failed to publish post' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Return all posts for the user
  // TODO: Fetch from Firebase
  const demoPosts = [
    {
      id: 'post_1',
      content: '🚀 New product launch!',
      platforms: ['instagram', 'facebook'],
      status: 'posted',
      scheduledAt: new Date(Date.now() - 86400000).toISOString(),
      engagement: { likes: 234, comments: 56, shares: 12, views: 4500 },
    },
    {
      id: 'post_2',
      content: '💡 Tips for growing your audience',
      platforms: ['x', 'linkedin'],
      status: 'scheduled',
      scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    },
  ];

  return NextResponse.json({ posts: demoPosts });
}
