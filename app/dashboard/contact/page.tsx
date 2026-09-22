"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactAdminPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    setSending(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please log in first.");
      setSending(false);
      return;
    }

    const { data: insertedMessage, error } = await supabase
      .from("support_messages")
      .insert({
        user_id: user.id,
        subject,
        message,
      });

    if (error) {
      alert(error.message);
      setSending(false);
      return;
    }

    alert("Your message has been submitted successfully.");

    setSubject("");
    setMessage("");
    setSending(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-950">
          Contact Admin
        </h1>

        <p className="mt-2 text-gray-600">
          Send a message to the Poultriva support team.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow"
        >
          <label className="block text-sm font-semibold text-gray-700">
            Subject
          </label>

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="e.g. Payment problem"
          />

          <label className="mt-5 block text-sm font-semibold text-gray-700">
            Message
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            className="mt-2 w-full rounded-lg border p-3"
            placeholder="Describe your issue..."
          />

          <button
            type="submit"
            disabled={sending}
            className="mt-5 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}
