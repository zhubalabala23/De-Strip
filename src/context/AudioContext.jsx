import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import backsoundUrl from '../audio/backsound_destrip.mp3';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('destrip_audio_volume');
    return saved !== null ? parseFloat(saved) : 0.5; // Default to 50% volume
  });
  const [prevVolume, setPrevVolume] = useState(() => {
    const saved = localStorage.getItem('destrip_audio_prev_volume');
    return saved !== null ? parseFloat(saved) : 0.5;
  });

  const prevPathnameRef = useRef(location.pathname);

  // Automatically pause/play based on routing
  useEffect(() => {
    if (!audioRef.current) return;
    const isMutedPage = location.pathname === '/' || location.pathname === '/teacher-recap';
    if (isMutedPage) {
      audioRef.current.pause();
    } else {
      // If transitioning from Login Page ('/') to Landing Page ('/landing'), reset audio to 0:00
      if (prevPathnameRef.current === '/' && location.pathname === '/landing') {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play().catch(err => {
        console.log("Play blocked on route change to", location.pathname, err);
      });
    }
    prevPathnameRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    // Create the global audio instance
    const audio = new Audio(backsoundUrl);
    audio.loop = false; // We use custom looping logic at 0:55
    audio.volume = volume;
    audioRef.current = audio;

    // Timeupdate listener to handle custom loop at 0:55 (55 seconds)
    const handleTimeUpdate = () => {
      if (audio.currentTime >= 55) {
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Failed to loop play:", err));
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Try playing immediately if not on muted page
    const startPlay = () => {
      const isMutedPage = window.location.pathname === '/' || window.location.pathname === '/teacher-recap';
      if (isMutedPage) return;

      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.log("Autoplay blocked, waiting for user interaction.", err);
        });
    };

    startPlay();

    // Fallback interaction listeners to start playing on first user click/tap/keypress
    const handleInteraction = () => {
      const isMutedPage = window.location.pathname === '/' || window.location.pathname === '/teacher-recap';
      if (isMutedPage) return; // Do not play if interacting on muted page

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(e => console.log("Play on interaction failed:", e));
      } else {
        removeInteractionListeners();
      }
    };

    const removeInteractionListeners = () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      removeInteractionListeners();
      audio.pause();
    };
  }, []);

  // Update volume state, audio node, and localStorage
  const setVolume = (vol) => {
    const newVol = Math.max(0, Math.min(1, vol));
    setVolumeState(newVol);
    localStorage.setItem('destrip_audio_volume', newVol.toString());
    if (newVol > 0) {
      setPrevVolume(newVol);
      localStorage.setItem('destrip_audio_prev_volume', newVol.toString());
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Play failed:", e));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(prevVolume > 0 ? prevVolume : 0.5);
    }
  };

  const setMaxVolume = () => {
    setVolume(1.0);
  };

  const setMinVolume = () => {
    setVolume(0.0);
  };

  return (
    <AudioContext.Provider value={{ volume, isPlaying, setVolume, play, pause, toggleMute, setMaxVolume, setMinVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
