import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const isUser = await prisma.user.findMany();
  return NextResponse.json({ data: isUser });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const isUser = await prisma.user.findFirst({
      where: {
        email: reqBody.email,
      },
    });

    if (isUser?.id === undefined) {
      const encryptPassword = await bcrypt.hash(reqBody.password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: reqBody.email,
          password: encryptPassword,
        },
      });

      await prisma.cv.update({
        where: { id: reqBody.cv_id },
        data: {
          user_id: newUser.id,
        },
      });
      return NextResponse.json({ data: newUser });
    } else {
      return NextResponse.json({ error: "user ini sudah ada" });
    }
  } catch (err) {
    return NextResponse.json({ err });
  }
}
