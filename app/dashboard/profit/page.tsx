"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfitPage() {
  const [sales, setSales] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    async function loadFinance() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from("financial_records")
        .select("type,amount,farms!inner(user_id)")
        .eq("farms.user_id", userData.user.id);

      const records = data || [];

      const totalSales = records
        .filter((r: any) => r.type === "sale")
        .reduce((sum: number, r: any) => sum + Number(r.amount || 0), 0);

      const totalExpenses = records
        .filter((r: any) => r.type === "expense")
        .reduce((sum: number, r: any) => sum + Number(r.amount || 0), 0);

      setSales(totalSales);
      setExpenses(totalExpenses);
    }

    loadFinance();
  }, []);

  const profit = sales - expenses;

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-green-950">
          Profit & Loss
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
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

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">Net Profit / Loss</p>
            <h2
              className={`mt-2 text-3xl font-bold ${
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
