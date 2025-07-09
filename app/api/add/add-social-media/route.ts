import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust path if needed

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  const { data: incoming, userId } = reqBody;

  try {
    // Check if social media with same name exists
    const { data: existing, error: findError } = await supabase
      .from("SocialMedia")
      .select("id")
      .eq("name", incoming.name)
      .eq("personal_data_id", userId)
      .single();

    let newOther;

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from("SocialMedia")
        .update({ link_or_number: incoming.link_or_number })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      newOther = data;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from("SocialMedia")
        .insert([
          {
            name: incoming.name,
            link_or_number: incoming.link_or_number,
            personal_data_id: userId,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      newOther = data;
    }

    // Return all social medias for this user ordered by order_index
    const { data: socialMedias, error: listError } = await supabase
      .from("SocialMedia")
      .select("*")
      .eq("personal_data_id", userId)
      .order("order_index", { ascending: true });

    if (listError) throw listError;

    return NextResponse.json({
      status: true,
      data: newOther,
      socialMedias,
    });
  } catch (err: any) {
    console.error("Error handling social media:", err.message || err);
    return NextResponse.json(
      { status: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
