import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionCarousel from "@/components/SubscriptionCarousel";
import Image from "next/image";
import Link from "next/link";
import { Truck, CalendarOff, Crosshair, Leaf, ChevronDown } from "lucide-react";

export default function LanggananPage() {
  const subscriptionPlans = [
    { image: "/images/product4.png", name: "Starter Cat Box", desc: "A perfect introduction to premium marine treats for new subscribers.", price: "Rp 69.000" },
    { image: "/images/sub1.png", name: "Adult Cat Box", desc: "Balanced nutrition to maintain health and vitality for adult cats.", price: "Rp 89.000" },
    { image: "/images/sub3.png", name: "Senior Cat Box", desc: "Soft, easy-to-chew treats packed with joint and cognitive support.", price: "Rp 89.000" },
    { image: "/images/sub2.png", name: "Premium Wellness Box", desc: "The ultimate curated selection featuring rare, functional marine proteins.", price: "Rp 129.000" },
  ];

  const bundlePlans = [
    { image: "/images/product1.png", name: "Best Seller Bundle", desc: "Our top three most popular treats bundled for maximum savings.", price: "Rp 105.000" },
    { image: "/images/product2.png", name: "Omega Bundle", desc: "Intense Omega-3 focus for dramatic skin and coat improvement.", price: "Rp 145.000" },
    { image: "/images/product3.png", name: "Senior Cat Bundle", desc: "A one-time collection of our best senior-friendly treats.", price: "Rp 95.000" },
    { image: "/images/cattreats.png", name: "Trial Bundle", desc: "Small sample packs of everything. Perfect for picky eaters.", price: "Rp 50.000" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A]">
      <Navbar />

      <main className="w-full flex flex-col items-center pt-6 lg:pt-8 pb-24">
        {/* HERO BANNER */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-12">
          <div className="w-full h-[220px] md:h-[240px] lg:h-[280px] rounded-2xl relative overflow-hidden bg-[#1B6CA8] shadow-sm">
            <Image
              src="/images/subsbanner.png"
              alt="Subscription Banner"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3350]/80 via-[#124E7A]/50 to-transparent"></div>

            <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center max-w-[600px] z-10">
              <h1 className="text-3xl md:text-[40px] font-serif font-bold text-white leading-tight mb-4 drop-shadow-sm">
                Personalized Nutrition Delivered Every Month
              </h1>
              <p className="text-base md:text-lg text-[#D6E8F5] leading-relaxed hidden sm:block">
                Curated subscription boxes tailored to your pet's unique needs, delivered directly to your door.
              </p>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION PLANS */}
        <section id="plans" className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-16 md:mb-24">
          <SubscriptionCarousel
            title="Subscription Plans"
            plans={subscriptionPlans}
            isMonthly={true}
            href="/shop/subscriptions/1"
            buttonText="Subscribe Now"
          />
        </section>

        {/* ONE-TIME BUNDLES */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-16 md:mb-32">
          <SubscriptionCarousel
            title="One-Time Bundles"
            plans={bundlePlans}
            isMonthly={false}
            href="/shop/products/1"
            buttonText="Add to Cart"
          />
        </section>

        {/* WHY SUBSCRIBE? */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-20 md:mb-32">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Why Subscribe?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-4">
              <div className="w-10 h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">Free Shipping</h3>
                <p className="text-[#546E7A] text-sm leading-relaxed">Enjoy complimentary delivery on all active monthly subscriptions.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-4">
              <div className="w-10 h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <CalendarOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">Flexible Schedule</h3>
                <p className="text-[#546E7A] text-sm leading-relaxed">Pause, skip, or cancel your deliveries anytime with zero fees.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-4">
              <div className="w-10 h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <Crosshair className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">Personalized Selection</h3>
                <p className="text-[#546E7A] text-sm leading-relaxed">Boxes are customized to match your pet's unique dietary profile.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-4">
              <div className="w-10 h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">Sustainable Nutrition</h3>
                <p className="text-[#546E7A] text-sm leading-relaxed">Sourced from premium upcycled marine ingredients.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-3xl px-4 md:px-8 mx-auto mb-8 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A]">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-4">
            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                What's the difference between a Subscription Plan and a One-Time Bundle?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Subscription Plans are recurring monthly deliveries.
                <br /><br />
                One-Time Bundles are purchased once with no recurring charges.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Can I cancel anytime?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Yes, absolutely. There are no lock-in contracts. You can pause or cancel your subscription at any time directly from your account page without any hidden fees.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Can I skip a month?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Yes. If you still have plenty of treats left over, you can easily select "Skip a Delivery" in your dashboard to delay your next shipment.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                How are products selected?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                We use the pet profile you create (age, weight, activity level, and dietary needs) to curate the most nutritionally appropriate marine treats for your companion.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Can I change my subscription plan?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Yes, you can upgrade, downgrade, or switch your plan at any time. Changes will take effect on your next billing cycle.
              </div>
            </details>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
