"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FlocksPage() {
  const [flocks, setFlocks] = useState<any[]>([]);

  useEffect(() => {
    async function loadFlocks() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from("flocks")
        .select("id,name,bird_type,initial_count,current_count,start_date,farms(name)")
        .order("created_at", { ascending: false });

      setFlocks(data || []);
    }

    loadFlocks();
  }, []);

  const totalBirds = flocks.reduce(
    (total, flock) => total + (flock.current_count || 0),
    0
  );

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-green-950">
          Flock Management
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your poultry flocks and track bird numbers.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Total Flocks</h2>
            <p className="mt-3 text-3xl font-bold text-green-700">
              {flocks.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Total Birds</h2>
            <p className="mt-3 text-3xl font-bold text-green-700">
              {totalBirds}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Active Flocks</h2>
            <p className="mt-3 text-3xl font-bold text-green-700">
              {flocks.length}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold">My Flocks</h2>

          {flocks.length === 0 ? (
            <p className="mt-3 text-gray-600">
              No flocks added yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {flocks.map((flock) => (
                <div
                  key={flock.id}
                  className="rounded-xl border p-5"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row">
                    <div>
                      <h3 className="text-xl font-bold">
                        {flock.name}
                      </h3>

                      <p className="mt-1 text-gray-600">
                        {flock.bird_type} • Farm:{" "}
                        {flock.farms?.name || "Unknown"}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-2xl font-bold text-green-700">
                        {flock.current_count}
                      </p>
                      <p className="text-sm text-gray-500">
                        Current Birds
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 text-sm md:grid-cols-3">
                    <p>
                      <span className="font-semibold">
                        Initial:
                      </span>{" "}
                      {flock.initial_count}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Start Date:
                      </span>{" "}
                      {flock.start_date || "Not set"}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Status:
                      </span>{" "}
                      Active
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
