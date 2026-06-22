"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────
   FormKonsultasi — Reusable Consultation Form (PRD §7.A.3 & §7.A.1)
   Surface : canvas-light (#FAFAFD) dengan section header teal
   Target  : DKM Masjid (senior) → label besar, kontras tinggi
   Submit  : POST ke /api/orders (database Supabase)
   Fields  : Nama Lengkap, Nomor WhatsApp, Tipe Proyek, Catatan
───────────────────────────────────────────────────────────── */

type ProyekType = "" | "Kaligrafi Masjid / Kubah" | "Mural Bisnis / Kafe" | "Dekorasi Rumah Pribadi" | "Ornamen Islami";

interface FormState {
  nama: string;
  whatsapp: string;
  proyek: ProyekType;
  catatan: string;
}

export default function FormKonsultasi() {
  const router = useRouter();
  const [showAuthWall, setShowAuthWall] = useState(false);

  const [form, setForm] = useState<FormState>({
    nama: "",
    whatsapp: "",
    proyek: "",
    catatan: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill form jika ada draft & user sudah login
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const draftStr = localStorage.getItem("draft_konsultasi");
    if (userStr && draftStr) {
      try {
        const draft = JSON.parse(draftStr);
        setForm(draft);
      } catch (e) {
        console.error("Gagal parse draft", e);
      }
    }
  }, []);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.nama.trim()) newErrors.nama = "Nama tidak boleh kosong.";
    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp tidak boleh kosong.";
    } else if (!/^[0-9+\-\s]{8,16}$/.test(form.whatsapp.trim())) {
      newErrors.whatsapp = "Format nomor tidak valid (contoh: 0812-3456-7890).";
    }
    if (!form.proyek) newErrors.proyek = "Pilih tipe proyek terlebih dahulu.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // --- Cek Auth Wall ---
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      localStorage.setItem("draft_konsultasi", JSON.stringify(form));
      setShowAuthWall(true);
      return;
    }
    // -----------------------

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama,
          whatsapp: form.whatsapp,
          tipeProyek: form.proyek,
          catatan: form.catatan || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengirim pesanan.");
      }

      // Jika berhasil, hapus draft
      localStorage.removeItem("draft_konsultasi");
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <section
      id="form-konsultasi"
      style={{
        backgroundColor: "#FAFAFD",
        padding: "96px 32px",
        borderTop: "1px solid #E2E2E6",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2
            style={{
              fontFamily: "var(--font-caveat-brush), cursive",
              fontSize: "clamp(34px, 5vw, 52px)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "0.01em",
              color: "#1A1A1A",
              margin: "0 0 16px",
            }}
          >
            Ceritakan Kebutuhan Anda
          </h2>
          <div
            aria-hidden="true"
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "#D4AF37",
              margin: "0 auto 20px",
            }}
          />
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "16px",
              lineHeight: 1.65,
              color: "#4A4A4A",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Isi formulir di bawah — tim kami akan menghubungi Anda via WhatsApp
            untuk mendiskusikan detail proyek dan estimasi biaya.
          </p>
        </div>

        {/* ── Form Box ── */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E2E6",
            padding: "48px 40px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
          }}
        >
          {submitted ? (
            <SuccessState onReset={() => { setSubmitted(false); setForm({ nama: "", whatsapp: "", proyek: "", catatan: "" }); }} />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "24px",
                }}
              >
                {/* Nama Lengkap */}
                <FormField
                  id="nama"
                  label="Nama Lengkap"
                  required
                  error={errors.nama}
                >
                  <TextInput
                    id="nama"
                    name="nama"
                    placeholder="Contoh: Bapak Haji Ahmad"
                    value={form.nama}
                    onChange={handleChange}
                    hasError={!!errors.nama}
                  />
                </FormField>

                {/* Nomor WhatsApp */}
                <FormField
                  id="whatsapp"
                  label="Nomor WhatsApp Aktif"
                  required
                  error={errors.whatsapp}
                >
                  <TextInput
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="Contoh: 0812-3456-7890"
                    value={form.whatsapp}
                    onChange={handleChange}
                    hasError={!!errors.whatsapp}
                    type="tel"
                  />
                </FormField>
              </div>

              {/* Tipe Proyek */}
              <div style={{ marginTop: "24px" }}>
                <FormField
                  id="proyek"
                  label="Tipe Proyek"
                  required
                  error={errors.proyek}
                >
                  <SelectInput
                    id="proyek"
                    name="proyek"
                    value={form.proyek}
                    onChange={handleChange}
                    hasError={!!errors.proyek}
                  />
                </FormField>
              </div>

              {/* Catatan Kebutuhan */}
              <div style={{ marginTop: "24px" }}>
                <FormField
                  id="catatan"
                  label="Catatan Kebutuhan"
                  hint="Opsional — ukuran dinding, tema, referensi gambar, dll."
                >
                  <TextareaInput
                    id="catatan"
                    name="catatan"
                    placeholder="Contoh: Mihrab masjid ukuran 4x3 meter, tema kaligrafi Surah Al-Ikhlas dengan latar biru teal..."
                    value={form.catatan}
                    onChange={handleChange}
                  />
                </FormField>
              </div>

              {/* ── Submit Button ── */}
              <div style={{ marginTop: "36px" }}>
                <SubmitButton isSubmitting={isSubmitting} />
              </div>

              {/* Keterangan privasi */}
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontSize: "13px",
                  color: "#8A8A8F",
                  textAlign: "center",
                  marginTop: "20px",
                  lineHeight: 1.6,
                }}
              >
                Data Anda hanya digunakan untuk keperluan konsultasi proyek.
                Tidak ada spam.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ── Auth Wall Modal ── */}
      {showAuthWall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans backdrop-blur-sm" style={{fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"}}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center transform transition-all">
            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-[#0f4c5c]/10 mb-4 border border-[#0f4c5c]/20">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Langkah Terakhir!</h3>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Untuk mengirimkan detail proyek Anda, silakan masuk atau daftar akun terlebih dahulu. Data form Anda telah otomatis disimpan.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/login")}
                className="w-full inline-flex justify-center items-center rounded-xl border border-transparent bg-[#0f4c5c] px-4 py-3.5 text-base font-medium text-white shadow-sm hover:bg-[#0c3e4b] focus:outline-none transition-all"
              >
                Masuk atau Daftar
              </button>
              <button
                onClick={() => setShowAuthWall(false)}
                className="w-full inline-flex justify-center items-center rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none transition-all"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Sub: FormField wrapper dengan label, hint, dan error ── */
function FormField({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "15px",
          fontWeight: 600,
          color: "#1A1A1A",
          marginBottom: "8px",
          letterSpacing: "0.1px",
        }}
      >
        {label}
        {required && (
          <span
            aria-hidden="true"
            style={{ color: "#D4AF37", marginLeft: "4px" }}
          >
            *
          </span>
        )}
      </label>
      {hint && (
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "13px",
            color: "#8A8A8F",
            margin: "0 0 8px",
          }}
        >
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          role="alert"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: "13px",
            color: "#C0392B",
            marginTop: "6px",
            fontWeight: 500,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Sub: Text Input ── */
function TextInput({
  id,
  name,
  placeholder,
  value,
  onChange,
  hasError,
  type = "text",
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="off"
      style={{
        width: "100%",
        height: "52px",
        padding: "0 16px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "15px",
        color: "#1A1A1A",
        backgroundColor: "#FAFAFD",
        border: hasError
          ? "1.5px solid #C0392B"
          : focused
            ? "1.5px solid #0A6E7B"
            : "1.5px solid #E2E2E6",
        borderRadius: "4px",
        outline: "none",
        transition: "border-color 0.2s ease",
        boxSizing: "border-box",
      }}
    />
  );
}

/* ── Sub: Select / Dropdown ── */
function SelectInput({
  id,
  name,
  value,
  onChange,
  hasError,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        height: "52px",
        padding: "0 16px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "15px",
        color: value ? "#1A1A1A" : "#8A8A8F",
        backgroundColor: "#FAFAFD",
        border: hasError
          ? "1.5px solid #C0392B"
          : focused
            ? "1.5px solid #0A6E7B"
            : "1.5px solid #E2E2E6",
        borderRadius: "4px",
        outline: "none",
        appearance: "none",
        backgroundImage:
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238A8A8F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 16px center",
        paddingRight: "44px",
        transition: "border-color 0.2s ease",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      <option value="" disabled>
        Pilih tipe proyek Anda...
      </option>
      <option value="Kaligrafi Masjid / Kubah">Kaligrafi Masjid / Kubah</option>
      <option value="Mural Bisnis / Kafe">Mural Bisnis / Kafe</option>
      <option value="Dekorasi Rumah Pribadi">Dekorasi Rumah Pribadi</option>
      <option value="Ornamen Islami">Ornamen Islami</option>
    </select>
  );
}

/* ── Sub: Textarea ── */
function TextareaInput({
  id,
  name,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      rows={4}
      style={{
        width: "100%",
        padding: "14px 16px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "15px",
        lineHeight: 1.6,
        color: "#1A1A1A",
        backgroundColor: "#FAFAFD",
        border: focused ? "1.5px solid #0A6E7B" : "1.5px solid #E2E2E6",
        borderRadius: "4px",
        outline: "none",
        resize: "vertical",
        minHeight: "110px",
        transition: "border-color 0.2s ease",
        boxSizing: "border-box",
      }}
    />
  );
}

/* ── Sub: Submit Button ── */
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
        gap: "10px",
        width: "100%",
        height: "58px",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: "15px",
        fontWeight: 700,
        letterSpacing: "1.2px",
        textTransform: "uppercase",
        color: "#1A1A1A",
        backgroundColor: isSubmitting ? "#c9a227" : hovered ? "#b8961f" : "#D4AF37",
        border: "none",
        borderRadius: "12px",
        cursor: isSubmitting ? "wait" : "pointer",
        boxShadow: hovered && !isSubmitting
          ? "0 8px 28px rgba(212,175,55,0.50)"
          : "0 4px 16px rgba(212,175,55,0.28)",
        transform: hovered && !isSubmitting ? "translateY(-2px)" : "translateY(0)",
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
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Mengirim...
        </span>
      ) : (
        "Kirim"
      )}
    </button>
  );
}

/* ── Sub: Success State ── */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "64px",
          height: "64px",
          backgroundColor: "rgba(10,110,123,0.10)",
          borderRadius: "50%",
          marginBottom: "24px",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0A6E7B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "24px",
          fontWeight: 600,
          color: "#1A1A1A",
          margin: "0 0 12px",
        }}
      >
        Pesan Berhasil Terkirim!
      </h3>
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "15px",
          color: "#4A4A4A",
          lineHeight: 1.65,
          margin: "0 0 28px",
        }}
      >
        Terima kasih, konsultasi Anda telah kami terima. Tim kami akan
        menghubungi Anda via WhatsApp dalam waktu dekat.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.5px",
          color: "#0A6E7B",
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        Isi formulir lagi
      </button>
    </div>
  );
}
