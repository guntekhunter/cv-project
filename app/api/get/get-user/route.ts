import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const id = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: true,
      user,
    });
  } catch (err) {
    console.error("Failed to fetch organisations:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
