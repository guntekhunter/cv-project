import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import InputField from "../input/InputField";
import Label from "../input/Label";
import Required from "../error/Required";
import { useParams } from "next/navigation";
import { editInsight } from "@/app/fetch/edit/fetch";

interface GetInsightProps {
  step?: number;
  isOpen: boolean;
  setOpenModal: (open: boolean) => void;
}

export default function GetInsight() {
  const [insight, setInsight] = useState("");
  const params = useParams();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const res = localStorage.getItem("user");
    const idInt = parseInt(res || "");
    setUserId(idInt);
  }, []);

  const handleChange = (field: string, value: string) => {
    if (field === "name") {
      setInsight(value);
    }
  };

  const giveInsight = async () => {
    if (insight.trim()) {
      console.log("Insight submitted:", insight);
      try {
        const payload = {
          insight,
          user_id: userId,
        };
        const res = await editInsight(payload);
        console.log(res, "bisa ges");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg w-[90%] max-w-md transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-center">
          Selamat Atas CV Barunya
        </h2>
        <p className="w-full text-center text-gray-500 text-[.8rem]">
          Minta saran dan masukannya dong kak
        </p>
        <div className="space-y-[.5rem] pt-[1rem]">
          <Label name="Saran" />
          <InputField
            placeHolder="Websitenya bagian ininya kurang ..."
            name="name"
            value={insight}
            onChange={handleChange}
          />
          <Required
            required="Masukkan insight dulu"
            className={`${insight ? "hidden" : ""}`}
          />
          <Button onClick={giveInsight}>Kirim</Button>
        </div>
      </div>
    </div>
  );
}
