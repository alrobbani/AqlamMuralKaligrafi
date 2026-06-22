"use client";

import React, { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   Testimoni — Client Logos + Testimonial Quotes (PRD §7.A.1)
   Surface  : canvas-light (#FAFAFD)
   Mobile   : horizontal carousel (flex overflow-x-auto snap-x) — hemat scroll
   Desktop  : grid layout normal
   Aturan   : No emoji, no star rating generic — DESIGN.md §2
───────────────────────────────────────────────────────────── */

interface TestimoniItem {
  id: string;
  kutipan: string;
  nama: string;
  jabatan: string;
  instansi: string;
  kategoriProyek: string;
  inisial: string;
  warnaBg: string;
}

interface LogoKlien {
  id: string;
  nama: string;
  singkatan: string;
  warna: string;
}

const LOGO_KLIEN: LogoKlien[] = [
  { id: "kl-01", nama: "Masjid Al-Ikhlas Pasar Kemis", singkatan: "Al-Ikhlas", warna: "#0A6E7B" },
  { id: "kl-02", nama: "Kafe Tepian BSD City", singkatan: "Tepian", warna: "#C4680C" },
  { id: "kl-03", nama: "Yayasan Masjid Agung An-Nur", singkatan: "An-Nur", warna: "#0A6E7B" },
  { id: "kl-04", nama: "PT Maju Bersama", singkatan: "PT Maju", warna: "#1A2A6C" },
  { id: "kl-05", nama: "Restoran Rempah Nusantara", singkatan: "Rempah", warna: "#8A3A00" },
  { id: "kl-06", nama: "DKM Masjid Jami Al-Falah", singkatan: "Al-Falah", warna: "#006045" },
  { id: "kl-07", nama: "Villa Bukit Puncak", singkatan: "Villa", warna: "#5C1A8A" },
  { id: "kl-08", nama: "Masjid At-Taqwa Serpong", singkatan: "At-Taqwa", warna: "#703A00" },
];

const TESTIMONI_DATA: TestimoniItem[] = [
  {
    id: "t-01",
    kutipan:
      "Subhanallah, hasil kaligrafi mihrab masjid kami melampaui ekspektasi. Tim Aqlam sangat profesional dari awal konsultasi hingga serah terima. Para jamaah takjub dengan keindahannya.",
    nama: "H. Mochammad Yusuf",
    jabatan: "Ketua DKM",
    instansi: "Masjid Al-Ikhlas, Pasar Kemis",
    kategoriProyek: "Kaligrafi Masjid",
    inisial: "HY",
    warnaBg: "#0A6E7B",
  },
  {
    id: "t-02",
    kutipan:
      "Mural botanical di kafe kami langsung menjadi titik foto favorit pengunjung. Omzet naik karena banyak yang datang khusus untuk foto di sana. Investasi terbaik untuk bisnis kami.",
    nama: "Dian Rahayu",
    jabatan: "Owner",
    instansi: "Kafe Tepian, BSD City",
    kategoriProyek: "Mural Komersial",
    inisial: "DR",
    warnaBg: "#C4680C",
  },
  {
    id: "t-03",
    kutipan:
      "Ornamen geometris Islami di dinding kantor kami membuat suasana kerja jadi lebih berkelas dan tenang. Harga sangat kompetitif untuk kualitas yang sangat premium.",
    nama: "Budi Santoso, S.E.",
    jabatan: "Direktur Utama",
    instansi: "PT Maju Bersama, Jakarta",
    kategoriProyek: "Ornamen Islami",
    inisial: "BS",
    warnaBg: "#1A2A6C",
  },
  {
    id: "t-04",
    kutipan:
      "Kamar tidur anak saya kini seperti taman yang hidup berkat mural karya Aqlam. Prosesnya cepat, bersih, dan hasilnya persis seperti desain yang kami diskusikan. Highly recommended!",
    nama: "Ny. Sari Pratiwi",
    jabatan: "Ibu Rumah Tangga",
    instansi: "Bintaro, Tangerang Selatan",
    kategoriProyek: "Hunian Pribadi",
    inisial: "SP",
    warnaBg: "#5C1A8A",
  },
  {
    id: "t-05",
    kutipan:
      "Kubah masjid kami kini menjadi ikon kebanggaan warga. Kaligrafi Asmaul Husna-nya dikerjakan dengan sangat detail. Tim datang tepat waktu dan sangat menjaga kebersihan area kerja.",
    nama: "Ustadz Ahmad Fauzi",
    jabatan: "Sekretaris DKM",
    instansi: "Masjid Jami Al-Falah, Serang",
    kategoriProyek: "Kaligrafi Masjid",
    inisial: "AF",
    warnaBg: "#006045",
  },
];

export default function Testimoni() {
  const [itemsToShow, setItemsToShow] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };
    handleResize(); // Set initial value on client
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONI_DATA.length - itemsToShow);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsToShow, maxIndex, currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000); // 6 detik
    return () => clearInterval(timer);
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section
      style={{
        backgroundColor: "#FAFAFD",
        padding: "96px 0",
        borderTop: "1px solid #E2E2E6",
      }}
    >
      {/* ── Section Header Testimoni ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", marginBottom: "48px" }}>
        <h2
          style={{
            fontFamily: "var(--font-caveat-brush), cursive",
            fontSize: "clamp(34px, 5vw, 52px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "0.01em",
            color: "#1A1A1A",
            margin: "0 0 16px",
            maxWidth: "560px",
          }}
        >
          Kepercayaan yang Menjadi Motivasi
        </h2>
        <div aria-hidden="true" style={{ width: "48px", height: "3px", backgroundColor: "#D4AF37" }} />
      </div>

      {/* ── Carousel Testimoni ── */}
      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 64px" }}>
        <div style={{ overflow: "hidden", borderRadius: "8px", padding: "16px 0" }}>
          <div
            style={{
              display: "flex",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {TESTIMONI_DATA.map((t) => (
              <div
                key={t.id}
                style={{
                  flex: `0 0 ${100 / itemsToShow}%`,
                  padding: "0 12px"
                }}
              >
                <TestimoniCard item={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          style={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#FFFFFF",
            border: "1px solid #E2E2E6",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#0A6E7B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            zIndex: 10,
          }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Testimonial"
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#FFFFFF",
            border: "1px solid #E2E2E6",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#0A6E7B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            zIndex: 10,
          }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "16px" }}>
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: currentIndex === idx ? "#BFA071" : "#D1D5DB",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: currentIndex === idx ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function TestimoniCard({ item }: { item: TestimoniItem }) {
  return (
    <article
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E2E6",
        padding: "48px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        position: "relative",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
        borderRadius: "4px",
      }}
    >
      {/* Tanda kutip dekoratif */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "80px",
          lineHeight: 0.8,
          color: item.warnaBg,
          opacity: 0.10,
          position: "absolute",
          top: "20px",
          left: "20px",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>

      {/* Kategori proyek */}
      <span
        style={{
          display: "inline-block",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: item.warnaBg,
          marginBottom: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {item.kategoriProyek}
      </span>

      {/* Kutipan */}
      <blockquote
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "15px",
          lineHeight: 1.80,
          color: "#3A3A3A",
          margin: "0 0 28px",
          fontStyle: "normal",
          position: "relative",
          zIndex: 1,
          flex: 1,
        }}
      >
        &ldquo;{item.kutipan}&rdquo;
      </blockquote>

      {/* Profil reviewer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          paddingTop: "20px",
          borderTop: "1px solid #F3F3F6",
        }}
      >
        {/* Avatar inisial */}
        <div
          aria-hidden="true"
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: item.warnaBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "1px",
            }}
          >
            {item.inisial}
          </span>
        </div>
        {/* Nama & jabatan */}
        <div>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "#1A1A1A",
              margin: "0 0 3px",
              lineHeight: 1.3,
            }}
          >
            {item.nama}
          </p>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "12px",
              color: "#8A8A8F",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {item.jabatan} — {item.instansi}
          </p>
        </div>
      </div>
    </article>
  );
}
