export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-indigo-600">JobPilot AI</p>
        <h1 className="mt-2 text-4xl font-semibold">
          Node 24 + Prisma 8 starter
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Projektet bruger Prisma 8 contracts og den nye PostgreSQL ORM runtime.
        </p>
      </div>
    </main>
  );
}
