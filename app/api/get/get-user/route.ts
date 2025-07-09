// app/api/get-user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Adjust this import if needed

export async function POST(req: NextRequest) {
  try {
    const id = await req.json();

    const { data: user, error } = await supabase
      .from("user") // your table name is `user`
      .select("*")
      .eq("id", id)
      .single(); // return only one row

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ status: false, error: error.message });
    }

    return NextResponse.json({
      status: true,
      user,
    });
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return NextResponse.json({ status: false, error: "Something went wrong" });
  }
}
