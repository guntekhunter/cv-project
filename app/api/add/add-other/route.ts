import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Update this path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Check for existing record with the same type, name, year, and cv_id
    const { data: existing, error: findError } = await supabase
      .from("Other")
      .select("*")
      .eq("type", reqBody.type)
      .eq("name", reqBody.name)
      .eq("year", reqBody.year)
      .eq("cv_id", reqBody.cv_id)
      .maybeSingle();

    let newOther;

    if (findError) throw findError;

    if (existing) {
      // 2. Update existing entry
      const { data, error } = await supabase
        .from("Other")
        .update({
          type: reqBody.type,
          name: reqBody.name,
          year: reqBody.year,
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      newOther = data;
    } else {
      // 3. Create a new entry
      const { data, error } = await supabase
        .from("Other")
        .insert([reqBody])
        .select()
        .single();

      if (error) throw error;
      newOther = data;
    }

    // 4. Get updated list of all "Other" entries for given cv_id
    const { data: others, error: listError } = await supabase
      .from("Other")
      .select("*")
      .eq("cv_id", reqBody.cv_id)
      .order("id", { ascending: true });

    if (listError) throw listError;

    return NextResponse.json({ status: true, data: newOther, others });
  } catch (err: any) {
    console.error("Supabase error:", err);
    return NextResponse.json(
      {
        status: false,
        error: err.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}
