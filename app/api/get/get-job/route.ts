import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = parseInt(reqBody.cv_id);

    const jobs = await prisma.workExperience.findMany({
      where: {
        cv_id: id,
      },
      orderBy: { order_index: "asc" },
    });

    return NextResponse.json({
      status: true,
      jobs,
    });
  } catch (err) {
    console.error("Failed to fetch organisations:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
