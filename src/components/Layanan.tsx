"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Layanan — Service Overview Grid (PRD §7.A.1 — 4 Blok Kategori)
   Surface  : canvas-light (#FAFAFD) → kartu putih (#FFFFFF)
   Target   : DKM Masjid (senior) → kontras tinggi, font besar
   Aturan   : No emoji, no bento grid besar, no neon — DESIGN.md §2
───────────────────────────────────────────────────────────── */

interface ServiceItem {
  id: string;
  nomorUrut: string;
  judul: string;
  deskripsi: string;
  target: string;
  href: string;
  icon: React.ReactNode;
  accent: string;
}

const LAYANAN_DATA: ServiceItem[] = [
  {
    id: "svc-masjid",
    nomorUrut: "01",
    judul: "Kaligrafi Mihrab & Kubah Masjid",
    deskripsi:
      "Menghadirkan keindahan kaligrafi Islam monumental pada mihrab, kubah, dinding kiblat, dan langit-langit masjid. Dikerjakan oleh seniman berpengalaman dengan bahan premium tahan lama.",
    target: "Untuk DKM & Yayasan Masjid",
    href: "/pricelist",
    accent: "#D4AF37",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M24 6C16 6 10 13 10 20c0 4 2 8 5 11" />
        <path d="M24 6C32 6 38 13 38 20c0 4-2 8-5 11" />
        <path d="M24 4v4" />
        <rect x="8" y="31" width="32" height="4" rx="0" />
        <rect x="4" y="35" width="40" height="8" rx="0" />
        <line x1="18" y1="35" x2="18" y2="43" />
        <line x1="30" y1="35" x2="30" y2="43" />
        <line x1="24" y1="31" x2="24" y2="35" />
      </svg>
    ),
  },
  {
    id: "svc-komersial",
    nomorUrut: "02",
    judul: "Mural Estetis Kafe & Komersial",
    deskripsi:
      "Transformasi dinding kafe, restoran, kantor, hotel, dan pusat perbelanjaan menjadi ruang visual yang memukau pengunjung dan memperkuat identitas brand bisnis Anda.",
    target: "Untuk Bisnis & Properti Komersial",
    href: "/pricelist",
    accent: "#D4AF37",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 36 L8 44 L40 44 L36 36" />
        <rect x="6" y="8" width="36" height="28" rx="0" />
        <path d="M6 16h36" />
        <path d="M20 16v20" />
        <circle cx="34" cy="28" r="5" />
        <path d="M31 28h6M34 25v6" />
      </svg>
    ),
  },
  {
    id: "svc-rumah",
    nomorUrut: "03",
    judul: "Dekorasi Dinding Hunian Pribadi",
    deskripsi:
      "Percantik kamar tidur, ruang keluarga, atau ruang tamu dengan mural bertema islami, alam, geometris, atau sesuai selera personal. Tersedia dalam skala kecil hingga besar.",
    target: "Untuk Rumah & Villa Pribadi",
    href: "/pricelist",
    accent: "#D4AF37",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22L24 8l18 14" />
        <path d="M10 22v18h28V22" />
        <rect x="18" y="30" width="12" height="10" rx="0" />
        <rect x="14" y="24" width="8" height="6" rx="0" />
        <rect x="26" y="24" width="8" height="6" rx="0" />
      </svg>
    ),
  },
  {
    id: "svc-ornamen",
    nomorUrut: "04",
    judul: "Ornamen & Panel Islami",
    deskripsi:
      "Panel ornamen geometris, arabesk, dan kaligrafi bingkai custom untuk dekorasi masjid, kantor, atau hadiah pernikahan. Tersedia dalam berbagai ukuran dan material pilihan.",
    target: "Untuk Semua Kalangan",
    href: "/pricelist",
    accent: "#D4AF37",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="8" width="32" height="32" rx="0" />
        <path d="M24 8v32M8 24h32" />
        <path d="M8 8l16 16M40 8L24 24M8 40l16-16M40 40L24 24" />
        <circle cx="24" cy="24" r="5" />
      </svg>
    ),
  },
];

export default function Layanan() {
  return (
    <section
      className="bg-teal-800 border-t border-b border-amber-500"
      style={{
        padding: "96px 32px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "56px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-caveat-brush), cursive",
                fontSize: "clamp(36px, 5vw, 54px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "0.01em",
                color: "#FFFFFF",
                margin: "0 0 16px",
              }}
            >
              Layanan Unggulan Kami
            </h2>
            <div
              aria-hidden="true"
              style={{
                width: "48px",
                height: "3px",
                backgroundColor: "#D4AF37",
              }}
            />
          </div>
        </div>

        {/* ── Grid Kartu Layanan ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "24px",
          }}
        >
          {LAYANAN_DATA.map((layanan) => (
            <LayananCard key={layanan.id} layanan={layanan} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Sub: Kartu Layanan ── */
function LayananCard({ layanan }: { layanan: ServiceItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-teal-900 border border-teal-700"
      style={{
        padding: "36px 28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        cursor: "default",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Garis aksen atas */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          backgroundColor: layanan.accent,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Nomor urut */}
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: layanan.accent,
          letterSpacing: "1px",
          marginBottom: "20px",
          opacity: 0.65,
        }}
      >
        {layanan.nomorUrut}
      </span>

      {/* Icon */}
      <div
        style={{
          color: layanan.accent,
          marginBottom: "20px",
          transition: "transform 0.25s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
        }}
      >
        {layanan.icon}
      </div>

      {/* Judul */}
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: 1.30,
          letterSpacing: "-0.2px",
          color: "#FFFFFF",
          margin: "0 0 14px",
        }}
      >
        {layanan.judul}
      </h3>

      {/* Deskripsi */}
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: 1.70,
          color: "#F8FAFC",
          margin: "0 0 20px",
          flex: 1,
        }}
      >
        {layanan.deskripsi}
      </p>

      {/* Target audiens */}
      <span
        style={{
          display: "inline-block",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: layanan.accent,
          padding: "5px 12px",
          border: `1px solid ${layanan.accent}`,
          opacity: 0.75,
          marginBottom: "20px",
          alignSelf: "flex-start",
        }}
      >
        {layanan.target}
      </span>

      {/* CTA link */}
      <Link
        href={layanan.href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.8px",
          color: layanan.accent,
          textDecoration: "none",
          alignSelf: "flex-start",
        }}
      >
        Lihat Estimasi Harga
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
