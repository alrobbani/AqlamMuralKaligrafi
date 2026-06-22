"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Beranda", path: "/" },
  { name: "Tentang Kami", path: "/about" },
  { name: "Portofolio", path: "/portfolio" },
  { name: "Daftar Harga", path: "/pricelist" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ id: number; nama: string; email: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUserSession();

    // Listen to custom event and storage event to respond instantly to logins/logouts
    window.addEventListener("storage", checkUserSession);
    window.addEventListener("user-session-change", checkUserSession);

    return () => {
      window.removeEventListener("storage", checkUserSession);
      window.removeEventListener("user-session-change", checkUserSession);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full h-[72px] flex items-center transition-all duration-300 ${
        isScrolled ? "bg-[#1A5F62] shadow-md" : "bg-transparent shadow-none"
      }`}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 32px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Logo Brand (Kiri): gambar + teks merek dalam satu flex row ── */}
        <Link
          href="/"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {/* Logo mark: dibatasi ukurannya agar tidak mendominasi */}
          <Image
            src="/logo.png"
            alt="Logo Aqlam Mural Kaligrafi"
            height={36}
            width={36}
            style={{
              objectFit: "contain",
              flexShrink: 0,
            }}
            priority
          />
          {/* Nama merek: serif premium, dua warna berbeda per kata */}
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              lineHeight: 1,
              letterSpacing: "-0.2px",
              display: "flex",
              gap: "6px",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Aqlam</span>
            <span style={{ color: "#D4AF37" }}>Mural</span>
          </span>
        </Link>

        {/* ── Desktop Nav + CTA Button ── */}
        {/* Dikontrol via .navbar-desktop-nav di globals.css */}
        <div className="navbar-desktop-nav" style={{ alignItems: "center", gap: "36px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <NavLink key={link.path} href={link.path} isActive={isActive}>
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* ── Menu Masuk / Dashboard dinamis ── */}
          {user ? (
            <NavLink href="/dashboard" isActive={pathname === "/dashboard"}>
              Halo, {user.nama}
            </NavLink>
          ) : (
            <NavLink href="/login" isActive={pathname === "/login"}>
              Masuk
            </NavLink>
          )}

          {/* ── CTA Button — emas, rounded-xl, hover scale ── */}
          <CTAButton href="https://wa.me/6289630430245" />
        </div>

        {/* ── Burger Button (HANYA Mobile & Tablet, tersembunyi di ≥1024px) ── */}
        <button
          className="navbar-burger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px",
            borderRadius: "6px",
            transition: "background-color 0.2s",
          }}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            width: "100%",
            backgroundColor: "#FAFAFD",
            borderBottom: "1px solid #E2E2E6",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            zIndex: 49,
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", padding: "8px 0" }}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    padding: "15px 24px",
                    fontSize: "16px",
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#0A6E7B" : "#1e293b",
                    backgroundColor: isActive ? "#F3F3F6" : "transparent",
                    borderLeft: isActive ? "3px solid #0A6E7B" : "3px solid transparent",
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                    transition: "all 0.15s ease",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* ── Mobile Menu Masuk / Dashboard dinamis ── */}
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  padding: "15px 24px",
                  fontSize: "16px",
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontWeight: pathname === "/dashboard" ? 600 : 400,
                  color: pathname === "/dashboard" ? "#0A6E7B" : "#1e293b",
                  backgroundColor: pathname === "/dashboard" ? "#F3F3F6" : "transparent",
                  borderLeft: pathname === "/dashboard" ? "3px solid #0A6E7B" : "3px solid transparent",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "all 0.15s ease",
                }}
              >
                Halo, {user.nama}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  padding: "15px 24px",
                  fontSize: "16px",
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontWeight: pathname === "/login" ? 600 : 400,
                  color: pathname === "/login" ? "#0A6E7B" : "#1e293b",
                  backgroundColor: pathname === "/login" ? "#F3F3F6" : "transparent",
                  borderLeft: pathname === "/login" ? "3px solid #0A6E7B" : "3px solid transparent",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: "all 0.15s ease",
                }}
              >
                Masuk
              </Link>
            )}

            <div style={{ padding: "14px 24px" }}>
              <CTAButton href="https://wa.me/6289630430245" fullWidth />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}


/* ──────────────────────────────────────────────
   Sub-komponen NavLink — dengan efek hover & active indicator
────────────────────────────────────────────── */
function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6px 12px",
        fontSize: "15px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontWeight: isActive ? 600 : 500,
        color: isActive ? "#BFA071" : hovered ? "#BFA071" : "#FFFFFF",
        textDecoration: "none",
        letterSpacing: "0.01em",
        transition: "all 0.2s ease",
        borderRadius: "10px",
        backgroundColor: hovered ? "rgba(255,255,255,0.10)" : "transparent",
      }}
    >
      {children}
      {/* Garis bawah indikator aktif */}
      <span
        style={{
          position: "absolute",
          bottom: "4px",
          left: "14px",
          right: "14px",
          height: "2px",
          backgroundColor: "#BFA071",
          borderRadius: "999px",
          opacity: isActive ? 1 : hovered ? 0.4 : 0,
          transform: isActive ? "scaleX(1)" : hovered ? "scaleX(0.8)" : "scaleX(0)",
          transition: "all 0.25s ease",
          transformOrigin: "center",
        }}
      />
    </Link>
  );
}

/* ──────────────────────────────────────────────
   Sub-komponen CTAButton — rounded-xl + hover scale + warna
────────────────────────────────────────────── */
function CTAButton({
  href,
  fullWidth = false,
}: {
  href: string;
  fullWidth?: boolean;
}) {
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
        justifyContent: "center",
        width: fullWidth ? "100%" : "auto",
        height: "44px",
        padding: "0 24px",
        backgroundColor: hovered ? "#b8961f" : "#D4AF37",
        color: "#1A1A1A",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "13px",
        letterSpacing: "1.4px",
        textTransform: "uppercase",
        textDecoration: "none",
        borderRadius: "12px",
        flexShrink: 0,
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? "0 4px 16px rgba(212, 175, 55, 0.45)"
          : "0 2px 6px rgba(212, 175, 55, 0.20)",
        transition: "all 0.25s ease",
      }}
    >
      Hubungi Kami
    </Link>
  );
}
