import React from "react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   AboutSnippet — Ringkasan Profil Perusahaan (PRD §7.A.1)
   Server Component — tidak memerlukan interaktivitas
   Surface  : canvas-light (#FAFAFD), pembeda bg (#F3F3F6) untuk asimetri
   Layout   : dua kolom — teks kiri, gambar showcase kanan
───────────────────────────────────────────────────────────── */

export default function AboutSnippet() {
  return (
    <section
      className="bg-teal-800 border-t border-b border-amber-500"
      style={{
        padding: "80px 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "64px",
          alignItems: "center",
        }}
      >
        {/* ── Kolom Kiri: Narasi Perusahaan ── */}
        <div>
          {/* Label kecil */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#D4AF37", // text-amber-500
              marginBottom: "18px",
            }}
          >
            Tentang Kami
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-caveat-brush), cursive",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.20,
              letterSpacing: "0.01em",
              color: "#FFFFFF",
              margin: "0 0 20px",
            }}
          >
            Studio Seni Dekorasi Dinding{" "}
            <span style={{ color: "#D4AF37" }}>Terpercaya</span> di Tangerang
          </h2>

          {/* Garis emas */}
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "#D4AF37",
              marginBottom: "24px",
            }}
          />

          {/* Narasi — 3 kalimat ringkas & berwibawa */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.80,
              color: "#F8FAFC",
              margin: "0 0 16px",
            }}
          >
            PT Aqlam Mural Kaligrafi adalah studio seni dekorasi dinding
            profesional yang berdiri sejak 2019, berbasis di Pasar Kemis,
            Kabupaten Tangerang.
          </p>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.80,
              color: "#F8FAFC",
              margin: "0 0 32px",
            }}
          >
            Kami mengkhususkan diri dalam kaligrafi masjid monumental, mural
            komersial estetis, dan ornamen Islami — memadukan warisan seni
            klasik dengan kepresisian desain modern untuk setiap karya yang
            kami hasilkan.
          </p>

          {/* CTA Link "Selengkapnya" */}
          <Link
            href="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.8px",
              color: "#D4AF37",
              textDecoration: "none",
              borderBottom: "2px solid #D4AF37",
              paddingBottom: "4px",
            }}
          >
            Selengkapnya tentang kami
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Kolom Kanan: Gambar Showcase ── */}
        <div
          className="relative w-full aspect-[4/3] rounded-2xl shadow-xl overflow-hidden"
        >
          <Image
            src="/images/tentang-kami.jpg"
            alt="Proses Pembuatan Mural Kaligrafi oleh PT Aqlam"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
