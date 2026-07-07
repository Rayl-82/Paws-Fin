import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#124E7A] text-white pt-16 pb-8 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-3xl font-bold text-white tracking-tight">Paws&Fin</h3>
            <p className="text-[#D6E8F5] leading-relaxed max-w-sm">
              Berkomitmen pada Integritas Laut & Vitalitas Hewan Peliharaan. Kami mengubah produk sampingan perikanan menjadi nutrisi premium dan personal untuk hewan peliharaan Anda.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-[#0C3350] font-bold text-sm flex items-center justify-center hover:bg-[#F26641] transition-colors">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0C3350] font-bold text-sm flex items-center justify-center hover:bg-[#F26641] transition-colors">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0C3350] font-bold text-sm flex items-center justify-center hover:bg-[#F26641] transition-colors">
                TW
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-white">Belanja</h4>
            <ul className="flex flex-col gap-4 text-[#D6E8F5]">
              <li><Link href="#" className="hover:text-white transition-colors">Semua Produk</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kotak Langganan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cemilan & Kunyahan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Suplemen</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-white">Tentang</h4>
            <ul className="flex flex-col gap-4 text-[#D6E8F5]">
              <li><Link href="#" className="hover:text-white transition-colors">Cerita Kami</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dampak Keberlanjutan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sumber Bahan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Karir</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-white">Bantuan</h4>
            <ul className="flex flex-col gap-4 text-[#D6E8F5]">
              <li><Link href="#" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pengiriman & Pengembalian</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Lacak Pesanan</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#0C3350] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#7AB3D4]">
          <p>© 2024 Paws&Fin. Hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Ketentuan Layanan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
