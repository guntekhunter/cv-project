"use client";

import { useState, ChangeEvent } from "react";
import Button from "../buttons/Button";
import { addNewCv } from "@/app/fetch/add/fetch";
import { useRouter } from "next/navigation";
import { getAiStreaming } from "@/app/fetch/get/fetch";
import Image from "next/image";

export default function UseCv(props: any) {
  const [fileName, setFileName] = useState<string>("");
  const [pdfString, setPdfString] = useState<string>("");
  const route = useRouter();

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

  const createCv = async () => {
    props.setIsOpen(false);
    console.log(pdfString);
    try {
      const fullResponse = await getAiStreaming(pdfString, (chunk: any) => {
        console.log("Streaming chunk:", chunk);
      });

      const parsed = JSON.parse(fullResponse);

      const res = await addNewCv(parsed);
      const id = String(res?.data.cv_id);
      localStorage.setItem("cv_new_id", id);
      route.push("/pilih-template");
    } catch (err) {
      console.error("Error creating CV:", err);
    }
  };

  return (
    <div
      className={`fixed top-[-5rem] left-0 w-full h-[calc(100vh+5rem)] z-[100] bg-black bg-opacity-20 flex items-center justify-center ${props.isOpen ? "" : "hidden"}`}
    >
      <div className="bg-white py-[2rem] px-[4rem] rounded-md relative w-[50%] mt-[5rem]">
        <h1 className="md:text-[2rem] text-[1rem] font-normal w-full">
          Silahkan Upload CVmu
        </h1>

        <div className="grid grid-cols-2 py-[1rem] gap-[2rem] h-full">
          {/* Column 1 */}
          <div className="rounded-[1rem] border-[2px] flex items-center justify-center flex-col h-full p-2">
            <h2 className="py-[.5rem] w-full text-center">Buat Baru</h2>
            <div className="flex flex-col justify-between flex-grow">
              <div className="p-[2.4rem]">
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
            <h2 className="py-[.5rem] w-full text-center">Sudah Punya CV?</h2>
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
                <div className="p-[2.4rem]">
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
                className="bg-secondary w-full"
                onClick={createCv}
                disabled={pdfString ? false : true}
              >
                Buat Pakai AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
