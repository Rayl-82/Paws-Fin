"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Sparkles, Search, RefreshCw, X } from "lucide-react";

export default function RecommendationPage() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const profileExists = localStorage.getItem("hasPetProfile") === "true";
    setHasProfile(profileExists);
  }, []);

  const resetDemo = () => {
    localStorage.removeItem("hasPetProfile");
    setHasProfile(false);
  };

  if (hasProfile === null) return null; // loading state

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
        <Navbar />
        <main className="flex-1 w-full pb-16">
          {/* Dev Demo Toggle */}
          <div className="w-full bg-[#D6E8F5] p-3 text-sm font-bold text-[#1B6CA8] flex justify-center items-center gap-3">
            <input 
              type="checkbox" 
              checked={false} 
              onChange={() => {
                localStorage.setItem("hasPetProfile", "true");
                setHasProfile(true);
              }}
              className="w-4 h-4 cursor-pointer accent-[#1B6CA8]"
            />
            <label>Demo: Pet Profile Created</label>
          </div>

          {/* Hero Section */}
          <section className="w-full bg-white border-b border-[#E0E7EF]">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
              
              <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#D6E8F5] text-[#1B6CA8] px-4 py-2 rounded-full text-sm font-bold mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Paws&Fin Recommendations</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 text-[#1A1A1A]">
                  Get Personalized Recommendations For Your Pet
                </h1>
                <p className="text-[#546E7A] text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                  Create your pet profile and receive tailored product, bundle, and subscription recommendations based on age, species, lifestyle, and nutritional needs.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link 
                    href="/shop/personalized/create"
                    className="w-full sm:w-auto bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm inline-flex justify-center items-center gap-2 text-lg"
                  >
                    Create Pet Profile
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold hover:bg-[#F0F4F8] hover:text-[#1A1A1A] transition-colors text-lg">
                    How Recommendations Work
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md lg:max-w-xl flex justify-center lg:justify-end">
                {/* Illustration Placeholder */}
                <div className="relative w-full aspect-square bg-[#F0F4F8] rounded-[32px] overflow-hidden flex items-center justify-center border border-[#E0E7EF] shadow-sm">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#D6E8F5] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">🐕</span>
                    </div>
                    <p className="text-[#1B6CA8] font-bold">Friendly Pet Illustration</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Benefits Section */}
          <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              
              <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Personalized Nutrition</h3>
                <p className="text-[#546E7A] leading-relaxed">
                  Tailored recommendations designed around your pet's unique profile.
                </p>
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Smarter Product Discovery</h3>
                <p className="text-[#546E7A] leading-relaxed">
                  Find products that match your pet's specific health needs faster.
                </p>
              </div>

              <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-6">
                  <RefreshCw className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Better Subscription Matching</h3>
                <p className="text-[#546E7A] leading-relaxed">
                  Receive subscription suggestions more relevant to your pet's diet.
                </p>
              </div>

            </div>
          </section>

        </main>
        <Footer />
      </div>
    );
  }

  // --- EXISTING RECOMMENDATION PAGE ---
  const recommendedSubscriptions = [
    {
      image: "/images/product1.png",
      name: "Ocean Omega Box",
      price: "$24.99",
      description: "4.0",
      tags: ["High Omega-3", "Grain-Free"],
    },
    {
      image: "/images/product2.png",
      name: "Ocean Omega Box",
      price: "$24.99",
      description: "4.0",
      tags: ["High Omega-3", "Grain-Free"],
    },
    {
      image: "/images/product3.png",
      name: "Ocean Omega Box",
      price: "$24.99",
      description: "4.0",
      tags: ["High Omega-3", "Grain-Free"],
    },
    {
      image: "/images/product4.png",
      name: "Ocean Omega Box",
      price: "$24.99",
      description: "4.0",
      tags: ["High Omega-3", "Grain-Free"],
    },
    {
      image: "/images/product1.png",
      name: "Ocean Omega Box",
      price: "$24.99",
      description: "4.0",
      tags: ["High Omega-3", "Grain-Free"],
    },
    {
      image: "/images/product2.png",
      name: "Ocean Omega Box",
      price: "$24.99",
      description: "4.0",
      tags: ["High Omega-3", "Grain-Free"],
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />
      
      {/* Dev Demo Toggle */}
      <div className="w-full bg-[#D6E8F5] p-3 text-sm font-bold text-[#1B6CA8] flex justify-center items-center gap-3">
        <input 
          type="checkbox" 
          checked={true} 
          onChange={() => {
            localStorage.removeItem("hasPetProfile");
            setHasProfile(false);
          }}
          className="w-4 h-4 cursor-pointer accent-[#1B6CA8]"
        />
        <label>Demo: Pet Profile Created</label>
      </div>

      <main className="flex-1 w-full pb-16">
        {/* Hero Section */}
        <section className="w-full bg-[#1B6CA8] py-8 lg:py-12 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-12 overflow-hidden relative">
          <div className="flex-1 flex flex-col justify-center items-start z-10 w-full max-w-[1440px] mx-auto lg:pl-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 w-full mb-8">
              {/* Left Column: Personalized for Luna + Match */}
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-white text-xl md:text-2xl font-medium opacity-90 tracking-wide mb-2">
                  Personalized for
                </h2>
                <h1 className="text-white text-6xl md:text-7xl lg:text-[90px] font-bold font-serif leading-none mb-6">
                  Luna
                </h1>
                <div className="bg-[#F26641] text-white font-bold text-lg md:text-xl px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-sm">
                  <span className="text-white text-sm">✦</span>
                  95% Match
                </div>
              </div>

              {/* Right Column: Attributes */}
              <div className="flex flex-wrap gap-3 mt-4 lg:mt-0 max-w-[500px]">
                {["Adult Cat", "4.2 kg", "High Activity", "Sensitive Digestion"].map((attr, idx) => (
                  <div key={idx} className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm md:text-base font-medium backdrop-blur-sm">
                    {attr}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
              We selected these Omega-3 rich formulas to support Luna's active lifestyle and gentle digestion. These premium proteins are perfectly portioned for her healthy weight.
            </p>
          </div>

          <div className="relative flex-shrink-0 z-10 w-full max-w-[420px] aspect-square flex items-center justify-center mr-0 lg:mr-8 xl:mr-16">
            {/* Orange blur effect */}
            <div className="absolute w-32 h-32 bottom-0 left-0 bg-[#FC7640] opacity-30 rounded-full blur-2xl"></div>
            {/* Image card (Polaroid style) */}
            <div className="w-full h-full bg-white rounded-xl shadow-2xl p-4 pb-16 transform rotate-2 relative">
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image
                  src="/images/UserPet.png"
                  alt="Luna"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                <span className="text-[#D0B298] text-3xl">🐾</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full max-w-[1440px] mx-auto mt-16 lg:mt-24 px-4 md:px-8 lg:px-16">
          <h2 className="text-[#1A1A1A] text-2xl md:text-3xl font-bold font-serif mb-6">
            Recommended Subscription
          </h2>
        </div>

        {/* Subscription Club Banner */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <section className="w-full bg-[#124E7A] rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-md">
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start">
              <span className="text-[#CFE5FF] text-sm md:text-base font-semibold tracking-widest uppercase mb-4 opacity-90">
                JOIN THE CLUB
              </span>
              <h2 className="text-white text-3xl md:text-[40px] font-bold font-serif leading-tight mb-8">
                Ocean Omega Box -<br />Monthly Subscription
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                {["2x Signature Treats", "1x Daily Supplement", "Free Shipping"].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#FFDBCF] rounded-sm flex-shrink-0"></div>
                    <span className="text-white text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-end text-[#FFDBCF]">
                  <span className="text-[48px] font-bold font-serif leading-none">$39.99</span>
                  <span className="text-[#CFE5FF] text-xl font-bold ml-1 mb-1">/mo</span>
                </div>
                <button className="bg-[#BF4A28] hover:bg-[#A83901] transition-colors text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg">
                  Join the Club
                </button>
              </div>
            </div>

            <div className="w-full md:w-[40%] relative min-h-[400px] md:min-h-0 flex-shrink-0">
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay z-10 pointer-events-none"></div>
              <Image
                src="/images/featuredmainbanner.png"
                alt="Ocean Omega Box"
                fill
                className="object-cover object-center"
              />
            </div>
          </section>
        </div>

        {/* Recommended Products Grid */}
        <section className="w-full max-w-[1440px] mx-auto mt-16 lg:mt-20 px-4 md:px-8 lg:px-16">
          <h2 className="text-[#1A1A1A] text-2xl md:text-3xl font-bold font-serif mb-8">
            Recommended Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedSubscriptions.map((prod, idx) => (
              <ProductCard
                key={idx}
                image={prod.image}
                name={prod.name}
                price={prod.price}
                description={prod.description}
                tags={prod.tags}
              />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
