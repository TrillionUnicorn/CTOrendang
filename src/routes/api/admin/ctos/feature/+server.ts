// Admin CTO Feature API
// POST /api/admin/ctos/feature - Feature/unfeature CTO

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { requireAdmin } from '$lib/server/middleware/admin';
import { z } from 'zod';

const featureSchema = z.object({
	ctoId: z.string().cuid(),
	featured: z.boolean()
});

export const POST: RequestHandler = async (event) => {
	try {
		requireAdmin(event);

		const body = await event.request.json();
		const result = featureSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { ctoId, featured } = result.data;

		// Update CTO profile
		const ctoProfile = await prisma.cTOProfile.update({
			where: { userId: ctoId },
			data: { featured }
		});

		// Log activity
		await prisma.activityLog.create({
			data: {
				userId: event.locals.user!.id,
				action: featured ? 'admin_feature_cto' : 'admin_unfeature_cto',
				metadata: JSON.stringify({ ctoId })
			}
		});

		return json({
			success: true,
			message: featured ? 'CTO featured successfully' : 'CTO unfeatured',
			ctoProfile: {
				id: ctoProfile.id,
				userId: ctoProfile.userId,
				featured: ctoProfile.featured
			}
		});
	} catch (error) {
		console.error('Admin feature CTO error:', error);

		if (error instanceof Response) {
			return error;
		}

		return json({ error: 'Failed to feature CTO' }, { status: 500 });
	}
};

