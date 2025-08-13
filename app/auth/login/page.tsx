"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import Cookies from "js-cookie";

export default function AuthLoginCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      // Remove Supabase hash from URL
      if (typeof window !== "undefined" && window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }

      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (error || !session) {
        router.replace("/login");
        return;
      }

      const { email } = session.user;
      const token = session.access_token;

      // ✅ Only allow login if user exists
      const { data: existingUser, error: findErr } = await supabase
        .from("user")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (findErr) {
        console.error("Error checking user:", findErr);
        router.replace("/login");
        return;
      }

      if (!existingUser) {
        // If user not found, redirect to login or register page
        router.replace("/login");
        return;
      }

      // Save session
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(existingUser.id));
        Cookies.set("token", token, { path: "/", expires: 1 });
      }

      router.replace("/dashboard");
    };

    // Small delay to let Supabase session be ready
    setTimeout(handleLogin, 50);
  }, [router]);

  return <p className="text-center">Logging in...</p>;
}
