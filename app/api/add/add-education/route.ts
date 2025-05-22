import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newEducation = await prisma.education.create({
      data: {
        school_name: reqBody.school_name,
        major: reqBody.major,
        ipk: reqBody.ipk,
        education_type: reqBody.education_type,
        school_address: reqBody.school_address,
        start_date: new Date(reqBody.start_date), // Convert to Date object
        end_date: new Date(reqBody.end_date),
        cv_id: reqBody.cv_id,
      },
    });
    const educations = await prisma.education.findMany({
      where: {
        cv_id: reqBody.cv_id,
      },
      orderBy: { order_index: "asc" },
    });

    return NextResponse.json({ status: true, data: newEducation, educations });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
