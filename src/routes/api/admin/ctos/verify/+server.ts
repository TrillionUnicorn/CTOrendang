// Admin CTO Verification API
// POST /api/admin/ctos/verify - Verify CTO profile
// POST /api/admin/ctos/feature - Feature/unfeature CTO

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { requireAdmin } from '$lib/server/middleware/admin';
import { z } from 'zod';

// POST - Verify CTO
const verifySchema = z.object({
	ctoId: z.string().cuid(),
	verified: z.boolean()
});

export const POST: RequestHandler = async (event) => {
	try {
		requireAdmin(event);

		const body = await event.request.json();
		const result = verifySchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { ctoId, verified } = result.data;

		// Update CTO profile
		const ctoProfile = await prisma.cTOProfile.update({
			where: { userId: ctoId },
			data: { verified },
			include: {
				user: {
					select: {
						email: true,
						name: true
					}
				}
			}
		});

		// Log activity
		await prisma.activityLog.create({
			data: {
				userId: event.locals.user!.id,
				action: verified ? 'admin_verify_cto' : 'admin_unverify_cto',
				metadata: JSON.stringify({
					ctoId,
					ctoName: ctoProfile.user.name
				})
			}
		});

		// TODO: Send email notification to CTO
		// if (verified) {
		//   await sendCTOVerifiedEmail(ctoProfile.user.email, ctoProfile.user.name);
		// }

		return json({
			success: true,
			message: verified ? 'CTO verified successfully' : 'CTO verification removed',
			ctoProfile: {
				id: ctoProfile.id,
				userId: ctoProfile.userId,
				verified: ctoProfile.verified
			}
		});
	} catch (error) {
		console.error('Admin verify CTO error:', error);

		if (error instanceof Response) {
			return error;
		}

		return json({ error: 'Failed to verify CTO' }, { status: 500 });
	}
};

