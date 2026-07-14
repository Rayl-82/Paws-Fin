"use client";

import { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Loader2, AlertCircle, Star } from "lucide-react";
import StarRating, { deriveRating } from "@/components/StarRating";

// Matches our Product model
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: string | null;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  // Use deriveRating based on product ID to match the ProductCard, fallback to 4.8
  const ratingValue = product ? deriveRating(product.id) : 4.8;
  const mainImage = product?.imageUrl || "/images/product1.png";

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    setCartSuccess(false);
    setCartError(null);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      const data = await res.json();
      
      if (res.status === 401) {
        // Fallback to guest cart
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        const existingItem = guestCart.find((i: any) => i.productId === product.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          guestCart.push({
            id: `guest-item-${Date.now()}`,
            productId: product.id,
            quantity: 1,
            product: {
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            }
          });
        }
        
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        window.dispatchEvent(new Event("cartUpdated"));
        setCartSuccess(true);
        setTimeout(() => setCartSuccess(false), 3000);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to add to cart");
      }
      
      window.dispatchEvent(new Event("cartUpdated"));
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 3000); // Clear after 3 seconds
    } catch (err: any) {
      console.error(err);
      setCartError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Product not found");
          throw new Error("Failed to fetch product details");
        }
        const data = await res.json();
        // API response structure: { success: true, data: { ...product } }
        if (data.data) {
          setProduct(data.data);
        } else {
          throw new Error("Invalid product data received");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Mock related products (would eventually come from a real recommendation engine)
  const relatedProducts = [
    {
      image: "/images/product3.png",
      name: "Atlantic Kelp Powder",
      price: "Rp 45.000",
      description: "4.5",
    },
    {
      image: "/images/product1.png",
      name: "Wild Salmon Chips",
      price: "Rp 32.000",
      description: "4.9",
    },
    {
      image: "/images/product4.png",
      name: "Marine Collagen Liquid",
      price: "Rp 120.000",
      description: "5.0",
    },
    {
      image: "/images/product2.png",
      name: "Mackerel Wet Mix",
      price: "Rp 15.000",
      description: "4.2",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 w-full animate-pulse">
          <div className="h-4 bg-[#E0E7EF] rounded w-1/4 mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-12">
             <div className="w-full lg:w-1/2 aspect-square bg-[#E0E7EF] rounded-[32px]"></div>
             <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="h-10 bg-[#E0E7EF] rounded w-3/4"></div>
                <div className="h-6 bg-[#E0E7EF] rounded w-1/4"></div>
                <div className="h-32 bg-[#E0E7EF] rounded w-full mt-4"></div>
                <div className="h-16 bg-[#E0E7EF] rounded w-full mt-8"></div>
             </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-[#E0E6EB] flex flex-col items-center text-center max-w-lg">
            <AlertCircle className="w-16 h-16 text-[#BF4A28] mb-4" />
            <h1 className="text-3xl font-bold font-serif text-[#1A1A1A] mb-4">
              {error === "Product not found" ? "Produk Tidak Ditemukan" : "Ups!"}
            </h1>
            <p className="text-[#546E7A] text-lg mb-8">
              {error || "Produk yang Anda cari tidak ada atau telah dihapus."}
            </p>
            <Link 
              href="/shop/products" 
              className="bg-[#1B6CA8] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#124E7A] transition-colors"
            >
              Kembali ke Toko
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A]">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16 md:pb-24 pt-4 md:pt-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#546E7A] font-medium">
          <Link href="/shop/products" className="hover:text-[#1B6CA8] transition-colors">Toko</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1A1A1A]">{product.name}</span>
        </div>

        {/* PRODUCT HERO */}
        <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16 md:mb-24">
          
          {/* Left: Gallery */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full aspect-[4/5] md:aspect-square bg-white rounded-2xl border border-[#E0E6EB] overflow-hidden relative shadow-sm">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain p-8 mix-blend-multiply"
                priority
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col pt-2 lg:pt-8">
            <div className="mb-6">
              {product.stock > 0 && product.stock < 5 && (
                <div className="inline-block px-4 py-1.5 bg-[#F26641] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                  Stok Sedikit
                </div>
              )}
              {product.stock === 0 && (
                <div className="inline-block px-4 py-1.5 bg-[#BF4A28] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                  Stok Habis
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B6CA8] leading-tight mb-3 md:mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center text-[#F26641]">
                  <StarRating rating={ratingValue} />
                </div>
                <span className="font-semibold text-[#1A1A1A]">{ratingValue.toFixed(1)}</span>
                <span className="text-[#546E7A]">(240 ulasan)</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-3xl md:text-4xl font-bold text-[#F26641] mb-6">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
              </div>
              
              <div className="bg-[#F7F9FC] rounded-xl p-5 border border-[#E0E6EB]">
                <ul className="flex flex-col gap-3 text-sm md:text-base text-[#414750]">
                  <li className="flex justify-between items-center">
                    <span className="text-[#546E7A] font-medium">Kategori:</span>
                    <span className="font-bold text-[#1A1A1A]">{product.category || "Umum"}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-[#546E7A] font-medium">Ketersediaan:</span>
                    <span className={`font-bold ${product.stock > 0 ? "text-[#1B6CA8]" : "text-[#BF4A28]"}`}>
                      {product.stock > 0 ? `${product.stock} Tersedia` : "Stok Habis"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Product Highlights */}
            <div className="flex flex-col gap-3 mb-10 text-[#414750]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1B6CA8]"></div>
                <span className="font-medium">Bahan Ikan Tangkapan Liar</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1B6CA8]"></div>
                <span className="font-medium">Kaya akan Omega-3</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1B6CA8]"></div>
                <span className="font-medium">Terbuat dari Produk Sampingan Laut yang Diselamatkan</span>
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              {cartSuccess && (
                <div className="p-3 bg-[#E8F5E9] text-[#2E7D32] border border-green-200 text-sm font-bold rounded-xl text-center">
                  Berhasil ditambahkan ke keranjang!
                </div>
              )}
              {cartError && (
                <div className="p-3 bg-red-50 text-red-600 border border-red-100 text-sm font-bold rounded-xl text-center">
                  {cartError}{" "}
                  {cartError === "Unauthorized access" && (
                    <Link href="/auth" className="underline">Masuk</Link>
                  )}
                </div>
              )}
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-colors shadow-sm flex items-center justify-center gap-2
                  ${product.stock > 0 
                    ? "bg-[#F26641] hover:bg-[#BF4A28] text-white" 
                    : "bg-[#E0E6EB] text-[#B0BEC5] cursor-not-allowed"}`}
              >
                {isAdding ? <Loader2 className="w-6 h-6 animate-spin" /> : (product.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis")}
              </button>
            </div>
          </div>
        </section>

        {/* UNIFIED PRODUCT INFORMATION */}
        <section className="mb-16 md:mb-24">
          <div className="bg-white border border-[#E0E6EB] rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1A1A1A] mb-6 md:mb-8">Informasi Produk</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              {/* Left Column */}
              <div className="md:col-span-4 flex flex-col gap-8">
                <div>
                  <h3 className="text-sm font-bold text-[#546E7A] uppercase tracking-wider mb-3">Terbaik Untuk</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Kucing Dewasa', 'Pencernaan Sensitif', 'Kucing Rumahan'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-[#F7F9FC] border border-[#E0E6EB] text-[#414750] text-sm font-medium rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-[#546E7A] uppercase tracking-wider mb-3">Dampak Keberlanjutan</h3>
                  <p className="text-sm text-[#414750] leading-relaxed">
                    Produk ini membantu mengurangi limbah makanan laut dengan memanfaatkan produk sampingan ikan, mendukung kesehatan sirkular laut.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-8 flex flex-col gap-10">
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Deskripsi</h3>
                  <p className="text-[#414750] leading-relaxed whitespace-pre-wrap">
                    {product.description !== ratingValue.toString() ? product.description : "Nutrisi laut premium yang bersumber secara berkelanjutan untuk hewan peliharaan Anda. Dirancang secara khusus untuk menawarkan keseimbangan protein dan asam lemak esensial yang optimal, mendukung gaya hidup sehat tanpa aditif buatan."}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Bahan</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Salmon Liar', 'Minyak Ikan', 'Omega-3 Alami', 'Vitamin E'].map(ingredient => (
                      <span key={ingredient} className="px-4 py-2 bg-[#D6E8F5] text-[#1B6CA8] text-sm font-bold rounded-full">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Left: Review Summary */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-serif text-[#1B6CA8]">Ulasan</h2>
                <button className="px-4 py-2 border border-[#1B6CA8] text-[#1B6CA8] font-semibold text-sm rounded-lg hover:bg-[#F0F4F8] transition-colors">
                  Tulis Ulasan
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-[#1B6CA8]">{ratingValue.toFixed(1)}</span>
                <div className="flex flex-col">
                  <span className="text-[#1B6CA8] font-medium text-sm">dari 5 bintang</span>
                  <span className="text-[#546E7A] text-sm">240 Ulasan</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="flex flex-col gap-2">
                {[
                  { stars: 5, pct: 80 },
                  { stars: 4, pct: 15 },
                  { stars: 3, pct: 5 },
                  { stars: 2, pct: 0 },
                  { stars: 1, pct: 0 },
                ].map(row => (
                  <div key={row.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-10">
                      <span className="text-sm font-medium text-[#546E7A]">{row.stars}</span>
                      <Star className="w-4 h-4 fill-[#FDB32A] text-[#FDB32A]" />
                    </div>
                    <div className="flex-1 h-2 bg-[#E0E6EB] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1B6CA8] rounded-full" style={{ width: `${row.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Review List */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
              {/* Review 1 */}
              <div className="bg-white border border-[#E0E6EB] rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F0F4F8] flex items-center justify-center text-[#1B6CA8] font-bold text-sm">
                      SJ
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A1A1A]">Sarah J.</span>
                      <div className="scale-75 origin-left mt-0.5">
                        <StarRating rating={5} />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#546E7A]">2 days ago</span>
                </div>
                <p className="text-[#414750]">
                  Kucing senior saya sangat menyukai cemilan ini. Cocok untuk kucing yang pemilih.
                </p>
              </div>

              {/* Review 2 */}
              <div className="bg-white border border-[#E0E6EB] rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F0F4F8] flex items-center justify-center text-[#1B6CA8] font-bold text-sm">
                      MR
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A1A1A]">Mark R.</span>
                      <div className="scale-75 origin-left mt-0.5">
                        <StarRating rating={5} />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#546E7A]">1 week ago</span>
                </div>
                <p className="text-[#414750]">
                  Bahan berkualitas tinggi dan kemasan bersih. Akan beli lagi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Anda Mungkin Juga Suka</h2>
            <Link href="/shop/products" className="flex items-center gap-2 font-bold text-[#1B6CA8] hover:text-[#124E7A] transition-colors text-sm md:text-base">
              Lihat Semua <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((p, index) => (
              <ProductCard
                key={index}
                image={p.image}
                name={p.name}
                price={p.price}
                description={p.description}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
