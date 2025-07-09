import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust path if necessary

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { id } = reqBody;

  try {
    // 1. Delete the CV
    const { data: deleted, error: deleteError } = await supabase
      .from("Cv")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 2. Fetch updated list of all CVs
    const { data: updatedData, error: fetchError } = await supabase
      .from("Cv")
      .select("*")
      .order("id", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({
      deleted,
      updatedData,
    });
  } catch (err: any) {
    console.error("Supabase error:", err.message || err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
