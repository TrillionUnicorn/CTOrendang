// Pinecone Vector Database Service
// Production-ready vector search for CTO matching

import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client
const pinecone = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY!
});

const INDEX_NAME = process.env.PINECONE_INDEX || 'cto-profiles';

// Get or create index
let index: ReturnType<typeof pinecone.index>;

async function getIndex() {
	if (!index) {
		index = pinecone.index(INDEX_NAME);
	}
	return index;
}

export interface CTOVector {
	id: string; // CTO user ID
	values: number[]; // Embedding vector
	metadata: {
		name: string;
		title: string;
		skills: string[];
		industries: string[];
		techStack: string[];
		yearsExperience: number;
		hourlyRate: number;
		rating: number;
		availability: string;
	};
}

export interface MatchResult {
	ctoId: string;
	score: number; // 0-1 similarity score
	metadata: CTOVector['metadata'];
}

/**
 * Upsert CTO profile to vector database
 */
export async function upsertCTOVector(vector: CTOVector): Promise<void> {
	try {
		const idx = await getIndex();

		await idx.upsert([
			{
				id: vector.id,
				values: vector.values,
				metadata: {
					...vector.metadata,
					// Convert arrays to strings for Pinecone metadata
					skills: JSON.stringify(vector.metadata.skills),
					industries: JSON.stringify(vector.metadata.industries),
					techStack: JSON.stringify(vector.metadata.techStack)
				}
			}
		]);
	} catch (error) {
		console.error('Pinecone upsert error:', error);
		throw new Error('Failed to index CTO profile');
	}
}

/**
 * Search for matching CTOs based on project requirements
 */
export async function searchMatchingCTOs(
	projectEmbedding: number[],
	options?: {
		topK?: number;
		minScore?: number;
		filters?: {
			maxHourlyRate?: number;
			minRating?: number;
			availability?: string;
			industries?: string[];
		};
	}
): Promise<MatchResult[]> {
	try {
		const idx = await getIndex();

		// Build filter
		const filter: Record<string, any> = {};

		if (options?.filters) {
			if (options.filters.maxHourlyRate) {
				filter.hourlyRate = { $lte: options.filters.maxHourlyRate };
			}
			if (options.filters.minRating) {
				filter.rating = { $gte: options.filters.minRating };
			}
			if (options.filters.availability) {
				filter.availability = { $eq: options.filters.availability };
			}
		}

		// Query Pinecone
		const queryResponse = await idx.query({
			vector: projectEmbedding,
			topK: options?.topK || 10,
			includeMetadata: true,
			filter: Object.keys(filter).length > 0 ? filter : undefined
		});

		// Parse results
		const matches: MatchResult[] = queryResponse.matches
			.filter((match) => match.score && match.score >= (options?.minScore || 0.7))
			.map((match) => ({
				ctoId: match.id,
				score: match.score || 0,
				metadata: {
					name: (match.metadata?.name as string) || '',
					title: (match.metadata?.title as string) || '',
					skills: JSON.parse((match.metadata?.skills as string) || '[]'),
					industries: JSON.parse((match.metadata?.industries as string) || '[]'),
					techStack: JSON.parse((match.metadata?.techStack as string) || '[]'),
					yearsExperience: (match.metadata?.yearsExperience as number) || 0,
					hourlyRate: (match.metadata?.hourlyRate as number) || 0,
					rating: (match.metadata?.rating as number) || 0,
					availability: (match.metadata?.availability as string) || 'UNAVAILABLE'
				}
			}));

		return matches;
	} catch (error) {
		console.error('Pinecone search error:', error);
		throw new Error('Failed to search for matching CTOs');
	}
}

/**
 * Delete CTO from vector database
 */
export async function deleteCTOVector(ctoId: string): Promise<void> {
	try {
		const idx = await getIndex();
		await idx.deleteOne(ctoId);
	} catch (error) {
		console.error('Pinecone delete error:', error);
		throw new Error('Failed to delete CTO profile');
	}
}

/**
 * Update CTO vector (delete + upsert)
 */
export async function updateCTOVector(vector: CTOVector): Promise<void> {
	try {
		await deleteCTOVector(vector.id);
		await upsertCTOVector(vector);
	} catch (error) {
		console.error('Pinecone update error:', error);
		throw new Error('Failed to update CTO profile');
	}
}

/**
 * Get index stats
 */
export async function getIndexStats(): Promise<{
	totalVectors: number;
	dimension: number;
}> {
	try {
		const idx = await getIndex();
		const stats = await idx.describeIndexStats();

		return {
			totalVectors: stats.totalRecordCount || 0,
			dimension: stats.dimension || 1536
		};
	} catch (error) {
		console.error('Pinecone stats error:', error);
		return {
			totalVectors: 0,
			dimension: 1536
		};
	}
}

/**
 * Initialize index if it doesn't exist
 */
export async function initializeIndex(): Promise<void> {
	try {
		const indexes = await pinecone.listIndexes();
		const indexExists = indexes.indexes?.some((idx) => idx.name === INDEX_NAME);

		if (!indexExists) {
			await pinecone.createIndex({
				name: INDEX_NAME,
				dimension: 1536, // text-embedding-3-small dimension
				metric: 'cosine',
				spec: {
					serverless: {
						cloud: 'aws',
						region: 'us-east-1'
					}
				}
			});

			console.log(`Created Pinecone index: ${INDEX_NAME}`);
		}
	} catch (error) {
		console.error('Pinecone initialization error:', error);
		throw new Error('Failed to initialize Pinecone index');
	}
}

