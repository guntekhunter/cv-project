import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { addUserEmail } from "@/app/fetch/add/fetch";

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { email, password, cv_id } = reqBody;

  try {
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Email kurang tepat" },
        { status: 400 }
      );
    }

    // 1. Check if user already exists in your custom user table
    const { data: existingUser, error: checkError } = await supabase
      .from("user")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingUser) {
      return NextResponse.json(
        { error: "User ini sudah ada" },
        { status: 409 }
      );
    }

    // 2. Create user in Supabase Auth
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // auto-confirm user
      });

    if (authError) throw authError;

    const auth_uid = authUser.user?.id;
    if (!auth_uid) {
      return NextResponse.json(
        { error: "Gagal membuat akun auth" },
        { status: 500 }
      );
    }

    // 3. Insert into your custom user table
    const { data: createdUser, error: dbInsertError } = await supabase
      .from("user")
      .insert([{ email, auth_id: auth_uid }])
      .select()
      .single();

    if (dbInsertError) throw dbInsertError;

    // 4. Update the related CV to link with the new user
    const { error: updateCvError } = await supabase
      .from("Cv")
      .update({ user_id: createdUser.id })
      .eq("id", cv_id);

    if (updateCvError) throw updateCvError;

    console.log(email, "ini email server");
    addUserEmail({ email });

    return NextResponse.json({ data: createdUser });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
