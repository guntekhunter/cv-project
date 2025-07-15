import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the path if needed

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { insight, user_id } = data;

  console.log(insight, user_id, "ini bede");

  try {
    const { data: updated, error: updateError } = await supabase
      .from("user")
      .update({ insight })
      .eq("id", user_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ data: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
