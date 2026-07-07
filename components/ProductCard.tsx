"use client";

import Image from "next/image";
import { Star, Loader2, ShoppingCart, Check } from "lucide-react";
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
      className="bg-[#FFFFFF] rounded-2xl p-3 md:p-4 flex flex-col shadow-sm border border-[#F0F4F8] hover:shadow-md hover:border-[#D6E8F5] transition-all h-full cursor-pointer group"
    >
      {/* Image Container */}
      <div className="rounded-xl aspect-square relative flex items-center justify-center mb-3 md:mb-4 overflow-hidden group-hover:opacity-90 transition-opacity">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      <div className="flex items-center gap-1.5 mb-2 scale-75 origin-left md:scale-90 lg:scale-100">
        <StarRating rating={displayRating} />
        <span className="text-[#1A1A1A] text-[10px] md:text-xs font-bold">
          {displayRating.toFixed(1)}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-[#1A1A1A] font-bold font-serif text-[13px] md:text-lg leading-tight mb-2 group-hover:text-[#1B6CA8] transition-colors line-clamp-2 flex-grow">
        {name}
      </h3>

      <p className="text-[#F26641] font-bold text-[15px] md:text-xl mb-3 md:mb-4">
        {price}
      </p>

      {/* Feature Tags */}
      <div className="flex flex-col gap-1 md:gap-2 mb-3 md:mb-4">
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

      {/* Add to Cart Button — stopPropagation so clicking it doesn't navigate */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || !id}
        className={`w-full font-semibold text-sm py-2.5 rounded-lg transition-all mt-auto flex items-center justify-center gap-2
          ${added
            ? "bg-green-500 text-white"
            : "bg-[#F26641] hover:bg-[#BF4A28] text-[#FFFFFF] disabled:opacity-70"
          }`}
      >
        {isAdding ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : added ? (
          "Added! ✓"
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
