import openai from "@/app/utils/openai";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Required for streaming on Vercel Edge

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { role, organisationName, division, beforeGenerate } = reqBody.data;

  const encoder = new TextEncoder();

  const forbiddenWords = [
    "fungsional",
    "unggulan",
    "no.1",
    "paling",
    "leading",
    "fungsionalitas",
  ];

  // Bangun konten user prompt dinamis untuk organisasi
  let userContent = `
Buat daftar tanggung jawab dalam organisasi dalam format **bullet point** (maksimal 3 poin).  
Setiap poin harus mengikuti struktur ini:  
**(Kata kerja pembuka) + (Peran yang dikerjakan) + (Program/kegiatan/divisi yang relevan) + (Tujuan/hasil yang dicapai) + (Durasi atau pencapaian, jika relevan).**

Contoh gaya penulisan:  
• Memimpin divisi kreatif dalam menyusun program kerja tahunan untuk meningkatkan partisipasi anggota sebanyak 30%  
• Bertanggung jawab mengoordinasi acara sosial bersama tim, berhasil melibatkan lebih dari 200 peserta dalam 3 bulan  

Gunakan bahasa Indonesia yang sederhana, profesional, dan mudah dipahami.  
Hindari kata klise seperti: ${forbiddenWords.join(", ")}.  

Informasi organisasi:  
- Nama organisasi: ${organisationName}  
- Divisi: ${division}  
- Role/Jabatan: ${role}  

${beforeGenerate ? `${beforeGenerate} → perbaiki ini agar lebih relevan dengan jabatan organisasi` : ""}
`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: `You are an expert career consultant and organisation role writer. Create responsibility descriptions in Indonesian language only, avoiding the words: ${forbiddenWords.join(", ")}.`,
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
