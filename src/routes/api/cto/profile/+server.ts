// CTO Profile Management API
// POST /api/cto/profile - Create/Update CTO profile
// GET /api/cto/profile - Get current user's CTO profile

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { generateCTOEmbedding } from '$lib/server/ai/openai';
import { upsertCTOVector } from '$lib/server/ai/pinecone';
import { z } from 'zod';

const ctoProfileSchema = z.object({
	title: z.string().min(5, 'Title must be at least 5 characters'),
	bio: z.string().min(100, 'Bio must be at least 100 characters'),
	yearsExperience: z.number().min(1).max(50),
	hourlyRate: z.number().min(50).max(1000),
	skills: z.array(z.string()).min(3, 'At least 3 skills required'),
	industries: z.array(z.string()).min(1, 'At least 1 industry required'),
	techStack: z.array(z.string()).min(3, 'At least 3 technologies required'),
	companiesLed: z.number().min(0).optional(),
	teamSize: z.number().min(0).optional(),
	availability: z.enum(['AVAILABLE', 'LIMITED', 'UNAVAILABLE']).optional()
});

// GET - Retrieve CTO profile
export const GET: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		const ctoProfile = await prisma.cTOProfile.findUnique({
			where: { userId: locals.user.id },
			include: {
				successStories: true,
				user: {
					select: {
						name: true,
						email: true,
						profile: true
					}
				}
			}
		});

		if (!ctoProfile) {
			return json({ error: 'CTO profile not found' }, { status: 404 });
		}

		return json({
			success: true,
			profile: ctoProfile
		});
	} catch (error) {
		console.error('Get CTO profile error:', error);
		return json({ error: 'Failed to retrieve profile' }, { status: 500 });
	}
};

// POST - Create or update CTO profile
export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Parse and validate request
		const body = await request.json();
		const result = ctoProfileSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const data = result.data;

		// Check if profile exists
		const existingProfile = await prisma.cTOProfile.findUnique({
			where: { userId: locals.user.id }
		});

		// Create or update profile
		const ctoProfile = existingProfile
			? await prisma.cTOProfile.update({
					where: { userId: locals.user.id },
					data: {
						title: data.title,
						bio: data.bio,
						yearsExperience: data.yearsExperience,
						hourlyRate: data.hourlyRate,
						skills: data.skills,
						industries: data.industries,
						techStack: data.techStack,
						companiesLed: data.companiesLed || 0,
						teamSize: data.teamSize || 0,
						availability: data.availability || 'AVAILABLE'
					}
			  })
			: await prisma.cTOProfile.create({
					data: {
						userId: locals.user.id,
						title: data.title,
						bio: data.bio,
						yearsExperience: data.yearsExperience,
						hourlyRate: data.hourlyRate,
						skills: data.skills,
						industries: data.industries,
						techStack: data.techStack,
						companiesLed: data.companiesLed || 0,
						teamSize: data.teamSize || 0,
						availability: data.availability || 'AVAILABLE',
						verified: false,
						featured: false,
						rating: 0,
						reviewCount: 0
					}
			  });

		// Update user role to CTO
		await prisma.user.update({
			where: { id: locals.user.id },
			data: { role: 'CTO' }
		});

		// Generate embedding for vector search
		console.log('Generating CTO embedding...');
		const embedding = await generateCTOEmbedding({
			skills: data.skills,
			industries: data.industries,
			bio: data.bio,
			techStack: data.techStack
		});

		// Upsert to Pinecone
		console.log('Indexing CTO profile in vector database...');
		await upsertCTOVector({
			id: locals.user.id,
			values: embedding,
			metadata: {
				name: locals.user.name || 'Anonymous',
				title: data.title,
				skills: data.skills,
				industries: data.industries,
				techStack: data.techStack,
				yearsExperience: data.yearsExperience,
				hourlyRate: data.hourlyRate,
				rating: ctoProfile.rating,
				availability: ctoProfile.availability
			}
		});

		return json({
			success: true,
			profile: ctoProfile,
			message: existingProfile ? 'Profile updated successfully' : 'Profile created successfully'
		});
	} catch (error) {
		console.error('CTO profile creation error:', error);

		const errorMessage =
			error instanceof Error ? error.message : 'Failed to create/update profile';

		return json({ error: errorMessage }, { status: 500 });
	}
};

// DELETE - Delete CTO profile
export const DELETE: RequestHandler = async ({ locals }) => {
	try {
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Delete from database
		await prisma.cTOProfile.delete({
			where: { userId: locals.user.id }
		});

		// Delete from Pinecone
		// Note: We'll handle this in a background job for better performance
		// For now, we'll just mark it as unavailable

		// Update user role back to USER
		await prisma.user.update({
			where: { id: locals.user.id },
			data: { role: 'USER' }
		});

		return json({
			success: true,
			message: 'CTO profile deleted successfully'
		});
	} catch (error) {
		console.error('Delete CTO profile error:', error);
		return json({ error: 'Failed to delete profile' }, { status: 500 });
	}
};

