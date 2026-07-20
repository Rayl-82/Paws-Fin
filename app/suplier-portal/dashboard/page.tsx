"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Package, Leaf, ShoppingBag, TreePine, 
  Plus, Search, Filter, MoreVertical, CheckCircle2,
  TrendingUp, TrendingDown, ArrowRight, X
} from "lucide-react";

export default function PartnerDashboardDesktop() {
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [inventory, setInventory] = useState([
    { id: 'kulit_ikan', name: 'Kulit Ikan', emoji: '🐟', stock: 60, status: 'Tersedia' },
    { id: 'tulang_ikan', name: 'Tulang Ikan', emoji: '🦴', stock: 45, status: 'Tersedia' },
    { id: 'kepala_ikan', name: 'Kepala Ikan', emoji: '🐠', stock: 30, status: 'Tersedia' },
  ]);

  const [newStockCategory, setNewStockCategory] = useState('');
  const [newStockAmount, setNewStockAmount] = useState('');
  const [newStockStatus, setNewStockStatus] = useState('Tersedia');

  const handleAddStock = () => {
    if (!newStockCategory || !newStockAmount) return;
    
    const amount = parseInt(newStockAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    const existingIndex = inventory.findIndex(item => item.id === newStockCategory);
    
    if (existingIndex >= 0) {
      const updated = [...inventory];
      updated[existingIndex].stock += amount;
      updated[existingIndex].status = newStockStatus;
      setInventory(updated);
    } else {
      let emoji = '📦';
      let name = newStockCategory;
      if (newStockCategory === 'kulit_ikan') { emoji = '🐟'; name = 'Kulit Ikan'; }
      if (newStockCategory === 'tulang_ikan') { emoji = '🦴'; name = 'Tulang Ikan'; }
      if (newStockCategory === 'kepala_ikan') { emoji = '🐠'; name = 'Kepala Ikan'; }
      if (newStockCategory === 'jeroan') { emoji = '🫀'; name = 'Jeroan Ikan'; }
      
      setInventory([...inventory, {
        id: newStockCategory,
        name,
        emoji,
        stock: amount,
        status: newStockStatus
      }]);
    }
    
    setNewStockCategory('');
    setNewStockAmount('');
    setNewStockStatus('Tersedia');
    setIsAddStockOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full pb-16">
        
        {/* Header Section */}
        <section className="bg-white border-b border-[#E0E7EF] py-8">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#1A1A1A]">
                  UD Laut Sehat
                </h1>
                <span className="bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 size={14} />
                  Verified Partner
                </span>
              </div>
              <p className="text-[#546E7A] text-lg">Industri Perikanan • Dashboard Overview</p>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto mt-2 md:mt-0">
              <select className="bg-[#F0F4F8] border-none text-[#1A1A1A] font-semibold py-2.5 md:py-3 px-3 md:px-5 rounded-xl cursor-pointer focus:ring-2 focus:ring-[#1B6CA8] transition-all flex-1 md:flex-none text-xs md:text-base">
                <option>Bulan Ini (Mei 2025)</option>
                <option>Bulan Lalu (Apr 2025)</option>
                <option>Tahun Ini</option>
              </select>
              <button onClick={() => setIsAddStockOpen(true)} className="bg-[#F26641] hover:bg-[#BF4A28] text-white font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap text-sm md:text-base">
                <Plus size={18} className="md:w-[20px] md:h-[20px]" />
                Tambah Stok
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            
            {/* Stat 1 */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E7EF] hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#E8F1F8] text-[#1B6CA8] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs md:text-sm font-bold text-green-600 bg-green-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg shrink-0">
                  <TrendingUp size={12} className="md:w-3.5 md:h-3.5" /> +15%
                </span>
              </div>
              <div>
                <p className="text-[#546E7A] text-xs md:text-sm font-semibold mb-0.5 md:mb-1">Limbah Dikirim</p>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1A1A]">245</h3>
                  <span className="text-[#546E7A] font-semibold text-xs md:text-base">kg</span>
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E7EF] hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Leaf className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs md:text-sm font-bold text-green-600 bg-green-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg shrink-0">
                  <TrendingUp size={12} className="md:w-3.5 md:h-3.5" /> +12%
                </span>
              </div>
              <div>
                <p className="text-[#546E7A] text-xs md:text-sm font-semibold mb-0.5 md:mb-1">Pendapatan</p>
                <div className="flex items-baseline gap-0.5 md:gap-1">
                  <span className="text-[#546E7A] font-semibold text-xs md:text-base">Rp</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1A1A]">4.25M</h3>
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E7EF] hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#FFF0E6] text-[#E65100] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs md:text-sm font-bold text-green-600 bg-green-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg shrink-0">
                  <TrendingUp size={12} className="md:w-3.5 md:h-3.5" /> +3
                </span>
              </div>
              <div>
                <p className="text-[#546E7A] text-xs md:text-sm font-semibold mb-0.5 md:mb-1">Pesanan</p>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1A1A]">18</h3>
                  <span className="text-[#546E7A] font-semibold text-[10px] md:text-sm">Aktif</span>
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-[#E0E7EF] hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3 md:mb-4 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#E3F2FD] text-[#1565C0] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TreePine className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              <div>
                <p className="text-[#546E7A] text-xs md:text-sm font-semibold mb-0.5 md:mb-1 relative z-10">CO₂ Dihematkan</p>
                <div className="flex items-baseline gap-1 md:gap-2 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1A1A]">78</h3>
                  <span className="text-[#546E7A] font-semibold text-xs md:text-base">kg</span>
                </div>
              </div>
              
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <TreePine size={80} className="md:w-[100px] md:h-[100px] text-[#1565C0] translate-x-4 translate-y-4" />
              </div>
            </div>
            
          </div>
        </section>

        {/* Main Content Layout */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Recent Requests (Takes 8/12 space) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Promo Banner */}
              <div className="bg-gradient-to-r from-[#0C3350] to-[#1B6CA8] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="relative z-10 max-w-xl">
                  <h2 className="text-2xl font-serif font-bold mb-2">Terus berkontribusi untuk laut yang lebih baik!</h2>
                  <p className="text-blue-100 text-lg">Setiap hasil samping yang Anda kirim membantu menciptakan produk premium dan berkelanjutan untuk hewan peliharaan.</p>
                </div>
                <div className="relative z-10 hidden md:block text-5xl">
                  🌍🐾
                </div>
              </div>

              {/* Table / List of Requests */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E0E7EF] overflow-hidden">
                <div className="p-6 border-b border-[#E0E7EF] flex items-center justify-between">
                  <h2 className="text-xl font-bold font-serif text-[#1A1A1A]">Permintaan Terbaru dari UMKM</h2>
                  <div className="flex items-center gap-3">
                    <button className="text-[#546E7A] hover:text-[#1B6CA8] p-2 bg-[#F0F4F8] rounded-lg transition-colors">
                      <Filter size={18} />
                    </button>
                    <button className="text-[#546E7A] hover:text-[#1B6CA8] p-2 bg-[#F0F4F8] rounded-lg transition-colors">
                      <Search size={18} />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8F9FB] text-[#546E7A] text-sm font-semibold uppercase tracking-wider border-b border-[#E0E7EF]">
                        <th className="px-6 py-4">UMKM</th>
                        <th className="px-6 py-4">Produk Diminta</th>
                        <th className="px-6 py-4">Jumlah</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E7EF]">
                      
                      {/* Row 1 */}
                      <tr className="hover:bg-[#F8F9FB] transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">PT</div>
                            <div>
                              <p className="font-bold text-[#1A1A1A]">Paws Treats</p>
                              <p className="text-xs text-[#546E7A]">12 Mei 2025</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-semibold text-[#1A1A1A]">Kulit Ikan</td>
                        <td className="px-6 py-5 font-bold text-[#1B6CA8]">20 kg</td>
                        <td className="px-6 py-5">
                          <span className="bg-[#FFF0E6] text-[#E65100] px-3 py-1 rounded-full text-xs font-bold border border-[#FFE0CC] whitespace-nowrap inline-block">Menunggu Konfirmasi</span>
                        </td>
                        <td className="px-6 py-5">
                          <button className="text-[#1B6CA8] hover:text-[#0C3350] font-bold text-sm bg-blue-50 px-4 py-2 rounded-lg transition-colors">Tinjau</button>
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-[#F8F9FB] transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0">PD</div>
                            <div>
                              <p className="font-bold text-[#1A1A1A]">PetDelish ID</p>
                              <p className="text-xs text-[#546E7A]">10 Mei 2025</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-semibold text-[#1A1A1A]">Tulang Ikan</td>
                        <td className="px-6 py-5 font-bold text-[#1B6CA8]">15 kg</td>
                        <td className="px-6 py-5">
                          <span className="bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-xs font-bold border border-[#C8E6C9] whitespace-nowrap inline-block">Disetujui</span>
                        </td>
                        <td className="px-6 py-5">
                          <button className="text-[#546E7A] hover:text-[#1A1A1A] p-2 transition-colors"><MoreVertical size={20} /></button>
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-[#F8F9FB] transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0">HP</div>
                            <div>
                              <p className="font-bold text-[#1A1A1A]">Happy Paws</p>
                              <p className="text-xs text-[#546E7A]">8 Mei 2025</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-semibold text-[#1A1A1A]">Kepala Ikan</td>
                        <td className="px-6 py-5 font-bold text-[#1B6CA8]">10 kg</td>
                        <td className="px-6 py-5">
                          <span className="bg-[#E3F2FD] text-[#1565C0] px-3 py-1 rounded-full text-xs font-bold border border-[#BBDEFB] whitespace-nowrap inline-block">Dikirim</span>
                        </td>
                        <td className="px-6 py-5">
                          <button className="text-[#546E7A] hover:text-[#1A1A1A] p-2 transition-colors"><MoreVertical size={20} /></button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-[#E0E7EF] text-center">
                  <Link href="#" className="text-[#1B6CA8] font-bold text-sm hover:underline flex items-center justify-center gap-2">
                    Lihat Semua Permintaan <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Inventory (Takes 4/12 space) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-[#E0E7EF] p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold font-serif text-[#1A1A1A]">Inventory Hari Ini</h2>
                </div>

                <div className="flex flex-col gap-4">
                  
                  {/* Dynamic Inventory List */}
                  {inventory.map((item) => (
                    <div key={item.id} className="bg-[#F8F9FB] rounded-xl p-4 border border-[#E0E7EF] flex items-center justify-between hover:border-[#1B6CA8] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">{item.emoji}</div>
                        <div>
                          <h4 className="font-bold text-[#1A1A1A]">{item.name}</h4>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.status === 'Tersedia' ? 'text-[#2E7D32] bg-[#E8F5E9]' : 'text-[#C62828] bg-[#FFEBEE]'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#1B6CA8]">{item.stock}<span className="text-sm text-[#546E7A] ml-1">kg</span></p>
                      </div>
                    </div>
                  ))}

                  {/* Add Stock Button */}
                  <button 
                    onClick={() => setIsAddStockOpen(true)}
                    className="w-full mt-2 bg-white border-2 border-dashed border-[#B0BEC5] hover:border-[#1B6CA8] text-[#1B6CA8] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all hover:bg-[#F0F4F8] group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E8F1F8] flex items-center justify-center group-hover:bg-[#1B6CA8] group-hover:text-white transition-colors">
                      <Plus size={24} />
                    </div>
                    <span className="font-bold text-sm text-[#546E7A] group-hover:text-[#1B6CA8] transition-colors">Tambah Kategori / Stok Baru</span>
                  </button>

                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      
      <Footer />

      {/* Add Stock Modal */}
      {isAddStockOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[#E0E7EF] flex justify-between items-center bg-[#F8F9FB]">
              <h3 className="font-bold font-serif text-xl text-[#1A1A1A]">Tambah Stok Baru</h3>
              <button onClick={() => setIsAddStockOpen(false)} className="text-[#546E7A] hover:text-[#1A1A1A] transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-[#1A1A1A]">Kategori Hasil Samping</label>
                  <select 
                    value={newStockCategory}
                    onChange={(e) => setNewStockCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8]"
                  >
                    <option value="">Pilih Kategori...</option>
                    <option value="kulit_ikan">Kulit Ikan</option>
                    <option value="tulang_ikan">Tulang Ikan</option>
                    <option value="kepala_ikan">Kepala Ikan</option>
                    <option value="jeroan">Jeroan Ikan</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-[#1A1A1A]">Jumlah Stok Tambahan (kg)</label>
                  <input 
                    type="number" 
                    value={newStockAmount}
                    onChange={(e) => setNewStockAmount(e.target.value)}
                    placeholder="Contoh: 50" 
                    className="px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8]" 
                  />
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <label className="font-semibold text-sm text-[#1A1A1A]">Status Akhir</label>
                  <select 
                    value={newStockStatus}
                    onChange={(e) => setNewStockStatus(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8]"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Habis">Habis</option>
                  </select>
                </div>
                <button 
                  type="button" 
                  onClick={handleAddStock}
                  className="w-full bg-[#1B6CA8] hover:bg-[#124E7A] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm mt-2 disabled:bg-[#B0BEC5] disabled:cursor-not-allowed"
                  disabled={!newStockCategory || !newStockAmount}
                >
                  Simpan Stok
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
