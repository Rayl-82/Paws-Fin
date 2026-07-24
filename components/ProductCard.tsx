"use client";

import Image from "next/image";
import { Star, Loader2, ShoppingCart, Check, Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id?: string;
  image: string;
  name: string;
  price: string;
  rating?: number;
  description?: string;
  tags?: string[];
}

import StarRating, { deriveRating } from "@/components/StarRating";

export default function ProductCard({ id, image, name, price, rating, description, tags }: ProductCardProps) {
  const router = useRouter();
  const href = id ? `/shop/products/${id}` : "/shop/products";

  // Use passed-in rating if present; otherwise derive from id for variety
  const displayRating = rating !== undefined ? rating : id ? deriveRating(id) : 4.5;
  const displayTags = ["High Omega-3", "Single Ingredient"];

  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    if (href) router.push(href);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't navigate when clicking the button

    if (!id) return;
    setIsAdding(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      if (res.status === 401) {
        // Fallback to guest cart
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const numericPrice = parseInt(price.replace(/[^0-9]/g, "")) || 0; // rough extraction from "Rp 150.000" string
        
        const existingItem = guestCart.find((i: any) => i.productId === id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          guestCart.push({
            id: `guest-item-${Date.now()}`,
            productId: id,
            quantity: 1,
            product: {
              id: id,
              name: name,
              price: numericPrice,
              imageUrl: image,
            }
          });
        }
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        window.dispatchEvent(new Event("cartUpdated"));
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || "Failed to add to cart");
      }

      window.dispatchEvent(new Event("cartUpdated"));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-[#FFFFFF] rounded-2xl flex flex-col shadow-sm border border-[#E0E7EF] hover:-translate-y-1.5 hover:shadow-[0_15px_40px_-15px_rgba(242,102,65,0.25)] hover:border-[#F26641]/30 transition-all duration-300 ease-out h-full cursor-pointer group overflow-hidden relative"
    >
      {/* Category badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-white/90 backdrop-blur-sm text-[#1B6CA8] text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
          {tags && tags.length > 0 ? tags[0] : (() => {
            const d = (name + " " + (description || "")).toLowerCase();
            const isCat = d.includes("cat") || d.includes("kucing") || d.includes("feline");
            const isDog = d.includes("dog") || d.includes("anjing") || d.includes("canine");
            
            if (isCat && isDog) return "Semua Hewan";
            if (isCat) return "Kucing";
            if (isDog) return "Anjing";
            return "Semua Hewan";
          })()}
        </span>
      </div>

      {/* Full-bleed Image Container */}
      <div className="w-full aspect-square relative flex items-center justify-center overflow-hidden bg-[#F7F9FC]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Body Container */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-3 scale-90 origin-left">
          <StarRating rating={displayRating} />
          <span className="text-[#1A1A1A] text-xs font-bold">
            {displayRating.toFixed(1)}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-[#1A1A1A] font-extrabold font-serif text-[14px] md:text-lg leading-tight mb-2 group-hover:text-[#1B6CA8] transition-colors line-clamp-2 flex-grow">
          {name}
        </h3>

        <p className="text-[#F26641] font-extrabold text-lg md:text-2xl mb-4">
          {price}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-col gap-1 md:gap-2 mb-4">
          {displayTags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1.5 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#1B6CA8] flex items-center justify-center flex-shrink-0">
                <Check className="text-white w-2 h-2 md:w-2.5 md:h-2.5" strokeWidth={3} />
              </div>
              <span className="text-[#1B6CA8] text-[10px] md:text-sm font-semibold tracking-wide leading-tight">
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || !id}
          className={`w-full font-bold text-sm py-3 rounded-xl transition-all mt-auto flex items-center justify-center gap-2
            ${added
              ? "bg-[#10B981] text-white"
              : "bg-[#F7F9FC] text-[#546E7A] hover:bg-[#F26641] hover:text-white disabled:opacity-70"
            }`}
        >
          {isAdding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Menambahkan...
            </>
          ) : added ? (
            <>
              <Check className="w-4 h-4" /> Ditambahkan
            </>
          ) : (
            "Tambah ke Keranjang"
          )}
        </button>
      </div>
    </div>
  );
}
