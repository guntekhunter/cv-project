import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Check if a social media with the same name already exists for this user
    const existing = await prisma.socialMedia.findFirst({
      where: {
        name: reqBody.data.name,
        personal_data_id: reqBody.userId,
      },
    });

    let newOther;

    if (existing) {
      // Update the existing social media
      newOther = await prisma.socialMedia.update({
        where: { id: existing.id },
        data: {
          link_or_number: reqBody.data.link_or_number,
        },
      });
    } else {
      // Create a new one if it doesn't exist
      newOther = await prisma.socialMedia.create({
        data: {
          name: reqBody.data.name,
          link_or_number: reqBody.data.link_or_number,
          personal_data_id: reqBody.userId,
        },
      });
    }

    // Always return the full list of social media for this user
    const socialMedias = await prisma.socialMedia.findMany({
      where: {
        personal_data_id: reqBody.userId,
      },
      orderBy: { order_index: "asc" },
    });

    return NextResponse.json({ status: true, data: newOther, socialMedias });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, error: err });
  }
}
