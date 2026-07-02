import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, ArrowRight, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

export default function TokoPage() {
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
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="w-full flex flex-col items-center flex-grow pt-6 lg:pt-8">
        {/* Section 1: Hero Banner */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-12 lg:pb-16">
          <div className="w-full relative overflow-hidden rounded-2xl bg-[#ECEEF1] shadow-xl min-h-[400px] lg:h-[500px] flex items-center group">
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
                <button className="w-full sm:w-auto bg-[#F26641] hover:bg-[#D55331] transition-colors text-white font-semibold py-4 px-8 rounded-xl flex justify-center items-center gap-2 shadow-lg hover:-translate-y-1 hover:shadow-xl">
                  <ShoppingCart size={20} className="transition-transform" />
                  <span>Add to Cart</span>
                </button>
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
          </div>
        </section>

        {/* Section 2: Product Cards Row */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 pb-16">
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-8 pt-4 -mt-4 px-2 -mx-2 snap-x snap-mandatory hide-scrollbar items-stretch">
            {featuredProducts.map((prod, idx) => (
              <div key={idx} className="w-[280px] lg:w-auto shrink-0 snap-center h-full flex flex-col">
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
              <h2 className="text-[#191C1E] text-3xl md:text-4xl font-bold font-serif">
                Subscription Spotlight
              </h2>
              <button className="bg-[#005387] hover:bg-[#003D63] transition-colors text-white font-medium py-3 px-6 rounded-xl shadow-md">
                View All Plans
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {subscriptionPlans.map((plan, idx) => (
                <div key={idx} className="bg-white rounded-2xl border-2 border-transparent hover:border-[#F26641] flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-full h-56 relative overflow-hidden bg-gray-100">
                    <Image src={plan.image} alt={plan.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-[#191C1E] text-2xl font-bold font-serif mb-2">{plan.name}</h3>
                    <p className="text-[#414750] text-base mb-6 flex-grow">{plan.desc}</p>
                    <div className="text-[#F26641] text-2xl font-bold mb-6">{plan.price}<span className="text-lg">/mo</span></div>
                    <button className="w-full border-2 border-[#F26641] text-[#F26641] hover:bg-[#F26641] hover:text-white font-bold py-3 px-6 rounded-xl transition-colors">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Shop by Collection */}
        <section className="w-full flex justify-center py-16 lg:py-24">
          <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 flex flex-col gap-10">
            <h2 className="text-[#191C1E] text-3xl md:text-4xl font-bold font-serif">
              Shop by Collection
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {collections.map((col, idx) => (
                <Link href="/shop/products" key={idx} className="group relative w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
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
            
            <p className="text-[#414750] text-lg md:text-xl max-w-2xl mx-auto mb-4">
              Browse our full catalog of over 200+ premium fish-based products sourced from the purest oceans.
            </p>
            
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
