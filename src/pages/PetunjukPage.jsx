import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import museumImg from '../assets/images/museum.webp';
import leftTreeImg from '../assets/images/left_tree.webp';
import rightTreeImg from '../assets/images/right_tree.webp';
import fanImg from '../assets/images/fan.webp';
import characterImg from '../assets/images/charachter.webp';

export default function PetunjukPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-transparent font-sans flex flex-col items-center">
      
      {/* Latar Belakang (Museum, Pohon, Baling-baling) sama seperti Landing Page */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        {/* MUSEUM */}
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-[98%] md:w-[90%] max-w-[1100px] flex justify-center items-end">
          <img src={museumImg} alt="Museum" className="w-full h-auto opacity-50 md:opacity-100" />
        </div>

        {/* LEFT TREE */}
        <div className="absolute top-0 bottom-0 left-0 w-[28%] md:w-[32%] max-w-[450px]">
          <img src={leftTreeImg} alt="Left Tree" className="w-full h-full opacity-80" />
        </div>

        {/* RIGHT TREE */}
        <div className="absolute top-0 bottom-0 right-0 w-[28%] md:w-[32%] max-w-[450px]">
          <img src={rightTreeImg} alt="Right Tree" className="w-full h-full opacity-80" />
        </div>

        {/* CHARACTER & FAN (Kiri) */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="absolute -bottom-2 md:-bottom-5 left-[2%] md:left-[5%] w-[35%] md:w-[25%] lg:w-[20%] max-w-[280px] z-30 pointer-events-none hidden md:block"
        >
          <motion.img
            src={fanImg}
            alt="Fan Blades"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute -top-[40%] left-[-5%] w-[95%] h-auto origin-center -z-10"
          />
          <motion.img 
            src={characterImg} 
            alt="Character" 
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
            className="w-full h-auto relative z-10 origin-bottom" 
          />
        </motion.div>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 w-full h-full flex flex-col items-center p-4 md:p-8">
        
        {/* Header: Tombol Back & Judul */}
        <div className="w-full flex items-center justify-between md:justify-center relative mb-6 md:mb-10">
          
          {/* Tombol Back */}
          <button 
            onClick={() => navigate('/')}
            className="absolute left-0 top-0 md:top-2 bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 z-20"
          >
            <ArrowLeft size={32} className="text-[#FFD84D]" strokeWidth={4} />
          </button>

          {/* Judul Papan Kayu */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#6B4624] px-8 md:px-16 py-3 md:py-4 rounded-[40px] border-b-[6px] border-[#4A2E1B] shadow-xl mx-auto mt-16 md:mt-0"
          >
            <motion.h1 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              className="font-tropika text-3xl md:text-5xl font-black text-[#FFD84D] tracking-widest origin-center" 
              style={{ WebkitTextStroke: '2px #4A2E1B' }}
            >
              PETUNJUK BELAJAR
            </motion.h1>
          </motion.div>
        </div>

        {/* Box Teks Petunjuk */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#F8F9FA]/95 md:bg-white/95 backdrop-blur-sm border-2 border-white/50 w-full max-w-5xl rounded-[30px] p-6 md:p-10 shadow-2xl flex-1 overflow-y-auto mb-10 z-20"
        >
          <ul className="font-canva list-disc list-inside md:list-outside pl-0 md:pl-8 text-center md:text-left space-y-3 md:space-y-4 text-[#2C3E50] font-bold text-sm md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            <li>Halo anak-anak!, Multimedia ini berisi materi teks deskripsi kelas V semester 2. Di sini kamu akan belajar sambil bermain menjadi detektif.</li>
            <li>Bacalah setiap teks deskripsi dengan teliti dan pelan-pelan, yah!.</li>
            <li>Perhatikan kata-kata yang menjelaskan bentuk, warna, ukuran, sifat, dan keadaan suatu objek.</li>
            <li>Pada bagian Ayo Menjadi Detektif, kamu akan mencari petunjuk dari teks yang dibaca.</li>
            <li>Pada bagian Ayo Bereksplorasi, kamu diminta menemukan informasi penting dari teks, seperti ciri-ciri objek yang dijelaskan.</li>
            <li>Pada bagian Ayo Menganalisis, kamu akan menjawab pertanyaan tentang isi teks.</li>
            <li>Pindai (scan) barcode yang tersedia untuk menonton video interaktif yang membantu kamu lebih memahami teks.</li>
            <li>Kerjakan kuis pemahaman dengan jujur dan percaya diri.</li>
            <li>Di bagian akhir, isi refleksi diri.</li>
            <li>Belajarlah dengan semangat dan tetap bekerja sama dengan kelompokmu.</li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
