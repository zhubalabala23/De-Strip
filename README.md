# De Strip - Museum Detektif 🕵️‍♂️🔍

**De Strip** adalah aplikasi web edukasi interaktif bertema **Museum Detektif** yang dirancang untuk membantu siswa (khususnya tingkat sekolah dasar/menengah) mempelajari materi **Teks Deskripsi** secara menyenangkan dan gamified. 

Siswa bermain sebagai detektif yang menyelesaikan berbagai misi eksplorasi, melakukan refleksi pembelajaran, dan mengikuti evaluasi akhir. Hasil perkembangan dan nilai siswa akan langsung tercatat dan dapat dipantau oleh guru secara real-time.

---

## 🚀 Fitur Utama

1. **Identitas Detektif**: Halaman pendaftaran kelompok yang dinamis (maksimal 5 siswa per kelompok beserta nomor absen).
2. **Berkas Misi Eksplorasi**: 4 kategori materi pembelajaran teks deskripsi yang dikemas dalam bentuk tantangan menarik:
   - **Lingkungan** 🌳
   - **Flora & Fauna** 🐾
   - **Tokoh Nasional** 👤
   - **Fenomena Alam** 🌪️
3. **Sistem Poin Dinamis**: Penambahan skor otomatis (+20 jika jawaban benar, -10 jika salah).
4. **Refleksi Pembelajaran**: Kuesioner interaktif bagi siswa untuk mengevaluasi pemahaman materi dan perasaan mereka setelah bermain.
5. **Evaluasi Akhir (Misi Terakhir)**: Tantangan penutup untuk menentukan kategori detektif (🏅 *Detektif Hebat*, 🥇 *Master Pembaca*, atau 🥈 *Agen Terampil*).
6. **Integrasi Firebase Firestore**: Sinkronisasi data kelompok, skor, refleksi, dan kategori secara real-time ke database cloud.
7. **Rekap Nilai Guru**: Halaman khusus untuk guru untuk melihat hasil rekap seluruh kelompok, mengekspor data ke format CSV, dan menghapus riwayat data kelompok.

---

## 🛠️ Teknologi yang Digunakan

*   **Core Framework**: React (Vite)
*   **Styling**: Tailwind CSS & Vanilla CSS
*   **Animasi**: Framer Motion
*   **Ikon**: Lucide React
*   **Database**: Firebase Cloud Firestore
*   **Deploy**: Vercel

---

## ⚙️ Cara Menjalankan Proyek secara Lokal

### 1. Prasyarat
Pastikan komputer Anda sudah terinstal [Node.js](https://nodejs.org/).

### 2. Kloning Repositori
```bash
git clone https://github.com/USERNAME_ANDA/nama-repo.git
cd nama-repo
```

### 3. Instal Dependensi
Karena terdapat versi Vite terbaru di proyek ini, gunakan opsi `--legacy-peer-deps` saat menginstal modul:
```bash
npm install --legacy-peer-deps
```

### 4. Konfigurasi Database (Firebase)
Buat berkas baru bernama `.env.local` di folder root (sejajar dengan `package.json`), lalu masukkan kredensial Firebase Anda:
```env
VITE_FIREBASE_API_KEY=api_key_anda
VITE_FIREBASE_AUTH_DOMAIN=auth_domain_anda
VITE_FIREBASE_PROJECT_ID=project_id_anda
VITE_FIREBASE_STORAGE_BUCKET=storage_bucket_anda
VITE_FIREBASE_MESSAGING_SENDER_ID=messaging_sender_id_anda
VITE_FIREBASE_APP_ID=app_id_anda
```

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Akses aplikasi melalui peramban di alamat `http://localhost:5173` (atau port yang tertera pada terminal).

---

## 🌐 Panduan Deployment di Vercel

1. Hubungkan repositori GitHub Anda ke **Vercel**.
2. Di bagian **Environment Variables** pada dashboard proyek Vercel Anda, tambahkan semua variabel yang ada di berkas `.env.local` di atas.
3. Klik **Deploy** dan aplikasi siap diakses secara online dari perangkat mana pun!
