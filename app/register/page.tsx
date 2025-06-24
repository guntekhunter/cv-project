"use client";
import { useEffect, useState } from "react";
import InputField from "../component/input/InputField";
import Label from "../component/input/Label";
import Button from "../component/buttons/Button";
import { register } from "../fetch/auth/fetch";
import { useRouter } from "next/navigation";

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
    if (data.password !== data.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }
    setError(""); // clear any previous error
    try {
      setLoading(true);
      const payload = {
        email: data.email,
        password: data.password,
        cv_id: cvId,
      };
      const res = await register(payload);
      console.log(res);
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

  return (
    <div className="w-full flex justify-center min-h-screen relative pt-[7%] pb-[10%]">
      <div className="bg-white w-[80%] rounded-[10px] p-[3rem] border-color-[#F6F6F6] border-[1px] text-[#777777] space-y-[1rem]">
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
              type="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-[.5rem]">
            <Label name="Konfirmasi Password" />
            <InputField
              name="confirmPassword"
              type="password"
              value={data.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-[-0.5rem]">{error}</p>
          )}
          {errorEmail && (
            <p className="text-red-500 text-sm mt-[-0.5rem]">{errorEmail}</p>
          )}

          <Button onClick={handleRegister} loading={loading}>
            Daftar
          </Button>
        </div>
      </div>
    </div>
  );
}
