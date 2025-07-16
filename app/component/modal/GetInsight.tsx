import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import InputField from "../input/InputField";
import Label from "../input/Label";
import Required from "../error/Required";
import { editInsight } from "@/app/fetch/edit/fetch";

interface GetInsightProps {
  step?: number;
  isOpen: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function GetInsight({ isOpen, setOpenModal }: GetInsightProps) {
  const [insight, setInsight] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const res = localStorage.getItem("user");
    const idInt = parseInt(res || "");
    setUserId(idInt || null);
  }, []);

  const handleChange = (field: string, value: string) => {
    if (field === "name") {
      setInsight(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      giveInsight();
    }
  };

  const giveInsight = async () => {
    if (insight.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    try {
      setLoading(true);
      const payload = {
        insight,
        user_id: userId,
      };
      await editInsight(payload);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg md:w-[90%] w-[80%] max-w-md transition-all duration-300 ease-in-out">
        <h2 className="text-[2rem] leading-8 font-semibold text-center text-accent">
          Selamat Atas CV Barunya
        </h2>
        <p className="w-full text-center text-gray-500 text-[.8rem]">
          Minta saran dan masukannya dong kak
        </p>
        <div className="space-y-[.2rem] pt-[2rem]">
          <Label name="Saran" className="text-[.7rem] md:text-[.8rem]" />
          <InputField
            placeHolder="Websitenya bagian ininya kurang ..."
            name="name"
            value={insight}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <Required
            required="Masukkan insight dulu"
            className={`${
              !error ? "hidden" : ""
            } text-[.5rem] text-red-500 mt-1`}
          />
        </div>
        <div className="mt-[2rem]">
          <Button onClick={giveInsight} loading={loading}>
            Kirim
          </Button>
        </div>
      </div>
    </div>
  );
}
