import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust if path differs

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Delete the job entry
    const { data: deleted, error: deleteError } = await supabase
      .from("WorkExperience")
      .delete()
      .eq("id", reqBody.id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 2. Fetch updated job list by cv_id
    const { data: updatedData, error: fetchError } = await supabase
      .from("WorkExperience")
      .select("*")
      .eq("cv_id", reqBody.cv);

    if (fetchError) throw fetchError;

    return NextResponse.json({
      deleted,
      updatedData,
    });
  } catch (err: any) {
    console.error("Supabase error:", err);
    return NextResponse.json(
      { status: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
