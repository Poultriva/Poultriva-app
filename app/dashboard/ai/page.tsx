"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AIFarmAssistantPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAssistant(e: any) {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setAnswer("Please sign in first.");
        return;
      }

      const { data: farms } = await supabase
        .from("farms")
        .select("id,name,location")
        .eq("user_id", userData.user.id);

      const farmIds = (farms || []).map((farm: any) => farm.id);

      let flocks: any[] = [];
      let production: any[] = [];
      let mortality: any[] = [];
      let feed: any[] = [];
      let finance: any[] = [];

      if (farmIds.length) {
        const { data: flockData } = await supabase
          .from("flocks")
          .select("id,name,bird_type,initial_count,current_count,start_date")
          .in("farm_id", farmIds);

        flocks = flockData || [];

        const flockIds = flocks.map((flock: any) => flock.id);

        if (flockIds.length) {
          const { data: productionData } = await supabase
            .from("production_records")
            .select("flock_id,eggs_count,broken_eggs,record_date")
            .in("flock_id", flockIds);

          production = productionData || [];

          const { data: mortalityData } = await supabase
            .from("mortality_records")
            .select("flock_id,quantity,reason,record_date")
            .in("flock_id", flockIds);

          mortality = mortalityData || [];

          const { data: feedData } = await supabase
            .from("feed_records")
            .select("flock_id,feed_type,quantity,cost,created_at")
            .in("flock_id", flockIds);

          feed = feedData || [];
        }

        const { data: financeData } = await supabase
          .from("financial_records")
          .select("farm_id,type,category,amount,description,record_date")
          .in("farm_id", farmIds);

        finance = financeData || [];
      }

      const farmData = {
        farms,
        flocks,
        production,
        mortality,
        feed,
        finance,
      };

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          farmData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setAnswer(result.error || "AI Assistant failed to respond.");
        return;
      }

      setAnswer(result.answer || "No response received.");
      setMessage("");
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-green-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-green-950">
          AI Farm Assistant
        </h1>

        <p className="mt-2 text-gray-600">
          Smart assistance for your poultry farm.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <div className="rounded-xl bg-green-50 p-5">
            <h2 className="text-xl font-bold text-green-900">
              Poultriva AI
            </h2>

            <p className="mt-2 text-gray-600">
              Ask me about your flock, feed, eggs, mortality or profit.
            </p>
          </div>

          {answer && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
              <p className="font-semibold text-green-900">AI Assistant</p>
              <p className="mt-2 whitespace-pre-wrap text-gray-700">
                {answer}
              </p>
            </div>
          )}

          <form onSubmit={askAssistant} className="mt-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border p-4"
              rows={4}
              placeholder="e.g. Me zan kula da shi a flock dina?"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Poultriva AI na tunani..." : "Ask Poultriva AI"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
