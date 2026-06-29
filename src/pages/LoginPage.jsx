import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, ShieldAlert } from 'lucide-react';

// Core assets
import leftTreeImg from '../assets/images/left_tree.webp';
import rightTreeImg from '../assets/images/right_tree.webp';
import characterImg from '../assets/images/charachter.webp';
import boardTitleImg from '../assets/images/board_title_top.webp';
import fanImg from '../assets/images/fan.webp';
import backgroundSkyImg from '../assets/images/background.webp';

export default function LoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('destrip_role');
    if (role === 'siswa') {
      navigate('/landing');
    } else if (role === 'guru') {
      navigate('/teacher-recap');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '12345') {
      // Guru
      localStorage.setItem('destrip_role', 'guru');
      navigate('/teacher-recap');
    } else if (pin === '123') {
      // Siswa
      localStorage.setItem('destrip_role', 'siswa');
      navigate('/landing');
    } else {
      setError('PIN Akses Salah! Silakan coba lagi.');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#e6d0a7] font-sans flex flex-col items-center justify-center">
      
      {/* Background System */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1200px] lg:w-full lg:left-0 lg:translate-x-0 pointer-events-none z-10 overflow-hidden">
        {/* Main Background Sky/Grass */}
        <div className="absolute inset-0 -z-20">
          <img src={backgroundSkyImg} alt="Background Sky" className="w-full h-full" />
        </div>
        
        {/* LEFT TREE & RIGHT TREE */}
        <div className="absolute top-0 bottom-0 left-0 w-[32%] max-w-[450px]">
          <img src={leftTreeImg} alt="Left Tree" className="w-full h-full opacity-80" />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-[32%] max-w-[450px]">
          <img src={rightTreeImg} alt="Right Tree" className="w-full h-full opacity-80" />
        </div>

        {/* CHARACTER & FAN (Kiri) */}
        <div className="absolute bottom-0 left-[10%] w-[24%] max-w-[280px] z-30 pointer-events-none hidden md:block">
          <motion.img
            src={fanImg}
            alt="Fan Blades"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute -top-[40%] left-[-5%] w-[95%] h-auto origin-center -z-10"
          />
          <img src={characterImg} alt="Character" className="w-full h-auto relative z-10" />
        </div>
      </div>

      {/* Title Wooden Board - Pas di atas (Sama seperti Landing Page) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[75%] md:w-[48%] max-w-[500px] pointer-events-none z-30"
      >
        <motion.div
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="w-full h-auto"
        >
          <img src={boardTitleImg} alt="Board Title" className="w-full h-auto drop-shadow-xl" />
        </motion.div>
      </div>

      {/* Login Card Container */}
      <div className="relative z-20 w-full max-w-md px-6 flex flex-col items-center mt-20 md:mt-24">
        
        {/* Form Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/95 backdrop-blur-md p-8 rounded-[35px] border-4 border-[#FFD84D] shadow-2xl flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-[#FFD84D]/20 text-[#F68026] rounded-full flex items-center justify-center mb-4">
            <KeyRound size={32} strokeWidth={2.5} />
          </div>

          <h2 className="font-tropika text-2xl md:text-3xl text-detectiveDark text-center mb-2 tracking-wider">
            PIN AKSES
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6 font-semibold">
            Masukkan PIN Akses Guru atau Siswa untuk memulai
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setError('');
                  setPin(e.target.value.replace(/\D/g, ''));
                }}
                placeholder="Masukkan PIN"
                className="w-full text-center px-4 py-4 bg-gray-50 border-4 border-gray-200 rounded-2xl text-2xl font-black tracking-widest outline-none focus:border-[#F68026] focus:ring-4 focus:ring-[#F68026]/10 transition-all placeholder:text-lg placeholder:tracking-normal placeholder:font-bold"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2.5 rounded-xl border border-red-200 text-sm font-bold justify-center"
              >
                <ShieldAlert size={18} />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#F68026] hover:bg-[#d96a1a] text-white font-tropika text-xl md:text-2xl py-4 rounded-2xl shadow-lg border-b-6 border-[#C1272D] active:border-b-0 active:translate-y-1 transition-all cursor-pointer tracking-wider"
            >
              MASUK
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
