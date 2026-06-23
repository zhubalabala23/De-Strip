import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, CheckCircle2, ArrowLeft, Home } from 'lucide-react';

import museumImg from '../assets/images/museum.png';
import leftTreeImg from '../assets/images/left_tree.png';
import rightTreeImg from '../assets/images/right_tree.png';

export default function RefleksiPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    q1: [],
    q2: '',
    q3: '',
    q4: ''
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('destrip_groupName');
    const progressStr = localStorage.getItem('destrip_progress') || '{}';
    const progress = JSON.parse(progressStr);
    const hasCompletedMission = Object.values(progress).some(arr => arr.length === 5);

    if (!savedName || !hasCompletedMission) {
      navigate('/group-setup');
      return;
    }

    const savedData = localStorage.getItem('destrip_reflections');
    if (savedData) {
      setAnswers(JSON.parse(savedData));
    }
  }, [navigate]);

  const handleCheckboxToggle = (val) => {
    setAnswers(prev => ({
      ...prev,
      q1: prev.q1.includes(val) 
        ? prev.q1.filter(item => item !== val)
        : [...prev.q1, val]
    }));
  };

  const handleSave = () => {
    localStorage.setItem('destrip_reflections', JSON.stringify(answers));
    setSaved(true);
    setTimeout(() => {
      navigate('/evaluasi');
    }, 1500);
  };

  const q1Options = ["Membaca teks", "Menjawab soal", "Memindai QR Code", "Melihat gambar/video"];
  const q2Options = ["Ya", "Cukup", "Belum"];
  const q4Options = [
    { label: "Senang", emoji: "😊" },
    { label: "Sangat Senang", emoji: "😄" },
    { label: "Biasa Saja", emoji: "😐" },
    { label: "Masih Kesulitan", emoji: "😔" }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden bg-[#e6d0a7] font-sans flex flex-col items-center">
      
      {/* Background System */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]">
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-[98%] md:w-[90%] max-w-[1100px] flex justify-center items-end opacity-40">
          <img src={museumImg} alt="Museum" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-0 left-0 w-[45%] md:w-[35%] max-w-[450px] opacity-60">
          <img src={leftTreeImg} alt="Left Tree" className="w-full h-auto" />
        </div>
        <div className="absolute bottom-0 right-0 w-[45%] md:w-[35%] max-w-[450px] opacity-60">
          <img src={rightTreeImg} alt="Right Tree" className="w-full h-auto" />
        </div>
      </div>

      <div className="relative z-20 w-full h-full flex flex-col items-center p-3 md:p-6 max-w-5xl mx-auto min-h-screen">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between relative mb-8 mt-2 z-50">
          <button 
            onClick={() => navigate('/')}
            className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer flex-shrink-0"
          >
            <ArrowLeft size={32} className="text-[#FFD84D]" strokeWidth={4} />
          </button>

          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#6B4624] px-4 py-3 md:px-12 md:py-4 rounded-[40px] border-b-[6px] border-[#4A2E1B] shadow-2xl mx-auto mt-16 md:mt-0"
          >
            <motion.h1 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              className="font-tropika text-xl md:text-3xl lg:text-4xl font-black text-[#FFD84D] tracking-widest text-center uppercase drop-shadow-lg flex items-center gap-2 origin-center" 
              style={{ WebkitTextStroke: '2px #4A2E1B' }}
            >
              <span>📝</span> AYO REFLEKSI
            </motion.h1>
          </motion.div>

          <button 
            onClick={() => navigate('/')}
            className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer flex-shrink-0 opacity-0 pointer-events-none"
          >
            <Home size={32} className="text-[#FFD84D]" strokeWidth={3} />
          </button>
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-[40px] border-8 border-white shadow-2xl w-full max-w-4xl relative z-20 pb-10 mb-20"
        >
          <div className="bg-[#FFD84D] text-[#FF3B30] font-bold text-base md:text-xl px-6 py-4 rounded-3xl mb-8 shadow-sm border-4 border-[#FFC107] text-center max-w-2xl mx-auto">
            Setelah bermain, yuk renungkan pengalaman belajarmu!
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            
            {/* Pertanyaan 1 */}
            <div className="bg-[#f8f9fa] p-5 md:p-8 rounded-[30px] border-4 border-gray-200">
              <label className="text-lg md:text-2xl font-black text-gray-800 mb-6 block text-center">
                Apa yang paling kamu sukai dari petualangan hari ini?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q1Options.map((opt) => {
                  const isSelected = answers.q1.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => handleCheckboxToggle(opt)}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl border-4 font-bold text-sm md:text-lg transition-all ${isSelected ? 'bg-[#39B54A] border-[#228B22] text-white shadow-inner transform scale-[0.98]' : 'bg-white border-gray-300 hover:bg-gray-100 text-gray-700'}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 ${isSelected ? 'bg-white border-white' : 'border-gray-400'}`}>
                        {isSelected && <CheckCircle2 size={24} className="text-[#39B54A]" />}
                      </div>
                      <span className="text-left">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Pertanyaan 2 */}
            <div className="bg-[#f8f9fa] p-5 md:p-8 rounded-[30px] border-4 border-gray-200">
              <label className="text-lg md:text-2xl font-black text-gray-800 mb-6 block text-center">
                Apakah kamu lebih memahami teks deskripsi setelah bermain?
              </label>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {q2Options.map((opt) => {
                  const isSelected = answers.q2 === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers({...answers, q2: opt})}
                      className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-4 font-bold text-sm md:text-lg transition-all flex-1 ${isSelected ? 'bg-[#FF7F27] border-[#C1272D] text-white shadow-inner transform scale-[0.98]' : 'bg-white border-gray-300 hover:bg-gray-100 text-gray-700'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSelected ? 'bg-white border-white' : 'border-gray-400'}`}>
                        {isSelected && <div className="w-3 h-3 bg-[#FF7F27] rounded-full" />}
                      </div>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pertanyaan 3 */}
            <div className="bg-[#f8f9fa] p-5 md:p-8 rounded-[30px] border-4 border-gray-200">
              <label className="text-lg md:text-2xl font-black text-gray-800 mb-6 block text-center">
                Informasi baru apa yang kamu dapatkan hari ini?
              </label>
              <textarea 
                rows={4}
                value={answers.q3}
                onChange={e => setAnswers({...answers, q3: e.target.value})}
                className="w-full p-6 rounded-3xl border-4 border-gray-300 focus:border-[#F68026] outline-none text-base md:text-lg font-bold bg-white text-gray-800 shadow-inner resize-none transition-colors"
                placeholder="Ketikan jawaban singkatmu di sini..."
              />
            </div>

            {/* Pertanyaan 4 */}
            <div className="bg-[#f8f9fa] p-5 md:p-8 rounded-[30px] border-4 border-gray-200">
              <label className="text-lg md:text-2xl font-black text-gray-800 mb-6 block text-center">
                Bagaimana perasaanmu setelah menyelesaikan permainan?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {q4Options.map((opt) => {
                  const isSelected = answers.q4 === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setAnswers({...answers, q4: opt.label})}
                      className={`flex flex-col items-center justify-center gap-3 p-4 md:p-6 rounded-3xl border-4 transition-all ${isSelected ? 'bg-[#FFD84D] border-[#F68026] shadow-inner transform scale-[0.98]' : 'bg-white border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                    >
                      <span className="text-4xl md:text-6xl drop-shadow-sm">{opt.emoji}</span>
                      <span className={`text-xs md:text-base font-black text-center leading-tight ${isSelected ? 'text-[#FF3B30]' : 'text-gray-700'}`}>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saved}
            className={`w-full mt-12 font-tropika text-xl md:text-3xl py-5 rounded-full flex items-center justify-center gap-3 shadow-xl border-b-8 active:border-b-0 active:translate-y-2 transition-all tracking-wider ${saved ? 'bg-[#39B54A] text-white border-[#228B22]' : 'bg-[#F68026] text-white hover:bg-[#d96a1a] border-[#C1272D]'}`}
          >
            {saved ? 'REFLEKSI TERSIMPAN!' : <><Save size={32} /> SIMPAN REFLEKSI</>}
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
