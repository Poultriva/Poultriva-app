import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Poultriva
        </p>

        <h1 className="mt-4 text-5xl font-bold text-green-950">
          Smart Poultry Farm Management & AI
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Manage your farms, flocks, feed, eggs, mortality, expenses and profit
          in one simple platform — with AI assistance.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/register"
            className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-green-700 px-6 py-3 font-semibold text-green-700"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Farm Management</h2>
            <p className="mt-2 text-gray-600">
              Manage farms and flocks easily.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Production Tracking</h2>
            <p className="mt-2 text-gray-600">
              Track feed, eggs, mortality and expenses.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">AI Farm Assistant</h2>
            <p className="mt-2 text-gray-600">
              Get smart insights and recommendations for your farm.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
