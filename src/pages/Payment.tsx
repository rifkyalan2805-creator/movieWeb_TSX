import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import { Check, Copy } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

function ElegantLoader() {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#141414] flex flex-col items-center justify-center fade-in">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-gray-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <span className="font-bold text-xl tracking-widest">CHILL</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm tracking-widest uppercase animate-pulse">Memproses Pembayaran</p>
    </div>
  );
}

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const pkg = location.state?.package || {
    id: "individual",
    name: "Individual",
    price: 49000,
    priceLabel: "Mulai dari Rp49,990/bulan",
    accountCount: "1 Akun",
    features: [
      "Tidak ada iklan",
      "Kualitas 720p",
      "Download konten pilihan"
    ]
  };

  const [step, setStep] = React.useState<1 | 2>(1);
  const [method, setMethod] = React.useState<"bca" | "card">("bca");
  const [isLoading, setIsLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState({ h: 0, m: 14, s: 58 });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  React.useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          let { h, m, s } = prev;
          if (s > 0) s--;
          else if (m > 0) { s = 59; m--; }
          else if (h > 0) { m = 59; h--; }
          return { h, m, s };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handlePayStep1 = () => {
    setStep(2);
  };

  const handlePayStep2 = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/home");
    }, 3000); // 3 seconds elegant loader
  };

  if (isLoading) return <ElegantLoader />;

  return (
    <MainLayout>
      <div className="pt-28 pb-20 px-4 md:px-12 max-w-6xl w-full mx-auto min-h-[calc(100vh-140px)] flex flex-col justify-center text-white">
        
        {step === 2 && (
          <div className="bg-[#1f2226] rounded-xl p-6 mb-10 flex flex-col items-center border border-gray-800">
             <p className="text-gray-300 text-sm mb-4">Lakukan Pembayaran Sebelum</p>
             <div className="flex items-center gap-4 text-xl font-bold">
                <div className="flex items-center gap-2"><div className="bg-[#2a2d32] px-3 py-2 rounded text-white">{String(timeLeft.h).padStart(2, '0')}</div><span className="text-sm font-normal text-gray-400">Jam</span></div>
                <span>:</span>
                <div className="flex items-center gap-2"><div className="bg-[#2a2d32] px-3 py-2 rounded text-white">{String(timeLeft.m).padStart(2, '0')}</div><span className="text-sm font-normal text-gray-400">Menit</span></div>
                <span>:</span>
                <div className="flex items-center gap-2"><div className="bg-[#2a2d32] px-3 py-2 rounded text-white">{String(timeLeft.s).padStart(2, '0')}</div><span className="text-sm font-normal text-gray-400">Detik</span></div>
             </div>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-8">Ringkasan Pembayaran</h2>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          <div className="w-full lg:w-[320px] shrink-0">
            <div className="bg-[#3041c2] rounded-2xl p-8 flex flex-col items-center w-full text-white shadow-2xl">
              <div className="bg-[#41454a] bg-opacity-80 rounded-full px-6 py-2 mb-8 font-semibold text-sm">
                {pkg.name}
              </div>

              <div className="text-center mb-2 text-sm">{pkg.priceLabel}</div>
              <div className="text-center mb-8 text-sm font-semibold">{pkg.accountCount}</div>

              <div className="flex flex-col gap-4 w-full mb-8 text-sm">
                {pkg.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check size={16} className="text-white shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto w-full pt-6 border-t border-white/20">
                <button 
                  className="w-full bg-white text-[#3041c2] font-bold py-3 rounded-full mb-3 cursor-default"
                >
                  Langganan
                </button>
                <div className="text-[10px] text-center text-white/70">Syarat dan Ketentuan Berlaku</div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            
            {step === 1 ? (

              <div className="flex flex-col gap-8">
                
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Metode Pembayaran</h3>
                  <div className="flex gap-4 flex-col sm:flex-row">
                    
                    <div 
                      onClick={() => setMethod("card")}
                      className={`flex-1 border rounded-md p-4 flex items-center gap-3 cursor-pointer transition-colors ${method === "card" ? "border-gray-400 bg-[#2a2a2a]" : "border-gray-700 hover:border-gray-500"}`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${method === "card" ? "border-blue-500" : "border-gray-500"}`}>
                         {method === "card" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      <div className="flex gap-1 shrink-0">
                         
                         <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] text-blue-800 font-bold">VISA</div>
                         <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] text-red-600 font-bold">MC</div>
                         <div className="w-8 h-5 bg-white rounded flex items-center justify-center text-[8px] text-green-600 font-bold">JCB</div>
                         <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">AMEX</div>
                      </div>
                      <span className="text-sm font-medium ml-2">Kartu Debit/Kredit</span>
                    </div>

                    <div 
                      onClick={() => setMethod("bca")}
                      className={`flex-1 border rounded-md p-4 flex items-center gap-3 cursor-pointer transition-colors ${method === "bca" ? "border-gray-400 bg-[#2a2a2a]" : "border-gray-700 hover:border-gray-500"}`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${method === "bca" ? "border-blue-500" : "border-gray-500"}`}>
                         {method === "bca" && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      <div className="w-8 h-5 bg-blue-700 rounded flex items-center justify-center text-[8px] text-white font-bold italic shrink-0">BCA</div>
                      <span className="text-sm font-medium ml-2">BCA Virtual Account</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg">Kode Voucher (Jika ada)</h3>
                  <div className="flex gap-4">
                    <Input label="" placeholder="Masukkan kode voucher" className="flex-1 bg-[#141414] border-gray-700" />
                    <Button variant="outline" className="border-gray-600 hover:bg-gray-800">Gunakan</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg">Ringkasan Transaksi</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Paket Premium {pkg.name}</span>
                      <span>Rp{pkg.price.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Biaya Admin</span>
                      <span>Rp3,000</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-base mt-2">
                      <span>Total Pembayaran</span>
                      <span>Rp{(pkg.price + 3000).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Button onClick={handlePayStep1} className="bg-[#0f1e93] hover:bg-[#0c1875] text-white px-8 rounded-full font-bold w-32 py-2.5 mt-4">
                    Bayar
                  </Button>
                </div>
              </div>
            ) : (

              <div className="flex flex-col gap-8">
                
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Metode Pembayaran</h3>
                  <div className="border border-gray-700 rounded-md p-4 flex items-center gap-3 bg-[#1f2226]">
                    <div className="w-4 h-4 rounded-full border border-blue-500 flex items-center justify-center shrink-0">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <div className="w-8 h-5 bg-blue-700 rounded flex items-center justify-center text-[8px] text-white font-bold italic shrink-0">BCA</div>
                    <span className="text-sm font-medium ml-2">BCA Virtual Account</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm text-gray-300 border-b border-gray-700 pb-6">
                   <div className="flex justify-between">
                     <span>Tanggal Pembelian</span>
                     <span>08 Juni 2023</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span>Kode Pembayaran</span>
                     <div className="flex items-center gap-2 font-bold text-white">
                        3KDJ5XFOV <Copy size={14} className="text-blue-500 cursor-pointer" />
                     </div>
                   </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 text-lg">Ringkasan Transaksi</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Paket Premium {pkg.name}</span>
                      <span>Rp{pkg.price.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Biaya Admin</span>
                      <span>Rp3,000</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-base mt-2">
                      <span>Total Pembayaran</span>
                      <span>Rp{(pkg.price + 3000).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-4 text-lg">Tata Cara Pembayaran</h3>
                  <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
                     <li>Buka aplikasi BCA Mobile Banking atau akses BCA Internet Banking.</li>
                     <li>Login ke akun Anda.</li>
                     <li>Pilih menu "Transfer" atau "Pembayaran".</li>
                     <li>Pilih opsi "Virtual Account" atau "Virtual Account Number".</li>
                     <li>Masukkan nomor virtual account dan jumlah pembayaran, lalu konfirmasikan pembayaran.</li>
                  </ol>
                </div>

                <div>
                  <Button onClick={handlePayStep2} className="bg-[#0f1e93] hover:bg-[#0c1875] text-white px-8 rounded-full font-bold w-32 py-2.5 mt-4">
                    Bayar
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </MainLayout>
  );
}
