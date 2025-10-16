import type { CTOProfile } from '$lib/types';

export const mockCTOs: CTOProfile[] = [
	{
		id: 'cto-001',
		name: 'Sarah Chen',
		title: 'Former CTO at FinTech Unicorn',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
		bio: 'Led technical teams at 3 successful fintech startups. Expert in building scalable payment systems and regulatory compliance. Passionate about helping non-tech founders navigate technical challenges.',
		yearsExperience: 15,
		companiesLed: 5,
		industries: ['fintech', 'saas', 'blockchain'],
		techStack: [
			'Node.js',
			'React',
			'PostgreSQL',
			'AWS',
			'Kubernetes',
			'Python',
			'TypeScript',
			'GraphQL'
		],
		expertise: ['architecture', 'scalability', 'security', 'team-building', 'devops'],
		hourlyRate: 250,
		availability: 'limited',
		rating: 4.9,
		reviewCount: 47,
		successStories: [
			{
				id: 'story-001',
				companyName: 'PayFlow',
				challenge: 'Scaling payment processing from 1K to 100K transactions per day',
				solution:
					'Implemented microservices architecture with event-driven design and horizontal scaling',
				result: 'Successfully handled 500K daily transactions with 99.99% uptime',
				metrics: ['500K daily transactions', '99.99% uptime', '50% cost reduction'],
				industry: 'fintech',
				duration: '8 months',
				testimonial:
					'Sarah transformed our technical infrastructure. We went from constant downtime to industry-leading reliability.'
			}
		],
		certifications: ['AWS Solutions Architect', 'Certified Kubernetes Administrator', 'PCI-DSS'],
		education: [
			{
				degree: 'MS Computer Science',
				institution: 'Stanford University',
				year: 2009,
				field: 'Distributed Systems'
			}
		],
		timezone: 'PST',
		languages: ['English', 'Mandarin'],
		linkedIn: 'https://linkedin.com/in/sarahchen',
		github: 'https://github.com/sarahchen'
	},
	{
		id: 'cto-002',
		name: 'Marcus Rodriguez',
		title: 'Blockchain & Web3 Specialist',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
		bio: 'Pioneer in blockchain technology with 10+ years building decentralized applications. Led technical teams at 2 crypto unicorns. Expert in smart contracts, DeFi, and NFT platforms.',
		yearsExperience: 12,
		companiesLed: 4,
		industries: ['blockchain', 'fintech', 'gaming'],
		techStack: [
			'Solidity',
			'Rust',
			'Go',
			'React',
			'Node.js',
			'PostgreSQL',
			'AWS',
			'Docker'
		],
		expertise: ['blockchain', 'security', 'architecture', 'scalability'],
		hourlyRate: 300,
		availability: 'available',
		rating: 4.8,
		reviewCount: 31,
		successStories: [
			{
				id: 'story-002',
				companyName: 'CryptoVault',
				challenge: 'Building secure multi-chain wallet infrastructure',
				solution:
					'Designed and implemented hardware-backed key management with multi-sig support',
				result: 'Zero security breaches, $500M+ in assets secured',
				metrics: ['$500M+ secured', '0 breaches', '50K+ users'],
				industry: 'blockchain',
				duration: '12 months',
				testimonial:
					'Marcus is the best blockchain architect I have worked with. His security-first approach saved us from potential disasters.'
			}
		],
		certifications: ['Certified Blockchain Expert', 'AWS Security Specialty'],
		education: [
			{
				degree: 'BS Computer Engineering',
				institution: 'MIT',
				year: 2012,
				field: 'Cryptography'
			}
		],
		timezone: 'EST',
		languages: ['English', 'Spanish'],
		linkedIn: 'https://linkedin.com/in/marcusrodriguez',
		github: 'https://github.com/marcusrodriguez'
	},
	{
		id: 'cto-003',
		name: 'Emily Johnson',
		title: 'Full-Stack SaaS Expert',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
		bio: 'Built and scaled 6 SaaS products from 0 to millions in ARR. Expert in product-led growth, developer experience, and building high-performing engineering teams.',
		yearsExperience: 14,
		companiesLed: 6,
		industries: ['saas', 'ecommerce', 'edtech'],
		techStack: [
			'React',
			'Next.js',
			'Node.js',
			'PostgreSQL',
			'Redis',
			'AWS',
			'TypeScript',
			'GraphQL'
		],
		expertise: ['architecture', 'product-strategy', 'team-building', 'scalability'],
		hourlyRate: 220,
		availability: 'available',
		rating: 4.7,
		reviewCount: 52,
		successStories: [
			{
				id: 'story-003',
				companyName: 'CloudDocs',
				challenge: 'Scaling collaborative document editor to 1M concurrent users',
				solution:
					'Implemented CRDT-based real-time collaboration with optimistic UI updates',
				result: '1.5M concurrent users, 99.95% uptime, 200ms average latency',
				metrics: ['1.5M concurrent users', '99.95% uptime', '200ms latency'],
				industry: 'saas',
				duration: '10 months',
				testimonial:
					'Emily helped us build a world-class product. Her technical expertise and product sense are unmatched.'
			}
		],
		certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
		education: [
			{
				degree: 'BS Software Engineering',
				institution: 'UC Berkeley',
				year: 2010,
				field: 'Software Engineering'
			}
		],
		timezone: 'PST',
		languages: ['English'],
		linkedIn: 'https://linkedin.com/in/emilyjohnson',
		github: 'https://github.com/emilyjohnson'
	},
	{
		id: 'cto-004',
		name: 'David Kim',
		title: 'AI/ML Infrastructure Architect',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
		bio: 'Former ML engineer at Google and OpenAI. Expert in building production ML systems, LLM applications, and AI-powered products. Helped 10+ startups integrate AI into their core products.',
		yearsExperience: 11,
		companiesLed: 3,
		industries: ['ai-ml', 'saas', 'healthtech'],
		techStack: [
			'Python',
			'PyTorch',
			'TensorFlow',
			'FastAPI',
			'PostgreSQL',
			'Redis',
			'AWS',
			'Docker'
		],
		expertise: ['ai-ml', 'architecture', 'scalability', 'data-engineering'],
		hourlyRate: 280,
		availability: 'limited',
		rating: 4.9,
		reviewCount: 28,
		successStories: [
			{
				id: 'story-004',
				companyName: 'MedAI',
				challenge: 'Building HIPAA-compliant AI diagnostic system',
				solution:
					'Designed secure ML pipeline with federated learning and differential privacy',
				result: '95% diagnostic accuracy, FDA approval, 100+ hospitals deployed',
				metrics: ['95% accuracy', 'FDA approved', '100+ hospitals'],
				industry: 'healthtech',
				duration: '14 months',
				testimonial:
					'David is a genius. He helped us navigate complex regulatory requirements while building cutting-edge AI.'
			}
		],
		certifications: ['AWS Machine Learning Specialty', 'Google Cloud ML Engineer'],
		education: [
			{
				degree: 'PhD Computer Science',
				institution: 'Carnegie Mellon',
				year: 2013,
				field: 'Machine Learning'
			}
		],
		timezone: 'PST',
		languages: ['English', 'Korean'],
		linkedIn: 'https://linkedin.com/in/davidkim',
		github: 'https://github.com/davidkim'
	},
	{
		id: 'cto-005',
		name: 'Priya Patel',
		title: 'E-commerce & Marketplace Specialist',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
		bio: 'Built technical infrastructure for 4 marketplace unicorns. Expert in payment systems, fraud detection, and building two-sided marketplaces at scale.',
		yearsExperience: 13,
		companiesLed: 4,
		industries: ['ecommerce', 'marketplace', 'fintech'],
		techStack: [
			'Node.js',
			'React',
			'PostgreSQL',
			'MongoDB',
			'Redis',
			'AWS',
			'Kubernetes',
			'TypeScript'
		],
		expertise: ['architecture', 'scalability', 'security', 'devops'],
		hourlyRate: 240,
		availability: 'available',
		rating: 4.8,
		reviewCount: 39,
		successStories: [
			{
				id: 'story-005',
				companyName: 'LocalMarket',
				challenge: 'Scaling marketplace from 10K to 1M active users',
				solution:
					'Implemented microservices with event sourcing and CQRS pattern',
				result: '1.2M active users, $50M GMV, 99.9% uptime',
				metrics: ['1.2M users', '$50M GMV', '99.9% uptime'],
				industry: 'marketplace',
				duration: '9 months',
				testimonial:
					'Priya is exceptional. She helped us scale 100x while maintaining code quality and team velocity.'
			}
		],
		certifications: ['AWS Solutions Architect', 'PCI-DSS', 'Stripe Certified'],
		education: [
			{
				degree: 'MS Computer Science',
				institution: 'Georgia Tech',
				year: 2011,
				field: 'Distributed Systems'
			}
		],
		timezone: 'EST',
		languages: ['English', 'Hindi', 'Gujarati'],
		linkedIn: 'https://linkedin.com/in/priyapatel',
		github: 'https://github.com/priyapatel'
	}
];

