export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * PATCH /api/orders/[id]
 * Updates an order's statusPembayaran and status fields atomically.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (isNaN(orderId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await req.json();
    const { statusPembayaran, status } = body;

    if (!statusPembayaran || !status) {
      return NextResponse.json(
        { error: "statusPembayaran dan status wajib diisi" },
        { status: 400 }
      );
    }

    // Validate allowed values
    const allowedPayment = ["Belum_Bayar", "DP_Lunas", "Lunas", "Batal"];
    const allowedStatus = ["Pending", "In Progress", "Completed", "Cancelled"];

    if (!allowedPayment.includes(statusPembayaran)) {
      return NextResponse.json(
        { error: `statusPembayaran tidak valid: ${statusPembayaran}` },
        { status: 400 }
      );
    }
    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        { error: `status tidak valid: ${status}` },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        statusPembayaran: String(statusPembayaran),
        status: String(status),
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error: any) {
    console.error("API_PATCH_ERROR:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/orders/[id]
 * Hard-deletes an order permanently from the database.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (isNaN(orderId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json({ message: "Pesanan berhasil dihapus" }, { status: 200 });
  } catch (error: any) {
    console.error("API_DELETE_ERROR:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Error" },
      { status: 500 }
    );
  }
}
