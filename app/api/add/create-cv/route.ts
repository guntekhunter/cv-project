import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newCv = await prisma.cv.create({
      data: {
        user_id: reqBody.user_id,
      },
    });
    return NextResponse.json({ data: newCv });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
