"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import Cookies from "js-cookie";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Clean up URL
      if (typeof window !== "undefined" && window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }

      const stateParam = searchParams.get("state");
      let cv_id: string | null = null;

      if (stateParam) {
        try {
          const parsed = JSON.parse(stateParam);
          cv_id = parsed.cv_id || null;
        } catch (err) {
          console.warn("Invalid state param", err);
        }
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

        if (newUser && cv_id) {
          await supabase
            .from("Cv")
            .update({ user_id: newUser.id })
            .eq("id", cv_id);
        }

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

      router.replace("/dashboard");
    };

    setTimeout(handleCallback, 50);
  }, [router, searchParams]);

  return <p className="text-center">Logging in...</p>;
}

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase-client";
// import Cookies from "js-cookie";

// export default function AuthCallbackPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const handleCallback = async () => {
//       // OPTIONAL: remove URL hash from Supabase
//       if (typeof window !== "undefined" && window.location.hash) {
//         history.replaceState(null, "", window.location.pathname);
//       }

//       const { data, error } = await supabase.auth.getSession();
//       const session = data?.session;

//       if (error || !session) {
//         router.replace("/login");
//         return;
//       }

//       const user = session.user;
//       const token = session.access_token;
//       const { email, user_metadata } = user;
//       const name = user_metadata?.full_name || user_metadata?.name || "";

//       let userId = null;

//       const { data: existingUser } = await supabase
//         .from("user")
//         .select("id")
//         .eq("email", email)
//         .maybeSingle();

//       if (!existingUser) {
//         const { data: newUser, error: insertErr } = await supabase
//           .from("user")
//           .insert([{ email, auth_id: user.id }])
//           .select("id")
//           .single();

//         if (newUser) {
//           // 4. Update the related CV to link with the new user
//           const { error: updateCvError } = await supabase
//             .from("Cv")
//             .update({ user_id: newUser.id })
//             .eq("id", cv_id);
//           if (updateCvError) throw updateCvError;
//         }

//         if (insertErr) {
//           console.error("Insert user error:", insertErr);
//           return;
//         }

//         userId = newUser.id;
//       } else {
//         userId = existingUser.id;
//       }

//       if (typeof window !== "undefined") {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(userId));
//         Cookies.set("token", token, { path: "/", expires: 1 });
//       }

//       router.replace("/dashboard"); // Redirect clean
//     };

//     // ✅ Delay Supabase hydration bug workaround
//     setTimeout(handleCallback, 50);
//   }, [router]);

//   return <p className="text-center">Logging in...</p>;
// }
