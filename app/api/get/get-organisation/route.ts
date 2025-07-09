import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust import path as needed

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = parseInt(reqBody.cv_id);

    const { data: organisations, error } = await supabase
      .from("Organisation") // Adjust table name if needed
      .select("*")
      .eq("cv_id", id)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      organisations,
    });
  } catch (err) {
    console.error("Failed to fetch organisations:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
