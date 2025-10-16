// Sentry Error Tracking & Monitoring
// Production-ready error tracking and performance monitoring

import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';

/**
 * Initialize Sentry for server-side error tracking
 */
export function initSentry() {
	if (dev) {
		console.log('Sentry disabled in development');
		return;
	}

	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		environment: process.env.NODE_ENV || 'production',
		tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
		
		// Performance Monitoring
		integrations: [
			new Sentry.Integrations.Http({ tracing: true }),
			new Sentry.Integrations.Prisma({ client: undefined }) // Will be set later
		],

		// Error filtering
		beforeSend(event, hint) {
			// Don't send errors in development
			if (dev) return null;

			// Filter out specific errors
			const error = hint.originalException;
			if (error instanceof Error) {
				// Ignore authentication errors (expected)
				if (error.message.includes('Authentication required')) {
					return null;
				}
				// Ignore validation errors (expected)
				if (error.message.includes('Validation failed')) {
					return null;
				}
			}

			return event;
		}
	});
}

/**
 * Capture exception with context
 */
export function captureException(error: Error, context?: Record<string, any>) {
	if (dev) {
		console.error('Error:', error, context);
		return;
	}

	Sentry.captureException(error, {
		extra: context
	});
}

/**
 * Capture message (for logging important events)
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
	if (dev) {
		console.log(`[${level.toUpperCase()}]`, message);
		return;
	}

	Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUser(user: { id: string; email: string; role: string } | null) {
	if (dev) return;

	if (user) {
		Sentry.setUser({
			id: user.id,
			email: user.email,
			role: user.role
		});
	} else {
		Sentry.setUser(null);
	}
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, category: string, data?: Record<string, any>) {
	if (dev) return;

	Sentry.addBreadcrumb({
		message,
		category,
		data,
		level: 'info'
	});
}

/**
 * Start transaction for performance monitoring
 */
export function startTransaction(name: string, op: string) {
	if (dev) return null;

	return Sentry.startTransaction({
		name,
		op
	});
}

