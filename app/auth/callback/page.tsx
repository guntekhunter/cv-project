"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import Cookies from "js-cookie";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
  const handleCallback = async () => {
    // OPTIONAL: remove URL hash from Supabase
    if (typeof window !== "undefined" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    const { data, error } = await supabase.auth.getSession();
    const session = data?.session;

    if (error || !session) {
      router.replace("/login");
      return;
    }

    const user = session.user;
    const token = session.access_token;
    const { email, user_metadata } = user;
    const name = user_metadata?.full_name || user_metadata?.name || "";

    let userId = null;

    const { data: existingUser } = await supabase
      .from("user")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (!existingUser) {
      const { data: newUser, error: insertErr } = await supabase
        .from("user")
        .insert([{ email, auth_id: user.id }])
        .select("id")
        .single();

      if (insertErr) {
        console.error("Insert user error:", insertErr);
        return;
      }

      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userId));
      Cookies.set("token", token, { path: "/", expires: 1 });
    }

    router.replace("/dashboard"); // Redirect clean
  };

  // ✅ Delay Supabase hydration bug workaround
  setTimeout(handleCallback, 50);
}, [router]);


  return <p className="text-center">Logging in...</p>;
}
