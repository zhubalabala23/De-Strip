import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { PlayCircle, CheckCircle2, XCircle, ArrowLeft, Home, Star } from 'lucide-react';
import { missions } from '../data';

import museumImg from '../assets/images/museum.webp';
import leftTreeImg from '../assets/images/left_tree.webp';
import rightTreeImg from '../assets/images/right_tree.webp';
import fanImg from '../assets/images/fan.webp';
import charachterImg from '../assets/images/charachter.webp';

export default function ActiveMissionPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const mission = missions.find(m => m.id === categoryId);
  
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem('destrip_role');
    if (!role) {
      navigate('/');
      return;
    }

    if (!mission) {
      navigate('/missions');
      return;
    }
    const score = parseInt(localStorage.getItem('destrip_score') || '0', 10);
    setCurrentScore(score);
    
    const progressStr = localStorage.getItem('destrip_progress') || '{}';
    const progress = JSON.parse(progressStr);
    setCompletedChallenges(progress[mission.id] || []);
  }, [mission, navigate]);

  const handleBackToMenu = () => {
    setSelectedChallenge(null);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  useEffect(() => {
    if (selectedAnswer !== null) {
      const timer = setTimeout(() => {
        handleBackToMenu();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer]);

  if (!mission) return null;

  const handleSelectChallenge = (idx) => {
    if (completedChallenges.includes(idx)) return; // Mencegah masuk kembali ke tantangan yang sudah selesai
    setSelectedChallenge(idx);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    
    const currentQ = mission.questions[selectedChallenge];
    // Jika soal asli tidak ada (karena hanya 5 di data), kita anggap jawaban salah kecuali index 0 misalnya, 
    // Tapi karena ini dummy, kita anggap kalau soal ga ada, opsi pertama benar.
    const isCorrect = currentQ ? idx === currentQ.correctAnswer : idx === 0;
    
    setSelectedAnswer(idx);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    const newScore = isCorrect ? currentScore + 20 : Math.max(0, currentScore - 10);
    setCurrentScore(newScore);
    localStorage.setItem('destrip_score', newScore.toString());

    if (!completedChallenges.includes(selectedChallenge)) {
      const newCompleted = [...completedChallenges, selectedChallenge];
      setCompletedChallenges(newCompleted);
      const progressStr = localStorage.getItem('destrip_progress') || '{}';
      const progress = JSON.parse(progressStr);
      progress[mission.id] = newCompleted;
      localStorage.setItem('destrip_progress', JSON.stringify(progress));
      localStorage.setItem('destrip_locked_mission', mission.id);
    }
  };

  const currentQ = selectedChallenge !== null && selectedChallenge < mission.questions.length 
                   ? mission.questions[selectedChallenge] 
                   : null;

  const challenges = Array.from({ length: mission.questions.length }, (_, i) => i);

  return (
    <div className="min-h-screen w-full relative overflow-y-auto bg-[#e6d0a7] font-sans flex flex-col items-center pb-24">
      
      {/* Background System */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1200px] lg:w-full lg:left-0 lg:translate-x-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 mx-auto w-[90%] max-w-[1100px] flex justify-center items-end">
            <img src={museumImg} alt="Museum" className="w-full h-auto opacity-70" />
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-[32%] max-w-[450px]">
            <img src={leftTreeImg} alt="Left Tree" className="w-full h-full" />
          </div>
          <div className="absolute top-0 bottom-0 right-0 w-[32%] max-w-[450px]">
            <img src={rightTreeImg} alt="Right Tree" className="w-full h-full" />
          </div>
        </div>

        {/* CHARACTER & FAN */}
        {selectedChallenge === null && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="absolute bottom-0 left-2 md:left-10 w-44 md:w-60 lg:w-[20rem] z-10 drop-shadow-2xl"
          >
            <motion.img
              src={fanImg}
              alt="Fan Blades"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute -top-[40%] left-[-5%] w-[95%] h-auto origin-center -z-10 opacity-90"
            />
            <motion.img
              src={charachterImg}
              alt="Detective Character"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              className="w-full h-auto origin-bottom relative z-10"
            />
          </motion.div>
        )}
      </div>

      <div className="relative z-20 w-full h-full flex flex-col items-center p-3 md:p-6">
        
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between relative mb-2 md:mb-4 mt-1 z-50 px-2 md:px-8 min-h-[72px] md:min-h-0">
          
          {selectedChallenge === null ? (
            /* Header Menu Tantangan */
            <>
              <button 
                onClick={() => navigate('/missions')}
                className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer flex-shrink-0 absolute left-2 top-1 md:relative md:left-auto md:top-auto"
              >
                <ArrowLeft size={28} className="text-[#FFD84D]" strokeWidth={4} />
              </button>

              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#6B4624] px-6 py-2 md:px-12 md:py-4 rounded-[40px] border-b-[6px] border-[#4A2E1B] shadow-2xl mx-auto mt-16 md:mt-0"
              >
                <motion.h1 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                  className="font-tropika text-xl md:text-3xl lg:text-4xl font-black text-[#FFD84D] tracking-widest text-center uppercase drop-shadow-lg origin-center" 
                  style={{ WebkitTextStroke: '2px #4A2E1B' }}
                >
                  {mission.title}
                </motion.h1>
              </motion.div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0 absolute right-2 top-1 md:relative md:right-auto md:top-auto">
                <button 
                  onClick={() => navigate('/landing')}
                  className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer"
                >
                  <Home size={28} className="text-[#FFD84D]" strokeWidth={3} />
                </button>
                <div className="bg-white/95 backdrop-blur px-2 py-1 md:px-3 md:py-1.5 rounded-xl shadow-lg border-2 md:border-4 border-[#FFD84D] flex items-center gap-1 font-black text-[#FF7F27] text-xs md:text-sm lg:text-base">
                  <Star size={16} fill="currentColor" /> {currentScore} Poin
                </div>
              </div>
            </>
          ) : (
            /* Header Saat Mengerjakan Soal */
            <>
              <div className="flex gap-2 md:gap-4 flex-shrink-0 z-10 absolute left-2 top-1 md:relative md:left-auto md:top-auto">
                <button 
                  onClick={handleBackToMenu}
                  className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer"
                >
                  <ArrowLeft size={28} className="text-[#FFD84D]" strokeWidth={4} />
                </button>
                <button 
                  onClick={() => navigate('/landing')}
                  className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer"
                >
                  <Home size={28} className="text-[#FFD84D]" strokeWidth={3} />
                </button>
              </div>

              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#6B4624] px-8 py-3 md:px-16 md:py-4 rounded-[40px] border-b-[6px] border-[#4A2E1B] shadow-2xl md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-0 hidden md:block"
              >
                <motion.h1 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                  className="font-tropika text-xl md:text-3xl font-black text-[#FFD84D] tracking-widest text-center uppercase drop-shadow-lg origin-center" 
                  style={{ WebkitTextStroke: '2px #4A2E1B' }}
                >
                  TANTANGAN {selectedChallenge + 1}
                </motion.h1>
              </motion.div>

              <div className="bg-[#FF3B30] px-4 py-2 md:px-8 md:py-3 rounded-[40px] shadow-2xl flex items-center justify-center flex-shrink-0 border-b-[6px] border-[#C1272D] z-10 absolute right-2 top-1 md:relative md:right-auto md:top-auto">
                <h2 className="text-white font-tropika text-sm md:text-2xl tracking-widest drop-shadow-md">
                  Skor : <span className="font-sans font-black">{currentScore}</span>
                </h2>
              </div>
            </>
          )}
        </div>

        {selectedChallenge === null ? (
          /* MENU TANTANGAN 1-10 */
          <div className="flex-1 w-full flex flex-col justify-center items-end pb-4 md:pb-12 px-2 md:px-8">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-[40px] shadow-2xl border-8 border-white p-6 md:p-10 w-full max-w-5xl lg:mr-16 relative z-20"
            >
              <div className="bg-[#FFD84D] text-[#FF3B30] font-bold text-2xl md:text-4xl text-center py-3 px-8 rounded-2xl mb-8 mx-auto w-max">
                Ayo pilih tantanganya!
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6 justify-items-center">
                {challenges.map((idx) => {
                  const isCompleted = completedChallenges.includes(idx);
                  return (
                    <motion.button
                      key={idx}
                      disabled={isCompleted}
                      whileHover={!isCompleted ? { scale: 1.1, y: -5 } : {}}
                      whileTap={!isCompleted ? { scale: 0.9 } : {}}
                      onClick={() => handleSelectChallenge(idx)}
                      className={`w-20 h-20 md:w-32 md:h-32 rounded-full shadow-lg border-[4px] md:border-[6px] flex flex-col items-center justify-center text-white transition-all relative overflow-hidden
                        ${isCompleted 
                          ? 'bg-green-500 border-green-300 cursor-not-allowed opacity-90' 
                          : 'bg-[#FF7F27] border-[#FFD84D] cursor-pointer'
                        }`}
                    >
                      <span className="text-[9px] md:text-sm font-bold opacity-90 drop-shadow-md tracking-wider mt-1 md:mt-2">Tantangan</span>
                      <span className="text-2xl md:text-5xl font-black drop-shadow-md leading-none font-tropika">{idx + 1}</span>
                      {isCompleted && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                           <CheckCircle2 size={40} className="text-white drop-shadow-md" strokeWidth={3} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        ) : (
          /* TAMPILAN SOAL - DUAL PANEL LAYOUT */
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-6xl mx-auto flex-1 flex flex-col md:flex-row gap-4 md:gap-8 p-2 md:p-6 relative z-20 items-stretch"
          >
            {/* Panel Kiri: Gambar, QR, dan Teks Literasi */}
            <div className="w-full md:w-1/2 bg-white rounded-[40px] border-[6px] md:border-[8px] border-black p-4 md:p-6 shadow-2xl flex flex-col md:h-full">
              <div className="flex flex-row justify-between items-start gap-4 mb-4">
                {/* Gambar Objek */}
                <div className="w-[62%] h-36 md:h-52 overflow-hidden flex items-center justify-center rounded-2xl border-[1px] border-black bg-gray-50 shadow-sm">
                  <img src={currentQ.image || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=400&q=80'} alt="Objek" className="w-full h-full object-cover" />
                </div>
                
                {/* QR Code Section */}
                <div className="w-[34%] flex flex-col items-center justify-center gap-2 mt-1">
                  <div className="bg-white p-2 rounded-2xl border-[4px] border-black shadow-sm">
                    {currentQ.qrLink ? (
                      <QRCodeSVG value={currentQ.qrLink} size={90} className="w-full h-auto max-w-[90px]" />
                    ) : (
                      <div className="w-[90px] h-[90px] bg-gray-200 flex items-center justify-center text-xs text-center font-bold">No QR</div>
                    )}
                  </div>
                  <div className="bg-black text-white px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[10px] md:text-sm font-bold flex items-center justify-center gap-2 w-max whitespace-nowrap">
                    📱 Scan Me
                  </div>
                </div>
              </div>
              
              {/* Teks Literasi */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-base md:text-lg lg:text-xl font-bold text-black text-justify leading-relaxed">
                  {currentQ.text}
                </p>
              </div>
            </div>

            {/* Panel Kanan: Pertanyaan & Opsi Jawaban */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 md:gap-6">
              
              {/* Balon Pertanyaan */}
              <div className="bg-white rounded-[30px] border-[6px] border-black p-4 md:p-6 shadow-xl">
                <div className="md:hidden text-center font-tropika text-[#FF7F27] text-lg mb-1" style={{ WebkitTextStroke: '0.5px #8C5300' }}>
                  TANTANGAN {selectedChallenge + 1}
                </div>
                <p className="text-center font-black text-base md:text-xl lg:text-2xl text-black">
                  Berdasarkan teks deskripsi di samping, pilihlah jawaban yang paling tepat!
                </p>
              </div>

              {/* Opsi Jawaban Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {currentQ.options.map((opt, idx) => {
                  let btnClass = "bg-white hover:bg-gray-100";
                  
                  if (selectedAnswer !== null) {
                    if (idx === currentQ.correctAnswer) {
                      btnClass = "bg-[#39B54A] text-white border-[#39B54A] shadow-none"; 
                    } else if (idx === selectedAnswer && idx !== currentQ.correctAnswer) {
                      btnClass = "bg-[#ED1C24] text-white border-[#ED1C24] shadow-none"; 
                    } else {
                      btnClass = "bg-gray-200 text-gray-500 opacity-60"; 
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-3 md:p-4 rounded-[20px] md:rounded-[30px] border-[4px] md:border-[6px] border-black font-black transition-all flex flex-col justify-center min-h-[80px] md:min-h-[100px] shadow-lg active:scale-95 active:shadow-sm ${btnClass}`}
                    >
                      <span className="text-sm md:text-base lg:text-lg xl:text-xl leading-snug">
                        <span className="underline mr-1">{String.fromCharCode(65 + idx)}.</span> {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Feedback & Next Button Overlay */}
      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 w-full max-w-2xl mx-auto p-4 z-[100] pointer-events-none"
          >
            <div className={`pointer-events-auto rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border-4 border-white ${feedback === 'correct' ? 'bg-[#39B54A]' : 'bg-[#ED1C24]'}`}>
              <div className="flex items-center justify-center gap-3 text-white font-black text-2xl md:text-3xl font-tropika tracking-wider drop-shadow-md">
                {feedback === 'correct' ? <CheckCircle2 size={36} strokeWidth={3} /> : <XCircle size={36} strokeWidth={3} />}
                <span>{feedback === 'correct' ? 'BENAR! +20 Poin' : 'SALAH! -10 Poin'}</span>
              </div>
              <p className="text-white text-center font-bold text-lg drop-shadow-md">
                {feedback === 'correct' ? 'Kerja bagus detektif! Lanjutkan pencarianmu.' : 'Tidak apa-apa, ayo coba lagi di tantangan berikutnya!'}
              </p>
              <button 
                onClick={handleBackToMenu}
                className="w-full bg-white text-gray-900 font-black py-4 rounded-2xl mt-2 hover:bg-gray-100 shadow-lg text-lg transition-transform active:scale-95 border-b-4 border-gray-300 active:border-b-0"
              >
                Kembali ke Menu Tantangan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Evaluation Popup */}
      <AnimatePresence>
        {selectedChallenge === null && completedChallenges.length === mission.questions.length && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-[#39B54A] flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-tropika tracking-wider">Misi Selesai!</h3>
              <p className="text-gray-600 mb-6 text-lg">Kalian telah menyelesaikan {mission.questions.length} tantangan. Sebelum melihat peringkat detektif kalian, yuk isi lembar refleksi dulu!</p>
              <button 
                onClick={() => navigate('/refleksi')}
                className="bg-[#39B54A] text-white font-bold py-4 px-8 rounded-2xl hover:bg-[#2e933c] transition-colors w-full shadow-xl border-b-4 border-[#228B22] active:translate-y-1 active:border-b-0 text-xl font-tropika tracking-widest"
              >
                LANJUT KE REFLEKSI
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
