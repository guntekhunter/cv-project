import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust path if needed

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = parseInt(reqBody.cv_id);

    const { data: others, error } = await supabase
      .from("Other") // your table name, make sure it's correct
      .select("*")
      .eq("cv_id", id);

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      others,
    });
  } catch (err) {
    console.error("Failed to fetch others:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
