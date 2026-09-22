"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminSupportPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("ADMIN SUPPORT USER:", user?.email, user?.id);
    const { data, error } = await supabase.from("support_messages").select("id,user_id,subject,message,status,created_at").order("created_at", { ascending: false });
    if (error) { alert(error.message); } else { setMessages(data || []); }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("support_messages").update({ status }).eq("id", id);
    if (error) { alert(error.message); return; }
    loadMessages();
  }

  if (loading) return <main className="p-6">Loading messages...</main>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-green-950">Support Inbox</h1>
        <p className="mt-2 text-gray-600">Manage messages sent by Poultriva users.</p>
        {messages.length === 0 ? (
          <p className="mt-8 rounded-xl bg-white p-6 shadow">No support messages yet.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {messages.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-6 shadow">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-green-950">{item.subject}</h2>
                  <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)} className="rounded-lg border p-2">
                    <option value="open">Open</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-gray-700">{item.message}</p>
                <p className="mt-4 text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
