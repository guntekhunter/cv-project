import openai from "@/app/utils/openai";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Required for streaming on Vercel Edge

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { personal, requirenment } = reqBody.data;

  const encoder = new TextEncoder();

  const forbiddenWords = ["fungsional", "unggulan", "no.1", "paling", "leading"];

  // Bangun konten user prompt dinamis
  let userContent = `
Tulis satu **professional summary** yang singkat dan menarik (3–4 kalimat) untuk CV.  
Gunakan bahasa yang sederhana, jelas, dan profesional, tanpa klise atau kalimat yang terlalu berat.  
Soroti keterampilan utama, pengalaman paling relevan, serta tujuan karir dengan nada yang ramah dan mudah dipahami.  
Hindari kalimat seperti: "berkomitmen untuk terus mengembangkan keterampilan" atau "berkontribusi pada pertumbuhan perusahaan dengan pendekatan inovatif".  
Gunakan gaya seperti contoh ini:  
"Pengembang web dengan pengalaman lebih dari 1 tahun dalam HTML, CSS, dan Bootstrap. Terampil membuat website responsif dan mudah digunakan. Terbiasa menulis kode rapi serta cepat mengatasi masalah teknis. Mencari kesempatan sebagai Pengembang Web untuk mengembangkan keterampilan dan kreativitas."  

Informasi kandidat: ${personal}.  
Jika tersedia, sesuaikan juga dengan requirement berikut: ${requirenment || "berikan semacam template yang bisa mereka gunakan jika job descritionnya belum tersedia contoh: [[Jabatan/Peran] dengan pengalaman [durasi pengalaman, opsional] dalam [bidang utama/skill inti]. Terampil menggunakan [tools/teknologi/framework, opsional] untuk membuat [hasil/tujuan kerja, misalnya website responsif, aplikasi fungsional]"}.

Output harus hanya berupa 1 professional summary, tanpa judul atau label tambahan.
`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: `You are an expert career consultant and professional CV writer. created it using Indonesian language,  Avoid using the following words in your response: ${forbiddenWords.join(", ")}.`,
            },
            {
              role: "user",
              content: userContent,
            },
          ],
        });

        for await (const chunk of completion) {
          const content = chunk.choices?.[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }

        controller.close();
      } catch (err: any) {
        console.error("Streaming error:", err);
        controller.enqueue(encoder.encode("ERROR: " + err.message));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
