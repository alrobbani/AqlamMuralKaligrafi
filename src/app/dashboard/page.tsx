"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, RefreshCw, Layers, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface OrderData {
  id: number;
  nama: string;
  whatsapp: string;
  tipeProyek: string;
  catatan: string | null;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  totalHarga: number;
  jumlahDP: number;
  statusPembayaran: "Belum_Bayar" | "DP_Lunas" | "Lunas" | "Batal";
  createdAt: string;
}

export default function CustomerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; nama: string; email: string } | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkAuth = useCallback(() => {
    const session = localStorage.getItem("user");
    if (!session) {
      router.push("/login");
    } else {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        router.push("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Gagal memuat status pesanan.");
      const allOrders: OrderData[] = await res.json();
      
      // Filter pesanan yang sesuai dengan nama user (case-insensitive)
      const userOrders = allOrders.filter(
        (order) => order.nama.toLowerCase().trim() === user.nama.toLowerCase().trim()
      );
      setOrders(userOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-session-change"));
    router.push("/");
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Helper untuk badge status proyek
  const renderStatusBadge = (status: OrderData["status"]) => {
    const configs = {
      "Pending": { bg: "#FEF9C3", text: "#713F12", label: "Menunggu" },
      "In Progress": { bg: "#DBEAFE", text: "#1E40AF", label: "Diproses" },
      "Completed": { bg: "#DCFCE7", text: "#166534", label: "Selesai" },
      "Cancelled": { bg: "#FEE2E2", text: "#991B1B", label: "Dibatalkan" },
    };
    const config = configs[status] || configs["Pending"];
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "4px 12px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          backgroundColor: config.bg,
          color: config.text,
        }}
      >
        {config.label}
      </span>
    );
  };

  // Helper untuk badge status pembayaran
  const renderPaymentBadge = (status: OrderData["statusPembayaran"]) => {
    const configs = {
      "Belum_Bayar": { bg: "#FEE2E2", text: "#991B1B", label: "Belum Bayar" },
      "DP_Lunas": { bg: "#FEF9C3", text: "#713F12", label: "DP Lunas" },
      "Lunas": { bg: "#DCFCE7", text: "#166534", label: "Lunas" },
      "Batal": { bg: "#F1F5F9", text: "#475569", label: "Batal" },
    };
    const config = configs[status] || configs["Belum_Bayar"];
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "4px 12px",
          borderRadius: "9999px",
          fontSize: "12px",
          fontWeight: 600,
          backgroundColor: config.bg,
          color: config.text,
        }}
      >
        {config.label}
      </span>
    );
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAFAFD" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#64748B" }}>Memeriksa sesi...</p>
      </div>
    );
  }

  // Hitung statistik ringkas
  const totalProjects = orders.length;
  const inProgressProjects = orders.filter((o) => o.status === "In Progress").length;
  const completedProjects = orders.filter((o) => o.status === "Completed").length;
  const pendingProjects = orders.filter((o) => o.status === "Pending").length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAFD", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      {/* Spacer Navbar */}
      <div style={{ height: "72px" }} />

      {/* Main Content Container */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0F172A", margin: "0 0 8px" }}>
              Status Pesanan Anda
            </h1>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
              Halo <strong style={{ color: "#0A6E7B" }}>{user.nama}</strong>, di sini Anda dapat melacak perkembangan pengerjaan kaligrafi/mural Anda.
            </p>
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={fetchOrders}
              disabled={isRefreshing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              Perbarui
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#EF4444",
                fontSize: "14px",
                fontWeight: 600,
                color: "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <LogOut size={16} />
              Keluar Sesi
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Total Proyek</span>
              <Layers size={20} color="#0A6E7B" />
            </div>
            <span style={{ fontSize: "32px", fontWeight: 700, color: "#0F172A" }}>{totalProjects}</span>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Menunggu Konfirmasi</span>
              <Clock size={20} color="#D4AF37" />
            </div>
            <span style={{ fontSize: "32px", fontWeight: 700, color: "#0F172A" }}>{pendingProjects}</span>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Sedang Diproses</span>
              <RefreshCw size={20} color="#3B82F6" />
            </div>
            <span style={{ fontSize: "32px", fontWeight: 700, color: "#0F172A" }}>{inProgressProjects}</span>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Selesai</span>
              <CheckCircle2 size={20} color="#10B981" />
            </div>
            <span style={{ fontSize: "32px", fontWeight: 700, color: "#0F172A" }}>{completedProjects}</span>
          </div>
        </div>

        {/* Orders Table Section */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #E2E8F0" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#0F172A", margin: 0 }}>Daftar Project Anda</h2>
          </div>

          {isLoading ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#64748B" }}>
              <RefreshCw size={32} className="animate-spin" style={{ margin: "0 auto 16px", color: "#0A6E7B" }} />
              <p>Memuat status proyek...</p>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center" }}>
              <AlertCircle size={48} color="#D4AF37" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0F172A", margin: "0 0 8px" }}>Belum Ada Pesanan Aktif</h3>
              <p style={{ fontSize: "14px", color: "#64748B", margin: "0 0 24px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
                Anda belum mengirim formulir konsultasi atau pesanan Anda belum dicatat oleh admin dengan nama Anda.
              </p>
              <Link
                href="/#form-konsultasi"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#0A6E7B",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                }}
              >
                Mulai Konsultasi Sekarang
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                    <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>ID PROYEK</th>
                    <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>TIPE PROYEK</th>
                    <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>TOTAL HARGA</th>
                    <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>UANG MUKA (DP)</th>
                    <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>STATUS PROSES</th>
                    <th style={{ padding: "16px 24px", fontSize: "13px", fontWeight: 600, color: "#475569" }}>STATUS PEMBAYARAN</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: "1px solid #E2E8F0", transition: "background-color 0.15s" }}>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 600, color: "#0F172A" }}>
                        #AQL-{(1000 + order.id).toString().substring(1)}
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#334155" }}>
                        {order.tipeProyek}
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 500, color: "#0F172A" }}>
                        {order.totalHarga > 0 ? formatRupiah(order.totalHarga) : "Menunggu Estimasi"}
                      </td>
                      <td style={{ padding: "16px 24px", fontSize: "14px", color: "#475569" }}>
                        {order.jumlahDP > 0 ? formatRupiah(order.jumlahDP) : "-"}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        {renderStatusBadge(order.status)}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        {renderPaymentBadge(order.statusPembayaran)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
