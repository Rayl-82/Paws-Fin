"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Droplets, Heart, Leaf, Mail, RefreshCw, Anchor, Fish, FlaskConical, Cat } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function EducationalCenter() {
  const featuredLarge = {
    title: "Mengapa By-Product Laut adalah Masa Depan Nutrisi Hewan Berkelanjutan",
    category: "Keberlanjutan",
    image: "/images/featuredmainbanner.png",
    slug: "marine-by-products-future",
    excerpt: "Temukan bagaimana kami mengubah sumber daya laut yang tak termanfaatkan menjadi nutrisi premium kaya Omega-3 sambil membantu lautan pulih kembali."
  };

  const featuredSmall = [
    {
      title: "Panduan Lengkap Omega-3 untuk Kucing dan Anjing",
      category: "Nutrisi Hewan",
      image: "/images/sub1.png",
      slug: "ultimate-guide-omega-3",
    },
    {
      title: "Memahami Alergi pada Hewan Peliharaan dan Peran Protein Baru",
      category: "Tips Perawatan Hewan",
      image: "/images/sub2.png",
      slug: "understanding-pet-allergies",
    }
  ];

  const categories = [
    { name: "Nutrisi Hewan", icon: <Heart className="w-6 h-6" />, color: "bg-[#FDDDD5] text-[#BF4A28]" },
    { name: "Manfaat Omega-3", icon: <Droplets className="w-6 h-6" />, color: "bg-[#D6E8F5] text-[#1B6CA8]" },
    { name: "Tips Perawatan", icon: <BookOpen className="w-6 h-6" />, color: "bg-[#E0E7EF] text-[#546E7A]" },
    { name: "Ekonomi Sirkular", icon: <RefreshCw className="w-6 h-6" />, color: "bg-[#E8F5E9] text-[#2E7D32]" },
  ];

  const latestArticles = [
    { title: "5 Tanda Hewan Peliharaan Anda Butuh Suplemen Sendi", image: "/images/product1.png", slug: "5-signs-joint-support", category: "Kesehatan" },
    { title: "Berapa Banyak Minyak Ikan yang Aman?", image: "/images/product2.png", slug: "how-much-fish-oil", category: "Nutrisi" },
    { title: "Sehari di Perikanan Berkelanjutan", image: "/images/product3.png", slug: "sustainable-fishery", category: "Di Balik Layar" },
    { title: "Mengatasi Kucing yang Susah Makan", image: "/images/product4.png", slug: "feline-finickiness", category: "Perilaku" },
    { title: "Fakta di Balik Diet Bebas Gandum", image: "/images/cattreats.png", slug: "truth-about-grain-free", category: "Diet" },
    { title: "Menjadi Pemilik Hewan Peliharaan yang Ramah Lingkungan", image: "/images/dogtreats.png", slug: "eco-friendly-pet-parenting", category: "Keberlanjutan" },
  ];

  const flowSteps = [
    { name: "Perikanan", icon: <Anchor className="w-8 h-8" /> },
    { name: "By-Product Laut", icon: <Fish className="w-8 h-8" /> },
    { name: "Pemrosesan", icon: <FlaskConical className="w-8 h-8" /> },
    { name: "Nutrisi Hewan", icon: <Heart className="w-8 h-8" /> },
    { name: "Hewan Lebih Sehat", icon: <Cat className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="w-full flex flex-col items-center flex-grow">
        
        {/* HERO SECTION */}
        <FadeIn className="w-full bg-[#1B6CA8] py-20 lg:py-28 px-4 md:px-8 text-center flex flex-col items-center justify-center border-b border-[#124E7A]">
          <span className="text-[#D6E8F5] text-sm md:text-base font-bold uppercase tracking-widest mb-4">Pusat Edukasi</span>
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold font-serif max-w-4xl leading-tight drop-shadow-sm">
            Pengetahuan untuk Hewan yang Lebih Sehat dan Laut yang Lebih Bersih
          </h1>
        </FadeIn>

        {/* FEATURED ARTICLES (MAGAZINE LAYOUT) */}
        <FadeIn delay={0.2} className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 py-16 lg:py-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1A1A1A]">Artikel Pilihan</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Large Article */}
            <Link href={`/majalah/${featuredLarge.slug}`} className="lg:col-span-8 group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 min-h-[400px] lg:min-h-[500px] flex flex-col justify-end">
              <div className="absolute inset-0">
                <Image src={featuredLarge.image} alt={featuredLarge.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>
              <div className="relative z-10 p-8 lg:p-12 w-full max-w-3xl">
                <span className="inline-block px-3 py-1 bg-[#F26641] text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
                  {featuredLarge.category}
                </span>
                <h3 className="text-white text-3xl lg:text-5xl font-bold font-serif mb-4 leading-tight group-hover:text-[#D6E8F5] transition-colors">
                  {featuredLarge.title}
                </h3>
                <p className="text-[#D6E8F5] text-lg lg:text-xl line-clamp-2 max-w-2xl mb-6">
                  {featuredLarge.excerpt}
                </p>
                <div className="flex items-center gap-2 text-white font-bold hover:text-[#F26641] transition-colors">
                  Baca Artikel <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Small Articles Column */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
              {featuredSmall.map((article, idx) => (
                <Link href={`/majalah/${article.slug}`} key={idx} className="flex-1 group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end min-h-[250px]">
                  <div className="absolute inset-0">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  </div>
                  <div className="relative z-10 p-6 lg:p-8">
                    <span className="inline-block px-3 py-1 bg-[#1B6CA8] text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h3 className="text-white text-xl lg:text-2xl font-bold font-serif leading-tight group-hover:text-[#D6E8F5] transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            
          </div>
        </FadeIn>

        {/* EDUCATIONAL HIGHLIGHT SECTION (THE FLOW) */}
        <FadeIn className="w-full bg-[#1B6CA8] text-white py-20 lg:py-28 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold font-serif mb-6">Dari By-Product Laut Menuju Nutrisi Hewan</h2>
            <p className="text-[#D6E8F5] text-lg lg:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
              Kami memotong rantai pemborosan dengan mengolah sumber daya laut berkualitas tinggi yang biasanya terbuang, mengubahnya menjadi nutrisi premium. Model sirkular ini membantu lautan pulih sekaligus menyehatkan hewan peliharaan Anda.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 w-full max-w-5xl mx-auto">
              {flowSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 group">
                  
                  {/* Step Item */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mb-4 text-[#D6E8F5] group-hover:bg-white group-hover:text-[#1B6CA8] group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
                      {step.icon}
                    </div>
                    <span className="font-bold text-sm lg:text-base tracking-wide uppercase">{step.name}</span>
                  </div>

                  {/* Arrow (Hidden on last item) */}
                  {idx < flowSteps.length - 1 && (
                    <div className="text-white/40 rotate-90 lg:rotate-0 my-4 lg:my-0 pb-10">
                      <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        </FadeIn>



        {/* LATEST ARTICLES */}
        <FadeIn className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pt-16 lg:pt-24 pb-20 lg:pb-32">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1A1A1A] mb-10">Artikel Terbaru</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestArticles.map((article, idx) => (
              <Link href={`/majalah/${article.slug}`} key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E0E7EF] hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F0F4F8]">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <span className="text-[#F26641] text-xs font-bold uppercase tracking-wider mb-2">{article.category}</span>
                  <h3 className="text-xl font-bold font-serif text-[#1A1A1A] mb-4 group-hover:text-[#1B6CA8] transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-[#546E7A] font-bold text-sm group-hover:text-[#1B6CA8] transition-colors">
                    Baca Artikel <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* NEWSLETTER CTA */}
        <FadeIn className="w-full bg-[#E0E7EF]/50 py-16 lg:py-24 border-t border-[#E0E7EF]">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-[#1B6CA8] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white rotate-3">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1A1A1A] mb-4">Tetap Update</h2>
            <p className="text-[#546E7A] text-lg mb-8">
              Dapatkan tips nutrisi hewan dan wawasan keberlanjutan terbaru langsung di kotak masuk Anda.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Masukkan alamat email Anda" 
                className="flex-1 px-5 py-4 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all"
                required
              />
              <button 
                type="submit"
                className="bg-[#1A1A1A] hover:bg-[#2D3133] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm"
              >
                Daftar
              </button>
            </form>
          </div>
        </FadeIn>

      </main>
      <Footer />
    </div>
  );
}
