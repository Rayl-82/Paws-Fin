"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, ArrowRight, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

export default function TokoPage() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const profileExists = localStorage.getItem("hasPetProfile") === "true";
    setHasProfile(profileExists);
  }, []);

  const featuredProducts = [
    { image: "/images/product1.png", name: "Wild Salmon Jerky", price: "$14.99", tags: ["High Omega-3", "Single Ingredient"] },
    { image: "/images/product2.png", name: "Cod & Shrimp Bites", price: "$9.99", tags: ["Grain-Free", "Low Calorie"] },
    { image: "/images/product3.png", name: "Pure Salmon Oil", price: "$24.00", tags: ["Skin & Coat", "Wild-Caught"] },
    { image: "/images/product4.png", name: "Atlantic Topper Mix", price: "$18.25", tags: ["Digestive Health", "Freeze-Dried"] },
  ];

  const subscriptionPlans = [
    { image: "/images/sub1.png", name: "Ocean Omega Box", desc: "Monthly delivery of our premium fish box", price: "$24.99" },
    { image: "/images/sub2.png", name: "Active Pet Box", desc: "High-energy protein snacks for active pets", price: "$29.99" },
    { image: "/images/sub3.png", name: "Senior Care Box", desc: "Soft, easy-to-chew treats with joint support", price: "$22.99" },
  ];

  const collections = [
    { image: "/images/cattreats.png", name: "Cat Treats" },
    { image: "/images/dogtreats.png", name: "Dog Treats" },
    { image: "/images/functionaltreats.png", name: "Functional" },
    { image: "/images/subscriptionbox.png", name: "Sub Boxes" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative">
      <Navbar />

      {/* Dev Demo Toggle */}
      <div className="w-full bg-[#D6E8F5] p-3 text-sm font-bold text-[#1B6CA8] flex justify-center items-center gap-3">
        <input 
          type="checkbox" 
          checked={!!hasProfile} 
          onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              localStorage.setItem("hasPetProfile", "true");
            } else {
              localStorage.removeItem("hasPetProfile");
            }
            setHasProfile(isChecked);
          }}
          className="w-4 h-4 cursor-pointer accent-[#1B6CA8]"
        />
        <label>Demo: Pet Profile Created</label>
      </div>

      <main className="w-full flex flex-col items-center flex-grow pt-6 lg:pt-8">
        {/* Section 1: Hero Banner */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-8 md:pb-12 lg:pb-16">
          <Link href="/shop/subscriptions/1" className="w-full relative overflow-hidden rounded-2xl bg-[#ECEEF1] shadow-xl min-h-[320px] md:min-h-[400px] lg:h-[500px] flex items-center group block">
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
                  {["High Omega-3", "Grain-Free"].map((tag) => (
                    <div key={tag} className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-white lg:bg-[#005387] rounded-sm shrink-0 shadow-sm" />
                      <span className="text-white lg:text-[#005387] text-base font-semibold tracking-wide drop-shadow-sm lg:drop-shadow-none">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="text-white lg:text-[#F26641] text-3xl font-bold mb-8 drop-shadow-md lg:drop-shadow-none">
                  $24.99
                </div>

                {/* Add to Cart Button */}
                <div className="w-full sm:w-auto bg-[#F26641] group-hover:bg-[#D55331] transition-colors text-white font-semibold py-4 px-8 rounded-xl flex justify-center items-center gap-2 shadow-lg group-hover:-translate-y-1 group-hover:shadow-xl">
                  <span>View Details</span>
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

        {/* State A: Recommended For Your Pet */}
        {hasProfile === true && (
          <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <h2 className="text-[#191C1E] text-3xl md:text-4xl font-bold font-serif">
                Recommended For Your Pet
              </h2>
              <Link href="/shop/personalized" className="bg-[#005387] hover:bg-[#003D63] transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md">
                View detail
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 items-stretch">
              {featuredProducts.map((prod, idx) => (
                <div key={idx} className="w-full h-full flex flex-col">
                  <ProductCard
                    image={prod.image}
                    name={prod.name}
                    price={prod.price}
                    tags={prod.tags}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* State B: Banner Prompting Profile Creation */}
        {hasProfile === false && (
          <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
            <div className="w-full bg-[#1B6CA8] rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 shadow-sm">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                <Image src="/images/UserPet.png" alt="Pet illustration" width={140} height={140} className="object-contain" />
              </div>
              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start max-w-2xl">
                <h3 className="text-white text-2xl md:text-3xl font-serif font-bold mb-6 leading-tight">
                  Create a pet profile to unlock personalized product suggestions and subscription recommendations.
                </h3>
                <Link href="/shop/personalized/create" className="bg-[#F26641] hover:bg-[#BF4A28] transition-colors text-white font-bold py-4 px-8 rounded-xl shadow-md">
                  Create Pet Profile
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Product Cards Row */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <h2 className="text-[#191C1E] text-3xl md:text-4xl font-bold font-serif">
              Our Products
            </h2>
            <Link href="/shop/products" className="bg-[#005387] hover:bg-[#003D63] transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md">
              View Details
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 items-stretch">
            {[...featuredProducts, ...featuredProducts].map((prod, idx) => (
              <div key={idx} className="w-full h-full flex flex-col">
                <ProductCard
                  image={prod.image}
                  name={prod.name}
                  price={prod.price}
                  tags={prod.tags}
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
                Subscription Spotlight
              </h2>
              <button className="bg-[#005387] hover:bg-[#003D63] transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md w-full sm:w-auto">
                View All Plans
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {subscriptionPlans.map((plan, idx) => (
                <SubscriptionCard
                  key={idx}
                  image={plan.image}
                  name={plan.name}
                  desc={plan.desc}
                  price={plan.price}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Shop by Collection */}
        <section className="w-full flex justify-center py-16 lg:py-24">
          <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 flex flex-col gap-10">
            <h2 className="text-[#191C1E] text-2xl md:text-3xl lg:text-4xl font-bold font-serif">
              Shop by Collection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {collections.map((col, idx) => (
                <Link href="/shop/products" key={idx} className="group relative w-full h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
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
              Ready to dive deeper?
            </h2>

            <Link href="/shop/products" className="bg-[#005387] hover:bg-[#003D63] text-white font-semibold py-4 px-8 rounded-xl inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Explore All Products
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
              {["Privacy Policy", "Terms of Service", "Sustainability Report", "Contact Us"].map((link) => (
                <Link key={link} href="#" className="hover:text-white transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="text-center md:text-left text-[#E0E3E6]/60 text-base">
            © 2024 Paws&amp;Fin. Committed to oceanic integrity and pet vitality.
          </div>
        </div>
      </footer>
    </div>
  );
}
