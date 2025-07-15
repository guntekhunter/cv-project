import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Check if the personalData exists
    const { data: existing, error: findError } = await supabase
      .from("PersonalData")
      .select("*")
      .eq("id", reqBody.id)
      .single();

    if (findError || !existing) {
      return NextResponse.json(
        { error: `No personalData found for id ${reqBody.id}` },
        { status: 404 }
      );
    }

    // Update the personalData
    const { data: updated, error: updateError } = await supabase
      .from("PersonalData")
      .update(reqBody)
      .eq("id", reqBody.id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Get all updated personalData
    const { data: updatedData, error: fetchError } = await supabase
      .from("PersonalData")
      .select("*");

    if (fetchError) throw fetchError;

    return NextResponse.json({
      status: "Ok",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
