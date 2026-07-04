import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

export default function SubscriptionDetailPage({ params }: { params: { id: string } }) {
  // Mock related products
  const relatedProducts = [
    {
      image: "/images/product3.png",
      name: "Atlantic Kelp Powder",
      price: "Rp 45.000",
      description: "Metabolism and thyroid support",
    },
    {
      image: "/images/product1.png",
      name: "Wild Salmon Chips",
      price: "Rp 32.000",
      description: "Crunchy high-protein snack",
    },
    {
      image: "/images/product4.png",
      name: "Marine Collagen Liquid",
      price: "Rp 120.000",
      description: "Joint and bone vitality",
    },
    {
      image: "/images/product2.png",
      name: "Mackerel Wet Mix",
      price: "Rp 15.000 / pc",
      description: "Complete ocean-meat meal",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A]">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16 md:pb-24 pt-4 md:pt-8">
        {/* HERO SECTION */}
        <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16 md:mb-24">
          
          {/* Left: Gallery */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] md:aspect-square bg-white rounded-2xl border border-[#E0E6EB] overflow-hidden relative shadow-sm">
              <Image
                src="/images/product4.png"
                alt="Ocean Omega Box"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-xl border border-[#E0E6EB] hover:border-[#1B6CA8] transition-colors overflow-hidden relative cursor-pointer">
                  <Image
                    src={`/images/product${i}.png`}
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Subscription Info */}
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <div className="inline-flex px-4 py-1.5 bg-[#F26641] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full mb-3 md:mb-4">
                Monthly Subscription
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B6CA8] leading-tight mb-3 md:mb-4">
                Ocean Omega Box
              </h1>
              <p className="text-base sm:text-lg text-[#546E7A] mb-4">
                Curated monthly fish-based treats, personalized for your cat
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-[#F26641]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#1A1A1A]">4.9</span>
                <span className="text-[#546E7A]">(312 subscribers)</span>
              </div>
            </div>

            <div className="w-full h-px bg-[#E0E6EB] mb-6"></div>

            <div className="mb-6">
              <div className="text-lg text-[#546E7A] line-through mb-1">Rp 99.000</div>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold text-[#1A1A1A]">Rp 89.000 / month</div>
                <div className="text-sm font-bold text-[#16A34A]">Save 10% with subscription</div>
              </div>
            </div>

            <div className="w-full h-px bg-[#E0E6EB] mb-6"></div>

            {/* What's Inside Every Box */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">What's Inside Every Box</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F2F4F7] rounded-lg border border-[#E0E6EB] relative overflow-hidden">
                       <Image src="/images/product1.png" alt="Wild Salmon Jerky" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Wild Salmon Jerky</div>
                      <div className="text-xs font-bold text-[#546E7A]">High-protein dental health</div>
                    </div>
                  </div>
                  <div className="font-bold text-[#546E7A]">100g</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F2F4F7] rounded-lg border border-[#E0E6EB] relative overflow-hidden">
                       <Image src="/images/product2.png" alt="Tuna Crunchies" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Tuna Crunchies</div>
                      <div className="text-xs font-bold text-[#546E7A]">Omega-3 skin & coat boost</div>
                    </div>
                  </div>
                  <div className="font-bold text-[#546E7A]">150g</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F2F4F7] rounded-lg border border-[#E0E6EB] relative overflow-hidden">
                       <Image src="/images/product3.png" alt="Ocean Kelp Bites" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Ocean Kelp Bites</div>
                      <div className="text-xs font-bold text-[#546E7A]">Thyroid & immunity support</div>
                    </div>
                  </div>
                  <div className="font-bold text-[#546E7A]">20 pcs</div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#E0E6EB] mb-6"></div>

            {/* Subscription Benefits */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">Subscription Benefits</h3>
              <div className="flex flex-col gap-3 text-[#414750]">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                  <span>Free shipping every month</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                  <span>Pause or cancel anytime</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                  <span>Box customized to your pet profile</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#E0E6EB] mb-6"></div>

            {/* Delivery Schedule selector */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">Delivery Schedule</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-6 py-2 bg-[#F26641] text-white font-bold rounded-full border-2 border-[#F26641] text-sm">
                  Monthly
                </button>
                <button className="px-6 py-2 bg-transparent text-[#414750] font-bold rounded-full border-2 border-[#E0E6EB] text-sm hover:border-[#F26641] transition-colors">
                  Every 2 Weeks
                </button>
                <button className="px-6 py-2 bg-transparent text-[#414750] font-bold rounded-full border-2 border-[#E0E6EB] text-sm hover:border-[#F26641] transition-colors">
                  Quarterly
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-[#E0E6EB] mb-8"></div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 mt-auto">
              <button className="w-full py-4 bg-[#F26641] hover:bg-[#BF4A28] text-white rounded-xl font-bold text-lg transition-colors shadow-sm">
                Subscribe Now — Rp 89.000/mo
              </button>
              <button className="w-full py-4 bg-white hover:bg-[#F7F9FC] text-[#1A1A1A] border-2 border-[#E0E6EB] rounded-xl font-bold text-lg transition-colors">
                Try One-Time Box Rp 99.000
              </button>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION INFORMATION CARD */}
        <section className="mb-16 md:mb-24">
          <div className="bg-white border border-[#E0E6EB] rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1A1A1A] mb-6 md:mb-8">Subscription Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              {/* Left Column */}
              <div className="md:col-span-4 flex flex-col gap-8">
                <div>
                  <h3 className="text-sm font-bold text-[#546E7A] uppercase tracking-wider mb-3">Best For</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Adult Cats', 'Picky Eaters', 'Indoor Cats', 'Skin & Coat'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[#F7F9FC] border border-[#E0E6EB] text-[#414750] text-sm rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-[#546E7A] uppercase tracking-wider mb-3">Subscription Benefits</h3>
                  <p className="text-sm text-[#414750] leading-relaxed">
                    Enjoy seamless, automatic deliveries so you never run out of treats. Modify or cancel anytime with zero hidden fees.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#546E7A] uppercase tracking-wider mb-3">Sustainability</h3>
                  <p className="text-sm text-[#414750] leading-relaxed">
                    By subscribing, you reduce overall packaging waste through optimized recurring shipments.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-8 flex flex-col gap-10">
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Description</h3>
                  <p className="text-[#414750] leading-relaxed">
                    The Ocean Omega Box is our most popular monthly subscription. It provides a curated selection of premium, sustainably-sourced marine nutrition directly to your door, ensuring your cat always has access to the highest quality treats.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">What You Receive Each Month</h3>
                  <ul className="flex flex-col gap-3 text-[#414750]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      2-3 varieties of premium fish-based treats
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      Exclusive seasonal recipes not available for one-time purchase
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      A nutritional guide tailored to your pet's profile
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Key Benefits</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-[#414750]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      Consistent Omega-3 intake
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      Saves time and money
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      Tailored to dietary needs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      100% natural ingredients
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1B6CA8]">Reviews</h2>
                <button className="px-4 py-2 bg-white border border-[#1B6CA8] text-[#1B6CA8] rounded-xl text-sm font-bold hover:bg-[#F0F4F8] transition-colors">
                  Write Review
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-bold text-[#1B6CA8]">4.9</span>
                <div className="flex flex-col">
                  <span className="font-medium text-[#1B6CA8]">out of 5 stars</span>
                  <span className="text-[#546E7A] text-sm">312 Reviews</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-3 text-[#546E7A]">{stars}</span>
                    <Star className="w-4 h-4 fill-[#1B6CA8] text-[#1B6CA8]" />
                    <div className="flex-1 h-2 bg-[#E0E6EB] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1B6CA8] rounded-full" 
                        style={{ width: stars === 5 ? '85%' : stars === 4 ? '12%' : stars === 3 ? '3%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col gap-6 pt-2">
              {/* Review Card 1 */}
              <div className="bg-white border border-[#E0E6EB] p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F7F9FC] rounded-full flex items-center justify-center font-bold text-[#1B6CA8]">
                      EW
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Emma W.</div>
                      <div className="flex text-[#1B6CA8] mt-0.5">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#546E7A] text-sm">3 weeks ago</span>
                </div>
                <p className="text-[#414750] leading-relaxed">
                  The monthly box is so convenient. My cat recognizes the packaging and goes crazy every time it arrives!
                </p>
              </div>

              {/* Review Card 2 */}
              <div className="bg-white border border-[#E0E6EB] p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F7F9FC] rounded-full flex items-center justify-center font-bold text-[#1B6CA8]">
                      DL
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">David L.</div>
                      <div className="flex text-[#1B6CA8] mt-0.5">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#546E7A] text-sm">1 month ago</span>
                </div>
                <p className="text-[#414750] leading-relaxed">
                  Great value compared to buying one-time. The variety keeps things interesting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="w-full border-t border-[#E0E6EB] flex flex-col items-center justify-center mb-16 pt-16">
          <h2 className="text-[#1A1A1A] font-serif text-2xl md:text-3xl font-bold tracking-wide uppercase text-center">
            Curated For Your Pet Every Month
          </h2>
        </div>

        {/* RELATED SUBSCRIPTIONS */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">You Might Also Like</h2>
            <Link href="/shop/subscriptions" className="flex items-center gap-2 font-bold text-[#1B6CA8] hover:text-[#124E7A] transition-colors text-sm md:text-base">
              View All <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                name={product.name}
                price={product.price}
                description={product.description}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
