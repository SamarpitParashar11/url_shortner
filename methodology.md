# Distributed URL Shortener MVP (4-Day Execution Plan)

> Goal: Build and deploy a functional MVP of a URL Shortener with:
- URL shortening
- Redirection
- PostgreSQL storage
- Redis caching
- Basic analytics
- Rate limiting
- Docker deployment

---

# 1. MVP Scope (IMPORTANT)

Since you only have HTML + CSS knowledge, DO NOT try to build:
- Full distributed architecture
- Load balancing
- Kubernetes
- Horizontal scaling
- Complex dashboard
- Authentication

Your MVP should focus on:
✅ Backend fundamentals  
✅ Database integration  
✅ Real API development  
✅ Redis caching  
✅ Deployment  

---

# 2. Final MVP Architecture

```text
Frontend (HTML + JS)
        ↓
Express API Server
        ↓
Redis Cache
        ↓
PostgreSQL Database
```

---

# 3. Final Tech Stack

## Frontend
- HTML
- CSS
- Vanilla JavaScript

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL
- Prisma ORM

## Cache
- Redis

## Deployment
- Docker
- Render/Railway

---

# 4. Folder Structure

```text
url-shortener/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

# DAY 1 — Backend Fundamentals + URL Shortening Core

# Goal
Create working backend APIs.

---

# Step 1 — Setup Project

## Install Node.js
Use:
- https://nodejs.org

---

# Step 2 — Initialize Backend

```bash
mkdir url-shortener
cd url-shortener

npm init -y
```

---

# Step 3 — Install Dependencies

```bash
npm install express cors dotenv
npm install nodemon --save-dev
```

---

# Step 4 — Create Express Server

## server.js

```js
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(5000, () => {
    console.log("Server started");
});
```

---

# Step 5 — Learn REST APIs

Understand:

## POST Request
Used for:
- shortening URL

## GET Request
Used for:
- redirection

---

# Step 6 — Create URL Routes

## Required APIs

### POST /shorten

Input:

```json
{
  "url": "https://google.com"
}
```

Output:

```json
{
  "shortCode": "abc123"
}
```

---

### GET /:code

Redirects to original URL.

---

# Step 7 — Implement Base62 Encoding

## Learn Concept

Convert:
- numbers → short strings

Example:

```text
125 → cb
```

Characters:

```text
a-z
A-Z
0-9
```

---

# Step 8 — Generate Short Codes

Temporary logic:

```js
Math.random().toString(36).substring(2,8)
```

---

# Day 1 Deliverables

✅ Express server working  
✅ URL shortening API  
✅ Redirect API  
✅ Random short code generation  
✅ Tested in Postman  

---

# DAY 2 — PostgreSQL + Prisma Integration

# Goal
Store URLs permanently.

---

# Step 1 — Install PostgreSQL

Use:
- https://www.postgresql.org

---

# Step 2 — Install Prisma

```bash
npm install prisma @prisma/client
```

Initialize:

```bash
npx prisma init
```

---

# Step 3 — Configure Database

Inside `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/urlshortener"
```

---

# Step 4 — Design Database Schema

## prisma/schema.prisma

```prisma
model Url {
  id        Int      @id @default(autoincrement())
  original  String
  shortCode String   @unique
  clicks    Int      @default(0)
  createdAt DateTime @default(now())
}
```

---

# Step 5 — Run Migration

```bash
npx prisma migrate dev --name init
```

---

# Step 6 — Save URLs in Database

When user shortens URL:

```text
URL → DB save → return shortcode
```

---

# Step 7 — Redirect from Database

Flow:

```text
GET /abc123
↓
Find in DB
↓
Redirect
```

---

# Step 8 — Add Click Tracking

Whenever redirect occurs:

```text
clicks += 1
```

---

# Day 2 Deliverables

✅ PostgreSQL connected  
✅ Prisma ORM working  
✅ URLs stored permanently  
✅ Redirect working from DB  
✅ Click analytics implemented  

---

# DAY 3 — Redis + Rate Limiting + Validation

# Goal
Make project production-like.

---

# Step 1 — Install Redis

Use:
- https://redis.io

---

# Step 2 — Install Redis Client

```bash
npm install redis
```

---

# Step 3 — Implement Caching

Flow:

```text
GET /abc123
↓
Check Redis
↓
If found:
    return quickly
Else:
    fetch from PostgreSQL
    store in Redis
```

---

# Why Redis?

Without Redis:

```text
Every request → database hit
```

With Redis:

```text
Frequent URLs load instantly
```

---

# Step 4 — Add Rate Limiting

Install:

```bash
npm install express-rate-limit
```

---

# Middleware Example

```js
100 requests / 15 minutes
```

Purpose:
- Prevent spam
- Prevent abuse

---

# Step 5 — Add URL Validation

Install:

```bash
npm install validator
```

Check:
- valid URL
- empty inputs

---

# Step 6 — Add Error Handling

Return proper status codes:

```text
400 → bad request
404 → not found
500 → server error
```

---

# Day 3 Deliverables

✅ Redis caching working  
✅ Faster redirects  
✅ Rate limiting implemented  
✅ Validation added  
✅ Error handling completed  

---

# DAY 4 — Frontend + Docker + Deployment

# Goal
Deploy complete MVP online.

---

# Step 1 — Build Frontend

## index.html

Create:
- input box
- shorten button
- result display

---

# Step 2 — Connect Frontend to Backend

Use:

```js
fetch()
```

Send:
- POST request to backend

Display:
- shortened URL

---

# Step 3 — Dockerize Backend

## Create Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

---

# Step 4 — Create docker-compose.yml

Run:
- Node server
- PostgreSQL
- Redis

Together.

---

# Step 5 — Test Entire Flow

## Final Flow

```text
User enters URL
↓
Backend generates shortcode
↓
Stored in PostgreSQL
↓
Returned to frontend
↓
User opens short URL
↓
Redis cache checked
↓
Redirect to original URL
```

---

# Step 6 — Deploy

## Easiest Options

### Railway
- https://railway.app

OR

### Render
- https://render.com

---

# Step 7 — Final Testing

Test:
- URL shortening
- Redirects
- Redis cache
- Invalid URLs
- Rate limits

---

# Day 4 Deliverables

✅ Frontend completed  
✅ Docker working  
✅ Full stack integrated  
✅ Deployed online  
✅ Public project URL generated  

---

# 5. Core Backend Flow

# URL Shortening Flow

```text
Client sends URL
↓
Validate input
↓
Generate shortcode
↓
Save in PostgreSQL
↓
Return shortened URL
```

---

# Redirection Flow

```text
User opens short URL
↓
Check Redis
↓
If exists:
    redirect immediately
Else:
    query PostgreSQL
    save in Redis
    redirect
```

---

# 6. MVP Features Checklist

## Core

- [ ] URL shortening
- [ ] Redirection
- [ ] PostgreSQL integration
- [ ] Redis caching
- [ ] Analytics tracking
- [ ] Rate limiting
- [ ] Error handling

---

## Deployment

- [ ] Dockerized
- [ ] Deployed online
- [ ] Publicly accessible

---

# 7. Important Concepts You Must Understand

# Backend Concepts

## REST APIs
Communication between frontend and backend.

---

## Middleware
Functions executed before request reaches API.

Examples:
- rate limiting
- logging
- validation

---

## ORM
Prisma converts JS → SQL queries.

---

## Caching
Redis stores frequent data in RAM.

---

## Database Indexing
Improves query speed.

---

## Docker
Packages app + dependencies.

---

# 8. Recommended Learning Order DURING BUILDING

Do NOT try learning everything before building.

Learn JUST-IN-TIME.

---

# Day 1 Learning

- Express basics
- REST APIs
- JSON
- Routing

---

# Day 2 Learning

- PostgreSQL
- Prisma
- Database schema

---

# Day 3 Learning

- Redis
- Middleware
- Validation

---

# Day 4 Learning

- Docker
- Deployment
- Frontend API integration

---

# 9. Suggested API Structure

## Routes

```text
POST /shorten
GET /:code
GET /analytics/:code
```

---

# Example Analytics Response

```json
{
  "shortCode": "abc123",
  "clicks": 42,
  "createdAt": "2026-05-22"
}
```

---

# 10. Recommended NPM Packages

## Backend

```bash
express
cors
dotenv
prisma
@prisma/client
redis
express-rate-limit
validator
nodemon
```

---

# 11. Beginner Mistakes to Avoid

❌ Building frontend first  
❌ Learning React immediately  
❌ Watching tutorials endlessly  
❌ Using microservices  
❌ Trying Kubernetes  
❌ Overengineering  

---

# 12. What Recruiters Will Like

Even as MVP, this project demonstrates:

- Backend engineering
- API development
- Database integration
- Redis caching
- Docker knowledge
- Deployment skills
- System design understanding

This is already stronger than typical CRUD beginner projects.

---

# 13. Final Advice

Your main goal in 4 days is NOT:
- perfect code
- scalable architecture
- advanced distributed systems

Your goal is:

```text
Build something REAL and DEPLOYED.
```

That alone will teach you:
- debugging
- APIs
- backend flow
- databases
- deployment
- engineering thinking