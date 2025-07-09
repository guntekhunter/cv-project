import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "../../../../lib/supabase"; // adjust path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const sessionId = randomUUID();

  console.log("ini datanya", reqBody);

  try {
    let newCv;

    if (!reqBody.user_id) {
      // Guest CV
      const { data, error } = await supabase
        .from("Cv")
        .insert([{ type: reqBody.type, temp_token: sessionId }])
        .select()
        .single();

      if (error) throw error;
      newCv = data;
    } else {
      // Registered user
      const { data, error } = await supabase
        .from("Cv")
        .insert([{ type: reqBody.type, user_id: reqBody.user_id }])
        .select()
        .single();

      if (error) throw error;
      newCv = data;
    }

    return NextResponse.json({ status: true, data: newCv });
  } catch (err: any) {
    console.error("Failed to create CV:", err.message);
    return NextResponse.json(
      { status: false, error: err.message },
      { status: 500 }
    );
  }
}
