import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const deleteSocialMedia = await prisma.socialMedia.delete({
      where: {
        id: reqBody.id,
      },
    });
    const updatedSocialMedia = await prisma.socialMedia.findMany();

    return NextResponse.json({
      deleted: deleteSocialMedia,
      updatedData: updatedSocialMedia,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
