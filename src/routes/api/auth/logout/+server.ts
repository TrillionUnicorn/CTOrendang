// User Logout API
// POST /api/auth/logout

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	try {
		if (!locals.session) {
			return json({ error: 'Not authenticated' }, { status: 401 });
		}

		// Invalidate session
		await lucia.invalidateSession(locals.session.id);

		// Clear session cookie
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return json({ success: true });
	} catch (error) {
		console.error('Logout error:', error);
		return json(
			{
				error: 'An error occurred during logout'
			},
			{ status: 500 }
		);
	}
};

