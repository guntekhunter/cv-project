"use client";
import { useEffect, useState } from "react";
import InputField from "../component/input/InputField";
import Label from "../component/input/Label";
import Button from "../component/buttons/Button";
import { login } from "../fetch/auth/fetch";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { supabase as supabaseClient } from "@/lib/supabase-client";
import Image from "next/image";

export default function Page() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [cvId, setCvId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  useEffect(() => {
    const storedCvId = localStorage.getItem("cv_id");
    if (storedCvId) {
      setCvId(parseInt(storedCvId, 10));
    }
  }, []);

  const handleChange = async (field: string, value: string) => {
    if (!Object.keys(data).includes(field)) return;
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    localStorage.clear();
    if (!data.email || !data.password) {
      setError("Semua field harus diisi.");
      return;
    }

    setError("");
    try {
      setLoading(true);

      const payload = {
        email: data.email,
        password: data.password,
      };

      const res = await login(payload);

      if (res?.status === 200 && res?.data?.token && res?.data?.user) {
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user.id));
        Cookies.set("token", token, { path: "/", expires: 1 });

        route.push("/dashboard");
      } else {
        setError(res?.data.data || "Terjadi kesalahan saat login.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || "Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const signInWithGoogle = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white md:w-[30%] w-[90%] rounded-[10px] p-[3rem] border border-[#F6F6F6] text-[#777777] space-y-[1rem]">
        <h1 className="font-bold text-[1rem]">Login</h1>
        {/* Google Login Button */}
        <div
          onClick={signInWithGoogle}
          className="bg-white shadow-md w-full h-14 flex items-center space-x-4 cursor-pointer px-4 rounded-md transition-transform duration-200 hover:scale-105 border border-gray-200"
        >
          <Image
            src="/google.png"
            alt="Google"
            width={20}
            height={20}
            className="w-[1.5rem]"
          />
          <p className="text-sm">Masuk dengan Google</p>
        </div>
        <div className="space-y-[1rem] text-[.6rem]">
          <div className="space-y-[.5rem]">
            <Label name="Email" />
            <InputField
              placeHolder="lask@gmail.com"
              name="email"
              value={data.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Password" />
            <InputField
              placeHolder="****wa1"
              name="password"
              value={data.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {error && (
            <p className="text-red-500 mt-[-0.5rem] text-[.6rem]">{error}</p>
          )}
          <Button
            onClick={handleLogin}
            loading={loading}
            className="w-full bg-secondary"
          >
            Login
          </Button>

          <div className="flex space-x-1 text-xs justify-center pt-2">
            <p>Belum punya akun?</p>
            <button
              onClick={() => route.push("/register")}
              className="text-secondary hover:text-accent font-semibold"
            >
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
