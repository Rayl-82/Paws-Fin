"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  UserCircle, 
  Settings, 
  Bell, 
  MapPin, 
  CreditCard, 
  Package, 
  RefreshCw, 
  ChevronRight,
  Plus,
  PawPrint,
  Clock,
  Heart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock Data
const MOCK_USER = {
  name: "Sarah Jenkins",
  email: "sarah.j@example.com",
  photo: null,
};

const MOCK_PETS = [
  {
    id: "1",
    name: "Max",
    species: "Golden Retriever",
    age: "4 Years",
    image: "/images/product-salmon.png", // using placeholder
  },
  {
    id: "2",
    name: "Luna",
    species: "Maine Coon",
    age: "2 Years",
    image: "/images/sub-joint.png", // using placeholder
  }
];

const MOCK_SUBSCRIPTIONS = [
  {
    id: "1",
    name: "Joint & Mobility Box",
    status: "Active",
    nextBilling: "Aug 15, 2026",
  }
];

const MOCK_ORDERS = [
  {
    id: "ORD-12345",
    date: "July 1, 2026",
    total: 195000,
    status: "Delivered",
  },
  {
    id: "ORD-12346",
    date: "June 1, 2026",
    total: 150000,
    status: "Delivered",
  }
];

export default function ProfilePage() {
  // Toggles for demo purposes
  const [showEmptyPets, setShowEmptyPets] = useState(false);
  const [showEmptySubs, setShowEmptySubs] = useState(false);
  const [showEmptyOrders, setShowEmptyOrders] = useState(false);

  const activePets = showEmptyPets ? [] : MOCK_PETS;
  const activeSubs = showEmptySubs ? [] : MOCK_SUBSCRIPTIONS;
  const activeOrders = showEmptyOrders ? [] : MOCK_ORDERS;

  return (
    <>
      <Navbar />
      
      {/* Dev Demo Controls */}
      <div className="bg-[#D6E8F5] p-3 flex flex-wrap gap-4 justify-center text-sm font-semibold border-b border-[#1B6CA8]/20">
        <span className="text-[#1B6CA8] mr-2">Demo Toggles:</span>
        <label className="flex items-center gap-2 cursor-pointer text-[#124E7A]">
          <input type="checkbox" checked={showEmptyPets} onChange={() => setShowEmptyPets(!showEmptyPets)} className="rounded text-[#1B6CA8]" />
          Empty Pets
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-[#124E7A]">
          <input type="checkbox" checked={showEmptySubs} onChange={() => setShowEmptySubs(!showEmptySubs)} className="rounded text-[#1B6CA8]" />
          Empty Subs
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-[#124E7A]">
          <input type="checkbox" checked={showEmptyOrders} onChange={() => setShowEmptyOrders(!showEmptyOrders)} className="rounded text-[#1B6CA8]" />
          Empty Orders
        </label>
      </div>

      <main className="min-h-screen bg-[#F7F9FC] py-8 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-12">
          
          {/* HEADER SECTION */}
          <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1B6CA8]"></div>
            
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#F0F4F8] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white">
              {MOCK_USER.photo ? (
                <Image src={MOCK_USER.photo} alt={MOCK_USER.name} width={128} height={128} className="rounded-full object-cover" />
              ) : (
                <UserCircle className="w-12 h-12 text-[#B0BEC5]" />
              )}
            </div>

            <div className="flex-1 mt-2">
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A]">{MOCK_USER.name}</h1>
              <p className="text-[#546E7A] mt-1">{MOCK_USER.email}</p>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-2">
              <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold hover:bg-[#F0F4F8] hover:text-[#1A1A1A] transition-colors text-sm">
                Edit Profile
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold hover:bg-[#F0F4F8] hover:text-[#1A1A1A] transition-colors text-sm">
                Change Password
              </button>
            </div>
          </section>

          {/* MY PETS SECTION */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <PawPrint className="w-6 h-6 text-[#1B6CA8]" />
                My Pets
              </h2>
              {activePets.length > 0 && (
                <button className="hidden sm:flex items-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white px-4 py-2 rounded-xl font-bold transition-colors shadow-sm text-sm">
                  <Plus className="w-4 h-4" />
                  Add New Pet
                </button>
              )}
            </div>

            {activePets.length === 0 ? (
              <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">No Pets Added Yet</h3>
                <p className="text-[#546E7A] max-w-sm mb-6 text-sm">
                  Add your furry friend's profile to get personalized nutrition recommendations and tailored subscription boxes.
                </p>
                <button className="flex items-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm">
                  <Plus className="w-5 h-5" />
                  Add Your Pet
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePets.map(pet => (
                  <div key={pet.id} className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-5 flex flex-col items-center text-center relative">
                    <div className="w-20 h-20 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-4 overflow-hidden border border-[#E0E7EF]">
                      <span className="text-[#1B6CA8] text-xs font-bold px-2">Image</span>
                    </div>
                    <h3 className="font-serif font-bold text-[#1A1A1A] text-xl mb-1">{pet.name}</h3>
                    <p className="text-[#546E7A] text-sm mb-4">{pet.species} • {pet.age}</p>
                    
                    <div className="w-full flex flex-col gap-2 mt-auto">
                      <button className="w-full bg-[#1B6CA8] hover:bg-[#124E7A] text-white py-2 rounded-lg font-semibold transition-colors text-sm shadow-sm">
                        View Recommendations
                      </button>
                      <button className="w-full border border-[#B0BEC5] text-[#546E7A] hover:bg-[#F0F4F8] hover:text-[#1A1A1A] py-2 rounded-lg font-semibold transition-colors text-sm">
                        Edit Pet
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Mobile Add New Pet Button */}
                <button className="sm:hidden w-full flex items-center justify-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white py-4 rounded-xl font-bold transition-colors shadow-sm">
                  <Plus className="w-5 h-5" />
                  Add New Pet
                </button>
              </div>
            )}
          </section>

          <div className="h-px bg-[#E0E7EF] w-full"></div>

          {/* SUBSCRIPTIONS & ORDERS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* SUBSCRIPTIONS */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2 mb-6">
                <RefreshCw className="w-6 h-6 text-[#1B6CA8]" />
                Subscriptions
              </h2>

              {activeSubs.length === 0 ? (
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-8 text-center flex flex-col items-center h-full justify-center">
                  <div className="w-12 h-12 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-4">
                    <RefreshCw className="w-6 h-6 text-[#B0BEC5]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">No Active Subscriptions</h3>
                  <p className="text-[#546E7A] max-w-sm mb-6 text-sm">
                    Keep your pet healthy without the hassle. Subscribe to regular nutrition deliveries.
                  </p>
                  <Link href="/langganan" className="text-[#1B6CA8] font-bold hover:underline">
                    Explore Plans
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {activeSubs.map(sub => (
                    <div key={sub.id} className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-serif font-bold text-[#1A1A1A] text-lg">{sub.name}</h3>
                        <span className="bg-[#D6E8F5] text-[#1B6CA8] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {sub.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#546E7A] text-sm mb-5">
                        <Clock className="w-4 h-4" />
                        Next billing: <span className="font-medium text-[#1A1A1A]">{sub.nextBilling}</span>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 bg-white border border-[#B0BEC5] text-[#1A1A1A] py-2 rounded-lg font-semibold hover:bg-[#F0F4F8] transition-colors text-sm">
                          Manage
                        </button>
                        <button className="flex-1 bg-white border border-[#B0BEC5] text-[#546E7A] py-2 rounded-lg font-semibold hover:bg-[#F0F4F8] transition-colors text-sm">
                          Pause
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ORDER HISTORY */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2 mb-6">
                <Package className="w-6 h-6 text-[#1B6CA8]" />
                Order History
              </h2>

              {activeOrders.length === 0 ? (
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-8 text-center flex flex-col items-center h-full justify-center">
                  <div className="w-12 h-12 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-[#B0BEC5]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">No Past Orders</h3>
                  <p className="text-[#546E7A] max-w-sm mb-6 text-sm">
                    You haven't placed any orders yet. Discover premium nutrition in our shop.
                  </p>
                  <Link href="/shop" className="text-[#1B6CA8] font-bold hover:underline">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {activeOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-[#1A1A1A] mb-1">{order.id}</div>
                        <div className="text-sm text-[#546E7A]">{order.date}</div>
                        <div className="text-sm font-medium text-[#1A1A1A] mt-2">Rp {order.total.toLocaleString("id-ID")}</div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 w-full sm:w-auto">
                        <span className="text-[#546E7A] text-sm font-semibold">{order.status}</span>
                        <button className="text-[#1B6CA8] font-bold text-sm hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>

          <div className="h-px bg-[#E0E7EF] w-full"></div>

          {/* ACCOUNT SETTINGS */}
          <section className="pb-8">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2 mb-6">
              <Settings className="w-6 h-6 text-[#1B6CA8]" />
              Account Settings
            </h2>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#F0F4F8] hover:bg-[#F7F9FC] cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F0F4F8] group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
                    <Bell className="w-5 h-5 text-[#546E7A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">Notification Preferences</h3>
                    <p className="text-sm text-[#546E7A]">Manage email and SMS alerts</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B0BEC5]" />
              </div>

              <div className="flex items-center justify-between p-5 border-b border-[#F0F4F8] hover:bg-[#F7F9FC] cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F0F4F8] group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
                    <MapPin className="w-5 h-5 text-[#546E7A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">Shipping Addresses</h3>
                    <p className="text-sm text-[#546E7A]">Manage delivery locations</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B0BEC5]" />
              </div>

              <div className="flex items-center justify-between p-5 hover:bg-[#F7F9FC] cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F0F4F8] group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
                    <CreditCard className="w-5 h-5 text-[#546E7A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">Payment Methods</h3>
                    <p className="text-sm text-[#546E7A]">Manage saved cards and e-wallets</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B0BEC5]" />
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
