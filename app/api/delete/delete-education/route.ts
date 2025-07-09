import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { id, cv } = reqBody;

  try {
    // 1. Delete the education row
    const { data: deleted, error: deleteError } = await supabase
      .from("Education")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 2. Fetch updated list of education rows for this cv
    const { data: updatedData, error: fetchError } = await supabase
      .from("Education")
      .select("*")
      .eq("cv_id", cv)
      .order("order_index", { ascending: true });

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
