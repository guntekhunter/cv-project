import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const id = await req.json();

    const cv = await prisma.cv.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      status: true,
      cv,
    });
  } catch (err) {
    console.error("Failed to fetch organisations:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
