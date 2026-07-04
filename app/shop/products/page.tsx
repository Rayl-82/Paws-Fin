import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShopPage() {
  const baseProducts = [
    {
      image: "/images/product1.png",
      name: "Wild Salmon Jerky",
      price: "$14.99",
      description: "4.0",
    },
    {
      image: "/images/product2.png",
      name: "Cod & Shrimp Bites",
      price: "$9.99",
      description: "4.0",
    },
    {
      image: "/images/product3.png",
      name: "Pure Salmon Oil",
      price: "$24.00",
      description: "5.0",
    },
    {
      image: "/images/product4.png",
      name: "Atlantic Topper Mix",
      price: "$18.25",
      description: "4.5",
    },
  ];

  const products = Array.from({ length: 24 }).map((_, i) => ({
    ...baseProducts[i % baseProducts.length],
    id: i,
  }));

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Promotional Banner */}
        <div className="w-full h-[220px] md:h-[240px] lg:h-[280px] rounded-2xl overflow-hidden relative shadow-sm mb-10 bg-[#ECEEF1]">
          <Image
            src="/images/promobanner.png"
            alt="Best Sellers Promotional Banner"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center max-w-[480px] z-10">
            <span className="text-[#F26641] text-sm md:text-base font-bold tracking-widest uppercase mb-3 opacity-90">
              BEST SELLERS
            </span>
            <h2 className="text-[#191C1E] text-3xl md:text-[40px] font-bold font-serif leading-tight mb-4 drop-shadow-sm">
              Healthy Favorites<br />For Every Pet
            </h2>
            <p className="text-[#414750] text-base md:text-lg">
              Discover our most-loved treats,<br className="hidden sm:block" />supplements, and wellness essentials.
            </p>
          </div>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-[140px] h-fit">
            <div className="bg-[#FFFFFF] rounded-2xl p-6 flex flex-col gap-8 shadow-sm border border-[#E0E6EB]">
              
              {/* PET TYPE */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Pet Type
                </h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                  <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">Dog</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                  <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">Cat</span>
                </label>
              </div>

              {/* HEALTH GOALS */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Health Goals
                </h4>
                {['Skin & Coat', 'Digestive Health', 'Joint Support', 'Weight Management'].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                    <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">{item}</span>
                  </label>
                ))}
              </div>

              {/* PRODUCT TYPE */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Product Type
                </h4>
                {['Treats', 'Functional Treats', 'Subscription Boxes'].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                    <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">{item}</span>
                  </label>
                ))}
              </div>

              {/* PRICE RANGE */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Price Range
                </h4>
                <div className="w-full h-1.5 bg-[#D6E8F5] rounded-full relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-8 h-1.5 bg-[#1B6CA8] rounded-full"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-[#FFFFFF] border-2 border-[#1B6CA8] rounded-full shadow cursor-pointer"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-8 w-4 h-4 bg-[#FFFFFF] border-2 border-[#1B6CA8] rounded-full shadow cursor-pointer"></div>
                </div>
                <div className="flex justify-between items-center text-[#546E7A] text-xs font-bold mt-1">
                  <span>$0</span>
                  <span>$100+</span>
                </div>
              </div>

              <div className="w-full h-px bg-[#B0BEC5] my-1"></div>

              {/* IN STOCK ONLY */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">In Stock Only</span>
              </label>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-16 gap-2 mb-4">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#546E7A] bg-[#FFFFFF] hover:bg-[#F0F4F8] hover:text-[#1B6CA8] transition-colors border border-[#E0E6EB] shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1B6CA8] text-[#FFFFFF] font-bold shadow-md">
                1
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1A1A] bg-[#FFFFFF] hover:bg-[#F0F4F8] hover:text-[#1B6CA8] transition-colors font-semibold border border-transparent">
                2
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1A1A] bg-[#FFFFFF] hover:bg-[#F0F4F8] hover:text-[#1B6CA8] transition-colors font-semibold border border-transparent">
                3
              </button>
              <span className="text-[#546E7A] px-2 font-semibold tracking-widest">...</span>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1A1A] bg-[#FFFFFF] hover:bg-[#F0F4F8] hover:text-[#1B6CA8] transition-colors font-semibold border border-transparent">
                8
              </button>

              <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#546E7A] bg-[#FFFFFF] hover:bg-[#F0F4F8] hover:text-[#1B6CA8] transition-colors border border-[#E0E6EB] shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
