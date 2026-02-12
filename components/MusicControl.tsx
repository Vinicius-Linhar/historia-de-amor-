import React, { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  src?: string;
}

export const MusicControl: React.FC<MusicControlProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      // Local background music
      audioRef.current = new Audio("public/images/musica.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed):", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <div
        className={`bg-white p-2 pl-3 rounded-full shadow-kawaii-hover border-2 border-kawaii-pink flex items-center gap-3 transition-all duration-300 ${isPlaying ? 'pr-4' : ''}`}
      >
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-kawaii-pink text-white rounded-full hover:bg-kawaii-hotpink transition-colors shadow-sm"
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>

        {isPlaying && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="flex gap-1 h-4 items-end">
              <span className="w-1.5 bg-kawaii-mint h-2 animate-bounce rounded-full"></span>
              <span className="w-1.5 bg-kawaii-blue h-4 animate-bounce delay-75 rounded-full"></span>
              <span className="w-1.5 bg-kawaii-lavender h-3 animate-bounce delay-150 rounded-full"></span>
            </div>
            <button onClick={toggleMute} className="text-gray-400 hover:text-kawaii-hotpink ml-2">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};