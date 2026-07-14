"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, UserCircle, Settings, FileText, Package, Loader2 } from "lucide-react";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  
  // Shared state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const syncGuestCart = async () => {
    try {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (guestCart.length > 0) {
        for (const item of guestCart) {
          await fetch('/api/cart', { 
            method: 'POST', 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ productId: item.productId, quantity: item.quantity }) 
          });
        }
        localStorage.removeItem("guestCart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error("Failed to sync guest cart", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response from server:", text);
        throw new Error("Server returned an unexpected response. Please try again.");
      }
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to sign in");
      }
      
      // Success - Sync cart and redirect
      await syncGuestCart();
      
      if (searchParams.get("checkout") === "true") {
        router.push("/checkout");
      } else {
        router.push("/shop");
      }
      router.refresh();
      
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response from server:", text);
        throw new Error("Server returned an unexpected response. Please try again.");
      }
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to register");
      }
      
      // Success!
      await syncGuestCart();
      setSuccessMsg("Account created successfully! Please sign in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setActiveTab("signin");
      
      // Auto-login or redirect
      // Since our API currently doesn't auto-login on register, they must sign in.
      // If we did auto-login, we could redirect to checkout here.
      
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col lg:grid lg:grid-cols-5 lg:overflow-hidden">
      
      {/* LEFT PANEL - VISUAL (40%) */}
      <div className="hidden lg:flex lg:col-span-2 relative flex-col justify-end p-12 overflow-hidden bg-[#0C3350]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/featuredmainbanner.png"
            alt="Ocean Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-20 z-0 mix-blend-overlay">
           <Image src="/images/mascot.png" alt="Mascot" fill className="object-contain" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-white text-4xl lg:text-5xl font-bold font-serif mb-4 leading-tight">
            Nutrisi Premium.<br />Perawatan Hewan Lebih Pintar.
          </h1>
          <p className="text-[#D6E8F5] text-base lg:text-lg leading-relaxed">
            Buat profil hewan peliharaan Anda, temukan rekomendasi yang dipersonalisasi, kelola langganan, dan lacak pesanan di satu tempat.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - AUTH (60%) */}
      <div className="w-full lg:col-span-3 flex flex-col min-h-screen lg:min-h-0 lg:h-full bg-white lg:bg-[#F7F9FC] lg:overflow-y-auto overflow-x-hidden">
        {/* Mobile Header / Home Link */}
        <div className="w-full p-4 flex lg:justify-end">
          <Link href="/" className="lg:hidden flex items-center gap-2 text-[#1B6CA8] font-bold">
            <Image src="/images/pawsnfinlogo.png" alt="Paws&Fin" width={28} height={28} />
            Paws&Fin
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:py-6">
          
          {/* AUTH CARD */}
          <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm border border-[#E0E7EF] overflow-hidden flex flex-col">
            
            {/* Tabs */}
            <div className="flex w-full border-b border-[#E0E7EF]">
              <button 
                onClick={() => { setActiveTab("signin"); resetMessages(); }}
                className={`flex-1 py-3 lg:py-4 font-bold text-center transition-colors ${activeTab === "signin" ? "text-[#1B6CA8] border-b-2 border-[#1B6CA8]" : "text-[#B0BEC5] hover:text-[#546E7A]"}`}
              >
                Masuk
              </button>
              <button 
                onClick={() => { setActiveTab("signup"); resetMessages(); }}
                className={`flex-1 py-3 lg:py-4 font-bold text-center transition-colors ${activeTab === "signup" ? "text-[#1B6CA8] border-b-2 border-[#1B6CA8]" : "text-[#B0BEC5] hover:text-[#546E7A]"}`}
              >
                Daftar
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              
              {/* ALERTS */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl text-center">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-700 text-sm font-semibold rounded-xl text-center">
                  {successMsg}
                </div>
              )}
              
              {/* SIGN IN TAB */}
              {activeTab === "signin" && (
                <div className="animate-in fade-in duration-300">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold font-serif text-[#1A1A1A] mb-1">Selamat Datang Kembali</h2>
                    <p className="text-[#546E7A] text-sm lg:text-base">Masuk untuk melanjutkan ke akun Paws&Fin Anda.</p>
                  </div>

                  <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-[#546E7A]">Alamat Email</label>
                      <input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all disabled:opacity-50" 
                        required 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-[#546E7A]">Kata Sandi</label>
                        <button type="button" className="text-xs font-bold text-[#1B6CA8] hover:underline">Lupa Kata Sandi?</button>
                      </div>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all disabled:opacity-50" 
                        required 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white font-bold py-3 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-70"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk"}
                    </button>
                  </form>

                  <div className="relative flex items-center py-5">
                    <div className="flex-grow border-t border-[#E0E7EF]"></div>
                    <span className="flex-shrink-0 mx-4 text-[#B0BEC5] text-xs font-bold uppercase tracking-wider">ATAU</span>
                    <div className="flex-grow border-t border-[#E0E7EF]"></div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#B0BEC5] hover:bg-[#F7F9FC] text-[#1A1A1A] font-bold py-3 rounded-xl transition-colors opacity-50 cursor-not-allowed">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Lanjutkan dengan Google (Segera Hadir)
                  </button>

                  <div className="mt-6 text-center text-sm text-[#546E7A]">
                    Belum punya akun?{" "}
                    <button onClick={() => { setActiveTab("signup"); resetMessages(); }} className="font-bold text-[#1B6CA8] hover:underline">
                      Daftar
                    </button>
                  </div>
                </div>
              )}

              {/* CREATE ACCOUNT TAB */}
              {activeTab === "signup" && (
                <div className="animate-in fade-in duration-300">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold font-serif text-[#1A1A1A] mb-1">Buat Akun Anda</h2>
                    <p className="text-[#546E7A] text-sm lg:text-base">Bergabunglah dengan Paws&Fin dan bangun gaya hidup yang lebih sehat.</p>
                  </div>

                  <form className="flex flex-col gap-3" onSubmit={handleRegister}>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-[#546E7A]">Nama Lengkap</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all disabled:opacity-50" 
                        required 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-[#546E7A]">Alamat Email</label>
                      <input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all disabled:opacity-50" 
                        required 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-[#546E7A]">Kata Sandi</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all disabled:opacity-50" 
                        required 
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-[#546E7A]">Konfirmasi Kata Sandi</label>
                      <input 
                        type="password" 
                        placeholder="••••••••" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all disabled:opacity-50" 
                        required 
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-[#1B6CA8] hover:bg-[#124E7A] text-white font-bold py-3 rounded-xl shadow-sm transition-colors mt-2 disabled:opacity-70"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Daftar"}
                    </button>
                  </form>

                  <div className="relative flex items-center py-5">
                    <div className="flex-grow border-t border-[#E0E7EF]"></div>
                    <span className="flex-shrink-0 mx-4 text-[#B0BEC5] text-xs font-bold uppercase tracking-wider">ATAU</span>
                    <div className="flex-grow border-t border-[#E0E7EF]"></div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#B0BEC5] hover:bg-[#F7F9FC] text-[#1A1A1A] font-bold py-3 rounded-xl transition-colors opacity-50 cursor-not-allowed">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Lanjutkan dengan Google (Segera Hadir)
                  </button>

                  <div className="mt-6 text-center text-sm text-[#546E7A]">
                    Sudah punya akun?{" "}
                    <button onClick={() => { setActiveTab("signin"); resetMessages(); }} className="font-bold text-[#1B6CA8] hover:underline">
                      Masuk
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* TRUST FEATURES */}
          <div className="w-full max-w-[480px] mt-6 lg:mt-8 flex items-center justify-between px-2 text-[#546E7A]">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-8 h-8 rounded-full bg-[#D6E8F5] text-[#1B6CA8] flex items-center justify-center">
                <UserCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold leading-tight max-w-[100px]">Kelola Profil Hewan</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold leading-tight max-w-[100px]">Lacak Langganan</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-8 h-8 rounded-full bg-[#FDDDD5] text-[#BF4A28] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold leading-tight max-w-[100px]">Lihat Riwayat Pesanan</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex animate-pulse">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
           <div className="w-full max-w-md space-y-8">
              <div className="h-10 bg-[#E0E7EF] rounded w-1/3 mx-auto"></div>
              <div className="h-12 bg-[#E0E7EF] rounded w-full mt-12"></div>
              <div className="h-12 bg-[#E0E7EF] rounded w-full mt-4"></div>
              <div className="h-12 bg-[#E0E7EF] rounded w-full mt-8"></div>
           </div>
        </div>
        <div className="hidden lg:flex w-1/2 bg-[#E0E7EF]"></div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
