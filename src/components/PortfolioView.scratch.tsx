"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   PortfolioView — Client Component (interactive filter + search)
   Dipanggil oleh src/app/portfolio/page.tsx (Server Component)
   Surface : canvas-dark (#000000) — Mode B Art Gallery
   Grid    : CSS columns masonry, 4→2→1 responsive
   Cards   : edge-to-edge gradient placeholder, hover zoom + overlay
───────────────────────────────────────────────────────────── */

/* ── Tipe Data ── */
type Kategori = "Semua" | "Kaligrafi Masjid" | "Mural Komersial" | "Hunian Pribadi" | "Ornamen Islami";

interface ProyekItem {
  id: string;
  judul: string;
  klien: string;
  lokasi: string;
  kategori: Exclude<Kategori, "Semua">;
  tahun: string;
  luas?: string;
  gradient: string;
  tinggi: "pendek" | "sedang" | "tinggi";
}

/* ── Data Dummy 12 Proyek ── */
const PROYEK_DATA: ProyekItem[] = [
  {
    id: "prj-001",
    judul: "Kaligrafi Kubah Utama Masjid Al-Ikhlas",
    klien: "DKM Masjid Al-Ikhlas",
    lokasi: "Pasar Kemis, Tangerang",
    kategori: "Kaligrafi Masjid",
    tahun: "2024",
    luas: "180 m²",
    gradient: "linear-gradient(160deg, #001520 0%, #013D4D 40%, #025E73 75%, #0A9BAF 100%)",
    tinggi: "tinggi",
  },
  {
    id: "prj-002",
    judul: "Mural 3D Botanical Kafe Tepian",
    klien: "Kafe Tepian BSD",
    lokasi: "BSD City, Tangerang Selatan",
    kategori: "Mural Komersial",
    tahun: "2025",
    luas: "42 m²",
    gradient: "linear-gradient(145deg, #021205 0%, #0A3D15 45%, #145C22 75%, #1E8C35 100%)",
    tinggi: "sedang",
  },
  {
    id: "prj-003",
    judul: "Panel Ornamen Geometris Islami",
    klien: "Masjid Agung An-Nur",
    lokasi: "Kota Tangerang",
    kategori: "Ornamen Islami",
    tahun: "2024",
    luas: "64 m²",
    gradient: "linear-gradient(135deg, #1A1400 0%, #5C4500 45%, #8A6A00 75%, #D4AF37 100%)",
    tinggi: "sedang",
  },
  {
    id: "prj-004",
    judul: "Mural Fasad Restoran Rempah",
    klien: "Restoran Rempah Nusantara",
    lokasi: "Kebon Jeruk, Jakarta Barat",
    kategori: "Mural Komersial",
    tahun: "2025",
    luas: "55 m²",
    gradient: "linear-gradient(150deg, #1A0800 0%, #6B2800 50%, #B54A00 80%, #E06820 100%)",
    tinggi: "tinggi",
  },
  {
    id: "prj-005",
    judul: "Kaligrafi Mihrab & Dinding Kiblat",
    klien: "DKM Masjid Baitul Amin",
    lokasi: "Cilegon, Banten",
    kategori: "Kaligrafi Masjid",
    tahun: "2023",
    luas: "28 m²",
    gradient: "linear-gradient(160deg, #001830 0%, #002D52 45%, #004080 75%, #0056A8 100%)",
    tinggi: "pendek",
  },
  {
    id: "prj-006",
    judul: "Mural Kamar Tidur Utama Villa Bukit",
    klien: "Tn. Arif Widodo",
    lokasi: "Puncak, Bogor",
    kategori: "Hunian Pribadi",
    tahun: "2025",
    luas: "18 m²",
    gradient: "linear-gradient(140deg, #0A001A 0%, #2D0A5C 45%, #5C1A8A 75%, #8A2EC0 100%)",
    tinggi: "sedang",
  },
  {
    id: "prj-007",
    judul: "Kaligrafi Asmaul Husna Full Wall",
    klien: "Masjid Jami Al-Falah",
    lokasi: "Serang, Banten",
    kategori: "Kaligrafi Masjid",
    tahun: "2024",
    luas: "96 m²",
    gradient: "linear-gradient(155deg, #001A15 0%, #00402D 45%, #006045 75%, #008F65 100%)",
    tinggi: "tinggi",
  },
  {
    id: "prj-008",
    judul: "Feature Wall Lobi Kantor",
    klien: "PT Maju Bersama",
    lokasi: "Sudirman, Jakarta Pusat",
    kategori: "Mural Komersial",
    tahun: "2025",
    luas: "30 m²",
    gradient: "linear-gradient(145deg, #0D0D0D 0%, #1A1A2E 45%, #16213E 75%, #0F3460 100%)",
    tinggi: "pendek",
  },
  {
    id: "prj-009",
    judul: "Ornamen Arabesk Pintu Masjid",
    klien: "DKM Masjid At-Taqwa",
    lokasi: "Serpong, Tangerang Selatan",
    kategori: "Ornamen Islami",
    tahun: "2023",
    luas: "22 m²",
    gradient: "linear-gradient(135deg, #1A0A00 0%, #703A00 45%, #A05500 75%, #D4780A 100%)",
    tinggi: "sedang",
  },
  {
    id: "prj-010",
    judul: "Mural Ruang Keluarga Minimalis",
    klien: "Ny. Sari Pratiwi",
    lokasi: "Bintaro, Tangerang Selatan",
    kategori: "Hunian Pribadi",
    tahun: "2024",
    luas: "12 m²",
    gradient: "linear-gradient(150deg, #001A1A 0%, #00404A 50%, #00606E 80%, #008A9A 100%)",
    tinggi: "pendek",
  },
  {
    id: "prj-011",
    judul: "Kaligrafi Kubah & Langit-Langit Masjid Raya",
    klien: "Yayasan Masjid Raya Kota",
    lokasi: "Bekasi, Jawa Barat",
    kategori: "Kaligrafi Masjid",
    tahun: "2025",
    luas: "240 m²",
    gradient: "linear-gradient(165deg, #001A20 0%, #00344A 40%, #004D6E 70%, #006A96 100%)",
    tinggi: "tinggi",
  },
  {
    id: "prj-012",
    judul: "Mural Kamar Anak Tema Hutan",
    klien: "Kel. Budiman Santoso",
    lokasi: "Depok, Jawa Barat",
    kategori: "Hunian Pribadi",
    tahun: "2025",
    luas: "14 m²",
    gradient: "linear-gradient(140deg, #001A05 0%, #003D10 45%, #005C18 75%, #008025 100%)",
    tinggi: "sedang",
  },
];

const KATEGORI_FILTER: Kategori[] = [
  "Semua",
  "Kaligrafi Masjid",
  "Mural Komersial",
  "Ornamen Islami",
  "Hunian Pribadi",
];

const TINGGI_MAP: Record<ProyekItem["tinggi"], string> = {
  pendek: "220px",
  sedang: "300px",
  tinggi: "400px",
};

/* ── Komponen Utama ── */
export default function PortfolioView() {
  const [aktifKategori, setAktifKategori] = useState<Kategori>("Semua");
  const [query, setQuery] = useState("");

  const hasil = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PROYEK_DATA.filter((p) => {
      const cocokKategori = aktifKategori === "Semua" || p.kategori === aktifKategori;
      const cocokQuery =
        !q ||
        p.judul.toLowerCase().includes(q) ||
        p.lokasi.toLowerCase().includes(q) ||
        p.klien.toLowerCase().includes(q);
      return cocokKategori && cocokQuery;
    });
  }, [aktifKategori, query]);

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
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 600,
                lineHeight: 1.10,
                letterSpacing: "-1px",
                color: "#042f2e", // text-teal-950
                margin: "0 0 20px",
              }}
            >
              Portofolio{" "}
              <span style={{ color: "#D4AF37" }}>Lengkap</span>
            </h1>
            <div
              aria-hidden="true"
              style={{ width: "48px", height: "2px", backgroundColor: "#f59e0b", marginBottom: "24px" }}
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
              { angka: `${PROYEK_DATA.length}`, label: "Proyek Ditampilkan" },
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
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "13px",
              color: "#e2e8f0",
              marginBottom: "32px",
            }}
          >
            Menampilkan{" "}
            <span style={{ color: "#ffffff", fontWeight: 600 }}>{hasil.length}</span>{" "}
            proyek
            {aktifKategori !== "Semua" && (
              <> dalam kategori <span style={{ color: "#D4AF37" }}>{aktifKategori}</span></>
            )}
            {query && (
              <> untuk <span style={{ color: "#D4AF37" }}>&ldquo;{query}&rdquo;</span></>
            )}
          </p>

          {hasil.length === 0 ? (
            <EmptyState onReset={() => { setQuery(""); setAktifKategori("Semua"); }} />
          ) : (
            <div
              style={{
                columns: "4 260px",
                columnGap: "12px",
              }}
            >
              {hasil.map((proyek) => (
                <ProyekCard key={proyek.id} proyek={proyek} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ── CTA Bawah ── */}
      <section
        className="bg-white border-t border-amber-500"
        style={{
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <p style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>
          Siap Mulai Proyek?
        </p>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 600,
            color: "#042f2e", // text-teal-950
            margin: "0 0 16px",
            letterSpacing: "-0.3px",
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
          borderRadius: "0px",
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

/* ── Sub: Kartu Proyek ── */
function ProyekCard({ proyek }: { proyek: ProyekItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-stone-50 border border-stone-200"
      style={{
        position: "relative",
        breakInside: "avoid",
        marginBottom: "12px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* ── Artwork Area ── */}
      <div
        style={{
          width: "100%",
          height: TINGGI_MAP[proyek.tinggi],
          backgroundImage: proyek.gradient,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.50s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
          position: "relative",
        }}
      >
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
          }}
        />
      </div>

      {/* ── Overlay Metadata ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 55%, transparent 100%)",
          padding: "36px 16px 16px",
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          opacity: hovered ? 1 : 0.88,
          transition: "all 0.35s ease",
        }}
      >
        {/* Kategori badge */}
        <span
          style={{
            display: "inline-block",
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "#29D2D0",
            marginBottom: "6px",
          }}
        >
          {proyek.kategori}
        </span>

        {/* Judul */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: 1.35,
            color: "#FFFFFF",
            margin: "0 0 6px",
          }}
        >
          {proyek.judul}
        </p>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "12px",
              color: "#8A8A8F",
            }}
          >
            {proyek.lokasi}
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "11px",
              color: "#D4AF37",
              fontWeight: 500,
            }}
          >
            {proyek.tahun}
            {proyek.luas ? ` · ${proyek.luas}` : ""}
          </span>
        </div>
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
          borderRadius: "0",
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
        borderRadius: "0px",
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
        color: hovered ? "#000000" : "#ffffff",
        textDecoration: "none",
        backgroundColor: hovered ? "#FFFFFF" : "transparent",
        border: "1.5px solid #8A8A8F",
        borderRadius: "0px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}
