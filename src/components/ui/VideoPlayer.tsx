import * as React from "react";
import * as ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  Play, Pause, RotateCcw, RotateCw, Volume2,
  Maximize, Settings, SkipForward, ArrowLeft,
  Download, MonitorPlay, Subtitles, ListVideo,
  MonitorOff
} from "lucide-react";

interface MoviePlayerProps {
  movie: {
    id: string;
    title: string;
    image: string;
    type?: "film" | "series";
    badges?: string[];
  };
  onClose: () => void;
  navigate?: ReturnType<typeof useNavigate>;
}

function PremiumOverlay({ movie, onClose, navigate }: MoviePlayerProps) {
  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 text-white">
      
      <img src={movie.image} alt={movie.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-black/60" />
      
      <button onClick={onClose} className="absolute top-6 left-6 z-50 p-2 hover:bg-white/10 rounded-full transition-colors">
        <ArrowLeft size={24} />
      </button>

      <div className="relative z-10 text-center max-w-3xl md:max-w-5xl mx-auto w-full px-4 md:px-12 flex flex-col items-center pt-8 md:pt-12">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">Layanan Premium</h2>
        <p className="text-gray-300 text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          Film ini khusus untuk pengguna premium. Dapatkan akses tak terbatas ke ribuan film dan series kesukaan kamu!
        </p>

        <p className="text-gray-400 mb-6 md:mb-10 text-xs sm:text-sm md:text-base">Kenapa Harus Berlangganan?</p>

        <div className="grid grid-cols-3 gap-y-6 sm:gap-y-8 md:gap-y-12 gap-x-4 md:gap-x-16 mb-8 md:mb-12 opacity-80 w-full max-w-lg md:max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <Download className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
            <span className="text-[9px] sm:text-xs md:text-sm text-gray-400 leading-tight">Download Konten Pilihan</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="relative">
              <span className="text-[7px] sm:text-[9px] md:text-xs font-bold text-white border border-white px-1 rounded absolute -top-1.5 -right-2 md:-right-3 bg-black z-10 scale-75 line-through">ADS</span>
              <MonitorOff className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
            </div>
            <span className="text-[9px] sm:text-xs md:text-sm text-gray-400 leading-tight">Tidak Ada Iklan</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <MonitorPlay className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
            <span className="text-[9px] sm:text-xs md:text-sm text-gray-400 leading-tight">Tonton Semua Konten</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <div className="px-1 md:px-2 py-0.5 md:py-1 border border-white md:border-2 rounded text-[8px] md:text-sm font-bold text-white leading-none">4K</div>
            <span className="text-[9px] sm:text-xs md:text-sm text-gray-400 leading-tight">Kualitas Maksimal 4K</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <MonitorPlay className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
            <span className="text-[9px] sm:text-xs md:text-sm text-gray-400 leading-tight">Tonton di Tv & Mobile</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <Subtitles className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10" />
            <span className="text-[9px] sm:text-xs md:text-sm text-gray-400 leading-tight">Subtitle Konten Pilihan</span>
          </div>
        </div>

        <button 
          onClick={() => { onClose(); if (navigate) navigate("/premium"); }} 
          className="bg-[#1e40af] hover:bg-[#1d4ed8] text-white px-8 md:px-12 py-2.5 md:py-3.5 rounded-full font-semibold text-sm md:text-base transition-colors"
        >
          Ubah Jadi Premium
        </button>
      </div>
    </div>
  );
}

function NormalPlayer({ movie, onClose }: MoviePlayerProps) {
  return (
    <div className="absolute inset-0 bg-black flex flex-col justify-between z-50 text-white">
      
      <img src={movie.image} alt={movie.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2">
          <ArrowLeft size={24} />
        </button>
        <button onClick={onClose} className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
          Lewati Intro
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/80 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-auto cursor-pointer hover:scale-110 transition-transform">
          <Pause fill="white" size={32} />
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3 sm:gap-6">
            <Play fill="white" size={20} className="cursor-pointer hover:text-gray-300 transition-colors" />
            <RotateCcw size={20} className="cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />
            <RotateCw size={20} className="cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />
            <Volume2 size={20} className="cursor-pointer hover:text-gray-300 transition-colors" />
          </div>

          <div className="text-[10px] sm:text-sm font-semibold truncate max-w-[40%] text-center opacity-80 mx-2">
            {movie.title} {movie.type === "series" ? "Episode 1: Pilot" : ""}
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <SkipForward size={20} className="cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />
            <ListVideo size={20} className="cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />
            <Subtitles size={20} className="cursor-pointer hover:text-gray-300 transition-colors" />
            <Settings size={20} className="cursor-pointer hover:text-gray-300 transition-colors" />
            <Maximize size={20} className="cursor-pointer hover:text-gray-300 transition-colors hidden sm:block" />
          </div>
        </div>

        <div className="w-full h-1 bg-gray-600 rounded-full cursor-pointer relative group">
          <div className="absolute h-full w-1/4 bg-red-600 rounded-full"></div>
          <div className="absolute h-3 w-3 bg-red-600 rounded-full top-1/2 -translate-y-1/2 left-1/4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
}

export function VideoPlayer({ movie, onClose }: MoviePlayerProps) {
  const navigate = useNavigate();
  const isPremium = movie.badges?.includes("Premium");

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[99999] bg-black animate-in fade-in duration-300">
      {isPremium ? <PremiumOverlay movie={movie} onClose={onClose} navigate={navigate} /> : <NormalPlayer movie={movie} onClose={onClose} />}
    </div>,
    document.body
  );
}
