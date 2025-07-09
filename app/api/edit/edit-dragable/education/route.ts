import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust import path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // 1. Apply order_index updates in parallel
    const updatePromises = reqBody.map((item: any, index: number) =>
      supabase
        .from("Education")
        .update({ order_index: index })
        .eq("id", item.id)
    );

    const results = await Promise.all(updatePromises);

    const failed = results.find((res) => res.error);
    if (failed?.error) throw failed.error;

    // 2. Fetch all education records sorted by order_index
    const { data: educations, error: fetchError } = await supabase
      .from("Education")
      .select("*")
      .order("order_index", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({
      status: 200,
      educations,
    });
  } catch (err: any) {
    console.error("Update failed:", err);
    return NextResponse.json({
      status: 500,
      error: err.message || err,
    });
  }
}
