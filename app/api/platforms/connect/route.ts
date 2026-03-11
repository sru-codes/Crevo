// Platform Connect API - Generate OAuth URLs
import { NextRequest, NextResponse } from 'next/server';
import { generateOAuthUrl } from '@/lib/platforms/oauth';

export async function POST(req: NextRequest) {
  try {
    const { platform, userId } = await req.json();

    if (!platform || !userId) {
      return NextResponse.json(
        { error: 'Missing platform or userId' },
        { status: 400 }
      );
    }

    const result = generateOAuthUrl(platform, userId);
    if (!result) {
      return NextResponse.json(
        { error: `Platform "${platform}" is not supported or OAuth is not configured` },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Platform connect error:', err);
    return NextResponse.json(
      { error: 'Failed to generate OAuth URL' },
      { status: 500 }
    );
  }
}
