import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
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
        {/* PRODUCT HERO */}
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

          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col pt-2 lg:pt-8">
            <div className="mb-6">
              <div className="inline-block px-4 py-1.5 bg-[#F26641] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Best Seller
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B6CA8] leading-tight mb-3 md:mb-4">
                Ocean Omega Box
              </h1>
              <p className="text-base sm:text-lg text-[#546E7A] mb-4">
                Premium fish-based treats for adult cats
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-[#F26641]">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#1A1A1A]">4.8</span>
                <span className="text-[#546E7A]">(240 reviews)</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-3xl font-bold text-[#1A1A1A] mb-4">Rp 89.000</div>
              <div className="bg-[#F7F9FC] rounded-xl p-4 border border-[#E0E6EB]">
                <ul className="flex flex-col gap-2 text-sm text-[#414750]">
                  <li className="flex justify-between">
                    <span className="text-[#546E7A]">Weight:</span>
                    <span className="font-semibold text-[#1A1A1A]">50g</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#546E7A]">Pet Type:</span>
                    <span className="font-semibold text-[#1A1A1A]">Cat</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#546E7A]">Life Stage:</span>
                    <span className="font-semibold text-[#1A1A1A]">Adult</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-[#546E7A]">Stock:</span>
                    <span className="font-semibold text-[#1B6CA8]">124 Available</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Product Highlights */}
            <div className="flex flex-col gap-3 mb-10 text-[#414750]">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                <span>Wild-Caught Fish Ingredients</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                <span>Rich in Omega-3</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                <span>Grain-Free Formula</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                <span>Made from Rescued Marine By-Products</span>
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <button className="w-full py-4 bg-[#F26641] hover:bg-[#BF4A28] text-white rounded-xl font-bold text-lg transition-colors shadow-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* UNIFIED PRODUCT INFORMATION */}
        <section className="mb-16 md:mb-24">
          <div className="bg-white border border-[#E0E6EB] rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1A1A1A] mb-6 md:mb-8">Product Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              {/* Left Column */}
              <div className="md:col-span-4 flex flex-col gap-8">
                <div>
                  <h3 className="text-sm font-bold text-[#546E7A] uppercase tracking-wider mb-3">Best For</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Adult Cats', 'Sensitive Digestion', 'Indoor Cats', 'High Activity'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[#F7F9FC] border border-[#E0E6EB] text-[#414750] text-sm rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-[#546E7A] uppercase tracking-wider mb-3">Sustainability Impact</h3>
                  <p className="text-sm text-[#414750] leading-relaxed">
                    This product helps reduce marine food waste by utilizing underused fish by-products, supporting circular oceanic health.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-8 flex flex-col gap-10">
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Description</h3>
                  <p className="text-[#414750] leading-relaxed">
                    Premium, sustainably-sourced marine nutrition for your pet. Carefully crafted to offer the optimal balance of proteins and essential fatty acids, it supports a healthy lifestyle without artificial additives.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Key Benefits</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-[#414750]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      Supports Healthy Coat
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      Rich in Omega-3
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      High Protein
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B6CA8]"></span>
                      Grain Free
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Wild Salmon', 'Fish Oil', 'Natural Omega-3', 'Vitamin E', 'Mixed Tocopherols'].map(ingredient => (
                      <span key={ingredient} className="px-3 py-1.5 bg-[#D6E8F5] text-[#1B6CA8] text-sm font-medium rounded-full">
                        {ingredient}
                      </span>
                    ))}
                  </div>
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
                <span className="text-5xl font-bold text-[#1B6CA8]">4.8</span>
                <div className="flex flex-col">
                  <span className="font-medium text-[#1B6CA8]">out of 5 stars</span>
                  <span className="text-[#546E7A] text-sm">240 Reviews</span>
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
                        style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : '0%' }}
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
                      SJ
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Sarah J.</div>
                      <div className="flex text-[#1B6CA8] mt-0.5">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#546E7A] text-sm">2 days ago</span>
                </div>
                <p className="text-[#414750] leading-relaxed">
                  My senior cat loves these treats. They are perfect for picky eaters.
                </p>
              </div>

              {/* Review Card 2 */}
              <div className="bg-white border border-[#E0E6EB] p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F7F9FC] rounded-full flex items-center justify-center font-bold text-[#1B6CA8]">
                      MR
                    </div>
                    <div>
                      <div className="font-bold text-[#1A1A1A]">Mark R.</div>
                      <div className="flex text-[#1B6CA8] mt-0.5">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#546E7A] text-sm">1 week ago</span>
                </div>
                <p className="text-[#414750] leading-relaxed">
                  Great quality ingredients and clean packaging. Will buy again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">You Might Also Like</h2>
            <Link href="/shop/products" className="flex items-center gap-2 font-bold text-[#1B6CA8] hover:text-[#124E7A] transition-colors text-sm md:text-base">
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
