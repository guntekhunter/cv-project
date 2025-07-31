// /app/api/get/get-articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getArticleData, getCategorisedArticles } from "@/lib/article";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const slug = reqBody.slug;
    const articles = await getArticleData(slug);

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
