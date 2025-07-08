import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  let reqBody = await req.json();
  console.log("ini isinyaaa", reqBody);
  try {
  } catch (err) {
    return NextResponse.json(
      { status: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  if (!reqBody || typeof reqBody !== "object") {
    return NextResponse.json(
      { status: false, error: "Payload must be a valid object" },
      { status: 400 }
    );
  }

  try {
    // Check if a personalData with this cv_id already exists
    const existing = await prisma.personalData.findFirst({
      where: {
        cv_id: reqBody.cv_id,
      },
    });

    let result;

    if (existing) {
      // If it exists, update it
      result = await prisma.personalData.update({
        where: { id: existing.id },
        data: {
          address: reqBody.address,
          professional_summary: reqBody.professional_summary,
          photo: reqBody.photo,
          name: reqBody.name,
          no_hp: reqBody.no_hp,
          email: reqBody.email,
        },
      });
    } else {
      console.log("inimi", reqBody);
      // If it doesn't exist, create a new entry
      result = await prisma.personalData.create({
        data: {
          address: reqBody.address,
          professional_summary: reqBody.professional_summary,
          photo: reqBody.photo,
          name: reqBody.name,
          cv_id: reqBody.cv_id,
          no_hp: reqBody.no_hp,
          email: reqBody.email,
        },
      });
    }

    return NextResponse.json({ status: true, data: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, error: err });
  }
}
