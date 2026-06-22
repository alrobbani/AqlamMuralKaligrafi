"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, X, Trash2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Admin Dashboard Page — Single Page Application (Interactive)
   Layout   : Sidebar (slate-900) + Main Content (slate-50)
   Features : Dynamic Filtering, Stats, Modal Detail, Add Order
   Data     : Real-time via GET/POST /api/orders (Supabase)
───────────────────────────────────────────────────────────── */

type Status = "Pending" | "In Progress" | "Completed" | "Cancelled";

type StatusPembayaran = "Belum_Bayar" | "DP_Lunas" | "Lunas" | "Batal";

interface OrderData {
  id: number;
  nama: string;
  whatsapp: string;
  tipeProyek: string;
  catatan: string | null;
  status: Status;
  totalHarga: number;
  jumlahDP: number;
  statusPembayaran: StatusPembayaran;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Modal Add Order State
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    nama: "",
    whatsapp: "",
    kategori: "",
    catatan: "",
    statusPembayaran: "Belum_Bayar" as StatusPembayaran,
  });

  // ── FETCH ORDERS FROM API ──
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Gagal mengambil data.");
      const data: OrderData[] = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("fetchOrders error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (!session) {
      router.push("/admin/login");
    } else {
      try {
        const adminData = JSON.parse(session);
        setAdmin(adminData);
        setIsCheckingAuth(false);
      } catch (e) {
        router.push("/admin/login");
      }
    }
  }, [router]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/admin/login");
  };

  const closeModal = () => setSelectedOrder(null);

  // ── STATE-DRIVEN AUTOMATION: Payment → Project Status Mapping ──
  const paymentToStatusMap: Record<StatusPembayaran, Status> = {
    "Belum_Bayar": "Pending",
    "DP_Lunas": "In Progress",
    "Lunas": "Completed",
    "Batal": "Cancelled",
  };

  const handlePaymentStatusChange = async (newPaymentStatus: StatusPembayaran) => {
    if (!selectedOrder) return;
    const derivedStatus = paymentToStatusMap[newPaymentStatus];

    // Optimistic UI update
    const updatedOrder: OrderData = {
      ...selectedOrder,
      statusPembayaran: newPaymentStatus,
      status: derivedStatus,
    };
    setOrders((prev) =>
      prev.map((o) => (o.id === selectedOrder.id ? updatedOrder : o))
    );
    setSelectedOrder(updatedOrder);

    // Persist to API
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          statusPembayaran: newPaymentStatus,
          status: derivedStatus,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal menyimpan.");
      }
    } catch (err) {
      // Revert on failure
      setOrders((prev) =>
        prev.map((o) => (o.id === selectedOrder.id ? selectedOrder : o))
      );
      setSelectedOrder(selectedOrder);
      alert(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan.");
    }
  };

  // ── HARD DELETE: Hapus permanen pesanan ──
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus permanen pesanan ini?"
    );
    if (!confirmed) return;

    // Optimistic UI removal
    const previousOrders = orders;
    setOrders((prev) => prev.filter((o) => o.id !== id));

    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal menghapus.");
      }
    } catch (err) {
      // Revert on failure
      setOrders(previousOrders);
      alert(err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus.");
    }
  };

  const handleAddOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: newOrderData.nama,
          whatsapp: newOrderData.whatsapp,
          tipeProyek: newOrderData.kategori,
          catatan: newOrderData.catatan || null,
          statusPembayaran: newOrderData.statusPembayaran,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal menyimpan.");
      }

      setShowAddModal(false);
      setNewOrderData({ nama: "", whatsapp: "", kategori: "", catatan: "", statusPembayaran: "Belum_Bayar" });
      // Refetch data terbaru dari server
      await fetchOrders();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── FILTER LOGIC ──
  const displayedOrders = orders.filter((order) => {
    if (activeMenu === "Pesanan Baru") {
      return order.status === "Pending";
    } else if (activeMenu === "Riwayat Pesanan") {
      return ["In Progress", "Completed", "Cancelled"].includes(order.status);
    }
    return true; // Dashboard
  });

  const finalDisplayedOrders = activeMenu === "Dashboard" ? displayedOrders.slice(0, 5) : displayedOrders;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${String(d.getDate()).padStart(2, '0')} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  if (isCheckingAuth) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      {/* ── Sidebar (slate-900) ── */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: "32px 24px", borderBottom: "1px solid #1E293B" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px" }}>
            <Image
              src="/logo.png"
              alt="Aqlam Logo"
              width={56}
              height={56}
              style={{ objectFit: "contain" }}
              priority
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  margin: 0,
                  color: "#FFFFFF",
                  letterSpacing: "0.5px",
                }}
              >
                Aqlam Mural Kaligrafi
              </h1>
              <div
                aria-hidden="true"
                style={{
                  width: "32px",
                  height: "2px",
                  backgroundColor: "#D4AF37",
                  marginTop: "8px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "24px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
          {["Dashboard", "Pesanan Baru", "Riwayat Pesanan"].map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveMenu(menu)}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: activeMenu === menu ? 700 : 500,
                color: activeMenu === menu ? "#FFFFFF" : "#94A3B8",
                backgroundColor: activeMenu === menu ? "#1E293B" : "transparent",
                border: "none",
                borderLeft: activeMenu === menu ? "4px solid #D4AF37" : "4px solid transparent",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {menu}
            </button>
          ))}
        </nav>

        {/* Footer Sidebar */}
        <div style={{ padding: "24px", borderTop: "1px solid #1E293B", marginBottom: "40px" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#EF4444",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <LogOut size={18} />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* ── Area Konten Utama ── */}
      <main style={{ flex: 1, padding: "40px", overflowY: "auto", position: "relative" }}>

        <header style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: "28px",
              fontWeight: 600,
              color: "#0F172A",
              margin: "0 0 8px",
            }}
          >
            {activeMenu === "Dashboard" && "Tinjauan Dashboard"}
            {activeMenu === "Pesanan Baru" && "Daftar Pesanan Baru"}
            {activeMenu === "Riwayat Pesanan" && "Riwayat Pesanan Proyek"}
          </h2>
          <p style={{ fontSize: "15px", color: "#64748B", margin: 0 }}>
            {activeMenu === "Dashboard" && "Selamat datang, Admin. Berikut ringkasan performa dan pesanan terbaru."}
            {activeMenu === "Pesanan Baru" && "Menampilkan semua pesanan klien yang masih menunggu respons (Pending)."}
            {activeMenu === "Riwayat Pesanan" && "Menampilkan semua pesanan yang sedang dikerjakan, selesai, atau dibatalkan."}
          </p>
        </header>

        {/* ── Metrik Ringkas (Stats Cards) ── */}
        {activeMenu === "Dashboard" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            <StatCard title="Total Pesanan Masuk" value={orders.length.toString()} label="Sepanjang waktu" accentColor="#0A6E7B" />
            <StatCard title="Pesanan Pending" value={orders.filter((o) => o.status === "Pending").length.toString()} label="Butuh respon segera" accentColor="#EAB308" />
            <StatCard title="Proyek Selesai" value={orders.filter((o) => o.status === "Completed").length.toString()} label="Klien puas dilayani" accentColor="#22C55E" />
          </div>
        )}

        {/* ── Tabel Order Logger ── */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            borderRadius: "8px",
            overflow: "hidden"
          }}
        >
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", margin: 0 }}>
              {activeMenu === "Dashboard" ? "Order Logger Terbaru" : "Daftar Pesanan"}
            </h3>

            {activeMenu === "Dashboard" && (
              <button
                onClick={() => setActiveMenu("Pesanan Baru")}
                style={{ fontSize: "13px", fontWeight: 600, color: "#0A6E7B", backgroundColor: "transparent", border: "none", cursor: "pointer" }}
              >
                Lihat Semua Pending
              </button>
            )}

            {activeMenu === "Pesanan Baru" && (
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0A6E7B",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#085761"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0A6E7B"}
              >
                + Tambah Pesanan Manual
              </button>
            )}
          </div>

          <div style={{ overflowX: "auto" }}>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "48px 24px", color: "#64748B", fontSize: "14px" }}>
                Memuat data dari database...
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                    <Th>ID Pesanan</Th>
                    <Th>Nama Klien</Th>
                    <Th>Tipe Proyek</Th>
                    <Th>Tanggal</Th>
                    <Th>No. WhatsApp</Th>
                    <Th>Pembayaran</Th>
                    <Th>Status</Th>
                    <Th align="right">Aksi</Th>
                  </tr>
                </thead>
                <tbody>
                  {finalDisplayedOrders.length > 0 ? (
                    finalDisplayedOrders.map((order, idx) => (
                      <tr
                        key={order.id}
                        style={{
                          borderBottom: idx === finalDisplayedOrders.length - 1 ? "none" : "1px solid #E2E8F0",
                          transition: "background-color 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F1F5F9")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <Td isBold>#{order.id}</Td>
                        <Td>{order.nama}</Td>
                        <Td>{order.tipeProyek}</Td>
                        <Td>{formatDate(order.createdAt)}</Td>
                        <Td>
                          <a
                            href={`https://wa.me/62${order.whatsapp.replace(/[^0-9]/g, "").slice(1)}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#0A6E7B", textDecoration: "none", fontWeight: 500 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {order.whatsapp}
                          </a>
                        </Td>
                        <Td>
                          <PaymentBadge status={order.statusPembayaran} />
                        </Td>
                        <Td>
                          <StatusBadge status={order.status} />
                        </Td>
                        <Td align="right">
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              style={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#1A1A1A",
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                padding: "6px 12px",
                                cursor: "pointer",
                                borderRadius: "6px",
                                transition: "background-color 0.2s",
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F8FAFC"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FFFFFF"}
                            >
                              Detail
                            </button>
                            {admin?.role === "owner" && (
                              <button
                                onClick={() => handleDelete(order.id)}
                                title="Hapus Permanen"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #FECACA",
                                borderRadius: "6px",
                                cursor: "pointer",
                                color: "#DC2626",
                                transition: "all 0.2s",
                                padding: 0,
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FEE2E2"; e.currentTarget.style.borderColor = "#F87171"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; e.currentTarget.style.borderColor = "#FECACA"; }}
                            >
                              <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", padding: "48px 24px", color: "#64748B", fontSize: "14px" }}>
                        Tidak ada pesanan yang sesuai.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ── Modal Tambah Pesanan Manual ── */}
        {showAddModal && (
          <div
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 9999, padding: "24px", backdropFilter: "blur(4px)",
            }}
            onClick={() => setShowAddModal(false)}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF", borderRadius: "16px", width: "100%",
                maxWidth: "480px", padding: "32px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                position: "relative", animation: "scaleIn 0.2s ease-out",
                maxHeight: "90vh", overflowY: "auto"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  position: "absolute", top: "20px", right: "20px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94A3B8", padding: "4px", display: "flex",
                  alignItems: "center", justifyContent: "center", borderRadius: "50%",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#94A3B8"; }}
              >
                <X size={20} />
              </button>

              <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "24px", fontWeight: 700, margin: "0 0 24px", color: "#0F172A" }}>
                Tambah Pesanan Manual
              </h3>

              <form onSubmit={handleAddOrderSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" }}>Nama Klien</label>
                  <input
                    type="text" required
                    value={newOrderData.nama}
                    onChange={(e) => setNewOrderData({ ...newOrderData, nama: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", boxSizing: "border-box" }}
                    placeholder="Masukkan nama klien..."
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" }}>Nomor WhatsApp</label>
                  <input
                    type="text" required
                    value={newOrderData.whatsapp}
                    onChange={(e) => setNewOrderData({ ...newOrderData, whatsapp: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", boxSizing: "border-box" }}
                    placeholder="Contoh: 0812-3456-7890"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" }}>Tipe Proyek</label>
                  <select
                    value={newOrderData.kategori}
                    onChange={(e) => setNewOrderData({ ...newOrderData, kategori: e.target.value })}
                    required
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", backgroundColor: "#fff", boxSizing: "border-box" }}
                  >
                    <option value="">Pilih tipe proyek Anda...</option>
                    <option value="Kaligrafi Masjid / Kubah">Kaligrafi Masjid / Kubah</option>
                    <option value="Mural Bisnis / Kafe">Mural Bisnis / Kafe</option>
                    <option value="Dekorasi Rumah Pribadi">Dekorasi Rumah Pribadi</option>
                    <option value="Ornamen Islami">Ornamen Islami</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" }}>Catatan Kebutuhan</label>
                  <textarea
                    value={newOrderData.catatan}
                    onChange={(e) => setNewOrderData({ ...newOrderData, catatan: e.target.value })}
                    rows={4}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", resize: "vertical", boxSizing: "border-box" }}
                    placeholder="Tuliskan ukuran dinding, tema, atau permintaan khusus..."
                  />
                </div>

                {/* ── Separator Pembayaran ── */}
                <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "16px", marginTop: "4px" }}>
                  <span style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>Informasi Pembayaran</span>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "8px" }}>Status Pembayaran</label>
                  <select
                    value={newOrderData.statusPembayaran}
                    onChange={(e) => setNewOrderData({ ...newOrderData, statusPembayaran: e.target.value as StatusPembayaran })}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", backgroundColor: "#fff", boxSizing: "border-box" }}
                  >
                    <option value="Belum_Bayar">Belum Bayar</option>
                    <option value="DP_Lunas">DP Lunas</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Batal">Batal / Spam</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    marginTop: "8px", width: "100%", padding: "14px",
                    backgroundColor: isSaving ? "#085761" : "#0A6E7B",
                    color: "#FFFFFF", border: "none", borderRadius: "8px",
                    fontSize: "14px", fontWeight: 700, cursor: isSaving ? "wait" : "pointer",
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    transition: "background-color 0.2s", opacity: isSaving ? 0.8 : 1
                  }}
                  onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.backgroundColor = "#085761"; }}
                  onMouseLeave={(e) => { if (!isSaving) e.currentTarget.style.backgroundColor = "#0A6E7B"; }}
                >
                  {isSaving ? "Menyimpan..." : "Simpan Pesanan"}
                </button>
              </form>
            </div>
            <style>{`@keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
          </div>
        )}

        {/* ── Modal Detail Pesanan ── */}
        {selectedOrder && (
          <div
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 9999, padding: "24px", backdropFilter: "blur(4px)",
            }}
            onClick={closeModal}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF", borderRadius: "16px", width: "100%",
                maxWidth: "480px", padding: "32px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                position: "relative", animation: "scaleIn 0.2s ease-out",
                maxHeight: "90vh", overflowY: "auto"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                style={{
                  position: "absolute", top: "20px", right: "20px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94A3B8", padding: "4px", display: "flex",
                  alignItems: "center", justifyContent: "center", borderRadius: "50%",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#94A3B8"; }}
              >
                <X size={20} />
              </button>

              <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "24px", fontWeight: 700, margin: "0 0 24px", color: "#0F172A" }}>
                Detail Informasi Klien
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>ID Pesanan</span>
                  <span style={{ color: "#0F172A", fontSize: "12px", fontWeight: 600, fontFamily: "monospace" }}>{selectedOrder.id}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Nama Klien</span>
                  <span style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600 }}>{selectedOrder.nama}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Tipe Proyek</span>
                  <span style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600 }}>{selectedOrder.tipeProyek}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Tanggal Masuk</span>
                  <span style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600 }}>{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Nomor WhatsApp</span>
                  <a
                    href={`https://wa.me/62${selectedOrder.whatsapp.replace(/[^0-9]/g, "").slice(1)}`}
                    target="_blank" rel="noreferrer"
                    style={{ color: "#0A6E7B", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
                  >
                    {selectedOrder.whatsapp}
                  </a>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748B", fontSize: "14px" }}>Status Saat Ini</span>
                  <StatusBadge status={selectedOrder.status} />
                </div>
              </div>

              {/* Catatan Kebutuhan Area */}
              <div style={{ backgroundColor: "#F8FAFC", padding: "16px", borderRadius: "8px", marginBottom: "16px", border: "1px solid #E2E8F0" }}>
                <span style={{ display: "block", color: "#64748B", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.5px" }}>
                  Catatan Kebutuhan
                </span>
                <p style={{ margin: 0, color: "#0F172A", fontSize: "14px", lineHeight: 1.6 }}>
                  {selectedOrder.catatan || "—"}
                </p>
              </div>

              {/* Informasi Pembayaran Area */}
              <div style={{ backgroundColor: "#FFFBEB", padding: "16px", borderRadius: "8px", marginBottom: "32px", border: "1px solid #FDE68A" }}>
                <span style={{ display: "block", color: "#92400E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px", letterSpacing: "0.5px" }}>
                  Informasi Pembayaran
                </span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#78716C", fontSize: "13px" }}>Status Pembayaran</span>
                  <PaymentBadge status={selectedOrder.statusPembayaran} />
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "0 0 24px" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A" }}>Ubah Status Pembayaran</label>
                <select
                  value={selectedOrder.statusPembayaran}
                  onChange={(e) => handlePaymentStatusChange(e.target.value as StatusPembayaran)}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: "8px",
                    border: "1px solid #CBD5E1", fontSize: "14px", color: "#0F172A",
                    backgroundColor: "#FFFFFF", outline: "none", cursor: "pointer", transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#0A6E7B"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#CBD5E1"}
                >
                  <option value="Belum_Bayar">Belum Bayar</option>
                  <option value="DP_Lunas">DP Lunas</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Batal">Batal / Spam</option>
                </select>
                <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0" }}>Status proyek akan otomatis menyesuaikan status pembayaran.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

/* ── Sub Components ── */

function StatCard({ title, value, label, accentColor }: { title: string; value: string; label: string; accentColor: string }) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderTop: `4px solid ${accentColor}`, padding: "24px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", borderRadius: "8px" }}>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#64748B", margin: "0 0 12px" }}>{title}</p>
      <p style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: "36px", fontWeight: 700, color: "#0F172A", margin: "0 0 8px", lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: "12px", color: "#94A3B8", margin: 0 }}>{label}</p>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" | "center" }) {
  return (
    <th style={{ textAlign: align, padding: "16px 24px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748B" }}>
      {children}
    </th>
  );
}

function Td({ children, isBold = false, align = "left" }: { children: React.ReactNode; isBold?: boolean; align?: "left" | "right" | "center" }) {
  return (
    <td style={{ textAlign: align, padding: "16px 24px", fontSize: "14px", fontWeight: isBold ? 600 : 400, color: isBold ? "#0F172A" : "#475569" }}>
      {children}
    </td>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, { bg: string; text: string }> = {
    "Pending": { bg: "#FEF9C3", text: "#A16207" },
    "In Progress": { bg: "#DBEAFE", text: "#1D4ED8" },
    "Completed": { bg: "#DCFCE7", text: "#15803D" },
    "Cancelled": { bg: "#FEE2E2", text: "#B91C1C" },
  };
  const s = styles[status] || styles["Pending"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 12px", backgroundColor: s.bg, color: s.text, fontSize: "12px", fontWeight: 700, borderRadius: "20px" }}>
      {status}
    </span>
  );
}

function PaymentBadge({ status }: { status: StatusPembayaran }) {
  const styles: Record<StatusPembayaran, { bg: string; text: string; label: string }> = {
    "Belum_Bayar": { bg: "#FEE2E2", text: "#B91C1C", label: "Belum Bayar" },
    "DP_Lunas": { bg: "#FEF9C3", text: "#A16207", label: "DP Lunas" },
    "Lunas": { bg: "#DCFCE7", text: "#15803D", label: "Lunas" },
    "Batal": { bg: "#F1F5F9", text: "#64748B", label: "Batal / Spam" },
  };
  const s = styles[status] || styles["Belum_Bayar"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "6px 12px", backgroundColor: s.bg, color: s.text, fontSize: "12px", fontWeight: 700, borderRadius: "20px" }}>
      {s.label}
    </span>
  );
}
