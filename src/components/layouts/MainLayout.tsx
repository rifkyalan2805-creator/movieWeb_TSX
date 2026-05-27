import * as React from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../ui/Navbar";
import { Footer } from "../ui/Footer";

function SkeletonLoader() {
  const location = useLocation();
  const isMyList = location.pathname === "/daftar-saya";

  if (isMyList) {
    return (
      <div className="animate-pulse w-full pt-24 md:pt-32 px-4 md:px-12 pb-20 fade-in">
        <div className="h-10 bg-[#2a2a2a] rounded-md w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 gap-y-6 md:gap-y-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] w-full bg-[#1e1e1e] rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse w-full flex flex-col fade-in">
      
      <div className="w-full h-[60vh] md:h-[85vh] bg-[#1a1a1a] flex items-end pb-24 md:pb-32 px-4 md:px-12">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="h-12 bg-[#2a2a2a] rounded-md w-3/4" />
          <div className="h-4 bg-[#2a2a2a] rounded w-full mt-2" />
          <div className="h-4 bg-[#2a2a2a] rounded w-5/6" />
          <div className="flex gap-4 mt-6">
            <div className="h-10 bg-[#2a2a2a] rounded-full w-32" />
            <div className="h-10 bg-[#2a2a2a] rounded-full w-32" />
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-16 md:-mt-24 space-y-8 md:space-y-12 px-4 md:px-12 pb-20">
        {[1, 2, 3].map((row) => (
          <div key={row} className="space-y-4">
            <div className="h-6 bg-[#2a2a2a] rounded-md w-48" />
            <div className="flex gap-3 md:gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div key={card} className="flex-none w-[calc(70%-0.5rem)] md:w-[calc(20%-0.8rem)] aspect-video bg-[#1e1e1e] rounded-md" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {

    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // 0.7 seconds skeleton loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#141414] overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="animate-in fade-in duration-200 ease-out">
            {children}
          </div>
        )}
      </main>
      {!loading && <Footer />}
    </div>
  );
}
