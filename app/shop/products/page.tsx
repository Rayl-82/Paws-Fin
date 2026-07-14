"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, Filter, X } from "lucide-react";

// Define the shape of our API response
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: string | null;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const didInit = useRef(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter States
  const [petTypes, setPetTypes] = useState<string[]>([]);
  const [healthGoals, setHealthGoals] = useState<string[]>([]);
  const [productTypes, setProductTypes] = useState<string[]>([]);

  // On first mount, read URL params and pre-apply filters
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const urlPetType = searchParams.get('petType');
    if (urlPetType) setPetTypes([urlPetType]);
    const urlCategory = searchParams.get('category');
    if (urlCategory) setProductTypes([urlCategory]);
  }, [searchParams]);

  const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        petTypes.forEach(p => params.append('petType', p));
        healthGoals.forEach(h => params.append('health', h));
        productTypes.forEach(p => params.append('productType', p));
        params.append('excludeCategory', 'Subscription');
        params.append('excludeCategory', 'Bundle');

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        
        const productList = data?.data?.products || [];
        setProducts(productList);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong loading the marketplace.");
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(fetchProducts, 300); // debounce
    return () => clearTimeout(timer);
  }, [petTypes, healthGoals, productTypes]);

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
              PRODUK TERLARIS
            </span>
            <h2 className="text-[#191C1E] text-3xl md:text-[40px] font-bold font-serif leading-tight mb-4 drop-shadow-sm">
              Favorit Sehat<br />Untuk Setiap Hewan
            </h2>
            <p className="text-[#414750] text-base md:text-lg">
              Temukan cemilan terpopuler kami,<br className="hidden sm:block" />suplemen, dan produk kesehatan esensial.
            </p>
          </div>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between mb-2">
            <h2 className="text-[#1A1A1A] font-serif font-bold text-xl">Semua Produk</h2>
            <button 
              onClick={() => setShowMobileFilter(true)}
              className="flex items-center gap-2 bg-white border border-[#B0BEC5] text-[#1B6CA8] px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Sidebar */}
          <aside className={`fixed inset-0 z-50 transform ${showMobileFilter ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:relative lg:translate-x-0 lg:block lg:w-[260px] lg:flex-shrink-0 lg:sticky lg:top-[140px] lg:h-fit lg:z-auto`}>
            {/* Mobile overlay background */}
            <div 
              className={`fixed inset-0 bg-black/50 lg:hidden ${showMobileFilter ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
              onClick={() => setShowMobileFilter(false)}
            />

            {/* Sidebar Content */}
            <div className={`relative h-full w-[80%] max-w-[320px] bg-white lg:w-full lg:bg-[#FFFFFF] lg:rounded-2xl p-6 flex flex-col gap-8 shadow-sm lg:border lg:border-[#E0E6EB] overflow-y-auto lg:overflow-visible`}>
              
              {/* Mobile Header */}
              <div className="flex lg:hidden items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">Filter</h3>
                <button onClick={() => setShowMobileFilter(false)} className="p-2 text-[#546E7A] hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* PET TYPE */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Jenis Hewan
                </h4>
                {['Anjing', 'Kucing'].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={petTypes.includes(item)}
                      onChange={() => toggleFilter(setPetTypes, item)}
                      className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" 
                    />
                    <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">{item}</span>
                  </label>
                ))}
              </div>

              {/* HEALTH GOALS */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Tujuan Kesehatan
                </h4>
                {['Kesehatan Kulit & Bulu', 'Pencernaan', 'Dukungan Sendi', 'Manajemen Berat Badan'].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={healthGoals.includes(item)}
                      onChange={() => toggleFilter(setHealthGoals, item)}
                      className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" 
                    />
                    <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">{item}</span>
                  </label>
                ))}
              </div>

              {/* PRODUCT TYPE */}
              <div className="flex flex-col gap-2">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Jenis Produk
                </h4>
                {['Cemilan', 'Cemilan Fungsional', 'Kotak Langganan'].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={productTypes.includes(item)}
                      onChange={() => toggleFilter(setProductTypes, item)}
                      className="w-4 h-4 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" 
                    />
                    <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">{item}</span>
                  </label>
                ))}
              </div>

              {/* PRICE RANGE */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
                  Rentang Harga
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
                <span className="text-[#1A1A1A] text-sm group-hover:text-[#1B6CA8] transition-colors">Hanya Tampilkan Stok Tersedia</span>
              </label>

            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 w-full min-h-[400px] flex flex-col">
            
            {/* 1. LOADING STATE */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                <div className="h-80 bg-[#E0E7EF] rounded-[24px]"></div>
                <div className="h-80 bg-[#E0E7EF] rounded-[24px]"></div>
                <div className="h-80 bg-[#E0E7EF] rounded-[24px]"></div>
                <div className="h-80 bg-[#E0E7EF] rounded-[24px]"></div>
                <div className="h-80 bg-[#E0E7EF] rounded-[24px]"></div>
                <div className="h-80 bg-[#E0E7EF] rounded-[24px]"></div>
              </div>
            )}

            {/* 2. ERROR STATE */}
            {!isLoading && error && (
              <div className="flex-1 flex flex-col items-center justify-center text-[#BF4A28] gap-4 bg-red-50 rounded-2xl border border-red-100 p-8">
                <AlertCircle className="w-12 h-12" />
                <p className="font-semibold text-lg">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-2 bg-[#F26641] text-white px-6 py-2 rounded-lg hover:bg-[#BF4A28] transition-colors">
                  Coba Lagi
                </button>
              </div>
            )}

            {/* 3. EMPTY STATE */}
            {!isLoading && !error && products.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-[#546E7A] gap-4 bg-[#FFFFFF] rounded-2xl border border-[#E0E6EB] p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl">🐟</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-[#1A1A1A]">Tidak ada produk ditemukan</h3>
                <p>Kami belum dapat menemukan produk apa pun di database.</p>
              </div>
            )}

            {/* 4. SUCCESS STATE (Render Grid) */}
            {!isLoading && !error && products.length > 0 && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.imageUrl || "/images/product1.png"}
                      name={product.name}
                      price={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
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
                  
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#546E7A] bg-[#FFFFFF] hover:bg-[#F0F4F8] hover:text-[#1B6CA8] transition-colors border border-[#E0E6EB] shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 w-full animate-pulse">
           <div className="flex justify-between items-center mb-8">
              <div className="h-10 bg-[#E0E7EF] rounded w-1/4"></div>
              <div className="flex gap-4">
                 <div className="h-10 bg-[#E0E7EF] rounded w-32"></div>
                 <div className="h-10 bg-[#E0E7EF] rounded w-32"></div>
              </div>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="h-80 bg-white rounded-[24px] border border-[#E0E7EF]"></div>
              <div className="h-80 bg-white rounded-[24px] border border-[#E0E7EF]"></div>
              <div className="h-80 bg-white rounded-[24px] border border-[#E0E7EF]"></div>
              <div className="h-80 bg-white rounded-[24px] border border-[#E0E7EF]"></div>
           </div>
        </main>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
