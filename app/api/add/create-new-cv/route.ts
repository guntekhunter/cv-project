import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust path if needed

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

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

  // 1. Insert into CV and get the generated ID
  //   const { data: cvData, error: cvError } = await supabase
  //     .from("Cv")
  //     .insert([{ user_id }])
  //     .select()
  //     .single(); // 🔥 this gives you the inserted row

  //   if (cvError || !cvData?.id) {
  //     return NextResponse.json(
  //       { error: cvError?.message || "Failed to create CV" },
  //       { status: 400 }
  //     );
  //   }

  //   const cvId = cvData.id;
  const cvId = 80;

  // 1. Strip `id` and insert personal data
  const personalDataWithId = {
    ...stripId(PersonalData),
    cv_id: cvId,
  };

  console.log("🧠 PersonalData input before insert:", PersonalData);
  const { data: personal, error: personalError } = await supabase
    .from("PersonalData")
    .insert(personalDataWithId)
    .select()
    .single();
  console.log("👉 Personal insert result:", personal, personalError);

  if (personalError || !personal?.id) {
    return NextResponse.json(
      { error: personalError?.message || "Failed to create personal data" },
      { status: 400 }
    );
  }

  const personalId = personal.id;

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
  // 6. Work Experience
  if (SocialMedia.length) {
    const workWithId = SocialMedia.map(stripId).map((w: any) => ({
      ...w,
      cv_id: cvId,
      personal_data_id: personalId,
    }));
    await supabase.from("SocialMedia").insert(workWithId);
  }

  return NextResponse.json({ success: true, cv_id: cvId });
}
