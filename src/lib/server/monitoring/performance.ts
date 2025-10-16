// Performance Monitoring
// Production-ready performance tracking

import { startTransaction } from './sentry';

/**
 * Measure function execution time
 */
export async function measurePerformance<T>(
	name: string,
	fn: () => Promise<T>
): Promise<{ result: T; duration: number }> {
	const startTime = performance.now();
	const transaction = startTransaction(name, 'function');

	try {
		const result = await fn();
		const duration = performance.now() - startTime;

		transaction?.finish();

		// Log slow operations (> 1 second)
		if (duration > 1000) {
			console.warn(`⚠️  Slow operation: ${name} took ${duration.toFixed(2)}ms`);
		}

		return { result, duration };
	} catch (error) {
		transaction?.finish();
		throw error;
	}
}

/**
 * Database query performance tracker
 */
export class QueryPerformanceTracker {
	private queries: Map<string, { count: number; totalTime: number; avgTime: number }> = new Map();

	track(queryName: string, duration: number) {
		const existing = this.queries.get(queryName) || { count: 0, totalTime: 0, avgTime: 0 };

		existing.count++;
		existing.totalTime += duration;
		existing.avgTime = existing.totalTime / existing.count;

		this.queries.set(queryName, existing);
	}

	getStats() {
		return Array.from(this.queries.entries()).map(([name, stats]) => ({
			query: name,
			...stats
		}));
	}

	getSlowestQueries(limit = 10) {
		return this.getStats()
			.sort((a, b) => b.avgTime - a.avgTime)
			.slice(0, limit);
	}

	reset() {
		this.queries.clear();
	}
}

export const queryTracker = new QueryPerformanceTracker();

/**
 * API endpoint performance middleware
 */
export function trackEndpointPerformance(endpoint: string, duration: number) {
	// Log to console in development
	if (process.env.NODE_ENV === 'development') {
		console.log(`📊 ${endpoint}: ${duration.toFixed(2)}ms`);
	}

	// Send to monitoring service in production
	if (process.env.NODE_ENV === 'production') {
		// Could send to Sentry, DataDog, etc.
	}
}

