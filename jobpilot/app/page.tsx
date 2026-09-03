export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-indigo-600">JobPilot AI</p>
        <h1 className="mt-2 text-4xl font-semibold">MVP backend er klar</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Prisma, PostgreSQL og de første API routes er sat op. Næste skridt er
          auth, seed-data og dashboardet fra Figma.
        </p>
      </div>
    </main>
  );
}
