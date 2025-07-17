import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust import path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Insert new work experience
    const { data: newJob, error: insertError } = await supabase
      .from("WorkExperience")
      .insert([
        {
          company_name: reqBody.company_name,
          company_address: reqBody.company_address,
          responsibility: reqBody.responsibility,
          company_description: reqBody.company_description,
          job_type: reqBody.job_type,
          job_name: reqBody.job_name,
          start_date: reqBody.start_date, // Ensure this is ISO string format: "YYYY-MM-DD"
          end_date: reqBody.end_date,
          cv_id: reqBody.cv_id,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    // 2. Fetch all jobs related to this CV, ordered by order_index
    const { data: jobs, error: fetchError } = await supabase
      .from("WorkExperience")
      .select("*")
      .eq("cv_id", reqBody.cv_id)
      .order("order_index", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({ status: true, data: newJob, jobs });
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
