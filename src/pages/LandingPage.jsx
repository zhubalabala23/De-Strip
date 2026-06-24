import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Menu, X } from 'lucide-react';
import museumImg from '../assets/images/museum.png';
import leftTreeImg from '../assets/images/left_tree.png';
import rightTreeImg from '../assets/images/right_tree.png';
import characterImg from '../assets/images/charachter.png';
import boardTitleImg from '../assets/images/board_title_top.png';
import buttonPlayImg from '../assets/images/button_play.png';
import fanImg from '../assets/images/fan.png';
import quizIcon from '../assets/images/icon_menu/quiz.png';
import refleksiIcon from '../assets/images/icon_menu/refleksi.png';
import evaluasiIcon from '../assets/images/icon_menu/evaluasi.png';
import petunjukIcon from '../assets/images/icon_menu/petunjuk.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { title: "PETUNJUK BELAJAR", path: "/petunjuk", icon: petunjukIcon, bgWhite: false, isImage: true },
    { title: "KUIZ PEMAHAMAN", path: "/group-setup", icon: quizIcon, bgWhite: false, isImage: true },
    { title: "AYO REFLEKSI", path: "/refleksi", icon: refleksiIcon, bgWhite: false, isImage: true },
    { title: "EVALUASI AKHIR", path: "/evaluasi", icon: evaluasiIcon, bgWhite: false, isImage: true },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-transparent font-sans selection:bg-yellow-300 flex items-center justify-center">
      
      {/* Tombol Rekap Guru */}
      <button 
        onClick={() => navigate('/teacher-recap')}
        className="absolute top-4 left-4 z-[100] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/10 hover:bg-[#F68026] backdrop-blur-sm rounded-full cursor-pointer transition-all border border-white/20"
        title="Rekap Nilai Guru"
      >
        <ClipboardList size={20} className="text-white" />
      </button>
      
      {/* Tombol Hamburger Menu (Mobile Only) */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 right-4 z-[100] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#F68026] text-[#FFD84D] hover:bg-[#d96a1a] rounded-full shadow-lg border-2 border-white/20 active:scale-95 transition-all md:hidden cursor-pointer"
        title="Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* 1. MUSEUM (Tengah Bawah) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 mx-auto w-[98%] md:w-[90%] max-w-[1100px] z-10 pointer-events-none flex justify-center items-end"
      >
        <img src={museumImg} alt="Museum" className="w-full h-auto drop-shadow-2xl" />
      </motion.div>

      {/* 2. LEFT TREE */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-[45%] md:w-[35%] max-w-[450px] z-20 pointer-events-none"
      >
        <img src={leftTreeImg} alt="Left Tree" className="w-full h-auto" />
      </motion.div>

      {/* 3. RIGHT TREE */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-[45%] md:w-[35%] max-w-[450px] z-20 pointer-events-none"
      >
        <img src={rightTreeImg} alt="Right Tree" className="w-full h-auto" />
      </motion.div>



      {/* 4. CHARACTER (RUBAH DETEKTIF) & BALING-BALING */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        className="absolute -bottom-5 md:-bottom-10 left-[2%] md:left-[8%] w-[50%] md:w-[40%] lg:w-[35%] max-w-[450px] z-30 pointer-events-none"
      >
        {/* Baling-baling ditempel langsung ke karakter agar responsif dan selalu di atas topi */}
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

      {/* 5. BOARD TITLE TOP */}
      <motion.div
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
        className="absolute top-0 left-0 right-0 mx-auto w-[85%] md:w-[65%] max-w-[700px] z-40 pointer-events-none"
      >
        <img src={boardTitleImg} alt="Board Title" className="w-full h-auto drop-shadow-xl" />
      </motion.div>

      {/* 6. TOMBOL PLAY */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
        onClick={() => navigate('/group-setup')}
        className="absolute top-[42%] md:top-[48%] left-0 right-0 mx-auto w-max z-50 cursor-pointer outline-none group"
      >
        <motion.img 
          src={buttonPlayImg} 
          alt="Play Button" 
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
          className="w-40 md:w-56 lg:w-64 h-auto group-hover:scale-110 group-hover:brightness-110 group-active:scale-95 transition-all" 
        />
      </motion.button>

      {/* 5. MENU SAMPING KANAN (Proporsional di tengah atas - Desktop Only) */}
      <motion.div 
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute right-0 top-[10%] md:top-[15%] lg:top-[20%] z-50 hidden md:flex flex-col items-end gap-3 md:gap-5 lg:gap-6 w-44 sm:w-52 md:w-64 lg:w-72 pr-0"
      >
        {menuItems.map((item, index) => (
          <motion.button 
            key={index}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
            onClick={() => navigate(item.path)}
            className="group flex flex-col items-end w-full cursor-pointer transform hover:-translate-x-3 transition-transform active:scale-95 origin-right"
          >
            {/* Teks Label */}
            <div className="bg-[#4a2e1b]/95 text-white font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm tracking-wider px-3 sm:px-4 py-1.5 md:py-2 rounded-l-full mb-0 border-r-0 mr-2 sm:mr-3 md:mr-4 shadow-xl z-10">
              {item.title}
            </div>
            
            {/* Tombol Panah Kayu */}
            <div className="relative w-full h-10 sm:h-14 md:h-16 lg:h-20 flex justify-end -mt-1 md:-mt-2">
              <div className="bg-[#654321] w-[85%] lg:w-[90%] h-full flex items-center justify-center clip-path-arrow shadow-2xl relative border-y-[3px] border-l-[3px] border-[#4a2e1b]">
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                <div className={`relative z-10 w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center mr-4 sm:mr-6 md:mr-8 ${item.bgWhite ? 'bg-white rounded-full shadow-inner' : ''}`}>
                  {item.isImage ? (
                    <img 
                      src={item.icon} 
                      alt={item.title} 
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 object-contain" 
                    />
                  ) : (
                    React.cloneElement(item.icon, { 
                      size: undefined, 
                      className: `${item.icon.props.className} w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7`
                    })
                  )}
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
              className="fixed inset-0 bg-black/60 z-[80] md:hidden"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[260px] sm:w-[320px] bg-[#6B4624] border-l-8 border-[#4A2E1B] p-6 pt-20 z-[90] md:hidden shadow-2xl flex flex-col gap-6"
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.bgWhite ? 'bg-white text-[#654321]' : 'bg-[#F68026] text-white'}`}>
                      {item.isImage ? (
                        <img 
                          src={item.icon} 
                          alt={item.title} 
                          className="w-6 h-6 object-contain" 
                        />
                      ) : (
                        React.cloneElement(item.icon, { 
                          size: undefined, 
                          className: `w-5 h-5 ${item.bgWhite ? 'text-[#654321]' : 'text-white'}` 
                        })
                      )}
                    </div>
                    <span className="flex-1 text-xs sm:text-sm">{item.title}</span>
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
          clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%);
        }
      `}} />
    </div>
  );
}
