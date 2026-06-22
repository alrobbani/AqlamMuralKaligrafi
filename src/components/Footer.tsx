"use client";

import React from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Footer Section — component.footer-global (PRD.md §7.A.6)
   Surface : canvas-dark (#0D1117 / slate-900-equivalent)
   Teks    : text-light (#FFFFFF) + text-muted (#8A8A8F)
   Aksen   : brand-teal (#0A6E7B) — untuk hover link nav
   Tipografi: Plus Jakarta Sans (sans) untuk semua elemen termasuk nama brand
   Copyright: © 2026 PT Aqlam Mural Kaligrafi. All rights reserved.
───────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { name: "Beranda", path: "/" },
  { name: "Tentang Kami", path: "/about" },
  { name: "Portofolio", path: "/portfolio" },
  { name: "Daftar Harga", path: "/pricelist" },
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/aqlam_mural?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@aqlam_painting",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6289630430245",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1A5F62",
        borderTop: "1px solid rgba(191, 160, 113, 0.2)",
        color: "#FFFFFF",
      }}
    >
      {/* ── Band Utama Footer ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "64px 32px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "48px",
        }}
      >
        {/* ── Kolom 1: Brand Identity ── */}
        <div>
          {/* Nama Merek */}
          <p
            style={{
              fontFamily:
                "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.2px",
              lineHeight: 1,
              marginBottom: "16px",
              display: "flex",
              gap: "6px",
              alignItems: "baseline",
            }}
          >
            <span style={{ color: "#29D2D0" }}>Aqlam</span>
            <span style={{ color: "#D4AF37" }}>Mural</span>
          </p>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "#e7e5e4",
              maxWidth: "260px",
              marginBottom: "24px",
            }}
          >
            Jasa kaligrafi, mural dinding, dan dekorasi Islami premium berbasis
            di Pasar Kemis, Kabupaten Tangerang.
          </p>

          {/* Sosial Media */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {SOCIAL_LINKS.map((s) => (
              <SocialIcon key={s.name} href={s.href} label={s.name}>
                {s.icon}
              </SocialIcon>
            ))}
          </div>
        </div>

        {/* ── Kolom 2: Navigasi Cepat ── */}
        <div>
          <FooterHeading>Navigasi</FooterHeading>
          <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {NAV_LINKS.map((link) => (
              <FooterNavLink key={link.path} href={link.path}>
                {link.name}
              </FooterNavLink>
            ))}
          </nav>
        </div>

        {/* ── Kolom 3: Alamat & Kontak ── */}
        <div>
          <FooterHeading>Alamat Workshop</FooterHeading>
          <address
            style={{
              fontStyle: "normal",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "14px",
              lineHeight: 1.75,
            }}
          >
            <a
              href="https://maps.app.goo.gl/LufvD2QJCatZnUGy6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e7e5e4] hover:text-[#BFA071] transition-colors"
              style={{ textDecoration: "none" }}
            >
              Jl. Rambutan 5 Jl. Komp. Bumi Asri No.06 Blok D-11, RT.05/RW.18, Kutabumi, Kec. Ps. Kemis, Kabupaten Tangerang, Banten 15560
            </a>
          </address>
          <a
            href="https://wa.me/6289630430245"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "16px",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#29D2D0",
              textDecoration: "none",
              letterSpacing: "0.2px",
              transition: "color 0.2s ease",
            }}
          >
            +62 896-3043-0245
          </a>
        </div>

        {/* ── Kolom 4: SEO Keywords Block (PRD §7.B.3) ── */}
        <div>
          <FooterHeading>Layanan Kami</FooterHeading>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {[
              "Jasa Kaligrafi Masjid Tangerang",
              "Mural Dinding Kafe Profesional",
              "Kaligrafi Kubah Masjid",
              "Lukisan Kanvas Custom",
              "Ornamen Islami Dekoratif",
            ].map((kw) => (
              <li
                key={kw}
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#e7e5e4",
                  lineHeight: 1.5,
                  paddingLeft: "12px",
                  borderLeft: "2px solid rgba(191, 160, 113, 0.4)",
                }}
              >
                {kw}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Hairline pemisah ── */}
      <div
        aria-hidden="true"
        style={{ height: "1px", backgroundColor: "rgba(191, 160, 113, 0.2)", margin: "0 32px" }}
      />

      {/* ── Copyright Bar + Nav linear ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "24px 32px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Hak Cipta */}
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
          }}
        >
          &copy; 2026 PT Aqlam Mural Kaligrafi. All rights reserved.
        </p>

        {/* Navigasi linear kompak */}
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((link, idx) => (
            <React.Fragment key={link.path}>
              <BottomNavLink href={link.path}>{link.name}</BottomNavLink>
              {idx < NAV_LINKS.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    color: "rgba(255, 255, 255, 0.3)",
                    fontSize: "13px",
                    padding: "0 2px",
                    userSelect: "none",
                  }}
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ── Sub-komponen ── */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase" as const,
        color: "#FFFFFF",
        marginBottom: "20px",
      }}
    >
      {children}
    </h3>
  );
}

function FooterNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 400,
        color: "#e7e5e4",
        textDecoration: "none",
        transition: "color 0.2s ease",
        letterSpacing: "0.1px",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "#D4AF37")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "#e7e5e4")
      }
    >
      {children}
    </Link>
  );
}

function BottomNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 400,
        color: "rgba(255, 255, 255, 0.6)",
        textDecoration: "none",
        padding: "4px 8px",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255, 255, 255, 0.6)")
      }
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "0px",
        color: "#e7e5e4",
        transition: "all 0.2s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "#D4AF37";
        el.style.borderColor = "#D4AF37";
        el.style.backgroundColor = "rgba(212, 175, 55, 0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "#e7e5e4";
        el.style.borderColor = "rgba(255, 255, 255, 0.2)";
        el.style.backgroundColor = "transparent";
      }}
    >
      {children}
    </a>
  );
}
