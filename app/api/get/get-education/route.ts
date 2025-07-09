import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the import path if needed

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = parseInt(reqBody.cv_id);

    const { data: educations, error } = await supabase
      .from("Education") // Ensure the table name matches your Supabase schema
      .select("*")
      .eq("cv_id", id)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      educations,
    });
  } catch (err) {
    console.error("Failed to fetch educations:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
