import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const newEducation = await prisma.education.update({
      where: { id: reqBody.id },
      data: reqBody,
    });

    const updatedEducation = await prisma.education.findMany();

    return NextResponse.json({
      data: newEducation,
      updatedData: updatedEducation,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
