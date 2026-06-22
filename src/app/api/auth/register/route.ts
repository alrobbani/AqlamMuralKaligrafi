import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

// Fungsi hash sederhana sebagai alternatif bcryptjs jika package belum terinstall
const hashPassword = (password: string) => {
  return createHash("sha256").update(password).digest("hex");
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, email, password } = body;

    // Validasi dasar
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password tidak boleh kosong" },
        { status: 400 }
      );
    }

    if (!nama) {
      return NextResponse.json(
        { error: "Nama tidak boleh kosong" },
        { status: 400 }
      );
    }

    // Periksa apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password agar tidak tersimpan sebagai plain text
    const hashedPassword = hashPassword(password);

    // Simpan user baru dengan role default "customer"
    const newUser = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        role: "customer",
      },
    });

    return NextResponse.json(
      { message: "Registrasi berhasil", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat registrasi" },
      { status: 500 }
    );
  }
}
