"use client";
import { useEffect, useState } from "react";
import InputField from "../component/input/InputField";
import Label from "../component/input/Label";
import Button from "../component/buttons/Button";
import { register } from "../fetch/auth/fetch";
import { useRouter } from "next/navigation";

export default function page() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [cvId, setCvId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handleRegister = async () => {
    try {
      setLoading(true);
      const payload = {
        email: data?.email,
        password: data?.password,
        cv_id: cvId,
      };
      const res = await register(payload);
    } catch (error) {
      console.log(error);
    } finally {
      route.push("/dashboard");
      setLoading(false);
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
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button onClick={handleRegister} loading={loading}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
