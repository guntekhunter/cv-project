import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, firstName, lastName } = await req.json();

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_EMAIL_API!, // Store in .env
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        // attributes: {
        //   FIRSTNAME: firstName,
        //   LASTNAME: lastName,
        // },
        listIds: [5], // Replace with your list ID from Brevo
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
