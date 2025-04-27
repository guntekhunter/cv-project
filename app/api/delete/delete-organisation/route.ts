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
    // const updatedOrganisation = await prisma.organisation.findMany();

    const organisations = await prisma.organisation.findMany({
      where: {
        cv_id: reqBody.cv,
      },
    });

    return NextResponse.json({
      deleted: deleteOrganisation,
      // updatedData: updatedOrganisation,
      organisations,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
