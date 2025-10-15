// Server Hooks - Session Management & Security
// Production-ready request handling with monitoring

import { lucia } from '$lib/server/auth';
import { setUser, captureException } from '$lib/server/monitoring/sentry';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		// Get session ID from cookie
		const sessionId = event.cookies.get(lucia.sessionCookieName);

		if (!sessionId) {
			event.locals.user = null;
			event.locals.session = null;
			setUser(null);
			return resolve(event);
		}

		// Validate session
		const { session, user } = await lucia.validateSession(sessionId);

		if (session && session.fresh) {
			// Refresh session cookie
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}

		if (!session) {
			// Clear invalid session cookie
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}

		event.locals.user = user;
		event.locals.session = session;

		// Set user context for error tracking
		if (user) {
			setUser({
				id: user.id,
				email: user.email,
				role: user.role
			});
		} else {
			setUser(null);
		}

		return resolve(event);
	} catch (error) {
		console.error('Hook error:', error);
		captureException(error as Error, {
			context: 'server_hooks',
			url: event.url.pathname
		});

		// Continue even if error occurs
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
};

