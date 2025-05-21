import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const sessionId = randomUUID();

  try {
    const newCv = await prisma.cv.create({
      data: {
        type: reqBody.type,
        temp_token: sessionId,
      },
    });

    //     await prisma.cv.updateMany({
    //   where: { temp_token: "generated-session-id-or-uuid" },
    //   data: { user_id: newUser.id, temp_token: null },
    // });
    return NextResponse.json({ status: true, data: newCv });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
