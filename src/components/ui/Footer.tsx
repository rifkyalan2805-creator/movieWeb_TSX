
import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#141414] text-gray-400 py-12 px-4 md:px-12 border-t border-[#323232]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-8">

        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Clapperboard size={32} className="text-white" />
            <span className="text-3xl font-black tracking-tighter text-white">
              CHILL
            </span>
          </Link>
          <p className="text-sm mt-2">©2026 Chill All Rights Reserved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 md:gap-32 w-full sm:w-auto">
          
          <div className="flex-1 sm:flex-none">
            <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Genre</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-2 md:gap-y-3 text-xs md:text-sm">
              <Link to="#" className="hover:text-white transition-colors">Aksi</Link>
              <Link to="#" className="hover:text-white transition-colors">Anak-anak</Link>
              <Link to="#" className="hover:text-white transition-colors">Anime</Link>
              <Link to="#" className="hover:text-white transition-colors">Britania</Link>
              <Link to="#" className="hover:text-white transition-colors">Drama</Link>
              <Link to="#" className="hover:text-white transition-colors">Fantasi Ilmiah & Fantasi</Link>
              <Link to="#" className="hover:text-white transition-colors">Kejahatan</Link>
              <Link to="#" className="hover:text-white transition-colors">KDrama</Link>
              <Link to="#" className="hover:text-white transition-colors">Komedi</Link>
              <Link to="#" className="hover:text-white transition-colors">Petualangan</Link>
              <Link to="#" className="hover:text-white transition-colors">Perang</Link>
              <Link to="#" className="hover:text-white transition-colors">Romantis</Link>
              <Link to="#" className="hover:text-white transition-colors">Sains & Alam</Link>
              <Link to="#" className="hover:text-white transition-colors">Thriller</Link>
            </div>
          </div>

          <div className="flex-1 sm:flex-none">
            <h4 className="text-white font-bold mb-3 md:mb-4 text-sm md:text-base">Bantuan</h4>
            <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm">
              <Link to="#" className="hover:text-white transition-colors">FAQ</Link>
              <Link to="#" className="hover:text-white transition-colors">Kontak Kami</Link>
              <Link to="#" className="hover:text-white transition-colors">Privasi</Link>
              <Link to="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
