"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Hero Section — Full-Screen Cinematic Hero
   Background : /images/hero-bg.jpg — full-bleed image
   Overlay    : teal-950 dark overlay (mix-blend-multiply)
   Layout     : centered flex — headline, gold rule, sub-headline, CTA
   Typography : Plus Jakarta Sans (sans-serif), all white on dark
───────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden min-h-screen">

      {/* ── Background Image — full bleed, behind everything ── */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Latar belakang kaligrafi dan mural"
        fill
        priority
        quality={85}
        className="absolute inset-0 z-0 w-full h-full object-cover"
        sizes="100vw"
      />

      {/* ── Dark Overlay — elegan teal-dark untuk kontras teks ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: "rgba(10, 48, 50, 0.78)",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Secondary gradient overlay — menambah kedalaman visual ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* ── Konten Utama — z-10, di atas semua overlay ── */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

        {/* ── Headline Utama ── */}
        <h1
          className="text-white text-5xl sm:text-6xl md:text-7xl mb-6 leading-tight"
          style={{
            fontFamily: "var(--font-caveat-brush), cursive",
            letterSpacing: "0.02em",
          }}
        >
          "Memperindah tempatmu
          <br />jadi lebih Josss!"
        </h1>

        {/* ── Garis Pembatas Emas ── */}
        <div
          aria-hidden="true"
          className="w-24 h-1 bg-[#BFA071] mb-6 rounded-full"
        />

        {/* ── Sub-headline ── */}
        <p
          className="text-stone-200 font-sans text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          }}
        >
          Jasa Mural & Kaligrafi Profesional
        </p>

        {/* ── CTA Button — emas, rounded-xl, hover scale ── */}
        <Link
          href="https://wa.me/6289630430245"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#D4AF37] text-white px-8 py-4 rounded-xl font-sans font-bold text-lg hover:bg-[#b8961f] transition-all transform hover:scale-105 shadow-xl"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            letterSpacing: "1.2px",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Hubungi Kami Sekarang
        </Link>
      </div>

      {/* ── Scroll Indicator — subtle animated chevron ── */}
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span
          className="text-white/50 text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
        >
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
