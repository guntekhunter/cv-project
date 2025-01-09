import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newOther = await prisma.other.create({
      data: {
        type: reqBody.type,
        name: reqBody.name,
        year: reqBody.year,
        cv_id: reqBody.cv_id,
      },
    });
    return NextResponse.json({ data: newOther });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
