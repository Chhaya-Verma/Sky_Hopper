import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => console.error("Error playing audio:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const startAudio = (soundFile) => {
    if (audioRef.current) {
      audioRef.current.src = soundFile;
      audioRef.current.loop = true;
      setCurrentSound(soundFile);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current && currentSound) {
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider value={{ startAudio, stopAudio, pauseAudio, resumeAudio }}>
      {children}
      <audio ref={audioRef} />
    </AudioContext.Provider>
  );
};
