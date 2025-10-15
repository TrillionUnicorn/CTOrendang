// Admin Analytics Overview API
// GET /api/admin/analytics/overview
// Returns platform-wide metrics and KPIs

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { requireAdmin } from '$lib/server/middleware/admin';

export const GET: RequestHandler = async (event) => {
	try {
		requireAdmin(event);

		const { url } = event;
		const period = url.searchParams.get('period') || '30'; // days
		const days = parseInt(period);

		const startDate = new Date();
		startDate.setDate(startDate.getDate() - days);

		// Parallel queries for performance
		const [
			totalUsers,
			newUsers,
			totalCTOs,
			verifiedCTOs,
			totalProjects,
			newProjects,
			totalBookings,
			completedBookings,
			totalRevenue,
			activeSubscriptions,
			totalMessages,
			averageRating
		] = await Promise.all([
			// Total users
			prisma.user.count(),

			// New users in period
			prisma.user.count({
				where: {
					createdAt: { gte: startDate }
				}
			}),

			// Total CTOs
			prisma.cTOProfile.count(),

			// Verified CTOs
			prisma.cTOProfile.count({
				where: { verified: true }
			}),

			// Total projects
			prisma.project.count(),

			// New projects in period
			prisma.project.count({
				where: {
					createdAt: { gte: startDate }
				}
			}),

			// Total bookings
			prisma.booking.count(),

			// Completed bookings
			prisma.booking.count({
				where: { status: 'COMPLETED' }
			}),

			// Total revenue (from completed bookings)
			prisma.booking.aggregate({
				where: { status: 'COMPLETED' },
				_sum: { totalAmount: true }
			}),

			// Active subscriptions
			prisma.subscription.count({
				where: { status: 'ACTIVE' }
			}),

			// Total messages
			prisma.message.count({
				where: {
					createdAt: { gte: startDate }
				}
			}),

			// Average CTO rating
			prisma.cTOProfile.aggregate({
				_avg: { rating: true }
			})
		]);

		// Calculate growth rates
		const previousStartDate = new Date(startDate);
		previousStartDate.setDate(previousStartDate.getDate() - days);

		const [previousNewUsers, previousNewProjects] = await Promise.all([
			prisma.user.count({
				where: {
					createdAt: {
						gte: previousStartDate,
						lt: startDate
					}
				}
			}),
			prisma.project.count({
				where: {
					createdAt: {
						gte: previousStartDate,
						lt: startDate
					}
				}
			})
		]);

		const userGrowthRate =
			previousNewUsers > 0 ? ((newUsers - previousNewUsers) / previousNewUsers) * 100 : 0;

		const projectGrowthRate =
			previousNewProjects > 0
				? ((newProjects - previousNewProjects) / previousNewProjects) * 100
				: 0;

		// Get top CTOs by bookings
		const topCTOs = await prisma.cTOProfile.findMany({
			take: 5,
			orderBy: {
				reviewCount: 'desc'
			},
			include: {
				user: {
					select: {
						name: true,
						email: true
					}
				}
			}
		});

		// Get recent activity
		const recentActivity = await prisma.activityLog.findMany({
			take: 20,
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				id: true,
				action: true,
				createdAt: true,
				userId: true
			}
		});

		return json({
			success: true,
			period: days,
			metrics: {
				users: {
					total: totalUsers,
					new: newUsers,
					growthRate: userGrowthRate.toFixed(2)
				},
				ctos: {
					total: totalCTOs,
					verified: verifiedCTOs,
					verificationRate: totalCTOs > 0 ? ((verifiedCTOs / totalCTOs) * 100).toFixed(2) : 0
				},
				projects: {
					total: totalProjects,
					new: newProjects,
					growthRate: projectGrowthRate.toFixed(2)
				},
				bookings: {
					total: totalBookings,
					completed: completedBookings,
					completionRate:
						totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(2) : 0
				},
				revenue: {
					total: totalRevenue._sum.totalAmount || 0,
					subscriptions: activeSubscriptions
				},
				engagement: {
					messages: totalMessages,
					averageRating: averageRating._avg.rating?.toFixed(2) || 0
				}
			},
			topCTOs: topCTOs.map((cto) => ({
				id: cto.userId,
				name: cto.user.name,
				title: cto.title,
				rating: cto.rating,
				reviewCount: cto.reviewCount,
				verified: cto.verified,
				featured: cto.featured
			})),
			recentActivity
		});
	} catch (error) {
		console.error('Admin analytics error:', error);

		if (error instanceof Response) {
			return error;
		}

		return json({ error: 'Failed to retrieve analytics' }, { status: 500 });
	}
};

