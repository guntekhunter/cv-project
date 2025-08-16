"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import Cookies from "js-cookie";
import { addUserEmail } from "@/app/fetch/add/fetch";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [cvId, setCvId] = useState<number | null>(null);

  useEffect(() => {
    const storedCvId = localStorage.getItem("cv_id");
    if (storedCvId) {
      setCvId(parseInt(storedCvId, 10));
    }
  }, []);

  useEffect(() => {
    if (cvId === null) return;

    const handleSignup = async () => {
      // remove Supabase hash (#access_token...) from URL
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

      if (!email) {
        console.error("No email from Supabase user session");
        router.replace("/login");
        return;
      }

      // 1️⃣ Check if user already exists
      const { data: existingUser } = await supabase
        .from("user")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existingUser) {
        // If user already exists, redirect to login
        console.warn("User already exists, redirecting to login");
        router.replace("/login");
        return;
      }

      // 2️⃣ New signup flow
      await addUserEmail({ email }); // Add to Brevo or your mailing list

      const { data: newUser, error: insertErr } = await supabase
        .from("user")
        .insert([{ email, auth_id: user.id, name }])
        .select("id")
        .single();

      if (insertErr) {
        console.error("Insert user error:", insertErr);
        return;
      }

      const userId = newUser.id;

      if (cvId) {
        const { error: updateCvError } = await supabase
          .from("Cv")
          .update({ user_id: userId })
          .eq("id", cvId);

        if (updateCvError) {
          console.error("CV update error:", updateCvError);
          return;
        }
      }

      // 3️⃣ Store tokens & userId
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userId));
        Cookies.set("token", token, { path: "/", expires: 1 });
      }

      // 4️⃣ Redirect to dashboard
      router.replace("/dashboard");
    };

    // Small delay to avoid Supabase hydration bug
    setTimeout(handleSignup, 50);
  }, [router, cvId]);

  return <p className="text-center">Signing up...</p>;
}
