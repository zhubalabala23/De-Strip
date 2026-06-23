import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Home } from 'lucide-react';

import museumImg from '../assets/images/museum.png';
import leftTreeImg from '../assets/images/left_tree.png';
import rightTreeImg from '../assets/images/right_tree.png';
import fanImg from '../assets/images/fan.png';
import missionLingkunganImg from '../assets/images/pilih_misi/lingkungan.png';
import missionFenomenaImg from '../assets/images/pilih_misi/fenomena_alam.png';
import missionFloraImg from '../assets/images/pilih_misi/flora_fauna.png';
import missionTokohImg from '../assets/images/pilih_misi/tokoh.png';

export default function MissionsMenuPage() {
  const navigate = useNavigate();
  const [lockedMission, setLockedMission] = React.useState(null);

  React.useEffect(() => {
    const locked = localStorage.getItem('destrip_locked_mission');
    if (locked) setLockedMission(locked);
  }, []);

  const handleResetMission = () => {
    if (lockedMission) {
      if (window.confirm("Apakah kamu yakin ingin mereset misi? Semua progres dan poin di misi ini akan hilang!")) {
        localStorage.setItem('destrip_score', '0');
        localStorage.removeItem('destrip_progress');
        localStorage.removeItem('destrip_locked_mission');
        setLockedMission(null);
      }
    } else {
      alert("Belum ada misi yang terkunci / dikerjakan.");
    }
  };

  const missions = [
    { id: 'lingkungan', title: 'Lingkungan', img: missionLingkunganImg },
    { id: 'fenomena', title: 'Fenomena Alam', img: missionFenomenaImg },
    { id: 'florafauna', title: 'Flora & Fauna', img: missionFloraImg },
    { id: 'tokoh', title: 'Tokoh', img: missionTokohImg },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#e6d0a7] font-sans flex flex-col items-center justify-center">
      
      {/* Background System */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]">
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-[98%] md:w-[90%] max-w-[1100px] flex justify-center items-end">
          <img src={museumImg} alt="Museum" className="w-full h-auto opacity-70" />
        </div>
        <div className="absolute bottom-0 left-0 w-[45%] md:w-[35%] max-w-[450px]">
          <img src={leftTreeImg} alt="Left Tree" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-0 right-0 w-[45%] md:w-[35%] max-w-[450px]">
          <img src={rightTreeImg} alt="Right Tree" className="w-full h-auto" />
        </div>
        
        {/* FAN */}
        <motion.img
          src={fanImg}
          alt="Fan Blades"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute bottom-[48%] md:bottom-[55%] -left-[5%] md:left-0 w-48 md:w-64 lg:w-[22rem] h-auto origin-center drop-shadow-lg opacity-80"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center p-4 md:p-8">
        
        {/* Header: Tombol Back & Judul */}
        <div className="w-full flex items-center justify-between md:justify-center relative mb-6 md:mb-10 mt-2">
          {/* Tombol Back */}
          <button 
            onClick={() => navigate('/group-setup')}
            className="absolute left-0 top-0 md:top-2 bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 z-20 cursor-pointer"
          >
            <ArrowLeft size={32} className="text-[#FFD84D]" strokeWidth={4} />
          </button>

          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#6B4624] px-10 py-4 md:px-16 md:py-6 rounded-[50px] border-b-[8px] border-[#4A2E1B] shadow-2xl mx-auto mt-16 md:mt-0"
          >
            <motion.h1 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              className="font-tropika text-3xl md:text-5xl font-black text-[#FFD84D] tracking-widest text-center leading-tight drop-shadow-lg origin-center" 
              style={{ WebkitTextStroke: '2px #4A2E1B' }}
            >
              PILIH MISI<br/>DETEKTIFMU!
            </motion.h1>
          </motion.div>

          {/* Kelompok Tombol Kanan (Reset & Home) */}
          <div className="absolute right-0 top-0 md:top-2 flex gap-2 md:gap-3 z-20">
            <button 
              onClick={handleResetMission}
              className="bg-[#ED1C24] hover:bg-[#c9181e] transition-colors h-12 md:h-16 px-4 md:px-6 rounded-full flex items-center justify-center gap-2 shadow-lg border-4 border-[#C1272D] active:scale-95 cursor-pointer"
              title="Reset Misi"
            >
              <RotateCcw size={24} className="text-white md:w-7 md:h-7" strokeWidth={4} />
              <span className="text-white font-tropika text-xs md:text-xl tracking-wider pt-1">RESET MISI</span>
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer"
              title="Home"
            >
              <Home size={32} className="text-[#FFD84D]" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Grid Kartu Misi */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl px-2 md:px-10 mt-4">
          {missions.map((mission, index) => {
            const isLocked = lockedMission && lockedMission !== mission.id;
            return (
            <motion.div
              key={mission.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15, type: 'spring' }}
              whileHover={!isLocked ? { y: -10, scale: 1.05 } : {}}
              onClick={() => {
                if (!isLocked) navigate(`/mission/${mission.id}`);
              }}
              className={`bg-white rounded-[30px] p-4 md:p-6 shadow-2xl border-4 border-white flex flex-col items-center justify-between transition-all group relative overflow-hidden ${isLocked ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:shadow-orange-500/20'}`}
            >
              {/* Tempat Gambar / Ikon */}
              <div className="flex-1 w-full flex items-center justify-center mt-2 p-2">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: index * 0.2, ease: "easeInOut" }}
                  className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 flex items-center justify-center"
                >
                  <img src={mission.img} alt={mission.title} className="w-full h-full object-contain drop-shadow-md" />
                </motion.div>
              </div>

              {/* Teks Judul Bawah */}
              <h2 className="font-tropika text-lg md:text-xl lg:text-2xl text-[#FFB000] text-center mt-4 mb-2 tracking-wide w-full" style={{ WebkitTextStroke: '1px #8C5300' }}>
                {mission.title}
              </h2>
            </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
