import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { id, user_id, page } = reqBody;

  try {
    // 1. First, get PersonalData IDs related to the CV
    const { data: personalDataRows, error: personalDataError } = await supabase
      .from("PersonalData")
      .select("id")
      .eq("cv_id", id);

    if (personalDataError) throw personalDataError;

    const personalDataIds = personalDataRows.map((row) => row.id);

    // 2. Delete SocialMedia entries using personal_data_id
    if (personalDataIds.length > 0) {
      const { error: socialMediaDeleteError } = await supabase
        .from("SocialMedia")
        .delete()
        .in("personal_data_id", personalDataIds);

      if (socialMediaDeleteError)
        throw new Error(
          `Failed to delete SocialMedia: ${socialMediaDeleteError.message}`
        );
    }

    // 3. Delete other related tables that use cv_id directly
    const tablesToDelete = [
      "WorkExperience",
      "PersonalData",
      "Other",
      "Organisation",
      "Education",
    ];

    for (const table of tablesToDelete) {
      const { error } = await supabase.from(table).delete().eq("cv_id", id);
      if (error)
        throw new Error(`Failed to delete from ${table}: ${error.message}`);
    }

    // 4. Delete the CV
    const { data: deleted, error: deleteError } = await supabase
      .from("Cv")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (deleteError) throw deleteError;

    const limit = 5;

    // Get total count first
    const { count, error: countError } = await supabase
      .from("Cv")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    if (countError) throw countError;

    const totalPages = Math.ceil((count || 0) / limit);

    // If current page is beyond the last page after deletion, move back one
    const correctedPage = page > totalPages ? totalPages : page;
    const from = (correctedPage - 1) * limit;
    const to = from + limit - 1;

    // Fetch updated data using corrected page
    const { data: updatedData, error: fetchError } = await supabase
      .from("Cv")
      .select("*")
      .eq("user_id", user_id)
      .range(from, to);

    if (fetchError) throw fetchError;

    return NextResponse.json({
      deleted,
      updatedData,
      paginations: {
        page: correctedPage,
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
