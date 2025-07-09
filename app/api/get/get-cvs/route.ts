import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust path as needed

export async function POST(req: NextRequest) {
  try {
    const user_id = await req.json();
    console.log(user_id);

    const { data: cv, error } = await supabase
      .from("Cv")
      .select(
        `
        *,
        PersonalData (
          *,
          SocialMedia(*)
        ),
        Organisation(*),
        WorkExperience(*),
        Education(*),
        Other(*)
      `
      )
      .eq("user_id", user_id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      cv,
    });
  } catch (err) {
    console.error("Failed to fetch CV data:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
