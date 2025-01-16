import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  console.log("ini bede", reqBody.company_address);

  try {
    const newJob = await prisma.workExperience.update({
      where: { id: reqBody.id },
      data: reqBody,
    });
    return NextResponse.json({ data: newJob });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
