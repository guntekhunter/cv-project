"use client";
import { useEffect, useState } from "react";
import InputField from "../component/input/InputField";
import Label from "../component/input/Label";
import Button from "../component/buttons/Button";
import { login, register } from "../fetch/auth/fetch";
import { useRouter } from "next/navigation";

export default function page() {
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
    if (!Object.keys(data).includes(field)) return; // Mencegah field yang tidak valid

    const updatedBiodata = { ...data, [field]: value };
    setData(updatedBiodata);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(""); // Reset any previous error

      const payload = {
        email: data?.email,
        password: data?.password,
      };

      const res = await login(payload); // Assuming this returns { status, data }

      if (res?.status === 200 && res?.data?.token && res?.data?.user) {
        const { token, user } = res.data;

        // Store JWT and user data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user.id));

        // Redirect to dashboard
        route.push("/dashboard");
      } else {
        console.log(res.data);
        // Show error message if login fails
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
      e.preventDefault(); // optional: prevent form submission if needed
      handleLogin();
    }
  };

  return (
    <div className="w-full flex justify-center min-h-screen relative pt-[7%] pb-[10%]">
      <div className="bg-white w-[50%] rounded-[10px] p-[3rem] border-color-[#F6F6F6] border-[1px] text-[#777777] space-y-[1rem]">
        <h1 className="font-bold text-[1.5rem]">Buat Akun</h1>
        <div className="space-y-[1rem]">
          <div className="space-y-[.5rem]">
            <Label name="Email" />
            <InputField
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Password" />
            <InputField
              name="password"
              value={data.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-[-0.5rem]">{error}</p>
          )}
          <Button onClick={handleLogin} loading={loading}>
            Login
          </Button>
          <div className="flex space-x-1">
            <p>Belum punya akun?</p>
            <span>
              <button
                onClick={() => route.push("/register")}
                className="text-secondary hover:text-accent"
              >
                Daftar
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
