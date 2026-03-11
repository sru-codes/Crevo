import Stripe from 'stripe';

// Lazy Stripe instance — only initialized when actually called
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    });
  }
  return _stripe;
}

// Export as a getter
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop];
  },
});

// Crevo pricing tiers
export const PLANS = {
  free: {
    name: 'Free',
    priceId: null,
    features: [
      '3 social accounts',
      '10 scheduled posts/month',
      'Basic analytics',
      'AI captions (5/day)',
    ],
    limits: {
      accounts: 3,
      postsPerMonth: 10,
      aiCreditsPerDay: 5,
      platforms: ['instagram', 'twitter'],
    },
  },
  pro: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    monthlyPrice: 19,
    features: [
      '10 social accounts',
      'Unlimited scheduled posts',
      'Advanced analytics',
      'AI assistant (unlimited)',
      'Content calendar',
      'Auto-posting',
      'Community manager',
    ],
    limits: {
      accounts: 10,
      postsPerMonth: Infinity,
      aiCreditsPerDay: Infinity,
      platforms: ['instagram', 'twitter', 'youtube', 'tiktok', 'facebook', 'linkedin'],
    },
  },
  business: {
    name: 'Business',
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || '',
    monthlyPrice: 49,
    features: [
      'Unlimited social accounts',
      'Unlimited everything',
      'White-label reports',
      'Team collaboration',
      'API access',
      'Priority support',
      'Custom automations',
      'Revenue tracking',
      'Webhook integrations',
    ],
    limits: {
      accounts: Infinity,
      postsPerMonth: Infinity,
      aiCreditsPerDay: Infinity,
      platforms: ['instagram', 'twitter', 'youtube', 'tiktok', 'facebook', 'linkedin', 'discord', 'telegram', 'reddit', 'pinterest', 'threads'],
    },
  },
} as const;

export type PlanType = keyof typeof PLANS;

/**
 * Create a Stripe checkout session for a subscription
 */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      trial_period_days: 14,
    },
  });
}

/**
 * Create a Stripe customer portal session
 */
export async function createPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

/**
 * Get or create a Stripe customer for a Firebase user
 */
export async function getOrCreateCustomer(userId: string, email: string, name?: string) {
  // Try to find existing customer
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  return stripe.customers.create({
    email,
    name: name || undefined,
    metadata: { firebaseUid: userId },
  });
}
