"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddFlockPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [farmId, setFarmId] = useState("");
  const [name, setName] = useState("");
  const [birdType, setBirdType] = useState("Broiler");
  const [count, setCount] = useState("");
  const [startDate, setStartDate] = useState("");

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

  async function saveFlock(e: any) {
    e.preventDefault();

    const { error } = await supabase.from("flocks").insert({
      farm_id: farmId,
      name,
      bird_type: birdType,
      initial_count: Number(count),
      current_count: Number(count),
      start_date: startDate || null,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Flock saved successfully");
    setName("");
    setCount("");
    setStartDate("");
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-950">Add Flock</h1>

        <p className="mt-2 text-gray-600">
          Add a new poultry flock to your farm.
        </p>

        <form
          onSubmit={saveFlock}
          className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow"
        >
          <div>
            <label className="block font-medium">Farm</label>
            <select
              value={farmId}
              onChange={(e) => setFarmId(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
              required
            >
              <option value="">Select Farm</option>
              {farms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  {farm.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Flock Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="e.g. Broilers Batch 1"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Bird Type</label>
            <select
              value={birdType}
              onChange={(e) => setBirdType(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option>Broiler</option>
              <option>Layer</option>
              <option>Turkey</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Initial Bird Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
              placeholder="e.g. 500"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white"
          >
            Save Flock
          </button>
        </form>
      </div>
    </main>
  );
}
