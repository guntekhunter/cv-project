import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const deleteCv = await prisma.cv.delete({
      where: {
        id: reqBody.id,
      },
    });
    const updatedCv = await prisma.cv.findMany();

    return NextResponse.json({
      deleted: deleteCv,
      updatedData: updatedCv,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
