import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Anchor, Heart, Leaf, Map, Droplets, Activity, Recycle, Check, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative">
      <Navbar />

      <main className="w-full flex flex-col flex-grow">
        {/* SECTION 1 - HERO */}
        <section className="relative w-full h-[75vh] min-h-[500px] lg:min-h-0 lg:h-[850px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/LandingPageBanner.png"
              alt="Sustainable Marine Nutrition"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full h-full max-w-7xl px-4 md:px-8 lg:px-16 mx-auto">
            <div className="max-w-2xl text-left h-full flex flex-col justify-end pb-24 md:justify-center md:pb-0 pt-20 md:pt-0">
              <span className="text-[#F26641] font-semibold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 block">
                Sustainable Marine Nutrition
              </span>
              <h1 className="text-white text-[32px] leading-tight sm:text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-3 md:mb-6 lg:leading-[1.1]">
                Better For Pets.<br />Better For Oceans.
              </h1>
              <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-6 md:mb-10 max-w-lg leading-relaxed">
                We transform marine resources into premium pet nutrition that supports health and reduces waste.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/shop/products" className="bg-[#F26641] hover:bg-[#BF4A28] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl flex justify-center items-center gap-2 transition-all shadow-md hover:-translate-y-1">
                  Explore Products
                  <ArrowRight size={20} />
                </Link>
                <Link href="/shop/personalized" className="bg-white hover:bg-gray-50 text-[#1B6CA8] font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl flex justify-center items-center transition-all shadow-md hover:-translate-y-1">
                  Take The Quiz
                </Link>
              </div>
            </div>
          </div>

          {/* Wave Divider (Changed fill to #F7F9FC) */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
            <svg viewBox="0 0 1440 120" className="w-full h-[40px] md:h-[120px]" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F7F9FC"></path>
            </svg>
          </div>
        </section>

        {/* SECTION 2 - GUIDED BY NATURE (HOW IT WORKS) */}
        {/* Changed bg to #F7F9FC */}
        <section className="w-full bg-[#F7F9FC] py-12 md:py-20 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col gap-16 md:gap-24">

            {/* Top Row: Mascot Left, Text Right */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-white/60 blur-2xl rounded-full"></div>
                  <Image src="/images/mascot.png" alt="Paws&Fin Mascot" width={448} height={448} className="relative object-contain w-full h-auto drop-shadow-md" />
                </div>
              </div>

              <div className="flex-1 flex flex-col max-w-xl items-center text-center lg:items-start lg:text-left">
                <h2 className="text-[#0C3350] text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mb-4 lg:mb-6 leading-tight">
                  Guided by Nature,<br />Powered by the Sea
                </h2>
                <ul className="text-[#0C3350] font-medium space-y-4 mb-8 text-base lg:text-lg w-full max-w-sm lg:max-w-none mx-auto lg:mx-0 text-left">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#FE6F49] flex items-center justify-center shrink-0 shadow-sm">
                      <Check strokeWidth={3} className="w-4 h-4 text-white" />
                    </div>
                    100% Traceable Marine Sourcing
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#FE6F49] flex items-center justify-center shrink-0 shadow-sm">
                      <Check strokeWidth={3} className="w-4 h-4 text-white" />
                    </div>
                    Circular Economy Practices
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#FE6F49] flex items-center justify-center shrink-0 shadow-sm">
                      <Check strokeWidth={3} className="w-4 h-4 text-white" />
                    </div>
                    Veterinarian Approved Formulas
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Row: Circle of Wellness */}
            <div className="flex flex-col items-center">
              <h3 className="text-[#0C3350] text-3xl font-bold font-serif mb-16 text-center">The Circle of Wellness</h3>

              <div className="w-full flex flex-col lg:flex-row justify-between items-center relative gap-8 lg:gap-4">
                {/* Horizontal Connection Line (Desktop) */}
                <div className="hidden lg:block absolute top-10 left-16 right-16 h-1 bg-[#D6E8F5] z-0"></div>
                {/* Vertical Connection Line (Mobile) */}
                <div className="block lg:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-[#D6E8F5] z-0"></div>

                {[
                  { icon: Anchor, title: "Ocean Resources", desc: "Sustainable fishing & harvesting" },
                  { icon: Droplets, title: "Sustainable Processing", desc: "Zero-waste facilities" },
                  { icon: Activity, title: "Premium Nutrition", desc: "Vet-crafted formulas" },
                  { icon: Heart, title: "Healthier Pets", desc: "Vitality & longevity" },
                  { icon: Recycle, title: "Circular Impact", desc: "Giving back to the sea" }
                ].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center w-full lg:max-w-[200px]">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-[#F7F9FC] outline outline-4 outline-white">
                      <div className={`w-16 h-16 rounded-full text-white flex items-center justify-center shadow-inner ${idx % 2 === 0 ? "bg-[#0C3350]" : "bg-[#FE6F49]"}`}>
                        <step.icon size={28} />
                      </div>
                    </div>
                    <h4 className="text-[#0C3350] text-lg font-bold font-serif mb-2 bg-[#F7F9FC] px-2">{step.title}</h4>
                    <p className="text-[#546E7A] text-sm bg-[#F7F9FC] px-2">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - WHY PAWS&FIN (Moved up, added descriptions) */}
        <section className="w-full bg-[#FFFFFF] py-20 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-bold font-serif mb-16 text-center">
              Designed For Pets And The Planet
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
              {[
                { icon: Droplets, title: "Marine-Based", desc: "Harnessing the power of underutilized ocean resources for optimal health." },
                { icon: Activity, title: "Functional Nutrition", desc: "Targeted recipes designed to support joint, skin, and cognitive health." },
                { icon: Heart, title: "Personalized", desc: "Custom meal plans tailored precisely to your pet's unique profile." },
                { icon: Leaf, title: "Sustainable Sourcing", desc: "Zero-waste practices that protect maritime ecosystems for the future." }
              ].map((feature, idx) => (
                <div key={idx} className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-8 shadow-sm border border-[#F0F4F8] flex flex-col items-center text-center hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#D6E8F5] text-[#1B6CA8] rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <feature.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-[#1A1A1A] text-base sm:text-xl font-bold font-serif mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-[#546E7A] text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 - IMPACT STATS (Changed bg to #F7F9FC) */}
        <section className="w-full bg-[#F7F9FC] py-20 lg:py-24 border-y border-[#E2E8F0]">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <h2 className="text-[#1A1A1A] text-3xl lg:text-4xl font-bold font-serif mb-16 text-center">
              Making Every Treat Matter
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full text-center">
              {[
                { value: "120kg+", label: "Marine Resources Rescued" },
                { value: "10,000+", label: "Products Delivered" },
                { value: "95%", label: "Natural Ingredients" },
                { value: "100%", label: "Focused On Sustainability" }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-[#1B6CA8] text-3xl sm:text-5xl font-bold font-serif mb-2 sm:mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[#546E7A] text-xs sm:text-base font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 - OUR COMMITMENT */}
        <section className="w-full bg-[#124E7A] py-20 lg:py-24 text-white">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col">
              <span className="text-[#F26641] font-semibold text-sm tracking-widest uppercase mb-4 block">Our Commitment</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-6 leading-tight">
                Radical Transparency,<br />Real Impact
              </h2>
              <p className="text-[#D6E8F5] text-lg leading-relaxed mb-12 max-w-lg">
                We utilize 100% of the marine by-products we source, ensuring zero waste while delivering concentrated nutrients. Every batch is traceable back to its sustainable origin.
              </p>

              {/* Added breathing room between stats */}
              <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
                <div>
                  <h4 className="text-5xl font-bold font-serif text-[#F26641] mb-2">0%</h4>
                  <p className="font-bold text-white mb-1 text-lg">Waste Goal</p>
                  <p className="text-[#7AB3D4] text-sm max-w-[150px]">Full utilization of marine ingredients.</p>
                </div>
                <div>
                  <h4 className="text-5xl font-bold font-serif text-[#F26641] mb-2">100%</h4>
                  <p className="font-bold text-white mb-1 text-lg">Traceable</p>
                  <p className="text-[#7AB3D4] text-sm max-w-[150px]">From ocean source to pet bowl.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-[#0C3350] p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-[#1B6CA8]/30">
              <h3 className="text-xl sm:text-2xl font-bold font-serif mb-6 sm:mb-8 text-white">Nutritional Standards</h3>
              <ul className="space-y-8">
                <li className="flex flex-col">
                  <span className="font-bold text-lg text-white mb-1">Rich in Omega-3 DHA &amp; EPA</span>
                  <span className="text-[#7AB3D4]">Essential for cognitive function and joint health.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-lg text-white mb-1">Clean Marine Protein</span>
                  <span className="text-[#7AB3D4]">Highly digestible and perfect for sensitive stomachs.</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-lg text-white mb-1">No Artificial Preservatives</span>
                  <span className="text-[#7AB3D4]">Naturally stabilized using tocopherols.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6 - TESTIMONIALS (NEW) */}
        <section className="w-full bg-[#FFFFFF] py-20 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <span className="text-[#1B6CA8] font-semibold text-sm tracking-widest uppercase mb-4 text-center block">Community</span>
            <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-bold font-serif mb-16 text-center">
              Loved By Pets &amp; Owners
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[
                {
                  name: "Sarah & Max (Golden Retriever)",
                  text: "The personalized subscription box completely changed Max's coat. It's so much shinier now, and I love knowing we are supporting sustainable ocean practices!",
                  rating: 5
                },
                {
                  name: "David & Luna (Siamese Mix)",
                  text: "Luna is incredibly picky, but she goes crazy for the marine kibble. The quiz made it so easy to find exactly what she needed for her sensitive stomach.",
                  rating: 5
                },
                {
                  name: "Emily & Buster (Bulldog)",
                  text: "Finally, a pet food company that actually cares about the planet. The quality is unmatched, and having it delivered monthly is a lifesaver.",
                  rating: 5
                }
              ].map((review, idx) => (
                <div key={idx} className="bg-[#F7F9FC] rounded-2xl p-8 shadow-sm flex flex-col">
                  <div className="flex gap-1 mb-6 text-[#F26641]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[#1A1A1A] text-lg italic mb-8 flex-grow">
                    "{review.text}"
                  </p>
                  <p className="text-[#546E7A] font-bold font-serif">
                    — {review.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 - MARQUEE */}
        <div className="w-full bg-[#F26641] py-3 md:py-4 overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee inline-block font-bold text-white tracking-widest text-xs md:text-sm uppercase px-4 flex items-center">
            <span className="mx-8">HEALTHY PETS</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">SUSTAINABLE OCEAN</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">PREMIUM NUTRITION</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">CIRCULAR ECONOMY</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
          </div>
          <div className="animate-marquee inline-block font-bold text-white tracking-widest text-xs md:text-sm uppercase px-4 flex items-center" aria-hidden="true">
            <span className="mx-8">HEALTHY PETS</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">SUSTAINABLE OCEAN</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">PREMIUM NUTRITION</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
            <span className="mx-8">CIRCULAR ECONOMY</span><span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span>
          </div>
        </div>

        {/* SECTION 8 - DISCOVER YOUR PATH (Moved down, Pet Quiz is primary) */}
        <section className="w-full bg-[#F7F9FC] py-20 lg:py-32">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center">
            <span className="text-[#F26641] font-semibold text-sm tracking-widest uppercase mb-4 text-center block">Get Started</span>
            <h2 className="text-[#1A1A1A] text-4xl lg:text-5xl font-bold font-serif mb-6 text-center">
              Discover Your Path to Wellness
            </h2>

            {/* Mobile Horizontal Carousel / Desktop Grid */}
            <div className="flex lg:grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar items-stretch">
              
              {/* Card 1 - Shop */}
              <div className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-2xl border-2 border-transparent hover:border-[#D6E8F5] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-full h-48 sm:h-56 relative bg-[#F0F4F8] flex items-center justify-center overflow-hidden">
                  <Image src="/images/product3.png" alt="Shop Premium Nutrition" fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-[#191C1E] text-xl sm:text-2xl font-bold font-serif mb-3 sm:mb-4 group-hover:text-[#1B6CA8] transition-colors">Shop Premium Nutrition</h3>
                  <p className="text-[#414750] text-sm sm:text-base mb-6 sm:mb-8 flex-grow">
                    Browse our full range of marine-sourced kibble, wet food, and specialized supplements.
                  </p>
                  <Link href="/shop/products" className="w-full border-2 border-[#1B6CA8] text-[#1B6CA8] hover:bg-[#1B6CA8] hover:text-white font-bold py-3 px-6 rounded-xl transition-colors text-center mt-auto">
                    Shop Now
                  </Link>
                </div>
              </div>

              {/* Card 2 - Pet Quiz (Now Primary / Highlighted) */}
              <div className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-2xl border-2 border-[#F26641] flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-[#F26641] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center z-20">
                  Recommended For New Pets
                </div>
                <div className="w-full h-48 sm:h-56 relative bg-[#FDDDD5] flex items-center justify-center mt-8 overflow-hidden z-10">
                  <Image src="/images/mascot.png" alt="Pet Recommendations" fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 drop-shadow-md" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-[#191C1E] text-xl sm:text-2xl font-bold font-serif mb-3 sm:mb-4 group-hover:text-[#F26641] transition-colors">Build Pet Profile</h3>
                  <p className="text-[#414750] text-sm sm:text-base mb-6 sm:mb-8 flex-grow">
                    Take our vet-designed quiz to find the perfect marine formula tailored specifically to your pet's needs.
                  </p>
                  <Link href="/shop/personalized" className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white font-bold py-3 px-6 rounded-xl transition-colors text-center mt-auto shadow-md">
                    Start Quiz
                  </Link>
                </div>
              </div>

              {/* Card 3 - Subscriptions */}
              <div className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 snap-center bg-white rounded-2xl border-2 border-transparent hover:border-[#D6E8F5] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-full h-48 sm:h-56 relative bg-[#F0F4F8] flex items-center justify-center overflow-hidden">
                  <Image src="/images/sub3.png" alt="Tailored Subscriptions" fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-[#191C1E] text-xl sm:text-2xl font-bold font-serif mb-3 sm:mb-4 group-hover:text-[#1B6CA8] transition-colors">Tailored Subscriptions</h3>
                  <p className="text-[#414750] text-sm sm:text-base mb-6 sm:mb-8 flex-grow">
                    Set and forget. Get freshly crafted meals delivered to your door exactly when you need them.
                  </p>
                  <Link href="/shop/subscriptions/1" className="w-full border-2 border-[#1B6CA8] text-[#1B6CA8] hover:bg-[#1B6CA8] hover:text-white font-bold py-3 px-6 rounded-xl transition-colors text-center mt-auto">
                    View Plans
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 9 - FINAL CTA */}
        <section className="w-full bg-[#124E7A] py-24 lg:py-32 text-center text-white relative">
          <div className="w-full max-w-3xl mx-auto px-4 relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight">
              Join The Future Of<br />Sustainable Pet Nutrition
            </h2>
            <p className="text-[#D6E8F5] text-xl md:text-2xl mb-12">
              Healthy pets. Less waste. Better oceans.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/shop/personalized" className="bg-[#F26641] hover:bg-[#BF4A28] text-white font-semibold py-4 px-8 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg hover:-translate-y-1">
                Build Pet Profile
                <ArrowRight size={20} />
              </Link>
              <Link href="/shop/products" className="bg-transparent border-2 border-[#D6E8F5] hover:bg-[#D6E8F5] hover:text-[#0C3350] text-white font-semibold py-4 px-8 rounded-xl flex justify-center items-center transition-all hover:-translate-y-1">
                Explore Products
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
