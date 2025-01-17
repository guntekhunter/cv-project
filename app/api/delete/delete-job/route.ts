import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const deleteJob = await prisma.workExperience.delete({
      where: {
        id: reqBody.id,
      },
    });
    const updatedJob = await prisma.workExperience.findMany();

    return NextResponse.json({
      deleted: deleteJob,
      updatedData: updatedJob,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
