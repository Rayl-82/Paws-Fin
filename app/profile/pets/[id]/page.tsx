"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Save, Loader2, Check, Trash2, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EditPetProfile({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Unwrap params using React.use() to avoid Next.js sync params error
  const unwrappedParams = use(params);
  const petId = unwrappedParams.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    age: "",
    weight: "",
    activityLevel: "",
    healthCondition: "",
  });

  useEffect(() => {
    fetchPetData();
  }, [petId]);

  const fetchPetData = async () => {
    setIsLoading(true);
    try {
      if (petId === "guest") {
        const localData = localStorage.getItem("petProfileData");
        if (localData) {
          const parsed = JSON.parse(localData);
          setFormData({
            petName: parsed.name || "",
            species: parsed.species || "",
            age: parsed.dob ? (new Date().getFullYear() - new Date(parsed.dob).getFullYear()).toString() : "",
            weight: parsed.weight || "",
            activityLevel: parsed.activityLevel || "",
            healthCondition: parsed.primaryGoal || "",
          });
        } else {
          router.push("/shop/personalized");
        }
      } else {
        const res = await fetch(`/api/pets/${petId}`);
        if (res.ok) {
          const data = await res.json();
          const pet = data.data;
          if (pet) {
            setFormData({
              petName: pet.petName || "",
              species: pet.species || "",
              age: pet.age ? pet.age.toString() : "",
              weight: pet.weight ? pet.weight.toString() : "",
              activityLevel: pet.activityLevel || "",
              healthCondition: pet.healthCondition || "",
            });
            if (pet.imageUrl) {
              setPhotoPreview(pet.imageUrl);
            }
          } else {
            router.push("/profile");
          }
        } else {
          router.push("/profile");
        }
      }
    } catch (err) {
      console.error("Failed to load pet data", err);
      router.push(petId === "guest" ? "/shop/personalized" : "/profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          setPhotoPreview(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSaving(true);

    try {
      const payload = {
        petName: formData.petName,
        species: formData.species,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        activityLevel: formData.activityLevel,
        healthCondition: formData.healthCondition,
        imageUrl: photoPreview, // Save base64 image
      };

      if (petId === "guest") {
        const localPet = {
          name: payload.petName,
          species: payload.species,
          weight: payload.weight,
          activityLevel: payload.activityLevel,
          primaryGoal: payload.healthCondition,
        };
        localStorage.setItem("petProfileData", JSON.stringify(localPet));
        setSuccessMsg("Profil hewan peliharaan berhasil diperbarui!");
        setTimeout(() => router.push("/shop/personalized"), 1000);
      } else {
        const res = await fetch(`/api/pets/${petId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Gagal menyimpan perubahan");
        }

        setSuccessMsg("Profil hewan peliharaan berhasil diperbarui!");
        // Hilangkan autoredirect supaya user tetap di halaman ini
        router.refresh();
      }

    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan.");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDeletePet = async () => {
    setIsDeleting(true);
    try {
      if (petId === "guest") {
        localStorage.removeItem("petProfileData");
        localStorage.removeItem("hasPetProfile");
        router.push("/shop/personalized");
      } else {
        const res = await fetch(`/api/pets/${petId}`, { method: 'DELETE' });
        if (res.ok) {
          router.push("/profile");
        } else {
          setErrorMsg("Gagal menghapus profil hewan peliharaan.");
          setShowDeleteModal(false);
        }
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan sistem saat menghapus.");
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col">
        <Navbar />
        <main className="flex-1 w-full py-8 lg:py-16 max-w-3xl mx-auto px-4 flex flex-col justify-center items-center">
          <Loader2 className="w-8 h-8 text-[#1B6CA8] animate-spin" />
          <p className="text-[#546E7A] mt-4 font-semibold">Memuat data hewan peliharaan...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        
        <Link href={petId === "guest" ? "/shop/personalized" : "/profile"} className="inline-flex items-center gap-2 text-[#546E7A] hover:text-[#1B6CA8] transition-colors mb-6 font-bold text-sm">
          <ArrowLeft className="w-4 h-4" />
          {petId === "guest" ? "Kembali ke Rekomendasi" : "Kembali ke Profil"}
        </Link>

        <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Edit Hewan Peliharaan</h1>
            <p className="text-[#546E7A]">Perbarui informasi mengenai {formData.petName || 'hewan peliharaan Anda'}.</p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Photo Section */}
            <div className="flex flex-col items-center sm:items-start gap-4 pb-6 border-b border-[#F0F4F8]">
              <h3 className="font-bold text-[#1A1A1A]">Foto Profil</h3>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*"
              />
              <div className="flex items-center gap-6">
                <div 
                  className="w-24 h-24 bg-[#F0F4F8] rounded-full flex items-center justify-center border-2 border-dashed border-[#B0BEC5] overflow-hidden cursor-pointer relative"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <Image src={photoPreview} alt="Pet Preview" fill className="object-cover" />
                  ) : (
                    <Upload className="w-6 h-6 text-[#B0BEC5]" />
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-[#B0BEC5] text-[#546E7A] rounded-xl font-bold hover:bg-[#F0F4F8] hover:text-[#1A1A1A] transition-colors text-sm"
                  >
                    Ubah Foto
                  </button>
                  {photoPreview && (
                    <button 
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="px-4 py-2 border border-red-200 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-colors text-sm"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#F0F4F8]">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="font-semibold text-[#1A1A1A]">Nama Hewan</label>
                <input 
                  name="petName" value={formData.petName} onChange={handleChange}
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#1A1A1A]">Spesies</label>
                <div className="flex gap-4">
                  {["Dog", "Cat"].map(opt => (
                    <button 
                      type="button"
                      key={opt} onClick={() => handleSelect("species", opt)}
                      className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                        formData.species === opt ? "border-[#1B6CA8] bg-[#D6E8F5]/30 text-[#1B6CA8]" : "border-[#E0E7EF] text-[#546E7A] hover:border-[#B0BEC5]"
                      }`}
                    >
                      {opt === "Dog" ? "Anjing" : "Kucing"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#1A1A1A]">Umur (Tahun)</label>
                <input 
                  name="age" value={formData.age} onChange={handleChange}
                  type="number" min="0"
                  className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all" 
                />
              </div>
            </div>

            {/* Health Info */}
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#1A1A1A]">Berat Badan (kg)</label>
                <input 
                  name="weight" value={formData.weight} onChange={handleChange}
                  type="number" step="0.1" min="0"
                  className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#1A1A1A]">Tingkat Aktivitas</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "Rendah", label: "Rendah", desc: "Sering istirahat" },
                    { id: "Sedang", label: "Sedang", desc: "Jalan-jalan harian" },
                    { id: "Tinggi", label: "Tinggi", desc: "Sangat aktif" }
                  ].map(opt => (
                    <button 
                      type="button"
                      key={opt.id} onClick={() => handleSelect("activityLevel", opt.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        formData.activityLevel === opt.id ? "border-[#1B6CA8] bg-[#D6E8F5]/30" : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                      }`}
                    >
                      <span className={`font-bold ${formData.activityLevel === opt.id ? "text-[#1B6CA8]" : "text-[#1A1A1A]"}`}>{opt.label}</span>
                      <span className="text-xs text-[#546E7A] mt-1 text-center">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#1A1A1A]">Tujuan Kesehatan Utama</label>
                <div className="flex flex-col gap-3">
                  {[
                    "Manajemen Berat Badan",
                    "Kesehatan Kulit & Bulu",
                    "Dukungan Sendi",
                    "Kesehatan Pencernaan",
                    "Kesehatan Umum"
                  ].map(opt => (
                    <label 
                      key={opt} 
                      className={`flex items-center justify-between p-4 cursor-pointer rounded-xl border-2 transition-all ${
                        formData.healthCondition === opt ? "border-[#1B6CA8] bg-[#D6E8F5]/30" : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                      }`}
                      onClick={() => handleSelect("healthCondition", opt)}
                    >
                      <span className={`font-bold ${formData.healthCondition === opt ? "text-[#1B6CA8]" : "text-[#1A1A1A]"}`}>{opt}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.healthCondition === opt ? "border-[#1B6CA8] bg-[#1B6CA8]" : "border-[#B0BEC5]"
                      }`}>
                        {formData.healthCondition === opt && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F0F4F8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-4">
                <button 
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" /> Hapus Profil
                </button>
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl animate-in fade-in slide-in-from-bottom-2 w-full sm:w-auto">
                    {errorMsg}
                  </div>
                )}
                
                {successMsg && (
                  <div className="p-3 bg-green-50 border border-green-100 text-green-700 text-sm font-semibold rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 w-full sm:w-auto">
                    <Check className="w-4 h-4" />
                    {successMsg}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Link 
                  href={petId === "guest" ? "/shop/personalized" : "/profile"}
                  className="bg-white border border-[#B0BEC5] text-[#546E7A] hover:bg-[#F0F4F8] hover:text-[#1A1A1A] px-8 py-3 rounded-xl font-bold transition-colors flex items-center justify-center flex-shrink-0"
                >
                  Batal
                </Link>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#F26641] hover:bg-[#BF4A28] disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center flex-shrink-0"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" /> Simpan
                    </>
                  )}
                </button>
              </div>
            </div>
            
          </form>
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E7EF] w-full max-w-sm p-6 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#FDDDD5] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
              <AlertTriangle className="w-8 h-8 text-[#F26641]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2">Hapus Profil Hewan?</h3>
            <p className="text-[#546E7A] text-sm mb-6">
              Data yang sudah dihapus tidak bisa dikembalikan lagi. Rekomendasi nutrisi untuk {formData.petName || 'hewan ini'} juga akan hilang.
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold hover:bg-[#F0F4F8] transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmDeletePet}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl bg-[#F26641] hover:bg-[#BF4A28] disabled:opacity-50 text-white font-bold transition-colors shadow-sm flex justify-center items-center gap-2"
              >
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
