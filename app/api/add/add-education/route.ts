import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Use your centralized Supabase client

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Insert new education record
    const { data: newEducation, error: insertError } = await supabase
      .from("Education")
      .insert([
        {
          school_name: reqBody.school_name,
          major: reqBody.major,
          ipk: reqBody.ipk,
          education_type: reqBody.education_type,
          school_address: reqBody.school_address,
          start_date: reqBody.start_date, // Ensure this is ISO format: "YYYY-MM-DD"
          end_date: reqBody.end_date,
          cv_id: reqBody.cv_id,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    // 2. Fetch all education entries for the same CV
    const { data: educations, error: fetchError } = await supabase
      .from("Education")
      .select("*")
      .eq("cv_id", reqBody.cv_id)
      .order("order_index", { ascending: true }); // Remove if order_index doesn't exist

    if (fetchError) throw fetchError;

    return NextResponse.json({ status: true, data: newEducation, educations });
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
