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
              <a href="#" className="w-10 h-10 rounded-full bg-[#0C3350] text-[#D6E8F5] flex items-center justify-center hover:bg-[#F26641] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0C3350] text-[#D6E8F5] flex items-center justify-center hover:bg-[#F26641] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0C3350] text-[#D6E8F5] flex items-center justify-center hover:bg-[#F26641] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
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
