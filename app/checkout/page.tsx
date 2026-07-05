"use client";

import { useState } from "react";
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
  Circle 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock Data
const MOCK_ITEMS = [
  {
    id: "1",
    type: "product",
    name: "Salmon Skin Crisps",
    price: 45000,
    quantity: 2,
  },
  {
    id: "2",
    type: "subscription",
    name: "Joint & Mobility Box",
    price: 150000,
    quantity: 1,
    frequency: "Every 4 Weeks",
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const subtotal = MOCK_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 15000;
  const shipping = deliveryMethod === "standard" ? 10000 : 25000;
  const total = subtotal - discount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, process payment here.
    router.push("/checkout/success");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F9FC] py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/cart" className="inline-flex items-center gap-2 text-[#546E7A] hover:text-[#1B6CA8] transition-colors mb-6 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Section 1: Shipping Information */}
              <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#1B6CA8]" />
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">1. Shipping Information</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Phone Number</label>
                    <input required type="tel" placeholder="+62 812 3456 7890" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Street Address</label>
                    <input required type="text" placeholder="Jl. Sudirman No. 1" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">City</label>
                    <input required type="text" placeholder="Jakarta Selatan" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Province</label>
                    <input required type="text" placeholder="DKI Jakarta" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-[#1A1A1A]">Postal Code</label>
                    <input required type="text" placeholder="12190" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" />
                  </div>
                </div>
              </section>

              {/* Section 2: Delivery Method */}
              <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-[#1B6CA8]" />
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">2. Delivery Method</h2>
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
                      <span className="font-bold text-[#1A1A1A]">Standard Delivery</span>
                      {deliveryMethod === "standard" ? (
                        <CheckCircle2 className="w-5 h-5 text-[#1B6CA8]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#B0BEC5]" />
                      )}
                    </div>
                    <span className="text-sm text-[#546E7A]">3-5 Business Days</span>
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
                      <span className="font-bold text-[#1A1A1A]">Express Delivery</span>
                      {deliveryMethod === "express" ? (
                        <CheckCircle2 className="w-5 h-5 text-[#1B6CA8]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#B0BEC5]" />
                      )}
                    </div>
                    <span className="text-sm text-[#546E7A]">1-2 Business Days</span>
                    <span className="mt-2 font-bold text-[#1A1A1A]">Rp 25.000</span>
                  </label>
                </div>
              </section>

              {/* Section 3: Payment Method */}
              <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#1B6CA8]" />
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">3. Payment Method</h2>
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
                      <span className="font-bold text-[#1A1A1A]">Bank Transfer</span>
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
                      <span className="font-bold text-[#1A1A1A]">Credit Card</span>
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
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Order Review</h2>
                </div>

                <div className="space-y-4 mb-6">
                  {MOCK_ITEMS.map(item => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-[#F0F4F8] last:border-0 last:pb-0">
                      <div>
                        <div className="font-bold text-[#1A1A1A] text-sm">{item.name}</div>
                        <div className="text-xs text-[#546E7A] mt-1">Qty: {item.quantity}</div>
                        {item.type === "subscription" && (
                          <div className="text-xs font-semibold text-[#F26641] mt-1">{item.frequency}</div>
                        )}
                      </div>
                      <div className="font-bold text-[#1A1A1A] text-sm text-right">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>

                {MOCK_ITEMS.some(item => item.type === "subscription") && (
                  <div className="bg-[#F0F4F8] rounded-xl p-4 mb-6 border border-[#E0E7EF]">
                    <div className="text-xs font-bold text-[#1B6CA8] uppercase tracking-wider mb-2">Subscription Summary</div>
                    <div className="text-sm font-medium text-[#1A1A1A]">Joint & Mobility Box</div>
                    <div className="text-xs text-[#546E7A] mt-1">Billed {MOCK_ITEMS.find(i => i.type === "subscription")?.frequency}</div>
                    <div className="text-xs text-[#546E7A] mt-1">Next Billing: {(new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-[#546E7A]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1A1A1A]">Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#546E7A]">
                    <span>Shipping ({deliveryMethod})</span>
                    <span className="font-medium text-[#1A1A1A]">Rp {shipping.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#F26641]">
                    <span>Discount</span>
                    <span className="font-medium">- Rp {discount.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="h-px bg-[#E0E7EF] w-full mb-6"></div>

                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold text-[#1A1A1A]">Total</span>
                  <span className="font-serif font-bold text-2xl text-[#1A1A1A]">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white py-4 rounded-xl font-bold transition-colors shadow-sm text-lg"
                >
                  Place Order
                </button>
                <div className="text-center text-xs text-[#B0BEC5] mt-4">
                  By placing your order, you agree to our Terms & Conditions.
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
