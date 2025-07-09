import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the import path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Update the education record by ID
    const { data: newEducation, error: updateError } = await supabase
      .from("Education")
      .update(reqBody)
      .eq("id", reqBody.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // 2. Fetch all education records (optional: filter by cv_id)
    const { data: updatedEducation, error: fetchError } = await supabase
      .from("Education")
      .select("*");

    if (fetchError) throw fetchError;

    return NextResponse.json({
      data: newEducation,
      updatedData: updatedEducation,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
