"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!data) {
        router.replace("/dashboard");
        return;
      }

      setChecking(false);
    }

    checkAdmin();
  }, [router]);

  if (checking) {
    return <main className="p-6">Checking admin access...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-green-950">Admin Panel</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the Poultriva administration panel.
        <a href="/admin/support" className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Support Inbox</a>
        </p>
      </div>
    </main>
  );
}
