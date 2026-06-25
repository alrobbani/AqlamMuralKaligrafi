"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectModal from "@/components/ProjectModal";
import type { ProjectForModal } from "@/components/ProjectModal";
import type { Portfolio } from "@prisma/client";

/* ─────────────────────────────────────────────────────────────
   PortfolioView — Client Component (interactive filter + search + lightbox)
   Dipanggil oleh src/app/portfolio/page.tsx (Server Component)
   Surface : canvas-light (#fafaf9) — Bright Gallery
   Grid    : CSS columns masonry, 4→2→1 responsive
   Cards   : Adaptive hover (desktop) / permanent overlay (mobile)
   Modal   : Lightbox detail proyek via <ProjectModal />
───────────────────────────────────────────────────────────── */

/* ── Tipe Data ── */
type Kategori = "Semua" | "Kaligrafi Masjid" | "Mural Komersial" | "Hunian Pribadi" | "Ornamen Islami";



const KATEGORI_FILTER: Kategori[] = [
  "Semua",
  "Kaligrafi Masjid",
  "Mural Komersial",
  "Ornamen Islami",
  "Hunian Pribadi",
];

/* ── Komponen Utama ── */
export default function PortfolioView({ portfolios }: { portfolios: Portfolio[] }) {
  const [aktifKategori, setAktifKategori] = useState<Kategori>("Semua");
  const [query, setQuery] = useState("");

  /* ── Modal State ── */
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const hasil = useMemo(() => {
    const q = query.toLowerCase().trim();
    return portfolios.filter((p) => {
      const cocokKategori = aktifKategori === "Semua" || p.category === aktifKategori;
      const cocokQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q);
      return cocokKategori && cocokQuery;
    });
  }, [aktifKategori, query, portfolios]);

  /* ── Fungsi Navigasi Modal ── */
  const handleOpenModal = useCallback((index: number) => {
    setSelectedProjectIndex(index);
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setSelectedProjectIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((selectedProjectIndex + 1) % hasil.length);
  }, [selectedProjectIndex, hasil.length]);

  const handlePrev = useCallback(() => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((selectedProjectIndex - 1 + hasil.length) % hasil.length);
  }, [selectedProjectIndex, hasil.length]);

  /* ── Map data untuk ProjectModal ── */
  const projectsForModal: ProjectForModal[] = useMemo(
    () =>
      hasil.map((p) => ({
        judul: p.title,
        kategori: p.category,
        lokasi: p.location,
        image: p.imageUrl,
        klien: p.client,
        tahun: p.year,
        deskripsi: p.description,
      })),
    [hasil],
  );

  // Split filtered hasil into 4 columns with original index tracking
  const columns = useMemo(() => {
    const hasilDenganIndex = hasil.map((proyek, index) => ({ proyek, index }));
    return [
      hasilDenganIndex.filter((_, i) => i % 4 === 0),
      hasilDenganIndex.filter((_, i) => i % 4 === 1),
      hasilDenganIndex.filter((_, i) => i % 4 === 2),
      hasilDenganIndex.filter((_, i) => i % 4 === 3),
    ];
  }, [hasil]);

  const [col1, col2, col3, col4] = columns;

  return (
    <div className="bg-stone-50" style={{ minHeight: "100vh" }}>

      {/* ── Hero Header ── */}
      <section
        className="bg-white border-b border-stone-200"
        style={{
          padding: "80px 32px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow subtle */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(41,210,208,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "680px" }}>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#29D2D0",
                marginBottom: "16px",
              }}
            >
              Galeri Karya Kami
            </p>
            <h1
              style={{
                fontFamily: "var(--font-caveat-brush), cursive",
                fontSize: "clamp(42px, 6vw, 72px)",
                fontWeight: 400,
                lineHeight: 1.10,
                letterSpacing: "0.01em",
                color: "#042f2e",
                margin: "0 0 20px",
              }}
            >
              Portofolio{" "}
              <span style={{ color: "#D4AF37" }}>Lengkap</span>
            </h1>
            <div
              aria-hidden="true"
              style={{ width: "48px", height: "2px", backgroundColor: "#D4AF37", marginBottom: "24px" }}
            />
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: "16px",
                lineHeight: 1.70,
                color: "#8A8A8F",
                margin: 0,
                maxWidth: "520px",
              }}
            >
              Setiap proyek adalah cerita tentang kepercayaan klien dan dedikasi
              tim kami. Jelajahi ratusan karya yang telah menghiasi masjid, kafe,
              dan hunian di seluruh Indonesia.
            </p>
          </div>

          {/* ── Statistik ringkas ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              marginTop: "48px",
              paddingTop: "40px",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            {[
              { angka: `${portfolios.length}`, label: "Proyek Ditampilkan" },
              { angka: "4", label: "Kategori Layanan" },
              { angka: "200+", label: "Total Proyek Selesai" },
            ].map((s) => (
              <div key={s.label}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#0f766e",
                    lineHeight: 1,
                  }}
                >
                  {s.angka}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    fontSize: "13px",
                    color: "#8A8A8F",
                    marginTop: "6px",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter + Search Bar ── */}
      <div
        className="bg-stone-50 border-b border-stone-200"
        style={{
          padding: "20px 32px",
          position: "sticky",
          top: "0",
          zIndex: 30,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px",
            justifyContent: "space-between",
          }}
        >
          {/* Filter Chips */}
          <div
            role="tablist"
            aria-label="Filter kategori portofolio"
            style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
          >
            {KATEGORI_FILTER.map((kat) => (
              <KategoriChip
                key={kat}
                label={kat}
                isActive={aktifKategori === kat}
                onClick={() => setAktifKategori(kat)}
              />
            ))}
          </div>

          {/* Search Bar */}
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* ── Grid Galeri ── */}
      <div className="bg-teal-800">
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 32px 96px" }}>
          {/* Counter hasil */}
          {hasil.length === 0 ? (
            <EmptyState onReset={() => { setQuery(""); setAktifKategori("Semua"); }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-4">
                {col1.map(({ proyek, index }) => (
                  <ProyekCard
                    key={proyek.id}
                    proyek={proyek}
                    onCardClick={() => handleOpenModal(index)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {col2.map(({ proyek, index }) => (
                  <ProyekCard
                    key={proyek.id}
                    proyek={proyek}
                    onCardClick={() => handleOpenModal(index)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {col3.map(({ proyek, index }) => (
                  <ProyekCard
                    key={proyek.id}
                    proyek={proyek}
                    onCardClick={() => handleOpenModal(index)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {col4.map(({ proyek, index }) => (
                  <ProyekCard
                    key={proyek.id}
                    proyek={proyek}
                    onCardClick={() => handleOpenModal(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ── Modal Lightbox ── */}
      <ProjectModal
        isOpen={isOpen}
        projects={projectsForModal}
        selectedIndex={selectedProjectIndex}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* ── CTA Bawah ── */}
      <section
        className="bg-white border-t border-amber-500"
        style={{
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-caveat-brush), cursive",
            fontSize: "clamp(34px, 5vw, 54px)",
            fontWeight: 400,
            color: "#042f2e",
            margin: "0 0 16px",
            letterSpacing: "0.01em",
          }}
        >
          Jadikan Dinding Anda Sebuah Mahakarya
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "16px", color: "#8A8A8F", margin: "0 0 40px", lineHeight: 1.65 }}>
          Konsultasi gratis, desain digital sebelum pengerjaan, garansi kepuasan.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          <CTAButtonGold href="https://wa.me/6280000000000" label="Konsultasi via WhatsApp" />
          <CTAButtonOutline href="/pricelist" label="Lihat Daftar Harga" />
        </div>
      </section>
    </div>
  );
}

/* ── Sub: Kategori Chip ── */
function KategoriChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "36px",
        padding: "0 18px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: isActive ? 600 : 400,
        color: isActive ? "#FFFFFF" : hovered ? "#042f2e" : "#64748b",
        backgroundColor: isActive ? "#0f766e" : hovered ? "#e7e5e4" : "transparent",
        border: isActive ? "1px solid #0f766e" : "1px solid #d6d3d1",
        borderRadius: "9999px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

/* ── Sub: Search Bar ── */
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Search icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={focused ? "#29D2D0" : "#8A8A8F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "14px",
          transition: "stroke 0.2s ease",
          pointerEvents: "none",
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        placeholder="Cari proyek, lokasi, atau klien..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label="Cari proyek portofolio"
        style={{
          height: "40px",
          width: "min(280px, 100%)",
          paddingLeft: "42px",
          paddingRight: "14px",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "14px",
          color: "#042f2e",
          backgroundColor: "#fafaf9",
          border: focused ? "1px solid #29D2D0" : "1px solid #d6d3d1",
          borderRadius: "10px",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          style={{
            position: "absolute",
            right: "12px",
            background: "none",
            border: "none",
            color: "#8A8A8F",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ── Sub: Kartu Proyek (Adaptive Hover & Tap) ── */
function ProyekCard({
  proyek,
  onCardClick,
}: {
  proyek: Portfolio;
  onCardClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
      className="relative overflow-hidden rounded-xl group break-inside-avoid mb-0 cursor-pointer bg-stone-50 border border-stone-200 z-0"
    >
      {/* ── Artwork Area ── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#e2e8f0",
          position: "relative",
        }}
      >
        <Image
          src={proyek.imageUrl}
          alt={proyek.title}
          width={800}
          height={800}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110 z-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center text-center p-4 text-white z-10"
        >
          <h3 className="font-bold text-lg sm:text-xl mb-2" style={{ color: "#D4AF37" }}>
            {proyek.title}
          </h3>
          <p className="text-white text-xs sm:text-sm tracking-wide uppercase">
            {proyek.category} &bull; {proyek.location}
          </p>
        </div>
        {/* Pola dekoratif tipis */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(255,255,255,0.015) 24px, rgba(255,255,255,0.015) 25px)",
          }}
        />
        {/* Sudut dekoratif emas */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            width: "20px",
            height: "20px",
            borderTop: "2px solid rgba(212,175,55,0.50)",
            borderLeft: "2px solid rgba(212,175,55,0.50)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 20,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            width: "20px",
            height: "20px",
            borderBottom: "2px solid rgba(212,175,55,0.50)",
            borderRight: "2px solid rgba(212,175,55,0.50)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
}

/* ── Sub: Empty State ── */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 32px", color: "#8A8A8F" }}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ margin: "0 auto 24px", display: "block" }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <p style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "22px", fontWeight: 500, color: "#ffffff", margin: "0 0 12px" }}>
        Proyek tidak ditemukan
      </p>
      <p style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "15px", margin: "0 0 28px", color: "#e2e8f0" }}>
        Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "#29D2D0",
          background: "none",
          border: "1px solid #29D2D0",
          padding: "10px 28px",
          cursor: "pointer",
          borderRadius: "12px",
        }}
      >
        Tampilkan Semua
      </button>
    </div>
  );
}

/* ── Sub: CTA Buttons ── */
function CTAButtonGold({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "52px",
        padding: "0 36px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "1.4px",
        textTransform: "uppercase",
        color: "#042f2e",
        textDecoration: "none",
        backgroundColor: hovered ? "#b8961f" : "#D4AF37",
        borderRadius: "12px",
        boxShadow: hovered ? "0 8px 28px rgba(212,175,55,0.45)" : "0 4px 14px rgba(212,175,55,0.25)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

function CTAButtonOutline({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "52px",
        padding: "0 36px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "1.4px",
        textTransform: "uppercase",
        color: hovered ? "#FFFFFF" : "#042f2e",
        textDecoration: "none",
        backgroundColor: hovered ? "#0f766e" : "transparent",
        border: hovered ? "1.5px solid #0f766e" : "1.5px solid #8A8A8F",
        borderRadius: "12px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}
