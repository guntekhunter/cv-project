import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  let reqBody;

  // Validasi Content-Type dan parsing JSON
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { status: false, error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    reqBody = await req.json();
    console.log("reqBody:", reqBody);
    if (!reqBody || typeof reqBody !== "object") {
      return NextResponse.json(
        { status: false, error: "Payload must be a valid object" },
        { status: 400 }
      );
    }

    console.log("reqBody:", reqBody);
  } catch (err) {
    return NextResponse.json(
      { status: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  // Logika database
  try {
    console.log("reqBody:", reqBody);
    const existing = await prisma.personalData.findFirst({
      where: {
        cv_id: reqBody.cv_id,
      },
    });

    let result;

    if (existing) {
      result = await prisma.personalData.update({
        where: { id: existing.id },
        data: {
          address: reqBody.address,
          professional_summary: reqBody.professional_summary,
          photo: reqBody.photo,
          name: reqBody.name,
          no_hp: reqBody.no_hp,
          myemail: reqBody.email,
        },
      });
    } else {
      console.log("Creating new personalData with:", reqBody);
      result = await prisma.personalData.create({
        data: {
          address: reqBody.address,
          professional_summary: reqBody.professional_summary,
          photo: reqBody.photo,
          name: reqBody.name,
          cv_id: reqBody.cv_id,
          no_hp: reqBody.no_hp,
          myemail: reqBody.email,
        },
      });
    }

    return NextResponse.json({ status: true, data: result });
  } catch (err: any) {
    console.error("Database error:", err);

    return NextResponse.json(
      {
        status: false,
        error: err.message || "Unknown server error",
        stack: err.stack || null,
      },
      { status: 500 }
    );
  }
}
