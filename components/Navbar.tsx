"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, UserCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isShopActive = pathname?.startsWith("/shop");

  return (
    <nav className="w-full flex flex-col font-['Plus_Jakarta_Sans'] bg-white sticky top-0 z-50">
      {/* Layer 1 */}
      <div className="w-full h-[72px] py-[16px] flex justify-center">
        <div className="w-full px-[48px] h-full flex items-center justify-between">
          {/* Left: Logo + Links */}
          <div className="flex items-center gap-[48px] h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center h-full">
              <img 
                src="data:image/png;base64,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" 
                alt="Paws&Fin Logo" 
                className="w-[40px] h-[40px] object-contain"
              />
            </Link>
            {/* Links */}
            <div className="flex items-center gap-[40px] h-full pt-1">
              <Link href="/shop" className={`${isShopActive ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                Toko
              </Link>
              <Link href="/langganan" className="text-[#1A1A1A] opacity-80 hover:opacity-100 transition-opacity text-[15px] font-semibold tracking-[0.28px]">
                Langganan
              </Link>
              <Link href="/dampak" className="text-[#1A1A1A] opacity-80 hover:opacity-100 transition-opacity text-[15px] font-semibold tracking-[0.28px]">
                Dampak
              </Link>
              <Link href="/tentang" className="text-[#1A1A1A] opacity-80 hover:opacity-100 transition-opacity text-[15px] font-semibold tracking-[0.28px]">
                Tentang
              </Link>
            </div>
          </div>
          
          {/* Right: Icons */}
          <div className="flex items-center gap-[24px]">
            <Link href="/cart" className="relative text-[#1B6CA8] hover:opacity-80 transition-opacity flex items-center justify-center">
              <ShoppingCart className="w-[22px] h-[22px]" />
              <div className="absolute -top-[8px] -right-[8px] w-4 h-4 bg-[#F26641] rounded-full flex items-center justify-center border-[1.5px] border-white">
                <span className="text-white text-[9px] font-bold leading-none">0</span>
              </div>
            </Link>
            <Link href="/profile" className="text-[#1B6CA8] hover:opacity-80 transition-opacity flex items-center justify-center">
              <UserCircle className="w-[22px] h-[22px]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Layer 2 */}
      {isShopActive && (
        <div className="w-full h-[48px] bg-[#F7F9FC] border-b-[0.5px] border-[#E0E7EF] flex justify-center">
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
            <div className="w-full max-w-[400px] xl:max-w-[500px] h-[36px] bg-white rounded-[7px] border-[0.5px] border-[#B0BEC5] focus-within:border-[#1B6CA8] focus-within:border flex items-center px-3 transition-colors group">
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
  );
}

