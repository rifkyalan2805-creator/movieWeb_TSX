import * as React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import { Pen, FileBadge, Crown } from "lucide-react";

import { fetchMovies, type ApiMovie } from "../services/api";

interface Movie {
  id: string;
  title: string;
  image: string;
  badges?: string[];
}

const formatMovie = (m: ApiMovie): Movie => ({
  id: m.id,
  title: m.title,
  image: m.image,
  badges: m.badges,
});

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("oleromeny");
  const [email, setEmail] = React.useState("oleromeny@gmail.com");
  const [password, setPassword] = React.useState("password123");
  const [isSaved, setIsSaved] = React.useState(false);

  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies().then(data => {
      const mySavedMovies = data.slice(10, 16).map(formatMovie);
      setMovies(mySavedMovies);
    });
  }, []);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-32 px-4 md:px-12 max-w-7xl mx-auto min-h-screen text-white">
        
        <h1 className="text-2xl font-bold mb-10">Profil Saya</h1>

        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16">

          <div className="flex-1 max-w-md">
            
            <div className="flex items-center gap-6 mb-10">
              <img 
                src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png" 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover bg-gray-800"
              />
              <div className="flex flex-col gap-2">
                <button className="border border-blue-600 text-blue-500 hover:bg-blue-600/10 px-4 py-1.5 rounded-full text-sm font-medium transition-colors w-fit">
                  Ubah Foto
                </button>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <FileBadge size={14} />
                  <span>Maksimal 2MB</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              
              <div className="relative border border-gray-700 rounded-md bg-[#181818] p-3 focus-within:border-gray-500 transition-colors">
                 <label className="text-gray-400 text-xs block mb-1">Nama Pengguna</label>
                 <input 
                   type="text" 
                   value={username} 
                   onChange={(e) => setUsername(e.target.value)}
                   className="w-full bg-transparent text-white text-sm focus:outline-none pr-8"
                 />
                 <Pen size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition-colors" />
              </div>

              <div className="relative border border-gray-700 rounded-md bg-[#181818] p-3 focus-within:border-gray-500 transition-colors">
                 <label className="text-gray-400 text-xs block mb-1">Email</label>
                 <input 
                   type="email" 
                   value={email} 
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-transparent text-white text-sm focus:outline-none pr-8"
                 />
              </div>

              <div className="relative border border-gray-700 rounded-md bg-[#181818] p-3 focus-within:border-gray-500 transition-colors">
                 <label className="text-gray-400 text-xs block mb-1">Kata Sandi</label>
                 <input 
                   type="password" 
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-transparent text-white text-sm focus:outline-none pr-8 tracking-widest"
                 />
                 <Pen size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button 
                onClick={handleSave}
                className="bg-[#0f1e93] hover:bg-[#0c1875] text-white px-8 py-2 rounded-full font-medium text-sm transition-colors"
              >
                Simpan
              </button>
              {isSaved && <span className="text-green-500 text-sm animate-in fade-in">Tersimpan!</span>}
            </div>

          </div>

          <div className="flex-1 max-w-lg lg:ml-auto">
            <div className="bg-[#1f2226] border border-gray-800 rounded-xl p-8 flex flex-col items-start shadow-xl">
               <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full shrink-0 bg-[#3041c2]/10 border border-[#3041c2]/20">
                     <Crown size={24} className="text-[#4c6ef5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Saat ini anda belum berlangganan</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
                    </p>
                  </div>
               </div>
               
               <div className="w-full flex justify-end">
                 <button 
                   onClick={() => navigate('/premium')}
                   className="bg-[#2a2d32] hover:bg-[#383c42] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                 >
                   Mulai Berlangganan
                 </button>
               </div>
            </div>
          </div>

        </div>

        <div className="mt-8">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Daftar Saya</h2>
              <button onClick={() => navigate('/daftar-saya')} className="text-sm text-gray-300 hover:text-white transition-colors">Lihat Semua</button>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
             {movies.map((movie) => (
                <div key={movie.id} className="relative group cursor-pointer aspect-[2/3] w-full rounded-md overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {movie.badges?.includes("Episode Baru") && !movie.badges?.includes("Premium") && (
                    <div className="absolute top-2 left-2 bg-[#0F1E93] text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-sm z-20">
                      Episode Baru
                    </div>
                  )}
                  {movie.badges?.includes("Top 10") && (
                    <div className="absolute top-0 right-2 bg-[#e50914] text-white text-[10px] sm:text-xs font-bold px-1.5 py-3 sm:px-2 sm:py-4 rounded-b-md leading-tight text-center z-20">
                      Top<br />10
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end pointer-events-none z-20">
                    <span className="text-white font-medium text-sm truncate pr-2">{movie.title}</span>
                  </div>
                </div>
             ))}
           </div>
        </div>

      </div>
    </MainLayout>
  );
}
