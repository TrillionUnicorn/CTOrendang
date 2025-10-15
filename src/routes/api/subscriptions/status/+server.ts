// Get Subscription Status API
// GET /api/subscriptions/status

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSubscriptionDetails } from '$lib/server/payments/stripe';

export const GET: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		const subscription = await getSubscriptionDetails(locals.user.id);

		if (!subscription) {
			return json({
				success: true,
				subscription: null,
				tier: 'FREE'
			});
		}

		return json({
			success: true,
			subscription: {
				id: subscription.id,
				tier: subscription.tier,
				status: subscription.status,
				currentPeriodStart: subscription.currentPeriodStart,
				currentPeriodEnd: subscription.currentPeriodEnd,
				cancelAtPeriodEnd: subscription.cancelAtPeriodEnd
			}
		});
	} catch (error) {
		console.error('Get subscription error:', error);
		return json({ error: 'Failed to retrieve subscription' }, { status: 500 });
	}
};

