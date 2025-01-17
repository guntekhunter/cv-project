import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newOrganisation = await prisma.organisation.update({
      where: { id: reqBody.id },
      data: reqBody,
    });

    const updatedOrganisation = await prisma.organisation.findMany();

    return NextResponse.json({
      data: newOrganisation,
      updatedData: updatedOrganisation,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
