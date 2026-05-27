import * as React from "react";
import { Play, Info, VolumeX, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { VideoPlayer } from "./VideoPlayer";

export interface HeroData {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "film" | "series";
  genres?: string[];
  ageRating?: string;
}

interface HeroSectionProps {
  showGenreDropdown?: boolean;
  onGenreChange?: (genre: string) => void;
  selectedGenre?: string;
  hero?: HeroData;
}

const DEFAULT_HERO: HeroData = {
  id: "hero-duty",
  title: "Duty After School",
  description: "Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.",
  image: "/hero/img3.png",
  type: "series",
  genres: ["Aksi", "Thriller", "Sci-Fi"],
  ageRating: "18+"
};

export function HeroSection({ showGenreDropdown, onGenreChange, selectedGenre, hero = DEFAULT_HERO }: HeroSectionProps = {}) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [playingVideo, setPlayingVideo] = React.useState<{ id: string; title: string; image: string; type?: "film" | "series"; badges?: string[] } | null>(null);

  return (
    <>
      <div className="relative w-full h-[60vh] sm:h-[72vh] md:h-[85vh] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-end sm:items-center pb-10 sm:pb-0">
        
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('${hero.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent"></div>
        </div>

        <div className="relative z-30 px-4 sm:px-6 md:px-12 w-full mt-14 sm:mt-16 md:mt-20">

          <div className="w-full max-w-3xl">
            
            {showGenreDropdown && (
              <div className="relative mb-4 md:mb-6">
                <button
                  className="flex items-center gap-2 bg-[#222222] hover:bg-[#333] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium transition-colors text-sm"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {selectedGenre || "Genre"} <ChevronDown size={16} />
                </button>

                {showDropdown && (
                  <div
                    className="absolute top-full left-0 mt-1 w-[340px] bg-[#222222] border border-gray-700 rounded-md shadow-xl py-3 px-4 z-[100]"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-300">
                      <span 
                        onClick={() => { onGenreChange?.(""); setShowDropdown(false); }}
                        className="hover:bg-gray-700/50 hover:text-white cursor-pointer transition-colors px-3 py-2 rounded"
                      >
                        Semua Genre
                      </span>
                      {[
                        { label: "Action", value: "Action" },
                        { label: "Adventure", value: "Adventure" },
                        { label: "Comedy", value: "Comedy" },
                        { label: "Dokumenter", value: "Documentary" },
                        { label: "Drama", value: "Drama" },
                        { label: "Horror", value: "Horror" },
                        { label: "Sci-Fi", value: "Sci-Fi" }
                      ].map(g => (
                        <span 
                          key={g.value} 
                          onClick={() => { onGenreChange?.(g.value); setShowDropdown(false); }}
                          className="hover:bg-gray-700/50 hover:text-white cursor-pointer transition-colors px-3 py-2 rounded"
                        >
                          {g.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6 leading-tight">
              {hero.title}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm md:text-lg lg:text-xl mb-5 md:mb-8 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none drop-shadow-md">
              {hero.description}
            </p>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Button
                variant="primary"
                className="w-auto px-4 sm:px-6 md:px-8 bg-[#185adb] hover:bg-[#154bb8] flex items-center gap-2 text-sm md:text-base py-2 md:py-2.5"
                onClick={() => setPlayingVideo(hero)}
              >
                <Play fill="white" size={14} />
                <span className="font-bold">Mulai</span>
              </Button>
              <Button variant="outline" className="w-auto px-3 sm:px-5 md:px-6 bg-[#323232]/80 border-transparent hover:bg-[#404040] text-sm md:text-base py-2 md:py-2.5">
                <Info size={16} className="mr-1.5 md:mr-2" />
                <span className="font-bold text-gray-200">Selengkapnya</span>
              </Button>
              {hero.ageRating && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 font-bold text-xs sm:text-sm ml-1 md:ml-2 shrink-0">
                  {hero.ageRating}
                </div>
              )}
            </div>

            <div className="hidden md:flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-400 bg-black/20 backdrop-blur-sm items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
              <VolumeX className="text-white" size={18} />
            </div>
          </div>
        </div>
      </div>

      {playingVideo && (
        <VideoPlayer movie={playingVideo} onClose={() => setPlayingVideo(null)} />
      )}
    </>
  );
}
