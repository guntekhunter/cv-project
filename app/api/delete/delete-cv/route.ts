import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { id, user_id, page } = reqBody;

  try {
    const { data: personalDataRows, error: personalDataError } = await supabase
      .from("PersonalData")
      .select("id")
      .eq("cv_id", id);
    if (personalDataError) throw personalDataError;

    const personalDataIds = personalDataRows.map((row) => row.id);

    if (personalDataIds.length > 0) {
      const { error: socialMediaDeleteError } = await supabase
        .from("SocialMedia")
        .delete()
        .in("personal_data_id", personalDataIds);
      if (socialMediaDeleteError) throw socialMediaDeleteError;
    }

    const tablesToDelete = [
      "WorkExperience",
      "PersonalData",
      "Other",
      "Organisation",
      "Education",
    ];

    for (const table of tablesToDelete) {
      const { error } = await supabase.from(table).delete().eq("cv_id", id);
      if (error) throw error;
    }

    // ✅ Just delete without returning the deleted row
    const { error: deleteError } = await supabase
      .from("Cv")
      .delete()
      .eq("id", id);
    if (deleteError) throw deleteError;

    const limit = 5;

    // ✅ Count after deletion
    const { count, error: countError } = await supabase
      .from("Cv")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);
    if (countError) throw countError;

    const total = count || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const correctedPage = page > totalPages ? totalPages : page;

    const from = (correctedPage - 1) * limit;
    const to = from + limit - 1;

    const { data: updatedData, error: fetchError } = await supabase
      .from("Cv")
      .select("*")
      .eq("user_id", user_id)
      .range(from, to);
    if (fetchError) throw fetchError;

    return NextResponse.json({
      updatedData,
      paginations: {
        page: correctedPage,
        limit,
        total,
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
