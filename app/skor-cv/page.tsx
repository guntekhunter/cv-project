"use client";

import { useState } from "react";
import LoadingSingle from "../component/loading/LoadingSingle";
import Button from "../component/buttons/Button";
import { useRouter } from "next/navigation";
import { streamGenerateScore } from "../fetch/get/fetch";

import { PieChart, Pie, Cell } from "recharts";

// ✅ Full Circle Gauge Component
const Gauge = ({ score }: { score: number }) => {
  const getColor = (score: number) => {
    if (score < 60) return "#EF4444"; // red
    if (score < 80) return "#FACC15"; // yellow
    return "#22C55E"; // green
  };

  const COLORS = [getColor(score), "#E5E7EB"];

  const data = [
    { name: "filled", value: score },
    { name: "empty", value: 100 - score },
  ];

  return (
    <div className="flex items-center justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={100}
          startAngle={90}
          endAngle={-270} // ✅ full circle donut
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        {/* ✅ Score in center */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="bold"
          fill={getColor(score)}
        >
          {score}%
        </text>
      </PieChart>
    </div>
  );
};

export default function Page() {
  const [clicked, setClicked] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [pdfString, setPdfString] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const [chunkProgress, setChunkProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);

  const [results, setResults] = useState<any[]>([]);

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
    setIsUpload(false);
  };

  const handleSkor = async () => {
    if (clicked === "ai") {
      try {
        setLoadingStep("Menganalisis CV...");
        const receivedChunks: any[] = [];
        const totalSections = 8;

        await streamGenerateScore(pdfString, (chunk) => {
          try {
            const parsed =
              typeof chunk === "string" ? JSON.parse(chunk) : chunk;
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
      } catch (err) {
        console.error("Error scoring CV:", err);
      } finally {
        setLoadingStep(null);
      }
    }
  };

  const updateCv = (buttonId: string) => {
    localStorage.setItem("clicked", "ai");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "update_cv_from_landing_page",
      button_name: "Go To Template From landing page",
      page_path: window.location.pathname,
    });
    localStorage.setItem("is_new", "false");
    setActiveButton(buttonId); // Mark which button was clicked
    router.push("/pilih-template");
  };

  const totalScore =
    results.length > 0
      ? Math.round(
          (results.reduce((acc, cur) => acc + (cur.score ?? 0), 0) /
            (results.length * 10)) *
            100
        )
      : 0;

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-50 py-[6rem]">
      <div className="w-[90%] rounded-lg p-6">
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
                        <p className="truncate text-[.8rem] max-w-[200px] text-center">
                          {fileName}
                        </p>
                      ) : (
                        <p className="text-gray-500 text-[.8rem] text-center">
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
            <div className="text-[.8rem] text-gray-600">{loadingStep}</div>
          )}

          <div>
            <Button onClick={handleSkor} className="bg-secondary w-full">
              Lihat Skor
            </Button>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="mt-6">
              {/* ✅ Gauge */}
              <div className="flex justify-center mb-8">
                <Gauge score={totalScore} />
              </div>

              {/* ✅ Upsell based on score */}
              {totalScore >= 80 ? (
                // 🎉 High Score (80–100)
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mb-6">
                  <p className="text-green-700 font-medium mb-2">
                    🎉 Selamat! CV kamu sudah bagus ({totalScore}/100)
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Tapi masih bisa lebih menonjol. Dengan{" "}
                    <span className="font-semibold">template premium</span> &{" "}
                    <span className="font-semibold">fitur AI</span> di{" "}
                    <span className="font-semibold">buatcv.id</span>, CV kamu
                    bisa naik level dan masuk{" "}
                    <span className="font-semibold">top 10% kandidat</span>.
                  </p>
                  <Button
                    className="bg-yellow-300 font-semibold w-full"
                    onClick={() => updateCv("update")}
                  >
                    🚀 Upgrade CV Sekarang
                  </Button>
                </div>
              ) : totalScore >= 60 ? (
                // 🟡 Medium Score (60–79)
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center mb-6">
                  <p className="text-yellow-700 font-medium mb-2">
                    ⚠️ CV kamu lumayan, tapi belum maksimal ({totalScore}/100)
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Banyak kandidat lain punya CV yang lebih kuat. Tingkatkan
                    peluangmu dengan{" "}
                    <span className="font-semibold">desain premium</span> &{" "}
                    <span className="font-semibold">AI improvement</span> di{" "}
                    <span className="font-semibold">buatcv.id</span>.
                  </p>
                  <Button
                    className="bg-yellow-400 text-black font-semibold w-full hover:bg-yellow-500"
                    onClick={() => updateCv("update")}
                  >
                    ⚡ Tingkatkan CV Sekarang
                  </Button>
                </div>
              ) : (
                // 🔴 Low Score (< 60)
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center mb-6">
                  <p className="text-red-700 font-medium mb-2">
                    ❌ CV kamu masih jauh dari standar ({totalScore}/100)
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Rekruter biasanya melewatkan CV dengan skor di bawah{" "}
                    <span className="font-semibold">60</span>. Jangan biarkan
                    peluang hilang — gunakan{" "}
                    <span className="font-semibold">template premium & AI</span>{" "}
                    di <span className="font-semibold">buatcv.id</span> untuk
                    memperbaikinya.
                  </p>
                  <Button
                    className="bg-red-500 text-white font-semibold w-full hover:bg-red-600"
                    onClick={() => updateCv("update")}
                  >
                    🔥 Perbaiki CV Sekarang
                  </Button>
                </div>
              )}

              {/* Detail section scores */}
              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-white bg-white/50 p-4 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      {item.section ? (
                        <div>
                          <h2 className="text-[.8rem] font-semibold capitalize">
                            {item.section.replace("_", " ")}
                          </h2>
                          <span className="text-[.8rem]">{item.score}/10</span>
                        </div>
                      ) : (
                        <h2 className="text-[.8rem] font-semibold text-red-500">
                          No Section
                        </h2>
                      )}
                    </div>

                    {/* progress bar inline */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.score < 4
                            ? "bg-red-500"
                            : item.score < 7
                              ? "bg-yellow-400"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${item.score * 10}%` }}
                      ></div>
                    </div>

                    <p className="text-[.8rem] text-gray-400">
                      {item.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
