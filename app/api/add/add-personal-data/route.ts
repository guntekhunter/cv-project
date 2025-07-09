import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust path as needed

export async function POST(req: NextRequest) {
  let reqBody;

  // Content-Type and JSON validation
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { status: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    reqBody = await req.json();
    if (!reqBody || typeof reqBody !== "object") {
      return NextResponse.json(
        { status: false, error: "Payload must be a valid object" },
        { status: 400 }
      );
    }

    console.log("reqBody:", reqBody);
  } catch (err) {
    return NextResponse.json(
      { status: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  try {
    // Check if existing personalData with same cv_id
    const { data: existing, error: findError } = await supabase
      .from("PersonalData")
      .select("*")
      .eq("cv_id", reqBody.cv_id)
      .single();

    let result;

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from("PersonalData")
        .update({
          address: reqBody.address,
          professional_summary: reqBody.professional_summary,
          photo: reqBody.photo,
          name: reqBody.name,
          no_hp: reqBody.no_hp,
          myemail: reqBody.email,
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from("PersonalData")
        .insert([
          {
            address: reqBody.address,
            professional_summary: reqBody.professional_summary,
            photo: reqBody.photo,
            name: reqBody.name,
            cv_id: reqBody.cv_id,
            no_hp: reqBody.no_hp,
            myemail: reqBody.email,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ status: true, data: result });
  } catch (err: any) {
    console.error("Database error:", err);
    return NextResponse.json(
      {
        status: false,
        error: err.message || "Unknown server error",
        stack: err.stack || null,
      },
      { status: 500 }
    );
  }
}
