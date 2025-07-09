import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Delete the organisation by ID
    const { data: deleted, error: deleteError } = await supabase
      .from("Organisation")
      .delete()
      .eq("id", reqBody.id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 2. Fetch updated list of organisations for the same CV
    const { data: organisations, error: fetchError } = await supabase
      .from("Organisation")
      .select("*")
      .eq("cv_id", reqBody.cv); // Make sure `cv` is correct

    if (fetchError) throw fetchError;

    return NextResponse.json({
      deleted,
      organisations,
    });
  } catch (err: any) {
    console.error("Supabase error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
