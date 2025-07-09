import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust path as needed

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const cv_id = parseInt(reqBody.cv_id);
    const personal_data_id = parseInt(reqBody.user_id);

    // Fetch cv data
    const { data: cvData, error: cvError } = await supabase
      .from("Cv")
      .select("*")
      .eq("id", cv_id)
      .single();

    if (cvError) throw cvError;

    // Fetch personal data
    const { data: biodata, error: biodataError } = await supabase
      .from("PersonalData")
      .select("*")
      .eq("cv_id", cv_id)
      .single();

    if (biodataError) throw biodataError;

    // Fetch organisations
    const { data: organisations, error: orgError } = await supabase
      .from("Organisation")
      .select("*")
      .eq("cv_id", cv_id)
      .order("order_index", { ascending: true });

    if (orgError) throw orgError;

    // Fetch jobs
    const { data: jobs, error: jobError } = await supabase
      .from("WorkExperience")
      .select("*")
      .eq("cv_id", cv_id)
      .order("order_index", { ascending: true });

    if (jobError) throw jobError;

    // Fetch educations
    const { data: educations, error: eduError } = await supabase
      .from("Education")
      .select("*")
      .eq("cv_id", cv_id)
      .order("order_index", { ascending: true });

    if (eduError) throw eduError;

    // Fetch social medias
    const { data: socialMedias, error: smError } = await supabase
      .from("SocialMedia")
      .select("*")
      .eq("personal_data_id", personal_data_id)
      .order("order_index", { ascending: true });

    if (smError) throw smError;

    // Fetch others
    const { data: others, error: otherError } = await supabase
      .from("Other")
      .select("*")
      .eq("cv_id", cv_id);

    if (otherError) throw otherError;

    return NextResponse.json({
      status: true,
      cvData,
      biodata,
      organisations,
      jobs,
      educations,
      socialMedias,
      others,
    });
  } catch (err: any) {
    console.error("Failed to fetch CV data:", err?.message || err);
    return NextResponse.json({
      status: false,
      error: err.message || "Something went wrong",
    });
  }
}
