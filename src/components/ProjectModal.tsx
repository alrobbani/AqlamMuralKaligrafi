"use client";

import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   ProjectModal — Shared Lightbox Detail Proyek
   Dipakai oleh PortfolioView (halaman penuh) & PortfolioGrid (beranda)
   Layout  : 2 kolom (md+) / 1 kolom vertikal (mobile)
   Navigasi: Prev/Next arrows + keyboard (Esc, ← →)
   Body    : Scroll lock saat terbuka
───────────────────────────────────────────────────────────── */

/* ── Tipe Data ── */
export interface ProjectForModal {
  judul: string;
  kategori: string;
  lokasi: string;
  image: string;
  klien?: string;
  tahun?: string;
  luas?: string;
  deskripsi?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  projects: ProjectForModal[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/* ── Social Links Data ── */
const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/aqlam_mural?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/6289630430245",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

export default function ProjectModal({
  isOpen,
  projects,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: ProjectModalProps) {
  /* ── Keyboard handler ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  /* ── Guard ── */
  if (!isOpen || selectedIndex === null || !projects[selectedIndex]) return null;

  const proyek = projects[selectedIndex];

  const modalContent = (
    /* ── Overlay ── */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detail proyek: ${proyek.judul}`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "modalFadeIn 0.25s ease-out",
      }}
    >
      {/* ── CSS Animations ── */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* ── Prev Button ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Proyek sebelumnya"
        style={{
          position: "fixed",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 52,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.25)",
          backgroundColor: "rgba(0,0,0,0.50)",
          color: "#FFFFFF",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.backgroundColor = "rgba(212,175,55,0.85)";
          el.style.borderColor = "#D4AF37";
          el.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.backgroundColor = "rgba(0,0,0,0.50)";
          el.style.borderColor = "rgba(255,255,255,0.25)";
          el.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* ── Next Button ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Proyek berikutnya"
        style={{
          position: "fixed",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 52,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.25)",
          backgroundColor: "rgba(0,0,0,0.50)",
          color: "#FFFFFF",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          backdropFilter: "blur(8px)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.backgroundColor = "rgba(212,175,55,0.85)";
          el.style.borderColor = "#D4AF37";
          el.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.backgroundColor = "rgba(0,0,0,0.50)";
          el.style.borderColor = "rgba(255,255,255,0.25)";
          el.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* ── Modal Container ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-container"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "960px",
          maxHeight: "90vh",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.50)",
          animation: "modalSlideUp 0.3s ease-out",
          display: "grid",
        }}
      >
        <style>{`
          .modal-container {
            grid-template-columns: 1fr;
          }
          @media (min-width: 768px) {
            .modal-container {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>

        {/* ── Close Button (X) ── */}
        <button
          onClick={onClose}
          aria-label="Tutup modal"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 55,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "rgba(0,0,0,0.55)",
            color: "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(220,38,38,0.85)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.55)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* ── Kolom Kiri: Foto Proyek ── */}
        <div
          className="modal-image-col bg-stone-100"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <style>{`
            .modal-image-col {
              min-height: 280px;
            }
            @media (min-width: 768px) {
              .modal-image-col {
                min-height: 400px;
              }
            }
          `}</style>
          <Image
            src={proyek.image}
            alt={proyek.judul}
            width={800}
            height={800}
            className="w-full h-full object-contain max-h-[70vh] md:max-h-full"
            sizes="(max-width: 768px) 100vw, 480px"
            priority
          />
          {/* Gradient overlay subtle di bawah foto (mobile) */}
          <div
            aria-hidden="true"
            className="modal-image-gradient"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: "linear-gradient(to top, rgba(255,255,255,0.15), transparent)",
              pointerEvents: "none",
            }}
          />
          {/* Counter indikator */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              backgroundColor: "rgba(0,0,0,0.60)",
              backdropFilter: "blur(6px)",
              borderRadius: "20px",
              padding: "4px 14px",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "0.5px",
            }}
          >
            {selectedIndex + 1} / {projects.length}
          </div>
        </div>

        {/* ── Kolom Kanan: Detail Teks ── */}
        <div
          className="modal-text-col"
          style={{
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <style>{`
            .modal-text-col {
              overflow-y: auto;
              max-height: calc(90vh - 280px);
            }
            @media (min-width: 768px) {
              .modal-text-col {
                max-height: 90vh;
                overflow-y: auto;
              }
            }
          `}</style>

          {/* Kategori Badge */}
          <span
            style={{
              display: "inline-block",
              width: "fit-content",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#0f766e",
              backgroundColor: "rgba(15,118,110,0.08)",
              padding: "5px 14px",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          >
            {proyek.kategori}
          </span>

          {/* Nama Proyek */}
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#042f2e",
              margin: "0 0 12px",
              letterSpacing: "-0.3px",
            }}
          >
            {proyek.judul}
          </h2>

          {/* Lokasi + Pin Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "8px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BFA071" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#BFA071",
              }}
            >
              {proyek.lokasi}
            </span>
          </div>

          {/* Klien */}
          {proyek.klien && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8A8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#64748b",
                }}
              >
                {proyek.klien}
              </span>
            </div>
          )}

          {/* Meta: Tahun & Luas */}
          {(proyek.tahun || proyek.luas) && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {proyek.tahun && (
                <div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: "2px",
                    }}
                  >
                    Tahun
                  </span>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#042f2e",
                    }}
                  >
                    {proyek.tahun}
                  </span>
                </div>
              )}
              {proyek.luas && (
                <div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#9ca3af",
                      marginBottom: "2px",
                    }}
                  >
                    Luas
                  </span>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#042f2e",
                    }}
                  >
                    {proyek.luas}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Deskripsi */}
          {proyek.deskripsi && (
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "#64748b",
                margin: "0 0 24px",
              }}
            >
              {proyek.deskripsi}
            </p>
          )}

          {/* Spacer push Follow Us ke bawah */}
          <div style={{ flex: 1, minHeight: "16px" }} />

          {/* ── Follow Us Section ── */}
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "20px",
            }}
          >
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#9ca3af",
                marginBottom: "12px",
              }}
            >
              Follow Us
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "38px",
                    height: "38px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#64748b",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "#0f766e";
                    el.style.borderColor = "#0f766e";
                    el.style.backgroundColor = "rgba(15,118,110,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color = "#64748b";
                    el.style.borderColor = "#e5e7eb";
                    el.style.backgroundColor = "transparent";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
}
