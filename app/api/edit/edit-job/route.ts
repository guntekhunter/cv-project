import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust this path as needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Update the specific WorkExperience entry by ID
    const { data: updatedJob, error: updateError } = await supabase
      .from("WorkExperience")
      .update(reqBody)
      .eq("id", reqBody.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // 2. Fetch all WorkExperience entries (you can filter by cv_id if needed)
    const { data: updatedData, error: fetchError } = await supabase
      .from("WorkExperience")
      .select("*")
      .eq("cv_id", reqBody.cv_id);

    if (fetchError) throw fetchError;

    return NextResponse.json({ data: updatedJob, updatedData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
