import React, { useState } from 'react';
import { Volume2, VolumeX, Volume, Volume1 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

/**
 * AudioToggleButton Component
 * @param {'icon' | 'pill' | 'compact'} variant - visual style of the button
 * @param {string} className - extra classes to apply to container
 * @param {string} size - size helper ('sm' | 'md' | 'lg')
 * @param {boolean} showSlider - whether to include volume slider
 */
export default function AudioToggleButton({ 
  variant = 'icon', 
  className = '', 
  size = 'md',
  showSlider = true 
}) {
  const { volume, setVolume, isAudioOn, toggleMusic } = useAudio();
  const [showSliderDropdown, setShowSliderDropdown] = useState(false);

  const getVolumeIcon = (iconSize = 22) => {
    if (!isAudioOn || volume === 0) {
      return <VolumeX size={iconSize} className="text-white drop-shadow" />;
    }
    if (volume < 0.3) {
      return <Volume size={iconSize} className="text-white drop-shadow" />;
    }
    if (volume < 0.7) {
      return <Volume1 size={iconSize} className="text-white drop-shadow" />;
    }
    return <Volume2 size={iconSize} className="text-white drop-shadow" />;
  };

  // Variant: "pill" (Ideal for Desktop Landing Page with full label and integrated slider)
  if (variant === 'pill') {
    return (
      <div className={`relative flex items-center gap-2.5 bg-[#1c2834]/85 backdrop-blur-md px-3 py-1.5 rounded-full border-2 border-white/20 shadow-2xl transition-all ${className}`}>
        {/* Toggle Button */}
        <button
          onClick={toggleMusic}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md active:scale-95 border-2 ${
            isAudioOn
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white border-green-300'
              : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border-red-300'
          }`}
          title={isAudioOn ? 'Klik untuk Mematikan Musik' : 'Klik untuk Mengaktifkan Musik'}
        >
          <span className="relative flex items-center justify-center">
            {isAudioOn ? (
              <Volume2 size={18} className="text-white animate-pulse" />
            ) : (
              <VolumeX size={18} className="text-white" />
            )}
          </span>
          <span className="font-extrabold tracking-wide text-[11px] md:text-xs">
            {isAudioOn ? 'Musik ON' : 'Musik OFF'}
          </span>
          {/* Status Indicator Dot */}
          <span className={`w-2 h-2 rounded-full ${isAudioOn ? 'bg-white shadow-[0_0_8px_#fff]' : 'bg-white/60'}`} />
        </button>

        {/* Volume Slider (Only active if sound is ON) */}
        {showSlider && (
          <div className="flex items-center gap-2 pl-1 border-l border-white/20">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isAudioOn ? volume : 0}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
              }}
              className="volume-slider w-16 md:w-20 cursor-pointer accent-yellow-400"
              style={{
                background: `linear-gradient(to right, #FFD84D ${(isAudioOn ? volume : 0) * 100}%, rgba(255, 255, 255, 0.2) ${(isAudioOn ? volume : 0) * 100}%)`
              }}
              title={`Volume: ${isAudioOn ? Math.round(volume * 100) : 0}%`}
            />
            <span className="text-white/80 font-mono text-[10px] w-7 text-right select-none font-bold">
              {isAudioOn ? `${Math.round(volume * 100)}%` : '0%'}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Variant: "compact" (Badge / Pill without slider, good for mobile header)
  if (variant === 'compact') {
    return (
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all border-2 cursor-pointer ${
          isAudioOn
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-green-300'
            : 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-300'
        } ${className}`}
        title={isAudioOn ? 'Matikan Musik' : 'Aktifkan Musik'}
      >
        {isAudioOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span className="text-[10px] md:text-xs font-black">{isAudioOn ? 'ON' : 'OFF'}</span>
      </button>
    );
  }

  // Variant: "icon" (Default round game-styled button for headers)
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 md:w-16 md:h-16',
    lg: 'w-14 h-14 md:w-20 md:h-20'
  }[size] || 'w-12 h-12 md:w-16 md:h-16';

  const iconSizes = {
    sm: 18,
    md: 26,
    lg: 32
  }[size] || 26;

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleMusic}
        className={`relative ${sizeClasses} rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer border-4 active:scale-95 ${
          isAudioOn
            ? 'bg-gradient-to-b from-[#22c55e] to-[#15803d] hover:from-[#16a34a] hover:to-[#166534] border-[#FFD84D]'
            : 'bg-gradient-to-b from-[#ef4444] to-[#b91c1c] hover:from-[#dc2626] hover:to-[#991b1b] border-white/60'
        } ${className}`}
        title={isAudioOn ? 'Musik Aktif (Klik untuk Matikan)' : 'Musik Mati (Klik untuk Hidupkan)'}
      >
        {/* Main Icon */}
        <div className="text-white flex items-center justify-center">
          {getVolumeIcon(iconSizes)}
        </div>

        {/* Status Badge ON/OFF */}
        <span 
          className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider shadow border border-white leading-none ${
            isAudioOn 
              ? 'bg-[#FFD84D] text-[#1c2834]' 
              : 'bg-white text-[#ef4444]'
          }`}
        >
          {isAudioOn ? 'ON' : 'OFF'}
        </span>
      </motion.button>
    </div>
  );
}
