import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the path if necessary

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Update the specific "other" record
    const { data: updated, error: updateError } = await supabase
      .from("Other")
      .update(reqBody)
      .eq("id", reqBody.id)
      .eq("cv_id", reqBody.cv_id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Fetch all updated "other" records (you can filter by cv_id if needed)
    const { data: updatedData, error: fetchError } = await supabase
      .from("Other")
      .select("*");

    if (fetchError) throw fetchError;

    return NextResponse.json({ data: updated, updatedData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
