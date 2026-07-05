"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, UserCircle, Menu, X, ChevronRight, SlidersHorizontal } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  const isShopActive = pathname?.startsWith("/shop");

  // Prevent scroll when mobile menu or filter is open
  if (typeof window !== 'undefined') {
    if (isMobileMenuOpen || isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <>
      <nav className="w-full flex flex-col font-serif bg-white sticky top-0 z-50 shadow-sm md:shadow-none">
        {/* Layer 1: Main Navigation */}
        <div className="w-full h-[64px] lg:h-[72px] flex justify-center border-b lg:border-none border-gray-100">
          <div className="w-full px-4 lg:px-[48px] h-full flex items-center justify-between">
            {/* Left: Mobile Menu Toggle + Logo */}
            <div className="flex items-center gap-4 lg:gap-[48px] h-full">
              {/* Mobile Hamburger */}
              <button 
                className="lg:hidden text-[#1A1A1A] p-1 -ml-1 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center h-full gap-2">
                <Image
                  src="/images/pawsnfinlogo.png"
                  alt="Paws&Fin Logo"
                  width={36}
                  height={36}
                  className="object-contain lg:w-[40px] lg:h-[40px]"
                />
                <span className="lg:hidden font-bold text-xl text-[#1B6CA8] tracking-tight">Paws&Fin</span>
              </Link>
              
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-[40px] h-full pt-1">
                <Link href="/shop" className={`${isShopActive ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                  Toko
                </Link>
                <Link href="/langganan" className={`${isActive('/langganan') ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                  Langganan
                </Link>
                <Link href="/majalah" className={`${isActive('/majalah') ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                  Majalah
                </Link>
                <Link href="/suplier-portal" className={`${isActive('/suplier-portal') ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                  Suplier Portal
                </Link>
              </div>
            </div>
            
            {/* Right: Icons */}
            <div className="flex items-center gap-4 lg:gap-[24px]">
              <Link href="/cart" className="relative text-[#1B6CA8] hover:opacity-80 transition-opacity flex items-center justify-center p-1 lg:p-0">
                <ShoppingCart className="w-[24px] h-[24px] lg:w-[22px] lg:h-[22px]" />
                <div className="absolute top-0 right-0 lg:-top-[8px] lg:-right-[8px] w-4 h-4 bg-[#F26641] rounded-full flex items-center justify-center border-[1.5px] border-white">
                  <span className="text-white text-[9px] font-bold leading-none">0</span>
                </div>
              </Link>
              <Link href="/profile" className="text-[#1B6CA8] hover:opacity-80 transition-opacity flex items-center justify-center p-1 lg:p-0">
                <UserCircle className="w-[28px] h-[28px] lg:w-[22px] lg:h-[22px]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Layer 2 & 3 Mobile (Shop only) */}
        {isShopActive && (
          <div className="flex flex-col lg:hidden w-full bg-[#F7F9FC] border-b-[0.5px] border-[#E0E7EF]">
            {/* Mobile Search Row */}
            <div className="w-full px-4 py-3">
              <div className="w-full h-[40px] bg-white rounded-[8px] border-[1px] border-[#E0E7EF] focus-within:border-[#1B6CA8] flex items-center px-3 transition-colors shadow-sm">
                <Search className="w-5 h-5 text-[#7C8597] flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full h-full bg-transparent outline-none border-none text-[14px] text-[#656C7B] ml-2 placeholder-[#656C7B]"
                />
              </div>
            </div>
            {/* Mobile Categories (Horizontal Pills) */}
            <div className="w-full px-4 pb-3 flex items-center justify-between gap-3">
              <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2">
                <Link href="/shop" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${isActive('/shop') ? 'bg-[#1B6CA8] text-white border-[#1B6CA8]' : 'bg-white text-[#546E7A] border-[#E0E7EF]'}`}>
                  Featured
                </Link>
                <Link href="/shop/products" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${isActive('/shop/products') ? 'bg-[#1B6CA8] text-white border-[#1B6CA8]' : 'bg-white text-[#546E7A] border-[#E0E7EF]'}`}>
                  Products
                </Link>
                <Link href="/shop/personalized" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${isActive('/shop/personalized') ? 'bg-[#1B6CA8] text-white border-[#1B6CA8]' : 'bg-white text-[#546E7A] border-[#E0E7EF]'}`}>
                  Pet Picks
                </Link>
              </div>

              <div className="flex items-center gap-3 pl-3 border-l border-[#E0E7EF]">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex-shrink-0 text-[#546E7A] hover:text-[#1B6CA8] transition-colors flex items-center justify-center p-1"
                >
                  <SlidersHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Layer 2 Desktop (Shop only) */}
        {isShopActive && (
          <div className="hidden lg:flex w-full h-[48px] bg-[#F7F9FC] border-b-[0.5px] border-[#E0E7EF] justify-center">
            <div className="w-full px-[48px] h-full flex items-center justify-between">
              {/* Left: Sub-links */}
              <div className="flex items-center gap-[32px] h-full">
                <Link href="/shop" className={`h-full flex items-center pt-[2px] transition-opacity ${isActive('/shop') ? 'border-b-2 border-[#F26641]' : 'opacity-80 hover:opacity-100'}`}>
                  <span className={`${isActive('/shop') ? 'text-[#F26641]' : 'text-[#484848]'} text-[12px] font-semibold`}>Featured</span>
                </Link>
                <Link href="/shop/products" className={`h-full flex items-center pt-[2px] transition-opacity ${isActive('/shop/products') ? 'border-b-2 border-[#F26641]' : 'opacity-80 hover:opacity-100'}`}>
                  <span className={`${isActive('/shop/products') ? 'text-[#F26641]' : 'text-[#484848]'} text-[12px] font-semibold`}>Semua Produk</span>
                </Link>
                <Link href="/shop/personalized" className={`h-full flex items-center pt-[2px] transition-opacity ${isActive('/shop/personalized') ? 'border-b-2 border-[#F26641]' : 'opacity-80 hover:opacity-100'}`}>
                  <span className={`${isActive('/shop/personalized') ? 'text-[#F26641]' : 'text-[#484848]'} text-[12px] font-semibold`}>Pet Recommendation</span>
                </Link>
              </div>

              {/* Right: Search Bar */}
              <div className="w-full max-w-[500px] h-[36px] bg-white rounded-[7px] border-[0.5px] border-[#B0BEC5] focus-within:border-[#1B6CA8] focus-within:border flex items-center px-3 transition-colors group">
                <Search className="w-4 h-4 text-[#7C8597] flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Cari..." 
                  className="w-full h-full bg-transparent outline-none border-none text-[12.5px] text-[#656C7B] ml-2 placeholder-[#656C7B]"
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src="/images/pawsnfinlogo.png" alt="Paws&Fin Logo" width={32} height={32} />
            <span className="font-bold text-xl text-[#1B6CA8]">Paws&Fin</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
          {[
            { name: "Home", path: "/" },
            { name: "Marketplace", path: "/shop" },
            { name: "Subscription", path: "/langganan" },
            { name: "Majalah", path: "/majalah" },
            { name: "Supplier Portal", path: "/suplier-portal" },
          ].map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`flex items-center justify-between p-4 rounded-xl font-serif text-[16px] font-semibold transition-colors ${
                isActive(item.path) || (item.path === '/shop' && isShopActive)
                  ? "bg-[#D6E8F5] text-[#1B6CA8]" 
                  : "text-[#1A1A1A] hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
              <ChevronRight size={18} className="text-gray-400" />
            </Link>
          ))}
          
          <div className="mt-8 border-t border-gray-100 pt-4">
            <Link 
              href="/profile" 
              className="flex items-center gap-3 p-4 rounded-xl font-serif text-[16px] font-semibold text-[#1A1A1A] hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserCircle size={24} className="text-[#1B6CA8]" />
              Login / Account
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      {/* Mobile Filter Bottom Drawer */}
      <div 
        className={`fixed bottom-0 left-0 w-full h-[85vh] bg-white z-[70] lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col rounded-t-2xl ${
          isMobileFilterOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-lg text-[#1A1A1A] font-serif">Filter Products</span>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          {/* PET TYPE */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
              Pet Type
            </h4>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
              <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">Dog</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
              <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">Cat</span>
            </label>
          </div>

          {/* HEALTH GOALS */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
              Health Goals
            </h4>
            {['Skin & Coat', 'Digestive Health', 'Joint Support', 'Weight Management'].map(item => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">{item}</span>
              </label>
            ))}
          </div>

          {/* PRODUCT TYPE */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
              Product Type
            </h4>
            {['Treats', 'Functional Treats', 'Subscription Boxes'].map(item => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">{item}</span>
              </label>
            ))}
          </div>

          {/* PRICE RANGE */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
              Price Range
            </h4>
            <div className="w-full h-1.5 bg-[#D6E8F5] rounded-full relative mt-2">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-12 h-1.5 bg-[#1B6CA8] rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 bg-[#FFFFFF] border-2 border-[#1B6CA8] rounded-full shadow cursor-pointer"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-12 w-5 h-5 bg-[#FFFFFF] border-2 border-[#1B6CA8] rounded-full shadow cursor-pointer"></div>
            </div>
            <div className="flex justify-between items-center text-[#546E7A] text-sm font-bold mt-1">
              <span>$0</span>
              <span>$100+</span>
            </div>
          </div>

          <div className="w-full h-px bg-[#B0BEC5] my-2"></div>

          {/* IN STOCK ONLY */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
            <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">In Stock Only</span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 p-4 flex items-center gap-3 bg-white">
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-1/3 py-3 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold"
          >
            Reset
          </button>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="flex-1 py-3 bg-[#F26641] hover:bg-[#BF4A28] text-white rounded-xl font-bold shadow-sm transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

