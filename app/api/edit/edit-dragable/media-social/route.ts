import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Update order_index in parallel using Supabase
    const updatePromises = reqBody.map((item: any, index: number) =>
      supabase
        .from("SocialMedia")
        .update({ order_index: index })
        .eq("id", item.id)
    );

    const results = await Promise.all(updatePromises);

    // Check for any individual error
    const failed = results.find((res) => res.error);
    if (failed?.error) throw failed.error;

    // Fetch all social media records, ordered
    const { data: socialMedias, error: fetchError } = await supabase
      .from("SocialMedia")
      .select("*")
      .order("order_index", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({
      status: 200,
      socialMedias,
    });
  } catch (err: any) {
    console.error("Update failed:", err);
    return NextResponse.json({
      status: 500,
      error: err.message || err,
    });
  }
}
