"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [farms, setFarms] = useState(0);
  const [flocks, setFlocks] = useState(0);
  const [birds, setBirds] = useState(0);
  const [eggs, setEggs] = useState(0);
  const [sales, setSales] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.replace("/login");
        return;
      }

      setEmail(userData.user.email ?? "");

      const { data: farmData } = await supabase
        .from("farms")
        .select("id")
        .eq("user_id", userData.user.id);

      const farmIds = (farmData || []).map((f: any) => f.id);
      setFarms(farmIds.length);

      if (!farmIds.length) return;

      const { data: flockData } = await supabase
        .from("flocks")
        .select("current_count")
        .in("farm_id", farmIds);

      setFlocks((flockData || []).length);
      setBirds(
        (flockData || []).reduce(
          (sum: number, f: any) => sum + Number(f.current_count || 0),
          0
        )
      );

      const { data: productionData } = await supabase
        .from("production_records")
        .select("eggs_count,flocks!inner(farm_id)")
        .in("flocks.farm_id", farmIds);

      setEggs(
        (productionData || []).reduce(
          (sum: number, p: any) => sum + Number(p.eggs_count || 0),
          0
        )
      );

      const { data: financeData } = await supabase
        .from("financial_records")
        .select("type,amount")
        .in("farm_id", farmIds);

      setSales(
        (financeData || [])
          .filter((r: any) => r.type === "sale")
          .reduce((sum: number, r: any) => sum + Number(r.amount || 0), 0)
      );

      setExpenses(
        (financeData || [])
          .filter((r: any) => r.type === "expense")
          .reduce((sum: number, r: any) => sum + Number(r.amount || 0), 0)
      );
    }

    loadDashboard();
  }, [router]);

  const profit = sales - expenses;

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-950">
              Poultriva Dashboard
            </h1>
            <p className="mt-2 text-gray-600">Welcome back, {email}</p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white"
          >
            Logout
          </button>
        </div>

        <nav className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-9">
          <a href="/dashboard" className="rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white">Dashboard</a>
          <a href="/dashboard/farms/new" className="rounded-xl bg-white px-4 py-3 text-center font-semibold text-green-900 shadow">Farms</a>
          <a href="/dashboard/flocks" className="rounded-xl bg-white px-4 py-3 text-center font-semibold text-green-900 shadow">Flocks</a>
          <a href="/dashboard/feed" className="rounded-xl bg-white px-4 py-3 text-center font-semibold text-green-900 shadow">Feed</a>
          <a href="/dashboard/mortality" className="rounded-xl bg-white px-4 py-3 text-center font-semibold text-green-900 shadow">Mortality</a>
          <a href="/dashboard/production" className="rounded-xl bg-white px-4 py-3 text-center font-semibold text-green-900 shadow">Production</a>
          <a href="/dashboard/finance" className="rounded-xl bg-white px-4 py-3 text-center font-semibold text-green-900 shadow">Finance</a>
          <a href="/dashboard/profit" className="rounded-xl bg-white px-4 py-3 text-center font-semibold text-green-900 shadow">Profit/Loss</a>
        <a href="/dashboard/ai" className="rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white">AI Assistant</a></nav>
        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-green-950">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <a href="/dashboard/farms/new" className="rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white">+ Add Farm</a>
            <a href="/dashboard/flocks/new" className="rounded-xl bg-green-100 px-4 py-3 text-center font-semibold text-green-900">+ Add Flock</a>
            <a href="/dashboard/feed" className="rounded-xl bg-green-100 px-4 py-3 text-center font-semibold text-green-900">+ Feed Record</a>
            <a href="/dashboard/production" className="rounded-xl bg-green-100 px-4 py-3 text-center font-semibold text-green-900">+ Production</a>
            <a href="/dashboard/finance" className="rounded-xl bg-green-100 px-4 py-3 text-center font-semibold text-green-900">+ Finance</a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-green-950">Farm Overview</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">Active Flocks</p>
              <p className="mt-1 text-2xl font-bold text-green-900">{flocks}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-gray-500">Current Birds</p>
              <p className="mt-1 text-2xl font-bold text-blue-900">{birds}</p>
            </div>
            <div className="rounded-xl bg-yellow-50 p-4">
              <p className="text-sm text-gray-500">Eggs Recorded</p>
              <p className="mt-1 text-2xl font-bold text-yellow-900">{eggs}</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-4">
              <p className="text-sm text-gray-500">Net Profit/Loss</p>
              <p className="mt-1 text-2xl font-bold text-purple-900">₦{profit.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Farms</p>
            <h2 className="mt-2 text-3xl font-bold">{farms}</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Flocks</p>
            <h2 className="mt-2 text-3xl font-bold">{flocks}</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Current Birds</p>
            <h2 className="mt-2 text-3xl font-bold">{birds}</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Eggs</p>
            <h2 className="mt-2 text-3xl font-bold">{eggs}</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Sales</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">
              ₦{sales.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Expenses</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              ₦{expenses.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow md:col-span-3">
            <p className="text-gray-500">Net Profit / Loss</p>
            <h2
              className={`mt-2 text-4xl font-bold ${
                profit >= 0 ? "text-green-700" : "text-red-600"
              }`}
            >
              ₦{profit.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
