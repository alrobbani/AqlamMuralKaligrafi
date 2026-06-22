"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Admin Login Page — Premium UI Connected to Supabase Real Data
   Layout   : Centered card, minimalist and professional
   Styling  : Premium dark background, popup white card
   Action   : Real API authentication with Role-Based Access
───────────────────────────────────────────────────────────── */

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !password) {
      setError("Silakan isi email dan password.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal melakukan login.");
      }

      // Simpan session khusus admin / owner hasil validasi Supabase
      localStorage.setItem("admin_session", JSON.stringify(data.user));

      // Alihkan langsung ke dashboard utama staf
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        className="shadow-2xl rounded-2xl"
        style={{
          width: "100%",
          maxWidth: "440px",
          backgroundColor: "#FFFFFF",
          padding: "48px 40px",
        }}
      >
        {/* ── Header Kartu ── */}
        <div style={{ textAlign: "center", marginBottom: "32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="Logo Aqlam"
            width={64}
            height={64}
            style={{ objectFit: "contain", marginBottom: "16px" }}
            priority
          />
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#0A6E7B",
              marginBottom: "12px",
            }}
          >
            Sistem Manajemen
          </p>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "28px",
              fontWeight: 600,
              color: "#1A1A1A",
              margin: "0 0 16px",
              letterSpacing: "-0.5px",
            }}
          >
            Aqlam Mural Kaligrafi
          </h1>
          <div
            aria-hidden="true"
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "#D4AF37",
              margin: "0 auto",
            }}
          />
        </div>

        {/* ── Komponen Alert Error Nyata ── */}
        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 16px",
              backgroundColor: "#FEF2F2",
              color: "#EF4444",
              fontSize: "14px",
              fontFamily: "sans-serif",
              borderRadius: "8px",
              border: "1px solid #FCA5A5",
              textAlign: "center"
            }}
          >
            {error}
          </div>
        )}

        {/* ── Form Login ── */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Input Email */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#1A1A1A",
                marginBottom: "8px",
              }}
            >
              Email Admin
            </label>
            <InputText
              id="email"
              type="email"
              placeholder="admin@aqlam.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                }}
              >
                Password
              </label>
            </div>
            <div style={{ position: "relative" }}>
              <InputText
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: "48px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px"
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <div style={{ marginTop: "8px" }}>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </div>
    </main>
  );
}

/* ── Sub: Reusable Input Component ── */
function InputText({
  id,
  type,
  placeholder,
  value,
  onChange,
  required,
  style,
}: {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  style?: React.CSSProperties;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        height: "52px",
        padding: "0 16px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "15px",
        color: "#1A1A1A",
        backgroundColor: "#FAFAFD",
        border: focused ? "1.5px solid #0A6E7B" : "1.5px solid #E2E2E6",
        borderRadius: "8px",
        outline: "none",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: focused ? "0 0 0 3px rgba(10,110,123,0.1)" : "none",
        boxSizing: "border-box",
        ...style,
      }}
    />
  );
}

/* ── Sub: Reusable Submit Button ── */
function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "54px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "1.2px",
        textTransform: "uppercase",
        color: "#1A1A1A",
        backgroundColor: hovered || isSubmitting ? "#b8961f" : "#D4AF37",
        border: "none",
        borderRadius: "8px",
        cursor: isSubmitting ? "wait" : "pointer",
        boxShadow: hovered && !isSubmitting
          ? "0 6px 20px rgba(212,175,55,0.4)"
          : "0 4px 12px rgba(212,175,55,0.2)",
        transform: hovered && !isSubmitting ? "translateY(-1px)" : "translateY(0)",
        transition: "all 0.25s ease",
        opacity: isSubmitting ? 0.8 : 1,
      }}
    >
      {isSubmitting ? (
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "18px",
              height: "18px",
              border: "2px solid #1A1A1A",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          Memproses...
        </span>
      ) : (
        "Masuk ke Dashboard"
      )}
    </button>
  );
}