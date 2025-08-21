import openai from "@/app/utils/openai";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Required for streaming on Vercel Edge

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { pdfs, required } = reqBody.data;

  console.log("pdf", pdfs);
  console.log("required", required);

  const today = new Date().toISOString().split("T")[0];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          stream: true,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant. Extract structured data from the user's resume into a valid JSON object that matches the database schema.Return ONLY raw JSON (without markdown, without explanations, without code fences).. If you find sekarang or now on end date, today date is ${today}. Make all the date in timestamp format like [year-mount-day 00:00:00]. Format responsibilities in bullet points like • Mengerjakan halaman FAQ untuk website digides selama 1 bulan 22 hari. Use action verbs, include tools/technologies used, and results if possible. Use Indonesian.`,
            },
            {
              role: "user",
              content: `Here is the resume text:\n\n${pdfs}, ${required && `dan sesuaikan isi cvnya dengan pekerjaan yang dilamar, ini lowongan yang akan dilamar ${required}`} \n\nConvert this into the following JSON format:

    {
      "PersonalData": {
        "name": "",
        "myemail": "",
        "no_hp": this is phone numer but integer,
        "address": "",
        "photo": "",
        "professional_summary": "enchange the data that you get and make it structural and better, EXAMPLE: [Professional Title] with [X] years of experience in [industry/field], skilled in [top 2–3 hard/soft skills]. Proven ability to [key achievement or result]. Passionate about [value, goal, or kind of impact you aim to create]. make it in indonesian"
      },
      "Education": [
        {
          "education_type": "[only chose between: universitas, sma, smp, sd, bootcamp]",
          "school_name": "",
          "school_address": "",
          "start_date": "",
          "end_date": "",
          "major": "",
          "ipk": "",
          "order_index": 0
        }
      ],
      "Organisation": [
        {
          "organisation_name": "",
          "address": "",
          "type": "",
          "division": "",
          "responsibility": "",
          "start_date": "",
          "end_date": "",
          "order_index": 0
        }
      ],
      "WorkExperience": [
        {
          "company_name": "",
          "company_address": "",
          "company_description": "",
          "job_name": "[EXAMPLE: Admin, if you dont get one, give it job name based on the information that you got from the resume]",
          "job_type": "[only chouse: magang, penuh waktu, or paruh waktu]",
          "responsibility": "dont use this [""] and this "," 
          "start_date": "",
          "end_date": "",
          "order_index": 0
        }
      ],
      "Other": [
      Convert the following text into JSON. 
Input:
the skill part of the cv

Output format:
[
  { "type": "hardskills", "year": 2024, "name": "..."  profider:if its a certificate, add the profider, [EXAMPLE: binar academy] },
  ...
]

Make each skill into a separate object with the same type and year.
      ],
      "SocialMedia": [
        {
          "name": "",
          "link_or_number": "",
          "order_index": 0
        }
      ]
    }

    Please fill the fields based on the resume. Return JSON only.`,
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
