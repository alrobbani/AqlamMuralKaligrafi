import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormKonsultasi from "@/components/FormKonsultasi";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tentang Kami — PT Aqlam Mural Kaligrafi",
  description:
    "Kenali lebih dekat PT Aqlam Mural Kaligrafi: studio seni dekorasi dinding profesional berbasis di Pasar Kemis, Tangerang yang telah mengerjakan ratusan proyek masjid, kafe, dan rumah pribadi.",
};

/* ─────────────────────────────────────────────────────────────
   Halaman Tentang Kami (About Us)
   Struktur: Hero editorial → Profil Perusahaan → Nilai Kami → Tim → CTA
───────────────────────────────────────────────────────────── */

const NILAI_PERUSAHAAN = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A6E7B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    judul: "Presisi & Kualitas",
    deskripsi:
      "Setiap goresan kaligrafi dikerjakan dengan ketelitian tinggi menggunakan bahan-bahan premium yang tahan cuaca dan tahan lama.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A6E7B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    judul: "Tepat Waktu",
    deskripsi:
      "Kami berkomitmen menyelesaikan setiap proyek sesuai tenggat yang disepakati, tanpa mengorbankan hasil akhir.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A6E7B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    judul: "Berorientasi Klien",
    deskripsi:
      "Kepuasan Anda adalah tolok ukur kami. Konsultasi gratis, revisi desain terbuka, dan komunikasi transparan di setiap tahap.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A6E7B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    judul: "Warisan Seni",
    deskripsi:
      "Kami memadukan teknik kaligrafi Islam tradisional dengan sensibilitas desain modern untuk menghasilkan karya yang abadi.",
  },
];

const STATISTIK = [
  { angka: "200+", label: "Proyek Selesai" },
  { angka: "6+", label: "Tahun Berpengalaman" },
  { angka: "50+", label: "Masjid Ditangani" },
  { angka: "100%", label: "Garansi Kepuasan" },
];

const LAYANAN_UTAMA = [
  { nama: "Kaligrafi Mihrab & Kubah Masjid", deskripsi: "Ukiran dan lukisan kaligrafi monumental untuk area sakral masjid — dari mihrab, kubah, hingga dinding utama." },
  { nama: "Mural Dinding Komersial", deskripsi: "Transformasi ruang kafe, restoran, kantor, dan pusat perbelanjaan menjadi destinasi visual yang memukau." },
  { nama: "Ornamen & Dekorasi Islami", deskripsi: "Panel ornamen geometris, arabesk, dan motif Islami untuk mempercantik interior masjid dan gedung." },
  { nama: "Kaligrafi Bingkai & Kanvas", deskripsi: "Karya kaligrafi custom berbingkai untuk hadiah pernikahan, dekorasi rumah, dan koleksi seni pribadi." },
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FAFAFD" }}>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative h-60 sm:h-72 md:h-80 w-full flex items-center justify-center text-center px-4 overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Tentang Kami Background"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-teal-950/75 z-10" />
        <div className="relative z-20">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl tracking-wide" style={{ fontFamily: "var(--font-caveat-brush), cursive" }}>
            Tentang Kami
          </h1>
          <div className="w-16 h-1 bg-[#BFA071] mx-auto mt-4 rounded-full" />
        </div>
      </section>

      {/* ── Statistik ── */}
      <section style={{ backgroundColor: "#0A6E7B", padding: "56px 32px" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "32px",
            textAlign: "center",
          }}
        >
          {STATISTIK.map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "42px", fontWeight: 700, color: "#D4AF37", margin: "0 0 8px", lineHeight: 1 }}>
                {s.angka}
              </p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.80)", margin: 0, letterSpacing: "0.3px" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section style={{ backgroundColor: "#FAFAFD", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel>Arah & Tujuan</SectionLabel>
          <SectionHeading>Visi &amp; Misi</SectionHeading>
          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
              marginTop: "48px",
            }}
          >
            {/* Visi */}
            <div style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "28px" }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "26px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px" }}>
                Visi
              </h3>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "#3A3A3A", margin: 0 }}>
                Menjadi studio seni dekorasi Islam dan mural dinding terdepan di
                Indonesia yang dikenal atas presisi kualitas, nilai estetika tinggi,
                dan warisan budaya yang kami jaga dalam setiap karya.
              </p>
            </div>
            {/* Misi */}
            <div style={{ borderLeft: "3px solid #0A6E7B", paddingLeft: "28px" }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "26px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px" }}>
                Misi
              </h3>
              <ul style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px", lineHeight: 1.85, color: "#3A3A3A", margin: 0, paddingLeft: "20px" }}>
                <li>Menghadirkan kaligrafi dan mural berkualitas museum untuk semua kalangan.</li>
                <li>Memberikan konsultasi desain yang jujur dan transparan.</li>
                <li>Mendokumentasikan setiap proyek secara profesional.</li>
                <li>Melestarikan seni kaligrafi Islam untuk generasi mendatang.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nilai Perusahaan ── */}
      <section style={{ backgroundColor: "#F3F3F6", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionLabel>Apa yang Membedakan Kami</SectionLabel>
          <SectionHeading>Nilai-Nilai Kami</SectionHeading>
          <Divider />
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ marginTop: "48px" }}
          >
            {NILAI_PERUSAHAAN.map((n) => (
              <div
                key={n.judul}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E2E6",
                  padding: "28px 24px",
                }}
              >
                <div style={{ marginBottom: "16px" }}>{n.icon}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "20px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 12px" }}>
                  {n.judul}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "15px", lineHeight: 1.70, color: "#4A4A4A", margin: 0 }}>
                  {n.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Layanan Utama ── */}
      <style>{`
        .layanan-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 48px;
        }
        @media (min-width: 640px) {
          .layanan-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .layanan-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
          }
          .layanan-card {
            border-right: 1px solid #E2E2E6 !important;
          }
          .layanan-card:last-child {
            border-right: none !important;
          }
        }
        .layanan-card {
          position: relative;
          background-color: #FFFFFF;
          border: 1px solid #E2E2E6;
          padding: 24px;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .layanan-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #D4AF37, #0A6E7B);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .layanan-card:hover {
          box-shadow: 0 8px 24px rgba(10,110,123,0.12);
          transform: translateY(-3px);
        }
        .layanan-card:hover::before {
          opacity: 1;
        }
        @media (min-width: 1024px) {
          .layanan-card {
            border-top: none;
            border-bottom: none;
          }
          .layanan-card:first-child {
            border-left: 1px solid #E2E2E6;
          }
          .layanan-grid {
            border-top: 1px solid #E2E2E6;
            border-bottom: 1px solid #E2E2E6;
          }
        }
      `}</style>
      <section style={{ backgroundColor: "#FAFAFD", padding: "96px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionLabel>Keahlian Kami</SectionLabel>
          <SectionHeading>Layanan Utama</SectionHeading>
          <Divider />
          <div className="layanan-grid">
            {LAYANAN_UTAMA.map((l, idx) => (
              <div key={l.nama} className="layanan-card">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ display: "inline-block", width: "28px", height: "2px", backgroundColor: "#D4AF37", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#0A6E7B" }}>
                    0{idx + 1}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "18px", fontWeight: 600, color: "#1A1A1A", margin: "0 0 10px", lineHeight: 1.25 }}>
                  {l.nama}
                </h3>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#4A4A4A", margin: 0 }}>
                  {l.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lokasi Workshop ── */}
      <section style={{ backgroundColor: "#FAFAFD", padding: "48px 32px 96px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <SectionLabel>Kunjungi Kami</SectionLabel>
          <SectionHeading>Lokasi Workshop Kami</SectionHeading>
          <Divider />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 mt-12 bg-stone-50 rounded-2xl border border-stone-200 shadow-sm">
            {/* Kolom Kiri: Info */}
            <div>
              <h3 className="font-sans text-xl font-bold text-teal-950 mb-4">
                Workshop & Studio Utama
              </h3>
              <p className="font-sans text-stone-600 leading-relaxed mb-6">
                Jl. Rambutan 5, Jl. Komp. Bumi Asri No.06 Blok D-11, RT.05/RW.18, Kutabumi, Kec. Pasar Kemis, Kabupaten Tangerang, Banten 15560
              </p>
              <div className="mb-6">
                <h4 className="font-sans text-sm font-semibold text-teal-800 uppercase tracking-wider mb-2">Jam Operasional</h4>
                <p className="font-sans text-stone-600">Senin - Sabtu: 09.00 - 17.00 WIB</p>
                <p className="font-sans text-stone-600">Minggu: Tutup (Konsultasi by Appointment)</p>
              </div>
              <a
                href="https://maps.app.goo.gl/LufvD2QJCatZnUGy6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1A5F62] hover:bg-teal-800 text-white font-sans font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Buka di Google Maps
              </a>
            </div>
            {/* Kolom Kanan: Iframe Maps */}
            <div className="w-full h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8656111197775!2d106.56846991476882!3d-6.148737295547633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8c057691ed1%3A0x6b8f3b2dbce78c93!2sKutabumi%2C%20Kec.%20Ps.%20Kemis%2C%20Kabupaten%20Tangerang%2C%20Banten!5e0!3m2!1sid!2sid!4v1718000000000!5m2!1sid!2sid"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-xl shadow-md border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form Konsultasi ── */}
      <FormKonsultasi />

      <Footer />
    </main>
  );
}

/* ── Reusable sub-components ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#0A6E7B", marginBottom: "14px" }}>
      {children}
    </p>
  );
}
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "var(--font-caveat-brush), cursive", fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "0.01em", color: "#1A1A1A", margin: 0 }}>
      {children}
    </h2>
  );
}
function Divider() {
  return <div aria-hidden="true" style={{ width: "48px", height: "2px", backgroundColor: "#D4AF37", marginTop: "20px" }} />;
}
