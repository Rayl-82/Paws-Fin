"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Scale, Recycle, Handshake, TrendingUp, 
  Search, MessageSquare, FileText, Send,
  Fish, Activity, Droplets, Package, ArrowDown
} from "lucide-react";

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, x: 0,
    transition: { duration: 0.7 }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, x: 0,
    transition: { duration: 0.7 }
  }
};

export default function SuplierPortal() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative overflow-x-clip">
      <Navbar />

      <main className="w-full flex flex-col flex-grow">
        {/* SECTION 1 - HERO */}
        <section className="relative w-full h-[75vh] min-h-[600px] lg:min-h-0 lg:h-[80vh] flex items-center overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/images/nelayan.png"
              alt="Mitra Kelautan"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>

          <div className="relative z-10 w-full h-full max-w-7xl px-4 md:px-8 lg:px-16 mx-auto">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-3xl text-left h-full flex flex-col justify-end pb-40 md:justify-center md:pb-8 pt-20 md:pt-0"
            >
              <motion.h1 variants={fadeUpVariant} className="text-white text-[32px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-6 lg:leading-[1.1] tracking-tight">
                Ubah By-Product Laut Menjadi Nilai Baru
              </motion.h1>
              <motion.p variants={fadeUpVariant} className="text-gray-200 text-base md:text-xl mb-6 md:mb-10 max-w-2xl leading-relaxed">
                Bergabunglah bersama kami untuk mengubah hasil sampingan laut yang tak termanfaatkan menjadi nutrisi hewan premium yang berkelanjutan.
              </motion.p>
              <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 w-full md:w-max">
                <Link href="/suplier-portal/apply" className="inline-flex justify-center bg-[#F26641] hover:bg-[#BF4A28] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all shadow-md hover:-translate-y-1 w-full sm:w-auto">
                  Daftar Menjadi Mitra
                </Link>
                <Link href="/suplier-portal/dashboard" className="inline-flex justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all shadow-md hover:-translate-y-1 w-full sm:w-auto">
                  Dashboard Mitra
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
            <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[120px]" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F7F9FC"></path>
            </svg>
          </div>
        </section>

        {/* SECTION 2 - WHY PARTNER WITH US */}
        <section className="w-full bg-[#F7F9FC] pt-4 pb-16 md:pt-8 md:pb-20 lg:pt-12 lg:pb-32">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center"
          >
            <motion.h2 variants={fadeUpVariant} className="text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center tracking-tight">
              Kenapa Bermitra Dengan Paws&Fin?
            </motion.h2>

            <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar items-stretch">
              {[
                { icon: Scale, title: "Harga Adil", desc: "Kami menghargai setiap bahan yang masih memiliki nilai nutrisi dengan harga yang adil dan transparan." },
                { icon: Recycle, title: "Kurangi Limbah", desc: "Membantu operasional perikanan Anda menekan angka limbah organik secara signifikan." },
                { icon: Handshake, title: "Kemitraan Panjang", desc: "Kami fokus pada hubungan bisnis yang berkelanjutan dan saling menguntungkan." },
                { icon: TrendingUp, title: "Pendapatan Baru", desc: "Mengubah hasil sampingan yang sebelumnya dibuang menjadi aliran pendapatan tambahan." }
              ].map((feature, idx) => (
                <motion.div variants={fadeUpVariant} key={idx} className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0] flex flex-col hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#D6E8F5] text-[#1B6CA8] rounded-xl flex items-center justify-center mb-6">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-[#1A1A1A] text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-[#546E7A] text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 3 - ECOSYSTEM */}
        <section className="w-full bg-[#FFFFFF] py-20 lg:py-32 border-y border-[#E2E8F0] overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Column - Mascot */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInLeft}
              className="flex justify-center lg:justify-end relative"
            >
              <div className="absolute inset-0 bg-[#D6E8F5]/50 blur-3xl rounded-full"></div>
              <Image 
                src="/images/mascot.png" 
                alt="Paws&Fin Mascot" 
                width={400} 
                height={400} 
                className="relative object-contain drop-shadow-xl" 
              />
            </motion.div>
            
            {/* Right Column - Flow */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col max-w-lg items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0"
            >
              <motion.span variants={fadeInRight} className="inline-block px-4 py-1.5 bg-[#D6E8F5] text-[#1B6CA8] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Ekonomi Sirkular
              </motion.span>
              <motion.h2 variants={fadeInRight} className="text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight tracking-tight">
                Memberi Nyawa Baru Pada Sumber Daya Laut
              </motion.h2>
              <motion.p variants={fadeInRight} className="text-[#546E7A] text-base md:text-lg mb-12">
                Bahan yang Anda pasok tidak berakhir begitu saja. Mereka masuk ke dalam ekosistem berkelanjutan kami, berubah menjadi nutrisi premium yang menyehatkan hewan peliharaan.
              </motion.p>
              
              <div className="flex flex-col gap-6 relative text-left w-full">
                {/* Vertical Connection Line */}
                <div className="absolute left-6 top-8 bottom-8 w-1 bg-[#D6E8F5] -z-10"></div>
                
                {[
                  { title: "Perikanan & Mitra Lokal", desc: "Anda menyediakan by-product laut segar." },
                  { title: "Pembersihan & Pemrosesan", desc: "Kami mengolahnya di fasilitas zero-waste kami." },
                  { title: "Nutrisi Hewan Premium", desc: "Diformulasikan menjadi makanan & suplemen standar dokter." },
                  { title: "Sampai ke Tangan Konsumen", desc: "Mendukung hewan peliharaan yang lebih sehat dan lautan bersih." }
                ].map((step, idx) => (
                  <motion.div variants={fadeInRight} key={idx} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-[#1B6CA8] text-white flex items-center justify-center shrink-0 shadow-md border-4 border-white group-hover:scale-110 transition-transform">
                      <ArrowDown size={20} />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-[#1A1A1A] font-bold text-xl mb-1">{step.title}</h4>
                      <p className="text-[#546E7A] text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4 - WHAT WE SOURCE */}
        <section className="w-full bg-[#124E7A] py-16 md:py-20 lg:py-32">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center"
          >
            <motion.span variants={fadeUpVariant} className="text-[#F26641] font-semibold text-sm tracking-widest uppercase mb-4 text-center block">
              Kebutuhan Pasokan
            </motion.span>
            <motion.h2 variants={fadeUpVariant} className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center tracking-tight">
              Bahan Yang Kami Cari
            </motion.h2>

            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-8 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar items-stretch">
              {[
                { 
                  icon: Fish, 
                  title: "Kulit Ikan", 
                  desc: "Digunakan untuk membuat camilan pembersih gigi yang renyah dan berprotein tinggi." 
                },
                { 
                  icon: Activity, 
                  title: "Tulang & Rangka", 
                  desc: "Diproses menjadi kaldu tulang kaya nutrisi dan basis bubuk makanan." 
                },
                { 
                  icon: Droplets, 
                  title: "Minyak & Trimming", 
                  desc: "Diekstraksi untuk suplemen Omega-3 esensial kualitas premium." 
                },
                { 
                  icon: Package, 
                  title: "By-Product Lainnya", 
                  desc: "Hubungi kami jika Anda memiliki bahan laut organik bersih lainnya." 
                }
              ].map((item, idx) => (
                <motion.div variants={fadeUpVariant} key={idx} className="min-w-[75vw] sm:min-w-0 snap-center bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/20 flex flex-col items-start hover:border-[#F26641] hover:bg-white/15 transition-all group cursor-default">
                  <div className="w-12 h-12 bg-[#0C3350] text-[#F26641] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-[#D6E8F5] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 5 - SIMPLE PROCESS */}
        <section className="w-full bg-[#FFFFFF] py-16 md:py-20 lg:py-32">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center"
          >
            <motion.h2 variants={fadeUpVariant} className="text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl font-bold mb-16 md:mb-20 text-center tracking-tight">
              Cara Kerja
            </motion.h2>

            <div className="w-full flex flex-col lg:flex-row justify-between items-center relative gap-12 lg:gap-4 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
                className="hidden lg:block absolute top-10 left-16 right-16 h-1 bg-[#D6E8F5] z-0 origin-left" 
              />
              <div className="block lg:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-[#D6E8F5] z-0"></div>

              {[
                { icon: Send, title: "Kirim Pengajuan" },
                { icon: Search, title: "Review Material" },
                { icon: MessageSquare, title: "Diskusi Kemitraan" },
                { icon: FileText, title: "Perjanjian Kontrak" }
              ].map((step, idx) => (
                <motion.div variants={fadeUpVariant} key={idx} className="relative z-10 flex flex-col items-center text-center w-full lg:max-w-[200px]">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-[#FFFFFF]">
                    <div className="w-16 h-16 rounded-full bg-[#1B6CA8] text-white flex items-center justify-center shadow-inner">
                       <step.icon size={24} />
                    </div>
                  </div>
                  <h4 className="text-[#0C3350] text-lg font-bold bg-[#FFFFFF] px-4 py-1">{step.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 6 - CTA */}
        <section id="contact" className="w-full bg-[#F7F9FC] py-24 text-center border-t border-[#E2E8F0]">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center"
          >
            <motion.h2 variants={fadeUpVariant} className="text-[#1A1A1A] text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Siap Menciptakan Nilai Baru Bersama?
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-[#546E7A] text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
              Baik Anda perikanan lokal, pengolah makanan laut, atau distributor, kami ingin menjajaki kemitraan jangka panjang dengan Anda.
            </motion.p>
            <motion.div variants={fadeUpVariant}>
              <Link href="/suplier-portal/apply" className="bg-[#1B6CA8] hover:bg-[#124E7A] text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:-translate-y-1 text-lg inline-block">
                Ajukan Kemitraan
              </Link>
            </motion.div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
