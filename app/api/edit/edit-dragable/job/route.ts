import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Update each item’s order_index in parallel
    const updatePromises = reqBody.map((item: any, index: number) =>
      supabase
        .from("WorkExperience")
        .update({ order_index: index })
        .eq("id", item.id)
    );

    const results = await Promise.all(updatePromises);

    const failed = results.find((res) => res.error);
    if (failed?.error) throw failed.error;

    // Fetch updated list of WorkExperience
    const { data: updatedData, error: fetchError } = await supabase
      .from("WorkExperience")
      .select("*")
      .order("order_index", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({
      status: 200,
      updatedData,
    });
  } catch (err: any) {
    console.error("Update failed:", err);
    return NextResponse.json({
      status: 500,
      error: err.message || err,
    });
  }
}
