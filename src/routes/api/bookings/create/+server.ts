// Create Booking API
// POST /api/bookings/create
// Creates booking and initiates payment

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { createBookingCheckout } from '$lib/server/payments/stripe';
import { z } from 'zod';

const createBookingSchema = z.object({
	ctoId: z.string().cuid(),
	title: z.string().min(5, 'Title must be at least 5 characters'),
	description: z.string().min(20, 'Description must be at least 20 characters'),
	startDate: z.string().datetime(),
	endDate: z.string().datetime(),
	hours: z.number().min(1).max(160), // Max 160 hours (1 month full-time)
	successUrl: z.string().url().optional(),
	cancelUrl: z.string().url().optional()
});

export const POST: RequestHandler = async ({ request, locals, url }) => {
	try {
		// Check authentication
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Parse and validate request
		const body = await request.json();
		const result = createBookingSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { ctoId, title, description, startDate, endDate, hours, successUrl, cancelUrl } =
			result.data;

		// Validate dates
		const start = new Date(startDate);
		const end = new Date(endDate);

		if (start >= end) {
			return json({ error: 'End date must be after start date' }, { status: 400 });
		}

		if (start < new Date()) {
			return json({ error: 'Start date must be in the future' }, { status: 400 });
		}

		// Get CTO profile
		const ctoProfile = await prisma.cTOProfile.findUnique({
			where: { userId: ctoId },
			include: {
				user: {
					select: {
						name: true,
						email: true
					}
				}
			}
		});

		if (!ctoProfile) {
			return json({ error: 'CTO not found' }, { status: 404 });
		}

		if (ctoProfile.availability === 'UNAVAILABLE') {
			return json({ error: 'CTO is not available for bookings' }, { status: 400 });
		}

		// Calculate total amount
		const totalAmount = hours * ctoProfile.hourlyRate;

		// Create booking
		const booking = await prisma.booking.create({
			data: {
				userId: locals.user.id,
				ctoId,
				ctoProfileId: ctoProfile.id,
				title,
				description,
				startDate: start,
				endDate: end,
				hours,
				hourlyRate: ctoProfile.hourlyRate,
				totalAmount,
				status: 'PENDING'
			}
		});

		// Create checkout session
		const baseUrl = url.origin;
		const defaultSuccessUrl = successUrl || `${baseUrl}/bookings/${booking.id}?payment=success`;
		const defaultCancelUrl = cancelUrl || `${baseUrl}/bookings/${booking.id}?payment=cancelled`;

		const checkoutUrl = await createBookingCheckout(
			locals.user.id,
			booking.id,
			totalAmount * 100, // Convert to cents
			defaultSuccessUrl,
			defaultCancelUrl
		);

		return json({
			success: true,
			booking: {
				id: booking.id,
				title: booking.title,
				totalAmount: booking.totalAmount,
				hours: booking.hours,
				hourlyRate: booking.hourlyRate
			},
			checkoutUrl
		});
	} catch (error) {
		console.error('Create booking error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';

		return json({ error: errorMessage }, { status: 500 });
	}
};

