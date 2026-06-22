import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

const hashPassword = (password: string) => {
  return createHash("sha256").update(password).digest("hex");
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const hashedPassword = hashPassword(password);
    
    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Proteksi Role: Hanya untuk Admin dan Owner
    if (user.role === "customer") {
      return NextResponse.json(
        { error: "Akses ditolak! Halaman ini hanya untuk Admin dan Owner." },
        { status: 403 }
      );
    }

    // Lolos: Kembalikan data admin/owner
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
    console.error("Admin Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat login" },
      { status: 500 }
    );
  }
}
