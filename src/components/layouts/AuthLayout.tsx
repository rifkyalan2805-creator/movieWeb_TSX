import * as React from "react";
import { Clapperboard } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export default function AuthLayout({ children, title, subtitle, backgroundImage }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[440px] sm:max-w-[480px] bg-[#18181b]/80 backdrop-blur-xl rounded-2xl p-5 sm:p-8 md:p-12 shadow-2xl border border-white/10">

        <div className="flex justify-center items-center gap-2 mb-6 sm:mb-10">
          <Clapperboard size={26} className="text-white sm:w-9 sm:h-9" />
          <span className="text-3xl sm:text-4xl font-black tracking-tighter text-white">CHILL</span>
        </div>

        <div className="text-center mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{title}</h1>
          <p className="text-gray-300 text-xs sm:text-sm">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
