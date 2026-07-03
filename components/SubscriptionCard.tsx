import Image from "next/image";
import Link from "next/link";

interface SubscriptionCardProps {
  image: string;
  name: string;
  desc: string;
  price: string;
  href?: string;
  buttonText?: string;
  isMonthly?: boolean;
}

export default function SubscriptionCard({ 
  image, 
  name, 
  desc, 
  price, 
  href = "/shop/subscriptions/1", 
  buttonText = "Subscribe Now",
  isMonthly = true 
}: SubscriptionCardProps) {
  return (
    <Link href={href} className="bg-white rounded-2xl border-2 border-transparent hover:border-[#F26641] flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block h-full">
      <div className="w-full h-56 relative overflow-hidden bg-[#F0F4F8]">
        <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-[#191C1E] text-2xl font-bold font-serif mb-2 group-hover:text-[#1B6CA8] transition-colors">{name}</h3>
        <p className="text-[#414750] text-base mb-6 flex-grow">{desc}</p>
        <div className="text-[#F26641] text-2xl font-bold mb-6">
          {price}{isMonthly && <span className="text-lg">/mo</span>}
        </div>
        <div className="w-full border-2 border-[#F26641] text-[#F26641] group-hover:bg-[#F26641] group-hover:text-white font-bold py-3 px-6 rounded-xl transition-colors text-center mt-auto">
          {buttonText}
        </div>
      </div>
    </Link>
  );
}
