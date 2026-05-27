import * as React from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import { fetchMovies, type ApiMovie } from "../services/api";
import { Star, Play, Check, ChevronDown, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { MovieDetailModal, type MovieDetail } from "../components/ui/MovieDetailModal";
import { VideoPlayer } from "../components/ui/VideoPlayer";

interface Movie {
  id: string;
  title: string;
  image: string;
  rating?: number;
  badges?: ("Episode Baru" | "Top 10" | "Premium")[];
  aspectRatio?: "video" | "poster";
  ageRating?: string;
  duration?: string;
  episodes?: number;
  type?: "film" | "series";
  genres?: string[];
}

const formatMovie = (m: ApiMovie): Movie => ({
  id: m.id,
  title: m.title,
  image: m.image,
  rating: parseFloat(m.rating),
  badges: m.badges as any,
  aspectRatio: "poster",
  type: m.type,
  duration: m.type === "film" ? "2j 15m" : undefined,
  episodes: m.type === "series" ? 12 : undefined,
  genres: [m.genre]
});

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  const [hoverPosition, setHoverPosition] = React.useState<Record<string, "left" | "center" | "right">>({});
  const [activeDetail, setActiveDetail] = React.useState<MovieDetail | null>(null);
  const [playingVideo, setPlayingVideo] = React.useState<Movie | null>(null);
  const [activeCard, setActiveCard] = React.useState<string | null>(null);
  const [isTouchDevice] = React.useState(
    typeof window !== 'undefined' ? ('ontouchstart' in window || navigator.maxTouchPoints > 0) : false
  );

  React.useEffect(() => {
    setLoading(true);
    fetchMovies()
      .then(data => {
        const q = query.toLowerCase();
        const filtered = data.filter(m => {
          const titleMatch = m.title ? m.title.toLowerCase().includes(q) : false;
          const genreMatch = m.genre ? m.genre.toLowerCase().includes(q) : false;
          return titleMatch || genreMatch;
        });
        setMovies(filtered.map(formatMovie));
      })
      .catch(err => {
        console.error("Search fetch error:", err);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  React.useEffect(() => {
    if (!activeCard) return;
    const handler = () => setActiveCard(null);
    document.addEventListener("touchstart", handler);
    return () => document.removeEventListener("touchstart", handler);
  }, [activeCard]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftEdge = rect.left < 100;
    const isRightEdge = window.innerWidth - rect.right < 100;

    let position: "left" | "center" | "right" = "center";
    if (isLeftEdge) position = "left";
    else if (isRightEdge) position = "right";

    setHoverPosition((prev) => ({ ...prev, [id]: position }));
  };

  const getHoverPositionWrapperClasses = (id: string) => {
    const pos = hoverPosition[id] || "center";
    if (pos === "left") return "left-0 translate-x-3 md:translate-x-1";
    if (pos === "right") return "right-0 left-auto -translate-x-3 md:-translate-x-1";
    return "left-1/2 -translate-x-1/2";
  };

  const getHoverOriginClasses = (id: string) => {
    const pos = hoverPosition[id] || "center";
    if (pos === "left") return "origin-left";
    if (pos === "right") return "origin-right";
    return "origin-center";
  };

  return (
    <>
    <MainLayout>
      <div className="pt-24 md:pt-32 px-4 md:px-12 pb-20 min-h-screen">
        <h1 className="text-xl md:text-3xl font-medium text-gray-400 mb-8">
          Hasil pencarian untuk <span className="text-white font-bold">"{query}"</span>
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#185adb] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">Tidak ada film atau series yang cocok dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 gap-y-6 md:gap-y-8">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onMouseEnter={(e) => { if (!isTouchDevice) handleMouseEnter(e, movie.id); }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  if (activeCard === movie.id) {
                    setPlayingVideo(movie);
                    setActiveCard(null);
                  } else {
                    setActiveCard(movie.id);
                  }
                }}
                className="relative group cursor-pointer transition-transform duration-300 hover:z-50 pointer-events-auto aspect-[2/3] w-full"
              >
                
                <div className="w-full h-full rounded-md overflow-hidden relative bg-gray-900">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div
                    className={cn(
                      "absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center gap-3 z-30",
                      activeCard === movie.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <div 
                      onClick={(e) => { e.stopPropagation(); setPlayingVideo(movie); }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/30 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Play fill="white" size={14} className="translate-x-0.5" />
                    </div>
                    <div 
                      onClick={(e) => { e.stopPropagation(); setActiveDetail(movie); }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/30 hover:scale-110 transition-transform cursor-pointer md:hidden"
                    >
                      <Info size={14} className="text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 flex items-end md:hidden z-20">
                    <span className="text-white text-[10px] sm:text-xs font-medium truncate pr-1 leading-tight">{movie.title}</span>
                  </div>

                  {movie.badges?.includes("Premium") && (
                    <div className="absolute top-1.5 left-1.5 bg-yellow-500 text-black text-[9px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-full z-20">
                      Premium
                    </div>
                  )}
                  {movie.badges?.includes("Top 10") && (
                    <div className="absolute top-0 right-1.5 sm:right-2 bg-[#e50914] text-white text-[9px] sm:text-[10px] md:text-xs font-bold px-1 py-2 sm:px-1.5 sm:py-3 md:px-2 md:py-4 rounded-b-md leading-tight text-center z-20">
                      Top<br />10
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 justify-between items-end pointer-events-none z-20 hidden md:flex">
                    <span className="text-white font-medium text-sm truncate pr-2">{movie.title}</span>
                    {movie.rating && (
                      <span className="text-gray-300 text-xs flex items-center shrink-0">
                        <Star size={12} className="text-yellow-500 mr-1 fill-yellow-500" />
                        {movie.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>

                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 z-50 pointer-events-none group-hover:pointer-events-auto hidden md:block w-[180%]",
                  getHoverPositionWrapperClasses(movie.id)
                )}>
                  <div className={cn(
                    "w-full bg-[#181818] rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.9)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-100 scale-95 transition-all duration-300 delay-300 group-hover:delay-500",
                    getHoverOriginClasses(movie.id)
                  )}>
                    <div className="relative w-full aspect-video rounded-t-xl overflow-hidden bg-gray-900">
                      <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPlayingVideo(movie); }}
                            onMouseDown={(e) => e.preventDefault()}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Play fill="black" size={16} className="text-black translate-x-0.5" />
                          </button>
                          <button className="w-8 h-8 rounded-full bg-transparent border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                            <Check size={16} className="text-white" />
                          </button>
                        </div>
                        <div className="relative group/tooltip">
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveDetail(movie); }}
                            onMouseDown={(e) => e.preventDefault()}
                            className="w-8 h-8 rounded-full bg-transparent border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors"
                          >
                            <ChevronDown size={16} className="text-white pointer-events-none" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[13px] font-medium text-gray-300 mt-1">
                        <span className="border border-gray-500 px-1.5 py-0.5 text-xs">{movie.ageRating || "13+"}</span>
                        <span>
                          {movie.type === "film" || movie.duration
                            ? movie.duration || "1j 46m"
                            : `${movie.episodes || 16} Episode`}
                        </span>
                        <span className="border border-gray-500 px-1.5 py-0.5 text-xs rounded-sm">HD</span>
                      </div>

                      <div className="flex items-center flex-wrap gap-1.5 text-[12px] text-gray-400">
                        {(movie.genres || ["Misteri", "Kriminal", "Fantasi"]).map((genre, i, arr) => (
                          <React.Fragment key={genre}>
                            <span className="font-semibold text-gray-300">{genre}</span>
                            {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-gray-500 inline-block mx-0.5" />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
    
    {activeDetail && (
      <MovieDetailModal
        movie={activeDetail}
        onClose={() => setActiveDetail(null)}
      />
    )}

    {playingVideo && (
      <VideoPlayer
        movie={playingVideo}
        onClose={() => setPlayingVideo(null)}
      />
    )}
    </>
  );
}
