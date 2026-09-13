"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FeedPage() {
  const [flocks, setFlocks] = useState<any[]>([]);
  const [flockId, setFlockId] = useState("");
  const [feedType, setFeedType] = useState("Starter"); const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    async function load() {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;

      const { data } = await supabase
        .from("flocks")
        .select("id,name,farms!inner(user_id)")
        .eq("farms.user_id", u.user.id);

      setFlocks(data || []);
    }

    load();
  }, []);

  async function save(e: any) {
    e.preventDefault();

    const feedQuantity = Number(quantity);
    const feedCost = Number(cost);

    if (!flockId) {
      alert("Please select a flock");
      return;
    }

    if (!Number.isFinite(feedQuantity) || feedQuantity <= 0) {
      alert("Feed quantity must be greater than 0");
      return;
    }

    if (!Number.isFinite(feedCost) || feedCost < 0) {
      alert("Feed cost cannot be negative");
      return;
    }

    const { error } = await supabase.from("feed_records").insert({
      flock_id: flockId,
      feed_type: feedType,
      quantity: feedQuantity,
      cost: feedCost,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Feed record saved successfully");
    setQuantity("");
    setCost("");
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-950">Feed Tracking</h1>

        <form onSubmit={save} className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow">
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Feed quantity (kg)"
            min="0"
            step="0.01"
            required
          />

          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Feed cost"
            min="0"
            step="0.01"
            required
          />

          <button className="w-full rounded-lg bg-green-700 p-3 font-semibold text-white">
            Save Feed Record
          </button>
        </form>
      </div>
    </main>
  );
}
