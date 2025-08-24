import openai from "@/app/utils/openai";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { cvText } = await req.json();
  const encoder = new TextEncoder();

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
              content:
                "You are a CV scoring assistant. Output ONLY raw JSON objects, one per line (JSONL). No markdown, no extra text, no commas between objects. make it in indonesian",
            },
            {
              role: "user",
              content: `
Score this CV section by section.
For each section, output one JSON object per line in JSONL format:
{ "section": "summary", "score": 7, "suggestion": "..." }

CV Content:
${cvText}

Sections: informasi personal, deskripsi diri, riwayat pekerjaan, pendidikan, skill, format, penulisan
`,
            },
          ],
        });

        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }

        controller.close();
      } catch (err: any) {
        controller.enqueue(
          encoder.encode(JSON.stringify({ error: err.message }))
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/jsonl; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
