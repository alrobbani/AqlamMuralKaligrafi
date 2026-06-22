\# Product Requirements Document (PRD)

\## Proyek: Pengembangan Website Aqlam Mural Kaligrafi (Fase MVP)



\---



\### 1. Ringkasan Eksekutif \& Latar Belakang

PT Aqlam Mural Kaligrafi adalah sebuah creative agency yang bergerak di bidang usaha jasa seni dekorasi kaligrafi, lukisan kanvas, dan mural dinding profesional berbasis di Pasar Kemis, Kabupaten Tangerang. Proyek ini bertujuan untuk membangun platform digital yang merepresentasikan kualitas karya premium mereka serta menyiasati masalah operasional internal.



\#### Masalah Operasional Saat Ini (As-Is):

\* Pencatatan pesanan, detail survei lokasi, dan negosiasi harga masih dilakukan secara manual dan terfragmentasi (tercecer di chat WhatsApp, catatan Canva, atau galeri HP personal admin).

\* Risiko kehilangan data proyek akibat kerusakan perangkat keras atau chat terhapus sangat tinggi.

\* Belum adanya portofolio terpusat berskala profesional di luar media sosial (Instagram/TikTok) yang mampu meyakinkan klien institusional atau premium secara instan.



\#### Solusi yang Diusulkan (To-Be):

Membangun sebuah website dengan pendekatan Hybrid Multi-Page Layout yang berfungsi ganda: sebagai Alat Pemasaran Digital (Marketing Tool) yang menampilkan galeri estetik berkinerja tinggi, dan sebagai Sistem Manajemen Internal Sederhana (Admin Order Logger) untuk mendigitalisasi operasional harian tanpa beban biaya infrastruktur yang besar.



\---



\### 2. Tujuan Proyek (Project Objectives)

1\. Eksternal (Branding \& Trust Building): Menyediakan portofolio digital berbasis web yang mewah, bersih, dan intuitif guna mengonversi pengunjung menjadi klien potensial.

2\. Internal (Efisiensi Operasional): Menyediakan satu gerbang terpusat bagi admin untuk mendokumentasikan detail klien, status proyek, dokumentasi dinding sebelum dikerjakan, hingga file desain final.

3\. Disiplin MVP (Minimum Viable Product): Membatasi ruang lingkup fitur awal agar sistem cepat dirilis (time-to-market pendek) namun tetap aman dan fungsional tanpa kompleksitas sistem multi-role atau otomatisasi nota yang rumit.



\---



\### 3. Analisis Target Pengguna (User Persona)



Website ini dirancang secara khusus untuk mengakomodasi karakteristik tiga tipe audiens yang sangat kontras:



| Karakteristik / Kelompok | Niat Utama Pengunjung | Solusi UI/UX Website |

| :--- | :--- | :--- |

| \*\*DKM Masjid (Senior, Low-Tech)\*\* | Mencari jasa kaligrafi mihrab/kubah masjid, butuh bukti kredibilitas, dan menginginkan komunikasi yang sangat mudah. | Arsitektur Mobile-First, ukuran font besar \& kontras tinggi, navigasi linear, serta tombol WhatsApp Floating CTA yang sangat mencolok. |

| \*\*Sektor Komersial (Kafe, Restoran, Kantor)\*\* | Mencari mural estetis untuk dekorasi tempat usaha, melek teknologi, dan membutuhkan kejelasan estimasi biaya. | Halaman galeri interaktif dengan fitur filter kategori terstruktur dan halaman Pricelist digital transparan yang mudah dipahami. |

| \*\*Retail Perorangan (B2C)\*\* | Memesan kaligrafi custom berbingkai atau lukisan kanvas untuk dekorasi rumah atau kado pernikahan. | Katalog visual minimalis yang menyajikan pilihan bahan, ukuran, dan fungsionalitas visual yang jernih. |



\---



\### 4. Arsitektur Informasi \& Menu Navigasi (Sitemap)



Sistem dibagi menjadi dua koridor utama: Sisi Publik (Frontend) dan Sisi Internal (Hidden Protected Route).



```mermaid

graph TD

&#x20;   A\[Website Aqlam Mural Kaligrafi] --> B\[Sisi Publik / Frontend]

&#x20;   A --> C\[Sisi Internal / Hidden Protected Route]

&#x20;   

&#x20;   B --> B1\[Beranda / Home]

&#x20;   B --> B2\[Tentang Kami / About Us]

&#x20;   B --> B3\[Portofolio / Galeri Masonry]

&#x20;   B --> B4\[Layanan \& Harga / Pricelist]

&#x20;   

&#x20;   B1 --- F\[Form Konsultasi / Reusable Component]

&#x20;   B4 --- F

&#x20;   

&#x20;   C --> C1\[Halaman Login Admin]

&#x20;   C1 --> C2\[Dashboard Admin / Order Logger]

&#x20;   C2 --> C3\[Form Input Pesanan Baru]

&#x20;   C2 --> C4\[Tabel Riwayat Pencatatan Proyek]

```



\#### Aturan Emas Navigasi (User Experience Integration):

\* \*\*Internal Links (\_self):\*\* Perpindahan antarhalaman publik (misal: klik "Baca Selengkapnya" atau navigasi menu portofolio) wajib membuka di tab browser yang sama agar ekosistem tidak terpecah.

\* \*\*External Links (\_blank):\*\* Tombol aksi yang mengarah ke luar sistem seperti tautan WhatsApp Utama, profil Instagram `aqlam\_mural`, atau TikTok `aqlam\_painting` wajib membuka di tab baru. Hal ini memastikan website Aqlam tetap terbuka di latar belakang browser pengguna.



\---



\### 5. Pemodelan Sistem (Use Case Diagram)



Menjelaskan batasan sistem (system boundary) dan hak akses yang dimiliki oleh masing-masing aktor.



```mermaid

graph LR

&#x20;   subgraph Aktor

&#x20;       User((Pengunjung Publik))

&#x20;       Admin((Admin Aqlam))

&#x20;   end



&#x20;   subgraph Sistem Website Aqlam

&#x20;       UC1(Melihat Informasi Jasa \& Pricelist)

&#x20;       UC2(Melakukan Filter Galeri Portofolio)

&#x20;       UC3(Melihat Detail Karya via Lightbox)

&#x20;       UC4(Mengklik Hubungi via WhatsApp)

&#x20;       UC5(Mengisi Form Konsultasi Opsional)

&#x20;       

&#x20;       UC\_Login(Melakukan Login Admin)

&#x20;       UC6(Mengakses Dashboard Order Logger)

&#x20;       UC7(Mencatat / Input Data Pesanan Baru)

&#x20;       UC8(Melihat Riwayat Proyek Internal)

&#x20;   end



&#x20;   User --> UC1

&#x20;   User --> UC2

&#x20;   User --> UC3

&#x20;   User --> UC4

&#x20;   User --> UC5



&#x20;   Admin --> UC\_Login

&#x20;   Admin --> UC6

&#x20;   Admin --> UC7

&#x20;   Admin --> UC8

```



\---



\### 6. Aturan Pengalaman Pengguna \& Fungsi Interaksi (UX Guidelines)



Seksi ini mengunci fungsionalitas dan logika interaksi aplikasi. Seluruh aturan nilai estetika, token warna resmi, spesifikasi font, dan komponen visual wajib merujuk secara mutlak pada file `DESIGN.md`.



\* \*\*Logika Hybrid Mode (Contextual Surfaces):\*\*

&#x20; \* \*Mode A (Warm Editorial):\* Diaplikasikan pada halaman informasi statis (Beranda, Tentang Kami, Kontak). Fokus pada kebersihan ruang kosong (\*whitespace\*), tingkat keterbacaan tinggi bagi user senior, dan struktur layout ala majalah interior.

&#x20; \* \*Mode B (Dark Art Gallery):\* Diaplikasikan otomatis ketika pengguna masuk ke seksi Portofolio/Galeri Karya atau membuka detail proyek. Seluruh latar belakang berubah menjadi kegelapan mutlak untuk memfokuskan mata user pada objek foto.

\* \*\*Layouting Galeri (Preserved Aspect Ratio):\*\*

&#x20; \* Foto-foto di halaman portofolio wajib disusun menggunakan format \*\*Masonry Grid (Asimetris)\*\* sesuai ukuran aspek rasio asli file gambar (vertikal/horizontal dibiarkan alami). Dilarang keras melakukan pemotongan (\*cropping\*) paksa pada aset gambar karya seni dinding yang panjang atau kubah masjid yang melingkar.

\* \*\*Aturan Responsivitas Mobile (Mobile-First Interface Logic):\*\*

&#x20; \* Dilarang menaruh informasi teks atau memicu aksi fungsional penting di dalam fungsi \*Hover\* pada tampilan Mobile/Tablet. Seluruh foto di galeri mobile dibiarkan bersih total tanpa distraksi teks overlay.

&#x20; \* Ketika foto portofolio di-tap (1x klik biasa), sistem wajib memicu \*Split-Window Lightbox Modal\*.

&#x20; \* \*Struktur Lightbox (Desktop):\* Foto resolusi tinggi tampil di sisi kiri (full-bleed), sedangkan metadata teknis (Nama Proyek, Lokasi, dan Jenis Bahan) tampil di panel informasi sisi kanan secara asimetris.

&#x20; \* \*Struktur Lightbox (Mobile):\* Panel informasi metadata otomatis bergeser secara responsif ke bagian bawah foto agar nyaman dibaca saat di-scroll vertikal.



\---



\### 7. Spesifikasi Kebutuhan Sistem



\#### A. Kebutuhan Fungsional (Functional Requirements)

1\. \*\*Homepage Rangkuman:\*\* Menampilkan Hero Section visual dengan tipografi asimetris yang kuat, deskripsi singkat About Us, 4 Blok Kategori Utama (Mural Dinding, Kaligrafi Masjid, Dekorasi \& Ornamen Islami, Kaligrafi Bingkai), 3-4 contoh portofolio terbaik, Testimoni slider, dan Footer global.

2\. \*\*Filter Galeri Portofolio:\*\* Pengunjung dapat menyaring foto berdasarkan kategori melalui tombol filter dinamis tanpa perlu memuat ulang seluruh halaman (\*client-side filtering\*).

3\. \*\*Formulir Konsultasi Reusable:\*\* Sebuah komponen formulir mandiri yang diletakkan di bawah halaman Beranda dan halaman Pricelist. Formulir ini memuat input data: Nama, Nomor WhatsApp, Lokasi Proyek, Jenis Layanan, dan tombol upload foto dinding kondisi awal.

4\. \*\*Gerbang Login Admin Sederhana:\*\* Proteksi halaman `/admin` dengan sistem autentikasi sekali lewat (\*Single Account Credentials\*).

5\. \*\*Dashboard Order Logger:\*\* Menu internal bagi tim Aqlam untuk mencatat pesanan yang didapatkan secara langsung dari lapangan. Formulir internal ini melingkupi input data teknis: Nama Klien, Kontak WA, Alamat, Luas Dinding (m²), Upload Foto Dinding Asli, Upload Gambar Desain Jadi, Status Proyek (Pending, On Progress, Completed), dan Total Harga Kesepakatan.

6\. \*\*Footer Global:\*\* Elemen penutup di seluruh halaman yang memuat identitas logo, Teks alamat fisik workshop di Pasar Kemis Tangerang, link sosial media eksternal, serta sematan Google Maps ukuran ringkas untuk mendongkrak kredibilitas bisnis fisik.



\#### B. Kebutuhan Non-Fungsional (Non-Functional Requirements)

1\. \*\*Kecepatan Pemuatan (Performance):\*\* Halaman galeri masonry harus dapat dimuat di bawah 3 detik pada jaringan seluler standar.

2\. \*\*Optimalisasi Media:\*\* Seluruh file gambar/foto yang diunggah oleh admin melalui dashboard wajib melalui proses kompresi otomatis di sisi client sebelum disimpan (mengubah ukuran file dari megabyte menjadi maksimal \~300-400 KB per foto tanpa merusak ketajaman visual).

3\. \*\*Optimasi SEO:\*\* Menyediakan kolom deskripsi statis yang kaya akan kata kunci (\*keywords\*) seperti "Jasa Kaligrafi Masjid Tangerang", "Mural Dinding Kafe Profesional" di bagian footer untuk membantu peringkat keterbacaan mesin pencari.



\---



\### 8. Cetak Biru Teknologi (Tech Stack Blueprint)

Rangkaian teknologi ini dipilih karena ekosistemnya sangat terstruktur, andal, kompatibel penuh dengan perintah AI, serta sangat ringan dijalankan di laptop lokal tanpa memerlukan instalasi database lokal yang berat.



\* \*\*Framework Utama:\*\* Next.js (App Router terintegrasi secara penuh).

\* \*\*Bahasa Pemrograman:\*\* TypeScript (Wajib digunakan sebagai satpam pengetikan kode guna mendeteksi typo atau ketidakkonsistenan logika dari hasil AI secara real-time sebelum runtime).

\* \*\*Utilitas Desain \& UI:\*\* Tailwind CSS dikombinasikan dengan shadcn/ui (sebagai library komponen dasar seperti dialog modal lightbox, form, dan slider testimoni agar proses coding efisien).

\* \*\*Database Engine:\*\* PostgreSQL yang di-host di layanan Cloud Serverless Supabase (Free Tier).

\* \*\*Alat Penghubung Database (ORM):\*\* Prisma ORM (Terpilih karena struktur file `schema.prisma` yang berbasis deklarasi teks bersih sangat mudah dipahami dan dimanipulasi secara akurat oleh AI).

\* \*\*Penyimpanan Berkas (Cloud Storage):\*\* Supabase Storage Bucket (Khusus menyimpan foto portofolio dinamis dan foto dokumentasi proyek internal. Folder proyek lokal Next.js `/public` hanya digunakan untuk menyimpan aset statis seperti logo resmi dan icon bawaan sistem).



\---



\### 9. Perancangan Database (Prisma Schema Model)



Berikut adalah struktur pemodelan basis data relasional yang wajib diimplementasikan pada file `schema.prisma`:



```prisma

datasource db {

&#x20; provider = "postgresql"

&#x20; url      = env("DATABASE\_URL")

}



generator client {

&#x20; provider = "prisma-client-js"

}



/// Model untuk menyimpan data karya seni yang dipajang di Galeri Publik

model Portfolio {

&#x20; id          String   @id @default(uuid())

&#x20; title       String   // Contoh: "Mural 3D Cafe Tepian"

&#x20; category    String   // MURAL\_DINDING, KALIGRAFI\_MASJID, ORNAMEN\_ISLAMI, KALIGRAFI\_BINGKAI

&#x20; location    String   // Contoh: "Pasar Kemis, Tangerang"

&#x20; material    String   // Contoh: "Bahan Cat Acrylic / Spon Eva"

&#x20; imageUrl    String   // URL berkas foto yang tersimpan di Supabase Storage Bucket

&#x20; createdAt   DateTime @default(now())

}



/// Model multifungsi untuk pencatatan pesanan internal admin \& penampung formulir konsultasi pelanggan

model Order {

&#x20; id            String   @id @default(uuid())

&#x20; customerName  String   // Nama lengkap pelanggan atau penanggung jawab DKM

&#x20; whatsapp      String   // Nomor WhatsApp aktif untuk koordinasi

&#x20; location      String   // Alamat lengkap lokasi proyek / gedung masjid

&#x20; serviceType   String   // Kategori layanan yang dipesan

&#x20; sizeSqM       Float?   // Luas volume dinding dalam satuan meter persegi (opsional di awal)

&#x20; photoUrl      String?  // URL foto dinding kondisi awal/survei lapangan (opsional)

&#x20; designUrl     String?  // URL file mockup desain final yang disetujui (opsional)

&#x20; status        String   // PENDING (Form web), ON\_PROGRESS (Proses pengerjaan), COMPLETED (Selesai)

&#x20; totalPrice    Int?     // Nilai total kontrak harga kesepakatan final (opsional di awal)

&#x20; createdAt     DateTime @default(now())

}

```



\---



\### 10. Strategi Keamanan \& Batasan Proyek (MVP Boundaries)



\#### Aturan Keamanan Minimalis (Lightweight Auth):

\* Sistem tidak membutuhkan tabel database khusus untuk manajemen pengguna (`users`), fitur pendaftaran akun baru (`register`), ataupun mekanisme pemulihan sandi (`forgot password`).

\* Informasi kredensial berupa 1 Username dan 1 Password tunggal tim Aqlam disimpan secara rahasia di dalam file konfigurasi lingkungan server (`.env`).

\* Proses login mencocokkan input teks secara langsung ke nilai variabel `.env`. Perlindungan halaman dashboard wajib menggunakan komponen Next.js Middleware sebagai sekat pelindung rute `/admin/\*` agar tidak dapat di-scan atau diakses tanpa token sesi yang valid.



\#### Larangan Ruang Lingkup (Mencegah Scope Creep):

Untuk memastikan proyek ini dapat diselesaikan secara fokus tanpa mengalami pembengkakan waktu kerja, fitur-fitur berikut \*\*DILARANG\*\* dimasukkan ke dalam Fase 1 (MVP):

1\. Sistem login multi-role untuk karyawan lapangan.

2\. Fitur pengiriman nota atau kuitansi pembayaran otomatis terintegrasi ke WhatsApp API.

3\. Pembuatan modul grafik omzet, analisis keuangan bulanan, atau kalkulator profit otomatis di dalam dashboard admin.

4\. Pembayaran langsung di website (Payment Gateway integration). Semua transaksi keuangan tetap berjalan secara tradisional via transfer bank manual di luar sistem.



\---



\### 11. Panduan Khusus Vibe Coding (Instructions for AI Tools)



Saat Anda meluncurkan sesi koding dibantu kecerdasan buatan, berikan file ini bersama dengan `DESIGN.md` ke AI dan wajibkan AI mematuhi instruksi khusus di bawah ini:



\* \*\*Strict Design System Adherence:\*\* Wajibkan AI membaca token visual, variabel CSS warna resmi (Teal, Turquoise, Gold), jenis tipografi Serif/Sans, dan properti sudut tajam (`rounded-none`) dari file `DESIGN.md`. Jangan biarkan AI menciptakan kelas utilitas Tailwind baru di luar panduan visual tersebut.

\* \*\*DO:\*\* Manfaatkan kekuatan TypeScript secara maksimal. Perintahkan AI untuk selalu mendeklarasikan tipe data parameter secara eksplisit pada setiap fungsi backend Prisma ataupun fungsi frontend Next.js agar editor koding langsung memunculkan garis bawah merah jika terjadi ketidakcocokan data sebelum program dijalankan.

\* \*\*DO:\*\* Instruksikan AI untuk memanfaatkan prinsip \*Reusable Components\* ketika membangun komponen `FormKonsultasi` agar file logika form tersebut dapat dipanggil di dua tempat (halaman home dan pricelist) secara bersih menggunakan satu penanganan fungsi pengiriman data yang sama menuju database.

\* \*\*DO:\*\* Minta AI membuat fungsi kompresi gambar di sisi klien pada modul upload file formulir agar ukuran berkas yang terkirim ke Supabase Storage stabil di ukuran kecil.

\* \*\*DON'T:\*\* Melayani atau menambahkan fungsionalitas sistem baru di luar batasan skema model database Prisma yang sudah dikunci di atas. Jika AI menyarankan pembuatan tabel baru, tolak saran tersebut demi menjaga kesederhanaan MVP.

\* \*\*DON'T:\*\* Menulis kode CSS murni atau melakukan manipulasi DOM secara manual. Seluruh urusan tata letak dan interaktivitas transisi animasi wajib diserahkan kepada utilitas kelas Tailwind CSS dan arsitektur komponen bawaan shadcn/ui dengan kustomisasi penuh.

```

