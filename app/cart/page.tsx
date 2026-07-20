"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: string;
  quantity: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 401) {
          setIsGuest(true);
          loadGuestCart();
          return;
        }
        throw new Error(data.error?.message || "Failed to load cart");
      }
      
      setItems(data.data.items);
      setTotal(data.data.total);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadGuestCart = () => {
    try {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      
      // Filter out corrupted items to prevent crashes
      const validItems = Array.isArray(guestCart) ? guestCart.filter((item: any) => item && item.product) : [];
      
      const mappedItems = validItems.map((item: any) => ({
        ...item,
        subtotal: (item.product?.price || 0) * (item.quantity || 1)
      }));
      const cartTotal = mappedItems.reduce((acc: number, item: any) => acc + item.subtotal, 0);
      
      // Clean up localStorage if there were corrupted items
      if (validItems.length !== (Array.isArray(guestCart) ? guestCart.length : 0)) {
        localStorage.setItem("guestCart", JSON.stringify(validItems));
      }
      
      setItems(mappedItems);
      setTotal(cartTotal);
    } catch (e) {
      console.error("Error loading guest cart:", e);
      setItems([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: string, delta: number, currentQuantity: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return; // Prevent 0 quantity, use remove instead
    
    setIsUpdating(id);
    
    if (isGuest) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const item = guestCart.find((i: any) => i.id === id);
      if (item) {
        item.quantity = newQuantity;
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        window.dispatchEvent(new Event("cartUpdated"));
      }
      loadGuestCart();
      setIsUpdating(null);
      return;
    }

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to update quantity");
      }
      
      // Refresh cart to get accurate totals
      await fetchCart();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to update quantity");
    } finally {
      setIsUpdating(null);
    }
  };

  const removeItem = async (id: string) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    setIsUpdating(id);
    
    if (isGuest) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const newCart = guestCart.filter((i: any) => i.id !== id);
      localStorage.setItem("guestCart", JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartUpdated"));
      loadGuestCart();
      setIsUpdating(null);
      return;
    }
    
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || "Failed to remove item");
      }
      
      // Refresh cart
      await fetchCart();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to remove item");
    } finally {
      setIsUpdating(null);
    }
  };


  // Derived values for the UI
  const subtotal = total;
  const discount = items.length > 0 ? 0 : 0; // Set to 0 since we have real pricing now
  const shipping = items.length > 0 ? 10000 : 0; // Flat 10,000 IDR shipping
  const finalTotal = subtotal - discount + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 w-full animate-pulse">
          <div className="h-10 bg-[#E0E7EF] rounded w-1/4 mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
             <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <div className="h-32 bg-white rounded-2xl border border-[#E0E7EF]"></div>
                <div className="h-32 bg-white rounded-2xl border border-[#E0E7EF]"></div>
             </div>
             <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-[#E0E7EF] p-6 h-[400px]"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }



  if (error && error !== "unauthorized") {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-12 text-center flex flex-col items-center max-w-lg w-full">
            <div className="w-20 h-20 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-[#F26641]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">Ups!</h2>
            <p className="text-[#546E7A] mb-8 text-center leading-relaxed">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#1B6CA8] hover:bg-[#124E7A] text-white px-10 py-4 rounded-xl font-bold transition-colors shadow-sm"
            >
              Coba Lagi
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F9FC] py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A]">Keranjang Anda</h1>

          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-[#B0BEC5]" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">Keranjang Anda Kosong</h2>
              <p className="text-[#546E7A] mb-8 max-w-md">
                Sepertinya Anda belum menambahkan nutrisi premium apa pun untuk teman berbulu Anda.
              </p>
              <Link 
                href="/shop/products"
                className="bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm inline-flex items-center gap-2"
              >
                Jelajahi Produk
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start relative">
              {/* Left Column: Cart Items */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className={`bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-4 sm:p-6 flex gap-4 sm:gap-6 relative transition-opacity ${isUpdating === item.id ? 'opacity-50' : 'opacity-100'}`}>
                    {/* Item Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#E0E7EF] p-2">
                      <Image
                        src={item.product.imageUrl || "/images/product1.png"}
                        alt={item.product.name}
                        width={120}
                        height={120}
                        className="object-contain w-full h-full mix-blend-multiply"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="pr-8">
                        <Link href={`/shop/products/${item.product.id}`}>
                          <h3 className="font-serif font-bold text-[#1A1A1A] text-lg sm:text-xl leading-tight mb-1 hover:text-[#1B6CA8] transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center bg-[#F0F4F8] rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1, item.quantity)}
                            disabled={isUpdating === item.id || item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center text-[#546E7A] hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-[#1A1A1A] text-sm">
                            {isUpdating === item.id ? <Loader2 className="w-4 h-4 animate-spin mx-auto text-[#1B6CA8]" /> : item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1, item.quantity)}
                            disabled={isUpdating === item.id}
                            className="w-8 h-8 flex items-center justify-center text-[#546E7A] hover:bg-white hover:shadow-sm rounded-md transition-all disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="font-bold text-[#1A1A1A] text-lg">
                          Rp {item.subtotal.toLocaleString("id-ID")}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      disabled={isUpdating === item.id}
                      className="absolute top-4 sm:top-6 right-4 sm:right-6 text-[#B0BEC5] hover:text-[#BF4A28] transition-colors p-2 -mr-2 -mt-2 disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary (Desktop) */}
              <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-[100px]">
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                  <h3 className="font-serif font-bold text-xl text-[#1A1A1A] mb-6">Ringkasan Pesanan</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-[#546E7A]">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#1A1A1A]">Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-[#546E7A]">
                      <span>Pengiriman</span>
                      <span className="font-medium text-[#1A1A1A]">Rp {shipping.toLocaleString("id-ID")}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#F26641]">
                        <span>Diskon</span>
                        <span className="font-medium">- Rp {discount.toLocaleString("id-ID")}</span>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-[#E0E7EF] w-full mb-6"></div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-[#1A1A1A]">Total</span>
                    <span className="font-serif font-bold text-2xl text-[#1A1A1A]">
                      Rp {finalTotal.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <button 
                    onClick={() => {
                      if (isGuest) {
                        router.push("/auth?checkout=true");
                      } else {
                        router.push("/checkout");
                      }
                    }}
                    className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white py-4 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    Lanjut ke Pembayaran
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Fixed Bottom Summary for Checkout */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#E0E7EF] p-4 px-4 sm:px-6 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#546E7A] font-medium text-sm">Total ({items.length} item)</span>
            <span className="font-serif font-bold text-xl text-[#1A1A1A]">
              Rp {finalTotal.toLocaleString("id-ID")}
            </span>
          </div>
          <button 
                    onClick={() => {
                      if (isGuest) {
                        router.push("/auth?checkout=true");
                      } else {
                        router.push("/checkout");
                      }
                    }}
            className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white py-4 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2 text-lg"
          >
            Lanjut ke Pembayaran
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* To accommodate the fixed bottom bar on mobile, add padding to footer container if needed, or just let it sit. */}
      {items.length > 0 && <div className="h-32 lg:hidden bg-[#F7F9FC]"></div>}
      
      <Footer />
    </>
  );
}
