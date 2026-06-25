import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioView from "@/components/PortfolioView";
import FormKonsultasi from "@/components/FormKonsultasi";
import type { Metadata } from "next";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Portofolio — PT Aqlam Mural Kaligrafi",
  description:
    "Jelajahi galeri lengkap karya kaligrafi masjid, mural komersial, ornamen Islami, dan dekorasi hunian dari PT Aqlam Mural Kaligrafi. Lebih dari 200 proyek sukses di seluruh Indonesia.",
};

/* ─────────────────────────────────────────────────────────────
   Halaman Portofolio (Server Component)
   - Exports metadata for SEO
   - Renders <PortfolioView /> (Client Component) for interactivity
   - Wraps with <Navbar /> dan <Footer />
───────────────────────────────────────────────────────────── */

export default async function PortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <main className="bg-stone-50" style={{ minHeight: "100vh" }}>
      {/* Navbar sticky — tetap terlihat di scroll */}
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative h-60 sm:h-72 md:h-80 w-full flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Portofolio Lengkap Background"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-teal-950/75 z-10" />
        <div className="relative z-20">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl tracking-wide" style={{ fontFamily: "var(--font-caveat-brush), cursive" }}>
            Portofolio Lengkap
          </h1>
          <div className="w-16 h-1 bg-[#BFA071] mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* Konten interaktif galeri (client component) */}
      <PortfolioView portfolios={portfolios} />

      {/* Form konsultasi — mendorong konversi setelah menjelajahi galeri */}
      <FormKonsultasi />

      {/* Footer global */}
      <Footer />
    </main>
  );
}
