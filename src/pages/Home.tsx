import * as React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { HeroSection } from "../components/ui/HeroSection";
import { MovieRow } from "../components/ui/MovieRow";
import { fetchMovies, type ApiMovie } from "../services/api";

export default function Home() {
  const [movies, setMovies] = React.useState<ApiMovie[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchMovies().then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center bg-[#141414] text-white">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#185adb] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 font-medium">Memuat Film...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const formatMovie = (m: ApiMovie, aspectRatio: "video" | "poster") => ({
    id: m.id,
    title: m.title,
    image: m.image,
    rating: parseFloat(m.rating),
    badges: m.badges as any,
    aspectRatio,
    type: m.type,
    duration: m.type === "film" ? "2j 15m" : undefined,
    episodes: m.type === "series" ? 12 : undefined,
    genres: [m.genre]
  });

  const lanjutkanTonton = movies.slice(0, 5).map(m => formatMovie(m, "video"));
  const topRating = movies.filter(m => parseFloat(m.rating) >= 4.0).slice(0, 10).map(m => formatMovie(m, "poster"));
  const trending = movies.filter(m => m.isTrending).map(m => formatMovie(m, "poster"));
  const rilisBaru = movies.filter(m => m.isNewRelease).map(m => formatMovie(m, "poster"));

  return (
    <MainLayout>
      <HeroSection />
      
      <div className="relative z-20 mt-6 sm:mt-0 sm:-mt-12 md:-mt-32 space-y-8 md:space-y-12 pb-20">
        {lanjutkanTonton.length > 0 && <MovieRow title="Melanjutkan Tonton Film" movies={lanjutkanTonton} />}
        {topRating.length > 0 && <MovieRow title="Top Rating Film dan Series Hari ini" movies={topRating} />}
        {trending.length > 0 && <MovieRow title="Film Trending" movies={trending} />}
        {rilisBaru.length > 0 && <MovieRow title="Rilis Baru" movies={rilisBaru} />}
      </div>
    </MainLayout>
  );
}

