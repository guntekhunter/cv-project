import openai from "@/app/utils/openai";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Required for streaming on Vercel Edge

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { jobTitle, company, role, jobDescription, beforeGenerate } =
    reqBody.data;

  const encoder = new TextEncoder();

  const forbiddenWords = [
    "fungsional",
    "unggulan",
    "no.1",
    "paling",
    "leading",
    "fungsionalitas",
  ];

  // Bangun konten user prompt dinamis
  let userContent = `
Buat deskripsi pekerjaan dalam format **bullet point** (maksimal 5 poin).  
Setiap poin harus mengikuti struktur ini:  
**(Kata kerja pembuka) + (Peran yang dikerjakan) + (Alat/teknologi yang digunakan, jika ada) + (Tujuan/hasil yang dicapai) + (Durasi atau pencapaian, jika relevan).**
• Tulis poin seperti: Memimpin tim proyek \n• Bertanggung jawab Mengelola akun Media Sosial dari 5k follower ke 100k dalam 1 bulan 
Gunakan bahasa Indonesia yang sederhana, profesional, dan mudah dipahami.  
Tulis hasil akhir hanya berupa bullet point (•) dengan gaya seperti contoh berikut:  
• Memimpin tim proyek pengembangan aplikasi menggunakan React dan Next.js untuk meluncurkan produk tepat waktu dalam 6 bulan  
• Bertanggung jawab mengelola akun media sosial dengan strategi konten kreatif, meningkatkan follower dari 5k menjadi 100k dalam 1 bulan  
Hindari kata klise seperti: ${forbiddenWords.join(", ")}.  

Informasi pekerjaan:  
- Nama pekerjaan: ${jobTitle}  
- Role: ${role}  
- Perusahaan: ${company}
- Deskripsi pekerjaan yang mau dilamar: ${jobDescription}

${beforeGenerate ? `${beforeGenerate} perbaiki ini agar lebih cocok dengan job description` : ""}
`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          stream: true,
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: `You are an expert career consultant and job description writer. Create job descriptions in Indonesian language only, avoiding the words: ${forbiddenWords.join(", ")}.`,
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
