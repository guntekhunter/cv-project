import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the path if needed

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = parseInt(reqBody.cv_id);

    const { data: jobs, error } = await supabase
      .from("WorkExperience") // Replace with your actual Supabase table name if different
      .select("*")
      .eq("cv_id", id)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      jobs,
    });
  } catch (err) {
    console.error("Failed to fetch work experience:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
