"use client";
import { useEffect, useState } from "react";
import InputField from "../component/input/InputField";
import Label from "../component/input/Label";
import Button from "../component/buttons/Button";
import { register } from "../fetch/auth/fetch";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { supabase as supabaseClient } from "@/lib/supabase-client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Page() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [cvId, setCvId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // for password mismatch
  const [errorEmail, setErrorEmail] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const route = useRouter();

  useEffect(() => {
    const storedCvId = localStorage.getItem("cv_id");
    if (storedCvId) {
      setCvId(parseInt(storedCvId, 10));
    }
  }, []);

  const handleChange = (field: string, value: string) => {
    if (!Object.keys(data).includes(field)) return;
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Check if password and confirm password match
    if (data.password !== data.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    setError(""); // Clear any previous error

    try {
      setLoading(true);
      const payload = {
        email: data.email,
        password: data.password,
        cv_id: cvId,
      };

      const res = await register(payload);

      if (!res?.data.error) {
        route.push("/login");
      } else {
        setErrorEmail(res?.data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: prevent form submission if needed
      handleRegister();
    }
  };

  useEffect(() => {
    // Get current session
    supabaseClient.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        await handleUser(session);
      }
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        await handleUser(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle user data and redirection
  const handleUser = async (session: Session) => {
    const user = session.user;
    const token = session.access_token;

    if (!user) return;

    const { email, user_metadata } = user;
    const name = user_metadata.full_name || user_metadata.name || "";

    // 1. Check if user already exists
    let userId: number | null = null;

    const { data: existingUser, error } = await supabaseClient
      .from("user")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Error checking user:", error);
      return;
    }

    // 2. If not, insert user into table
    if (!existingUser) {
      const { data: insertedUser, error: insertError } = await supabaseClient
        .from("user")
        .insert([{ email, name, auth_id: user.id }])
        .select("id")
        .single();

      if (insertError) {
        console.error("Insert user error:", insertError);
        return;
      }

      userId = insertedUser.id;
    } else {
      userId = existingUser.id;
    }

    // 3. Link CV if exists
    if (cvId && userId) {
      const { error: updateCvError } = await supabaseClient
        .from("Cv")
        .update({ user_id: userId })
        .eq("id", cvId);

      if (updateCvError) {
        console.error("CV Update error:", updateCvError);
      }
    }

    // 4. Save token and user ID
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userId));
    Cookies.set("token", token, { path: "/", expires: 1  }); // Optional cookie set

    // 5. Redirect to dashboard
    route.push("/dashboard");
  };

  const signUp = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white md:w-[30%] w-[90%] rounded-[10px] p-[3rem] border-color-[#F6F6F6] border-[1px] text-[#777777] space-y-[1rem]">
        <h1 className="font-bold text-[1rem]">Buat Akun</h1>
        {/* //create login google */}
        <div
          onClick={signUp}
          className="bg-white shadow-md w-full h-14 flex items-center space-x-[2rem] cursor-pointer px-4 rounded-md transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/google.png"
            alt=""
            width={500}
            height={500}
            className="w-[2rem] p-[.3rem]"
          />
          <p className="text-sm">Daftar Dengan Google</p>
        </div>
        <div className="space-y-[1rem] text-[.6rem]">
          <div className="space-y-[.5rem]">
            <Label name="Email" />
            <InputField
              placeHolder="..@gmail.com"
              name="email"
              value={data.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Password" />
            <InputField
              placeHolder="***asd1"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Konfirmasi Password" />
            <InputField
              placeHolder="***asd1"
              name="confirmPassword"
              type="password"
              value={data.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {error && <p className="text-red-500 mt-[-0.5rem]">{error}</p>}
          {errorEmail && (
            <p className="text-red-500 mt-[-0.5rem]">{errorEmail}</p>
          )}
          <Button
            onClick={handleRegister}
            loading={loading}
            className="w-full bg-secondary"
          >
            Daftar
          </Button>
          <div className="flex space-x-1">
            <p>Sudah Punya akun?</p>
            <span>
              <button
                onClick={() => route.push("/login")}
                className="text-secondary hover:text-accent"
              >
                Masuk
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
