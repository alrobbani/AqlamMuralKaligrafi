"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectModal from "@/components/ProjectModal";
import type { ProjectForModal } from "@/components/ProjectModal";

/* ─────────────────────────────────────────────────────────────
   PortfolioGrid — Homepage Preview (DESIGN.md §4.C + PRD §7.A.1)
   Menampilkan 3-4 karya terbaik dengan filter kategori.
   Surface: canvas-light (#fafaf9) — Bright Gallery
   Cards  : Adaptive hover (desktop) / permanent overlay (mobile)
   Modal  : Lightbox detail proyek via <ProjectModal />
───────────────────────────────────────────────────────────── */

type Category = "Semua" | "Kaligrafi Masjid" | "Mural Komersial" | "Ornamen Islami" | "Hunian Pribadi";

interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  category: Exclude<Category, "Semua">;
  /** CSS gradient string — diganti foto nyata saat aset tersedia */
  gradient: string;
  image: string;
  aspectRatio: "portrait" | "landscape" | "square";
  klien?: string;
  tahun?: string;
  luas?: string;
  deskripsi?: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Kaligrafi Masjid
  {
    id: "p-001",
    title: "Kaligrafi Mihrab Al-Ikhlas",
    location: "Masjid Raya, Pasar Kemis",
    category: "Kaligrafi Masjid",
    gradient: "linear-gradient(145deg, #0A3D3F 0%, #0A6E7B 45%, #0D8A9A 100%)",
    image: "/images/porto-kaligrafi.jpg",
    aspectRatio: "portrait",
    klien: "DKM Masjid Al-Ikhlas",
    tahun: "2024",
    luas: "180 m²",
    deskripsi: "Kaligrafi mihrab utama dengan khat Tsuluts dan ornamen arabesk emas. Menghiasi dinding kiblat masjid dengan keindahan sakral.",
  },
  {
    id: "p-002",
    title: "Kaligrafi Kubah Masjid Agung An-Nur",
    location: "Masjid Agung, Tangerang",
    category: "Kaligrafi Masjid",
    gradient: "linear-gradient(160deg, #001520 0%, #025E73 55%, #0A9BAF 100%)",
    image: "/images/porto-kaligrafi2.jpg",
    aspectRatio: "square",
    klien: "Masjid Agung An-Nur",
    tahun: "2024",
    luas: "96 m²",
    deskripsi: "Pengerjaan kaligrafi kubah masjid dengan motif bintang geometris dan kaligrafi Asmaul Husna mengelilingi puncak kubah.",
  },
  {
    id: "p-003",
    title: "Kaligrafi Dinding Masjid Baitul Amin",
    location: "Masjid Baitul Amin, Cilegon",
    category: "Kaligrafi Masjid",
    gradient: "linear-gradient(160deg, #001830 0%, #002D52 45%, #004080 100%)",
    image: "/images/porto-kaligrafi3.jpg",
    aspectRatio: "landscape",
    klien: "DKM Masjid Baitul Amin",
    tahun: "2023",
    luas: "28 m²",
    deskripsi: "Kaligrafi mihrab dengan komposisi simetris menggunakan khat Tsuluts. Area dinding kiblat dihiasi ornamen floral yang mengalir harmonis.",
  },
  {
    id: "p-004",
    title: "Kaligrafi Asmaul Husna Masjid Al-Falah",
    location: "Masjid Jami Al-Falah, Serang",
    category: "Kaligrafi Masjid",
    gradient: "linear-gradient(155deg, #001A15 0%, #00402D 45%, #008F65 100%)",
    image: "/images/porto-kaligrafi4.jpg",
    aspectRatio: "portrait",
    klien: "Masjid Jami Al-Falah",
    tahun: "2024",
    luas: "96 m²",
    deskripsi: "Penulisan 99 Asmaul Husna pada dinding masjid dengan khat Naskhi yang jelas terbaca. Setiap nama dikelilingi ornamen arabesque yang elegan.",
  },

  // Mural Komersial
  {
    id: "p-005",
    title: "Mural Dinding 3D Tepian Kafe",
    location: "Kafe Tepian, BSD City",
    category: "Mural Komersial",
    gradient: "linear-gradient(135deg, #1A0A02 0%, #7C3D0A 50%, #C4680C 100%)",
    image: "/images/porto-mural.jpg",
    aspectRatio: "landscape",
    klien: "Kafe Tepian BSD",
    tahun: "2025",
    luas: "42 m²",
    deskripsi: "Mural 3D bertema botanical tropis yang menjadi daya tarik utama kafe. Teknik trompe-l'oeil menciptakan ilusi kedalaman memukau.",
  },
  {
    id: "p-006",
    title: "Mural Fasad Restoran Rempah",
    location: "Kebon Jeruk, Jakarta Barat",
    category: "Mural Komersial",
    gradient: "linear-gradient(150deg, #1A0800 0%, #6B2800 50%, #E06820 100%)",
    image: "/images/porto-mural2.jpg",
    aspectRatio: "portrait",
    klien: "Restoran Rempah Nusantara",
    tahun: "2025",
    luas: "55 m²",
    deskripsi: "Mural fasad eksterior yang menggambarkan perjalanan rempah nusantara. Warna-warna hangat menciptakan suasana mengundang bagi pengunjung restoran.",
  },
  {
    id: "p-007",
    title: "Mural Lobi Kantor PT Maju Bersama",
    location: "Sudirman, Jakarta Pusat",
    category: "Mural Komersial",
    gradient: "linear-gradient(145deg, #0D0D0D 0%, #1A1A2E 45%, #0F3460 100%)",
    image: "/images/porto-mural3.jpg",
    aspectRatio: "landscape",
    klien: "PT Maju Bersama",
    tahun: "2025",
    luas: "30 m²",
    deskripsi: "Feature wall lobi kantor korporat dengan desain abstrak geometris. Kombinasi akrilik dan metallic paint menciptakan kesan profesional dan modern.",
  },
  {
    id: "p-008",
    title: "Mural Kreatif Coworking Space",
    location: "Gading Serpong, Tangerang",
    category: "Mural Komersial",
    gradient: "linear-gradient(150deg, #021A05 0%, #0A5C1A 55%, #12A830 100%)",
    image: "/images/porto-mural4.jpg",
    aspectRatio: "square",
    klien: "SpaceHub BSD",
    tahun: "2024",
    luas: "35 m²",
    deskripsi: "Mural bertema botanical tropis dengan detail daun dan bunga eksotis. Warna-warna segar menghidupkan suasana ruangan coworking.",
  },

  // Ornamen Islami
  {
    id: "p-009",
    title: "Ornamen Geometris Mihrab Al-Ikhlas",
    location: "Pasar Kemis, Tangerang",
    category: "Ornamen Islami",
    gradient: "linear-gradient(135deg, #1A1400 0%, #8A6A00 50%, #D4AF37 100%)",
    image: "/images/porto-ornamen.jpg",
    aspectRatio: "landscape",
    klien: "DKM Masjid Al-Ikhlas",
    tahun: "2024",
    luas: "64 m²",
    deskripsi: "Panel ornamen geometris dengan pola bintang delapan sudut khas seni Islam. Dikerjakan dengan teknik ukir timbul dan gilding emas.",
  },
  {
    id: "p-010",
    title: "Ornamen Arabesk Pintu Utama Masjid",
    location: "Serpong, Tangerang Selatan",
    category: "Ornamen Islami",
    gradient: "linear-gradient(135deg, #1A0A00 0%, #703A00 45%, #D4780A 100%)",
    image: "/images/porto-ornamen2.jpg",
    aspectRatio: "portrait",
    klien: "DKM Masjid At-Taqwa",
    tahun: "2023",
    luas: "22 m²",
    deskripsi: "Ornamen arabesk pada kusen dan daun pintu masjid. Detail ukiran tangan dipadukan dengan cat emas untuk aksen mewah nan sakral.",
  },
  {
    id: "p-011",
    title: "Ornamen Kerawang Masjid Istiqomah",
    location: "Cikupa, Tangerang",
    category: "Ornamen Islami",
    gradient: "linear-gradient(145deg, #1A0A00 0%, #8B4513 45%, #C4820A 100%)",
    image: "/images/porto-ornamen3.jpg",
    aspectRatio: "square",
    klien: "DKM Masjid Istiqomah",
    tahun: "2024",
    luas: "50 m²",
    deskripsi: "Ornamen lengkung dan medallion pada mihrab dan dinding masjid. Detail ukiran tangan dengan aksen emas 24 karat.",
  },
  {
    id: "p-012",
    title: "Ornamen GRC Kubah Luar Masjid",
    location: "Balaraja, Tangerang",
    category: "Ornamen Islami",
    gradient: "linear-gradient(145deg, #1A0A00 0%, #8B4513 45%, #C4820A 100%)",
    image: "/images/porto-ornamen4.jpg",
    aspectRatio: "portrait",
    klien: "DKM Masjid Jami Baiturrahman",
    tahun: "2025",
    luas: "120 m²",
    deskripsi: "Pengerjaan panel ornamen GRC bermotif islami geometris pada kubah bagian luar masjid. Kuat, indah, dan tahan cuaca ekstrim.",
  },

  // Hunian Pribadi
  {
    id: "p-013",
    title: "Mural Kamar Tidur Villa Bukit",
    location: "Puncak, Bogor",
    category: "Hunian Pribadi",
    gradient: "linear-gradient(145deg, #1A0A20 0%, #6B2D8A 50%, #A855CF 100%)",
    image: "/images/porto-hunian.jpg",
    aspectRatio: "square",
    klien: "Tn. Arif Widodo",
    tahun: "2025",
    luas: "18 m²",
    deskripsi: "Mural kamar tidur utama dengan nuansa langit malam berbintang. Efek glow-in-the-dark pada bintang memberikan pengalaman visual unik di malam hari.",
  },
  {
    id: "p-014",
    title: "Mural Ruang Keluarga Minimalis Bintaro",
    location: "Bintaro, Tangerang Selatan",
    category: "Hunian Pribadi",
    gradient: "linear-gradient(135deg, #0A0A1A 0%, #1A2A6C 50%, #2D4AB5 100%)",
    image: "/images/porto-hunian2.jpg",
    aspectRatio: "landscape",
    klien: "Ny. Sari Pratiwi",
    tahun: "2024",
    luas: "12 m²",
    deskripsi: "Mural minimalis bergaya Japandi untuk ruang keluarga. Warna earthy tone and motif alam menciptakan suasana tenang dan hangat.",
  },
  {
    id: "p-015",
    title: "Mural Kamar Anak Tema Hutan Tropis",
    location: "Depok, Jawa Barat",
    category: "Hunian Pribadi",
    gradient: "linear-gradient(145deg, #1A0A20 0%, #6B2D8A 50%, #A855CF 100%)",
    image: "/images/porto-hunian3.jpg",
    aspectRatio: "square",
    klien: "Kel. Budiman Santoso",
    tahun: "2025",
    luas: "14 m²",
    deskripsi: "Mural kamar anak dengan tema hutan tropis yang playful. Karakter hewan lucu dan warna cerah menciptakan ruang bermain imajinatif bagi si kecil.",
  },
  {
    id: "p-016",
    title: "Mural Klasik Ruang Tamu Mewah",
    location: "Menteng, Jakarta Pusat",
    category: "Hunian Pribadi",
    gradient: "linear-gradient(135deg, #0A0A1A 0%, #1A2A6C 50%, #2D4AB5 100%)",
    image: "/images/porto-hunian4.jpg",
    aspectRatio: "landscape",
    klien: "Bpk. Hendra Wijaya",
    tahun: "2024",
    luas: "25 m²",
    deskripsi: "Mural dinding ruang tamu hunian mewah bertema pemandangan alam klasik eropa klasik. Dikerjakan dengan detail kuas lukis handmade berkualitas tinggi.",
  }
];

/** 4 item pilihan — satu per kategori, untuk pratinjau beranda */
const HOMEPAGE_ITEMS = [
  PORTFOLIO_ITEMS[0],  // Kaligrafi Masjid (porto-kaligrafi.jpg)
  PORTFOLIO_ITEMS[4],  // Mural Komersial (porto-mural.jpg)
  PORTFOLIO_ITEMS[8],  // Ornamen Islami (porto-ornamen.jpg)
  PORTFOLIO_ITEMS[12], // Hunian Pribadi (porto-hunian.jpg)
];

export default function PortfolioGrid() {
  /* ── Modal State ── */
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

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
    setSelectedProjectIndex((selectedProjectIndex + 1) % HOMEPAGE_ITEMS.length);
  }, [selectedProjectIndex]);

  const handlePrev = useCallback(() => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex(
      (selectedProjectIndex - 1 + HOMEPAGE_ITEMS.length) % HOMEPAGE_ITEMS.length,
    );
  }, [selectedProjectIndex]);

  /* ── Map data untuk ProjectModal ── */
  const projectsForModal: ProjectForModal[] = useMemo(
    () =>
      HOMEPAGE_ITEMS.map((item) => ({
        judul: item.title,
        kategori: item.category,
        lokasi: item.location,
        image: item.image,
        klien: item.klien,
        tahun: item.tahun,
        luas: item.luas,
        deskripsi: item.deskripsi,
      })),
    [],
  );

  return (
    <section
      className="bg-stone-50 border-t border-amber-500"
      style={{
        padding: "96px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* ── Section Header ── */}
        <div style={{ marginBottom: "56px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-caveat-brush), cursive",
              fontSize: "clamp(36px, 5vw, 54px)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "0.01em",
              color: "#042f2e",
              margin: "0 0 24px",
            }}
          >
            Portofolio Pilihan
          </h2>
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "#D4AF37",
              margin: "0 auto",
            }}
          />
        </div>

        {/* ── 4 Kartu Pilihan — satu per kategori ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {HOMEPAGE_ITEMS.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onCardClick={() => handleOpenModal(index)}
            />
          ))}
        </div>

        {/* ── CTA Lihat Semua ── */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <ViewAllButton href="/portfolio" />
        </div>
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
    </section>
  );
}

/* ── Sub: Portfolio Card (Adaptive Hover & Tap) ── */
function PortfolioCard({
  item,
  onCardClick,
}: {
  item: PortfolioItem;
  onCardClick: () => void;
}) {
  return (
    <div
      onClick={onCardClick}
      className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer z-0"
    >
      {/* ── Artwork Container ── */}
      <Image
        src={item.image}
        alt={item.title}
        width={item.aspectRatio === "landscape" ? 800 : item.aspectRatio === "portrait" ? 600 : 800}
        height={item.aspectRatio === "landscape" ? 600 : item.aspectRatio === "portrait" ? 800 : 800}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
      />
      
      {/* Pola Subtle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 21px)",
        }}
      />

      {/* ── Text Overlay (All Devices) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 z-10 pointer-events-none">
        <p className="text-white font-semibold text-base m-0">
          {item.title}
        </p>
        <p className="text-[#BFA071] text-xs mt-1 m-0">
          {item.location}
        </p>
      </div>
    </div>
  );
}

/* ── Sub: Tombol Lihat Semua Portofolio ── */
function ViewAllButton({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        height: "52px",
        padding: "0 40px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "1.4px",
        textTransform: "uppercase",
        color: hovered ? "#FFFFFF" : "#042f2e",
        textDecoration: "none",
        backgroundColor: hovered ? "#29D2D0" : "transparent",
        border: hovered ? "1.5px solid #29D2D0" : "1.5px solid #042f2e",
        borderRadius: "12px",
        transition: "all 0.25s ease",
      }}
    >
      Lihat Semua Portofolio
      <ArrowIcon />
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
