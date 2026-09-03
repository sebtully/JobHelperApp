# JobPilot AI – starter

MVP-starter for job finder / AI application assistant.

## Stack

- Next.js 16.3
- TypeScript
- PostgreSQL
- Prisma ORM 7.10
- Zod
- Tailwind CSS 4

## 1. Install

```bash
npm install
```

## 2. Database

Copy env:

```bash
cp .env.example .env
```

Set `DATABASE_URL`.

Then:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

## 3. Run

```bash
npm run dev
```

Open:

- `/`
- `/api/health`
- `/api/jobs`
- `/api/search-profiles`
- `/api/applications`

## Example: create search profile

```bash
curl -X POST http://localhost:3000/api/search-profiles \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "YOUR_USER_ID",
    "name": "Junior softwareudvikler Aarhus",
    "jobTitles": ["Junior Software Developer"],
    "location": "Aarhus",
    "radiusKm": 15,
    "minimumMatchScore": 60
  }'
```

## Next steps

1. Auth
2. dashboard from Figma
3. job ingestion
4. job matching service
5. resume upload/parser
6. AI cover-letter + CV variant generation

## Note about Prisma

This starter intentionally pins Prisma 7.x. The schema is classic PSL and the app uses the PostgreSQL driver adapter. Prisma 8 is current, but its newer scaffolding and contract-first workflow are a larger change than we need for this MVP.
