# De Strip - Museum Detektif 🕵️‍♂️🔍

**De Strip** adalah aplikasi web edukasi interaktif bertema **Museum Detektif** yang dirancang untuk membantu siswa (khususnya tingkat sekolah dasar/menengah) mempelajari materi **Teks Deskripsi** secara menyenangkan dan gamified. 

Siswa bermain sebagai detektif yang menyelesaikan berbagai misi eksplorasi, melakukan refleksi pembelajaran, dan mengikuti evaluasi akhir. Hasil perkembangan dan nilai siswa akan langsung tercatat dan dapat dipantau oleh guru secara real-time.

---

## Fitur Utama

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

##  Teknologi yang Digunakan

*   **Core Framework**: React (Vite)
*   **Styling**: Tailwind CSS & Vanilla CSS
*   **Animasi**: Framer Motion
*   **Ikon**: Lucide React
*   **Database**: Firebase Cloud Firestore
*   **Deploy**: Vercel
