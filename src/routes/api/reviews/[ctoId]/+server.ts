// Get CTO Reviews API
// GET /api/reviews/[ctoId]
// Returns all reviews for a specific CTO

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ params, url }) => {
	try {
		const { ctoId } = params;
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '20');
		const rating = url.searchParams.get('rating'); // Filter by rating

		// Build where clause
		const where: any = { ctoId };

		if (rating) {
			where.rating = parseInt(rating);
		}

		// Get reviews
		const [reviews, total] = await Promise.all([
			prisma.review.findMany({
				where,
				include: {
					user: {
						select: {
							name: true,
							profile: {
								select: {
									avatarUrl: true,
									company: true
								}
							}
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				},
				skip: (page - 1) * limit,
				take: limit
			}),
			prisma.review.count({ where })
		]);

		// Get rating distribution
		const ratingDistribution = await prisma.review.groupBy({
			by: ['rating'],
			where: { ctoId },
			_count: {
				rating: true
			}
		});

		const distribution = {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0
		};

		ratingDistribution.forEach((item) => {
			distribution[item.rating as keyof typeof distribution] = item._count.rating;
		});

		const totalPages = Math.ceil(total / limit);

		return json({
			success: true,
			reviews,
			distribution,
			pagination: {
				page,
				limit,
				total,
				totalPages,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1
			}
		});
	} catch (error) {
		console.error('Get reviews error:', error);
		return json({ error: 'Failed to retrieve reviews' }, { status: 500 });
	}
};

