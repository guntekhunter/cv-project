import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Make sure the path is correct

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = parseInt(reqBody.personal_id);

    console.log("personal_data_id:", id);

    const { data: socialMedias, error } = await supabase
      .from("SocialMedia")
      .select("*")
      .eq("personal_data_id", id)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      socialMedias,
    });
  } catch (err) {
    console.error("Failed to fetch socialMedias:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
