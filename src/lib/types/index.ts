// CTO Profile Types
export interface CTOProfile {
	id: string;
	name: string;
	title: string;
	avatar?: string;
	bio: string;
	yearsExperience: number;
	companiesLed: number;
	industries: Industry[];
	techStack: Technology[];
	expertise: ExpertiseArea[];
	hourlyRate: number;
	availability: AvailabilityStatus;
	rating: number;
	reviewCount: number;
	successStories: SuccessStory[];
	certifications: string[];
	education: Education[];
	timezone: string;
	languages: string[];
	linkedIn?: string;
	github?: string;
	portfolio?: string;
}

export interface SuccessStory {
	id: string;
	companyName: string;
	challenge: string;
	solution: string;
	result: string;
	metrics: string[];
	industry: Industry;
	duration: string;
	testimonial?: string;
}

export interface Education {
	degree: string;
	institution: string;
	year: number;
	field: string;
}

// Project Types
export interface Project {
	id: string;
	userId: string;
	title: string;
	description: string;
	businessModel: BusinessModel;
	stage: StartupStage;
	industry: Industry;
	techRequirements: TechRequirements;
	budget: BudgetRange;
	timeline: string;
	teamSize: number;
	currentTech: Technology[];
	challenges: string[];
	goals: string[];
	createdAt: Date;
	updatedAt: Date;
	status: ProjectStatus;
}

export interface TechRequirements {
	frontend: Technology[];
	backend: Technology[];
	database: Technology[];
	infrastructure: Technology[];
	integrations: string[];
	compliance: ComplianceRequirement[];
	scalability: ScalabilityLevel;
	security: SecurityLevel;
}

export interface BudgetRange {
	min: number;
	max: number;
	currency: string;
	frequency: 'hourly' | 'monthly' | 'project';
}

// AI Analysis Types
export interface AIAnalysis {
	id: string;
	projectId: string;
	complexity: ComplexityLevel;
	estimatedTime: string;
	estimatedCost: BudgetRange;
	recommendedTechStack: TechStackRecommendation;
	risks: Risk[];
	opportunities: Opportunity[];
	recommendations: Recommendation[];
	matchingCTOs: CTOMatch[];
	technicalHealthScore: number;
	createdAt: Date;
}

export interface TechStackRecommendation {
	frontend: TechRecommendation[];
	backend: TechRecommendation[];
	database: TechRecommendation[];
	infrastructure: TechRecommendation[];
	reasoning: string;
}

export interface TechRecommendation {
	technology: Technology;
	reason: string;
	pros: string[];
	cons: string[];
	alternatives: Technology[];
}

export interface Risk {
	id: string;
	category: RiskCategory;
	severity: 'low' | 'medium' | 'high' | 'critical';
	description: string;
	mitigation: string;
	impact: string;
}

export interface Opportunity {
	id: string;
	category: string;
	description: string;
	potentialImpact: string;
	effort: 'low' | 'medium' | 'high';
}

export interface Recommendation {
	id: string;
	priority: 'low' | 'medium' | 'high' | 'critical';
	category: string;
	title: string;
	description: string;
	actionItems: string[];
	expectedOutcome: string;
}

// CTO Matching Types
export interface CTOMatch {
	cto: CTOProfile;
	matchScore: number;
	matchReasons: MatchReason[];
	compatibility: CompatibilityScore;
	estimatedEngagement: EngagementEstimate;
}

export interface MatchReason {
	category: string;
	reason: string;
	weight: number;
}

export interface CompatibilityScore {
	technical: number;
	industry: number;
	budget: number;
	availability: number;
	cultural: number;
	overall: number;
}

export interface EngagementEstimate {
	hoursPerWeek: number;
	duration: string;
	totalCost: BudgetRange;
	deliverables: string[];
}

// User Types
export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	company?: string;
	position?: string;
	avatar?: string;
	createdAt: Date;
	subscription: Subscription;
	projects: string[];
}

export interface Subscription {
	tier: SubscriptionTier;
	status: 'active' | 'inactive' | 'cancelled' | 'trial';
	startDate: Date;
	endDate?: Date;
	features: string[];
}

// Enums and Constants
export type UserRole = 'founder' | 'cto' | 'admin' | 'investor';

export type SubscriptionTier = 'starter' | 'connect' | 'partnership' | 'enterprise';

export type Industry =
	| 'fintech'
	| 'healthtech'
	| 'ecommerce'
	| 'saas'
	| 'ai-ml'
	| 'blockchain'
	| 'edtech'
	| 'proptech'
	| 'marketplace'
	| 'social'
	| 'gaming'
	| 'iot'
	| 'other';

export type Technology =
	| 'React'
	| 'Vue'
	| 'Angular'
	| 'Svelte'
	| 'Next.js'
	| 'Node.js'
	| 'Python'
	| 'Django'
	| 'FastAPI'
	| 'Go'
	| 'Rust'
	| 'Java'
	| 'Spring'
	| 'PostgreSQL'
	| 'MySQL'
	| 'MongoDB'
	| 'Redis'
	| 'AWS'
	| 'GCP'
	| 'Azure'
	| 'Docker'
	| 'Kubernetes'
	| 'GraphQL'
	| 'REST'
	| 'TypeScript'
	| 'JavaScript'
	| 'Solidity'
	| 'PyTorch'
	| 'TensorFlow';

export type ExpertiseArea =
	| 'architecture'
	| 'scalability'
	| 'security'
	| 'devops'
	| 'ai-ml'
	| 'blockchain'
	| 'mobile'
	| 'cloud'
	| 'data-engineering'
	| 'team-building'
	| 'product-strategy';

export type StartupStage = 'idea' | 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'growth';

export type BusinessModel =
	| 'b2b'
	| 'b2c'
	| 'b2b2c'
	| 'marketplace'
	| 'saas'
	| 'subscription'
	| 'freemium'
	| 'enterprise';

export type ComplexityLevel = 'low' | 'medium' | 'high' | 'very-high';

export type ScalabilityLevel = 'small' | 'medium' | 'large' | 'enterprise';

export type SecurityLevel = 'basic' | 'standard' | 'high' | 'critical';

export type AvailabilityStatus = 'available' | 'limited' | 'booked' | 'unavailable';

export type ProjectStatus = 'draft' | 'analyzing' | 'matched' | 'in-progress' | 'completed' | 'cancelled';

export type RiskCategory =
	| 'technical'
	| 'security'
	| 'scalability'
	| 'compliance'
	| 'team'
	| 'budget'
	| 'timeline';

export type ComplianceRequirement = 'GDPR' | 'HIPAA' | 'SOC2' | 'PCI-DSS' | 'ISO27001' | 'CCPA';

// Form Types
export interface ContactFormData {
	name: string;
	email: string;
	company?: string;
	message: string;
	subject: string;
}

export interface WaitlistFormData {
	email: string;
	name?: string;
	company?: string;
	role?: string;
	useCase?: string;
}

export interface ProjectSubmissionData {
	title: string;
	description: string;
	industry: Industry;
	stage: StartupStage;
	budget: BudgetRange;
	timeline: string;
	techRequirements: Partial<TechRequirements>;
}

