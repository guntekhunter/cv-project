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
      <head>
      <meta
        name="google-site-verification"
        content="sWKKEh-OTQGoUeA4XF90Z-Dg0GWmxPBreOdTe6iDQSc"
      />

        <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');</script>
<!-- End Google Tag Manager -->
      
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#FBFBFB] font-sans relative`}
      >
        <!-- Google Tag Manager (noscript) -->
<noscript><iframe src={`https://www.googletagmanager.com/ns.html?id==${process.env.NEXT_PUBLIC_GTM_ID}`}
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
        <Analytics />
        <Navbar />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId=${process.env.GOOGLE_ANALYTICS} />
    </html>
  );
}
