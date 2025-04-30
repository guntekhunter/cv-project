import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();

  const lastOrg = await prisma.organisation.findFirst({
    where: { cv_id: reqBody.cv_id },
    orderBy: { order_index: "desc" }, // ✅ This should now work
  });

  try {
    const newOrganisation = await prisma.organisation.create({
      data: {
        organisation_name: reqBody.organisation_name,
        address: reqBody.address,
        responsibility: reqBody.responsibility,
        division: reqBody.division,
        type: reqBody.type,
        order_index: (lastOrg?.order_index ?? 0) + 1,
        start_date: new Date(reqBody.start_date), // Convert to Date object
        end_date: new Date(reqBody.end_date),
        cv_id: reqBody.cv_id,
      },
    });

    const organisations = await prisma.organisation.findMany({
      where: {
        cv_id: 1,
      },
      orderBy: { order_index: "asc" },
    });
    return NextResponse.json({
      status: true,
      data: newOrganisation,
      organisations,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
