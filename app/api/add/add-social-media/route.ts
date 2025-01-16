import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newOther = await prisma.socialMedia.create({
      data: {
        name: reqBody.name,
        link_or_number: reqBody.link_or_number,
        personal_data_id: reqBody.personal_data_id,
      },
    });
    return NextResponse.json({ data: newOther });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
