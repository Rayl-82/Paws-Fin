import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Scale, Recycle, Handshake, TrendingUp, 
  Search, MessageSquare, FileText, Send,
  Fish, Activity, Droplets, Package, ArrowDown
} from "lucide-react";

export default function SuplierPortal() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative">
      <Navbar />

      <main className="w-full flex flex-col flex-grow">
        {/* SECTION 1 - HERO */}
        <section className="relative w-full h-[70vh] min-h-[480px] lg:min-h-0 lg:h-[700px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/nelayan.png"
              alt="Marine Sourcing Partners"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 w-full h-full max-w-7xl px-4 md:px-8 lg:px-16 mx-auto">
            <div className="max-w-3xl text-left h-full flex flex-col justify-end pb-24 md:justify-center md:pb-0 pt-20 md:pt-0">
              <h1 className="text-white text-[32px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-bold font-serif mb-3 md:mb-6 lg:leading-[1.1]">
                Turn Marine By-Products Into New Value
              </h1>
              <p className="text-gray-200 text-base md:text-xl mb-6 md:mb-10 max-w-2xl leading-relaxed">
                Partner with us to transform underutilized marine by-products into premium, sustainable pet nutrition.
              </p>
              <Link href="#contact" className="inline-flex justify-center bg-[#F26641] hover:bg-[#BF4A28] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl transition-all shadow-md hover:-translate-y-1 w-full md:w-max">
                Become a Supplier
              </Link>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
            <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[120px]" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F7F9FC"></path>
            </svg>
          </div>
        </section>

        {/* SECTION 2 - WHY PARTNER WITH US */}
        <section className="w-full bg-[#F7F9FC] py-12 md:py-20 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <h2 className="text-[#1A1A1A] text-3xl md:text-4xl font-bold font-serif mb-12 md:mb-16 text-center">
              Why Partner With Paws&Fin
            </h2>

            {/* Mobile Horizontal Carousel / Desktop Grid */}
            <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar items-stretch">
              {[
                { icon: Scale, title: "Fair Sourcing", desc: "Kami menghargai setiap bahan yang masih memiliki nilai nutrisi dengan harga yang adil." },
                { icon: Recycle, title: "Reduce Waste", desc: "Membantu perusahaan Anda mengurangi limbah hasil laut secara signifikan." },
                { icon: Handshake, title: "Long-Term Partnership", desc: "Fokus pada hubungan bisnis jangka panjang yang saling menguntungkan." },
                { icon: TrendingUp, title: "Create Additional Revenue", desc: "Mengubah hasil sampingan yang sebelumnya dibuang menjadi sumber pendapatan tambahan." }
              ].map((feature, idx) => (
                <div key={idx} className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#E2E8F0] flex flex-col hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#D6E8F5] text-[#1B6CA8] rounded-xl flex items-center justify-center mb-6">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-[#1A1A1A] text-lg sm:text-xl font-bold font-serif mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-[#546E7A] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 - ECOSYSTEM (NEW) */}
        <section className="w-full bg-[#FFFFFF] py-20 lg:py-32 border-y border-[#E2E8F0]">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Column - Mascot */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 bg-[#D6E8F5]/50 blur-3xl rounded-full"></div>
              <Image 
                src="/images/mascot.png" 
                alt="Paws&Fin Mascot" 
                width={400} 
                height={400} 
                className="relative object-contain drop-shadow-xl" 
              />
            </div>
            
            {/* Right Column - Flow */}
            <div className="flex flex-col max-w-lg items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0">
              <h2 className="text-[#1A1A1A] text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-4 lg:mb-6 leading-tight">
                Giving Marine Resources A Second Life
              </h2>
              <p className="text-[#546E7A] text-base md:text-lg mb-12">
                Your supplied materials don't just disappear. They enter our sustainable ecosystem, transforming into high-quality nutrition that makes a real difference.
              </p>
              
              <div className="flex flex-col gap-6 relative">
                {/* Vertical Connection Line */}
                <div className="absolute left-6 top-8 bottom-8 w-1 bg-[#D6E8F5] -z-10"></div>
                
                {[
                  { title: "Local Fisheries & Suppliers", desc: "You provide fresh marine by-products." },
                  { title: "Cleaning & Processing", desc: "We process them in our zero-waste facilities." },
                  { title: "Premium Pet Nutrition", desc: "Formulated into vet-approved treats and kibble." },
                  { title: "Delivered To Pet Parents", desc: "Supporting healthier pets and a cleaner ocean." }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-[#1B6CA8] text-white flex items-center justify-center shrink-0 shadow-md border-4 border-white group-hover:scale-110 transition-transform">
                      <ArrowDown size={20} />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-[#1A1A1A] font-bold font-serif text-xl mb-1">{step.title}</h4>
                      <p className="text-[#546E7A] text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4 - WHAT WE SOURCE */}
        <section className="w-full bg-[#F7F9FC] py-16 md:py-20 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <h2 className="text-[#1A1A1A] text-3xl md:text-4xl font-bold font-serif mb-12 md:mb-16 text-center">
              What We Source
            </h2>

            {/* Mobile Horizontal Carousel / Desktop Grid */}
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none pb-8 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar items-stretch">
              {[
                { 
                  icon: Fish, 
                  title: "Fish Skin", 
                  desc: "Used to create our crunchy, high-protein dental chews." 
                },
                { 
                  icon: Activity, 
                  title: "Fish Frames", 
                  desc: "Processed into nutrient-dense bone broth and meal bases." 
                },
                { 
                  icon: Droplets, 
                  title: "Fish Oil & Trimmings", 
                  desc: "Extracted for essential Omega-3 supplements." 
                },
                { 
                  icon: Package, 
                  title: "Other By-Products", 
                  desc: "Contact us if you have other clean marine materials." 
                }
              ].map((item, idx) => (
                <div key={idx} className="min-w-[75vw] sm:min-w-0 snap-center bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] flex flex-col items-start hover:border-[#1B6CA8] transition-colors group cursor-default">
                  <div className="w-12 h-12 bg-[#D6E8F5] text-[#1B6CA8] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1B6CA8] group-hover:text-white transition-colors">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-[#1A1A1A] text-lg sm:text-xl font-bold font-serif mb-2">{item.title}</h3>
                  <p className="text-[#546E7A] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 - IMPACT METRICS (NEW) */}
        <section className="w-full bg-[#124E7A] py-20 text-white">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <span className="text-[#F26641] font-semibold text-sm tracking-widest uppercase mb-4 text-center block">Our Impact</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-16 text-center">
              Building A Better Future Together
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full text-center">
              {[
                { value: "500kg+", label: "Marine By-Products Repurposed" },
                { value: "120+", label: "Partner Suppliers" },
                { value: "2,000+", label: "Pets Served Monthly" },
                { value: "0%", label: "Waste Philosophy" }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-[#F26641] text-3xl sm:text-5xl font-bold font-serif mb-2 sm:mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[#D6E8F5] text-xs sm:text-sm font-medium uppercase tracking-wide max-w-[180px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 - SIMPLE PROCESS */}
        <section className="w-full bg-[#FFFFFF] py-16 md:py-20 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <h2 className="text-[#1A1A1A] text-3xl md:text-4xl font-bold font-serif mb-16 md:mb-20 text-center">
              How It Works
            </h2>

            <div className="w-full flex flex-col lg:flex-row justify-between items-center relative gap-12 lg:gap-4 max-w-5xl mx-auto">
              {/* Connection Line Desktop */}
              <div className="hidden lg:block absolute top-10 left-16 right-16 h-1 bg-[#D6E8F5] z-0"></div>
              {/* Connection Line Mobile */}
              <div className="block lg:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-[#D6E8F5] z-0"></div>

              {[
                { icon: Send, title: "Submit Inquiry" },
                { icon: Search, title: "Material Review" },
                { icon: MessageSquare, title: "Partnership Discussion" },
                { icon: FileText, title: "Supply Agreement" }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center w-full lg:max-w-[200px]">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-[#FFFFFF]">
                    <div className="w-16 h-16 rounded-full bg-[#1B6CA8] text-white flex items-center justify-center shadow-inner">
                       <step.icon size={24} />
                    </div>
                  </div>
                  <h4 className="text-[#0C3350] text-lg font-bold font-serif bg-[#FFFFFF] px-4 py-1">{step.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 - CTA */}
        <section id="contact" className="w-full bg-[#F7F9FC] py-24 text-center border-t border-[#E2E8F0]">
          <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-[#1A1A1A] text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
              Ready To Create Value Together?
            </h2>
            <p className="text-[#546E7A] text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
              Whether you're a local fishery, seafood processor, or distributor, we'd love to explore a long-term partnership with you.
            </p>
            <Link href="mailto:partnership@pawsnfin.com" className="bg-[#1B6CA8] hover:bg-[#124E7A] text-white font-semibold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 text-lg">
              Contact Our Team
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
