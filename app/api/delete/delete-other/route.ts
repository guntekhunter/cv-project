import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Delete the 'Other' record by ID
    const { data: deleted, error: deleteError } = await supabase
      .from("Other")
      .delete()
      .eq("id", reqBody.id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 2. Fetch all remaining 'Other' records for the same CV
    const { data: updatedData, error: fetchError } = await supabase
      .from("Other")
      .select("*")
      .eq("cv_id", reqBody.cv_id);

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
