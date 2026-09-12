"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductionPage() {
  const [flocks, setFlocks] = useState<any[]>([]);
  const [flockId, setFlockId] = useState("");
  const [eggCount, setEggCount] = useState("");
  const [breakingEgg, setBreakingEgg] = useState("");

  useEffect(() => {
    async function loadFlocks() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from("flocks")
        .select("id,name,farms!inner(user_id)")
        .eq("farms.user_id", userData.user.id);

      setFlocks(data || []);
    }

    loadFlocks();
  }, []);

  async function save(e: any) {
    e.preventDefault();

    const { error } = await supabase.from("production_records").insert({
      flock_id: flockId,
      eggs_count: Number(eggCount),
      broken_eggs: Number(breakingEgg),
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Production record saved successfully");
    setEggCount("");
    setBreakingEgg("");
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-950">
          Egg Production Records
        </h1>

        <form
          onSubmit={save}
          className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow"
        >
          <select
            value={flockId}
            onChange={(e) => setFlockId(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Flock</option>
            {flocks.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={eggCount}
            onChange={(e) => setEggCount(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Total eggs"
            min="0"
            required
          />

          <input
            type="number"
            value={breakingEgg}
            onChange={(e) => setBreakingEgg(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Breaking eggs"
            min="0"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white"
          >
            Save Production Record
          </button>
        </form>
      </div>
    </main>
  );
}
