"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectModal from "@/components/ProjectModal";
import type { ProjectForModal } from "@/components/ProjectModal";

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

interface ProyekItem {
  id: string;
  judul: string;
  klien: string;
  lokasi: string;
  kategori: Exclude<Kategori, "Semua">;
  tahun: string;
  luas?: string;
  gradient: string;
  image: string;
  tinggi: "pendek" | "sedang" | "tinggi";
  deskripsi?: string;
}

/* ── Data Dummy 16 Proyek ── */
const PROYEK_DATA: ProyekItem[] = [
  // Kaligrafi Masjid
  {
    id: "prj-001",
    judul: "Kaligrafi Mihrab Masjid Al-Ikhlas",
    klien: "DKM Masjid Al-Ikhlas",
    lokasi: "Pasar Kemis, Tangerang",
    kategori: "Kaligrafi Masjid",
    tahun: "2024",
    luas: "180 m²",
    gradient: "linear-gradient(160deg, #001520 0%, #013D4D 40%, #025E73 75%, #0A9BAF 100%)",
    image: "/images/porto-kaligrafi.jpg",
    tinggi: "tinggi",
    deskripsi: "Kaligrafi mihrab utama dengan khat Tsuluts dan ornamen arabesk emas. Menghiasi dinding kiblat masjid dengan keindahan sakral.",
  },
  {
    id: "prj-002",
    judul: "Kaligrafi Kubah Masjid Agung An-Nur",
    klien: "Masjid Agung An-Nur",
    lokasi: "Kota Tangerang",
    kategori: "Kaligrafi Masjid",
    tahun: "2024",
    luas: "96 m²",
    gradient: "linear-gradient(160deg, #001520 0%, #025E73 55%, #0A9BAF 100%)",
    image: "/images/porto-kaligrafi2.jpg",
    tinggi: "sedang",
    deskripsi: "Pengerjaan kaligrafi kubah masjid dengan motif bintang geometris dan kaligrafi Asmaul Husna mengelilingi puncak kubah.",
  },
  {
    id: "prj-003",
    judul: "Kaligrafi Dinding Masjid Baitul Amin",
    klien: "DKM Masjid Baitul Amin",
    lokasi: "Cilegon, Banten",
    kategori: "Kaligrafi Masjid",
    tahun: "2023",
    luas: "28 m²",
    gradient: "linear-gradient(160deg, #001830 0%, #002D52 45%, #004080 100%)",
    image: "/images/porto-kaligrafi3.jpg",
    tinggi: "pendek",
    deskripsi: "Kaligrafi mihrab dengan komposisi simetris menggunakan khat Tsuluts. Area dinding kiblat dihiasi ornamen floral yang mengalir harmonis.",
  },
  {
    id: "prj-004",
    judul: "Kaligrafi Asmaul Husna Masjid Al-Falah",
    klien: "Masjid Jami Al-Falah",
    lokasi: "Serang, Banten",
    kategori: "Kaligrafi Masjid",
    tahun: "2024",
    luas: "96 m²",
    gradient: "linear-gradient(155deg, #001A15 0%, #00402D 45%, #008F65 100%)",
    image: "/images/porto-kaligrafi4.jpg",
    tinggi: "tinggi",
    deskripsi: "Penulisan 99 Asmaul Husna pada dinding masjid dengan khat Naskhi yang jelas terbaca. Setiap nama dikelilingi ornamen arabesque yang elegan.",
  },

  // Mural Komersial
  {
    id: "prj-005",
    judul: "Mural Dinding 3D Tepian Kafe",
    klien: "Kafe Tepian BSD",
    lokasi: "BSD City, Tangerang Selatan",
    kategori: "Mural Komersial",
    tahun: "2025",
    luas: "42 m²",
    gradient: "linear-gradient(145deg, #021205 0%, #0A3D15 45%, #1E8C35 100%)",
    image: "/images/porto-mural.jpg",
    tinggi: "sedang",
    deskripsi: "Mural tiga dimensi bertema botanical tropis yang menghiasi dinding utama kafe. Teknik trompe-l'oeil menciptakan ilusi kedalaman yang memukau pengunjung.",
  },
  {
    id: "prj-006",
    judul: "Mural Fasad Restoran Rempah",
    klien: "Restoran Rempah Nusantara",
    lokasi: "Kebon Jeruk, Jakarta Barat",
    kategori: "Mural Komersial",
    tahun: "2025",
    luas: "55 m²",
    gradient: "linear-gradient(150deg, #1A0800 0%, #6B2800 50%, #E06820 100%)",
    image: "/images/porto-mural2.jpg",
    tinggi: "tinggi",
    deskripsi: "Mural fasad eksterior yang menggambarkan perjalanan rempah nusantara. Warna-warna hangat menciptakan suasana mengundang bagi pengunjung restoran.",
  },
  {
    id: "prj-007",
    judul: "Mural Lobi Kantor PT Maju Bersama",
    klien: "PT Maju Bersama",
    lokasi: "Sudirman, Jakarta Pusat",
    kategori: "Mural Komersial",
    tahun: "2025",
    luas: "30 m²",
    gradient: "linear-gradient(145deg, #0D0D0D 0%, #1A1A2E 45%, #0F3460 100%)",
    image: "/images/porto-mural3.jpg",
    tinggi: "pendek",
    deskripsi: "Feature wall lobi kantor korporat dengan desain abstrak geometris. Kombinasi akrilik dan metallic paint menciptakan kesan profesional dan modern.",
  },
  {
    id: "prj-008",
    judul: "Mural Kreatif Coworking Space",
    klien: "SpaceHub BSD",
    lokasi: "Gading Serpong, Tangerang",
    kategori: "Mural Komersial",
    tahun: "2024",
    luas: "35 m²",
    gradient: "linear-gradient(150deg, #021A05 0%, #0A5C1A 55%, #12A830 100%)",
    image: "/images/porto-mural4.jpg",
    tinggi: "sedang",
    deskripsi: "Mural bertema botanical tropis dengan detail daun dan bunga eksotis. Warna-warna segar menghidupkan suasana ruangan coworking.",
  },

  // Ornamen Islami
  {
    id: "prj-009",
    judul: "Ornamen Geometris Mihrab Al-Ikhlas",
    klien: "DKM Masjid Al-Ikhlas",
    lokasi: "Pasar Kemis, Tangerang",
    kategori: "Ornamen Islami",
    tahun: "2024",
    luas: "64 m²",
    gradient: "linear-gradient(135deg, #1A1400 0%, #5C4500 45%, #D4AF37 100%)",
    image: "/images/porto-ornamen.jpg",
    tinggi: "sedang",
    deskripsi: "Panel ornamen geometris dengan pola bintang delapan sudut khas seni Islam. Dikerjakan dengan teknik ukir timbul dan gilding emas, menciptakan dimensi visual yang kaya.",
  },
  {
    id: "prj-010",
    judul: "Ornamen Arabesk Pintu Utama Masjid",
    klien: "DKM Masjid At-Taqwa",
    lokasi: "Serpong, Tangerang Selatan",
    kategori: "Ornamen Islami",
    tahun: "2023",
    luas: "22 m²",
    gradient: "linear-gradient(135deg, #1A0A00 0%, #703A00 45%, #D4780A 100%)",
    image: "/images/porto-ornamen2.jpg",
    tinggi: "sedang",
    deskripsi: "Ornamen arabesk pada kusen dan daun pintu masjid. Detail ukiran tangan dipadukan dengan cat emas untuk aksen mewah nan sakral.",
  },
  {
    id: "prj-011",
    judul: "Ornamen Kerawang Masjid Istiqomah",
    klien: "DKM Masjid Istiqomah",
    lokasi: "Cikupa, Tangerang",
    kategori: "Ornamen Islami",
    tahun: "2024",
    luas: "50 m²",
    gradient: "linear-gradient(145deg, #1A0A00 0%, #8B4513 45%, #C4820A 100%)",
    image: "/images/porto-ornamen3.jpg",
    tinggi: "tinggi",
    deskripsi: "Ornamen lengkung dan medallion pada mihrab dan dinding masjid. Detail ukiran tangan dengan aksen emas 24 karat.",
  },
  {
    id: "prj-012",
    judul: "Ornamen GRC Kubah Luar Masjid",
    klien: "DKM Masjid Jami Baiturrahman",
    lokasi: "Balaraja, Tangerang",
    kategori: "Ornamen Islami",
    tahun: "2025",
    luas: "120 m²",
    gradient: "linear-gradient(145deg, #1A0A00 0%, #8B4513 45%, #C4820A 100%)",
    image: "/images/porto-ornamen4.jpg",
    tinggi: "tinggi",
    deskripsi: "Pengerjaan panel ornamen GRC bermotif islami geometris pada kubah bagian luar masjid. Kuat, indah, dan tahan cuaca ekstrim.",
  },

  // Hunian Pribadi
  {
    id: "prj-013",
    judul: "Mural Kamar Tidur Villa Bukit",
    klien: "Tn. Arif Widodo",
    lokasi: "Puncak, Bogor",
    kategori: "Hunian Pribadi",
    tahun: "2025",
    luas: "18 m²",
    gradient: "linear-gradient(140deg, #0A001A 0%, #2D0A5C 45%, #8A2EC0 100%)",
    image: "/images/porto-hunian.jpg",
    tinggi: "sedang",
    deskripsi: "Mural kamar tidur utama dengan nuansa langit malam berbintang. Efek glow-in-the-dark pada bintang memberikan pengalaman visual unik di malam hari.",
  },
  {
    id: "prj-014",
    judul: "Mural Ruang Keluarga Minimalis Bintaro",
    klien: "Ny. Sari Pratiwi",
    lokasi: "Bintaro, Tangerang Selatan",
    kategori: "Hunian Pribadi",
    tahun: "2024",
    luas: "12 m²",
    gradient: "linear-gradient(150deg, #001A1A 0%, #00404A 50%, #008A9A 100%)",
    image: "/images/porto-hunian2.jpg",
    tinggi: "pendek",
    deskripsi: "Mural minimalis bergaya Japandi untuk ruang keluarga. Warna earthy tone dan motif alam menciptakan suasana tenang dan hangat.",
  },
  {
    id: "prj-015",
    judul: "Mural Kamar Anak Tema Hutan Tropis",
    klien: "Kel. Budiman Santoso",
    lokasi: "Depok, Jawa Barat",
    kategori: "Hunian Pribadi",
    tahun: "2025",
    luas: "14 m²",
    gradient: "linear-gradient(140deg, #001A05 0%, #003D10 45%, #008025 100%)",
    image: "/images/porto-hunian3.jpg",
    tinggi: "sedang",
    deskripsi: "Mural kamar anak dengan tema hutan tropis yang playful. Karakter hewan lucu dan warna cerah menciptakan ruang bermain imajinatif bagi si kecil.",
  },
  {
    id: "prj-016",
    judul: "Mural Klasik Ruang Tamu Mewah",
    klien: "Bpk. Hendra Wijaya",
    lokasi: "Menteng, Jakarta Pusat",
    kategori: "Hunian Pribadi",
    tahun: "2024",
    luas: "25 m²",
    gradient: "linear-gradient(135deg, #0A0A1A 0%, #1A2A6C 50%, #2D4AB5 100%)",
    image: "/images/porto-hunian4.jpg",
    tinggi: "tinggi",
    deskripsi: "Mural dinding ruang tamu hunian mewah bertema pemandangan alam klasik eropa klasik. Dikerjakan dengan detail kuas lukis handmade berkualitas tinggi.",
  },
];

const KATEGORI_FILTER: Kategori[] = [
  "Semua",
  "Kaligrafi Masjid",
  "Mural Komersial",
  "Ornamen Islami",
  "Hunian Pribadi",
];

/* ── Komponen Utama ── */
export default function PortfolioView() {
  const [aktifKategori, setAktifKategori] = useState<Kategori>("Semua");
  const [query, setQuery] = useState("");

  /* ── Modal State ── */
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

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
        judul: p.judul,
        kategori: p.kategori,
        lokasi: p.lokasi,
        image: p.image,
        klien: p.klien,
        tahun: p.tahun,
        luas: p.luas,
        deskripsi: p.deskripsi,
      })),
    [hasil],
  );

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
          {hasil.length === 0 ? (
            <EmptyState onReset={() => { setQuery(""); setAktifKategori("Semua"); }} />
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-4">
              {hasil.map((proyek, index) => (
                <ProyekCard
                  key={proyek.id}
                  proyek={proyek}
                  onCardClick={() => handleOpenModal(index)}
                />
              ))}
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
  proyek: ProyekItem;
  onCardClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
      className="relative overflow-hidden bg-stone-50 border border-stone-200 break-inside-avoid mb-6 group cursor-pointer z-0"
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
          src={proyek.image}
          alt={proyek.judul}
          width={proyek.tinggi === "pendek" ? 800 : proyek.tinggi === "tinggi" ? 600 : 800}
          height={proyek.tinggi === "pendek" ? 600 : proyek.tinggi === "tinggi" ? 800 : 800}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110 z-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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

      {/* ── Desktop Overlay: Hover-only (lg ke atas) ── */}
      <div
        className="hidden lg:flex absolute inset-0 z-20 bg-teal-950/80 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center text-center p-4 pointer-events-none"
      >
        <p className="text-white font-bold text-lg sm:text-xl">
          {proyek.judul}
        </p>
        <p className="text-[#BFA071] md:text-sm mt-2">
          {proyek.lokasi}
        </p>
      </div>

      {/* ── Mobile/Tablet Overlay: Permanent (di bawah lg) ── */}
      <div
        className="flex lg:hidden absolute bottom-0 left-0 right-0 z-10 flex-col"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 60%, transparent 100%)",
          padding: "36px 14px 14px",
        }}
      >
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#FFFFFF",
            margin: "0 0 4px",
          }}
        >
          {proyek.judul}
        </p>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: "#BFA071",
            margin: 0,
          }}
        >
          {proyek.lokasi}
        </p>
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
