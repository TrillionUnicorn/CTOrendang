// Create Review API
// POST /api/reviews/create
// Allows users to review CTOs after completed bookings

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { z } from 'zod';

const createReviewSchema = z.object({
	ctoId: z.string().cuid(),
	bookingId: z.string().cuid().optional(),
	rating: z.number().min(1).max(5),
	comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000)
});

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Parse and validate
		const body = await request.json();
		const result = createReviewSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { ctoId, bookingId, rating, comment } = result.data;

		// Check if CTO exists
		const ctoProfile = await prisma.cTOProfile.findUnique({
			where: { userId: ctoId }
		});

		if (!ctoProfile) {
			return json({ error: 'CTO not found' }, { status: 404 });
		}

		// If bookingId provided, verify booking exists and is completed
		if (bookingId) {
			const booking = await prisma.booking.findUnique({
				where: { id: bookingId }
			});

			if (!booking) {
				return json({ error: 'Booking not found' }, { status: 404 });
			}

			if (booking.userId !== locals.user.id) {
				return json({ error: 'Unauthorized' }, { status: 403 });
			}

			if (booking.status !== 'COMPLETED') {
				return json({ error: 'Can only review completed bookings' }, { status: 400 });
			}

			// Check if already reviewed
			const existingReview = await prisma.review.findFirst({
				where: {
					userId: locals.user.id,
					ctoId,
					bookingId
				}
			});

			if (existingReview) {
				return json({ error: 'You have already reviewed this booking' }, { status: 400 });
			}
		}

		// Create review
		const review = await prisma.review.create({
			data: {
				userId: locals.user.id,
				ctoId,
				bookingId,
				rating,
				comment
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
			}
		});

		// Update CTO profile rating
		const reviews = await prisma.review.findMany({
			where: { ctoId },
			select: { rating: true }
		});

		const averageRating =
			reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

		await prisma.cTOProfile.update({
			where: { userId: ctoId },
			data: {
				rating: averageRating,
				reviewCount: reviews.length
			}
		});

		return json({
			success: true,
			review,
			message: 'Review submitted successfully'
		});
	} catch (error) {
		console.error('Create review error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Failed to create review';

		return json({ error: errorMessage }, { status: 500 });
	}
};

