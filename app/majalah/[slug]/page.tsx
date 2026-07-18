import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const getArticleData = (slug: string) => {
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    category: "Keberlanjutan",
    date: "5 Juli 2026",
    readTime: "6 menit baca",
    author: {
      name: "Dr. Sarah Jenkins",
      role: "Ahli Biologi Kelautan & Nutrisi Hewan",
      avatar: "/images/pawsnfinlogo.png"
    },
    image: "/images/featuredmainbanner.png",
    content: `
      <p>Industri makanan hewan sedang mengalami perubahan besar. Selama beberapa dekade, fokus utama tertuju pada protein dari peternakan—sapi, ayam, dan domba. Namun, kini ada jawaban yang lebih menjanjikan untuk hewan yang lebih sehat sekaligus planet yang lebih lestari: sumber daya dari lautan.</p>
      
      <h3>Potensi Tersembunyi dari By-Product Laut</h3>
      <p>Saat ikan diproses untuk konsumsi manusia, bagian yang tersisa bisa mencapai 50%—kepala, tulang, kulit, dan organ. "By-product" ini sering dibuang atau diproses menjadi bahan bernilai rendah. Padahal, kandungan nutrisinya sangat kaya: asam lemak Omega-3 (EPA dan DHA), kolagen, serta mineral esensial.</p>
      
      <p>Dengan mengolah by-product laut ini sebelum terbuang, kita bisa menciptakan nutrisi premium untuk hewan peliharaan. Proses ini disebut "upcycling", dan menjadi inti dari konsep ekonomi sirkular.</p>

      <blockquote>"Kami tidak sekadar membuat camilan hewan; kami secara aktif berkontribusi pada pengurangan limbah laut, mengubah yang dulunya terbuang menjadi suplemen kesehatan yang vital bagi hewan peliharaan kita."</blockquote>

      <h3>Mengapa Omega-3 Sangat Penting</h3>
      <p>Asam lemak Omega-3 sangat krusial untuk meredakan peradangan, mendukung fungsi kognitif, dan menjaga bulu tetap sehat. Berbeda dengan Omega-3 nabati (seperti biji rami), Omega-3 dari laut tidak perlu dikonversi oleh tubuh hewan, sehingga langsung terserap dan lebih efektif.</p>

      <ul>
        <li><strong>Kesehatan Sendi:</strong> Mengurangi peradangan pada hewan yang mulai menua.</li>
        <li><strong>Kulit & Bulu:</strong> Mengatasi kulit kering dan gatal, menjadikan bulu lembut dan berkilau.</li>
        <li><strong>Kesehatan Jantung:</strong> Mendukung fungsi kardiovaskular yang optimal.</li>
      </ul>

      <h3>Kebaikan untuk Lautan</h3>
      <p>Pendekatan ini tidak memerlukan aktivitas penangkapan ikan tambahan. Kami memaksimalkan hasil dari ikan yang sudah tertangkap, sehingga mengurangi tekanan pada stok ikan liar dan meminimalkan jejak lingkungan dari produksi makanan hewan.</p>

      <p>Lain kali saat Anda memberi camilan pada hewan peliharaan, pikirkanlah asal-usul bahan-bahannya. Dengan by-product laut yang berkelanjutan, Anda tidak hanya memanjakan anjing atau kucing—Anda juga memanjakan bumi kita.</p>
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
        <section className="w-full max-w-[800px] mx-auto px-4 md:px-8 pt-12 pb-6">
          <Link href="/majalah" className="inline-flex items-center gap-2 text-[#546E7A] hover:text-[#1B6CA8] transition-colors font-bold text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Pusat Edukasi
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
        <section className="w-full max-w-[800px] mx-auto px-4 md:px-8 mb-12">
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
        <section className="w-full max-w-[800px] mx-auto px-4 md:px-8 pb-16 lg:pb-24">
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
            <h2 className="text-3xl font-bold font-serif text-[#1A1A1A] mb-8">Produk Terkait Topik Ini</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { image: "/images/product1.png", name: "Wild Salmon Jerky", price: "$14.99", tags: ["Tinggi Omega-3"] },
                { image: "/images/product2.png", name: "Cod & Shrimp Bites", price: "$9.99", tags: ["Bebas Gandum"] },
                { image: "/images/product3.png", name: "Pure Salmon Oil", price: "$24.00", tags: ["Kulit & Bulu"] },
                { image: "/images/product4.png", name: "Atlantic Topper Mix", price: "$18.25", tags: ["Kesehatan Pencernaan"] },
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
