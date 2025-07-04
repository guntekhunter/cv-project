import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = parseInt(reqBody.cv_id);
    const personal_data_id = parseInt(reqBody.user_id);

    const cvData = await prisma.cv.findFirst({
      where: {
        id: id,
      },
    });

    const biodata = await prisma.personalData.findFirst({
      where: {
        cv_id: id,
      },
    });

    const organisations = await prisma.organisation.findMany({
      where: {
        cv_id: id,
      },
      orderBy: { order_index: "asc" },
    });

    const jobs = await prisma.workExperience.findMany({
      where: {
        cv_id: id,
      },
      orderBy: { order_index: "asc" },
    });

    const educations = await prisma.education.findMany({
      where: {
        cv_id: id,
      },
      orderBy: { order_index: "asc" },
    });

    const socialMedias = await prisma.socialMedia.findMany({
      where: {
        personal_data_id: personal_data_id,
      },
      orderBy: { order_index: "asc" },
    });

    const others = await prisma.other.findMany({
      where: {
        cv_id: id,
      },
    });

    return NextResponse.json({
      status: true,
      cvData,
      educations,
      biodata,
      organisations,
      jobs,
      socialMedias,
      others,
    });
  } catch (err) {
    console.error("Failed to fetch organisations:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
