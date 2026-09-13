"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MortalityPage() {
  const [flocks, setFlocks] = useState<any[]>([]);
  const [flockId, setFlockId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [recordDate, setRecordDate] = useState("");

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

    const mortalityQuantity = Number(quantity);

    const { data: flock, error: flockError } = await supabase
      .from("flocks")
      .select("current_count,initial_count")
      .eq("id", flockId)
      .single();

    if (flockError || !flock) {
      alert(flockError?.message || "Flock not found");
      return;
    }

    if (mortalityQuantity > Number(flock.current_count)) {
      alert("Mortality cannot be greater than current birds");
      return;
    }

    const { error } = await supabase.from("mortality_records").insert({
      flock_id: flockId,
      quantity: mortalityQuantity,
      reason,
      record_date: recordDate || null,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { data: mortalityRecords, error: mortalityError } = await supabase
      .from("mortality_records")
      .select("quantity")
      .eq("flock_id", flockId);

    if (mortalityError) {
      alert(mortalityError.message);
      return;
    }

    const totalMortality = (mortalityRecords || []).reduce(
      (sum, record) => sum + Number(record.quantity || 0),
      0
    );

    const newCurrentCount = Math.max(
      0,
      Number(flock.initial_count) - totalMortality
    );

    const { error: updateError } = await supabase
      .from("flocks")
      .update({
        current_count: newCurrentCount,
      })
      .eq("id", flockId);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    alert("Mortality saved and flock count updated successfully");
    setQuantity("");
    setReason("");
    setRecordDate("");
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-950">
          Mortality Records
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Number of birds"
            min="1"
            required
          />

          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Reason e.g. Disease"
            required
          />

          <input
            type="date"
            value={recordDate}
            onChange={(e) => setRecordDate(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-red-700 p-3 font-semibold text-white"
          >
            Save Mortality Record
          </button>
        </form>
      </div>
    </main>
  );
}
