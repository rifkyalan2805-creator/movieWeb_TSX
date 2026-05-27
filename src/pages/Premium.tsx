import * as React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import { Download, MonitorOff, MonitorPlay, Subtitles, Check, ChevronDown } from "lucide-react";

const PACKAGES = [
  {
    id: "individual",
    name: "Individual",
    price: 49900,
    priceLabel: "Mulai dari Rp49,990/bulan",
    accountCount: "1 Akun",
    features: [
      "Tidak ada iklan",
      "Kualitas 720p",
      "Download konten pilihan"
    ]
  },
  {
    id: "berdua",
    name: "Berdua",
    price: 79900,
    priceLabel: "Mulai dari Rp79,990/bulan",
    accountCount: "2 Akun",
    features: [
      "Tidak ada iklan",
      "Kualitas 1080p",
      "Download konten pilihan"
    ]
  },
  {
    id: "keluarga",
    name: "Keluarga",
    price: 159990,
    priceLabel: "Mulai dari Rp159,990/bulan",
    accountCount: "5-7 Akun",
    features: [
      "Tidak ada iklan",
      "Kualitas 4K",
      "Download konten pilihan"
    ]
  }
];

export default function Premium() {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="pt-24 sm:pt-28 pb-20 sm:pb-32 px-4 md:px-12 flex flex-col items-center justify-center min-h-screen text-white">

        <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-16 text-center">Kenapa Harus Berlangganan?</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 sm:gap-y-16 gap-x-4 sm:gap-x-12 mb-20 sm:mb-32 max-w-5xl mx-auto text-center px-2">
          <div className="flex flex-col items-center gap-4">
             <Download size={36} className="text-gray-300" />
             <span className="text-sm text-gray-300">Download Konten Pilihan</span>
          </div>
          <div className="flex flex-col items-center gap-4">
             <div className="relative">
               <span className="text-xs font-bold text-gray-300 border border-gray-300 px-1 rounded absolute -top-1 -right-2 bg-[#141414] z-10 scale-75 line-through">ADS</span>
               <MonitorOff size={36} className="text-gray-300" />
             </div>
             <span className="text-sm text-gray-300">Tidak Ada Iklan</span>
          </div>
          <div className="flex flex-col items-center gap-4">
             <MonitorPlay size={36} className="text-gray-300" />
             <span className="text-sm text-gray-300">Tonton Semua Konten</span>
          </div>
          <div className="flex flex-col items-center gap-4">
             <div className="px-2 py-1 border-2 border-gray-300 rounded text-xs font-bold text-gray-300 leading-none flex items-center justify-center h-[36px]">4K</div>
             <span className="text-sm text-gray-300">Kualitas Maksimal<br/>Sampai Dengan 4K</span>
          </div>
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center justify-center h-[36px]">
                <MonitorPlay size={32} className="text-gray-300" />
             </div>
             <span className="text-sm text-gray-300">Tonton di Tv, Tablet,<br/>Mobile, dan Laptop</span>
          </div>
          <div className="flex flex-col items-center gap-3 sm:gap-4">
             <Subtitles size={36} className="text-gray-300 w-8 h-8 sm:w-9 sm:h-9" />
             <span className="text-xs sm:text-sm text-gray-300">Subtitle Untuk Konten<br/>Pilihan</span>
          </div>
        </div>

        <div 
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
          className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity animate-bounce mt-4 cursor-pointer"
        >
          <span className="text-xs mb-1 font-medium tracking-wider">Gulir Ke Bawah</span>
          <ChevronDown size={20} />
        </div>

      </div>

      <div className="bg-[#1f2226] w-full pt-16 pb-32 px-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-white">Pilih Paketmu</h2>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 w-full max-w-6xl mx-auto px-4">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-[#3041c2] rounded-2xl p-8 flex flex-col items-center w-full max-w-[320px] mx-auto lg:max-w-none lg:flex-1 text-white relative shadow-2xl">
              <div className="bg-[#41454a] bg-opacity-80 rounded-full px-6 py-2 mb-8 font-semibold text-sm">
                {pkg.name}
              </div>

              <div className="text-center mb-2 text-sm">{pkg.priceLabel}</div>
              <div className="text-center mb-8 text-sm font-semibold">{pkg.accountCount}</div>

              <div className="flex flex-col gap-4 w-full mb-8 text-sm">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check size={16} className="text-white shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto w-full pt-6 border-t border-white/20">
                <button 
                  onClick={() => navigate(`/payment`, { state: { package: pkg } })}
                  className="w-full bg-white text-[#3041c2] hover:bg-gray-100 font-bold py-3 rounded-full transition-colors mb-3"
                >
                  Langganan
                </button>
                <div className="text-[10px] text-center text-white/70">Syarat dan Ketentuan Berlaku</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
