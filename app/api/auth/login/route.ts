import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // adjust if needed

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 1. Sign in with Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 400 }
      );
    }

    const user = authData.user;
    const token = authData.session?.access_token;

    if (!user || !token) {
      return NextResponse.json(
        { error: "Gagal login. Data tidak lengkap." },
        { status: 500 }
      );
    }

    // 2. Optionally fetch your custom user data from your "user" table
    const { data: customUser, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("auth_id", user.id)
      .single();

    if (userError) {
      return NextResponse.json(
        { error: "Akun tidak terhubung ke data pengguna" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "Ok",
      user: customUser,
      token, // Supabase access token
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Login gagal" },
      { status: 500 }
    );
  }
}
