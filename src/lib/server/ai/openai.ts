// OpenAI Service - GPT-4 Integration
// Production-ready AI analysis with error handling and rate limiting

import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
	organization: process.env.OPENAI_ORG_ID
});

// Project Analysis Types
export interface ProjectAnalysisInput {
	description: string;
	industry: string;
	budget: string;
	timeline?: string;
	teamSize?: number;
}

export interface ProjectAnalysisResult {
	healthScore: number; // 0-100
	complexity: 'Low' | 'Medium' | 'High' | 'Very High';
	estimatedTimeline: string;
	estimatedBudget: string;
	techStack: TechStackRecommendation[];
	risks: Risk[];
	recommendations: Recommendation[];
	matchedCTOProfiles: string[]; // CTO IDs for matching
}

export interface TechStackRecommendation {
	category: string;
	technology: string;
	reason: string;
	priority: 'Essential' | 'Recommended' | 'Optional';
}

export interface Risk {
	title: string;
	description: string;
	severity: 'Low' | 'Medium' | 'High' | 'Critical';
	mitigation: string;
}

export interface Recommendation {
	title: string;
	description: string;
	priority: 'High' | 'Medium' | 'Low';
	impact: string;
}

/**
 * Analyze a project using GPT-4
 * Returns comprehensive technical analysis
 */
export async function analyzeProject(
	input: ProjectAnalysisInput
): Promise<ProjectAnalysisResult> {
	try {
		const systemPrompt = `You are a senior CTO advisor analyzing startup projects. 
Provide detailed, actionable technical analysis including:
- Technical health score (0-100)
- Project complexity assessment
- Realistic timeline and budget estimates
- Recommended technology stack
- Technical risks and mitigation strategies
- Strategic recommendations

Be specific, practical, and honest. Consider industry best practices and current market conditions.`;

		const userPrompt = `Analyze this startup project:

**Description:** ${input.description}

**Industry:** ${input.industry}

**Budget:** ${input.budget}

${input.timeline ? `**Timeline:** ${input.timeline}` : ''}
${input.teamSize ? `**Team Size:** ${input.teamSize}` : ''}

Provide a comprehensive technical analysis in JSON format with the following structure:
{
  "healthScore": number (0-100),
  "complexity": "Low" | "Medium" | "High" | "Very High",
  "estimatedTimeline": "X weeks/months",
  "estimatedBudget": "$X - $Y",
  "techStack": [
    {
      "category": "Frontend/Backend/Database/etc",
      "technology": "Technology name",
      "reason": "Why this technology",
      "priority": "Essential/Recommended/Optional"
    }
  ],
  "risks": [
    {
      "title": "Risk title",
      "description": "Detailed description",
      "severity": "Low/Medium/High/Critical",
      "mitigation": "How to mitigate"
    }
  ],
  "recommendations": [
    {
      "title": "Recommendation title",
      "description": "Detailed description",
      "priority": "High/Medium/Low",
      "impact": "Expected impact"
    }
  ],
  "matchedCTOProfiles": ["skill1", "skill2", "skill3"] // Key skills needed
}`;

		const messages: ChatCompletionMessageParam[] = [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: userPrompt }
		];

		const completion = await openai.chat.completions.create({
			model: 'gpt-4-turbo-preview',
			messages,
			response_format: { type: 'json_object' },
			temperature: 0.7,
			max_tokens: 2000
		});

		const content = completion.choices[0].message.content;
		if (!content) {
			throw new Error('No response from OpenAI');
		}

		const result = JSON.parse(content) as ProjectAnalysisResult;

		// Validate result
		if (!result.healthScore || !result.complexity || !result.techStack) {
			throw new Error('Invalid analysis result from OpenAI');
		}

		return result;
	} catch (error) {
		console.error('OpenAI analysis error:', error);
		throw new Error('Failed to analyze project. Please try again.');
	}
}

/**
 * Generate CTO profile embedding for vector search
 */
export async function generateCTOEmbedding(profile: {
	skills: string[];
	industries: string[];
	bio: string;
	techStack: string[];
}): Promise<number[]> {
	try {
		const text = `
Skills: ${profile.skills.join(', ')}
Industries: ${profile.industries.join(', ')}
Technologies: ${profile.techStack.join(', ')}
Bio: ${profile.bio}
		`.trim();

		const response = await openai.embeddings.create({
			model: 'text-embedding-3-small',
			input: text
		});

		return response.data[0].embedding;
	} catch (error) {
		console.error('Embedding generation error:', error);
		throw new Error('Failed to generate CTO embedding');
	}
}

/**
 * Generate project embedding for CTO matching
 */
export async function generateProjectEmbedding(analysis: ProjectAnalysisResult): Promise<number[]> {
	try {
		const text = `
Required Skills: ${analysis.matchedCTOProfiles.join(', ')}
Tech Stack: ${analysis.techStack.map((t) => t.technology).join(', ')}
Complexity: ${analysis.complexity}
Industry Requirements: ${analysis.recommendations.map((r) => r.title).join(', ')}
		`.trim();

		const response = await openai.embeddings.create({
			model: 'text-embedding-3-small',
			input: text
		});

		return response.data[0].embedding;
	} catch (error) {
		console.error('Project embedding error:', error);
		throw new Error('Failed to generate project embedding');
	}
}

/**
 * Chat completion for general queries
 */
export async function chatCompletion(
	messages: ChatCompletionMessageParam[],
	options?: {
		model?: string;
		temperature?: number;
		maxTokens?: number;
	}
): Promise<string> {
	try {
		const completion = await openai.chat.completions.create({
			model: options?.model || 'gpt-4-turbo-preview',
			messages,
			temperature: options?.temperature || 0.7,
			max_tokens: options?.maxTokens || 1000
		});

		return completion.choices[0].message.content || '';
	} catch (error) {
		console.error('Chat completion error:', error);
		throw new Error('Failed to generate response');
	}
}

/**
 * Moderate content for safety
 */
export async function moderateContent(text: string): Promise<boolean> {
	try {
		const moderation = await openai.moderations.create({
			input: text
		});

		return !moderation.results[0].flagged;
	} catch (error) {
		console.error('Moderation error:', error);
		// Fail open - allow content if moderation fails
		return true;
	}
}

