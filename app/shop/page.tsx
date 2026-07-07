"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, ArrowRight, ShoppingCart, ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function TokoPage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [regularProducts, setRegularProducts] = useState<any[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);
  const [hasProfile, setHasProfile] = useState(false);

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
        params.append('excludeCategory', 'Subscription');
        params.append('excludeCategory', 'Bundle');
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
        const res = await fetch(`/api/products?category=Subscription`);
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

    fetchFeatured();
    fetchRegular();
    fetchSubscriptions();
  }, []);

  const collections = [
    { image: "/images/cattreats.png", name: "Cemilan Kucing", href: "/shop/products?petType=Cat" },
    { image: "/images/dogtreats.png", name: "Cemilan Anjing", href: "/shop/products?petType=Dog" },
    { image: "/images/functionaltreats.png", name: "Fungsional", href: "/shop/products?category=Functional" },
    { image: "/images/subscriptionbox.png", name: "Kotak Langganan", href: "/shop/subscriptions" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative">
      <Navbar />



      <main className="w-full flex flex-col items-center flex-grow pt-6 lg:pt-8">
        {/* Section 1: Hero Banner */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-8 md:pb-12 lg:pb-16">
          <Link href="/shop/subscriptions/sub1" className="w-full relative overflow-hidden rounded-2xl bg-[#ECEEF1] shadow-xl min-h-[320px] md:min-h-[400px] lg:h-[500px] flex items-center group block">
            <Image
              src="/images/featuredmainbanner.png"
              alt="Ocean Omega Box Background"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center p-6 sm:p-10 lg:pl-16 bg-gradient-to-r from-black/50 via-black/20 to-transparent lg:bg-none">
              <div className="w-full max-w-sm flex flex-col justify-center">
                {/* Product Name */}
                <h1 className="text-white lg:text-[#191C1E] text-4xl lg:text-5xl font-bold font-serif mb-4 leading-tight drop-shadow-md lg:drop-shadow-none">
                  Ocean Omega Box
                </h1>

                {/* Feature Tags */}
                <div className="flex flex-col gap-3 mb-6">
                  {["Tinggi Omega-3", "Bebas Biji-bijian"].map((tag) => (
                    <div key={tag} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#1B6CA8] lg:bg-[#005387] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Check className="text-white w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-white lg:text-[#005387] text-base font-semibold tracking-wide drop-shadow-sm lg:drop-shadow-none">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="text-[#F26641] text-3xl font-bold font-serif mb-6 drop-shadow-sm lg:drop-shadow-none">
                  Rp 375.000
                </div>

                {/* Add to Cart Button */}
                <div className="w-full sm:w-auto bg-[#F26641] group-hover:bg-[#D55331] transition-colors text-white font-semibold py-4 px-8 rounded-xl flex justify-center items-center gap-2 shadow-lg group-hover:-translate-y-1 group-hover:shadow-xl">
                  <span>Lihat Detail</span>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Arrows */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-10">
              <ChevronLeft size={24} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white text-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-10">
              <ChevronRight size={24} />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
              <div className="w-8 h-2.5 bg-white rounded-full shadow-md transition-all duration-300" />
              <div className="w-2.5 h-2.5 bg-white/40 hover:bg-white/70 transition-all duration-300 rounded-full cursor-pointer shadow-md" />
              <div className="w-2.5 h-2.5 bg-white/40 hover:bg-white/70 transition-all duration-300 rounded-full cursor-pointer shadow-md" />
            </div>
          </Link>
        </section>

        {/* Recommended For Your Pet or Create Profile Banner */}
        {hasProfile ? (
          <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <h2 className="text-[#191C1E] text-3xl md:text-4xl font-bold font-serif">
                Rekomendasi Untuk Hewan Peliharaan Anda
              </h2>
              <Link href="/shop/personalized" className="bg-[#005387] hover:bg-[#003D63] transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md">
                Lihat detail
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 items-stretch">
              {featuredProducts.map((prod, idx) => (
                <div key={idx} className="w-full h-full flex flex-col">
                  <ProductCard
                    id={prod.id}
                    image={prod.imageUrl || "/images/product1.png"}
                    name={prod.name}
                    price={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(prod.price)}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
            <div className="w-full bg-[#1B6CA8] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="flex flex-col text-white max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  Rekomendasi yang Dipersonalisasi untuk Hewan Anda
                </h2>
                <p className="text-[#D6E8F5] text-lg">
                  Buat profil hewan peliharaan Anda untuk mendapatkan rekomendasi produk yang disesuaikan dengan kebutuhan nutrisi spesifik mereka.
                </p>
              </div>
              <div className="w-full md:w-auto flex-shrink-0">
                <Link
                  href="/profile?create=true"
                  className="block w-full text-center bg-[#F26641] hover:bg-[#BF4A28] transition-colors text-white font-bold py-4 px-8 rounded-xl shadow-md text-lg"
                >
                  Buat Profil Hewan Peliharaan
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Product Cards Row */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <h2 className="text-[#191C1E] text-3xl md:text-4xl font-bold font-serif">
              Produk Kami
            </h2>
            <Link href="/shop/products" className="bg-[#005387] hover:bg-[#003D63] transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md">
              Lihat Detail
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
            {regularProducts.map((prod, idx) => (
              <div key={idx} className="w-full h-full flex flex-col">
                <ProductCard
                  id={prod.id}
                  image={prod.imageUrl || "/images/product1.png"}
                  name={prod.name}
                  price={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(prod.price)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Subscription Spotlight */}
        <section className="w-full bg-[#005387]/5 py-16 lg:py-24">
          <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mx-auto flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <h2 className="text-[#191C1E] text-2xl md:text-3xl lg:text-4xl font-bold font-serif">
                Sorotan Langganan
              </h2>
              <button className="bg-[#005387] hover:bg-[#003D63] transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md w-full sm:w-auto">
                Lihat Semua Paket
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {subscriptionPlans.map((plan, idx) => (
                <SubscriptionCard
                  key={idx}
                  href={`/shop/subscriptions/${plan.id}`}
                  image={plan.imageUrl || plan.image}
                  name={plan.name}
                  desc={plan.description || plan.desc}
                  price={typeof plan.price === 'number' ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(plan.price) : plan.price}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Shop by Collection */}
        <section className="w-full flex justify-center py-16 lg:py-24">
          <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 flex flex-col gap-10">
            <h2 className="text-[#191C1E] text-2xl md:text-3xl lg:text-4xl font-bold font-serif">
              Belanja Berdasarkan Koleksi
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {collections.map((col, idx) => (
                <Link href={col.href} key={idx} className="group relative w-full h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
                  <Image src={col.image} alt={col.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />
                  <div className="absolute left-6 bottom-6 text-white text-2xl font-bold font-serif flex items-center gap-2">
                    {col.name}
                    <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="w-full flex justify-center pb-24">
          <div className="w-full max-w-3xl px-4 flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 bg-[#F26641]/10 text-[#F26641] rounded-2xl flex items-center justify-center mb-2">
              <PawPrint size={32} />
            </div>

            <h2 className="text-[#191C1E] text-3xl md:text-5xl font-bold font-serif leading-tight">
              Siap untuk menjelajah lebih dalam?
            </h2>

            <Link href="/shop/products" className="bg-[#005387] hover:bg-[#003D63] text-white font-semibold py-4 px-8 rounded-xl inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Jelajahi Semua Produk
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#2D3133] text-white pt-16 pb-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 pb-12 border-b border-white/10">
            <div className="text-[#FFDBCF] text-3xl font-bold font-serif">
              Paws&amp;Fin
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[#E0E3E6] text-lg">
              {["Kebijakan Privasi", "Ketentuan Layanan", "Laporan Keberlanjutan", "Hubungi Kami"].map((link) => (
                <Link key={link} href="#" className="hover:text-white transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="text-center md:text-left text-[#E0E3E6]/60 text-base">
            © 2024 Paws&amp;Fin. Berkomitmen pada integritas laut dan vitalitas hewan peliharaan.
          </div>
        </div>
      </footer>
    </div>
  );
}
