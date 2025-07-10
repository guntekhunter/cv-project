"use client";
import { useEffect, useState } from "react";
import Button from "../component/buttons/Button";
import { addCv } from "../fetch/add/fetch";
import { useRouter } from "next/navigation";

type CvType = {
  type: number | null;
};
export default function Page() {
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState();
  const [languange, setLanguange] = useState("indonesia");
  const [cv, setCv] = useState<CvType>({
    type: null,
  });
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserId(userObj || null);
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
      }
    }
  }, []);

  const router = useRouter();

  const select = (e: any) => {
    setSelected(e);
    const data = { type: e };
    setCv(data);
    console.log(e);
  };

  const selectTemplate = async () => {
    try {
      const data = {
        type: cv.type,
        user_id: userId,
      };
      const res = await addCv(data);
      console.log(res, data, "hasil");
      localStorage.setItem("cv_id", res?.data.data.id);
      if (res?.data.data.cv_id !== null) {
        router.push("/buat-cv");
      } else {
        console.log("loading");
      }
    } catch {
      console.log("error");
    }
  };

  const handleLanguange = () => {
    setEnabled(!enabled);
  };

  useEffect(() => {
    if (enabled) {
      setLanguange("indonesia");
      localStorage.setItem("bahasa", "indonesia");
    } else {
      setLanguange("inggris");
      localStorage.setItem("bahasa", "inggris");
    }
  });
  return (
    <div className="relative w-full min-h-screen ">
      {/* Gradient background */}
      {/* <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}

      {/* Blur layer */}
      <div className="absolute top-0 left-0 z-[-1] h-full w-full backdrop-blur-xl"></div>

      {/* Main content */}
      <div className="w-full flex justify-center items-center min-h-screen py-[3rem] relative">
        <div className="w-[80%] space-y-[2rem]">
          <div className="w-full flex justify-center">
            <div className="text-center md:w-[50%] w-full space-y-[1rem]">
              <h1 className="md:text-[3rem] text-[2rem] font-bold">
                Pilih Template
              </h1>
              <p className="md:text-[.8rem] text-[.6rem] text-[#43214E] opacity-60 w-full">
                Silahkan Pilih Template CV yang kamu sukai, semua template
                dibuat dengan format yang memudahkan HRD mencari informasimu
              </p>
            </div>
          </div>
          <div className="space-y-[.5rem] w-full flex justify-center">
            <div className="space-y-[.5rem]">
              <div className="flex w-full justify-center">
                <button
                  onClick={handleLanguange}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    enabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                      enabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <p className="text-[.8rem] text-[#43214E] opacity-60 w-full text-center">
                {languange}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-[2rem]">
            {[1, 2, 3].map((_, i) => (
              <button
                onClick={() => select(i)}
                key={i}
                className={`h-[30rem] rounded-[6px] border border-[#a1a1a123] shadow-md p-[1.5rem] ${
                  selected === i ? "backdrop-blur-lg bg-white/2" : "bg-white"
                }`}
              >
                <div className="h-full">asd</div>
              </button>
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Button className="w-[20%]" onClick={selectTemplate}>
              Pilih Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
