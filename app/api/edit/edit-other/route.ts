import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newOther = await prisma.other.update({
      where: { id: reqBody.id },
      data: reqBody,
    });

    const updatedOther = await prisma.other.findMany();

    return NextResponse.json({ data: newOther, updatedData: updatedOther });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
