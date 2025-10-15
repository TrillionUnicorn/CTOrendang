// Robots.txt Generator
// GET /robots.txt

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/

Sitemap: https://ctorendang.com/sitemap.xml`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};

