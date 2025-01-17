import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const deleteOther = await prisma.other.delete({
      where: {
        id: reqBody.id,
      },
    });
    const updatedOrganisation = await prisma.other.findMany();

    return NextResponse.json({
      deleted: deleteOther,
      updatedData: updatedOrganisation,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
