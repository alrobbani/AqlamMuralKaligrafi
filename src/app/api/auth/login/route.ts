import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

// Menggunakan fungsi hash yang sama dengan saat registrasi
const hashPassword = (password: string) => {
  return createHash("sha256").update(password).digest("hex");
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validasi input dasar
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Cari pengguna berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Verifikasi password (mencocokkan hash)
    // Catatan: Karena pada tahap registrasi kita menggunakan crypto sha256 (bukan bcryptjs), 
    // kita wajib menggunakan metode hash yang sama di sini agar validasi berhasil.
    const hashedPassword = hashPassword(password);
    
    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Jika sukses, kembalikan data user dengan status 200 (tanpa mengirimkan password kembali)
    return NextResponse.json(
      { 
        message: "Login berhasil", 
        user: { 
          id: user.id, 
          nama: user.nama, 
          email: user.email, 
          role: user.role 
        } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat login" },
      { status: 500 }
    );
  }
}
