import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the path as needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Update the social media entry by id
    const { data: updated, error: updateError } = await supabase
      .from("Cv")
      .update({ cv_name: reqBody.cv_name })
      .eq("id", reqBody.cv_id)
      .select()
      .maybeSingle();

    if (updateError) throw updateError;

    // Fetch all social media entries
    const { data: updatedData, error: fetchError } = await supabase
      .from("Cv")
      .select("*")
      .order("id", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({
      data: updated,
      updatedData,
    });
  } catch (err: any) {
    console.error("Supabase update error:", err.message || err);
    return NextResponse.json(
      { error: err.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
