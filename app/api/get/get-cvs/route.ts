import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    console.log(user);

    const cv = await prisma.cv.findMany({
      where: {
        user_id: user,
      },
      include: {
        personal_data: {
          include: {
            social_media: true,
          },
        },
        organisation: true,
        work_experience: true,
        education: true,
        other: true,
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
