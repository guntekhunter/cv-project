import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Delete personal data entry by ID
    const { data: deleted, error: deleteError } = await supabase
      .from("PersonalData")
      .delete()
      .eq("id", reqBody.id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 2. Fetch all remaining personal data entries
    const { data: updatedData, error: fetchError } = await supabase
      .from("PersonalData")
      .select("*");

    if (fetchError) throw fetchError;

    return NextResponse.json({
      deleted,
      updatedData,
    });
  } catch (err: any) {
    console.error("Supabase error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
