# CTOrendang API Documentation

**Version**: 1.0.0  
**Base URL**: `https://ctorendang.com/api`  
**Authentication**: Session-based (cookies)

---

## 📋 TABLE OF CONTENTS

1. [Authentication](#authentication)
2. [Projects](#projects)
3. [CTO Profiles](#cto-profiles)
4. [Subscriptions](#subscriptions)
5. [Bookings](#bookings)
6. [Messages](#messages)
7. [Reviews](#reviews)
8. [Admin](#admin)
9. [Uploads](#uploads)
10. [Webhooks](#webhooks)

---

## 🔐 AUTHENTICATION

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### Logout
```http
POST /api/auth/logout
```

### OAuth
```http
GET /auth/google
GET /auth/github
```

---

## 📊 PROJECTS

### Analyze Project
```http
POST /api/projects/analyze
Content-Type: application/json
Cookie: session=...

{
  "title": "AI SaaS Platform",
  "description": "Building an AI-powered customer support platform...",
  "industry": "SaaS",
  "budget": "$100K - $500K",
  "timeline": "6 months",
  "teamSize": 5
}
```

**Response:**
```json
{
  "success": true,
  "project": {
    "id": "clx...",
    "title": "AI SaaS Platform",
    "status": "MATCHED"
  },
  "analysis": {
    "healthScore": 85,
    "complexity": "High",
    "estimatedTimeline": "6-9 months",
    "estimatedBudget": "$200K - $400K",
    "techStack": [...],
    "risks": [...],
    "recommendations": [...]
  },
  "matches": [
    {
      "ctoId": "clx...",
      "score": 92,
      "name": "Sarah Chen",
      "title": "Former CTO at TechCorp"
    }
  ]
}
```

---

## 👔 CTO PROFILES

### Create/Update Profile
```http
POST /api/cto/profile
Content-Type: application/json
Cookie: session=...

{
  "title": "Senior CTO with 15 years experience",
  "bio": "Experienced CTO...",
  "yearsExperience": 15,
  "hourlyRate": 250,
  "skills": ["Technical Strategy", "Team Building"],
  "industries": ["SaaS", "Fintech"],
  "techStack": ["React", "Node.js", "AWS"],
  "availability": "AVAILABLE"
}
```

### Get Profile
```http
GET /api/cto/profile
Cookie: session=...
```

### Search CTOs
```http
GET /api/cto/search?skills=React,Node.js&minExperience=10&maxRate=300
```

**Query Parameters:**
- `skills` - Comma-separated skills
- `industries` - Comma-separated industries
- `minRate` - Minimum hourly rate
- `maxRate` - Maximum hourly rate
- `minExperience` - Minimum years of experience
- `availability` - AVAILABLE, LIMITED, UNAVAILABLE
- `minRating` - Minimum rating (0-5)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)

### Get Single CTO
```http
GET /api/cto/{userId}
```

---

## 💳 SUBSCRIPTIONS

### Create Checkout Session
```http
POST /api/subscriptions/checkout
Content-Type: application/json
Cookie: session=...

{
  "tier": "PROFESSIONAL",
  "successUrl": "https://ctorendang.com/dashboard?success=true",
  "cancelUrl": "https://ctorendang.com/pricing"
}
```

**Tiers:** `STARTER`, `PROFESSIONAL`, `BUSINESS`, `ENTERPRISE`

### Cancel Subscription
```http
POST /api/subscriptions/cancel
Cookie: session=...
```

### Get Customer Portal
```http
POST /api/subscriptions/portal
Cookie: session=...
```

### Get Subscription Status
```http
GET /api/subscriptions/status
Cookie: session=...
```

---

## 📅 BOOKINGS

### Create Booking
```http
POST /api/bookings/create
Content-Type: application/json
Cookie: session=...

{
  "ctoId": "clx...",
  "title": "Technical Architecture Review",
  "description": "Need help reviewing our system architecture",
  "startDate": "2024-11-01T09:00:00Z",
  "endDate": "2024-11-15T17:00:00Z",
  "hours": 10
}
```

### List Bookings
```http
GET /api/bookings/list?role=client&status=CONFIRMED&page=1&limit=20
Cookie: session=...
```

**Query Parameters:**
- `role` - `client` or `cto`
- `status` - PENDING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
- `page` - Page number
- `limit` - Results per page

### Get Booking
```http
GET /api/bookings/{bookingId}
Cookie: session=...
```

### Update Booking Status
```http
PATCH /api/bookings/{bookingId}
Content-Type: application/json
Cookie: session=...

{
  "status": "COMPLETED"
}
```

---

## 💬 MESSAGES

### Get Conversations
```http
GET /api/messages/conversations
Cookie: session=...
```

### Get Messages with User
```http
GET /api/messages/{userId}?page=1&limit=50
Cookie: session=...
```

---

## ⭐ REVIEWS

### Create Review
```http
POST /api/reviews/create
Content-Type: application/json
Cookie: session=...

{
  "ctoId": "clx...",
  "bookingId": "clx...",
  "rating": 5,
  "comment": "Excellent guidance! Highly recommend."
}
```

### Get CTO Reviews
```http
GET /api/reviews/{ctoId}?page=1&limit=20&rating=5
```

---

## 🔧 ADMIN

### List Users
```http
GET /api/admin/users?role=CTO&page=1&limit=50
Cookie: session=... (Admin only)
```

### Update User
```http
PATCH /api/admin/users
Content-Type: application/json
Cookie: session=... (Admin only)

{
  "userId": "clx...",
  "role": "CTO",
  "emailVerified": true
}
```

### Verify CTO
```http
POST /api/admin/ctos/verify
Content-Type: application/json
Cookie: session=... (Admin only)

{
  "ctoId": "clx...",
  "verified": true
}
```

### Feature CTO
```http
POST /api/admin/ctos/feature
Content-Type: application/json
Cookie: session=... (Admin only)

{
  "ctoId": "clx...",
  "featured": true
}
```

### Analytics Overview
```http
GET /api/admin/analytics/overview?period=30
Cookie: session=... (Admin only)
```

---

## 📤 UPLOADS

### Upload Avatar
```http
POST /api/upload/avatar
Content-Type: multipart/form-data
Cookie: session=...

file: [binary data]
```

---

## 🔔 WEBHOOKS

### Stripe Webhook
```http
POST /api/webhooks/stripe
Stripe-Signature: t=...,v1=...

[Stripe event payload]
```

**Events Handled:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`
- `payment_intent.succeeded`

---

## 🔒 AUTHENTICATION

All authenticated endpoints require a valid session cookie.

**Headers:**
```http
Cookie: auth_session=...
```

**Error Responses:**
```json
{
  "error": "Authentication required"
}
```

---

## ⚠️ ERROR CODES

| Code | Description |
|------|-------------|
| 400 | Bad Request - Validation failed |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## 🚀 RATE LIMITS

- **Default**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes
- **Admin endpoints**: 10 requests per 15 minutes

**Headers:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699564800
```

---

## 📝 NOTES

- All timestamps are in ISO 8601 format
- All amounts are in USD cents
- Pagination starts at page 1
- Default page size is 20 items

---

**Last Updated**: October 14, 2024  
**API Version**: 1.0.0

