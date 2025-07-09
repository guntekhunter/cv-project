import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Update the specific organisation entry
    const { data: updatedOrg, error: updateError } = await supabase
      .from("Organisation")
      .update(reqBody)
      .eq("id", reqBody.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Fetch all updated organisations (optionally you can filter by cv_id)
    const { data: updatedData, error: fetchError } = await supabase
      .from("Organisation")
      .select("*");

    if (fetchError) throw fetchError;

    return NextResponse.json({
      data: updatedOrg,
      updatedData,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
