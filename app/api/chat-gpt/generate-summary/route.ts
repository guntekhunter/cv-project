import openai from "@/app/utils/openai";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Required for streaming on Vercel Edge

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { personal, requirenment } = reqBody.data;

  const encoder = new TextEncoder();

  // Bangun konten user prompt dinamis
  let userContent = `Write a single, compelling **professional summary** (3–5 sentences) for a CV.  
The summary must highlight the candidate’s most relevant skills, experience, and career goals in a professional yet approachable tone.  
Avoid clichés, exaggerated claims, and keep it clear and concise. Candidate Information: ${personal}. hindari kalimat semacam ini [serta kemampuan untuk bekerja secara kolaboratif dalam tim yang dinamis. Berkomitmen untuk terus mengembangkan keterampilan dan berkontribusi pada pertumbuhan perusahaan dengan pendekatan yang inovatif dan solusi yang efektif. Mencari kesempatan untuk menerapkan pengetahuan dan pengalaman dalam [sebutkan tujuan karir atau posisi yang diinginkan].] terlalu berat buat lebih ringan, ini contoh profesional summarynya [Digital marketing professional with 5 years of experience specializing in SEO, content strategy, and paid advertising. Proven ability to increase organic traffic by 200% within one year. Seeking a role as a Digital Marketing Specialist where I can apply data-driven strategies to help businesses grow their online presence.] jangan gunakan kalimat itu persis, berikan semacam template yang bisa mereka gunakan jika job descritionnya belum tersedia, hindari kalimat ini [**Ringkasan Profesional:**]`;

  if (requirenment) {
    userContent += ` Also consider this requirement: ${requirenment}.`;
  }

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
              content: `You are an expert career consultant and professional CV writer. created it using Indonesian language`,
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
