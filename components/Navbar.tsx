"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, UserCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isShopActive = pathname?.startsWith("/shop");

  return (
    <nav className="w-full flex flex-col font-serif bg-white sticky top-0 z-50">
      {/* Layer 1 */}
      <div className="w-full h-[72px] py-[16px] flex justify-center">
        <div className="w-full px-[48px] h-full flex items-center justify-between">
          {/* Left: Logo + Links */}
          <div className="flex items-center gap-[48px] h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center h-full">
              <Image
                src="/images/pawsnfinlogo.png"
                alt="Paws&Fin Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
            {/* Links */}
            <div className="flex items-center gap-[40px] h-full pt-1">
              <Link href="/shop" className={`${isShopActive ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                Toko
              </Link>
              <Link href="/langganan" className={`${isActive('/langganan') ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                Langganan
              </Link>
              <Link href="/dampak" className={`${isActive('/dampak') ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                Dampak
              </Link>
              <Link href="/suplier-portal" className={`${isActive('/suplier-portal') ? 'text-[#F26641]' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-opacity text-[15px] font-semibold tracking-[0.28px]`}>
                Suplier Portal
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

