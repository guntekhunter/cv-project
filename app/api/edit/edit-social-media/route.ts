import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newSocialMedia = await prisma.socialMedia.update({
      where: { id: reqBody.id },
      data: reqBody,
    });

    const updatedSocialMedia = await prisma.socialMedia.findMany();

    return NextResponse.json({
      data: newSocialMedia,
      updatedData: updatedSocialMedia,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
