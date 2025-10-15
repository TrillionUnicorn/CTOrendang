// Project Analysis API
// POST /api/projects/analyze
// Analyzes project and finds matching CTOs

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { analyzeProject, generateProjectEmbedding } from '$lib/server/ai/openai';
import { searchMatchingCTOs } from '$lib/server/ai/pinecone';
import { z } from 'zod';

const analyzeSchema = z.object({
	title: z.string().min(5, 'Title must be at least 5 characters'),
	description: z.string().min(50, 'Description must be at least 50 characters'),
	industry: z.string().min(2, 'Industry is required'),
	budget: z.string().min(1, 'Budget is required'),
	timeline: z.string().optional(),
	teamSize: z.number().optional()
});

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		// Check authentication
		if (!locals.user) {
			return json({ error: 'Authentication required' }, { status: 401 });
		}

		// Parse and validate request
		const body = await request.json();
		const result = analyzeSchema.safeParse(body);

		if (!result.success) {
			return json(
				{
					error: 'Validation failed',
					details: result.error.flatten().fieldErrors
				},
				{ status: 400 }
			);
		}

		const { title, description, industry, budget, timeline, teamSize } = result.data;

		// Step 1: Analyze project with GPT-4
		console.log('Analyzing project with GPT-4...');
		const analysis = await analyzeProject({
			description,
			industry,
			budget,
			timeline,
			teamSize
		});

		// Step 2: Create project record
		const project = await prisma.project.create({
			data: {
				userId: locals.user.id,
				title,
				description,
				industry,
				budget,
				status: 'ANALYZING',
				healthScore: analysis.healthScore,
				complexity: analysis.complexity,
				timeline: analysis.estimatedTimeline,
				estimatedBudget: analysis.estimatedBudget,
				techStack: analysis.techStack.map((t) => t.technology),
				risks: JSON.stringify(analysis.risks),
				recommendations: JSON.stringify(analysis.recommendations)
			}
		});

		// Step 3: Generate project embedding
		console.log('Generating project embedding...');
		const projectEmbedding = await generateProjectEmbedding(analysis);

		// Step 4: Find matching CTOs
		console.log('Searching for matching CTOs...');
		const matches = await searchMatchingCTOs(projectEmbedding, {
			topK: 10,
			minScore: 0.7,
			filters: {
				availability: 'AVAILABLE',
				minRating: 4.0
			}
		});

		// Step 5: Save matches to database
		if (matches.length > 0) {
			await prisma.match.createMany({
				data: matches.map((match) => ({
					projectId: project.id,
					ctoId: match.ctoId,
					score: match.score * 100, // Convert to 0-100
					reasons: [
						`${Math.round(match.score * 100)}% match based on skills and experience`,
						`Expertise in ${match.metadata.industries.join(', ')}`,
						`${match.metadata.yearsExperience} years of experience`
					],
					status: 'PENDING'
				}))
			});

			// Update project status
			await prisma.project.update({
				where: { id: project.id },
				data: { status: 'MATCHED' }
			});
		}

		// Step 6: Return results
		return json({
			success: true,
			project: {
				id: project.id,
				title: project.title,
				status: project.status
			},
			analysis: {
				healthScore: analysis.healthScore,
				complexity: analysis.complexity,
				estimatedTimeline: analysis.estimatedTimeline,
				estimatedBudget: analysis.estimatedBudget,
				techStack: analysis.techStack,
				risks: analysis.risks,
				recommendations: analysis.recommendations
			},
			matches: matches.map((match) => ({
				ctoId: match.ctoId,
				score: Math.round(match.score * 100),
				name: match.metadata.name,
				title: match.metadata.title,
				skills: match.metadata.skills,
				industries: match.metadata.industries,
				yearsExperience: match.metadata.yearsExperience,
				hourlyRate: match.metadata.hourlyRate,
				rating: match.metadata.rating
			}))
		});
	} catch (error) {
		console.error('Project analysis error:', error);

		// Return user-friendly error
		const errorMessage =
			error instanceof Error ? error.message : 'Failed to analyze project. Please try again.';

		return json(
			{
				error: errorMessage
			},
			{ status: 500 }
		);
	}
};

