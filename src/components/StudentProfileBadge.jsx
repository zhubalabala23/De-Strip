import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import logoTrilogi from '../assets/logo_trilogi/trilogi.png';

export default function StudentProfileBadge({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 lg:p-3 border border-white/90 shadow-lg hover:shadow-xl transition-all duration-200 select-none group pointer-events-auto max-w-[calc(100vw-24px)] sm:max-w-xs ${className}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Logo Universitas Trilogi */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl bg-white p-1 shadow-xs border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
          <img 
            src={logoTrilogi} 
            alt="Logo Universitas Trilogi" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details Mahasiswa */}
        <div className="flex flex-col min-w-0 pr-0.5">
          <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-wider text-blue-600 leading-none">
            UNIVERSITAS TRILOGI
          </span>
          <span className="font-black text-slate-800 text-[11px] sm:text-xs lg:text-[13.5px] leading-tight mt-0.5 truncate">
            Lailia Tajalla
          </span>
          <a 
            href="mailto:lalanana418@gmail.com"
            className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors mt-0.5"
            title="Kirim Email"
          >
            <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 shrink-0" />
            <span className="truncate">lalanana418@gmail.com</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
