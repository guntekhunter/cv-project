import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  try {
    // Check for existing record with the same type, name, year, and cv_id
    const existing = await prisma.other.findFirst({
      where: {
        type: reqBody.type,
        name: reqBody.name,
        year: reqBody.year,
        cv_id: reqBody.cv_id,
      },
    });

    let newOther;

    if (existing) {
      // Update if exists
      newOther = await prisma.other.update({
        where: { id: existing.id },
        data: {
          type: reqBody.type,
          name: reqBody.name,
          year: reqBody.year,
        },
      });
    } else {
      // Create new if not
      newOther = await prisma.other.create({
        data: {
          type: reqBody.type,
          name: reqBody.name,
          year: reqBody.year,
          cv_id: reqBody.cv_id,
        },
      });
    }

    // Get updated list of all "others" for the given cv_id
    const others = await prisma.other.findMany({
      where: {
        cv_id: reqBody.cv_id,
      },
    });

    return NextResponse.json({ status: true, data: newOther, others });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, error: err });
  }
}
