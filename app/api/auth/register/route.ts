import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { EmailTemplate } from "../../../component/other/email-template";
import { Resend } from "resend";

const prisma = new PrismaClient();

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const reqBody = await req.json();
  try {
    if (!isValidEmail(reqBody.email)) {
      return NextResponse.json(
        { error: "Email Kurang tepat" },
        { status: 200 }
      );
    }

    const isUser = await prisma.user.findFirst({
      where: {
        email: reqBody.email,
      },
    });

    if (isUser?.id === undefined) {
      const encryptPassword = await bcrypt.hash(reqBody.password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: reqBody.email,
          password: encryptPassword,
        },
      });

      await prisma.cv.update({
        where: { id: reqBody.cv_id },
        data: {
          user_id: newUser.id,
        },
      });
      // const { data, error } = await resend.emails.send({
      //   from: "pevesindo.com", // ✅ Sandbox sender
      //   to: "agunghaeruddin270@gmail.com",
      //   subject: "Verify your email",
      //   react: EmailTemplate({ firstName: "John" }), // ✅ Only if your component works
      // });

      // if (error) {
      //   return NextResponse.json({ error: error, status: 200 });
      // }

      // console.log("hasilnya", data);

      return NextResponse.json({ data: newUser });
    } else {
      return NextResponse.json({ error: "user ini sudah ada" });
    }
  } catch (err) {
    return NextResponse.json({ err });
  }
}
