import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { missions } from '../data';

export default function MissionSummaryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const mission = missions.find(m => m.id === categoryId);
  const groupName = localStorage.getItem('destrip_groupName') || 'Detektif';
  const score = localStorage.getItem('destrip_score') || '0';

  useEffect(() => {
    const role = localStorage.getItem('destrip_role');
    if (!role) {
      navigate('/');
    }
  }, [navigate]);

  if (!mission) return null;

  return (
    <Layout title="Misi Selesai!" showBack={false}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center h-full mt-10 gap-6"
      >
        
        <div className="relative">
          <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-xl">
            <span className="text-6xl">🏆</span>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-[-20px] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 z-0 rounded-full"
          />
        </div>

        <div className="text-center bg-white p-6 rounded-3xl shadow-lg border-2 border-gray-100 w-full">
          <h2 className="text-2xl font-black text-gray-800 mb-1">Misi Selesai!</h2>
          <p className="text-gray-500 text-sm mb-6">Kelompok <span className="font-bold text-detectivePrimary">{groupName}</span> telah menyelesaikan berkas <span className="font-bold">{mission.title}</span>.</p>
          
          <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-600">Total Skor Saat Ini:</span>
            <div className="flex items-center gap-1 font-black text-xl text-green-600">
              <Award size={24} />
              {score}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/missions')}
            className="w-full bg-detectivePrimary text-detectiveDark font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <span>Pilih Misi Lainnya</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>

      </motion.div>
    </Layout>
  );
}
