"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Landmark, 
  Truck, 
  MapPin, 
  Package, 
  CheckCircle2, 
  Circle,
  Loader2
} from "lucide-react";
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

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  // Form states
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      
      if (!res.ok) throw new Error("Failed to load cart");
      
      setItems(data.data.items);
      setTotal(data.data.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = total;
  const discount = 0;
  const shipping = items.length > 0 ? 10000 : 0;
  const finalTotal = subtotal - discount + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setError(null);

    const fullAddress = `${address}, ${city}, ${province}, ${postal}`;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingAddress: fullAddress })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || "Failed to place order");
      }

      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 w-full animate-pulse">
          <div className="h-10 bg-[#E0E7EF] rounded w-1/4 mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
             <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <div className="h-64 bg-white rounded-2xl border border-[#E0E7EF]"></div>
                <div className="h-64 bg-white rounded-2xl border border-[#E0E7EF]"></div>
             </div>
             <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-[#E0E7EF] p-6 h-[400px]"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F9FC] py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/cart" className="inline-flex items-center gap-2 text-[#546E7A] hover:text-[#1B6CA8] transition-colors mb-6 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Keranjang
          </Link>

          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] mb-8">Pembayaran</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Section 1: Shipping Information */}
              <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#1B6CA8]" />
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">1. Informasi Pengiriman</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Nama Lengkap</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Alamat Email</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Nomor Telepon</label>
                    <input required type="tel" placeholder="+62 812 3456 7890" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Alamat Jalan</label>
                    <input required type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Jl. Sudirman No. 1" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Kota</label>
                    <input required type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Jakarta Selatan" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Provinsi</label>
                    <input required type="text" value={province} onChange={e => setProvince(e.target.value)} placeholder="DKI Jakarta" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Kode Pos</label>
                    <input required type="text" value={postal} onChange={e => setPostal(e.target.value)} placeholder="12190" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                </div>
              </section>

              {/* Section 2: Delivery Method */}
              <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-[#1B6CA8]" />
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">2. Metode Pengiriman</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label 
                    className={`relative flex flex-col p-5 cursor-pointer rounded-xl border-2 transition-all ${
                      deliveryMethod === "standard" 
                        ? "border-[#1B6CA8] bg-[#D6E8F5]/30" 
                        : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="standard" 
                      checked={deliveryMethod === "standard"}
                      onChange={() => setDeliveryMethod("standard")}
                      className="hidden"
                    />
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-[#1A1A1A]">Pengiriman Standar</span>
                      {deliveryMethod === "standard" ? (
                        <CheckCircle2 className="w-5 h-5 text-[#1B6CA8]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#B0BEC5]" />
                      )}
                    </div>
                    <span className="text-sm text-[#546E7A]">3-5 Hari Kerja</span>
                    <span className="mt-2 font-bold text-[#1A1A1A]">Rp 10.000</span>
                  </label>
                  
                  <label 
                    className={`relative flex flex-col p-5 cursor-pointer rounded-xl border-2 transition-all ${
                      deliveryMethod === "express" 
                        ? "border-[#1B6CA8] bg-[#D6E8F5]/30" 
                        : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="express" 
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                      className="hidden"
                    />
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-[#1A1A1A]">Pengiriman Ekspres</span>
                      {deliveryMethod === "express" ? (
                        <CheckCircle2 className="w-5 h-5 text-[#1B6CA8]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#B0BEC5]" />
                      )}
                    </div>
                    <span className="text-sm text-[#546E7A]">1-2 Hari Kerja</span>
                    <span className="mt-2 font-bold text-[#1A1A1A]">Rp 25.000</span>
                  </label>
                </div>
              </section>

              {/* Section 3: Payment Method */}
              <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#1B6CA8]" />
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">3. Metode Pembayaran</h2>
                </div>
                
                <div className="flex flex-col gap-3">
                  <label 
                    className={`flex items-center justify-between p-4 cursor-pointer rounded-xl border-2 transition-all ${
                      paymentMethod === "bank" 
                        ? "border-[#1B6CA8] bg-[#D6E8F5]/30" 
                        : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === "bank" ? "bg-[#1B6CA8] text-white" : "bg-[#F0F4F8] text-[#546E7A]"}`}>
                        <Landmark className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#1A1A1A]">Transfer Bank</span>
                    </div>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="bank" 
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="w-5 h-5 text-[#1B6CA8] focus:ring-[#1B6CA8] border-gray-300"
                    />
                  </label>

                  <label 
                    className={`flex items-center justify-between p-4 cursor-pointer rounded-xl border-2 transition-all ${
                      paymentMethod === "ewallet" 
                        ? "border-[#1B6CA8] bg-[#D6E8F5]/30" 
                        : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === "ewallet" ? "bg-[#1B6CA8] text-white" : "bg-[#F0F4F8] text-[#546E7A]"}`}>
                        <Wallet className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#1A1A1A]">E-Wallet (GoPay, OVO, Dana)</span>
                    </div>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="ewallet" 
                      checked={paymentMethod === "ewallet"}
                      onChange={() => setPaymentMethod("ewallet")}
                      className="w-5 h-5 text-[#1B6CA8] focus:ring-[#1B6CA8] border-gray-300"
                    />
                  </label>

                  <label 
                    className={`flex items-center justify-between p-4 cursor-pointer rounded-xl border-2 transition-all ${
                      paymentMethod === "credit" 
                        ? "border-[#1B6CA8] bg-[#D6E8F5]/30" 
                        : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === "credit" ? "bg-[#1B6CA8] text-white" : "bg-[#F0F4F8] text-[#546E7A]"}`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#1A1A1A]">Kartu Kredit</span>
                    </div>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="credit" 
                      checked={paymentMethod === "credit"}
                      onChange={() => setPaymentMethod("credit")}
                      className="w-5 h-5 text-[#1B6CA8] focus:ring-[#1B6CA8] border-gray-300"
                    />
                  </label>
                </div>
              </section>

            </div>

            {/* Right Column: Order Review */}
            <div className="lg:col-span-4 mt-8 lg:mt-0 lg:sticky lg:top-[100px] flex flex-col gap-6">
              
              {/* Order Review List */}
              <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-[#1B6CA8]" />
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Ulasan Pesanan</h2>
                </div>

                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-[#F0F4F8] last:border-0 last:pb-0">
                      <div>
                        <div className="font-bold text-[#1A1A1A] text-sm">{item.product.name}</div>
                        <div className="text-xs text-[#546E7A] mt-1">Jml: {item.quantity}</div>
                      </div>
                      <div className="font-bold text-[#1A1A1A] text-sm text-right">
                        Rp {item.subtotal.toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>



                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-[#546E7A]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1A1A1A]">Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#546E7A]">
                    <span>Pengiriman ({deliveryMethod === 'standard' ? 'Standar' : 'Ekspres'})</span>
                    <span className="font-medium text-[#1A1A1A]">Rp {shipping.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#F26641]">
                    <span>Diskon</span>
                    <span className="font-medium">- Rp {discount.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="h-px bg-[#E0E7EF] w-full mb-6"></div>

                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-[#1A1A1A]">Total</span>
                  <span className="font-serif font-bold text-2xl text-[#1A1A1A]">
                    Rp {finalTotal.toLocaleString("id-ID")}
                  </span>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full bg-[#F26641] hover:bg-[#BF4A28] disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-colors shadow-sm text-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  Pesan Sekarang
                </button>
                <div className="text-center text-xs text-[#B0BEC5] mt-4">
                  Dengan melakukan pemesanan, Anda menyetujui Syarat & Ketentuan kami.
                </div>
              </section>

            </div>
          </form>

        </div>
      </main>
      <Footer />
    </>
  );
}
