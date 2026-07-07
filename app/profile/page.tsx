"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Heart,
  LogOut,
  Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock Pets removed, we fetch from DB now.

const MOCK_SUBSCRIPTIONS = [
  {
    id: "1",
    name: "Joint & Mobility Box",
    status: "Active",
    nextBilling: "Aug 15, 2026",
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      // Fetch user profile
      const userRes = await fetch("/api/auth/me");
      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData.authenticated) {
          setUser(userData.user);
        } else {
          router.push("/auth");
          return;
        }
      } else {
        router.push("/auth");
        return;
      }

      // Fetch order history
      const ordersRes = await fetch("/api/orders");
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.data || []);
      }

      // Fetch pets
      const petsRes = await fetch("/api/pets");
      if (petsRes.ok) {
        const petsData = await petsRes.json();
        setPets(petsData.data || []);
      }
    } catch (err) {
      console.error("Failed to load profile data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const activePets = pets;
  const activeSubs = MOCK_SUBSCRIPTIONS;
  const activeOrders = orders;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-[#1B6CA8]">
          <Loader2 className="w-12 h-12 animate-spin" />
        </main>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      


      <main className="min-h-screen bg-[#F7F9FC] py-8 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 lg:gap-12">
          
          {/* HEADER SECTION */}
          <section className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1B6CA8]"></div>
            
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#F0F4F8] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-4 border-white">
              <UserCircle className="w-12 h-12 text-[#B0BEC5]" />
            </div>

            <div className="flex-1 mt-2">
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A1A1A]">{user.name}</h1>
              <p className="text-[#546E7A] mt-1">{user.email}</p>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-2">
              <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold hover:bg-[#F0F4F8] hover:text-[#1A1A1A] transition-colors text-sm">
                Edit Profil
              </button>
              <button onClick={handleLogout} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors text-sm">
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          </section>

          {/* MY PETS SECTION */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <PawPrint className="w-6 h-6 text-[#1B6CA8]" />
                Hewan Peliharaan Saya
              </h2>
              {activePets.length > 0 && (
                <Link href="/shop/personalized/create" className="hidden sm:flex items-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white px-4 py-2 rounded-xl font-bold transition-colors shadow-sm text-sm">
                  <Plus className="w-4 h-4" />
                  Tambah Hewan Peliharaan
                </Link>
              )}
            </div>

            {activePets.length === 0 ? (
              <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-[#1B6CA8]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">Belum Ada Hewan Peliharaan</h3>
                <p className="text-[#546E7A] max-w-sm mb-6 text-sm">
                  Tambahkan profil teman berbulu Anda untuk mendapatkan rekomendasi nutrisi yang dipersonalisasi dan kotak langganan yang disesuaikan.
                </p>
                <Link href="/shop/personalized/create" className="flex items-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm">
                  <Plus className="w-5 h-5" />
                  Tambah Hewan Peliharaan Anda
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePets.map(pet => (
                  <div key={pet.id} className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-5 flex flex-col items-center text-center relative">
                    <div className="w-20 h-20 bg-[#D6E8F5] rounded-full flex items-center justify-center mb-4 overflow-hidden border border-[#E0E7EF]">
                      <span className="text-[#1B6CA8] text-xs font-bold px-2">Gambar</span>
                    </div>
                    <h3 className="font-serif font-bold text-[#1A1A1A] text-xl mb-1">{pet.petName}</h3>
                    <p className="text-[#546E7A] text-sm mb-4">{pet.species} • {pet.age ? `${pet.age} Tahun` : 'Umur tidak diketahui'}</p>
                    
                    <div className="w-full flex flex-col gap-2 mt-auto">
                      <Link href="/shop/personalized" className="w-full bg-[#1B6CA8] hover:bg-[#124E7A] text-white py-2 rounded-lg font-semibold transition-colors text-sm shadow-sm inline-flex justify-center">
                        Lihat Rekomendasi
                      </Link>
                      <button className="w-full border border-[#B0BEC5] text-[#546E7A] hover:bg-[#F0F4F8] hover:text-[#1A1A1A] py-2 rounded-lg font-semibold transition-colors text-sm">
                        Edit Hewan Peliharaan
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Mobile Add New Pet Button */}
                <Link href="/shop/personalized/create" className="sm:hidden w-full flex items-center justify-center gap-2 bg-[#F26641] hover:bg-[#BF4A28] text-white py-4 rounded-xl font-bold transition-colors shadow-sm">
                  <Plus className="w-5 h-5" />
                  Tambah Hewan Peliharaan
                </Link>
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
                Langganan
              </h2>

              {activeSubs.length === 0 ? (
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-8 text-center flex flex-col items-center h-full justify-center">
                  <div className="w-12 h-12 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-4">
                    <RefreshCw className="w-6 h-6 text-[#B0BEC5]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">Tidak Ada Langganan Aktif</h3>
                  <p className="text-[#546E7A] max-w-sm mb-6 text-sm">
                    Jaga kesehatan hewan peliharaan Anda tanpa repot. Berlangganan pengiriman nutrisi reguler.
                  </p>
                  <Link href="/langganan" className="text-[#1B6CA8] font-bold hover:underline">
                    Jelajahi Paket
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
                        Tagihan berikutnya: <span className="font-medium text-[#1A1A1A]">{sub.nextBilling}</span>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 bg-white border border-[#B0BEC5] text-[#1A1A1A] py-2 rounded-lg font-semibold hover:bg-[#F0F4F8] transition-colors text-sm">
                          Kelola
                        </button>
                        <button className="flex-1 bg-white border border-[#B0BEC5] text-[#546E7A] py-2 rounded-lg font-semibold hover:bg-[#F0F4F8] transition-colors text-sm">
                          Jeda
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
                Riwayat Pesanan
              </h2>

              {activeOrders.length === 0 ? (
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-8 text-center flex flex-col items-center h-full justify-center">
                  <div className="w-12 h-12 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-[#B0BEC5]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">Belum Ada Pesanan</h3>
                  <p className="text-[#546E7A] max-w-sm mb-6 text-sm">
                    Anda belum melakukan pemesanan. Temukan nutrisi premium di toko kami.
                  </p>
                  <Link href="/shop" className="text-[#1B6CA8] font-bold hover:underline">
                    Mulai Belanja
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {activeOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-[#1A1A1A] mb-1">
                          <span className="text-[#1B6CA8]">ID:</span> {order.id.slice(0, 8).toUpperCase()}...
                        </div>
                        <div className="text-sm text-[#546E7A]">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                        <div className="text-sm font-medium text-[#1A1A1A] mt-2">Rp {order.totalPrice.toLocaleString("id-ID")}</div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 w-full sm:w-auto">
                        <span className="bg-[#D6E8F5] text-[#1B6CA8] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{order.status}</span>
                          <button className="text-sm text-[#1B6CA8] font-semibold hover:underline transition-colors">
                            Lihat Detail
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
              Pengaturan Akun
            </h2>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-[#F0F4F8] hover:bg-[#F7F9FC] cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F0F4F8] group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
                    <Bell className="w-5 h-5 text-[#546E7A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">Preferensi Notifikasi</h3>
                    <p className="text-sm text-[#546E7A]">Kelola pemberitahuan email dan SMS</p>
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
                    <h3 className="font-bold text-[#1A1A1A]">Alamat Pengiriman</h3>
                    <p className="text-sm text-[#546E7A]">Kelola lokasi pengiriman</p>
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
                    <h3 className="font-bold text-[#1A1A1A]">Metode Pembayaran</h3>
                    <p className="text-sm text-[#546E7A]">Kelola kartu dan e-wallet yang tersimpan</p>
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
