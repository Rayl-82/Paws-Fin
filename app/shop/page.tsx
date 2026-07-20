"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, ArrowRight, ShoppingCart, ChevronLeft, ChevronRight, Check, Plus, Cat, Dog } from "lucide-react";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function TokoPage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [regularProducts, setRegularProducts] = useState<any[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [pets, setPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setActiveBannerIndex((prev) => (prev + 1) % 3); // banners.length is 3
    else if (distance < -50) setActiveBannerIndex((prev) => (prev === 0 ? 2 : prev - 1));
    setTouchStart(0);
    setTouchEnd(0);
  };

  const banners = [
    {
      id: 1,
      image: "/images/featuredmainbanner.png",
      title: "Ocean Omega Box",
      tags: ["Tinggi Omega-3", "Bebas Biji-bijian"],
      price: "Rp 375.000",
      href: "/shop/subscriptions/sub1"
    },
    {
      id: 2,
      image: "/images/featuredmainbanner2.png",
      title: "Premium Salmon Treats",
      tags: ["100% Alami", "Tinggi Protein"],
      price: "Rp 125.000",
      href: "/shop/products/prod1"
    },
    {
      id: 3,
      image: "/images/featuredmainbanner3.png",
      title: "Kitten Starter Pack",
      tags: ["Pertumbuhan Optimal", "Mudah Dicerna"],
      price: "Rp 250.000",
      href: "/shop/subscriptions/sub2"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setHasProfile(loggedIn);

    async function fetchFeatured() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          const allProducts = data?.data?.products || [];
          // Pick 4 random or first 4 products as featured (any category)
          setFeaturedProducts(allProducts.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    }

    async function fetchRegular() {
      try {
        const params = new URLSearchParams();
        params.append('excludeCategory', 'Subscriptions');
        params.append('excludeCategory', 'Bundles');
        const res = await fetch(`/api/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          const allProducts = data?.data?.products || [];
          setRegularProducts(allProducts.slice(0, 8));
        }
      } catch (err) {
        console.error("Failed to fetch regular products", err);
      }
    }

    async function fetchSubscriptions() {
      try {
        const res = await fetch(`/api/products?category=Subscriptions`);
        if (res.ok) {
          const data = await res.json();
          const subs = data?.data?.products || [];
          
          if (subs.length > 0) {
            setSubscriptionPlans(subs.slice(0, 3));
          } else {
            // Fallback mock data if DB is empty
            setSubscriptionPlans([
              { id: "sub1", imageUrl: "/images/sub1.png", name: "Kotak Ocean Omega", description: "Pengiriman bulanan kotak ikan premium kami", price: 375000 },
              { id: "sub2", imageUrl: "/images/sub2.png", name: "Kotak Hewan Aktif", description: "Cemilan protein energi tinggi untuk hewan peliharaan aktif", price: 450000 },
              { id: "sub3", imageUrl: "/images/sub3.png", name: "Kotak Perawatan Senior", description: "Cemilan lembut, mudah dikunyah dengan dukungan sendi", price: 345000 },
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch subscriptions", err);
      }
    }

    async function fetchPets() {
      try {
        const localPetData = localStorage.getItem("petProfileData");
        if (localPetData) {
          try {
            const parsed = JSON.parse(localPetData);
            setPets([{ 
              id: "local-1", 
              petName: parsed.name || 'Peliharaan', 
              species: parsed.species || 'Cat',
              breed: parsed.breed || ''
            }]);
            return;
          } catch (e) {
            console.error("Failed to parse local pet data", e);
          }
        }
        
        if (loggedIn) {
          const res = await fetch("/api/pets");
          if (res.ok) {
            const data = await res.json();
            setPets(data.data || []);
          }
        }
      } catch (err) {
        console.error("Failed to fetch pets", err);
      }
    }

    const loadData = async () => {
      setIsLoading(true);
      const promises = [fetchFeatured(), fetchRegular(), fetchSubscriptions(), fetchPets()];
      await Promise.all(promises);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const collections = [
    { image: "/images/cattreats.png", name: "Cemilan Kucing", href: "/shop/products?petType=Cat" },
    { image: "/images/dogtreats.png", name: "Cemilan Anjing", href: "/shop/products?petType=Dog" },
    { image: "/images/functionaltreats.png", name: "Fungsional", href: "/shop/products?category=Functional" },
    { image: "/images/subscriptionbox.png", name: "Kotak Langganan", href: "/shop/subscriptions" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative overflow-hidden">
      <Navbar />

      <main className="w-full flex flex-col items-center flex-grow pt-6 lg:pt-8">
        {/* Section 1: Hero Banner */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-8 md:pb-12 lg:pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div 
              className="w-full relative overflow-hidden rounded-[24px] bg-[#ECEEF1] shadow-xl min-h-[360px] md:min-h-[400px] lg:h-[500px] flex items-center group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Link href={banners[activeBannerIndex].href} className="absolute inset-0 block z-0">
                <Image
                  src={banners[activeBannerIndex].image}
                  alt={banners[activeBannerIndex].title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center p-6 sm:p-10 lg:pl-16 bg-gradient-to-r from-black/50 via-black/20 to-transparent lg:bg-none">
                  <div className="w-full max-w-sm flex flex-col justify-center">
                    {/* Product Name */}
                    <h1 className="text-white lg:text-[#191C1E] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 leading-tight drop-shadow-md lg:drop-shadow-none">
                      {banners[activeBannerIndex].title}
                    </h1>

                    {/* Feature Tags */}
                    <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {banners[activeBannerIndex].tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-2 sm:gap-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#1B6CA8] lg:bg-[#005387] flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Check className="text-white w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={3} />
                          </div>
                          <span className="text-white lg:text-[#005387] text-sm sm:text-base font-semibold tracking-wide drop-shadow-sm lg:drop-shadow-none">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="text-[#F26641] text-2xl sm:text-3xl font-bold tracking-tight mb-4 sm:mb-6 drop-shadow-sm lg:drop-shadow-none">
                      {banners[activeBannerIndex].price}
                    </div>

                    {/* Add to Cart Button */}
                    <div className="w-full sm:w-auto bg-[#F26641] group-hover:bg-[#D55331] transition-colors text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full flex justify-center items-center gap-2 shadow-lg group-hover:-translate-y-1 group-hover:shadow-xl text-sm sm:text-base">
                      <span>Lihat Detail</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Carousel Navigation Arrows */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveBannerIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveBannerIndex((prev) => (prev + 1) % banners.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight size={24} />
              </button>

              {/* Carousel Dots */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                {banners.map((_, idx) => (
                  <div 
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveBannerIndex(idx);
                    }}
                    className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer shadow-md ${
                      activeBannerIndex === idx ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Recommended For Your Pet or Create Profile Banner */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
          {isLoading ? (
            <div className="w-full h-[200px] lg:h-[250px] bg-[#E0E7EF] rounded-[24px] animate-pulse mb-8 shadow-sm"></div>
          ) : pets.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full bg-gradient-to-r from-[#0C3350] to-[#1B6CA8] rounded-[24px] p-6 md:p-8 mb-8 shadow-lg overflow-hidden relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-1">
                      Rekomendasi Untuk Hewan Peliharaan Anda
                    </h2>
                    <p className="text-[#D6E8F5]/80 text-sm md:text-base">
                      Pilih hewan peliharaan untuk melihat produk yang sesuai
                    </p>
                  </div>
                  <Link href="/shop/personalized" className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all text-white font-bold py-2.5 px-6 rounded-full text-sm flex items-center gap-2 whitespace-nowrap">
                    Lihat Detail
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Pet Cards Row */}
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {pets.map((pet) => {
                    const isPetCat = pet.species?.toLowerCase() === 'cat' || pet.species?.toLowerCase() === 'kucing';
                    const PetIcon = isPetCat ? Cat : Dog;
                    return (
                      <Link
                        key={pet.id}
                        href={`/shop/personalized?petId=${pet.id}`}
                        className="flex-shrink-0 group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 hover:border-white/30 rounded-[20px] p-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-w-[180px]"
                      >
                        <div className="w-12 h-12 bg-[#F26641] rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                          <PetIcon size={22} className="text-white" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-white font-bold text-sm truncate">{pet.petName}</span>
                          <span className="text-[#D6E8F5]/70 text-xs capitalize truncate">{pet.species}{pet.breed ? ` • ${pet.breed}` : ''}</span>
                        </div>
                      </Link>
                    );
                  })}

                  {/* Tambah Hewan Card */}
                  <Link
                    href="/shop/personalized/create"
                    className="flex-shrink-0 group bg-[#F26641]/20 hover:bg-[#F26641]/35 backdrop-blur-sm border-2 border-dashed border-[#F26641]/50 hover:border-[#F26641] rounded-[20px] p-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-w-[180px]"
                  >
                    <div className="w-12 h-12 bg-[#F26641] rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-90 transition-all duration-300">
                      <Plus size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">Tambah Hewan</span>
                      <span className="text-[#D6E8F5]/70 text-xs">Daftarkan pet baru</span>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full bg-gradient-to-r from-[#0C3350] to-[#1B6CA8] rounded-[24px] p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />

              <div className="flex flex-col text-white max-w-2xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Rekomendasi yang Dipersonalisasi untuk Hewan Anda
                </h2>
              </div>
              <div className="w-full md:w-auto flex-shrink-0 relative z-10">
                <Link
                  href="/shop/personalized/create"
                  className="block w-full text-center bg-[#F26641] hover:bg-[#BF4A28] transition-all text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Buat Profil Peliharaan
                </Link>
              </div>
            </motion.div>
          )}

          {(isLoading || pets.length > 0) && (
            <motion.div key={isLoading ? 'loading' : 'loaded'} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 items-stretch mt-8">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-full aspect-[3/4] bg-[#E0E7EF] rounded-[24px] animate-pulse"></div>
                ))
              ) : featuredProducts.map((prod, idx) => (
                <motion.div variants={fadeUpVariant} key={idx} className="w-full h-full flex flex-col">
                  <ProductCard
                    id={prod.id}
                    image={prod.imageUrl || "/images/product1.png"}
                    name={prod.name}
                    price={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(prod.price)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Section 2: Product Cards Row */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-row justify-between items-end sm:items-end gap-4 mb-8">
            <h2 className="text-[#191C1E] text-3xl md:text-4xl font-bold tracking-tight">
              Produk Kami
            </h2>
            <Link href="/shop/products" className="text-[#1B6CA8] hover:text-[#124E7A] transition-colors font-bold text-sm md:text-base flex items-center gap-1 shrink-0 pb-1">
              Lihat Semua
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>

          <motion.div key={isLoading ? 'loading' : 'loaded'} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full aspect-[3/4] bg-[#E0E7EF] rounded-[24px] animate-pulse"></div>
              ))
            ) : regularProducts.map((prod, idx) => (
              <motion.div variants={fadeUpVariant} key={idx} className="w-full h-full flex flex-col">
                <ProductCard
                  id={prod.id}
                  image={prod.imageUrl || "/images/product1.png"}
                  name={prod.name}
                  price={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(prod.price)}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Section 3: Subscription Spotlight */}
        <section className="w-full bg-[#D6E8F5]/30 py-16 lg:py-24">
          <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mx-auto flex flex-col gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-row justify-between items-end gap-4 mb-2 md:mb-0">
              <h2 className="text-[#191C1E] text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                Sorotan Langganan
              </h2>
              <Link href="/shop/subscriptions" className="text-[#1B6CA8] hover:text-[#124E7A] transition-colors font-bold text-sm md:text-base flex items-center gap-1 shrink-0 pb-1">
                Semua Paket
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </motion.div>

            <motion.div key={isLoading ? 'loading' : 'loaded'} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-full h-[450px] bg-[#1B6CA8]/10 rounded-[24px] animate-pulse border border-[#1B6CA8]/20"></div>
                ))
              ) : subscriptionPlans.map((plan, idx) => (
                <motion.div variants={fadeUpVariant} key={idx} className="h-full">
                  <SubscriptionCard
                    href={`/shop/subscriptions/${plan.id}`}
                    image={plan.imageUrl || plan.image}
                    name={plan.name}
                    desc={plan.description || plan.desc}
                    price={typeof plan.price === 'number' ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(plan.price) : plan.price}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 4: Shop by Collection */}
        <section className="w-full flex justify-center py-16 lg:py-24">
          <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 flex flex-col gap-10">
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-[#191C1E] text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              Belanja Berdasarkan Koleksi
            </motion.h2>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {collections.map((col, idx) => (
                <motion.div variants={fadeUpVariant} key={idx} className="h-full">
                  <Link href={col.href} className="group relative w-full h-[250px] md:h-[300px] lg:h-[350px] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
                    <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />
                    <div className="absolute left-6 bottom-6 text-white text-2xl font-bold tracking-tight flex items-center gap-2">
                      {col.name}
                      <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="w-full flex justify-center pb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full max-w-3xl px-4 flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 bg-[#F26641]/10 text-[#F26641] rounded-[24px] flex items-center justify-center mb-2">
              <PawPrint size={32} />
            </div>

            <h2 className="text-[#191C1E] text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Siap untuk menjelajah lebih dalam?
            </h2>

            <Link href="/shop/products" className="bg-[#1B6CA8] hover:bg-[#124E7A] text-white font-bold py-4 px-8 rounded-full inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Jelajahi Semua Produk
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
