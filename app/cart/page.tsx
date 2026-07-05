"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock Data
const MOCK_ITEMS = [
  {
    id: "1",
    type: "product",
    name: "Salmon Skin Crisps",
    description: "Rich in Omega-3, perfect for healthy skin and coat.",
    price: 45000,
    quantity: 2,
    image: "/images/product-salmon.png"
  },
  {
    id: "2",
    type: "subscription",
    name: "Joint & Mobility Box",
    description: "Curated snacks & supplements for active joints.",
    price: 150000,
    quantity: 1,
    frequency: "Every 4 Weeks",
    image: "/images/sub-joint.png"
  }
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_ITEMS);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: newQ > 0 ? newQ : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = items.length > 0 ? 15000 : 0; // Fake discount if not empty
  const shipping = items.length > 0 ? 10000 : 0; // Fake shipping
  const total = subtotal - discount + shipping;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F9FC] py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A]">Your Cart</h1>
            {items.length > 0 && (
              <button 
                onClick={() => setItems([])}
                className="text-sm text-[#546E7A] hover:text-[#F26641] transition-colors"
              >
                Clear Cart (Demo)
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-[#B0BEC5]" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-3">Your Cart Is Empty</h2>
              <p className="text-[#546E7A] mb-8 max-w-md">
                Looks like you haven't added any premium nutrition for your furry friend yet.
              </p>
              <Link 
                href="/shop"
                className="bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm inline-flex items-center gap-2"
              >
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start relative">
              {/* Left Column: Cart Items */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-4 sm:p-6 flex gap-4 sm:gap-6 relative">
                    {/* Item Image Placeholder */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#D6E8F5] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <span className="text-[#1B6CA8] text-xs font-bold px-2 text-center">Image placeholder</span>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="pr-8">
                        {item.type === "subscription" && (
                          <div className="inline-flex items-center gap-2 bg-[#D6E8F5] text-[#1B6CA8] px-3 py-1 rounded-full text-xs font-bold mb-2">
                            <span>Monthly</span>
                            <span className="w-1 h-1 rounded-full bg-[#1B6CA8]"></span>
                            <span>{item.frequency}</span>
                          </div>
                        )}
                        <h3 className="font-serif font-bold text-[#1A1A1A] text-lg sm:text-xl leading-tight mb-1">{item.name}</h3>
                        <p className="text-[#546E7A] text-sm leading-relaxed hidden sm:block">{item.description}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center bg-[#F0F4F8] rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-[#546E7A] hover:bg-white hover:shadow-sm rounded-md transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-[#1A1A1A] text-sm">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#546E7A] hover:bg-white hover:shadow-sm rounded-md transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="font-bold text-[#1A1A1A] text-lg">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 sm:top-6 right-4 sm:right-6 text-[#B0BEC5] hover:text-[#F26641] transition-colors p-2 -mr-2 -mt-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary (Desktop) */}
              <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-[100px]">
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8">
                  <h3 className="font-serif font-bold text-xl text-[#1A1A1A] mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-[#546E7A]">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#1A1A1A]">Rp {subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-[#546E7A]">
                      <span>Shipping</span>
                      <span className="font-medium text-[#1A1A1A]">Rp {shipping.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-[#F26641]">
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

                  <Link 
                    href="/checkout"
                    className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white py-4 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>
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
            <span className="text-[#546E7A] font-medium text-sm">Total ({items.length} items)</span>
            <span className="font-serif font-bold text-xl text-[#1A1A1A]">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
          <Link 
            href="/checkout"
            className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white py-4 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2 text-lg"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}

      {/* To accommodate the fixed bottom bar on mobile, add padding to footer container if needed, or just let it sit. */}
      {items.length > 0 && <div className="h-32 lg:hidden bg-[#F7F9FC]"></div>}
      
      <Footer />
    </>
  );
}
