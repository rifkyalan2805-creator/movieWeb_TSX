import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clapperboard, ChevronDown, User, Star, LogOut, Search, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-colors duration-300 ${
        isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="px-3 sm:px-4 md:px-12 py-3 md:py-4 flex items-center justify-between relative">

        {isSearchOpen && (
          <div className="absolute inset-0 z-20 flex items-center bg-[#141414] px-3 sm:hidden">
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 border border-white/30 rounded px-3 py-1.5">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Cari judul, genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
              />
            </form>
            <button onClick={closeSearch} className="ml-3 text-gray-400 hover:text-white transition-colors flex-shrink-0">
              <X size={20} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
          <Link to="/home" className="flex items-center gap-1.5 sm:gap-2">
            <Clapperboard size={20} className="text-white sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-white">
              CHILL
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5 md:gap-8 text-xs sm:text-sm font-medium text-gray-300">
            <Link to="/series" className="hover:text-white transition-colors">Series</Link>
            <Link to="/film" className="hover:text-white transition-colors">Film</Link>
            <Link to="/daftar-saya" className="hover:text-white transition-colors whitespace-nowrap">
              Daftar Saya
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">

          <form
            onSubmit={handleSearch}
            className={`hidden sm:flex items-center transition-all duration-300 ${
              isSearchOpen
                ? "bg-[#141414]/90 border border-white/50 px-3 py-1.5 rounded-sm"
                : "bg-transparent"
            }`}
          >
            <button
              type="button"
              onClick={openSearch}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Search size={20} />
            </button>
            <input
              ref={inputRef}
              type="text"
              placeholder="Cari judul, genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => { if (!searchQuery.trim()) setIsSearchOpen(false); }}
              className={`bg-transparent text-white text-sm focus:outline-none transition-all duration-300 ${
                isSearchOpen ? "w-48 ml-3 opacity-100" : "w-0 opacity-0 pointer-events-none"
              }`}
            />
          </form>

          <button
            onClick={openSearch}
            className="sm:hidden text-white hover:text-gray-300 transition-colors"
          >
            <Search size={20} />
          </button>

          <div className="relative group/profile">
            <div className="flex items-center gap-1 sm:gap-2 cursor-pointer">
              <img
                src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
                alt="User Profile"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover bg-gray-800"
              />
              <ChevronDown
                size={14}
                className="text-white group-hover/profile:rotate-180 transition-transform duration-300"
              />
            </div>

            <div className="absolute right-0 top-full pt-3 md:pt-4 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300">
              <div className="bg-[#181818] rounded-md shadow-2xl py-2 w-44 md:w-48 border border-gray-800">
                <Link to="/profil" className="flex items-center gap-3 px-4 py-3 hover:bg-transparent transition-colors group/item">
                  <User size={18} className="text-white group-hover/item:text-[#4c6ef5] transition-colors" />
                  <span className="text-white group-hover/item:text-[#4c6ef5] font-medium text-sm md:text-base transition-colors">Profil Saya</span>
                </Link>
                <Link to="/premium" className="flex items-center gap-3 px-4 py-3 hover:bg-transparent transition-colors group/item mt-1">
                  <Star size={18} className="text-white group-hover/item:text-[#4c6ef5] transition-colors" />
                  <span className="text-white group-hover/item:text-[#4c6ef5] font-medium text-sm md:text-base transition-colors">Ubah Premium</span>
                </Link>
                <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-transparent transition-colors group/item mt-1 text-left">
                  <LogOut size={18} className="text-white group-hover/item:text-[#4c6ef5] transition-colors" />
                  <span className="text-white group-hover/item:text-[#4c6ef5] font-medium text-sm md:text-base transition-colors">Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
