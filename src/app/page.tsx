import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSnippet from "@/components/AboutSnippet";
import Layanan from "@/components/Layanan";
import PortfolioGrid from "@/components/PortfolioGrid";
import Testimoni from "@/components/Testimoni";
import FormKonsultasi from "@/components/FormKonsultasi";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

export const metadata = {
  title: "Aqlam Mural Kaligrafi — Jasa Kaligrafi & Mural Dinding Profesional Tangerang",
  description:
    "PT Aqlam Mural Kaligrafi menyediakan jasa kaligrafi masjid, mural dinding kafe, ornamen Islami, dan lukisan kanvas premium berbasis di Pasar Kemis, Kabupaten Tangerang. Konsultasikan kebutuhan dekorasi Anda sekarang.",
};

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#FAFAFD" }}>
      {/* ── 1. Navigasi utama sticky ── */}
      <Navbar />

      {/* ── 2. Hero Section editorial — canvas-light ── */}
      <Hero />

      {/* ── 3. Layanan Unggulan — 4 kategori utama ── */}
      <ScrollReveal>
        <Layanan />
      </ScrollReveal>

      {/* ── 4. Portfolio Grid Preview — 4 karya pilihan, canvas-dark ── */}
      <ScrollReveal>
        <PortfolioGrid />
      </ScrollReveal>

      {/* ── 5. Tentang Kami Sekilas — profil perusahaan ── */}
      <ScrollReveal>
        <AboutSnippet />
      </ScrollReveal>

      {/* ── 5.5. Client Logos Carousel ── */}
      <ScrollReveal>
        <ClientLogos />
      </ScrollReveal>

      {/* ── 6. Testimoni & Logo Klien — canvas-light ── */}
      <ScrollReveal>
        <Testimoni />
      </ScrollReveal>

      {/* ── 7. Form Konsultasi Reusable — canvas-light ── */}
      <ScrollReveal>
        <FormKonsultasi />
      </ScrollReveal>

      {/* ── 8. Footer global — canvas-dark ── */}
      <Footer />
    </main>
  );
}

// --- NEW COMPONENTS ---

const CLIENT_LOGOS = [
  { name: "Masjid Agung", logo: "/images/klien-1.png" },
  { name: "Kafe Kopi", logo: "/images/klien-2.png" },
  { name: "Pemda DKI", logo: "/images/klien-3.png" },
  { name: "Hotel Grand", logo: "/images/klien-4.png" },
  { name: "Pesantren", logo: "/images/klien-5.png" },
  { name: "Restoran Bintang", logo: "/images/klien-6.png" },
  { name: "Klinik Sehat", logo: "/images/klien-7.png" },
  { name: "Bank Syariah", logo: "/images/klien-8.png" },
];

function ClientLogos() {
  return (
    <section className="bg-stone-50" style={{ padding: "64px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontFamily: "var(--font-caveat-brush), cursive", fontSize: "40px", fontWeight: 400, color: "#042f2e", marginBottom: "12px", letterSpacing: "0.01em" }}>
          Klien Percayakan Pada Kami
        </h2>
      </div>

      <style>{`
        .carousel-track {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Gradient overlays for smooth fading edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #fafaf9, transparent)", zIndex: 10 }}></div>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #fafaf9, transparent)", zIndex: 10 }}></div>

        <div className="carousel-track">
          {/* Double the list to make it seamless loop */}
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((klien, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <Image
                src={klien.logo}
                alt={klien.name}
                width={240}
                height={96}
                className="h-24 w-auto object-contain mx-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
