import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Award, 
  GraduationCap, 
  Contact, 
  Building2, 
  Briefcase, 
  Mail, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import AudioToggleButton from '../components/AudioToggleButton';

// Scenery Assets (De Strip Theme)
import museumImg from '../assets/images/museum.webp';
import leftTreeImg from '../assets/images/left_tree.webp';
import rightTreeImg from '../assets/images/right_tree.webp';
import fanImg from '../assets/images/fan.webp';
import characterImg from '../assets/images/charachter.webp';

// Profile Photos
import dosenImg from '../assets/profile/dosen.png';
import mahasiswaImg from '../assets/profile/mahasiswa.png';

export default function ProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('destrip_role');
    if (!role) {
      navigate('/');
    }
  }, [navigate]);

  const profiles = [
    {
      id: 'dosen',
      roleTag: 'Dosen Pembimbing',
      tagColor: 'bg-emerald-500 text-white',
      badgeIcon: Award,
      accentBorder: 'border-emerald-300',
      image: dosenImg,
      altText: 'Foto Dosen Pembimbing',
      name: 'Dr. Sulistyani Puteri Ramadhani, S.Pd., M.Pd.',
      idLabel: 'NIDN',
      idValue: '0329039101',
      prodi: 'PGSD',
      instansi: 'Universitas Trilogi',
      peran: 'Dosen Pembimbing',
      email: 'sulistyani@trilogi.ac.id',
      bio: ''
    },
    {
      id: 'mahasiswa',
      roleTag: 'Pengembang / Peneliti',
      tagColor: 'bg-[#F68026] text-white',
      badgeIcon: GraduationCap,
      accentBorder: 'border-orange-300',
      image: mahasiswaImg,
      altText: 'Foto Mahasiswa Pengembang',
      name: 'Lailia Tajalla',
      idLabel: 'NIM',
      idValue: '22117011',
      prodi: 'PGSD',
      instansi: 'Universitas Trilogi',
      peran: 'Pengembang Media Pembelajaran',
      email: 'lalanana418@gmail.com',
      bio: ''
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden bg-[#e6d0a7] font-sans flex flex-col items-center">
      
      {/* Background System (Sesuai Tema De Strip) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1200px] lg:w-full lg:left-0 lg:translate-x-0 pointer-events-none">
          {/* Museum Background */}
          <div className="absolute bottom-0 left-0 right-0 mx-auto w-[90%] max-w-[1100px] flex justify-center items-end opacity-40">
            <img src={museumImg} alt="Museum" className="w-full h-auto" />
          </div>
          {/* Left Tree */}
          <div className="absolute top-0 bottom-0 left-0 w-[32%] max-w-[450px] opacity-60">
            <img src={leftTreeImg} alt="Left Tree" className="w-full h-full" />
          </div>
          {/* Right Tree */}
          <div className="absolute top-0 bottom-0 right-0 w-[32%] max-w-[450px] opacity-60">
            <img src={rightTreeImg} alt="Right Tree" className="w-full h-full" />
          </div>
        </div>

        {/* Karakter Rubah & Baling-baling (Kiri Bawah) */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          className="absolute -bottom-2 md:-bottom-5 left-[1%] md:left-[2%] lg:left-[4%] w-[26%] md:w-[22%] lg:w-[17%] max-w-[300px] z-30 pointer-events-none hidden xl:block"
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
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-full h-auto relative z-10 origin-bottom" 
          />
        </motion.div>
      </div>

      {/* Konten Halaman */}
      <div className="relative z-10 w-full flex flex-col items-center p-4 sm:p-6 md:p-8">
        
        {/* Header Bar */}
        <div className="w-full max-w-5xl flex items-center justify-between relative mb-6 md:mb-8">
          {/* Tombol Kembali ke Beranda */}
          <button 
            onClick={() => navigate('/landing')}
            className="bg-[#F68026] hover:bg-[#d96a1a] transition-all w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-[#FFD84D] active:scale-95 cursor-pointer z-20 group"
            title="Kembali ke Beranda"
          >
            <ArrowLeft size={28} className="text-[#FFD84D] group-hover:-translate-x-0.5 transition-transform" strokeWidth={3.5} />
          </button>

          {/* Judul Papan Kayu Profil */}
          <motion.div 
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#6B4624] px-6 sm:px-10 md:px-14 py-2.5 sm:py-3.5 rounded-[40px] border-b-[6px] border-[#4A2E1B] shadow-2xl mx-auto"
          >
            <h1 
              className="font-tropika text-xl sm:text-2xl md:text-4xl font-black text-[#FFD84D] tracking-widest text-center uppercase drop-shadow-md flex items-center gap-2" 
              style={{ WebkitTextStroke: '1.5px #4A2E1B' }}
            >
              <span>🕵️‍♂️</span> PROFIL TIM PENGEMBANG
            </h1>
          </motion.div>

          {/* Tombol Suara */}
          <div className="z-20">
            <AudioToggleButton variant="icon" size="md" />
          </div>
        </div>

        {/* Subtitle Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border-2 border-[#FFD84D] shadow-md mb-8 text-center max-w-xl"
        >
          <p className="text-xs sm:text-sm md:text-base font-bold text-[#6B4624]">
            Mengenal tim di balik perancangan dan pengembangan media pembelajaran interaktif <span className="font-extrabold text-[#F68026]">De Strip</span>.
          </p>
        </motion.div>

        {/* Dua Card Profil (Responsive: Stack di Mobile, Side-by-Side di Tablet/Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-5xl mb-16">
          {profiles.map((item, index) => {
            const BadgeIcon = item.badgeIcon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className="bg-white/95 backdrop-blur-md rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border-4 border-[#FFD84D] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Bagian Atas: Foto Pasfoto dengan Badge Peran */}
                  <div className="flex flex-col items-center mb-5">
                    <div className="relative group/photo">
                      {/* Bingkai Foto */}
                      <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.altText}
                          className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Badge Peran Mengambang di Bawah Foto */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-md border-2 border-white ${item.tagColor}`}>
                          <BadgeIcon className="w-3.5 h-3.5" />
                          <span>{item.roleTag}</span>
                        </span>
                      </div>
                    </div>

                    {/* Nama Lengkap & Gelar */}
                    <div className="mt-5 w-full text-center">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug">
                        {item.name}
                      </h2>
                    </div>
                  </div>

                  {/* Garis Pemisah Bergradien */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#FFD84D] to-transparent my-3" />

                  {/* Daftar Rincian Biodata */}
                  <div className="space-y-2.5 sm:space-y-3 my-4">
                    
                    {/* Baris 1: NIDN / NIM */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#FFF9E6] border border-[#FFD84D]/40 hover:bg-[#FFF4D1] transition-colors">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                        <Contact className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{item.idLabel}</span>
                      </div>
                      <span className="font-black text-slate-800 text-xs sm:text-sm">
                        {item.idValue}
                      </span>
                    </div>

                    {/* Baris 2: Program Studi */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#FFF9E6] border border-[#FFD84D]/40 hover:bg-[#FFF4D1] transition-colors">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                        <GraduationCap className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Program Studi</span>
                      </div>
                      <span className="font-black text-slate-800 text-xs sm:text-sm">
                        {item.prodi}
                      </span>
                    </div>

                    {/* Baris 3: Instansi / Kampus */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#FFF9E6] border border-[#FFD84D]/40 hover:bg-[#FFF4D1] transition-colors">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                        <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Instansi / Kampus</span>
                      </div>
                      <span className="font-black text-slate-800 text-xs sm:text-sm">
                        {item.instansi}
                      </span>
                    </div>

                    {/* Baris 4: Peran Proyek */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#FFF9E6] border border-[#FFD84D]/40 hover:bg-[#FFF4D1] transition-colors">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                        <Briefcase className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>Peran Proyek</span>
                      </div>
                      <span className="font-black text-slate-800 text-xs sm:text-sm text-right">
                        {item.peran}
                      </span>
                    </div>

                    {/* Baris 5: Email / Kontak */}
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#FFF9E6] border border-[#FFD84D]/40 hover:bg-[#FFF4D1] transition-colors">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                        <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Email / Kontak</span>
                      </div>
                      <a 
                        href={`mailto:${item.email}`}
                        className="font-black text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate max-w-[180px] sm:max-w-[210px]"
                        title={`Kirim email ke ${item.email}`}
                      >
                        {item.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Kotak Biodata / Catatan Singkat */}
                <div className="mt-4 pt-3 border-t border-dashed border-amber-200">
                  <div className="rounded-2xl bg-slate-50 border border-dashed border-slate-300 p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-bold mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Biodata / Deskripsi Singkat</span>
                    </div>
                    {item.bio ? (
                      <p className="text-slate-700 text-xs leading-relaxed italic">
                        "{item.bio}"
                      </p>
                    ) : (
                      <p className="text-slate-400 text-xs italic">
                        (Biodata singkat belum diisi)
                      </p>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
