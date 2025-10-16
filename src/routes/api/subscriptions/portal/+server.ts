// Customer Portal API
// POST /api/subscriptions/portal
// Creates Stripe customer portal session

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createPortalSession } from '$lib/server/payments/stripe';

export const POST: RequestHandler = async ({ locals, url }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		const returnUrl = url.origin + '/dashboard';
		const portalUrl = await createPortalSession(locals.user.id, returnUrl);

		return json({
			success: true,
			portalUrl
		});
	} catch (error) {
		console.error('Portal session error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Failed to create portal session';

		return json({ error: errorMessage }, { status: 500 });
	}
};

