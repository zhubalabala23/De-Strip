import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowLeft, Home, Star, Award, ShieldCheck, Users } from 'lucide-react';
import { saveRecap } from '../firebase';

import museumImg from '../assets/images/museum.png';
import leftTreeImg from '../assets/images/left_tree.png';
import rightTreeImg from '../assets/images/right_tree.png';

const challengesData = [
  {
    id: 1,
    type: 'multiple-choice-group',
    title: 'Tantangan 1',
    description: 'Bacalah teks deskripsi berikut ini dengan saksama.',
    text: 'Museum Rekor Dunia Indonesia (MURI) didirikan di Semarang. Museum ini menyimpan berbagai catatan rekor unik dan luar biasa dari seluruh Indonesia. Bangunannya tertata rapi dan koleksinya sangat mengagumkan.',
    questions: [
      {
        q: 'Siapa objek yang dideskripsikan?',
        options: ['Museum Rekor Dunia Indonesia', 'Museum Fatahillah', 'Candi Prambanan', 'Keraton Yogyakarta'],
        correctAnswer: 0
      },
      {
        q: 'Apa ciri-ciri objek tersebut?',
        options: ['Sangat gelap dan menyeramkan', 'Menyimpan catatan rekor unik, tertata rapi, dan mengagumkan', 'Hanya memiliki sedikit koleksi', 'Terbengkalai dan tidak terawat'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    type: 'checkbox',
    title: 'Tantangan 2',
    description: 'Tentukan struktur teks deskripsi yang tepat. Pilih struktur yang benar!',
    options: ['Identifikasi', 'Orientasi', 'Deskripsi Bagian', 'Penutup', 'Koda'],
    correctAnswers: [0, 2, 3] 
  },
  {
    id: 3,
    type: 'checkbox',
    title: 'Tantangan 3',
    description: 'Temukan kata sifat pada teks berikut:\n\n"Pantai itu indah dan bersih."',
    options: ['Pantai', 'itu', 'indah', 'dan', 'bersih'],
    correctAnswers: [2, 4] 
  }
];

export default function EvaluasiPage() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [totalMissionScore, setTotalMissionScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedName = localStorage.getItem('destrip_groupName');
    const progressStr = localStorage.getItem('destrip_progress') || '{}';
    const scoreStr = localStorage.getItem('destrip_score') || '0';
    const reflectionStr = localStorage.getItem('destrip_reflections');
    const progress = JSON.parse(progressStr);
    const hasCompletedMission = Object.values(progress).some(arr => arr.length === 5);

    if (!savedName || !hasCompletedMission) {
      navigate('/group-setup');
    } else if (!reflectionStr) {
      navigate('/refleksi');
    } else {
      setGroupName(savedName);
      setTotalMissionScore(parseInt(scoreStr, 10));

      const savedAnswers = localStorage.getItem('destrip_eval_answers');
      const savedIdx = localStorage.getItem('destrip_eval_currentIdx');
      const savedIsDone = localStorage.getItem('destrip_eval_isDone');
      const savedScore = localStorage.getItem('destrip_eval_score');

      if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
      if (savedIdx) setCurrentIdx(parseInt(savedIdx, 10));
      if (savedIsDone) setIsDone(savedIsDone === 'true');
      if (savedScore) setScore(parseInt(savedScore, 10));
    }
  }, [navigate]);

  const currentQ = challengesData[currentIdx];

  const handleCheckboxToggle = (optIdx) => {
    setAnswers(prev => {
      const currentAnswers = prev[currentIdx] || [];
      const newAnswers = currentAnswers.includes(optIdx)
        ? currentAnswers.filter(id => id !== optIdx)
        : [...currentAnswers, optIdx];
      const updated = { ...prev, [currentIdx]: newAnswers };
      localStorage.setItem('destrip_eval_answers', JSON.stringify(updated));
      return updated;
    });
  };

  const handleMultiChoice = (qIdx, optIdx) => {
    setAnswers(prev => {
      const currentAnswers = prev[currentIdx] || {};
      const updated = { ...prev, [currentIdx]: { ...currentAnswers, [qIdx]: optIdx } };
      localStorage.setItem('destrip_eval_answers', JSON.stringify(updated));
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIdx < challengesData.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      localStorage.setItem('destrip_eval_currentIdx', nextIdx.toString());
    } else {
      calculateScore();
      setIsDone(true);
      localStorage.setItem('destrip_eval_isDone', 'true');
    }
  };

  const calculateScore = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;

    challengesData.forEach((ch, idx) => {
      const userAns = answers[idx];
      if (ch.type === 'multiple-choice-group') {
        ch.questions.forEach((q, qIdx) => {
          totalQuestions++;
          if (userAns && userAns[qIdx] === q.correctAnswer) totalCorrect++;
        });
      } else if (ch.type === 'checkbox') {
        totalQuestions++;
        const correctSet = new Set(ch.correctAnswers);
        const userSet = new Set(userAns || []);
        
        const isCorrect = correctSet.size === userSet.size && [...correctSet].every(val => userSet.has(val));
        if (isCorrect) totalCorrect++;
      }
    });

    // We have 4 questions total (2 in T1, 1 in T2, 1 in T3)
    const finalScore = Math.round((totalCorrect / totalQuestions) * 100);
    setScore(finalScore);
    localStorage.setItem('destrip_eval_score', finalScore.toString());
  };

  const renderChallenge = () => {
    if (!currentQ) return null;

    if (currentQ.type === 'multiple-choice-group') {
      return (
        <div className="flex flex-col gap-6 w-full max-w-4xl">
          <div className="bg-white p-4 md:p-6 rounded-2xl border-4 border-black shadow-lg">
            <p className="font-bold text-sm md:text-base mb-2">{currentQ.description}</p>
            <p className="text-gray-800 italic bg-gray-50 p-4 rounded-xl border border-gray-200">"{currentQ.text}"</p>
          </div>
          
          {currentQ.questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-white p-4 md:p-6 rounded-2xl border-4 border-black shadow-lg">
              <p className="font-black text-sm md:text-lg mb-4">{q.q}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[currentIdx]?.[qIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleMultiChoice(qIdx, optIdx)}
                      className={`text-left p-3 md:p-4 rounded-xl border-4 font-bold transition-all ${isSelected ? 'bg-[#FFD84D] border-[#F68026] text-black shadow-inner transform scale-[0.98]' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (currentQ.type === 'checkbox') {
      return (
        <div className="flex flex-col gap-6 w-full items-center">
          <div className="bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-xl w-full max-w-2xl text-center">
            <p className="font-black text-lg md:text-xl mb-4">{currentQ.description}</p>
            {currentQ.text && (
              <p className="text-gray-800 italic bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 text-xl">
                {currentQ.text.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
              </p>
            )}
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = (answers[currentIdx] || []).includes(optIdx);
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleCheckboxToggle(optIdx)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-4 font-black text-lg transition-all ${isSelected ? 'bg-[#39B54A] border-[#228B22] text-white shadow-inner transform scale-[0.98]' : 'bg-white border-gray-300 hover:bg-gray-100 text-gray-700'}`}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center border-2 ${isSelected ? 'bg-white border-white' : 'border-gray-400'}`}>
                      {isSelected && <CheckCircle2 size={20} className="text-[#39B54A]" />}
                    </div>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  const isCurrentAnswered = () => {
    if (!currentQ) return false;
    if (currentQ.type === 'multiple-choice-group') {
      const ans = answers[currentIdx] || {};
      return currentQ.questions.every((_, idx) => ans[idx] !== undefined);
    }
    if (currentQ.type === 'checkbox') {
      return (answers[currentIdx] || []).length > 0;
    }
    return false;
  };

  if (isDone) {
    let category = "Detektif Pemula";
    if (score >= 90) category = "🏅 Detektif Hebat";
    else if (score >= 70) category = "🥇 Master Pembaca";
    else if (score >= 50) category = "🥈 Agen Terampil";

    return (
      <div className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden bg-[#e6d0a7] font-sans flex flex-col items-center p-4 py-10">
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 bg-white p-8 md:p-12 rounded-[40px] border-8 border-[#FFD84D] shadow-2xl max-w-3xl w-full text-center flex flex-col items-center mt-10"
        >
          <div className="absolute -top-16 bg-[#FFD84D] p-6 rounded-full border-8 border-white shadow-xl">
            <Award size={64} className="text-[#FF7F27]" />
          </div>
          
          <h1 className="font-tropika text-4xl md:text-6xl text-[#FF3B30] mt-10 mb-2 tracking-widest drop-shadow-sm">
            🎉 SELAMAT DETEKTIF!
          </h1>
          
          <div className="bg-green-100 text-green-800 px-6 py-3 rounded-2xl font-black text-lg md:text-xl border-4 border-green-500 shadow-sm mb-8 flex flex-col items-center gap-1 mt-6">
             <span className="text-gray-600 text-sm font-bold">Kategori:</span>
             <span className="text-2xl md:text-3xl flex items-center gap-2 text-center text-green-900"><ShieldCheck size={28} /> {category}</span>
             <span className="text-xl md:text-2xl text-[#F68026] flex items-center gap-2 mt-1"><Star size={24} fill="currentColor" /> {totalMissionScore} Poin</span>
          </div>

          <div className="w-full bg-[#f8f9fa] border-4 border-dashed border-gray-300 p-6 rounded-3xl relative">
            <p className="text-lg md:text-xl font-bold text-gray-700 italic leading-relaxed">
              "Selamat! Kelompok <span className="text-[#FF3B30] font-black">{groupName}</span> berhasil menyelesaikan Petualangan di Museum Detektif dan mendapatkan kategori <span className="text-[#FF3B30] font-black">{category}</span> dengan skor <span className="text-[#FF3B30] font-black">{totalMissionScore} Poin</span>!"
            </p>
          </div>

          <button 
            onClick={async () => {
              // 1. Ambil data saat ini
              const membersStr = localStorage.getItem('destrip_members') || '[]';
              const membersArr = JSON.parse(membersStr);
              const reflectionsStr = localStorage.getItem('destrip_reflections') || '{}';
              const reflectionsObj = JSON.parse(reflectionsStr);
              
              // 2. Format record
              const record = {
                id: Date.now(),
                groupName,
                members: membersArr.filter(m => m.name.trim() !== ''),
                missionScore: totalMissionScore,
                reflections: reflectionsObj,
                category
              };

              // 3. Save to recap (saves locally + to Firestore if configured)
              await saveRecap(record);

              // 4. Clear current session
              localStorage.removeItem('destrip_groupName');
              localStorage.removeItem('destrip_members');
              localStorage.removeItem('destrip_score');
              localStorage.removeItem('destrip_progress');
              localStorage.removeItem('destrip_locked_mission');
              localStorage.removeItem('destrip_reflections');
              localStorage.removeItem('destrip_eval_answers');
              localStorage.removeItem('destrip_eval_currentIdx');
              localStorage.removeItem('destrip_eval_isDone');
              localStorage.removeItem('destrip_eval_score');
              navigate('/');
            }}
            className="mt-10 bg-[#F68026] hover:bg-[#d96a1a] text-white font-tropika text-xl md:text-3xl py-4 px-10 rounded-full shadow-xl border-b-8 border-[#C1272D] active:border-b-0 active:translate-y-2 transition-all tracking-wider"
          >
            KEMBALI KE BERANDA
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden bg-[#e6d0a7] font-sans flex flex-col items-center">
      
      {/* Background System */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]">
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-[98%] md:w-[90%] max-w-[1100px] flex justify-center items-end opacity-40">
          <img src={museumImg} alt="Museum" className="w-full h-auto" />
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-[28%] md:w-[32%] max-w-[450px] opacity-60">
          <img src={leftTreeImg} alt="Left Tree" className="w-full h-full" />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-[28%] md:w-[32%] max-w-[450px] opacity-60">
          <img src={rightTreeImg} alt="Right Tree" className="w-full h-full" />
        </div>
      </div>

      <div className="relative z-20 w-full h-full flex flex-col items-center p-3 md:p-6 max-w-5xl mx-auto min-h-screen">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between relative mb-8 mt-2 z-50">
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer flex-shrink-0"
          >
            <ArrowLeft size={32} className="text-[#FFD84D]" strokeWidth={4} />
          </button>

          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#6B4624] px-4 py-3 md:px-12 md:py-4 rounded-[40px] border-b-[6px] border-[#4A2E1B] shadow-2xl mx-auto mt-16 md:mt-0"
          >
            <h1 
              className="font-tropika text-lg md:text-3xl lg:text-4xl font-black text-[#FFD84D] tracking-widest text-center uppercase drop-shadow-lg" 
              style={{ WebkitTextStroke: '1px #4A2E1B' }}
            >
              🏆 MISI TERAKHIR DETEKTIF
            </h1>
          </motion.div>

          <button 
            onClick={() => navigate('/')}
            className="bg-[#F68026] hover:bg-[#d96a1a] transition-colors w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F68026] active:scale-95 cursor-pointer flex-shrink-0"
          >
            <Home size={32} className="text-[#FFD84D]" strokeWidth={3} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl bg-white/50 backdrop-blur rounded-full h-4 mb-8 border-2 border-black/20 overflow-hidden">
          <motion.div 
            className="bg-[#39B54A] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx) / challengesData.length) * 100}%` }}
          />
        </div>

        {/* Challenge Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full flex-1 flex flex-col items-center pb-32"
          >
            <div className="bg-[#FFD84D] text-[#FF3B30] font-bold text-xl md:text-3xl px-8 py-2 rounded-2xl mb-6 shadow-sm border-2 border-[#FFC107] flex items-center justify-center gap-3 md:gap-4 flex-wrap text-center">
              <span>{currentQ.title}</span>
              <span className="text-gray-800 text-lg md:text-2xl hidden md:inline">-</span>
              <span className="text-gray-800 text-lg md:text-2xl flex items-center gap-2">
                <Users size={24} /> {groupName}
              </span>
              <span className="text-gray-800 text-lg md:text-2xl hidden md:inline">-</span>
              <span className="text-gray-800 text-lg md:text-2xl flex items-center gap-2">
                <Star size={24} className="text-[#F68026] fill-current" /> {totalMissionScore} Poin
              </span>
            </div>
            
            {renderChallenge()}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Footer / Next Button */}
      {isCurrentAnswered() && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-[#e6d0a7] to-transparent z-50 flex justify-center"
        >
          <button
            onClick={handleNext}
            className="bg-[#39B54A] hover:bg-[#2e933c] text-white font-tropika text-xl md:text-2xl py-4 px-16 rounded-full shadow-2xl border-b-8 border-[#228B22] active:border-b-0 active:translate-y-2 transition-all tracking-widest flex items-center gap-2"
          >
            {currentIdx < challengesData.length - 1 ? 'LANJUTKAN' : 'SELESAIKAN MISI'}
            <ArrowLeft className="rotate-180" size={28} />
          </button>
        </motion.div>
      )}

    </div>
  );
}
