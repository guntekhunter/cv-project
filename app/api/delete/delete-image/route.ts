// app/api/delete-image/route.ts

import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

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

    if (!public_id) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }

    const idPublic = public_id.toString();
    console.log("ini public idnya", idPublic);

    const result = await cloudinary.uploader.destroy(idPublic);

    const newPersonalData = await prisma.personalData.update({
      where: { id },
      data: { photo: "" },
    });

    const updatedPersonalData = await prisma.personalData.findMany();
    const existingData = await prisma.personalData.findUnique({
      where: { id },
    });
    if (!existingData?.photo) {
      return NextResponse.json({
        success: true,
        message: "Photo already empty.",
      });
    }

    return NextResponse.json({
      success: true,
      result,
      data: newPersonalData,
      updatedData: updatedPersonalData,
    });
  } catch (err: any) {
    console.error("Error deleting image:", err?.message || err);
    return NextResponse.json(
      { success: false, error: err.message || err },
      { status: 500 }
    );
  }
}
