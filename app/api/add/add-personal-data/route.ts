import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

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
          link: reqBody.link,
          portfolio: reqBody.portfolio,
          address: reqBody.address,
          professional_summary: reqBody.professional_summary,
          photo: reqBody.photo,
          name: reqBody.name,
          no_hp: reqBody.no_hp,
          email: reqBody.email,
        },
      });
    } else {
      // If it doesn't exist, create a new entry
      result = await prisma.personalData.create({
        data: {
          link: reqBody.link,
          portfolio: reqBody.portfolio,
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
