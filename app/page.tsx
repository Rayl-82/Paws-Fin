"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Anchor, Heart, Leaf, Map, Droplets, Activity, Recycle, Check, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
export default function Home() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="w-full flex flex-col flex-grow">
        {/* SECTION 1 - HERO */}
        <section className="relative w-full h-[75vh] min-h-[600px] lg:min-h-0 lg:h-[80vh] flex items-center overflow-hidden">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 scale-[1.2] origin-top">
            <Image
              src="/images/LandingPageBanner.png"
              alt="Nutrisi Kelautan Berkelanjutan"
              fill
              className="object-cover object-[75%_center] md:object-[35%_center]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          </motion.div>

          <div className="relative z-10 w-full h-full max-w-7xl px-4 md:px-8 lg:px-16 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl text-left h-full flex flex-col justify-end pb-40 md:justify-center md:pb-8 pt-20 md:pt-0"
            >
              <span className="text-[#F26641] font-semibold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 block">
                Nutrisi Kelautan Berkelanjutan
              </span>
              <h1 className="text-white text-[32px] leading-tight sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 tracking-tight lg:leading-[1.1]">
                Better For Pets.<br />Better For Oceans.
              </h1>
              <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-6 md:mb-10 max-w-lg leading-relaxed">
                Mengubah by-product laut yang kurang termanfaatkan menjadi nutrisi premium untuk hewan yang lebih sehat.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/shop/products" className="bg-[#F26641] hover:bg-[#BF4A28] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full flex justify-center items-center gap-2 transition-all shadow-md hover:-translate-y-1 hover:shadow-lg">
                  Eksplor Produk
                  <ArrowRight size={20} />
                </Link>
                <Link href="/shop/personalized" className="bg-white/10 hover:bg-white text-white hover:text-[#0C3350] border border-white/30 backdrop-blur-sm font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full flex justify-center items-center transition-all shadow-md hover:-translate-y-1 hover:shadow-lg">
                  Ikuti Kuis
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
            <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[120px]" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F7F9FC"></path>
            </svg>
          </div>
        </section>



        {/* SECTION 3 - UNIFIED WHY PAWS&FIN */}
        <section className="w-full bg-[#F7F9FC] pt-12 pb-20 lg:pt-16 lg:pb-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-16 lg:gap-24">

            {/* Top Row: Mascot Left, Text Right */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-md animate-float">
                  <div className="absolute inset-0 bg-white/60 blur-3xl rounded-full"></div>
                  <Image src="/images/mascot.png" alt="Paws&Fin Mascot" width={448} height={448} className="relative object-contain w-full h-auto drop-shadow-2xl" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <span className="inline-block px-4 py-1.5 bg-[#D6E8F5] text-[#1B6CA8] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Kenapa Paws & Fin?
                </span>
                <h2 className="text-[#0C3350] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 leading-tight tracking-tight">
                  Dipandu oleh Alam,<br />Ditenagai oleh Laut
                </h2>
                <ul className="text-[#0C3350] font-medium space-y-4 mb-8 text-base lg:text-lg w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 text-left">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F26641] flex items-center justify-center shrink-0 shadow-sm">
                      <Check strokeWidth={3} className="w-4 h-4 text-white" />
                    </div>
                    100% Sumber Laut Terlacak
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F26641] flex items-center justify-center shrink-0 shadow-sm">
                      <Check strokeWidth={3} className="w-4 h-4 text-white" />
                    </div>
                    Praktik Ekonomi Sirkular
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F26641] flex items-center justify-center shrink-0 shadow-sm">
                      <Check strokeWidth={3} className="w-4 h-4 text-white" />
                    </div>
                    Formula Disetujui Dokter Hewan
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Bottom Row: Circle of Wellness (Flowchart) */}
            <div className="flex flex-col items-center mt-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[#0C3350] text-3xl font-bold mb-16 text-center"
              >
                Siklus Kesejahteraan
              </motion.h3>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.2 } }
                }}
                className="w-full flex flex-col lg:flex-row justify-between items-center relative gap-8 lg:gap-4"
              >
                {/* Horizontal Connection Line (Desktop) */}
                <div className="hidden lg:block absolute top-10 left-16 right-16 h-1 bg-[#D6E8F5] z-0"></div>
                {/* Vertical Connection Line (Mobile) */}
                <div className="block lg:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-[#D6E8F5] z-0"></div>

                {[
                  { icon: Anchor, title: "Ocean Resources", desc: "Sustainable fishing & harvesting" },
                  { icon: Droplets, title: "Zero Waste", desc: "Efficient marine processing" },
                  { icon: Activity, title: "Premium Nutrition", desc: "Vet-crafted functional formulas" },
                  { icon: Heart, title: "Healthier Pets", desc: "Vitality, joints & longevity" },
                  { icon: Recycle, title: "Circular Impact", desc: "Giving back to the sea" }
                ].map((step, idx) => (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      show: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } }
                    }}
                    key={idx}
                    className="relative z-10 flex flex-col items-center text-center w-full lg:max-w-[200px] group hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-[#F7F9FC] outline outline-4 outline-white group-hover:shadow-lg transition-shadow">
                      <div className={`w-16 h-16 rounded-full text-white flex items-center justify-center shadow-inner ${idx % 2 === 0 ? "bg-[#0C3350]" : "bg-[#F26641]"}`}>
                        <step.icon size={28} />
                      </div>
                    </div>
                    <h4 className="text-[#0C3350] text-lg font-bold mb-2 bg-[#F7F9FC] px-2">{step.title}</h4>
                    <p className="text-[#546E7A] text-sm bg-[#F7F9FC] px-2 leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </section>

        {/* SECTION 4 - OUR COMMITMENT (Streamlined) */}
        <section className="w-full bg-[#124E7A] py-24 lg:py-32 text-white relative overflow-hidden">
          {/* Subtle wave background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 1440 320" className="absolute top-0 w-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            <div className="flex flex-col">
              <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#F26641]/20 text-[#F26641] rounded-full text-xs font-bold uppercase tracking-widest mb-6 w-max border border-[#F26641]/30">
                Komitmen Kami
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
                Radical Transparency,<br />Real Impact
              </h2>
              <p className="text-[#D6E8F5] text-lg leading-relaxed mb-12 max-w-lg">
                We utilize 100% of the marine by-products we source, ensuring zero waste while delivering concentrated nutrients.
              </p>

              <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
                <div className="group">
                  <h4 className="text-5xl font-bold text-[#F26641] mb-2 group-hover:scale-110 transition-transform origin-left">0%</h4>
                  <p className="font-bold text-white mb-1 text-lg">Waste Goal</p>
                  <p className="text-[#7AB3D4] text-sm max-w-[150px]">Full utilization of marine ingredients.</p>
                </div>
                <div className="group">
                  <h4 className="text-5xl font-bold text-[#F26641] mb-2 group-hover:scale-110 transition-transform origin-left">100%</h4>
                  <p className="font-bold text-white mb-1 text-lg">Traceable</p>
                  <p className="text-[#7AB3D4] text-sm max-w-[150px]">From ocean source to pet bowl.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-[#0C3350]/80 backdrop-blur-md p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-[#1B6CA8]/30 hover:border-[#1B6CA8]/60 transition-colors">
              <h3 className="text-2xl font-bold mb-8 text-white border-b border-white/10 pb-6">Nutritional Standards</h3>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#1B6CA8] flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-white mb-1">Rich in Omega-3 DHA & EPA</span>
                    <span className="text-[#7AB3D4]">Essential for cognitive function and joint health.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#1B6CA8] flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-white mb-1">Clean Marine Protein</span>
                    <span className="text-[#7AB3D4]">Highly digestible and perfect for sensitive stomachs.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#1B6CA8] flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-white mb-1">No Artificial Preservatives</span>
                    <span className="text-[#7AB3D4]">Naturally stabilized using tocopherols.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>



        {/* SECTION 6 - MARQUEE */}
        <div className="w-full bg-[#F26641] py-4 overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee inline-block font-bold text-white tracking-widest text-xs md:text-sm uppercase px-4 flex items-center">
            <span className="mx-8">HEWAN SEHAT</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">LAUT BERKELANJUTAN</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">NUTRISI PREMIUM</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">EKONOMI SIRKULAR</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
          </div>
          <div className="animate-marquee inline-block font-bold text-white tracking-widest text-xs md:text-sm uppercase px-4 flex items-center" aria-hidden="true">
            <span className="mx-8">HEWAN SEHAT</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">LAUT BERKELANJUTAN</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">NUTRISI PREMIUM</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">EKONOMI SIRKULAR</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
          </div>
        </div>


        {/* SECTION 7 - DISCOVER YOUR PATH */}
        <section className="w-full bg-[#F7F9FC] py-24 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 bg-[#FDDDD5] text-[#F26641] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Mulai Sekarang
            </span>
            <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-bold mb-16 text-center tracking-tight">
              Temukan Jalur Kesehatannya
            </h2>

            {/* Mobile Horizontal Carousel / Desktop Grid */}
            <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar items-stretch">

              {/* Card 1 - Shop */}
              <div className="min-w-[75vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-3xl border border-[#E0E7EF] flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="w-full h-56 relative bg-[#F0F4F8] flex items-center justify-center overflow-hidden">
                  <Image src="/images/product3.png" alt="Belanja Nutrisi Premium" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-[#191C1E] text-2xl font-bold mb-4 group-hover:text-[#1B6CA8] transition-colors">Belanja Nutrisi Premium</h3>
                  <p className="text-[#546E7A] text-base mb-8 flex-grow leading-relaxed">
                    Browse our full range of marine-sourced kibble, wet food, and specialized supplements.
                  </p>
                  <Link href="/shop/products" className="w-full border-2 border-[#1B6CA8] text-[#1B6CA8] hover:bg-[#1B6CA8] hover:text-white font-bold py-4 px-6 rounded-full transition-colors text-center mt-auto">
                    Belanja Sekarang
                  </Link>
                </div>
              </div>

              {/* Card 2 - Pet Quiz (Highlight) */}
              <div className="min-w-[75vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-3xl border-2 border-[#F26641] flex flex-col overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 relative">
                <div className="absolute top-0 left-0 w-full h-10 bg-[#F26641] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center z-20">
                  Recommended For New Pets
                </div>
                <div className="w-full h-56 relative bg-gradient-to-b from-[#FDDDD5] to-white flex items-center justify-center mt-10 overflow-hidden z-10">
                  <Image src="/images/mascot.png" alt="Pet Recommendations" fill className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-[#191C1E] text-2xl font-bold mb-4 group-hover:text-[#F26641] transition-colors">Buat Profil Hewan</h3>
                  <p className="text-[#546E7A] text-base mb-8 flex-grow leading-relaxed">
                    Take our vet-designed quiz to find the perfect marine formula tailored specifically to your pet's needs.
                  </p>
                  <Link href="/shop/personalized" className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white font-bold py-4 px-6 rounded-full transition-colors text-center mt-auto shadow-md hover:shadow-lg">
                    Mulai Kuis
                  </Link>
                </div>
              </div>

              {/* Card 3 - Subscriptions */}
              <div className="min-w-[75vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-3xl border border-[#E0E7EF] flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="w-full h-56 relative bg-[#F0F4F8] flex items-center justify-center overflow-hidden">
                  <Image src="/images/sub3.png" alt="Langganan Spesial" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-[#191C1E] text-2xl font-bold mb-4 group-hover:text-[#1B6CA8] transition-colors">Langganan Spesial</h3>
                  <p className="text-[#546E7A] text-base mb-8 flex-grow leading-relaxed">
                    Set and forget. Get freshly crafted meals delivered to your door exactly when you need them.
                  </p>
                  <Link href="/shop/subscriptions/1" className="w-full border-2 border-[#1B6CA8] text-[#1B6CA8] hover:bg-[#1B6CA8] hover:text-white font-bold py-4 px-6 rounded-full transition-colors text-center mt-auto">
                    Lihat Paket
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
