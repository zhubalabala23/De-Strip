import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Layout({ children, title, showBack = true, backTo = "/" }) {
  const navigate = useNavigate();
  const groupName = localStorage.getItem('destrip_groupName') || 'Tamu';
  const score = parseInt(localStorage.getItem('destrip_score') || '0', 10);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col relative max-w-md mx-auto bg-white shadow-xl overflow-hidden">
      {/* Playful Header */}
      <header className="bg-detectivePrimary text-detectiveDark p-4 rounded-b-3xl shadow-sm z-10 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          {showBack && !isLanding ? (
            <button onClick={() => navigate(backTo)} className="p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors">
              <ChevronLeft size={20} />
            </button>
          ) : (
            <div className="w-9"></div> // Placeholder for balance
          )}
          <h1 className="font-bold text-lg text-center flex-1">{title || "Misi Detektif Cilik"}</h1>
          <div className="w-9"></div>
        </div>

        {!isLanding && (
          <div className="flex justify-between items-center px-2">
            <div className="text-sm font-semibold bg-white/60 px-3 py-1 rounded-full shadow-inner">
              🕵️‍♂️ {groupName}
            </div>
            <motion.div 
              key={score}
              initial={{ scale: 1.2, color: '#27AE60' }}
              animate={{ scale: 1, color: '#2D3748' }}
              className="flex items-center gap-1 font-bold bg-white/60 px-3 py-1 rounded-full shadow-inner"
            >
              <Award size={16} className="text-detectiveSecondary" />
              <span>{score} Pts</span>
            </motion.div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-5 relative z-0">
        {children}
      </main>
      
      {/* Decorative bg elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
         <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
         <div className="absolute top-40 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
         <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
