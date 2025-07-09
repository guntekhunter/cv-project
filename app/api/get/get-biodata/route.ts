import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust import path as necessary

export async function POST(req: NextRequest) {
  try {
    const cv = await req.json();
    const id = parseInt(cv); // Ensure it's a number

    const { data: biodatas, error } = await supabase
      .from("PersonalData") // table name in Supabase
      .select("*")
      .eq("cv_id", id)
      .single(); // return single object instead of array

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      biodatas,
    });
  } catch (err) {
    console.error("Failed to fetch personalData:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
