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
              Deeply Committed to Oceanic Integrity & Pet Vitality. We transform underutilized marine by-products into premium, personalized nutrition for your furry friends.
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
            <h4 className="font-bold text-lg text-white">Shop</h4>
            <ul className="flex flex-col gap-4 text-[#D6E8F5]">
              <li><Link href="#" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Subscription Box</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Treats & Chews</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Supplements</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-white">About</h4>
            <ul className="flex flex-col gap-4 text-[#D6E8F5]">
              <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustainability Impact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sourcing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-white">Support</h4>
            <ul className="flex flex-col gap-4 text-[#D6E8F5]">
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#0C3350] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#7AB3D4]">
          <p>© 2024 Paws&Fin. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
