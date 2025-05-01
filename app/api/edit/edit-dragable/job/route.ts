import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Apply updates in parallel
    await Promise.all(
      reqBody.map((item: any, index: number) =>
        prisma.workExperience.update({
          where: { id: item.id },
          data: { order_index: index },
        })
      )
    );

    const allJobs = await prisma.workExperience.findMany({
      orderBy: { order_index: "asc" }, // Important to sort by order
    });

    return NextResponse.json({
      status: 200,
      updatedData: allJobs,
    });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ status: 500, err });
  }
}
