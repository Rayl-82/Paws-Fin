import Link from "next/link";
import { CheckCircle2, Package, Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock Data
const MOCK_ITEMS = [
  {
    id: "1",
    name: "Salmon Skin Crisps",
    quantity: 2,
    type: "product"
  },
  {
    id: "2",
    name: "Joint & Mobility Box",
    quantity: 1,
    type: "subscription"
  }
];

export default function CheckoutSuccessPage() {
  const orderNumber = "PF-" + Math.floor(100000 + Math.random() * 900000);
  
  // Fake date 3 days from now
  const estDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F7F9FC] py-12 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-12 text-center relative overflow-hidden">
          
          {/* Decorative Top Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#1B6CA8]"></div>

          <div className="w-20 h-20 bg-[#D6E8F5] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#1B6CA8]" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A] mb-3">Order Confirmed!</h1>
          <p className="text-[#546E7A] text-lg mb-8 max-w-md mx-auto">
            Thank you for your purchase. We've received your order and are getting it ready.
          </p>

          <div className="bg-[#F0F4F8] rounded-xl p-6 text-left mb-8 border border-[#E0E7EF]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <Package className="w-5 h-5 text-[#1B6CA8]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#546E7A] uppercase tracking-wider mb-1">Order Number</div>
                  <div className="font-bold text-[#1A1A1A]">{orderNumber}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#1B6CA8]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#546E7A] uppercase tracking-wider mb-1">Estimated Delivery</div>
                  <div className="font-bold text-[#1A1A1A]">{estDeliveryDate}</div>
                </div>
              </div>

            </div>

            <div className="h-px w-full bg-[#D6E8F5] my-6"></div>

            <div>
              <div className="text-xs font-bold text-[#546E7A] uppercase tracking-wider mb-3">Purchased Items</div>
              <ul className="space-y-3">
                {MOCK_ITEMS.map(item => (
                  <li key={item.id} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-[#1A1A1A]">
                      {item.quantity}x {item.name} 
                      {item.type === "subscription" && <span className="text-[#1B6CA8] ml-2 text-xs font-bold bg-[#D6E8F5] px-2 py-0.5 rounded-full">Sub</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link 
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm text-lg"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
