// Database Seeding Script
// Run with: bun run db:seed

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Starting database seed...');

	// Clear existing data (development only!)
	if (process.env.NODE_ENV === 'development') {
		console.log('🗑️  Clearing existing data...');
		await prisma.review.deleteMany();
		await prisma.message.deleteMany();
		await prisma.booking.deleteMany();
		await prisma.match.deleteMany();
		await prisma.project.deleteMany();
		await prisma.successStory.deleteMany();
		await prisma.cTOProfile.deleteMany();
		await prisma.profile.deleteMany();
		await prisma.session.deleteMany();
		await prisma.user.deleteMany();
	}

	// Create test users
	console.log('👤 Creating users...');

	const password = await bcrypt.hash('Test123!@#', 12);

	// Regular user
	const user1 = await prisma.user.create({
		data: {
			email: 'founder@example.com',
			password,
			name: 'John Founder',
			emailVerified: true,
			role: 'USER',
			profile: {
				create: {
					bio: 'Startup founder looking for technical guidance',
					company: 'StartupCo',
					website: 'https://startupco.com'
				}
			}
		}
	});

	// CTO users
	const cto1 = await prisma.user.create({
		data: {
			email: 'sarah.cto@example.com',
			password,
			name: 'Sarah Chen',
			emailVerified: true,
			role: 'CTO',
			profile: {
				create: {
					bio: 'Former CTO at multiple successful startups',
					linkedin: 'https://linkedin.com/in/sarahchen',
					github: 'https://github.com/sarahchen'
				}
			},
			ctoProfile: {
				create: {
					title: 'Former CTO at TechCorp, Advisor at Y Combinator',
					bio: 'I have 15+ years of experience building and scaling technology companies. Led engineering teams from 5 to 200+ engineers. Expertise in SaaS, fintech, and marketplace platforms. Helped 20+ startups achieve product-market fit and scale to Series B+.',
					yearsExperience: 15,
					hourlyRate: 250,
					availability: 'AVAILABLE',
					skills: [
						'Technical Strategy',
						'Team Building',
						'System Architecture',
						'Product Development',
						'Fundraising',
						'Scaling'
					],
					industries: ['SaaS', 'Fintech', 'Marketplace', 'B2B'],
					techStack: [
						'React',
						'Node.js',
						'PostgreSQL',
						'AWS',
						'Kubernetes',
						'Python',
						'TypeScript'
					],
					companiesLed: 3,
					teamSize: 200,
					verified: true,
					featured: true,
					rating: 4.9,
					reviewCount: 24,
					successStories: {
						create: [
							{
								title: 'Scaled FinTech Startup to $50M ARR',
								description:
									'Led technical transformation and team growth from 10 to 100 engineers',
								company: 'PaymentFlow',
								outcome: 'Achieved $50M ARR, Series B funding, 10x revenue growth',
								metrics: JSON.stringify({
									revenue: '$50M ARR',
									teamGrowth: '10 to 100 engineers',
									funding: 'Series B $30M'
								})
							},
							{
								title: 'Built Marketplace Platform from Scratch',
								description: 'Architected and launched two-sided marketplace serving 100K+ users',
								company: 'MarketHub',
								outcome: 'Reached 100K users in 6 months, acquired by competitor',
								metrics: JSON.stringify({
									users: '100K+',
									timeToMarket: '6 months',
									exit: 'Acquired'
								})
							}
						]
					}
				}
			}
		}
	});

	const cto2 = await prisma.user.create({
		data: {
			email: 'mike.cto@example.com',
			password,
			name: 'Mike Rodriguez',
			emailVerified: true,
			role: 'CTO',
			profile: {
				create: {
					bio: 'AI/ML expert and technical advisor',
					linkedin: 'https://linkedin.com/in/mikerodriguez',
					github: 'https://github.com/mikerodriguez'
				}
			},
			ctoProfile: {
				create: {
					title: 'AI/ML Expert, Former VP Engineering at DataCorp',
					bio: '12 years building AI-powered products. Deep expertise in machine learning, data engineering, and scalable systems. Helped 15+ companies implement AI strategies and build ML infrastructure.',
					yearsExperience: 12,
					hourlyRate: 200,
					availability: 'LIMITED',
					skills: [
						'Machine Learning',
						'Data Engineering',
						'AI Strategy',
						'Python',
						'TensorFlow',
						'System Design'
					],
					industries: ['AI/ML', 'Data', 'SaaS', 'Healthcare'],
					techStack: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Docker', 'Kubernetes', 'Go'],
					companiesLed: 2,
					teamSize: 50,
					verified: true,
					featured: false,
					rating: 4.8,
					reviewCount: 18
				}
			}
		}
	});

	const cto3 = await prisma.user.create({
		data: {
			email: 'lisa.cto@example.com',
			password,
			name: 'Lisa Wang',
			emailVerified: true,
			role: 'CTO',
			profile: {
				create: {
					bio: 'Mobile-first product expert',
					linkedin: 'https://linkedin.com/in/lisawang'
				}
			},
			ctoProfile: {
				create: {
					title: 'Mobile Product Expert, Ex-Uber, Ex-Airbnb',
					bio: '10 years building mobile-first products at scale. Led mobile engineering at Uber and Airbnb. Expert in React Native, iOS, Android, and cross-platform development.',
					yearsExperience: 10,
					hourlyRate: 180,
					availability: 'AVAILABLE',
					skills: [
						'Mobile Development',
						'React Native',
						'iOS',
						'Android',
						'Product Strategy',
						'UX'
					],
					industries: ['Mobile', 'Consumer', 'Marketplace', 'Travel'],
					techStack: [
						'React Native',
						'Swift',
						'Kotlin',
						'Firebase',
						'GraphQL',
						'Node.js'
					],
					companiesLed: 1,
					teamSize: 30,
					verified: true,
					featured: true,
					rating: 4.7,
					reviewCount: 12
				}
			}
		}
	});

	// Create sample project
	console.log('📊 Creating sample project...');

	const project1 = await prisma.project.create({
		data: {
			userId: user1.id,
			title: 'AI-Powered Customer Support Platform',
			description:
				'Building a SaaS platform that uses AI to automate customer support. Need help with technical architecture, AI implementation, and scaling strategy.',
			industry: 'SaaS',
			budget: '$100K - $500K',
			status: 'ANALYZING',
			healthScore: 75,
			complexity: 'High',
			timeline: '6-9 months',
			estimatedBudget: '$200K - $400K',
			techStack: ['React', 'Node.js', 'PostgreSQL', 'OpenAI', 'AWS'],
			risks: JSON.stringify([
				{
					title: 'AI Model Accuracy',
					description: 'Ensuring AI responses are accurate and helpful',
					severity: 'High',
					mitigation: 'Implement human-in-the-loop review system'
				}
			]),
			recommendations: JSON.stringify([
				{
					title: 'Start with MVP',
					description: 'Focus on one use case first',
					priority: 'High',
					impact: 'Faster time to market'
				}
			])
		}
	});

	// Create matches
	console.log('🎯 Creating matches...');

	await prisma.match.createMany({
		data: [
			{
				projectId: project1.id,
				ctoId: cto1.id,
				score: 92,
				reasons: [
					'92% match based on skills and experience',
					'Expertise in SaaS, B2B',
					'15 years of experience'
				],
				status: 'PENDING'
			},
			{
				projectId: project1.id,
				ctoId: cto2.id,
				score: 88,
				reasons: [
					'88% match based on AI/ML expertise',
					'Expertise in AI/ML, Data, SaaS',
					'12 years of experience'
				],
				status: 'PENDING'
			}
		]
	});

	// Create sample booking
	console.log('📅 Creating sample booking...');

	await prisma.booking.create({
		data: {
			userId: user1.id,
			ctoId: cto1.id,
			ctoProfileId: cto1.ctoProfile!.id,
			title: 'Technical Architecture Review',
			description: 'Review current architecture and provide recommendations',
			startDate: new Date('2024-11-01'),
			endDate: new Date('2024-11-15'),
			hours: 10,
			hourlyRate: 250,
			totalAmount: 2500,
			status: 'COMPLETED'
		}
	});

	// Create sample reviews
	console.log('⭐ Creating sample reviews...');

	await prisma.review.create({
		data: {
			userId: user1.id,
			ctoId: cto1.id,
			rating: 5,
			comment:
				'Sarah was incredibly helpful! Her insights on our architecture saved us months of work. Highly recommend!'
		}
	});

	console.log('✅ Database seeded successfully!');
	console.log('\n📊 Summary:');
	console.log('- 4 users created (1 founder, 3 CTOs)');
	console.log('- 3 CTO profiles with success stories');
	console.log('- 1 sample project with AI analysis');
	console.log('- 2 CTO matches');
	console.log('- 1 completed booking');
	console.log('- 1 review');
	console.log('\n🔐 Test credentials:');
	console.log('Founder: founder@example.com / Test123!@#');
	console.log('CTO 1: sarah.cto@example.com / Test123!@#');
	console.log('CTO 2: mike.cto@example.com / Test123!@#');
	console.log('CTO 3: lisa.cto@example.com / Test123!@#');
}

main()
	.catch((e) => {
		console.error('❌ Seeding error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

