"use client";

import { useRef } from "react";
import SubscriptionCard from "@/components/SubscriptionCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Plan {
  id: string;
  image: string;
  name: string;
  desc: string;
  price: string;
}

interface SubscriptionCarouselProps {
  title: string;
  subtitle?: string;
  plans: Plan[];
  isMonthly: boolean;
  baseHref: string;
  buttonText: string;
}

export default function SubscriptionCarousel({ title, subtitle, plans, isMonthly, baseHref, buttonText }: SubscriptionCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 px-4 md:px-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] mb-2">{title}</h2>
          {subtitle && <p className="text-[#546E7A] text-base">{subtitle}</p>}
        </div>
        <div className="flex gap-2 hidden md:flex">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 bg-white text-[#1B6CA8] border border-[#E0E6EB] rounded-full flex items-center justify-center transition-all hover:bg-[#F0F4F8] hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 bg-white text-[#1B6CA8] border border-[#E0E6EB] rounded-full flex items-center justify-center transition-all hover:bg-[#F0F4F8] hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory items-stretch [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
        {plans.map((plan, idx) => (
          <div key={idx} className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center h-auto">
            <SubscriptionCard
              image={plan.image}
              name={plan.name}
              desc={plan.desc}
              price={plan.price}
              href={`${baseHref}/${plan.id}`}
              buttonText={buttonText}
              isMonthly={isMonthly}
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
