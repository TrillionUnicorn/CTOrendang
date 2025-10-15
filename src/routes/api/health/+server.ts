// Health Check Endpoint
// GET /api/health
// Returns system health status

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const startTime = Date.now();

	try {
		// Check database connection
		await prisma.$queryRaw`SELECT 1`;
		const dbLatency = Date.now() - startTime;

		// Get basic stats
		const [userCount, ctoCount, projectCount] = await Promise.all([
			prisma.user.count(),
			prisma.cTOProfile.count(),
			prisma.project.count()
		]);

		return json({
			status: 'healthy',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			database: {
				status: 'connected',
				latency: `${dbLatency}ms`
			},
			stats: {
				users: userCount,
				ctos: ctoCount,
				projects: projectCount
			},
			version: '1.0.0'
		});
	} catch (error) {
		console.error('Health check failed:', error);

		return json(
			{
				status: 'unhealthy',
				timestamp: new Date().toISOString(),
				error: 'Database connection failed'
			},
			{ status: 503 }
		);
	}
};

