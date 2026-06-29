import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Menu, X, LogOut } from 'lucide-react';

// Core assets
import museumImg from '../assets/images/museum.webp';
import leftTreeImg from '../assets/images/left_tree.webp';
import rightTreeImg from '../assets/images/right_tree.webp';
import characterImg from '../assets/images/charachter.webp';
import boardTitleImg from '../assets/images/board_title_top.webp';
import buttonPlayImg from '../assets/images/button_play.webp';
import fanImg from '../assets/images/fan.webp';
import backgroundSkyImg from '../assets/images/background.webp';

// Menu Icons
import quizIcon from '../assets/images/icon_menu/quiz.webp';
import refleksiIcon from '../assets/images/icon_menu/refleksi.webp';
import evaluasiIcon from '../assets/images/icon_menu/evaluasi.webp';
import petunjukIcon from '../assets/images/icon_menu/petunjuk.webp';

// New layer assets
import secondLeftTreeImg from '../assets/images/second_left-tree.webp';
import secondRightTreeImg from '../assets/images/second_right-tree.webp';
import centerTreeImg from '../assets/images/center_tree.webp';
import chairsImg from '../assets/images/chairs.webp';
import lightParkImg from '../assets/images/light_park.webp';

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = localStorage.getItem('destrip_role');

  useEffect(() => {
    if (!role) {
      navigate('/');
    }
  }, [role, navigate]);

  const menuItems = [
    { title: "PETUNJUK BELAJAR", path: "/petunjuk", icon: petunjukIcon },
    { title: "KUIZ PEMAHAMAN", path: "/group-setup", icon: quizIcon },
    { title: "EVALUASI AKHIR", path: "/evaluasi", icon: evaluasiIcon },
    { title: "AYO REFLEKSI", path: "/refleksi", icon: refleksiIcon },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-transparent font-sans selection:bg-yellow-300 flex items-center justify-center">
      
      {/* Tombol Rekap Guru */}
      {role === 'guru' && (
        <button 
          onClick={() => navigate('/teacher-recap')}
          className="absolute top-4 left-4 z-[100] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-black/20 hover:bg-[#F68026] hover:text-[#FFD84D] text-white backdrop-blur-sm rounded-full cursor-pointer transition-all border-4 border-white/40 hover:border-[#FFD84D] shadow-lg"
          title="Rekap Nilai Guru"
        >
          <ClipboardList size={24} />
        </button>
      )}

      {/* Tombol Keluar (LogOut) */}
      <button 
        onClick={() => {
          const message = role === 'guru' 
            ? "Apakah Anda yakin untuk keluar?" 
            : "Apakah kamu yakin untuk keluar dari permainan?";
          if (window.confirm(message)) {
            localStorage.removeItem('destrip_role');
            navigate('/');
          }
        }}
        className={`absolute top-4 z-[100] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-red-600/90 text-white hover:bg-red-700 rounded-full cursor-pointer transition-all border-4 border-white/40 shadow-lg ${role === 'guru' ? 'left-20 md:left-24' : 'left-4'}`}
        title="Keluar / Logout"
      >
        <LogOut size={24} />
      </button>
      
      {/* Tombol Hamburger Menu */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 right-4 z-[100] w-12 h-12 md:w-16 md:h-16 flex md:hidden items-center justify-center bg-[#F68026] text-[#FFD84D] hover:bg-[#d96a1a] rounded-full shadow-lg border-4 border-[#FFD84D] active:scale-95 transition-all cursor-pointer"
        title="Menu"
      >
        {menuOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
      </button>
      

      {/* Unified Background Wrapper to preserve desktop proportions and crop on mobile */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1200px] lg:w-full lg:left-0 lg:translate-x-0 pointer-events-none z-10 overflow-hidden">
        {/* Main Background Sky/Grass */}
        <div className="absolute inset-0 -z-20">
          <img src={backgroundSkyImg} alt="Background Sky" className="w-full h-full" />
        </div>
        
        {/* LAYER 2: SECOND LEFT TREE & SECOND RIGHT TREE */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ zIndex: 10 }}
          className="absolute bottom-0 left-0 w-[35%] md:w-[38%] max-w-[500px] pointer-events-none"
        >
          <img src={secondLeftTreeImg} alt="Second Left Tree" className="w-full h-auto" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ zIndex: 10 }}
          className="absolute bottom-0 right-0 w-[35%] md:w-[38%] max-w-[500px] pointer-events-none"
        >
          <img src={secondRightTreeImg} alt="Second Right Tree" className="w-full h-auto" />
        </motion.div>

        {/* LAYER 3: MUSEUM & PLAY BUTTON */}
        <div 
          style={{ zIndex: 15 }}
          className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[76%] md:w-[62%] max-w-[780px] pointer-events-none flex justify-center items-end"
        >
          <div className="relative w-full h-auto flex justify-center items-end">
            {/* CENTER TREE (Di belakang museum) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-[-70%] left-0 w-full -z-10"
            >
              <img src={centerTreeImg} alt="Center Tree" className="w-full h-auto" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-auto"
            >
              <motion.img 
                src={museumImg} 
                alt="Museum" 
                animate={{ scale: [1, 1.02, 1.01, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                className="w-full h-auto drop-shadow-2xl origin-bottom" 
              />
            </motion.div>

            {/* PLAY BUTTON (Di atas museum) */}
            <div 
              style={{ zIndex: 35 }}
              className="absolute bottom-[29%] left-1/2 -translate-x-1/2 w-[44%] max-w-[260px] flex justify-center items-center pointer-events-auto"
            >
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
                onClick={() => navigate('/group-setup')}
                className="w-full cursor-pointer outline-none group"
              >
                <motion.img 
                  src={buttonPlayImg} 
                  alt="Play Button" 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-auto group-hover:scale-110 group-hover:brightness-110 group-active:scale-95 transition-all drop-shadow-lg" 
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* LAYER 4: LEFT TREE & RIGHT TREE (Foreground samping) */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ zIndex: 12 }}
          className="absolute top-0 bottom-0 left-0 w-[28%] md:w-[32%] max-w-[420px] pointer-events-none"
        >
          <img src={leftTreeImg} alt="Left Tree" className="w-full h-full" />
        </motion.div>
        
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ zIndex: 12 }}
          className="absolute top-0 bottom-0 right-0 w-[28%] md:w-[32%] max-w-[420px] pointer-events-none"
        >
          <img src={rightTreeImg} alt="Right Tree" className="w-full h-full" />
        </motion.div>

        {/* LAYER 5: STREET LAMP (Kiri depan) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ zIndex: 25 }}
          className="absolute bottom-[2%] left-0 md:left-[2%] w-[18%] md:w-[13%] max-w-[150px] pointer-events-none"
        >
          <motion.img 
            src={lightParkImg} 
            alt="Street Lamp" 
            animate={{ scale: [1, 1.05, 1.01, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-full h-auto origin-bottom" 
          />
        </motion.div>

        {/* LAYER 6: BENCH CHAIRS (Kanan depan) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ zIndex: 25 }}
          className="absolute bottom-[5%] right-[7%] md:right-[11%] w-[25%] md:w-[18%] max-w-[200px] pointer-events-none"
        >
          <img src={chairsImg} alt="Chairs/Bench" className="w-full h-auto" />
        </motion.div>

        {/* LAYER 7: CHARACTER (RUBAH DETEKTIF) & BALING-BALING */}
        <motion.div
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          style={{ zIndex: 30 }}
          className="absolute bottom-0 left-[12%] md:left-[16%] w-[36%] md:w-[30%] lg:w-[24%] max-w-[300px] pointer-events-none"
        >
          {/* Baling-baling (Fan Blades) */}
          <motion.img
            src={fanImg}
            alt="Fan Blades"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute -top-[35%] left-[-10%] w-[105%] h-auto origin-center -z-10"
          />
          {/* Karakter Rubah */}
          <motion.img 
            src={characterImg} 
            alt="Character" 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-full h-auto relative z-10 origin-bottom" 
          />
        </motion.div>

        {/* LAYER 8: BOARD TITLE TOP */}
        <div 
          style={{ zIndex: 40 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] md:w-[48%] max-w-[580px] pointer-events-none"
        >
          <motion.div
            initial={{ y: -150 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
            className="w-full h-auto"
          >
            <img src={boardTitleImg} alt="Board Title" className="w-full h-auto drop-shadow-xl" />
          </motion.div>
        </div>

      </div>

      {/* Tombol Play dipindahkan ke dalam container museum agar posisi dan skalanya selalu sinkron dan presisi */}

      {/* LAYER 10: MENU SAMPING KANAN (Desktop Only - Wood Signposts) */}
      <motion.div 
        initial={{ x: 250, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ zIndex: 45 }}
        className="absolute right-0 top-[20%] sm:top-[22%] md:top-[25%] lg:top-[28%] hidden md:flex flex-col items-end gap-3 sm:gap-4 md:gap-5 w-max pr-0"
      >
        {menuItems.map((item, index) => (
          <motion.button 
            key={index}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: index * 0.15, ease: "easeInOut" }}
            onClick={() => navigate(item.path)}
            className="group relative w-32 sm:w-36 md:w-44 lg:w-52 h-9 sm:h-11 md:h-14 lg:h-16 flex justify-end cursor-pointer transform hover:-translate-x-2 transition-transform active:scale-95 duration-200"
          >
            {/* Outline Papan Kayu */}
            <div className="bg-[#4A2E1B] w-full h-full clip-path-arrow p-[2px] md:p-[3px] drop-shadow-lg">
              {/* Isi Papan Kayu dengan Gradient - ditambahkan padding-left 18% untuk menyeimbangkan tip panah */}
              <div className="bg-gradient-to-r from-[#9c6a3c] to-[#6E421F] w-full h-full clip-path-arrow relative flex items-center justify-center pl-[18%]">
                {/* Efek Kilau Kayu */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                
                {/* Icon yang di-center pada bagian papan */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center">
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-200" 
                  />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Mobile Hamburger Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[80]"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#6B4624] border-l-8 border-[#4A2E1B] p-6 pt-24 z-[90] shadow-2xl flex flex-col gap-6"
            >
              <div className="text-center font-tropika text-2xl text-[#FFD84D] tracking-widest mb-4" style={{ WebkitTextStroke: '1px #4A2E1B' }}>
                MENU UTAMA
              </div>
              
              <div className="flex flex-col gap-4">
                {menuItems.map((item, index) => (
                  <motion.button 
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(item.path);
                    }}
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/25 hover:scale-[1.02] border border-white/10 rounded-2xl p-4 text-white font-bold text-sm tracking-wide text-left cursor-pointer active:scale-95 transition-all w-full"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F68026] text-white">
                      <img 
                        src={item.icon} 
                        alt={item.title} 
                        className="w-6 h-6 object-contain" 
                      />
                    </div>
                    <span className="flex-1 text-xs sm:text-sm font-tropika text-[#FFD84D] tracking-wider">{item.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CSS untuk bentuk panah */}
      <style dangerouslySetInnerHTML={{__html: `
        .clip-path-arrow {
          clip-path: polygon(18% 0%, 100% 0%, 100% 100%, 18% 100%, 0% 50%);
        }
      `}} />
    </div>
  );
}
