import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { user_id, page = 1, limit = 10 } = body;

    console.log(user_id, "ini usernya", body);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const {
      data: cv,
      error,
      count,
    } = await supabase
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
      `,
        { count: "exact" } // so we get the total count
      )
      .eq("user_id", user_id)
      .order("id", { ascending: true })
      .range(from, to);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      cv,
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    });
  } catch (err) {
    console.error("Failed to fetch CV data:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
