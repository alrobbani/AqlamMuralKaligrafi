import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormKonsultasi from "@/components/FormKonsultasi";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Daftar Harga — PT Aqlam Mural Kaligrafi",
  description:
    "Estimasi harga jasa kaligrafi masjid, mural dinding komersial, ornamen Islami, dan kaligrafi bingkai dari PT Aqlam Mural Kaligrafi. Transparan, kompetitif, tanpa biaya tersembunyi.",
};

/* ─────────────────────────────────────────────────────────────
   Halaman Daftar Harga (Pricelist)
   PRD §7.A: "Halaman Pricelist digital transparan yang mudah dipahami"
   Surface: canvas-light → per section bergantian
   Kartu harga: 3 segmen × beberapa paket
───────────────────────────────────────────────────────────── */

interface PaketHarga {
  nama: string;
  harga: string;
  satuan: string;
  deskripsi: string;
  fitur: string[];
  highlight?: boolean;
}

interface SegmenHarga {
  segmen: string;
  label: string;
  warna: string;
  paket: PaketHarga[];
}

const DAFTAR_HARGA: SegmenHarga[] = [
  {
    segmen: "Kaligrafi Masjid",
    label: "Untuk DKM & Yayasan",
    warna: "#D4AF37",
    paket: [
      {
        nama: "Mihrab Masjid",
        harga: "Rp 2.500.000",
        satuan: "/ m²",
        deskripsi: "Kaligrafi cat acrylic untuk area mihrab dan dinding kiblat.",
        fitur: [
          "Cat acrylic premium anti-air",
          "Pilihan surah Al-Fatihah / Al-Ikhlas / Ayat Kursi",
          "Konsultasi desain digital sebelum pengerjaan",
          "Garansi hasil 3 tahun",
        ],
      },
      {
        nama: "Kubah & Langit-Langit",
        harga: "Rp 3.500.000",
        satuan: "/ m²",
        deskripsi: "Kaligrafi detail untuk kubah, langit-langit, dan ornamen melingkar.",
        fitur: [
          "Teknik cat airbrush + kuas halus",
          "Material tahan cuaca eksterior / interior",
          "Survei lokasi gratis (Jabodetabek)",
          "Garansi hasil 5 tahun",
        ],
        highlight: true,
      },
      {
        nama: "Paket Masjid Lengkap",
        harga: "Hubungi Kami",
        satuan: "/ negosiasi",
        deskripsi: "Dekorasi komprehensif seluruh area masjid: mihrab, kubah, dinding, dan ornamen.",
        fitur: [
          "Mencakup semua area masjid",
          "Desain custom 3D mockup sebelum eksekusi",
          "Tim ahli 4-6 orang",
          "Harga terbaik untuk proyek besar",
        ],
      },
    ],
  },
  {
    segmen: "Mural Komersial",
    label: "Untuk Bisnis & Properti",
    warna: "#D4AF37",
    paket: [
      {
        nama: "Mural Dinding Dasar",
        harga: "Rp 350.000",
        satuan: "/ m²",
        deskripsi: "Mural flat 2D dengan warna solid untuk dinding interior bisnis.",
        fitur: [
          "Desain 1 konsep warna",
          "Cat acrylic indoor",
          "Pengerjaan 2-5 hari kerja",
          "Revisi minor gratis",
        ],
      },
      {
        nama: "Mural Premium 3D",
        harga: "Rp 750.000",
        satuan: "/ m²",
        deskripsi: "Mural gradasi & shading 3D realistis untuk kafe, restoran, dan kantor.",
        fitur: [
          "Efek tiga dimensi & gradasi",
          "Material cat indoor food-grade",
          "Pengerjaan 5-10 hari kerja",
          "2× revisi desain digital",
        ],
        highlight: true,
      },
      {
        nama: "Mural Eksterior",
        harga: "Rp 900.000",
        satuan: "/ m²",
        deskripsi: "Mural tahan cuaca untuk fasad gedung, pagar, dan dinding luar bangunan.",
        fitur: [
          "Cat weatherproof UV-resistant",
          "Tahan hujan & panas ekstrem",
          "Pengerjaan 7-14 hari kerja",
          "Garansi 3 tahun",
        ],
      },
    ],
  },
  {
    segmen: "Rumah Pribadi & Bingkai",
    label: "Untuk Personal & Hadiah",
    warna: "#D4AF37",
    paket: [
      {
        nama: "Kaligrafi Kanvas Kecil",
        harga: "Rp 350.000",
        satuan: "/ karya",
        deskripsi: "Kaligrafi di atas kanvas berukuran 40×60 cm, siap bingkai.",
        fitur: [
          "Ukuran 40×60 cm",
          "Pilihan 5+ desain kaligrafi",
          "Cat acrylic archival",
          "Pengiriman seluruh Indonesia",
        ],
      },
      {
        nama: "Kaligrafi Bingkai Custom",
        harga: "Rp 850.000",
        satuan: "/ karya",
        deskripsi: "Kaligrafi custom nama / ayat pilihan dengan bingkai kayu jati premium.",
        fitur: [
          "Ukuran 60×90 cm",
          "Desain nama atau ayat sesuai permintaan",
          "Bingkai kayu jati pilihan",
          "Sertifikat keaslian karya",
        ],
        highlight: true,
      },
      {
        nama: "Mural Kamar / Ruang",
        harga: "Rp 500.000",
        satuan: "/ m²",
        deskripsi: "Mural dekorasi untuk kamar tidur, ruang keluarga, dan ruang bermain anak.",
        fitur: [
          "Cat acrylic ramah anak (non-toxic)",
          "Pilihan tema: islami, alam, geometris",
          "Pengerjaan 3-5 hari kerja",
          "Revisi desain 1× gratis",
        ],
      },
    ],
  },
];

const CATATAN_HARGA = [
  "Harga di atas adalah estimasi awal. Biaya final ditentukan setelah survei lokasi dan diskusi detail desain.",
  "Ongkos transportasi di luar area Jabodetabek akan dihitung terpisah berdasarkan jarak.",
  "Pembayaran DP minimal 50% di awal proyek, pelunasan setelah proyek selesai dan klien menyetujui hasilnya.",
  "Semua harga sudah termasuk material cat dan peralatan kerja.",
];

export default function PricelistPage() {
  return (
    <main className="bg-white" style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative h-60 sm:h-72 md:h-80 w-full flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Daftar Estimasi Harga Background"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-teal-950/75 z-10" />
        <div className="relative z-20">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl tracking-wide" style={{ fontFamily: "var(--font-caveat-brush), cursive" }}>
            Daftar Estimasi Harga
          </h1>
          <div className="w-16 h-1 bg-[#BFA071] mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* ── Kartu Harga per Segmen ── */}
      {DAFTAR_HARGA.map((segmen, sIdx) => (
        <section
          key={segmen.segmen}
          className={sIdx % 2 === 0 ? "bg-stone-50" : "bg-teal-800"}
          style={{
            padding: "80px 32px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Header segmen */}
            <div style={{ marginBottom: "48px" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  backgroundColor: segmen.warna,
                  padding: "6px 16px",
                  marginBottom: "16px",
                }}
              >
                {segmen.label}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-caveat-brush), cursive",
                  fontSize: "clamp(32px, 4.5vw, 48px)",
                  fontWeight: 400,
                  color: sIdx % 2 === 0 ? "#042f2e" : "#FFFFFF",
                  margin: "0",
                  letterSpacing: "0.01em",
                }}
              >
                {segmen.segmen}
              </h2>
              <div aria-hidden="true" style={{ width: "40px", height: "2px", backgroundColor: "#D4AF37", marginTop: "14px" }} />
            </div>

            {/* Grid kartu */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {segmen.paket.map((paket) => (
                <PriceCard key={paket.nama} paket={paket} accentColor={segmen.warna} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Catatan & Disclaimer ── */}
      <section className="bg-white border-t border-amber-500" style={{ padding: "64px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-caveat-brush), cursive", fontSize: "36px", fontWeight: 400, color: "#042f2e", margin: "0 0 32px", letterSpacing: "0.01em" }}>
            Catatan Penting
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {CATATAN_HARGA.map((c, i) => (
              <li key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#D4AF37", marginTop: "9px", flexShrink: 0 }} />
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", lineHeight: 1.70, color: "#3A3A3A", margin: 0 }}>
                  {c}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="https://wa.me/6289630430245"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              height: "52px",
              padding: "0 36px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "#ffffff",
              textDecoration: "none",
              backgroundColor: "#D4AF37",
              borderRadius: "0px",
            }}
          >
            Minta Penawaran Khusus
          </Link>
        </div>
      </section>

      {/* ── Form Konsultasi ── */}
      <FormKonsultasi />

      <Footer />
    </main>
  );
}

/* ── Kartu Harga ── */
function PriceCard({
  paket,
  accentColor,
}: {
  paket: PaketHarga;
  accentColor: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: paket.highlight ? `2px solid ${accentColor}` : "1px solid #E2E2E6",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Badge "Populer" untuk highlight */}
      {paket.highlight && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: accentColor,
            padding: "6px 14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          Populer
        </div>
      )}

      {/* Header kartu */}
      <div style={{ padding: "32px 28px 24px", borderBottom: "1px solid #F3F3F6" }}>
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            color: "#1A1A1A",
            margin: "0 0 8px",
            paddingRight: paket.highlight ? "80px" : "0",
          }}
        >
          {paket.nama}
        </h3>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#6A6A6F",
            margin: "0 0 20px",
          }}
        >
          {paket.deskripsi}
        </p>
        {/* Harga */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: paket.harga === "Hubungi Kami" ? "24px" : "30px",
              fontWeight: 700,
              color: accentColor,
              lineHeight: 1,
            }}
          >
            {paket.harga}
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "13px",
              color: "#8A8A8F",
              fontWeight: 400,
            }}
          >
            {paket.satuan}
          </span>
        </div>
      </div>

      {/* Fitur */}
      <ul
        style={{
          listStyle: "none",
          padding: "24px 28px 32px",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
        }}
      >
        {paket.fitur.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", lineHeight: 1.55, color: "#3A3A3A" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
