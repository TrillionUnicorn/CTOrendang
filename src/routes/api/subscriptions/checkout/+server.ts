// Subscription Checkout API
// POST /api/subscriptions/checkout
// Creates Stripe checkout session for subscription

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSubscriptionCheckout } from '$lib/server/payments/stripe';
import { z } from 'zod';
import type { SubscriptionTier } from '@prisma/client';

const checkoutSchema = z.object({
	tier: z.enum(['STARTER', 'PROFESSIONAL', 'BUSINESS', 'ENTERPRISE']),
	successUrl: z.string().url().optional(),
	cancelUrl: z.string().url().optional()
});

export const POST: RequestHandler = async ({ request, locals, url }) => {
	try {
		// Check authentication
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Parse and validate request
		const body = await request.json();
		const result = checkoutSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { tier, successUrl, cancelUrl } = result.data;

		// Default URLs
		const baseUrl = url.origin;
		const defaultSuccessUrl = successUrl || `${baseUrl}/dashboard?subscription=success`;
		const defaultCancelUrl = cancelUrl || `${baseUrl}/pricing?subscription=cancelled`;

		// Create checkout session
		const checkoutUrl = await createSubscriptionCheckout(
			locals.user.id,
			tier as SubscriptionTier,
			defaultSuccessUrl,
			defaultCancelUrl
		);

		return json({
			success: true,
			checkoutUrl
		});
	} catch (error) {
		console.error('Subscription checkout error:', error);

		const errorMessage =
			error instanceof Error ? error.message : 'Failed to create checkout session';

		return json({ error: errorMessage }, { status: 500 });
	}
};

