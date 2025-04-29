import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const updatedOrganisation = await prisma.organisation.update({
      where: { id: reqBody.id },
      data: {
        order_index: reqBody.order_index, // ✅ Must go inside `data`
      },
    });

    const allOrganisations = await prisma.organisation.findMany();

    return NextResponse.json({
      data: updatedOrganisation,
      updatedData: allOrganisations,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
