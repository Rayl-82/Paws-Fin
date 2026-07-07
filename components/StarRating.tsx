import { Star } from "lucide-react";

export function deriveRating(id: string): number {
  if (!id) return 4.5;
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const raw = 3.5 + (hash % 16) * 0.1;
  return Math.round(raw * 10) / 10;
}

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercent = Math.min(100, Math.max(0, (rating - (star - 1)) * 100));
        return (
          <span key={star} className="relative inline-block w-4 h-4 md:w-5 md:h-5 flex-shrink-0">
            <Star className="absolute top-0 left-0 w-4 h-4 md:w-5 md:h-5 fill-[#E5E7EB] text-[#E5E7EB]" />
            <span
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#FFB800] text-[#FFB800] max-w-none" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
