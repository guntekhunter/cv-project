"use client";

import { useState, ChangeEvent } from "react";
import Button from "../buttons/Button";
import { getAi } from "@/app/fetch/get/fetch";

export default function UseCv(props: any) {
  const [fileName, setFileName] = useState<string>("");
  const [pdfString, setPdfString] = useState<string>("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    console.log("inimi", file);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    console.log("inimi lagi", formData);

    const res = await fetch("/api/extract-text", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPdfString(data.text);
    console.log("Extracted Text:", data.text);
  };

  const createCv = async () => {
    console.log(pdfString);
    const payload = {
      pdfs: pdfString,
      
    };
    try {
      const res = getAi(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-[-5rem] left-0 w-full h-[calc(100vh+5rem)] z-[100] bg-black bg-opacity-20 flex items-center justify-center">
      <div className="bg-white py-[2rem] px-[2rem] rounded-md relative w-[70%] mt-[5rem]">
        <h1 className="md:text-[2rem] text-[1rem] font-normal w-full text-center">
          Silahkan Upload CVmu
        </h1>

        <div className="w-full h-[5rem] rounded-[1rem] border-dashed border-[2px] flex items-center justify-center relative">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="absolute opacity-0 w-full h-full cursor-pointer"
          />
          {fileName ? (
            <div className="text-black font-medium p-2 rounded flex justify-center content-center">
              {fileName}
            </div>
          ) : (
            <div className="text-black font-medium p-2 rounded flex justify-center content-center">
              Drop File Atau Klik Disini
            </div>
          )}
        </div>

        <Button className="bg-secondary w-full mt-4" onClick={createCv}>
          Mulai Buat
        </Button>
      </div>
    </div>
  );
}
