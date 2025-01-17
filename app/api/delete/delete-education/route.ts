import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const deleteEducation = await prisma.education.delete({
      where: {
        id: reqBody.id,
      },
    });
    const updatedEducation = await prisma.education.findMany();

    return NextResponse.json({
      deleted: deleteEducation,
      updatedData: updatedEducation,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
