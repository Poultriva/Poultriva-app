"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FinancePage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [farmId, setFarmId] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [recordDate, setRecordDate] = useState("");

  useEffect(() => {
    async function loadFarms() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from("farms")
        .select("id,name")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      setFarms(data || []);
    }

    loadFarms();
  }, []);

  async function save(e: any) {
    e.preventDefault();

    const financialAmount = Number(amount);

    if (!farmId) {
      alert("Please select a farm");
      return;
    }

    if (!Number.isFinite(financialAmount) || financialAmount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (!type) {
      alert("Please select a transaction type");
      return;
    }

    const { error } = await supabase.from("financial_records").insert({
      farm_id: farmId,
      type,
      category,
      amount: financialAmount,
      description,
      record_date: recordDate || null,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Financial record saved successfully");

    setCategory("");
    setAmount("");
    setDescription("");
    setRecordDate("");
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-950">
          Expenses & Sales
        </h1>

        <p className="mt-2 text-gray-600">
          Record farm expenses and sales.
        </p>

        <form
          onSubmit={save}
          className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow"
        >
          <select
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Farm</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="expense">Expense</option>
            <option value="sale">Sale</option>
          </select>

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Category e.g. Feed, Medicine, Eggs"
            required
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Amount"
            min="0"
            required
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Description"
          />

          <input
            type="date"
            value={recordDate}
            onChange={(e) => setRecordDate(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white"
          >
            Save Financial Record
          </button>
        </form>
      </div>
    </main>
  );
}
