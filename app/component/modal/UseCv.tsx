"use client";

import { useState, ChangeEvent, useEffect } from "react";
import Button from "../buttons/Button";
import { addNewCv } from "@/app/fetch/add/fetch";
import { useRouter } from "next/navigation";
import { getAiStreaming } from "@/app/fetch/get/fetch";
import Image from "next/image";
import Label from "../input/Label";
import InputField from "../input/InputField";

export default function UseCv(props: any) {
  const [fileName, setFileName] = useState<string>("");
  const [pdfString, setPdfString] = useState<string>("");
  const [required, setRequired] = useState("");
  const route = useRouter();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file?.name);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/extract-text", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPdfString(data.text);
    console.log("Extracted Text:", data.text);
  };
  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      const userIdInt = parseInt(userId);
      setUserId(userIdInt);
    }
  }, []);

  const createCv = async (e: any) => {
    setActiveButton(e);

    if (!required) {
      console.error("Requirement is missing!");
      return;
    }

    try {
      const fullResponse = await getAiStreaming(
        pdfString,
        required,
        (chunk: any) => {
          console.log("Streaming chunk:", chunk);
        }
      );

      const parsed = JSON.parse(fullResponse);
      const merged = { ...parsed, user_id: userId };
      const res = await addNewCv(merged);
      const id = String(res?.data.cv_id);
      localStorage.setItem("cv_new_id", id);
      route.push("/pilih-template");
      props.setIsOpen(false);
    } catch (err) {
      console.error("Error creating CV:", err);
    }
  };

  const handleChange = (field: string, value: string) => {
    setRequired(value);
  };

  const handleKeyDown = () => {
    createCv;
  };
  return (
    <div
      className={`fixed top-[-5rem] left-0 w-full h-[calc(100vh+5rem)] z-[100] bg-black bg-opacity-20 flex items-center justify-center ${props.isOpen ? "" : "hidden"}`}
    >
      <div className="bg-white md:py-[2rem] md:px-[4rem] py-[1rem] px-[1rem] rounded-[20px] bg-blur relative md:w-[50%] w-[90%] mt-[5rem]">
        <h1 className="md:text-[2rem] text-[1rem] font-normal w-full text-center">
          Silahkan Upload CVmu
        </h1>
        <div className="grid grid-cols-2 py-[1rem] gap-[2rem] h-full">
          {/* Column 1 */}
          <div className="rounded-[1rem] border-[2px] flex items-center justify-center flex-col h-full p-2">
            <h2 className="w-full text-center md:text-[1rem] text-[.8rem]">
              Buat Baru
            </h2>
            <div className="flex flex-col justify-between flex-grow">
              <div className="px-[2.4rem] py-[1rem]">
                <Image src="/buat-baru.png" alt="" width={500} height={500} />
              </div>
              <Button
                className="bg-secondary w-full"
                onClick={() => props.setIsOpen(false)}
              >
                Buat CV
              </Button>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col h-full p-2 rounded-[1rem] border-[2px] items-center justify-center">
            <h2 className="w-full text-center md:text-[1rem] text-[.8rem]">
              Sudah Punya CV?
            </h2>
            <div className="flex flex-col justify-between flex-grow">
              <div className="relative group w-full h-full">
                <label className="absolute w-full h-full top-0 left-0 cursor-pointer z-10">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </label>
                <div className="px-[2.4rem] py-[1rem]">
                  <Image
                    src="/buat-pakai-ai.png"
                    alt=""
                    width={200}
                    height={200}
                    className="rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  {fileName && (
                    <p className="w-full text-center truncate overflow-hidden whitespace-nowrap mt-[.5rem]">
                      {fileName}
                    </p>
                  )}
                </div>
              </div>
              <Button
                className="bg-secondary w-full mt-[1rem]"
                loading={activeButton === "ai"}
                disabled={pdfString ? false : true}
                onClick={() => createCv("ai")}
              >
                Buat Pakai AI
              </Button>
            </div>
          </div>
        </div>
        {fileName && (
          <div className="space-y-[.2rem]">
            <Label
              name="Masukkan Kebutuhan Loker"
              className="text-[.7rem] md:text-[.8rem]"
            />
            <InputField
              placeHolder="Dicari admin sosial media ..."
              name="name"
              value={required}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div>
    </div>
  );
}
