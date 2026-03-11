// OAuth Callback API Route - Handles platform OAuth redirects
import { NextRequest, NextResponse } from 'next/server';
import { parseOAuthState, exchangeCodeForTokens } from '@/lib/platforms/oauth';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard?error=${encodeURIComponent(error)}`, req.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL('/dashboard?error=missing_params', req.url)
    );
  }

  const oauthState = parseOAuthState(state);
  if (!oauthState) {
    return NextResponse.redirect(
      new URL('/dashboard?error=invalid_state', req.url)
    );
  }

  try {
    const tokens = await exchangeCodeForTokens(oauthState.platform, code);
    if (!tokens) {
      return NextResponse.redirect(
        new URL('/dashboard?error=token_exchange_failed', req.url)
      );
    }

    // TODO: Save tokens to Firebase
    // await saveUserIntegration(oauthState.userId, {
    //   platform: oauthState.platform,
    //   accessToken: tokens.accessToken,
    //   refreshToken: tokens.refreshToken,
    //   expiresIn: tokens.expiresIn,
    //   profile: tokens.profile,
    //   connectedAt: new Date().toISOString(),
    // });

    return NextResponse.redirect(
      new URL(
        `/dashboard?success=connected&platform=${oauthState.platform}`,
        req.url
      )
    );
  } catch (err) {
    console.error('OAuth callback error:', err);
    return NextResponse.redirect(
      new URL('/dashboard?error=oauth_failed', req.url)
    );
  }
}
