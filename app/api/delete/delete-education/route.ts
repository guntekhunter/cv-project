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
    const updatedData = await prisma.education.findMany({
      where: {
        cv_id: reqBody.cv,
      },
    });

    return NextResponse.json({
      deleted: deleteEducation,
      updatedData,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
