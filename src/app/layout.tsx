import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Caveat_Brush } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveatBrush = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat-brush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Aqlam Mural Kaligrafi — Seni Dekorasi Dinding Profesional",
  description:
    "PT Aqlam Mural Kaligrafi adalah jasa kaligrafi masjid, mural dinding, ornamen Islami, dan dekorasi premium berbasis di Pasar Kemis, Kabupaten Tangerang. Melayani DKM Masjid, bisnis komersial, dan rumah pribadi di seluruh Indonesia.",
  keywords: [
    "jasa kaligrafi masjid Tangerang",
    "mural dinding kafe profesional",
    "kaligrafi kubah masjid",
    "ornamen Islami dekoratif",
    "lukisan kanvas custom",
    "Aqlam Mural Kaligrafi",
  ],
  openGraph: {
    title: "PT Aqlam Mural Kaligrafi — Seni Dekorasi Dinding Profesional",
    description:
      "Jasa kaligrafi masjid, mural dinding, dan ornamen Islami premium berbasis di Pasar Kemis, Tangerang.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${caveatBrush.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

