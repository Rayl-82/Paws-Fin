"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, UserCircle, Menu, X, ChevronRight, SlidersHorizontal, Trees, Activity, Anchor } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchCartCount = async (isAuth: boolean) => {
    if (isAuth) {
      try {
        const res = await fetch('/api/cart');
        if (res.ok) {
          const data = await res.json();
          const items = data.data?.items || [];
          setCartCount(items.reduce((acc: number, item: any) => acc + item.quantity, 0));
          setCartItems(items);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      setCartCount(guestCart.reduce((acc: number, item: any) => acc + item.quantity, 0));
      setCartItems(guestCart);
    }
  };

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setUser(data.user);
            fetchCartCount(true);
          } else {
            setIsAuthenticated(false);
            fetchCartCount(false);
          }
        } else {
          setIsAuthenticated(false);
          fetchCartCount(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
        fetchCartCount(false);
      }
    }
    checkAuth();

    // Listen for custom cart update events
    const handleCartUpdate = () => {
      // Re-check auth state synchronously if possible, or just use the current state
      // Since state might be stale in event listener, we check localStorage directly if not authenticated
      const token = document.cookie.includes('token'); // simplistic check
      fetchCartCount(token);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isShopActive = pathname?.startsWith("/shop");
  
  const isHome = pathname === "/" || pathname === "/suplier-portal";
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  // Prevent scroll when mobile menu or filter is open
  if (typeof window !== 'undefined') {
    if (isMobileMenuOpen || isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  // Handle Search Fetching
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data?.data?.products?.slice(0, 4) || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className={`w-full flex flex-col font-serif top-0 z-50 transition-all duration-300 ${
        isHome ? "fixed" : "sticky"
      } ${
        isTransparent ? "bg-transparent" : "bg-white shadow-sm md:shadow-none"
      }`}>
        {/* Layer 1: Main Navigation */}
        <div className={`w-full h-[64px] lg:h-[72px] flex justify-center lg:border-none transition-colors duration-300 ${
          isTransparent ? "border-transparent" : "border-b border-gray-100"
        }`}>
          <div className="w-full px-4 lg:px-[48px] h-full flex items-center justify-between">
            {/* Left: Mobile Menu Toggle + Logo */}
            <div className="flex items-center gap-4 lg:gap-[48px] h-full">
              {/* Mobile Hamburger */}
              <button 
                className={`lg:hidden p-1 -ml-1 rounded-md transition-colors ${
                  isTransparent ? "text-white hover:bg-white/10" : "text-[#1A1A1A] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center h-full gap-2 group">
                <Image
                  src="/images/pawsnfinlogo.png"
                  alt="Paws&Fin Logo"
                  width={36}
                  height={36}
                  className="object-contain lg:w-[40px] lg:h-[40px] transition-transform duration-300 group-hover:scale-105"
                />
                <span className={`lg:hidden font-bold text-xl tracking-tight transition-colors ${
                  isTransparent ? "text-white" : "text-[#1B6CA8]"
                }`}>Paws&Fin</span>
              </Link>
              
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-[40px] h-full pt-1">
                <Link href="/shop" className={`${isShopActive ? 'text-[#F26641]' : isTransparent ? 'text-white hover:text-white/80' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-all text-[15px] font-semibold tracking-[0.28px]`}>
                  Toko
                </Link>
                <Link href="/langganan" className={`${isActive('/langganan') ? 'text-[#F26641]' : isTransparent ? 'text-white hover:text-white/80' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-all text-[15px] font-semibold tracking-[0.28px]`}>
                  Langganan
                </Link>
                <Link href="/majalah" className={`${isActive('/majalah') ? 'text-[#F26641]' : isTransparent ? 'text-white hover:text-white/80' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-all text-[15px] font-semibold tracking-[0.28px]`}>
                  Artikel
                </Link>
                <Link href="/suplier-portal" className={`${isActive('/suplier-portal') ? 'text-[#F26641]' : isTransparent ? 'text-white hover:text-white/80' : 'text-[#1A1A1A] opacity-80 hover:opacity-100'} transition-all text-[15px] font-semibold tracking-[0.28px]`}>
                  Portal Partner
                </Link>
              </div>
            </div>
            
            {/* Right: Icons */}
            <div className="flex items-center gap-4 lg:gap-[24px]">
              
              {/* Cart Icon with Hover Dropdown */}
              <div className="relative group flex items-center justify-center p-1 lg:p-0">
                <Link href="/cart" className={`relative transition-all flex items-center justify-center p-1 lg:p-0 ${
                  isTransparent ? "text-white hover:text-white/80" : "text-[#1B6CA8] hover:opacity-80"
                }`}>
                  <ShoppingCart className="w-[24px] h-[24px] lg:w-[22px] lg:h-[22px]" />
                  {cartCount > 0 && (
                    <div className={`absolute top-0 right-0 lg:-top-[8px] lg:-right-[8px] w-4 h-4 rounded-full flex items-center justify-center border-[1.5px] transition-colors ${
                      isTransparent ? "bg-white border-transparent text-[#1B6CA8]" : "bg-[#F26641] border-white text-white"
                    }`}>
                      <span className="text-[9px] font-bold leading-none">{cartCount}</span>
                    </div>
                  )}
                </Link>
                
                {/* Cart Dropdown (Desktop Only) */}
                <div className="hidden lg:block absolute top-full right-0 mt-2 w-[300px] bg-white shadow-xl rounded-xl border border-[#E0E7EF] p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {cartCount === 0 ? (
                     <div className="text-center flex flex-col items-center">
                       <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-4">
                         <ShoppingCart className="w-8 h-8 text-[#B0BEC5]" />
                       </div>
                       <p className="font-bold text-[#1A1A1A] mb-2 text-sm">Wah, keranjang belanjamu kosong</p>
                       <p className="text-xs text-[#546E7A] mb-4">Yuk, isi dengan barang-barang impianmu!</p>
                       <Link href="/shop" className="bg-[#F26641] hover:bg-[#BF4A28] transition-colors text-white px-4 py-2.5 rounded-xl font-bold block w-full text-sm">Mulai Belanja</Link>
                     </div>
                  ) : (
                     <div className="flex flex-col text-left">
                       <div className="flex justify-between items-center mb-4 border-b border-[#F0F4F8] pb-2">
                         <span className="font-bold text-[#1A1A1A] text-sm">Keranjang ({cartCount})</span>
                         <Link href="/cart" className="text-xs font-bold text-[#1B6CA8] hover:underline">Lihat Semua</Link>
                       </div>
                       
                       <div className="flex flex-col gap-3 mb-4 max-h-[200px] overflow-y-auto pr-1">
                         {cartItems.slice(0, 3).map((item, idx) => (
                           <div key={idx} className="flex gap-3 items-center">
                             <div className="w-12 h-12 bg-[#F0F4F8] rounded-lg overflow-hidden flex-shrink-0 relative">
                               <Image 
                                 src={item.product?.imageUrl || item.imageUrl || "/images/product1.png"} 
                                 alt={item.product?.name || item.name || "Produk"}
                                 fill
                                 className="object-cover"
                               />
                             </div>
                             <div className="flex flex-col flex-1 min-w-0">
                               <span className="text-xs font-bold text-[#1A1A1A] truncate">{item.product?.name || item.name}</span>
                               <div className="flex items-center justify-between mt-0.5">
                                 <span className="text-xs text-[#546E7A]">{item.quantity} x <span className="font-semibold text-[#F26641]">Rp {(item.product?.price || item.price || 0).toLocaleString('id-ID')}</span></span>
                               </div>
                             </div>
                           </div>
                         ))}
                         {cartItems.length > 3 && (
                           <div className="text-center pt-2">
                             <span className="text-xs text-[#546E7A] italic">+{cartItems.length - 3} produk lainnya</span>
                           </div>
                         )}
                       </div>

                       <Link href="/cart" className="bg-[#F26641] hover:bg-[#BF4A28] transition-colors text-white px-4 py-2.5 rounded-xl font-bold block w-full text-center text-sm">Buka Keranjang</Link>
                     </div>
                  )}
                </div>
              </div>

              {/* Profile / Login */}
              {isAuthenticated === false ? (
                <Link href="/auth" className={`hidden lg:flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm hover:-translate-y-0.5 ${
                  isTransparent ? "bg-white text-[#1A1A1A] hover:bg-gray-100" : "bg-[#F26641] hover:bg-[#BF4A28] text-white"
                }`}>
                  Masuk
                </Link>
              ) : (
                <div className="relative group flex items-center justify-center p-1 lg:p-0">
                  <Link href="/profile" className={`transition-all flex items-center justify-center p-1 lg:p-0 ${
                    isTransparent ? "text-white hover:text-white/80" : "text-[#1B6CA8] hover:opacity-80"
                  }`}>
                    <UserCircle className="w-[28px] h-[28px] lg:w-[22px] lg:h-[22px]" />
                  </Link>

                  {/* Profile Dropdown (Desktop Only) */}
                  <div className="hidden lg:block absolute top-full right-0 mt-2 w-[320px] bg-white shadow-xl rounded-xl border border-[#E0E7EF] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                     <div className="p-4 border-b border-[#F0F4F8] flex items-center gap-3">
                        <UserCircle className="w-10 h-10 text-[#B0BEC5]" />
                        <div>
                          <p className="font-bold text-[#1A1A1A] text-sm">{user?.name || "Akun Saya"}</p>
                        </div>
                     </div>

                     {/* Personal Impact Dashboard */}
                     <div className="p-4 border-b border-[#F0F4F8] bg-[#F7F9FC]">
                        <h4 className="text-xs font-bold text-[#1A1A1A] mb-3 flex items-center gap-1.5 tracking-wide">
                          <Trees className="w-4 h-4 text-[#1B6CA8]"/> 
                          Personal Impact Dashboard
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-[#D6E8F5] p-2.5 rounded-lg relative overflow-hidden">
                            <span className="text-[9px] font-bold text-[#1B6CA8] block mb-1">TOTAL LIMBAH DIHEMAT</span>
                            <span className="text-sm font-bold text-[#1B6CA8]">1.4 kg</span>
                            <Trees className="absolute right-[-5px] bottom-[-5px] w-10 h-10 text-[#1B6CA8] opacity-10" />
                          </div>
                          <div className="bg-[#E8F5E9] p-2.5 rounded-lg relative overflow-hidden">
                            <span className="text-[9px] font-bold text-[#2E7D32] block mb-1">SKOR DAMPAK</span>
                            <span className="text-sm font-bold text-[#2E7D32]">8.7 <span className="text-[10px]">/10</span></span>
                            <Activity className="absolute right-[-5px] bottom-[-5px] w-10 h-10 text-[#2E7D32] opacity-10" />
                          </div>
                          <div className="col-span-2 bg-[#FDDDD5] p-2.5 rounded-lg relative overflow-hidden flex justify-between items-center">
                            <div>
                              <span className="text-[9px] font-bold text-[#BF4A28] block mb-1">NELAYAN LOKAL DIBANTU</span>
                              <span className="text-sm font-bold text-[#BF4A28]">3 Partner</span>
                            </div>
                            <Anchor className="absolute right-2 bottom-[-5px] w-12 h-12 text-[#BF4A28] opacity-10" />
                          </div>
                        </div>
                     </div>

                     <div className="flex flex-col py-2">
                        <Link href="/profile" className="px-4 py-2.5 text-sm font-semibold text-[#546E7A] hover:bg-[#F0F4F8] hover:text-[#1B6CA8]">Profil</Link>
                        <Link href="/profile?tab=orders" className="px-4 py-2.5 text-sm font-semibold text-[#546E7A] hover:bg-[#F0F4F8] hover:text-[#1B6CA8]">Pembelian</Link>
                        <div className="h-px bg-[#F0F4F8] my-1"></div>
                        <button 
                          onClick={async () => { await fetch('/api/auth/logout', {method: 'POST'}); localStorage.removeItem('isLoggedIn'); window.location.href='/'; }} 
                          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2 text-sm font-semibold"
                        >
                          Keluar
                        </button>
                     </div>
                  </div>
                </div>
              )}
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
                  placeholder="Cari produk..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full h-full bg-transparent outline-none border-none text-[14px] text-[#656C7B] ml-2 placeholder-[#656C7B]"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(""); setSearchResults([]); }} className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
            {/* Mobile Categories (Horizontal Pills) */}
            <div className="w-full px-4 pb-3 flex items-center justify-between gap-3">
              <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex items-center gap-2">
                <Link href="/shop" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${isActive('/shop') ? 'bg-[#1B6CA8] text-white border-[#1B6CA8]' : 'bg-white text-[#546E7A] border-[#E0E7EF]'}`}>
                  Unggulan
                </Link>
                <Link href="/shop/products" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${isActive('/shop/products') ? 'bg-[#1B6CA8] text-white border-[#1B6CA8]' : 'bg-white text-[#546E7A] border-[#E0E7EF]'}`}>
                  Semua Produk
                </Link>
                <Link href="/shop/personalized" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors border ${isActive('/shop/personalized') ? 'bg-[#1B6CA8] text-white border-[#1B6CA8]' : 'bg-white text-[#546E7A] border-[#E0E7EF]'}`}>
                  Rekomendasi Hewan
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
                  <span className={`${isActive('/shop') ? 'text-[#F26641]' : 'text-[#484848]'} text-[12px] font-semibold`}>Unggulan</span>
                </Link>
                <Link href="/shop/products" className={`h-full flex items-center pt-[2px] transition-opacity ${isActive('/shop/products') ? 'border-b-2 border-[#F26641]' : 'opacity-80 hover:opacity-100'}`}>
                  <span className={`${isActive('/shop/products') ? 'text-[#F26641]' : 'text-[#484848]'} text-[12px] font-semibold`}>Semua Produk</span>
                </Link>
                <Link href="/shop/personalized" className={`h-full flex items-center pt-[2px] transition-opacity ${isActive('/shop/personalized') ? 'border-b-2 border-[#F26641]' : 'opacity-80 hover:opacity-100'}`}>
                  <span className={`${isActive('/shop/personalized') ? 'text-[#F26641]' : 'text-[#484848]'} text-[12px] font-semibold`}>Rekomendasi Hewan</span>
                </Link>
              </div>

              {/* Right: Search Bar */}
              <div className="w-full max-w-[500px] relative search-container">
                <div className="w-full h-[36px] bg-white rounded-[7px] border-[0.5px] border-[#B0BEC5] focus-within:border-[#1B6CA8] focus-within:border flex items-center px-3 transition-colors group z-10 relative">
                  <Search className="w-4 h-4 text-[#7C8597] flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Cari produk, kategori, dll..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-full h-full bg-transparent outline-none border-none text-[12.5px] text-[#656C7B] ml-2 placeholder-[#656C7B]"
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(""); setSearchResults([]); }} className="p-1 hover:bg-gray-100 rounded-full">
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Dropdown Overlay (Responsive) */}
        {isShopActive && isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-[#E0E7EF] z-50 search-container animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[48px] py-6 lg:py-8 flex flex-col lg:flex-row gap-8 lg:gap-12 max-h-[80vh] overflow-y-auto">
              {/* Left Column: Suggestions */}
              <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-4 lg:gap-6 lg:border-r border-[#E0E7EF] lg:pr-8">
                <div>
                  <h3 className="text-[#1B6CA8] font-bold text-xs uppercase tracking-wider mb-4">Saran</h3>
                  <div className="flex flex-col gap-1">
                    {searchQuery ? (
                      <>
                        <Link href={`/shop/products?search=${searchQuery}`} onClick={() => setIsSearchOpen(false)} className="px-3 py-2 text-sm text-[#1A1A1A] hover:bg-[#F0F4F8] rounded-lg transition-colors font-semibold flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#B0BEC5]" />
                          {searchQuery}
                        </Link>
                        <Link href={`/shop/products?search=${searchQuery} treats`} onClick={() => setIsSearchOpen(false)} className="px-3 py-2 text-sm text-[#546E7A] hover:bg-[#F0F4F8] rounded-lg transition-colors flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#B0BEC5]" />
                          {searchQuery} <span className="font-semibold text-[#1A1A1A]">treats</span>
                        </Link>
                        <Link href={`/shop/products?search=${searchQuery} cat`} onClick={() => setIsSearchOpen(false)} className="px-3 py-2 text-sm text-[#546E7A] hover:bg-[#F0F4F8] rounded-lg transition-colors flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#B0BEC5]" />
                          {searchQuery} <span className="font-semibold text-[#1A1A1A]">untuk kucing</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/shop/products?category=Treats" onClick={() => setIsSearchOpen(false)} className="px-3 py-2 text-sm text-[#546E7A] hover:bg-[#F0F4F8] rounded-lg transition-colors flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#B0BEC5]" /> Healthy Treats
                        </Link>
                        <Link href="/shop/products?petType=Dog" onClick={() => setIsSearchOpen(false)} className="px-3 py-2 text-sm text-[#546E7A] hover:bg-[#F0F4F8] rounded-lg transition-colors flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#B0BEC5]" /> Dog Food
                        </Link>
                        <Link href="/shop/products?health=Joint Support" onClick={() => setIsSearchOpen(false)} className="px-3 py-2 text-sm text-[#546E7A] hover:bg-[#F0F4F8] rounded-lg transition-colors flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#B0BEC5]" /> Dukungan Sendi
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Product Results */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#1B6CA8] font-bold text-xs uppercase tracking-wider">
                    {searchQuery ? `Produk untuk "${searchQuery}"` : "Produk Populer"}
                  </h3>
                  {searchQuery && searchResults.length > 0 && (
                    <Link href={`/shop/products?search=${searchQuery}`} onClick={() => setIsSearchOpen(false)} className="text-xs font-bold text-[#F26641] hover:underline">
                      Lihat Semua Hasil ({searchResults.length})
                    </Link>
                  )}
                </div>

                {isSearching ? (
                  <div className="flex-1 flex items-center justify-center min-h-[200px]">
                    <div className="w-8 h-8 border-4 border-[#1B6CA8] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4">
                    {searchResults.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/shop/products/${product.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex flex-col gap-2 group cursor-pointer"
                      >
                        <div className="w-full aspect-square bg-[#F0F4F8] rounded-xl overflow-hidden relative p-2">
                          <Image 
                            src={product.imageUrl || "/images/product1.png"} 
                            alt={product.name}
                            fill
                            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="text-sm font-bold font-serif text-[#1A1A1A] line-clamp-2 group-hover:text-[#1B6CA8] transition-colors">{product.name}</h4>
                        <span className="text-[#F26641] font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</span>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="flex-1 flex items-center justify-center min-h-[200px] text-[#546E7A] text-sm">
                    Tidak ada produk yang cocok dengan "{searchQuery}"
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center min-h-[200px] text-[#546E7A] text-sm">
                    Mulai ketik untuk mencari...
                  </div>
                )}
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
            { name: "Beranda", path: "/" },
            { name: "Toko", path: "/shop" },
            { name: "Langganan", path: "/langganan" },
            { name: "Artikel", path: "/majalah" },
            { name: "Portal Partner", path: "/suplier-portal" },
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
            {isAuthenticated === false ? (
              <Link 
                href="/auth" 
                className="flex items-center gap-3 p-4 rounded-xl font-serif text-[16px] font-semibold text-white bg-[#F26641] hover:bg-[#BF4A28] transition-colors justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Masuk
              </Link>
            ) : (
              <Link 
                href="/profile" 
                className="flex items-center gap-3 p-4 rounded-xl font-serif text-[16px] font-semibold text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserCircle size={24} className="text-[#1B6CA8]" />
                Akun
              </Link>
            )}
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
          <span className="font-bold text-lg text-[#1A1A1A] font-serif">Filter Produk</span>
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
              Jenis Hewan
            </h4>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
              <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">Anjing</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
              <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">Kucing</span>
            </label>
          </div>

          {/* HEALTH GOALS */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
              Tujuan Kesehatan
            </h4>
            {['Kesehatan Kulit & Bulu', 'Pencernaan', 'Dukungan Sendi', 'Manajemen Berat Badan'].map(item => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">{item}</span>
              </label>
            ))}
          </div>

          {/* PRODUCT TYPE */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
              Jenis Produk
            </h4>
            {['Cemilan', 'Cemilan Fungsional', 'Kotak Langganan'].map(item => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
                <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">{item}</span>
              </label>
            ))}
          </div>

          {/* PRICE RANGE */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#1B6CA8] text-sm font-semibold uppercase tracking-wider mb-1">
              Rentang Harga
            </h4>
            <div className="w-full h-1.5 bg-[#D6E8F5] rounded-full relative mt-2">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-12 h-1.5 bg-[#1B6CA8] rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 bg-[#FFFFFF] border-2 border-[#1B6CA8] rounded-full shadow cursor-pointer"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-12 w-5 h-5 bg-[#FFFFFF] border-2 border-[#1B6CA8] rounded-full shadow cursor-pointer"></div>
            </div>
            <div className="flex justify-between items-center text-[#546E7A] text-sm font-bold mt-1">
              <span>Rp 0</span>
              <span>Rp 1.500.000+</span>
            </div>
          </div>

          <div className="w-full h-px bg-[#B0BEC5] my-2"></div>

          {/* IN STOCK ONLY */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-5 h-5 rounded border-[#B0BEC5] text-[#1B6CA8] focus:ring-[#1B6CA8]" />
            <span className="text-[#1A1A1A] text-base group-hover:text-[#1B6CA8] transition-colors">Hanya Tampilkan Stok Tersedia</span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 p-4 flex items-center gap-3 bg-white">
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-1/3 py-3 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold"
          >
            Atur Ulang
          </button>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="flex-1 py-3 bg-[#F26641] hover:bg-[#BF4A28] text-white rounded-xl font-bold shadow-sm transition-colors"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </>
  );
}

