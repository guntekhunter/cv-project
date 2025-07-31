// /app/api/get/get-articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCategorisedArticles } from "@/lib/article";

export async function POST(req: NextRequest) {
  try {
    const articles = getCategorisedArticles();

    return NextResponse.json({
      status: true,
      data: articles,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
