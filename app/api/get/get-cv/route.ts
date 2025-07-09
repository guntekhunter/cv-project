import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the path as needed

export async function POST(req: NextRequest) {
  try {
    const id = await req.json();

    const { data: cv, error } = await supabase
      .from("Cv")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      cv,
    });
  } catch (err) {
    console.error("Failed to fetch CV:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
