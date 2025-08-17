"use client";

import { useState, ChangeEvent, useEffect } from "react";
import Button from "../buttons/Button";
import { addNewCv } from "@/app/fetch/add/fetch";
import { useRouter } from "next/navigation";
import { getAiStreaming } from "@/app/fetch/get/fetch";
import Image from "next/image";
import Label from "../input/Label";
import InputField from "../input/InputField";
import LoadingSingle from "../loading/LoadingSingle";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import TextArea from "../input/TextArea";

export default function UseCv(props: any) {
  const [fileName, setFileName] = useState<string>("");
  const [pdfString, setPdfString] = useState<string>("");
  const [required, setRequired] = useState("");
  const route = useRouter();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [clicked, setClicked] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [chunkProgress, setChunkProgress] = useState<number>(0);
  const [showTextarea, setShowTextarea] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpload(true);
    setClicked("ai");
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
    setIsUpload(false);
  };
  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      const userIdInt = parseInt(userId);
      setUserId(userIdInt);
    }
  }, []);

  const createCv = async (e: any) => {
    localStorage.setItem("requirenment", required);
    if (clicked === "ai") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "create_cv_use_ai",
        button_name: "create cv using ai",
        page_path: window.location.pathname,
      });
      setActiveButton(e);

      try {
        setLoadingStep("Mengambil data CV...");
        const receivedChunks: string[] = [];
        const totalExpectedChunks = 1000;
        const fullResponse = await getAiStreaming(
          pdfString,
          required,
          (chunk: any) => {
            console.log("Streaming chunk:", chunk);
            receivedChunks.push(chunk);
            const progress = Math.min(
              (receivedChunks.length / totalExpectedChunks) * 100,
              100
            );
            setChunkProgress(Math.floor(progress));
            setLoadingStep(`Tunggu Sebentar... ${Math.floor(progress)}%`);
          }
        );

        let parsed;
        let id;

        try {
          setLoadingStep("Menyiapkan CV...");
          parsed = JSON.parse(fullResponse);
          const merged = { ...parsed, user_id: userId };

          try {
            setLoadingStep("Menyimpan data ke database...");
            const res = await addNewCv(merged);

            id = String(res?.data.cv_id);
            localStorage.setItem("cv_new_id", id);
          } catch (error) {
            console.error("Gagal menyimpan CV:", error);
          } finally {
          }
        } catch (error) {
          console.error("Gagal memproses JSON:", error);
        } finally {
          setLoadingStep("Mengarahkan ke halaman buat cv...");
          route.push("/pilih-template");
          props.setIsOpen(false);
        }
      } catch (err) {
        console.error("Error creating CV:", err);
      } finally {
        setLoadingStep(null);
      }
    } else if (clicked === "baru") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "create_cv_manually",
        button_name: "create cv manually",
        page_path: window.location.pathname,
      });
      props.setIsOpen(false);
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
      {loadingStep && (
        <LoadingSkeleton
          loadingStep={loadingStep}
          chunkProgress={chunkProgress}
        />
      )}
      <div className="bg-white text-black md:py-[2rem] md:px-[4rem] py-[1rem] px-[1rem] rounded-[20px] bg-blur relative md:w-[50%] w-[90%] mt-[5rem]">
        <h1 className="md:text-[2rem] text-[1rem] font-normal w-full text-center">
          Silahkan Pilih Cara Buat CV
        </h1>
        <div className="w-full flex justify-center">
          <div
            className={`grid py-[1rem] gap-[2rem] h-full transition-all duration-500 ease-in-out ${
              clicked ? "grid-cols-1 w-[50%]" : "grid-cols-2 w-full"
            }`}
          >
            {/* Column 1 */}
            {(!clicked || clicked === "baru") && (
              <div
                className={`rounded-[1rem] border-[2px] flex items-center justify-center flex-col h-full p-2`}
              >
                <h2 className="w-full text-center md:text-[1rem] text-[.8rem]">
                  Buat Baru
                </h2>
                <div className="flex flex-col justify-between flex-grow">
                  <div
                    className="px-[2.4rem] py-[1rem]"
                    onClick={() => setClicked("baru")}
                  >
                    <Image
                      src="/buat-baru.png"
                      alt=""
                      width={500}
                      height={500}
                      className={`rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer ${
                        clicked === "baru" ? "opacity-40" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Column 2 */}
            {(!clicked || clicked === "ai") && (
              <div className="flex flex-col h-full p-2 rounded-[1rem] border-[2px] items-center justify-center">
                {clicked !== "ai" && (
                  <h2 className="w-full text-center md:text-[1rem] text-[.8rem]">
                    Sudah Punya CV?
                  </h2>
                )}
                <div className="flex flex-col justify-between flex-grow">
                  <div className="relative group w-full h-full">
                    {isUpload ? (
                      <LoadingSingle />
                    ) : (
                      <>
                        <label className="absolute w-full h-full top-0 left-0 cursor-pointer z-10">
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleUpload}
                            className="hidden"
                          />
                        </label>
                        <div
                          className="px-[2.4rem] py-[1rem]"
                          onClick={() => setClicked("ai")}
                        >
                          <Image
                            src="/buat-pakai-ai.png"
                            alt=""
                            width={200}
                            height={200}
                            className={`rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 ${
                              clicked === "ai" ? "opacity-40" : ""
                            }`}
                          />
                          {fileName && (
                            <p className="w-full text-center truncate overflow-hidden whitespace-nowrap mt-[.5rem] text-[.8rem]">
                              {fileName}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {fileName && clicked === "ai" && (
          <div className="space-y-[.2rem]">
            <label className="flex items-center cursor-pointer pb-[1rem]">
              <input
                type="checkbox"
                className="hidden peer"
                onChange={(e) => setShowTextarea(e.target.checked)}
              />
              <span className="h-5 w-5 rounded-full border-2 border-emerald-800 flex items-center justify-center peer-checked:[&>span]:bg-emerald-500">
                <span className="h-3 w-3 rounded-full bg-transparent transition-colors duration-200"></span>
              </span>
              <span className="text-black text-[.8rem] pl-[.7rem]">
                Tambah Deskripsi Pekerjaan
              </span>
            </label>

            {showTextarea && (
              <>
                <Label
                  name="Deskripi Pekerjaan Dari Loker"
                  className="text-[.7rem] md:text-[.8rem]"
                />
                <TextArea
                  placeHolder="Dicari admin sosial media ..."
                  name="name"
                  value={required}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}
          </div>
        )}
        {clicked === "baru" && (
          <div className="space-y-[.2rem]">
            <label className="flex items-center cursor-pointer pb-[1rem]">
              <input
                type="checkbox"
                className="hidden peer"
                onChange={(e) => setShowTextarea(e.target.checked)}
              />
              <span className="h-5 w-5 rounded-full border-2 border-emerald-800 flex items-center justify-center peer-checked:[&>span]:bg-emerald-500">
                <span className="h-3 w-3 rounded-full bg-transparent transition-colors duration-200"></span>
              </span>
              <span className="text-black text-[.8rem] pl-[.7rem]">
                Tambah Deskripsi Pekerjaan
              </span>
            </label>

            {showTextarea && (
              <>
                <Label
                  name="Deskripi Pekerjaan Dari Loker"
                  className="text-[.7rem] md:text-[.8rem]"
                />
                <TextArea
                  placeHolder="Dicari admin sosial media ..."
                  name="name"
                  value={required}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}
          </div>
        )}
        <Button
          className="bg-secondary w-full mt-[1rem]"
          loading={activeButton === "ai"}
          disabled={clicked ? false : true}
          onClick={() => createCv("ai")}
        >
          Buat CV
        </Button>
      </div>
    </div>
  );
}
