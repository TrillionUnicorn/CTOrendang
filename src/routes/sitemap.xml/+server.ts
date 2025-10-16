// Sitemap Generator
// GET /sitemap.xml

import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const baseUrl = 'https://ctorendang.com';

	// Static pages
	const staticPages = [
		{ url: '', priority: 1.0, changefreq: 'daily' },
		{ url: '/product', priority: 0.9, changefreq: 'weekly' },
		{ url: '/pitch', priority: 0.8, changefreq: 'monthly' },
		{ url: '/contact', priority: 0.7, changefreq: 'monthly' },
		{ url: '/pricing', priority: 0.9, changefreq: 'weekly' }
	];

	// Get all CTO profiles
	const ctoProfiles = await prisma.cTOProfile.findMany({
		where: { verified: true },
		select: {
			userId: true,
			updatedAt: true
		}
	});

	// Build sitemap XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${ctoProfiles
	.map(
		(cto) => `  <url>
    <loc>${baseUrl}/cto/${cto.userId}</loc>
    <lastmod>${cto.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};

