import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    const existing = await prisma.personalData.findUnique({
      where: { id: reqBody.id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: `No personalData found for id ${reqBody.id}` },
        { status: 404 }
      );
    }

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
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
