import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newOther = await prisma.personalData.create({
      data: {
        link: reqBody.link,
        portfolio: reqBody.name,
        address: reqBody.address,
        professional_summary: reqBody.professional_summary,
        photo: reqBody.photo,
        name: reqBody.name,
        cv_id: reqBody.cv_id,
      },
    });
    return NextResponse.json({ status: true, data: newOther });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
