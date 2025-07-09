// app/api/delete-image/route.ts

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { supabase } from "@/lib/supabase"; // adjust path if needed

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const public_id = body.public_id;
    const id = body.id;

    if (!public_id || !id) {
      return NextResponse.json(
        { error: "Missing public_id or id" },
        { status: 400 }
      );
    }

    const idPublic = public_id.toString();
    console.log("Deleting Cloudinary image:", idPublic);

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(idPublic);

    // Clear the photo field in Supabase
    const { data: updatedRow, error: updateError } = await supabase
      .from("PersonalData")
      .update({ photo: "" })
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Check if photo is already empty (redundant now but kept from original)
    if (!updatedRow?.photo) {
      return NextResponse.json({
        success: true,
        message: "Photo already empty.",
      });
    }

    // Get all updated personal data
    const { data: updatedData, error: fetchError } = await supabase
      .from("PersonalData")
      .select("*");

    if (fetchError) throw fetchError;

    return NextResponse.json({
      success: true,
      result,
      data: updatedRow,
      updatedData,
    });
  } catch (err: any) {
    console.error("Error deleting image:", err?.message || err);
    return NextResponse.json(
      { success: false, error: err.message || err },
      { status: 500 }
    );
  }
}
