import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const cv = await req.json();
    const id = parseInt(cv);

    console.log(id);
    const biodatas = await prisma.personalData.findFirst({
      where: {
        cv_id: id,
      },
    });

    return NextResponse.json({
      status: true,
      biodatas,
    });
  } catch (err) {
    console.error("Failed to fetch organisations:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
