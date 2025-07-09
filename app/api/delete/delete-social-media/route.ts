import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Delete the social media entry by ID
    const { data: deleted, error: deleteError } = await supabase
      .from("SocialMedia")
      .delete()
      .eq("id", reqBody.id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 2. Fetch remaining social media entries for the same personal_data_id
    const { data: updatedData, error: fetchError } = await supabase
      .from("SocialMedia")
      .select("*")
      .eq("personal_data_id", reqBody.personalId)
      .order("order_index", { ascending: true });

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
