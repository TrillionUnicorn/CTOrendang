// Rate Limiting Middleware
// Production-ready rate limiting with in-memory store

import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

interface RateLimitEntry {
	count: number;
	resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
	const now = Date.now();
	for (const [key, entry] of rateLimitStore.entries()) {
		if (entry.resetAt < now) {
			rateLimitStore.delete(key);
		}
	}
}, 5 * 60 * 1000);

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
	maxRequests: number; // Max requests per window
	windowMs: number; // Time window in milliseconds
	keyGenerator?: (event: RequestEvent) => string; // Custom key generator
}

/**
 * Default rate limit: 100 requests per 15 minutes
 */
export const defaultRateLimit: RateLimitConfig = {
	maxRequests: 100,
	windowMs: 15 * 60 * 1000 // 15 minutes
};

/**
 * Strict rate limit for sensitive endpoints: 10 requests per 15 minutes
 */
export const strictRateLimit: RateLimitConfig = {
	maxRequests: 10,
	windowMs: 15 * 60 * 1000
};

/**
 * Auth rate limit: 5 attempts per 15 minutes
 */
export const authRateLimit: RateLimitConfig = {
	maxRequests: 5,
	windowMs: 15 * 60 * 1000
};

/**
 * Apply rate limiting
 */
export function rateLimit(config: RateLimitConfig = defaultRateLimit) {
	return (event: RequestEvent) => {
		// Generate key (IP address or custom)
		const key = config.keyGenerator
			? config.keyGenerator(event)
			: getClientIP(event) || 'unknown';

		const now = Date.now();
		const entry = rateLimitStore.get(key);

		// Check if entry exists and is still valid
		if (entry && entry.resetAt > now) {
			// Increment count
			entry.count++;

			// Check if limit exceeded
			if (entry.count > config.maxRequests) {
				const retryAfter = Math.ceil((entry.resetAt - now) / 1000);

				throw json(
					{
						error: 'Too many requests',
						retryAfter
					},
					{
						status: 429,
						headers: {
							'Retry-After': retryAfter.toString(),
							'X-RateLimit-Limit': config.maxRequests.toString(),
							'X-RateLimit-Remaining': '0',
							'X-RateLimit-Reset': entry.resetAt.toString()
						}
					}
				);
			}

			// Update remaining
			const remaining = config.maxRequests - entry.count;

			// Add rate limit headers to response
			event.setHeaders({
				'X-RateLimit-Limit': config.maxRequests.toString(),
				'X-RateLimit-Remaining': remaining.toString(),
				'X-RateLimit-Reset': entry.resetAt.toString()
			});
		} else {
			// Create new entry
			const resetAt = now + config.windowMs;
			rateLimitStore.set(key, {
				count: 1,
				resetAt
			});

			event.setHeaders({
				'X-RateLimit-Limit': config.maxRequests.toString(),
				'X-RateLimit-Remaining': (config.maxRequests - 1).toString(),
				'X-RateLimit-Reset': resetAt.toString()
			});
		}
	};
}

/**
 * Get client IP address
 */
function getClientIP(event: RequestEvent): string | null {
	// Check various headers for IP
	const headers = [
		'x-forwarded-for',
		'x-real-ip',
		'cf-connecting-ip', // Cloudflare
		'x-vercel-forwarded-for' // Vercel
	];

	for (const header of headers) {
		const value = event.request.headers.get(header);
		if (value) {
			// x-forwarded-for can contain multiple IPs
			return value.split(',')[0].trim();
		}
	}

	return null;
}

/**
 * Rate limit by user ID
 */
export function rateLimitByUser(config: RateLimitConfig = defaultRateLimit) {
	return rateLimit({
		...config,
		keyGenerator: (event) => {
			return event.locals.user?.id || getClientIP(event) || 'unknown';
		}
	});
}

