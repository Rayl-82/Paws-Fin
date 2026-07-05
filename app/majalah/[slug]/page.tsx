import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock data fetcher for the demo
const getArticleData = (slug: string) => {
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    category: "Sustainability",
    date: "July 5, 2026",
    readTime: "6 min read",
    author: {
      name: "Dr. Sarah Jenkins",
      role: "Marine Biologist & Pet Nutritionist",
      avatar: "/images/pawsnfinlogo.png"
    },
    image: "/images/featuredmainbanner.png",
    content: `
      <p>The pet food industry is undergoing a massive shift. For decades, the focus has been on standard agricultural proteins—beef, chicken, and lamb. But as we look toward a more sustainable future, the answer to both healthier pets and a healthier planet might just lie in the ocean.</p>
      
      <h3>The Hidden Potential of Marine By-Products</h3>
      <p>When fish are processed for human consumption, a significant portion—sometimes up to 50%—is left behind. These "by-products" (heads, frames, skin, and organs) are often discarded or processed into low-value meal. However, this material is incredibly rich in bioavailable nutrients, specifically Omega-3 fatty acids (EPA and DHA), collagen, and essential minerals.</p>
      
      <p>By capturing these pristine marine by-products before they are wasted, we can create premium pet nutrition. It's a process called "upcycling," and it sits at the heart of the circular economy.</p>

      <blockquote>"We aren't just making treats; we are actively participating in the reduction of marine waste, turning what was once discarded into a vital health supplement for our pets."</blockquote>

      <h3>Why Omega-3 Matters</h3>
      <p>Omega-3 fatty acids are crucial for reducing inflammation, supporting cognitive function, and maintaining a healthy coat. Unlike plant-based Omega-3s (like flaxseed), marine-based Omega-3s do not need to be converted by the pet's body, making them immediately usable and highly effective.</p>

      <ul>
        <li><strong>Joint Health:</strong> Reduces inflammation in aging pets.</li>
        <li><strong>Skin & Coat:</strong> Alleviates dry, itchy skin and creates a soft, shiny coat.</li>
        <li><strong>Heart Health:</strong> Supports cardiovascular function.</li>
      </ul>

      <h3>A Win for the Oceans</h3>
      <p>The beauty of this approach is that it requires zero additional fishing. We are maximizing the yield of what has already been caught, thereby reducing the strain on wild fish stocks and minimizing the environmental footprint of pet food production.</p>

      <p>Next time you treat your pet, consider where the ingredients come from. With sustainable marine by-products, you're not just rewarding your dog or cat—you're rewarding the planet.</p>
    `,
  };
};

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleData(resolvedParams.slug);

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="w-full flex flex-col items-center flex-grow bg-white">
        
        {/* BREADCRUMBS & META */}
        <section className="w-full max-w-[900px] mx-auto px-4 md:px-8 pt-12 pb-6">
          <Link href="/majalah" className="inline-flex items-center gap-2 text-[#546E7A] hover:text-[#1B6CA8] transition-colors font-bold text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Educational Center
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#1B6CA8] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {article.category}
            </span>
            <span className="text-[#546E7A] text-sm font-semibold">{article.date}</span>
            <span className="text-[#B0BEC5]">•</span>
            <span className="text-[#546E7A] text-sm font-semibold">{article.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold font-serif leading-tight mb-8 text-[#1A1A1A]">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-y border-[#E0E7EF] py-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F0F4F8] rounded-full overflow-hidden border border-[#E0E7EF]">
                <Image src={article.author.avatar} alt={article.author.name} width={48} height={48} className="object-cover" />
              </div>
              <div>
                <div className="font-bold text-[#1A1A1A]">{article.author.name}</div>
                <div className="text-[#546E7A] text-sm">{article.author.role}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full border border-[#E0E7EF] flex items-center justify-center text-[#546E7A] hover:bg-[#F0F4F8] hover:text-[#1B6CA8] transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#E0E7EF] flex items-center justify-center text-[#546E7A] hover:bg-[#FDDDD5] hover:text-[#BF4A28] hover:border-[#FDDDD5] transition-colors group">
                <Heart className="w-4 h-4 group-hover:fill-[#BF4A28]" />
              </button>
            </div>
          </div>
        </section>

        {/* FEATURED IMAGE */}
        <section className="w-full max-w-[1024px] mx-auto px-4 md:px-8 mb-12">
          <div className="w-full aspect-[21/9] relative rounded-2xl overflow-hidden shadow-sm bg-[#F0F4F8]">
            <Image 
              src={article.image} 
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="w-full max-w-[768px] mx-auto px-4 md:px-8 pb-16 lg:pb-24">
          <div 
            className="prose prose-lg prose-[#1A1A1A] max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#1A1A1A] 
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-[#484848] prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#1B6CA8] prose-a:font-semibold hover:prose-a:text-[#124E7A]
              prose-blockquote:border-l-4 prose-blockquote:border-[#F26641] prose-blockquote:bg-[#F7F9FC] prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:text-[#1B6CA8] prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:font-semibold prose-blockquote:not-italic
              prose-li:text-[#484848] prose-li:my-2
              prose-strong:text-[#1A1A1A]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </section>

        {/* RELATED PRODUCTS */}
        <section className="w-full bg-[#F7F9FC] py-16 lg:py-24 border-t border-[#E0E7EF]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl font-bold font-serif text-[#1A1A1A] mb-8">Products Related to This Topic</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { image: "/images/product1.png", name: "Wild Salmon Jerky", price: "$14.99", tags: ["High Omega-3"] },
                { image: "/images/product2.png", name: "Cod & Shrimp Bites", price: "$9.99", tags: ["Grain-Free"] },
                { image: "/images/product3.png", name: "Pure Salmon Oil", price: "$24.00", tags: ["Skin & Coat"] },
                { image: "/images/product4.png", name: "Atlantic Topper Mix", price: "$18.25", tags: ["Digestive Health"] },
              ].map((prod, idx) => (
                <ProductCard key={idx} image={prod.image} name={prod.name} price={prod.price} tags={prod.tags} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
