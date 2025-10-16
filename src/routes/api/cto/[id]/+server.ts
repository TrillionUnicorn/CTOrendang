// Get Single CTO Profile API
// GET /api/cto/[id]

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const { id } = params;

		// Find CTO profile
		const ctoProfile = await prisma.cTOProfile.findUnique({
			where: { userId: id },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						createdAt: true,
						profile: {
							select: {
								avatarUrl: true,
								bio: true,
								company: true,
								website: true,
								linkedin: true,
								github: true,
								twitter: true
							}
						}
					}
				},
				successStories: {
					orderBy: {
						createdAt: 'desc'
					}
				},
				bookings: {
					where: {
						status: 'COMPLETED'
					},
					select: {
						id: true,
						title: true,
						startDate: true,
						endDate: true,
						hours: true
					},
					orderBy: {
						endDate: 'desc'
					},
					take: 5
				}
			}
		});

		if (!ctoProfile) {
			return json(
				{
					error: 'CTO profile not found'
				},
				{ status: 404 }
			);
		}

		// Get reviews
		const reviews = await prisma.review.findMany({
			where: {
				ctoId: id
			},
			include: {
				user: {
					select: {
						name: true,
						profile: {
							select: {
								avatarUrl: true
							}
						}
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			take: 10
		});

		// Calculate stats
		const totalBookings = await prisma.booking.count({
			where: {
				ctoId: id,
				status: 'COMPLETED'
			}
		});

		const totalHours = await prisma.booking.aggregate({
			where: {
				ctoId: id,
				status: 'COMPLETED'
			},
			_sum: {
				hours: true
			}
		});

		return json({
			success: true,
			profile: {
				...ctoProfile,
				stats: {
					totalBookings,
					totalHours: totalHours._sum.hours || 0,
					reviewCount: reviews.length,
					averageRating: ctoProfile.rating
				}
			},
			reviews
		});
	} catch (error) {
		console.error('Get CTO profile error:', error);
		return json(
			{
				error: 'Failed to retrieve CTO profile'
			},
			{ status: 500 }
		);
	}
};

