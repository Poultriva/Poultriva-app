import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 text-gray-900">
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-green-700">
            Poultriva
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-green-950 md:text-6xl">
            Smart Poultry Farm Management & AI
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Poultriva is a digital poultry farm management platform designed
            to help poultry farmers organize farm records, monitor flock
            performance, track production and finances, and make better
            decisions with AI-assisted insights.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-green-700 px-7 py-3 font-semibold text-black shadow hover:bg-green-800"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-white bg-white px-7 py-3 font-semibold text-green-950 hover:bg-green-50"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-5 text-sm text-green-700">
            Free early access is currently available while we improve the
            platform with feedback from poultry farmers.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-semibold text-green-700">OUR SERVICES</p>

            <h2 className="mt-2 text-3xl font-bold text-green-950 md:text-4xl">
              Everything You Need to Manage Your Poultry Farm
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Poultriva brings essential poultry farm records and management
              tools together in one simple online platform.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-950">
                Farm & Flock Management
              </h3>
              <p className="mt-3 text-gray-600">
                Create and manage farms, flocks, bird numbers and flock
                records in one place.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-950">
                Feed Management
              </h3>
              <p className="mt-3 text-gray-600">
                Record feed usage and costs to monitor consumption and
                understand feeding expenses.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-950">
                Production Tracking
              </h3>
              <p className="mt-3 text-gray-600">
                Record egg production and monitor important production
                information for your poultry operation.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-950">
                Mortality Records
              </h3>
              <p className="mt-3 text-gray-600">
                Record mortality and keep current flock numbers updated as
                your birds change over time.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-950">
                Expenses, Sales & Profit
              </h3>
              <p className="mt-3 text-gray-600">
                Record farm expenses and sales and monitor your estimated
                financial results.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-green-950">
                AI Farm Assistant
              </h3>
              <p className="mt-3 text-gray-600">
                Get AI-assisted insights and practical guidance based on your
                poultry farm records and questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-semibold text-green-700">WHO POULTRIVA IS FOR</p>

          <h2 className="mt-2 text-3xl font-bold text-green-950">
            Built for Poultry Farmers
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-gray-600">
            Poultriva is designed for poultry farmers and farm operators who
            want a simpler way to keep farm records, monitor flock activities,
            understand production and manage farm finances.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-green-950">Small Farms</h3>
              <p className="mt-2 text-sm text-gray-600">
                Keep important farm records organized as your operation grows.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-green-950">Growing Farms</h3>
              <p className="mt-2 text-sm text-gray-600">
                Monitor multiple flocks, production, feed and expenses.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-bold text-green-950">Farm Operators</h3>
              <p className="mt-2 text-sm text-gray-600">
                Use organized records and AI-assisted information to support
                farm management decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-950 px-6 py-16 text-gray-600">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold text-green-300">ACCESS TO POULTRIVA</p>

          <h2 className="mt-2 text-3xl font-bold">
            Start Using Poultriva Today
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Poultriva is currently available with free early access as we
            continue improving the platform. Paid plans and premium features
            may be introduced as the service develops.
          </p>

          <div className="mt-8 rounded-2xl bg-white/10 p-6 text-left">
            <h3 className="text-lg font-bold">What Poultriva provides</h3>

            <ul className="mt-4 space-y-2 text-gray-600">
              <li>• Digital poultry farm management</li>
              <li>• Flock and production record keeping</li>
              <li>• Feed, mortality and financial tracking</li>
              <li>• AI-assisted farm information and insights</li>
              <li>• Online access to organized farm records</li>
            </ul>
          </div>

          <Link
            href="/register"
            className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-green-950 hover:bg-green-50"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-green-950">
            Need Help With Poultriva?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            If you have questions about the platform, your farm records or
            using Poultriva, our support team is available to assist.
          </p>

          <Link
            href="/dashboard/contact"
            className="mt-6 inline-block rounded-lg border border-green-700 px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
          >
            Contact Support
          </Link>
        </div>
      </section>

      <footer className="border-t bg-gray-50 px-6 py-8 text-center text-sm text-gray-600">
        <p className="font-semibold text-green-900">Poultriva</p>
        <p className="mt-2">Smart Poultry Farm Management & AI</p>
        <p className="mt-2">
          Farm management • Flock tracking • Production • Finance • AI
          assistance
        </p>
        <p className="mt-4">© 2026 Poultriva. All rights reserved.</p>
      </footer>
    </main>
  );
}
