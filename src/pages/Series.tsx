import * as React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { HeroSection } from "../components/ui/HeroSection";
import { MovieRow } from "../components/ui/MovieRow";
import { fetchMovies, type ApiMovie } from "../services/api";

export default function Series() {
  const [movies, setMovies] = React.useState<ApiMovie[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedGenre, setSelectedGenre] = React.useState<string>("");

  React.useEffect(() => {
    fetchMovies().then(data => {

      setMovies(data.filter(m => m.type === "series"));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center bg-[#141414] text-white">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-[#185adb] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 font-medium">Memuat Series...</p>
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
    episodes: 12,
    genres: [m.genre]
  });

  const filteredMovies = selectedGenre ? movies.filter(m => m.genre === selectedGenre) : movies;

  const melanjutkanTonton = filteredMovies.slice(0, 5).map(m => formatMovie(m, "video"));
  const persembahanChill = filteredMovies.filter(m => m.badges.includes("Premium")).slice(0, 10).map(m => formatMovie(m, "poster"));
  const topRating = filteredMovies.filter(m => parseFloat(m.rating) >= 4.0).slice(0, 10).map(m => formatMovie(m, "poster"));
  const trending = filteredMovies.filter(m => m.isTrending).map(m => formatMovie(m, "poster"));
  const rilisBaru = filteredMovies.filter(m => m.isNewRelease).map(m => formatMovie(m, "poster"));

  const happinessHero = {
    id: "hero-happiness",
    title: "Happiness",
    description: "Mengisahkan tentang kelompok orang yang berjuang untuk bertahan hidup di dalam sebuah gedung apartemen yang penuh dengan zombie. Sayangnya, virus zombie hanya terdapat di dalam area apartemen tersebut dan tidak menyebar ke luar kawasan apartemen.",
    image: "/hero/img2.png",
    type: "series" as const,
    genres: ["Thriller", "Horror", "Drama"],
    ageRating: "18+"
  };

  return (
    <MainLayout>
      <HeroSection 
        showGenreDropdown={true} 
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        hero={happinessHero}
      />
      
      <div className="relative z-20 mt-6 sm:mt-0 sm:-mt-12 md:-mt-32 pb-20 space-y-8 md:space-y-12">
        {melanjutkanTonton.length > 0 && <MovieRow title="Melanjutkan Tonton Series" movies={melanjutkanTonton} />}
        {persembahanChill.length > 0 && <MovieRow title="Series Persembahan Chill" movies={persembahanChill} />}
        {topRating.length > 0 && <MovieRow title="Top Rating Series Hari ini" movies={topRating} />}
        {trending.length > 0 && <MovieRow title="Series Trending" movies={trending} />}
        {rilisBaru.length > 0 && <MovieRow title="Rilis Baru" movies={rilisBaru} />}
      </div>
    </MainLayout>
  );
}
