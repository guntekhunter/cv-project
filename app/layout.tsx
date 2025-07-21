import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./component/global/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buat CV - Buat CV Dengan Cepat Dan Mudah",
  description:
    "Buat CV dengan mudah dan cepat dengan Aplikasi ini, kamu juga bisa langsung buat CV dari HP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#FBFBFB] font-sans relative`}
      >
        <Analytics />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
