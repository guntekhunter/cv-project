import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust path if needed

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Utility to remove `id`
  const stripId = (obj: any) => {
    const { id, cv_id, ...rest } = obj;
    return rest;
  };

  const {
    user_id,
    PersonalData,
    Education,
    Organisation,
    Other,
    WorkExperience,
    SocialMedia,
  } = body;

  console.log(user_id, "user id didalam buat baru");

  // 0. Pastikan CV sudah ada (atau buat baru)
  const { data: cvData, error: cvError } = await supabase
    .from("Cv")
    .insert([
      {
        user_id,
        type: 0, // or any fallback
        temp_token: null,
      },
    ])
    .select()
    .single();

  if (cvError || !cvData?.id) {
    return NextResponse.json(
      { error: "Gagal membuat CV entry: " + cvError?.message },
      { status: 400 }
    );
  }

  const cvId = cvData.id;

  // 1. Strip `id` and insert personal data
  const personalDataWithId = {
    ...stripId(PersonalData),
    cv_id: cvId,
  };

  // console.log("🧠 PersonalData input before insert:", PersonalData);
  const { data: personal, error: personalError } = await supabase
    .from("PersonalData")
    .insert(personalDataWithId)
    .select()
    .single();
  // console.log("👉 Personal insert result:", personal, personalError);

  if (personalError || !personal?.id) {
    return NextResponse.json(
      { error: personalError?.message || "Failed to create personal data" },
      { status: 400 }
    );
  }

  const personalId = personal.id;

  console.log(personalId, "ini personal data dinya");

  // 2. Education
  if (Education.length) {
    const educationWithId = Education.map(stripId).map((e: any) => ({
      ...e,
      cv_id: cvId,
    }));
    await supabase.from("Education").insert(educationWithId);
  }

  // 3. Organisation
  if (Organisation.length) {
    const orgWithId = Organisation.map(stripId).map((o: any) => ({
      ...o,
      cv_id: cvId,
    }));
    await supabase.from("Organisation").insert(orgWithId);
  }

  // 4. Other
  if (Other.length) {
    const otherWithId = Other.map(stripId).map((o: any) => ({
      ...o,
      cv_id: cvId,
    }));
    await supabase.from("Other").insert(otherWithId);
  }

  // 5. Work Experience
  if (WorkExperience.length) {
    const workWithId = WorkExperience.map(stripId).map((w: any) => ({
      ...w,
      cv_id: cvId,
    }));
    await supabase.from("WorkExperience").insert(workWithId);
  }
  let thePersonalId;
  // 6. Work Experience
  if (SocialMedia.length) {
    const workWithId = SocialMedia.map(stripId).map((w: any) => ({
      ...w,
      personal_data_id: personalId,
    }));
    thePersonalId = workWithId.personal_data_id;
    const data = await supabase.from("SocialMedia").insert(workWithId);

    console.log(data);
  }

  return NextResponse.json({
    success: true,
    cv_id: cvId,
    personal_id: personalDataWithId,
  });
}
