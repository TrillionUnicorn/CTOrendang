// Load Testing Script using k6
// Run with: k6 run scripts/load-test.js

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
	stages: [
		{ duration: '30s', target: 10 }, // Ramp up to 10 users
		{ duration: '1m', target: 50 }, // Ramp up to 50 users
		{ duration: '2m', target: 100 }, // Ramp up to 100 users
		{ duration: '1m', target: 50 }, // Ramp down to 50 users
		{ duration: '30s', target: 0 } // Ramp down to 0 users
	],
	thresholds: {
		http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
		http_req_failed: ['rate<0.01'], // Error rate should be less than 1%
		errors: ['rate<0.1'] // Custom error rate should be less than 10%
	}
};

const BASE_URL = __ENV.BASE_URL || 'https://ctorendang.com';

export default function () {
	// Test 1: Homepage
	let res = http.get(`${BASE_URL}/`);
	check(res, {
		'homepage status is 200': (r) => r.status === 200,
		'homepage loads in <500ms': (r) => r.timings.duration < 500
	}) || errorRate.add(1);

	sleep(1);

	// Test 2: Health check
	res = http.get(`${BASE_URL}/api/health`);
	check(res, {
		'health check status is 200': (r) => r.status === 200,
		'health check is healthy': (r) => JSON.parse(r.body).status === 'healthy'
	}) || errorRate.add(1);

	sleep(1);

	// Test 3: CTO search
	res = http.get(`${BASE_URL}/api/cto/search?page=1&limit=20`);
	check(res, {
		'search status is 200': (r) => r.status === 200,
		'search returns data': (r) => JSON.parse(r.body).success === true
	}) || errorRate.add(1);

	sleep(2);

	// Test 4: Product page
	res = http.get(`${BASE_URL}/product`);
	check(res, {
		'product page status is 200': (r) => r.status === 200
	}) || errorRate.add(1);

	sleep(1);
}

// Setup function (runs once at the start)
export function setup() {
	console.log('Starting load test...');
	console.log(`Target URL: ${BASE_URL}`);
}

// Teardown function (runs once at the end)
export function teardown(data) {
	console.log('Load test complete!');
}

