import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  try {
    const newJob = await prisma.workExperience.create({
      data: {
        company_name: reqBody.company_name,
        company_address: reqBody.company_address,
        responsibility: reqBody.responsibility,
        company_description: reqBody.company_description,
        job_type: reqBody.job_type,
        start_date: new Date(reqBody.start_date), // Convert to Date object
        end_date: new Date(reqBody.end_date),
        cv_id: reqBody.cv_id,
      },
    });

    const jobs = await prisma.workExperience.findMany({
      where: {
        cv_id: reqBody.cv_id,
      },
      orderBy: { order_index: "asc" },
    });
    return NextResponse.json({ status: true, data: newJob, jobs });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
