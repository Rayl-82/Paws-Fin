"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sparkles, Search, RefreshCw, Loader2, ChevronDown } from "lucide-react";

export default function RecommendationPage() {
  const [petProfile, setPetProfile] = useState<any>(null);
  const [allPets, setAllPets] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    let currentPet = null;

    try {
      // 1. Try to fetch from backend if logged in
      const res = await fetch("/api/pets");
      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setAllPets(data.data);
          currentPet = data.data[0]; 
        }
      }

      // 2. If no pet from backend, check localStorage (Guest mode)
      if (!currentPet) {
        const localPet = localStorage.getItem("petProfileData");
        if (localPet) {
          const parsed = JSON.parse(localPet);
          currentPet = {
            petName: parsed.name,
            species: parsed.species,
            weight: parsed.weight,
            activityLevel: parsed.activityLevel,
            healthCondition: parsed.primaryGoal
          };
        }
      }

      setPetProfile(currentPet);

      // 3. Fetch Recommended Products
      if (currentPet) {
        const prodRes = await fetch("/api/products");
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          const productsList = prodData.data?.products || [];
          // Separate a subscription and some products
          const subs = productsList.filter((p: any) => p.category === "Subscription");
          const others = productsList.filter((p: any) => p.category !== "Subscription");
          
          if (subs.length > 0) setSubscription(subs[0]);
          setProducts(others.slice(0, 4)); // Get 4 recommendations
        }
      }
    } catch (err) {
      console.error("Failed to load recommendations", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#1B6CA8] animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  // --- CREATE PROFILE PAGE (No Pet Found) ---
  if (!petProfile) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
        <Navbar />
        <main className="flex-1 w-full pb-16">
          <section className="w-full bg-white border-b border-[#E0E7EF]">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
              
              <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#D6E8F5] text-[#1B6CA8] px-4 py-2 rounded-full text-sm font-bold mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Rekomendasi Paws&Fin</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 text-[#1A1A1A]">
                  Dapatkan Rekomendasi Pribadi Untuk Hewan Peliharaan Anda
                </h1>
                <p className="text-[#546E7A] text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                  Buat profil hewan peliharaan Anda dan dapatkan rekomendasi produk, paket, dan langganan yang disesuaikan berdasarkan usia, spesies, gaya hidup, dan kebutuhan nutrisi.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link 
                    href="/shop/personalized/create"
                    className="w-full sm:w-auto bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm inline-flex justify-center items-center gap-2 text-lg"
                  >
                    Buat Profil Hewan Peliharaan
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold hover:bg-[#F0F4F8] hover:text-[#1A1A1A] transition-colors text-lg">
                    Cara Kerja Rekomendasi
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md lg:max-w-xl flex justify-center lg:justify-end">
                <div className="relative w-full aspect-square bg-[#F0F4F8] rounded-[32px] overflow-hidden flex items-center justify-center border border-[#E0E7EF] shadow-sm">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#D6E8F5] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🐕</span>
                    </div>
                    <p className="text-[#1B6CA8] font-bold">Ilustrasi Hewan Peliharaan</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Nutrisi yang Dipersonalisasi</h3>
                <p className="text-[#546E7A] leading-relaxed">
                  Rekomendasi yang disesuaikan dan dirancang berdasarkan profil unik hewan peliharaan Anda.
                </p>
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Penemuan Produk Lebih Cerdas</h3>
                <p className="text-[#546E7A] leading-relaxed">
                  Temukan produk yang sesuai dengan kebutuhan kesehatan spesifik hewan peliharaan Anda dengan lebih cepat.
                </p>
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                  <RefreshCw className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Pencocokan Langganan Lebih Baik</h3>
                <p className="text-[#546E7A] leading-relaxed">
                  Terima saran langganan yang lebih relevan dengan diet hewan peliharaan Anda.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // --- RECOMMENDATION RESULTS PAGE ---
  const matchScore = 95; // Simulated match score

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full pb-16">
        {/* Hero Section */}
        <section className="w-full bg-[#1B6CA8] py-8 lg:py-12 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-12 overflow-hidden relative">
          <div className="flex-1 flex flex-col justify-center items-start z-10 w-full max-w-[1440px] mx-auto lg:pl-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 w-full mb-8">
              
              <div className="flex flex-col justify-start items-start">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-white text-xl md:text-2xl font-medium opacity-90 tracking-wide">
                    Dipersonalisasi untuk
                  </h2>
                </div>
                
                <div className="relative group mb-6 inline-block">
                  <h1 className="text-white text-6xl md:text-7xl lg:text-[90px] font-bold font-serif leading-none flex items-center gap-2 lg:gap-4">
                    {petProfile.petName || "Hewan Peliharaan Anda"}
                    {allPets.length > 1 && (
                      <ChevronDown className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                  </h1>
                  
                  {allPets.length > 1 && (
                    <select 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      value={petProfile.id}
                      onChange={(e) => {
                        const selected = allPets.find(p => p.id === e.target.value);
                        if (selected) setPetProfile(selected);
                      }}
                    >
                      {allPets.map(p => (
                        <option key={p.id} value={p.id} className="text-[#1A1A1A] text-base">{p.petName}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="bg-[#F26641] text-white font-bold text-lg md:text-xl px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-sm">
                  <span className="text-white text-sm">✦</span>
                  {matchScore}% Kecocokan
                </div>
              </div>

              {/* Dynamic Attributes */}
              <div className="flex flex-wrap gap-3 mt-4 lg:mt-0 max-w-[500px]">
                {[
                  petProfile.species && `Dewasa ${petProfile.species === 'Dog' ? 'Anjing' : 'Kucing'}`,
                  petProfile.weight && `${petProfile.weight} kg`,
                  petProfile.activityLevel && `Aktivitas ${petProfile.activityLevel}`,
                  petProfile.healthCondition
                ].filter(Boolean).map((attr, idx) => (
                  <div key={idx} className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm md:text-base font-medium backdrop-blur-sm">
                    {attr}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
              Kami memilih formula ini untuk mendukung gaya hidup dan kebutuhan {petProfile.petName || "hewan peliharaan Anda"}. Protein laut premium ini diporsikan secara sempurna untuk kesehatan yang optimal.
            </p>
          </div>

          <div className="relative flex-shrink-0 z-10 w-full max-w-[420px] aspect-square flex items-center justify-center mr-0 lg:mr-8 xl:mr-16">
            <div className="absolute w-32 h-32 bottom-0 left-0 bg-[#FC7640] opacity-30 rounded-full blur-2xl"></div>
            <div className="w-full h-full bg-white rounded-xl shadow-2xl p-4 pb-16 transform rotate-2 relative">
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image
                  src={petProfile.species === 'Dog' ? "/images/product-salmon.png" : "/images/UserPet.png"}
                  alt={petProfile.petName || "Hewan Peliharaan"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <span className="text-[#D0B298] text-3xl">{petProfile.species === 'Dog' ? '🐶' : '🐾'}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full max-w-[1440px] mx-auto mt-16 lg:mt-24 px-4 md:px-8 lg:px-16">
          <h2 className="text-[#1A1A1A] text-2xl md:text-3xl font-bold font-serif mb-6">
            Rekomendasi Langganan
          </h2>
        </div>

        {/* Subscription Club Banner */}
        {subscription && (
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <section className="w-full bg-[#124E7A] rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-md">
              <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start">
                <span className="text-[#CFE5FF] text-sm md:text-base font-semibold tracking-widest uppercase mb-4 opacity-90">
                  BERGABUNG DENGAN KLUB
                </span>
                <h2 className="text-white text-3xl md:text-[40px] font-bold font-serif leading-tight mb-4">
                  {subscription.name}
                </h2>
                <p className="text-[#D6E8F5] mb-8 max-w-md">{subscription.description}</p>

                <div className="flex flex-col gap-4 mb-8">
                  {["Nutrisi Seimbang", "Tinggi Omega-3", "Gratis Pengiriman Bulanan"].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#FFDBCF] rounded-sm flex-shrink-0"></div>
                      <span className="text-white text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-4">
                  <div className="flex items-end text-[#FFDBCF]">
                    <span className="text-[48px] font-bold font-serif leading-none">
                      Rp {subscription.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[#CFE5FF] text-xl font-bold ml-1 mb-1">/bulan</span>
                  </div>
                  <Link href={`/shop/subscriptions/${subscription.id}`} className="bg-[#BF4A28] hover:bg-[#A83901] transition-colors text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg">
                    Gabung Klub
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-[40%] relative min-h-[400px] md:min-h-0 flex-shrink-0 bg-white">
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <Image
                  src={subscription.imageUrl || "/images/featuredmainbanner.png"}
                  alt={subscription.name}
                  fill
                  className="object-cover object-center p-8"
                />
              </div>
            </section>
          </div>
        )}

        {/* Recommended Products Grid */}
        <section className="w-full max-w-[1440px] mx-auto mt-16 lg:mt-20 px-4 md:px-8 lg:px-16">
          <h2 className="text-[#1A1A1A] text-2xl md:text-3xl font-bold font-serif mb-8">
            Produk yang Disesuaikan Untuk {petProfile.petName || "Hewan Peliharaan Anda"}
          </h2>
          
          {products.length === 0 ? (
            <p className="text-[#546E7A]">Memuat rekomendasi...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  image={prod.imageUrl || "/images/product1.png"}
                  name={prod.name}
                  price={`Rp ${prod.price.toLocaleString('id-ID')}`}
                  description="4.8" // Mock rating
                  tags={prod.category === "Treats" ? ["High Omega-3", "Single Ingredient"] : ["Premium"]}
                />
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
