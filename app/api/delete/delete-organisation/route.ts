import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const deleteOrganisation = await prisma.organisation.delete({
      where: {
        id: reqBody.id,
      },
    });
    const updatedOrganisation = await prisma.organisation.findMany();

    return NextResponse.json({
      deleted: deleteOrganisation,
      updatedData: updatedOrganisation,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
