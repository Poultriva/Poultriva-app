import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            Poultriva
          </p>

          <h1 className="mt-4 text-5xl font-bold text-green-950 md:text-6xl">
            Smart Poultry Farm Management & AI
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Poultriva helps poultry farmers manage farms, flocks, feed,
            mortality, egg production, expenses and profit in one simple
            platform — with AI-powered farm assistance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-green-700 px-7 py-3 font-semibold text-white shadow"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-green-700 bg-white px-7 py-3 font-semibold text-green-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-950">
              Everything You Need to Manage Your Poultry Farm
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Keep your farm records organized and make better decisions using
              real farm data.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Farm & Flock Management</h3>
              <p className="mt-3 text-gray-600">
                Manage multiple farms, flocks, bird numbers and flock records
                in one place.
              </p>
            </div>

            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Feed Tracking</h3>
              <p className="mt-3 text-gray-600">
                Record feed usage and costs to understand how much your flock
                consumes.
              </p>
            </div>

            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Egg Production</h3>
              <p className="mt-3 text-gray-600">
                Track egg production and monitor changes in your flock's
                performance.
              </p>
            </div>

            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Mortality Records</h3>
              <p className="mt-3 text-gray-600">
                Record bird losses and keep your flock numbers up to date.
              </p>
            </div>

            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Expenses & Profit</h3>
              <p className="mt-3 text-gray-600">
                Track farm expenses and sales and see your estimated profit or
                loss.
              </p>
            </div>

            <div className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold">AI Farm Assistant</h3>
              <p className="mt-3 text-gray-600">
                Get AI-assisted insights about feed, flock care, mortality,
                production and farm performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-green-900 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">
            Start Managing Your Poultry Farm Smarter
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            Create your Poultriva account and start organizing your poultry
            farm records today.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-green-900"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      <footer className="border-t bg-white px-6 py-8 text-center text-sm text-gray-500">
        <p>© 2026 Poultriva. Smart Poultry Farm Management & AI.</p>
        <p className="mt-2">
          Farm management • Production tracking • Financial records • AI
          assistance
        </p>
      </footer>
    </main>
  );
}
