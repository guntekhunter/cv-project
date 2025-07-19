import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { text } = reqBody; // ambil text dari PDF atau input CV

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o", // atau gpt-4.1 kalau kamu mau
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Extract structured data from the user's resume into a valid JSON object that matches the database schema. Return **ONLY** JSON. Do not explain anything.",
        },
        {
          role: "user",
          content: `Here is the resume text:\n\n${text}\n\nConvert this into the following JSON format:

{
  "PersonalData": {
    "name": "",
    "myemail": "",
    "no_hp": "",
    "address": "",
    "photo": "",
    "professional_summary": ""
  },
  "Education": [
    {
      "education_type": "",
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
      "job_name": "",
      "job_type": "",
      "responsibility": "",
      "start_date": "",
      "end_date": "",
      "order_index": 0
    }
  ],
  "Other": [
    {
      "name": "",
      "type": "soft_skils",
      "year": "",
      "profider": ""
    }
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
      temperature: 0.2,
    });

    const extractedJSON = completion.choices[0].message.content;

    // Try parsing to confirm it's valid JSON
    const parsed = JSON.parse(extractedJSON!);

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("OpenAI error:", err.message || err);
    return NextResponse.json(
      { error: "Failed to generate JSON from OpenAI." },
      { status: 500 }
    );
  }
}
