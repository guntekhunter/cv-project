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
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(session?.user?.email);

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
  };

  const signUp = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white md:w-[30%] w-[90%] rounded-[10px] p-[3rem] border-color-[#F6F6F6] border-[1px] text-[#777777] space-y-[1rem]">
        <h1 className="font-bold text-[1rem]">Buat Akun</h1>
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
          {/* //create login google */}
          <button onClick={signUp} className="bg-red-200">
            Mauk Dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}
