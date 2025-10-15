// Cancel Subscription API
// POST /api/subscriptions/cancel

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cancelSubscription } from '$lib/server/payments/stripe';

export const POST: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		await cancelSubscription(locals.user.id);

		return json({
			success: true,
			message: 'Subscription will be cancelled at the end of the billing period'
		});
	} catch (error) {
		console.error('Cancel subscription error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Failed to cancel subscription';

		return json({ error: errorMessage }, { status: 500 });
	}
};

