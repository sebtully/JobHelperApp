# JobPilot AI — Node 24 + Prisma 8

Denne version bruger Prisma 8's nye contract-baserede arkitektur.

## Stack

- Node.js 24+
- Next.js 16.3
- TypeScript
- Tailwind CSS 4
- PostgreSQL
- Prisma 8
- `@prisma/orm-postgres`
- Zod

## Vigtigt: Prisma 8 er ikke Prisma 7 med nyt versionsnummer

Prisma 8 bruger:

- `src/prisma/contract.prisma`
- `contract emit`
- `contract.json` + `contract.d.ts`
- `@prisma/orm-postgres/runtime`
- `db.orm.public.Model`
- `db init / db verify`
- ny migration-workflow

Der bruges derfor ikke `PrismaClient`, `@prisma/client` eller
`@prisma/adapter-pg` i denne version.

## 1. Node

Projektet er pinned til Node 24 via:

- `.nvmrc`
- `.node-version`
- `package.json > engines`

Kontrollér:

```bash
node -v
```

Du bør se Node 24.x eller nyere.

## 2. Installér

```bash
npm install
```

## 3. Database

Kopiér env-filen:

```bash
cp .env.example .env
```

Indsæt din PostgreSQL connection string:

```env
DATABASE_URL="postgresql://..."
```

Prisma 8's runtime læser `DATABASE_URL` fra process environment.
Hvis din hostingplatform ikke automatisk loader `.env`, skal variablen
tilføjes i platformens environment variables.

## 4. Emit contract

```bash
npm run contract:emit
```

Det genererer:

```text
src/prisma/contract.json
src/prisma/contract.d.ts
```

Commit gerne begge filer til Git.

## 5. Initialisér en TOM database

Hvis databasen endnu ikke har tabeller:

```bash
npm run db:init
```

Det emitter contracten, opretter strukturen og signer databasen.

Kontrollér bagefter:

```bash
npm run db:verify
```

## Hvis databasen allerede har tabeller

Stop før `db:init`.

Brug i stedet Prisma 8's existing-project flow:

```bash
npx prisma@latest contract infer
npx prisma@latest contract emit
npx prisma@latest db sign
```

## 6. Start appen

```bash
npm run dev
```

Test:

```text
http://localhost:3000/api/health
http://localhost:3000/api/jobs
```

## Prisma 8 query-eksempel

Prisma 7:

```ts
const jobs = await prisma.job.findMany({
  where: { isActive: true }
});
```

Prisma 8:

```ts
const jobs = await db.orm.public.Job
  .where({ isActive: true })
  .all();
```

## Ændring af datamodellen senere

Redigér:

```text
src/prisma/contract.prisma
```

Derefter:

```bash
npm run contract:emit
npm run db:plan
npm run db:migrate
```

Review migrationsplanen før production.

## Deploy

Sæt minimum:

```env
DATABASE_URL=...
```

Build-kommandoen er:

```bash
npm run build
```

Den kører automatisk `contract:emit` før `next build`.

## Næste trin

1. Tilføj auth
2. Seed første bruger / demo-data
3. Byg dashboardet fra Figma
4. Job ingestion
5. AI matchscore
6. CV parser
7. AI CV variant + ansøgning
