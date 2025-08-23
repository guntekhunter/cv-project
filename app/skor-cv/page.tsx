"use client";

import { useState } from "react";
import LoadingSingle from "../component/loading/LoadingSingle";
import Button from "../component/buttons/Button";
import { useRouter } from "next/navigation";
import { streamGenerateScore } from "../fetch/get/fetch";

export default function Page() {
  const [clicked, setClicked] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [pdfString, setPdfString] = useState<string>("");

  const [chunkProgress, setChunkProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);

  const [results, setResults] = useState<any[]>([]); // store parsed scores

  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpload(true);
    setClicked("ai");
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

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

  const handleSkor = async () => {
    if (clicked === "ai") {
      try {
        setLoadingStep("Menganalisis CV...");

        const receivedChunks: any[] = [];
        const totalSections = 8; // adjust if needed

        await streamGenerateScore(pdfString, (chunk) => {
          try {
            // If chunk is a string, parse it
            const parsed =
              typeof chunk === "string" ? JSON.parse(chunk) : chunk;
            console.log("Parsed chunk:", parsed);

            receivedChunks.push(parsed);

            const progress = Math.min(
              (receivedChunks.length / totalSections) * 100,
              100
            );
            setChunkProgress(Math.floor(progress));
            setLoadingStep(`Menilai CV... ${Math.floor(progress)}%`);
          } catch (err) {
            console.error("Failed to parse chunk:", chunk, err);
          }
        });

        const parsedResult = receivedChunks.map((cur) => ({
          section: cur.section || "unknown",
          score: cur.score ?? 0,
          suggestion: cur.suggestion || "No suggestion provided",
        }));

        setResults(parsedResult);
        console.log("Final merged score:", parsedResult);
      } catch (err) {
        console.error("Error scoring CV:", err);
      } finally {
        setLoadingStep(null);
      }
    }
  };

  console.log(results, "ini hasilnya");

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-50 py-[6rem]">
      <div className="w-[90%] bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-bold mb-4">Skor CV</h1>

        <div className="space-y-6">
          {/* Upload box */}
          {(!clicked || clicked === "ai") && (
            <div className="flex flex-col h-full p-4 rounded-xl border-2 border-dashed items-center justify-center w-full">
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
                      className="flex items-center justify-center h-full px-4 py-2"
                      onClick={() => setClicked("ai")}
                    >
                      {fileName ? (
                        <p className="truncate text-sm max-w-[200px] text-center">
                          {fileName}
                        </p>
                      ) : (
                        <p className="text-gray-500 text-sm text-center">
                          Upload CV lama
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Progress + Action */}
          {loadingStep && (
            <div className="text-sm text-gray-600">
              {loadingStep} ({chunkProgress}%)
            </div>
          )}

          <div>
            <Button onClick={handleSkor} className="bg-secondary w-full">
              Lihat Skor
            </Button>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl shadow-md border border-gray-200 bg-white p-4 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    {item.section ? (
                      <h2 className="text-lg font-semibold capitalize">
                        {item.section.replace("_", " ")}
                      </h2>
                    ) : (
                      <h2 className="text-lg font-semibold text-red-500">
                        No Section
                      </h2>
                    )}
                    <span className="text-sm font-bold">{item.score}/10</span>
                  </div>

                  {/* progress bar inline */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: `${item.score * 10}%` }}
                    ></div>
                  </div>

                  <p className="text-sm text-gray-600">{item.suggestion}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
