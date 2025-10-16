// Upload Avatar API
// POST /api/upload/avatar

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadAvatar } from '$lib/server/storage/r2';
import { prisma } from '$lib/server/db';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return json({ error: 'No file provided' }, { status: 400 });
		}

		// Upload to R2
		const avatarUrl = await uploadAvatar(file, locals.user.id);

		// Update user profile
		await prisma.profile.upsert({
			where: { userId: locals.user.id },
			create: {
				userId: locals.user.id,
				avatarUrl
			},
			update: {
				avatarUrl
			}
		});

		return json({
			success: true,
			avatarUrl
		});
	} catch (error) {
		console.error('Avatar upload error:', error);

		const errorMessage = error instanceof Error ? error.message : 'Failed to upload avatar';

		return json({ error: errorMessage }, { status: 500 });
	}
};

