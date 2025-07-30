import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./component/global/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./component/global/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.WEBSITE_URL}`),
  title: {
    default:
      "Buat CV Menarik dalam Hitungan Menit – Gratis, Mudah, dan Siap Kirim!",
    template: `%s | Buat CV Menarik dalam Hitungan Menit – Gratis, Mudah, dan Siap Kirim!`,
  },
  description:
    "Cukup isi data atau upload file, Buat CV profesional Anda langsung jadi dalam 5 menit. Tanpa desain ribet, tanpa biaya. Cocok untuk fresh graduate hingga profesional.",
  openGraph: {
    title:
      "Buat CV Menarik dalam Hitungan Menit – Gratis, Mudah, dan Siap Kirim!",
    description:
      "Cukup isi data atau upload file, Buat CV profesional Anda langsung jadi dalam 5 menit. Tanpa desain ribet, tanpa biaya. Cocok untuk fresh graduate hingga profesional.",
    type: "website",
    locale: "id_ID",
    url: process.env.WEBSITE_URL,
    siteName: "BuatCV.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="sWKKEh-OTQGoUeA4XF90Z-Dg0GWmxPBreOdTe6iDQSc"
      />
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#FBFBFB] font-sans relative`}
      >
        <Analytics />
        <Navbar />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-SSTNWJ8SSK" />
    </html>
  );
}
