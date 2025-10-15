// CTO Search API
// GET /api/cto/search - Search and filter CTOs

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import type { Availability } from '@prisma/client';

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Parse query parameters
		const skills = url.searchParams.get('skills')?.split(',') || [];
		const industries = url.searchParams.get('industries')?.split(',') || [];
		const minRate = parseInt(url.searchParams.get('minRate') || '0');
		const maxRate = parseInt(url.searchParams.get('maxRate') || '1000');
		const minExperience = parseInt(url.searchParams.get('minExperience') || '0');
		const availability = url.searchParams.get('availability') as Availability | null;
		const minRating = parseFloat(url.searchParams.get('minRating') || '0');
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '20');
		const sortBy = url.searchParams.get('sortBy') || 'rating'; // rating, hourlyRate, yearsExperience
		const sortOrder = url.searchParams.get('sortOrder') || 'desc'; // asc, desc

		// Build where clause
		const where: any = {
			hourlyRate: {
				gte: minRate,
				lte: maxRate
			},
			yearsExperience: {
				gte: minExperience
			},
			rating: {
				gte: minRating
			}
		};

		// Add skills filter
		if (skills.length > 0) {
			where.skills = {
				hasSome: skills
			};
		}

		// Add industries filter
		if (industries.length > 0) {
			where.industries = {
				hasSome: industries
			};
		}

		// Add availability filter
		if (availability) {
			where.availability = availability;
		}

		// Build orderBy
		const orderBy: any = {};
		orderBy[sortBy] = sortOrder;

		// Execute query with pagination
		const [ctoProfiles, total] = await Promise.all([
			prisma.cTOProfile.findMany({
				where,
				orderBy,
				skip: (page - 1) * limit,
				take: limit,
				include: {
					user: {
						select: {
							name: true,
							email: true,
							profile: {
								select: {
									avatarUrl: true,
									bio: true,
									linkedin: true,
									github: true
								}
							}
						}
					},
					successStories: {
						take: 3,
						orderBy: {
							createdAt: 'desc'
						}
					}
				}
			}),
			prisma.cTOProfile.count({ where })
		]);

		// Calculate pagination metadata
		const totalPages = Math.ceil(total / limit);
		const hasNextPage = page < totalPages;
		const hasPrevPage = page > 1;

		return json({
			success: true,
			data: ctoProfiles,
			pagination: {
				page,
				limit,
				total,
				totalPages,
				hasNextPage,
				hasPrevPage
			},
			filters: {
				skills,
				industries,
				minRate,
				maxRate,
				minExperience,
				availability,
				minRating
			}
		});
	} catch (error) {
		console.error('CTO search error:', error);
		return json(
			{
				error: 'Failed to search CTOs'
			},
			{ status: 500 }
		);
	}
};

