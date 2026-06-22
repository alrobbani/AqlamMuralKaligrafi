import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.formKonsultasi.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("GET Orders error:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID dan Status diperlukan" }, { status: 400 });
    }

    const updated = await prisma.formKonsultasi.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PATCH Order error:", error);
    return NextResponse.json({ error: "Gagal mengupdate status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }

    await prisma.formKonsultasi.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Pesanan berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Order error:", error);
    return NextResponse.json({ error: "Gagal menghapus pesanan" }, { status: 500 });
  }
}
