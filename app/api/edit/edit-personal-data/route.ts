import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newPersonalData = await prisma.personalData.update({
      where: { id: reqBody.id },
      data: reqBody,
    });

    const updatedPersonalData = await prisma.personalData.findMany();

    return NextResponse.json({
      data: newPersonalData,
      updatedData: updatedPersonalData,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
