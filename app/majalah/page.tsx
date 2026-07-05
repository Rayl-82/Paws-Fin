"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Droplets, Heart, Leaf, Mail, RefreshCw, Anchor, Fish, FlaskConical, Cat } from "lucide-react";

export default function EducationalCenter() {
  const featuredLarge = {
    title: "Why Marine By-Products are the Future of Sustainable Pet Nutrition",
    category: "Sustainability",
    image: "/images/featuredmainbanner.png", // Reusing image for demo
    slug: "marine-by-products-future",
    excerpt: "Discover how we are turning unused marine resources into premium, omega-rich nutrition while helping the oceans heal."
  };

  const featuredSmall = [
    {
      title: "The Ultimate Guide to Omega-3s for Cats and Dogs",
      category: "Pet Nutrition",
      image: "/images/sub1.png",
      slug: "ultimate-guide-omega-3",
    },
    {
      title: "Understanding Pet Allergies and How Novel Proteins Help",
      category: "Pet Care Tips",
      image: "/images/sub2.png",
      slug: "understanding-pet-allergies",
    }
  ];

  const categories = [
    { name: "Pet Nutrition", icon: <Heart className="w-6 h-6" />, color: "bg-[#FDDDD5] text-[#BF4A28]" },
    { name: "Omega-3 Benefits", icon: <Droplets className="w-6 h-6" />, color: "bg-[#D6E8F5] text-[#1B6CA8]" },
    { name: "Pet Care Tips", icon: <BookOpen className="w-6 h-6" />, color: "bg-[#E0E7EF] text-[#546E7A]" },
    { name: "Circular Economy", icon: <RefreshCw className="w-6 h-6" />, color: "bg-[#E8F5E9] text-[#2E7D32]" },
  ];

  const latestArticles = [
    { title: "5 Signs Your Pet Needs Joint Support", image: "/images/product1.png", slug: "5-signs-joint-support", category: "Health" },
    { title: "How Much Fish Oil is Too Much?", image: "/images/product2.png", slug: "how-much-fish-oil", category: "Nutrition" },
    { title: "A Day in the Life of a Sustainable Fishery", image: "/images/product3.png", slug: "sustainable-fishery", category: "Behind the Scenes" },
    { title: "Navigating Feline Finickiness", image: "/images/product4.png", slug: "feline-finickiness", category: "Behavior" },
    { title: "The Truth About Grain-Free Diets", image: "/images/cattreats.png", slug: "truth-about-grain-free", category: "Diet" },
    { title: "Eco-Friendly Pet Parenting 101", image: "/images/dogtreats.png", slug: "eco-friendly-pet-parenting", category: "Sustainability" },
  ];

  const flowSteps = [
    { name: "Fishery", icon: <Anchor className="w-8 h-8" /> },
    { name: "Marine By-Products", icon: <Fish className="w-8 h-8" /> },
    { name: "Processing", icon: <FlaskConical className="w-8 h-8" /> },
    { name: "Pet Nutrition", icon: <Heart className="w-8 h-8" /> },
    { name: "Healthier Pets", icon: <Cat className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="w-full flex flex-col items-center flex-grow">
        
        {/* HERO SECTION */}
        <section className="w-full bg-[#1B6CA8] py-20 lg:py-28 px-4 md:px-8 text-center flex flex-col items-center justify-center border-b border-[#124E7A]">
          <span className="text-[#D6E8F5] text-sm md:text-base font-bold uppercase tracking-widest mb-4">Educational Center</span>
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold font-serif max-w-4xl leading-tight drop-shadow-sm">
            Knowledge For Healthier Pets And Healthier Oceans
          </h1>
        </section>

        {/* FEATURED ARTICLES (MAGAZINE LAYOUT) */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 py-16 lg:py-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1A1A1A]">Featured Articles</h2>
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
                  Read Article <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
        </section>

        {/* EDUCATIONAL HIGHLIGHT SECTION (THE FLOW) */}
        <section className="w-full bg-[#1B6CA8] text-white py-20 lg:py-28 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold font-serif mb-6">From Ocean By-Products To Pet Nutrition</h2>
            <p className="text-[#D6E8F5] text-lg lg:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
              We intercept high-quality marine resources that would otherwise go to waste, transforming them into premium nutrition. This circular model heals our oceans while nourishing your pets.
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
        </section>

        {/* BROWSE BY TOPIC */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 py-16 lg:py-24">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1A1A1A] mb-10 text-center md:text-left">Browse By Topic</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, idx) => (
              <Link href={`/majalah?topic=${cat.name.toLowerCase().replace(/ /g, '-')}`} key={idx} className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col justify-center items-center text-center shadow-sm border border-[#E0E7EF] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-bold font-serif text-[#1A1A1A]">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* LATEST ARTICLES */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-20 lg:pb-32">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1A1A1A] mb-10">Latest Articles</h2>
          
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
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="w-full bg-[#E0E7EF]/50 py-16 lg:py-24 border-t border-[#E0E7EF]">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-[#1B6CA8] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white rotate-3">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1A1A1A] mb-4">Stay Updated</h2>
            <p className="text-[#546E7A] text-lg mb-8">
              Get the latest pet nutrition tips and sustainability insights delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-5 py-4 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all"
                required
              />
              <button 
                type="submit"
                className="bg-[#1A1A1A] hover:bg-[#2D3133] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
