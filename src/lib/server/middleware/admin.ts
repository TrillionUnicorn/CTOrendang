// Admin Authorization Middleware
// Production-ready role-based access control

import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Check if user is authenticated
 */
export function requireAuth(event: RequestEvent) {
	if (!event.locals.user) {
		throw json({ error: 'Authentication required' }, { status: 401 });
	}
	return event.locals.user;
}

/**
 * Check if user is admin
 */
export function requireAdmin(event: RequestEvent) {
	const user = requireAuth(event);

	if (user.role !== 'ADMIN') {
		throw json({ error: 'Admin access required' }, { status: 403 });
	}

	return user;
}

/**
 * Check if user is CTO
 */
export function requireCTO(event: RequestEvent) {
	const user = requireAuth(event);

	if (user.role !== 'CTO' && user.role !== 'ADMIN') {
		throw json({ error: 'CTO access required' }, { status: 403 });
	}

	return user;
}

/**
 * Check if user owns resource
 */
export function requireOwnership(event: RequestEvent, resourceUserId: string) {
	const user = requireAuth(event);

	if (user.id !== resourceUserId && user.role !== 'ADMIN') {
		throw json({ error: 'Unauthorized access' }, { status: 403 });
	}

	return user;
}

