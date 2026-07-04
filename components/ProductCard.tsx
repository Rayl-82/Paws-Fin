import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description?: string; // We'll use this for rating based on HTML
  tags?: string[];
}

export default function ProductCard({ image, name, price, description, tags }: ProductCardProps) {
  // Parse description as rating if possible, otherwise default to 4.0
  const ratingValue = parseFloat(description || "4.0") || 4.0;
  
  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-3 md:p-4 flex flex-col shadow-sm border border-[#F0F4F8] hover:shadow-md hover:border-[#D6E8F5] transition-all h-full">
      {/* Image Container */}
      <Link href="/shop/products/1" className="bg-[#F0F4F8] rounded-xl aspect-square relative flex items-center justify-center p-2 md:p-4 mb-3 md:mb-4 block hover:opacity-90 transition-opacity">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-2 mix-blend-multiply"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 md:w-4 md:h-4 ${
              i < Math.floor(ratingValue)
                ? "text-[#FFB800] fill-[#FFB800]"
                : "text-[#B0BEC5]"
            }`}
          />
        ))}
        <span className="text-[#1A1A1A] text-[10px] md:text-xs font-bold ml-1">{description || ratingValue.toFixed(1)}</span>
      </div>

      {/* Product Info */}
      <Link href="/shop/products/1" className="flex-grow group">
        <h3 className="text-[#1A1A1A] font-bold font-serif text-[13px] md:text-lg leading-tight mb-2 group-hover:text-[#1B6CA8] transition-colors line-clamp-2">
          {name}
        </h3>
      </Link>
      
      <p className="text-[#F26641] font-bold text-[15px] md:text-xl mb-3 md:mb-4">
        {price}
      </p>

      {/* Feature Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-col gap-1 md:gap-2 mb-3 md:mb-4">
          {tags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1.5 md:gap-2">
              <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-[#1B6CA8] rounded-sm flex-shrink-0"></div>
              <span className="text-[#1B6CA8] text-[10px] md:text-sm font-semibold tracking-wide leading-tight">{tag}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add to Cart Button */}
      <button className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-[#FFFFFF] font-semibold text-sm py-2.5 rounded-lg transition-colors mt-auto">
        Add to Cart
      </button>
    </div>
  );
}
