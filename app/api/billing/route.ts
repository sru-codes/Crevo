import { NextRequest, NextResponse } from 'next/server';
import { stripe, createCheckoutSession, createPortalSession, getOrCreateCustomer } from '@/lib/stripe';

// Create checkout session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, email, name, priceId } = body;

    switch (action) {
      case 'create-checkout': {
        if (!userId || !email || !priceId) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const customer = await getOrCreateCustomer(userId, email, name);
        const session = await createCheckoutSession(
          customer.id,
          priceId,
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=cancelled`
        );
        return NextResponse.json({ url: session.url });
      }

      case 'create-portal': {
        if (!userId || !email) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const customer = await getOrCreateCustomer(userId, email, name);
        const session = await createPortalSession(
          customer.id,
          `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
        );
        return NextResponse.json({ url: session.url });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment error' },
      { status: 500 }
    );
  }
}
