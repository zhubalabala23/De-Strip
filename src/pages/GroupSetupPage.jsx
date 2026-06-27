import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight, ArrowLeft } from 'lucide-react';
import museumImg from '../assets/images/museum.webp';
import leftTreeImg from '../assets/images/left_tree.webp';
import rightTreeImg from '../assets/images/right_tree.webp';
import fanImg from '../assets/images/fan.webp';
import characterImg from '../assets/images/charachter.webp';

export default function GroupSetupPage() {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([
    { name: '', absen: '' },
    { name: '', absen: '' },
    { name: '', absen: '' },
    { name: '', absen: '' },
    { name: '', absen: '' }
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedGroupName = localStorage.getItem('destrip_groupName');
    const savedMembers = localStorage.getItem('destrip_members');

    if (savedGroupName) {
      setGroupName(savedGroupName);
    }

    if (savedMembers) {
      try {
        const parsedMembers = JSON.parse(savedMembers);
        if (Array.isArray(parsedMembers) && parsedMembers.length > 0) {
          // Ensure we always have 5 slots
          const filledMembers = [...parsedMembers];
          while (filledMembers.length < 5) {
            filledMembers.push({ name: '', absen: '' });
          }
          setMembers(filledMembers.slice(0, 5));
        }
      } catch (e) {
        console.error('Error parsing members from localStorage', e);
      }
    }
  }, []);

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleStart = (e) => {
    e.preventDefault();

    if (groupName.trim() === '') {
      setAlertMessage('Nama Kelompok wajib diisi!');
      setShowAlert(true);
      return;
    }

    let hasAtLeastOneMember = false;
    let hasPartialMember = false;
    let hasInvalidAbsen = false;
    let hasDuplicateAbsen = false;
    const absenList = [];

    for (let m of members) {
      const hasName = m.name.trim() !== '';
      const hasAbsen = m.absen.trim() !== '';

      if (hasAbsen) {
        const cleanAbsen = m.absen.trim();
        if (!/^\d+$/.test(cleanAbsen)) {
          hasInvalidAbsen = true;
        } else {
          if (absenList.includes(cleanAbsen)) {
            hasDuplicateAbsen = true;
          }
          absenList.push(cleanAbsen);
        }
      }
      
      if (hasName && hasAbsen) {
        hasAtLeastOneMember = true;
      } else if (hasName || hasAbsen) {
        hasPartialMember = true;
      }
    }

    if (hasInvalidAbsen) {
      setAlertMessage('Harap isi Nomor Absen dengan benar (Hanya Angka)!');
      setShowAlert(true);
      return;
    }

    if (hasDuplicateAbsen) {
      setAlertMessage('Nomor absen tidak boleh sama!');
      setShowAlert(true);
      return;
    }

    if (!hasAtLeastOneMember) {
      setAlertMessage('Minimal 1 anggota kelompok wajib diisi lengkap (Nama & No. Absen)!');
      setShowAlert(true);
      return;
    }

    if (hasPartialMember) {
      setAlertMessage('Nama dan Nomor Absen setiap anggota harus diisi lengkap!');
      setShowAlert(true);
      return;
    }

    const existingGroup = localStorage.getItem('destrip_groupName');
    
    // Reset progress ONLY if they enter a different group name
    if (existingGroup !== groupName) {
      localStorage.setItem('destrip_score', '0');
      localStorage.removeItem('destrip_progress');
      localStorage.removeItem('destrip_locked_mission');
      localStorage.removeItem('destrip_reflections');
      localStorage.removeItem('destrip_eval_answers');
      localStorage.removeItem('destrip_eval_currentIdx');
      localStorage.removeItem('destrip_eval_isDone');
      localStorage.removeItem('destrip_eval_score');
    }

    localStorage.setItem('destrip_groupName', groupName);
    localStorage.setItem('destrip_members', JSON.stringify(members));
    navigate('/missions');
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-[#e6d0a7] font-sans flex flex-col items-center">
      
      {/* Background System */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]">
        <div className="absolute bottom-0 left-0 right-0 mx-auto w-[98%] md:w-[90%] max-w-[1100px] flex justify-center items-end">
          <img src={museumImg} alt="Museum" className="w-full h-auto opacity-70" />
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-[28%] md:w-[32%] max-w-[450px]">
          <img src={leftTreeImg} alt="Left Tree" className="w-full h-full" />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-[28%] md:w-[32%] max-w-[450px]">
          <img src={rightTreeImg} alt="Right Tree" className="w-full h-full" />
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
              className="font-tropika text-2xl md:text-4xl font-black text-[#FFD84D] tracking-widest origin-center" 
              style={{ WebkitTextStroke: '2px #4A2E1B' }}
            >
              IDENTITAS DETEKTIF
            </motion.h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mb-10"
        >
          <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-8 md:p-10 rounded-[30px] shadow-2xl border-4 border-white">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto text-detectiveBlue">
              <Users size={40} />
            </div>
            <p className="text-center text-gray-600 text-sm md:text-base mb-8">
              Sebelum memulai penyelidikan, apa nama kelompok detektif kalian?
            </p>

          <form onSubmit={handleStart} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="groupName" className="font-semibold text-sm text-gray-800">Nama Kelompok</label>
              <input 
                id="groupName"
                type="text" 
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Misal: Detektif Harimau"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-detectivePrimary focus:ring-4 focus:ring-detectivePrimary/20 outline-none transition-all font-medium bg-gray-50/50"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end border-b-2 border-gray-100 pb-2">
                <label className="font-semibold text-xs sm:text-sm text-gray-800">Anggota Kelompok (Maks. 5 Orang)</label>
                <span className="w-20 text-center text-xs font-bold text-gray-500 mr-2">Nomor Absen</span>
              </div>

              {members.map((member, index) => (
                <div key={index} className="flex gap-2 items-center bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <div className="bg-detectivePrimary/20 text-detectiveDark font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    placeholder="Nama Lengkap"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 focus:border-detectivePrimary outline-none text-sm"
                  />
                  <input
                    type="text"
                    value={member.absen}
                    onChange={(e) => handleMemberChange(index, 'absen', e.target.value)}
                    placeholder="No. Absen"
                    className="w-20 px-3 py-2 rounded-lg border border-gray-200 focus:border-detectivePrimary outline-none text-sm"
                  />
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-4 w-full bg-detectivePrimary text-detectiveDark font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Lanjut ke Berkas Misi</span>
              <ArrowRight size={20} />
            </motion.button>
          </form>
        </div>
        </motion.div>
      </div>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-4 border-[#FF7F27] flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">!</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-tropika tracking-wider">Tunggu Dulu!</h3>
            <p className="text-gray-600 mb-6">{alertMessage}</p>
            <button 
              onClick={() => setShowAlert(false)}
              className="bg-[#FF7F27] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#d96a1a] transition-colors w-full shadow-lg border-b-4 border-[#E56E1D] active:translate-y-1 active:border-b-0"
            >
              Mengerti
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
