export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, whatsapp, tipeProyek, catatan, totalHarga, jumlahDP, statusPembayaran } = body;

    if (!nama || !whatsapp || !tipeProyek) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        nama: String(nama).trim(),
        whatsapp: String(whatsapp).trim(),
        tipeProyek: String(tipeProyek).trim(),
        catatan: catatan ? String(catatan).trim() : null,
        status: "Pending",
        totalHarga: totalHarga ? Number(totalHarga) : 0,
        jumlahDP: jumlahDP ? Number(jumlahDP) : 0,
        statusPembayaran: statusPembayaran ? String(statusPembayaran) : "Belum_Bayar",
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("API_POST_ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error("API_GET_ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
