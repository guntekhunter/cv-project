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

    const others = await prisma.other.findMany({
      where: {
        cv_id: reqBody.cv_id,
      },
    });

    return NextResponse.json({
      deleted: deleteOther,
      updatedData: others,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
