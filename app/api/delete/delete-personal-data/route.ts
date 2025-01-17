import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const deletePersonalData = await prisma.personalData.delete({
      where: {
        id: reqBody.id,
      },
    });
    const updatedPersonalData = await prisma.personalData.findMany();

    return NextResponse.json({
      deleted: deletePersonalData,
      updatedData: updatedPersonalData,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
