"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Silakan isi email dan password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal melakukan login.");
      }

      // Simpan data user ke localStorage (sebagai penyimpanan sementara di sisi client)
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login berhasil! Selamat datang kembali.");
      
      // Periksa apakah ada draft konsultasi, arahkan langsung ke form jika ada
      const hasDraft = localStorage.getItem("draft_konsultasi");
      if (hasDraft) {
        router.push("/#form-konsultasi");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-stone-50 p-4 transition-colors duration-300"
      style={{ fontFamily: "var(--font-jakarta), 'Inter', sans-serif" }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        <div className="bg-[#0A6E7B] p-6 text-center flex flex-col items-center">
          <div className="mb-3">
            <Image
              src="/logo.png"
              alt="Logo PT Aqlam"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Masuk ke Akun</h1>
          <p className="text-white/80 text-xs mt-1 uppercase tracking-widest font-semibold">Sistem Informasi PT Aqlam</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-5 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan alamat email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A6E7B] focus:border-[#0A6E7B] outline-none transition-all text-gray-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0A6E7B] focus:border-[#0A6E7B] outline-none transition-all text-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A6E7B] focus:outline-none transition-colors duration-200"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A02B] active:scale-[0.98] text-[#1A1A1A] font-bold py-3 rounded-lg transition-all duration-200 flex justify-center items-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-[#1A1A1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/register" className="text-gray-500 hover:text-[#0A6E7B] transition-colors">
              Belum punya akun? <span className="font-semibold text-[#0A6E7B] hover:underline">Daftar di sini</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
