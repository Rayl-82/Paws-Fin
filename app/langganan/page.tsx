import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionCarousel from "@/components/SubscriptionCarousel";
import Image from "next/image";
import Link from "next/link";
import { Truck, CalendarOff, Crosshair, Leaf, ChevronDown } from "lucide-react";
import prisma from "@/lib/prisma";
import FadeIn from "@/components/FadeIn";

export const dynamic = 'force-dynamic';

export default async function LanggananPage() {
  const subscriptionPlansData = await prisma.product.findMany({
    where: { category: 'Subscriptions' },
    orderBy: { createdAt: 'asc' },
  });

  const bundlesData = await prisma.product.findMany({
    where: { category: 'Bundles' },
    orderBy: { createdAt: 'asc' },
  });

  const subscriptionPlans = subscriptionPlansData.map((p: any) => ({
    id: p.id,
    image: p.imageUrl || "/images/subscriptionbox.png",
    name: p.name,
    desc: p.description,
    price: `Rp ${p.price.toLocaleString('id-ID')}`
  }));

  const bundlePlans = bundlesData.map((p: any) => ({
    id: p.id,
    image: p.imageUrl || "/images/product1.png",
    name: p.name,
    desc: p.description,
    price: `Rp ${p.price.toLocaleString('id-ID')}`
  }));

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A]">
      <Navbar />

      <main className="w-full flex flex-col items-center pt-6 lg:pt-8 pb-24">
        {/* HERO BANNER */}
        <FadeIn className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-12">
          <div className="w-full h-[220px] md:h-[240px] lg:h-[280px] rounded-2xl relative overflow-hidden bg-[#1B6CA8] shadow-sm">
            <Image
              src="/images/subsbanner.png"
              alt="Subscription Banner"
              fill
              className="object-cover object-[20%_center] sm:object-center scale-[1.3] sm:scale-100"
              priority
            />
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3350]/80 via-[#124E7A]/50 to-transparent"></div>

            <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center max-w-[600px] z-10">
              <h1 className="text-3xl md:text-[40px] font-serif font-bold text-white leading-tight mb-4 drop-shadow-sm">
                Nutrisi Terpersonalisasi Dikirim Setiap Bulan
              </h1>
              <p className="text-base md:text-lg text-[#D6E8F5] leading-relaxed hidden sm:block">
                Kotak langganan yang dikurasi sesuai kebutuhan unik hewan peliharaan Anda, dikirim langsung ke pintu rumah Anda.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* SUBSCRIPTION PLANS */}
        <FadeIn delay={0.2} className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-16 md:mb-24">
          <SubscriptionCarousel
            title="Paket Langganan"
            plans={subscriptionPlans}
            isMonthly={true}
            baseHref="/shop/subscriptions"
            buttonText="Berlangganan Sekarang"
          />
        </FadeIn>

        {/* ONE-TIME BUNDLES */}
        <FadeIn delay={0.3} className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-16 md:mb-32">
          <SubscriptionCarousel
            title="Bundel Sekali Beli"
            plans={bundlePlans}
            isMonthly={false}
            baseHref="/shop/bundles"
            buttonText="Tambah ke Keranjang"
          />
        </FadeIn>

        {/* WHY SUBSCRIBE? */}
        <FadeIn className="w-full max-w-[1440px] px-4 md:px-8 lg:px-16 mb-20 md:mb-32">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Mengapa Berlangganan?</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <Truck className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] text-sm md:text-base mb-1">Gratis Pengiriman</h3>
                <p className="text-[#546E7A] text-xs md:text-sm leading-relaxed">Nikmati pengiriman gratis untuk semua langganan bulanan aktif.</p>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <CalendarOff className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] text-sm md:text-base mb-1">Jadwal Fleksibel</h3>
                <p className="text-[#546E7A] text-xs md:text-sm leading-relaxed">Jeda, lewati, atau batalkan pengiriman kapan saja tanpa biaya.</p>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <Crosshair className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] text-sm md:text-base mb-1">Pilihan Terpersonalisasi</h3>
                <p className="text-[#546E7A] text-xs md:text-sm leading-relaxed">Kotak dikurasi sesuai profil hewan Anda.</p>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E6EB] flex flex-col gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F0F4F8] rounded-xl flex items-center justify-center text-[#1B6CA8]">
                <Leaf className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A1A] text-sm md:text-base mb-1">Nutrisi Berkelanjutan</h3>
                <p className="text-[#546E7A] text-xs md:text-sm leading-relaxed">Bahan laut premium yang didaur ulang.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* FAQ */}
        <FadeIn className="w-full max-w-3xl px-4 md:px-8 mx-auto mb-8 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A]">Pertanyaan yang Sering Diajukan</h2>
          </div>

          <div className="flex flex-col gap-4">
            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Apa perbedaan Paket Langganan dan Bundel Sekali Beli?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Paket Langganan adalah pengiriman bulanan berulang.<br /><br />
                Bundel Sekali Beli dibeli satu kali tanpa tagihan berulang.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Bisakah saya membatalkan kapan saja?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Ya, tentu saja. Tidak ada kontrak yang mengikat. Anda dapat menjeda atau membatalkan langganan kapan saja langsung dari halaman akun Anda tanpa biaya tersembunyi.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Bisakah saya melewati satu bulan?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Ya. Jika Anda masih memiliki banyak camilan, Anda dapat memilih "Lewati Pengiriman" di dasbor untuk menunda pengiriman berikutnya.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Bagaimana produk dipilih?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Kami menggunakan profil hewan peliharaan yang Anda buat (usia, berat, tingkat aktivitas, dan kebutuhan diet) untuk mengurasi camilan laut yang paling tepat secara nutrisi.
              </div>
            </details>

            <details className="group bg-white border border-[#E0E6EB] rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-[#1A1A1A]">
                Bisakah saya mengubah paket langganan saya?
                <ChevronDown className="w-5 h-5 text-[#546E7A] transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[#546E7A] leading-relaxed border-t border-[#F0F4F8] pt-4 mt-2">
                Ya, Anda dapat meningkatkan, menurunkan, atau mengganti paket kapan saja. Perubahan akan berlaku pada siklus tagihan berikutnya.
              </div>
            </details>
          </div>
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}
