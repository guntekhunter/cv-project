import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { id, user_id, page } = reqBody;

  try {
    // 1. Delete related data
    const tablesToDelete = [
      "SocialMedia",
      "WorkExperience",
      "PersonalData",
      "Other",
      "Organisation",
      "Education",
    ];

    //get the personal data fist use the id to delete social media

    for (const table of tablesToDelete) {
      const { error } = await supabase.from(table).delete().eq("cv_id", id);
      if (error)
        throw new Error(`Failed to delete from ${table}: ${error.message}`);
    }

    // 2. Delete the CV
    const { data: deleted, error: deleteError } = await supabase
      .from("Cv")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // 3. Get updated CV list
    const limit = 5;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const {
      data: updatedData,
      error: fetchError,
      count,
    } = await supabase
      .from("Cv")
      .select("*", { count: "exact" })
      .eq("user_id", user_id)
      .range(from, to);

    if (fetchError) throw fetchError;

    const totalPages = Math.ceil((count || 0) / limit);

    if (fetchError) throw fetchError;

    return NextResponse.json({
      deleted,
      updatedData,
      paginations: {
        page,
        limit,
        total: count,
        totalPages,
      },
    });
  } catch (err: any) {
    console.error("Supabase delete error:", err.message || err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
