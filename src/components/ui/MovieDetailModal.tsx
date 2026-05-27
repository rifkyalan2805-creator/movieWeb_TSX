import * as React from "react";
import * as ReactDOM from "react-dom";
import { X, Play, Plus, ThumbsUp, VolumeX, Volume2, ChevronDown } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";
import { fetchMovies, type ApiMovie } from "../../services/api";

export interface EpisodeItem {
  number: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export interface MovieDetail {
  id: string;
  title: string;
  image: string;
  rating?: number;
  ageRating?: string;
  duration?: string;
  episodes?: number;
  type?: "film" | "series";
  genres?: string[];
  year?: number | string;
  cast?: string;
  description?: string;
  producer?: string;
  badges?: ("Episode Baru" | "Top 10" | "Premium")[];
  episodeList?: EpisodeItem[];
}

interface Props {
  movie: MovieDetail;
  onClose: () => void;
}

function generateEpisodes(movie: MovieDetail): EpisodeItem[] {
  if (movie.episodeList) return movie.episodeList;
  const count = Math.min(movie.episodes || 5, 8);
  const titles = [
    "Pilot", "Biscuits", "Trent Crimm: Independent", "For the Children",
    "Tan Lines", "Two Aces", "Make Rebecca Great Again", "The Diamond Dogs",
  ];
  const descs = [
    "Pelatih sepak bola Amerika ditugaskan melatih tim sepak bola Inggris tanpa pengalaman sebelumnya.",
    "Hari pertama melatih berjalan sulit, namun semangat dan optimisme tetap menjadi kunci.",
    "Seorang jurnalis independen menyelidiki tim secara mendalam dengan berbagai pertanyaan tajam.",
    "Seluruh tim bersatu untuk menghadapi tantangan terbesar yang belum pernah mereka hadapi.",
    "Perjalanan panjang membuka babak baru dalam dinamika tim dan hubungan antar pemain.",
    "Dua pemain bintang bersaing sengit, namun menemukan kekuatan sejati dalam kebersamaan.",
    "Manajer umum berjuang menemukan kembali semangat dan jati dirinya di tengah tekanan.",
    "Keputusan besar harus diambil yang akan mengubah nasib tim untuk selamanya.",
  ];
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    title: titles[i] ?? `Episode ${i + 1}`,
    duration: `${25 + (i % 3) * 5} mnt`,
    description: descs[i] ?? "Episode penuh kejutan dan emosi mendalam.",
    thumbnail: movie.image,
  }));
}

function ModalContent({ movie, onClose }: Props) {
  const [muted, setMuted] = React.useState(true);
  const [playingVideo, setPlayingVideo] = React.useState<{id: string; title: string; image: string; type?: "film" | "series"; badges?: string[]} | null>(null);
  const [relatedMovies, setRelatedMovies] = React.useState<ApiMovie[]>([]);
  const isSeries = movie.type === "series";
  const episodes = generateEpisodes(movie);

  React.useEffect(() => {
    fetchMovies().then(data => {
      const genre = movie.genres?.[0] || "";
      const related = data
        .filter(m => m.id !== movie.id && m.genre === genre)
        .slice(0, 6);
      setRelatedMovies(related);
    });
  }, [movie.id, movie.genres]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/75"
      style={{ zIndex: 9999 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      
      <div
        className="relative w-full bg-[#141414] rounded-xl overflow-hidden shadow-2xl flex flex-col"
        style={{ maxWidth: 720, maxHeight: "92vh", margin: "0 12px" }}
      >
        
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] flex-shrink-0">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #141414 0%, rgba(20,20,20,0.6) 40%, transparent 100%)",
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#141414] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
          >
            <X size={18} className="text-white" />
          </button>

          <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-4 sm:left-6">
            <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl drop-shadow-xl">{movie.title}</h2>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 flex items-center gap-2 sm:gap-3">
            <button onClick={() => setPlayingVideo(movie)} className="flex items-center gap-1.5 sm:gap-2 bg-[#3b5bdb] hover:bg-[#4c6ef5] text-white font-semibold px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-colors text-xs sm:text-sm">
              <Play fill="white" size={12} />
              Mulai
            </button>
            <button className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-transparent border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
              <Plus size={14} className="text-white" />
            </button>
            {movie.badges?.includes("Premium") && (
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                Premium
              </span>
            )}
            <button className="w-9 h-9 rounded-full bg-transparent border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
              <ThumbsUp size={15} className="text-white" />
            </button>
          </div>

          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-transparent border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors"
          >
            {muted
              ? <VolumeX size={16} className="text-white" />
              : <Volume2 size={16} className="text-white" />}
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-4 sm:px-6 pb-6 sm:pb-8" style={{ scrollbarWidth: "none" }}>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-5">
            
            <div>
              <div className="flex items-center gap-3 text-sm text-gray-300 mb-3">
                {movie.year && <span className="font-medium">{movie.year}</span>}
                {isSeries && movie.episodes && (
                  <span>{movie.episodes} episode</span>
                )}
                {!isSeries && movie.duration && <span>{movie.duration}</span>}
                <span
                  className="border border-gray-500 text-gray-300 px-1.5 py-0.5 text-xs rounded"
                >
                  {movie.ageRating || "13+"}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {movie.description ||
                  `${movie.title} mengajak penonton dalam petualangan yang penuh emosi, kejutan, dan momen tak terlupakan. Sebuah karya yang memadukan cerita mendalam dengan visual yang memukau.`}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div>
                <span className="text-gray-500">Cast</span>
                <span className="text-gray-400"> : </span>
                <span className="text-gray-300">{movie.cast || "Jason Sudeikis, Brett Goldstein, Brendan Hunt, Nick Mohammed, dan lain-lain"}</span>
              </div>
              <div>
                <span className="text-gray-500">Genre</span>
                <span className="text-gray-400"> : </span>
                <span className="text-gray-300">{movie.genres ? movie.genres.join(", ") : "Komedi, Drama, Olahraga"}</span>
              </div>
              <div>
                <span className="text-gray-500">Pembuat Film</span>
                <span className="text-gray-400"> : </span>
                <span className="text-gray-300">{movie.producer || "Brendan Hunt, Joe Killy, Bill Lawrence"}</span>
              </div>
            </div>
          </div>

          {isSeries && (
            <div className="mt-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Episode</h3>
                {movie.episodes && movie.episodes > 8 && (
                  <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors border border-gray-600 rounded px-3 py-1">
                    Episode 1 <ChevronDown size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-col divide-y divide-gray-800">
                {episodes.map((ep) => (
                  <div
                    key={ep.number}
                    onClick={() => setPlayingVideo({ ...movie, title: `${movie.title} - ${ep.title}` })}
                    className="flex items-center gap-4 py-3 group/ep cursor-pointer hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors"
                  >
                    
                    <span className="text-gray-400 text-xl font-light w-7 text-center flex-shrink-0">
                      {ep.number}
                    </span>

                    <div className="relative flex-shrink-0 w-20 sm:w-28 md:w-32 aspect-video rounded-md overflow-hidden bg-gray-800">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/ep:opacity-100 transition-opacity bg-black/40">
                        <Play fill="white" size={20} className="text-white" />
                      </div>
                    </div>

                     <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between mb-1">
                         <span className="text-white text-xs sm:text-sm font-medium truncate">{ep.title}</span>
                         <span className="text-gray-400 text-[10px] sm:text-xs ml-2 flex-shrink-0">{ep.duration}</span>
                       </div>
                       <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                         {ep.description}
                       </p>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedMovies.length > 0 && (
            <div className="mt-7">
              <h3 className="text-white font-semibold text-lg mb-4">Rekomendasi Serupa</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedMovies.map((rec) => (
                  <div 
                    key={rec.id} 
                    onClick={() => setPlayingVideo({ id: rec.id, title: rec.title, image: rec.image, type: rec.type, badges: rec.badges })}
                    className="relative aspect-[2/3] rounded-md overflow-hidden group/rec cursor-pointer bg-gray-900"
                  >
                    <img src={rec.image} alt={rec.title} className="w-full h-full object-cover transition-transform duration-300 group-hover/rec:scale-105" />
                    
                    {rec.badges?.includes("Premium") && (
                      <div className="absolute top-1.5 left-1.5 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                        Premium
                      </div>
                    )}
                    {rec.badges?.includes("Top 10") && (
                      <div className="absolute top-0 right-1.5 bg-[#e50914] text-white text-[10px] font-bold px-1.5 py-2.5 rounded-b-md leading-tight text-center z-10 shadow-lg">
                        Top<br />10
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/rec:opacity-100 transition-opacity flex items-center justify-center">
                       <Play fill="white" size={32} className="text-white" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-white text-[10px] font-medium truncate">{rec.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {playingVideo && (
        <VideoPlayer
          movie={playingVideo}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </div>
  );
}

export function MovieDetailModal({ movie, onClose }: Props) {

  return ReactDOM.createPortal(
    <ModalContent movie={movie} onClose={onClose} />,
    document.body
  );
}
