import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust the import path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Batch update using Promise.all
    const updatePromises = reqBody.map((item: any, index: number) =>
      supabase
        .from("Organisation")
        .update({ order_index: index })
        .eq("id", item.id)
    );

    const results = await Promise.all(updatePromises);

    // Check for any update errors
    const error = results.find((res) => res.error);
    if (error?.error) throw error.error;

    // Fetch updated data ordered by order_index
    const { data: allOrganisations, error: fetchError } = await supabase
      .from("Organisation")
      .select("*")
      .order("order_index", { ascending: true });

    if (fetchError) throw fetchError;

    return NextResponse.json({
      status: 200,
      updatedData: allOrganisations,
    });
  } catch (err: any) {
    console.error("Update failed:", err);
    return NextResponse.json({ status: 500, error: err.message || err });
  }
}
