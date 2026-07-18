"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sparkles, Search, RefreshCw, ChevronDown, Plus, AlertCircle } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function RecommendationPage() {
  const [petProfile, setPetProfile] = useState<any>(null);
  const [allPets, setAllPets] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [matchScore, setMatchScore] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  // Animate Match Score when profile is loaded
  useEffect(() => {
    if (petProfile && !isLoading) {
      const targetScore = 95;
      let current = 0;
      const interval = setInterval(() => {
        current += 2;
        if (current >= targetScore) {
          setMatchScore(targetScore);
          clearInterval(interval);
        } else {
          setMatchScore(current);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [petProfile, isLoading]);

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
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 w-full animate-pulse">
          {/* Hero Skeleton */}
          <section className="w-full bg-[#E0E7EF] py-8 lg:py-12 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-12 h-[75vh] min-h-[600px]">
             <div className="flex-1 flex flex-col justify-end pb-40 items-start z-10 w-full max-w-[1440px] mx-auto lg:pl-8 gap-4">
                <div className="h-6 bg-white/40 rounded w-1/4"></div>
                <div className="h-20 bg-white/50 rounded w-3/4"></div>
                <div className="flex gap-4 mt-4">
                  <div className="h-10 bg-white/40 rounded-full w-32"></div>
                  <div className="h-10 bg-white/40 rounded-full w-32"></div>
                </div>
             </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // --- CREATE PROFILE PAGE (No Pet Found) ---
  if (!petProfile) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col overflow-x-hidden"
        >
          <Navbar />
          <main className="flex-1 w-full flex flex-col">
            
            {/* Modern Standard Banner */}
            <section className="w-full bg-[#F7F9FC] pt-6 md:pt-10 pb-8 md:pb-12">
              <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-gradient-to-r from-[#0C3350] to-[#1B6CA8] rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl relative overflow-hidden"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
                  <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 blur-2xl" />

                  <div className="flex-1 flex flex-col text-white relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 w-fit">
                      <Sparkles className="w-4 h-4 text-[#F7A08A]" />
                      <span>Rekomendasi Pintar</span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
                      Personalisasi Nutrisi Peliharaan Anda
                    </h1>
                    
                    <p className="text-[#D6E8F5] text-lg max-w-xl mb-8 leading-relaxed">
                      Setiap hewan peliharaan unik. Buat profil untuk mendapatkan rekomendasi suplemen dan makanan berbahan laut premium yang disesuaikan khusus untuk mereka.
                    </p>
                    
                    <Link 
                      href="/shop/personalized/create"
                      className="w-full sm:w-fit bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg flex justify-center items-center gap-2 hover:-translate-y-1"
                    >
                      <Plus className="w-5 h-5" />
                      Buat Profil Peliharaan
                    </Link>
                  </div>

                  <div className="hidden md:block w-full md:w-[40%] lg:w-1/2 max-w-md relative z-10">
                    <div className="aspect-[4/3] relative rounded-[24px] overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                      <Image
                        src="/images/UserPet.png" 
                        alt="Healthy Pet Background"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Horizontal Carousel on Mobile, Grid on Desktop */}
            <section className="w-full bg-[#F7F9FC] py-16 lg:py-24 pt-4 lg:pt-12">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center"
              >
                <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory sm:snap-none pb-8 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar items-stretch">
                  <motion.div variants={fadeUpVariant} className="min-w-[85vw] sm:min-w-0 snap-center bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                      <Sparkles className="w-8 h-8 text-[#1B6CA8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 tracking-tight">Nutrisi Dipersonalisasi</h3>
                    <p className="text-[#546E7A] leading-relaxed">
                      Rekomendasi yang disesuaikan dan dirancang berdasarkan profil unik hewan peliharaan Anda.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUpVariant} className="min-w-[85vw] sm:min-w-0 snap-center bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-[#1B6CA8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 tracking-tight">Penemuan Cerdas</h3>
                    <p className="text-[#546E7A] leading-relaxed">
                      Temukan produk yang sesuai dengan kebutuhan kesehatan spesifik hewan peliharaan Anda lebih cepat.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUpVariant} className="min-w-[85vw] sm:min-w-0 snap-center sm:col-span-2 lg:col-span-1 bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                      <RefreshCw className="w-8 h-8 text-[#1B6CA8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 tracking-tight">Langganan Tepat</h3>
                    <p className="text-[#546E7A] leading-relaxed">
                      Terima saran kotak langganan yang paling relevan dengan gaya hidup hewan peliharaan Anda.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </section>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    );
  }

  // --- RECOMMENDATION RESULTS PAGE ---
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col overflow-x-hidden"
      >
        <Navbar />

        <main className="flex-1 w-full pb-16">
          {/* Hero Section */}
          <section className="w-full bg-[#1B6CA8] py-8 lg:py-16 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden">
            
            <div className="absolute inset-0 z-0">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1B6CA8] opacity-50 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F26641] opacity-20 blur-3xl rounded-full"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-start z-10 w-full max-w-[1440px] mx-auto lg:pl-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 w-full mb-8">
                
                <div className="flex flex-col justify-start items-start">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 mb-2"
                  >
                    <h2 className="text-[#D6E8F5] text-sm md:text-base font-bold uppercase tracking-widest">
                      Dipersonalisasi untuk
                    </h2>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative group mb-6 inline-block"
                  >
                    <h1 className="text-white text-5xl md:text-6xl lg:text-[80px] font-bold leading-tight flex items-center gap-2 lg:gap-4 tracking-tight">
                      {petProfile.petName || "Hewan Peliharaan"}
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
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-2 lg:mt-0 w-full sm:w-auto"
                  >
                    <div className="bg-[#F26641] text-white font-bold text-lg px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center whitespace-nowrap">
                      <Sparkles className="w-5 h-5 text-white flex-shrink-0" />
                      {matchScore}% Kecocokan
                    </div>
                    
                    <Link href="/shop/personalized/create" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold text-sm md:text-base px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-sm w-full sm:w-auto">
                      <Plus className="w-4 h-4 md:w-5 md:h-5" />
                      Tambah Profil
                    </Link>
                  </motion.div>
                </div>

                {/* Dynamic Attributes */}
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-2 mt-4 lg:mt-0 max-w-[500px]"
                >
                  {[
                    petProfile.species && `Dewasa ${petProfile.species === 'Dog' ? 'Anjing' : 'Kucing'}`,
                    petProfile.weight && `${petProfile.weight} kg`,
                    petProfile.activityLevel && `Aktivitas ${petProfile.activityLevel}`,
                    petProfile.healthCondition
                  ].filter(Boolean).map((attr, idx) => (
                    <motion.div variants={fadeUpVariant} key={idx} className="bg-[#124E7A]/60 border border-white/10 text-[#D6E8F5] px-4 py-2 rounded-full text-xs md:text-sm font-bold backdrop-blur-sm shadow-inner">
                      {attr}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl font-medium"
              >
                Kami memilih formula ini untuk mendukung gaya hidup dan kebutuhan {petProfile.petName || "hewan peliharaan Anda"}. Protein laut premium ini diporsikan secara sempurna untuk kesehatan optimal.
              </motion.p>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 2 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              className="relative flex-shrink-0 z-10 w-full max-w-[320px] lg:max-w-[420px] aspect-square flex items-center justify-center mr-0 lg:mr-8 xl:mr-16 mt-8 lg:mt-0"
            >
              <div className="absolute w-32 h-32 bottom-0 left-0 bg-[#F26641] opacity-40 rounded-full blur-3xl"></div>
              <div className="w-full h-full bg-white rounded-[24px] shadow-2xl p-4 pb-16 relative">
                <div className="relative w-full h-full rounded-[16px] overflow-hidden">
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
            </motion.div>
          </section>

          <div className="w-full max-w-[1440px] mx-auto mt-8 lg:mt-12 px-4 md:px-8 lg:px-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#1A1A1A] text-2xl md:text-3xl font-bold mb-8 tracking-tight"
            >
              Rekomendasi Langganan
            </motion.h2>
          </div>

          {/* Subscription Club Banner */}
          {subscription && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16"
            >
              <section className="w-full bg-[#124E7A] rounded-[24px] overflow-hidden flex flex-col md:flex-row items-stretch shadow-md">
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start">
                  <span className="text-[#F26641] text-xs md:text-sm font-bold tracking-widest uppercase mb-4 opacity-100 bg-[#0C3350] px-4 py-1.5 rounded-full shadow-inner">
                    BERGABUNG DENGAN KLUB
                  </span>
                  <h2 className="text-white text-3xl md:text-[40px] font-bold leading-tight mb-4 tracking-tight">
                    {subscription.name}
                  </h2>
                  <p className="text-[#D6E8F5] mb-8 max-w-md">{subscription.description}</p>

                  <div className="flex flex-col gap-4 mb-8">
                    {["Nutrisi Seimbang", "Tinggi Omega-3", "Gratis Pengiriman Bulanan"].map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#1B6CA8] rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white text-base font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 w-full">
                    <div className="flex items-end text-[#F26641]">
                      <span className="text-[40px] font-bold leading-none tracking-tight">
                        Rp {subscription.price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[#D6E8F5] text-lg font-bold ml-1 mb-1">/bln</span>
                    </div>
                    <Link href={`/shop/subscriptions/${subscription.id}`} className="bg-[#F26641] hover:bg-[#BF4A28] transition-colors text-white font-bold px-8 py-4 rounded-full shadow-lg w-full sm:w-auto text-center hover:-translate-y-1">
                      Gabung Klub
                    </Link>
                  </div>
                </div>

                <div className="w-full md:w-[45%] relative min-h-[300px] md:min-h-0 flex-shrink-0 bg-[#F26641]">
                  <Image
                    src={subscription.imageUrl || "/images/featuredmainbanner.png"}
                    alt={subscription.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </section>
            </motion.div>
          )}

          {/* Recommended Products Grid */}
          <section className="w-full max-w-[1440px] mx-auto mt-16 lg:mt-24 px-4 md:px-8 lg:px-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#1A1A1A] text-2xl md:text-3xl font-bold mb-8 tracking-tight"
            >
              Produk Tepat Untuk {petProfile.petName || "Hewan Peliharaan"}
            </motion.h2>
            
            {products.length === 0 ? (
              <p className="text-[#546E7A]">Memuat rekomendasi...</p>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
              >
                {products.map((prod) => (
                  <motion.div variants={fadeUpVariant} key={prod.id}>
                    <ProductCard
                      id={prod.id}
                      image={prod.imageUrl || "/images/product1.png"}
                      name={prod.name}
                      price={`Rp ${prod.price.toLocaleString('id-ID')}`}
                      description="4.8" // Mock rating
                      tags={prod.category === "Treats" ? ["Tinggi Omega-3", "Bahan Tunggal"] : ["Premium"]}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>

        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
