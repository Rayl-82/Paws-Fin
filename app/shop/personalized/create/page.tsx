"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, ChevronRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CreatePetProfile() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5; // 4 input steps + 1 review step

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    gender: "",
    dob: "",
    weight: "",
    activityLevel: "",
    bodyCondition: "",
    foodPreferences: "",
    allergies: "",
    specialNeeds: "",
    medicalNotes: "",
    lifestyle: "",
    primaryGoal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps + 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const completeProfile = async () => {
    try {
      const userRes = await fetch("/api/auth/me");
      const userData = await userRes.json();
      
      if (userData.authenticated) {
        // Save to DB
        await fetch("/api/pets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            petName: formData.name,
            species: formData.species,
            breed: "", // We didn't collect breed in the UI
            age: formData.dob ? new Date().getFullYear() - new Date(formData.dob).getFullYear() : 0,
            weight: formData.weight,
            activityLevel: formData.activityLevel,
            healthCondition: formData.primaryGoal
          })
        });
      } else {
        // Save to localStorage for guests
        localStorage.setItem("petProfileData", JSON.stringify(formData));
      }
      
      localStorage.setItem("hasPetProfile", "true");
      setStep(6); // Success State
    } catch (err) {
      console.error("Failed to complete profile", err);
      // Fallback
      localStorage.setItem("petProfileData", JSON.stringify(formData));
      localStorage.setItem("hasPetProfile", "true");
      setStep(6);
    }
  };

  // --- Step 1: Basic Information ---
  const Step1 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Basic Information</h2>
      <p className="text-[#546E7A] mb-8">Let's start with the basics about your furry friend.</p>
      
      <div className="space-y-6">
        {/* Photo Upload */}
        <div className="flex flex-col items-center sm:items-start gap-4 mb-8">
          <div className="w-24 h-24 bg-[#F0F4F8] rounded-full flex items-center justify-center border-2 border-dashed border-[#B0BEC5]">
            <Upload className="w-6 h-6 text-[#B0BEC5]" />
          </div>
          <button className="text-[#1B6CA8] font-bold text-sm hover:underline">
            Upload Pet Photo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="font-semibold text-[#1A1A1A]">Pet Name</label>
            <input 
              name="name" value={formData.name} onChange={handleChange}
              type="text" placeholder="e.g. Luna" 
              className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#1A1A1A]">Species</label>
            <div className="flex gap-4">
              {["Dog", "Cat"].map(opt => (
                <button 
                  key={opt} onClick={() => handleSelect("species", opt)}
                  className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                    formData.species === opt ? "border-[#1B6CA8] bg-[#D6E8F5]/30 text-[#1B6CA8]" : "border-[#E0E7EF] text-[#546E7A] hover:border-[#B0BEC5]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#1A1A1A]">Gender</label>
            <div className="flex gap-4">
              {["Male", "Female"].map(opt => (
                <button 
                  key={opt} onClick={() => handleSelect("gender", opt)}
                  className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                    formData.gender === opt ? "border-[#1B6CA8] bg-[#D6E8F5]/30 text-[#1B6CA8]" : "border-[#E0E7EF] text-[#546E7A] hover:border-[#B0BEC5]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="font-semibold text-[#1A1A1A]">Date of Birth</label>
            <input 
              name="dob" value={formData.dob} onChange={handleChange}
              type="date" 
              className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all text-[#1A1A1A]" 
            />
          </div>
        </div>
      </div>
    </div>
  );

  // --- Step 2: Physical Information ---
  const Step2 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Physical Information</h2>
      <p className="text-[#546E7A] mb-8">This helps us calculate exact nutritional portions.</p>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Current Weight (kg)</label>
          <input 
            name="weight" value={formData.weight} onChange={handleChange}
            type="number" placeholder="e.g. 4.5" step="0.1"
            className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Activity Level</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "Low", label: "Low", desc: "Mostly rests" },
              { id: "Moderate", label: "Moderate", desc: "Daily walks/play" },
              { id: "High", label: "High", desc: "Very active/working" }
            ].map(opt => (
              <button 
                key={opt.id} onClick={() => handleSelect("activityLevel", opt.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  formData.activityLevel === opt.id ? "border-[#1B6CA8] bg-[#D6E8F5]/30" : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                }`}
              >
                <span className={`font-bold ${formData.activityLevel === opt.id ? "text-[#1B6CA8]" : "text-[#1A1A1A]"}`}>{opt.label}</span>
                <span className="text-xs text-[#546E7A] mt-1">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Body Condition</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Underweight", "Ideal", "Overweight"].map(opt => (
              <button 
                key={opt} onClick={() => handleSelect("bodyCondition", opt)}
                className={`p-4 rounded-xl border-2 font-bold transition-all ${
                  formData.bodyCondition === opt ? "border-[#1B6CA8] bg-[#D6E8F5]/30 text-[#1B6CA8]" : "border-[#E0E7EF] text-[#546E7A] hover:border-[#B0BEC5]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- Step 3: Diet & Health ---
  const Step3 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Diet & Health</h2>
      <p className="text-[#546E7A] mb-8">Tell us about any specific dietary requirements.</p>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Food Preferences</label>
          <input 
            name="foodPreferences" value={formData.foodPreferences} onChange={handleChange}
            type="text" placeholder="e.g. Likes fish, dislikes chicken" 
            className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Known Allergies (Optional)</label>
          <input 
            name="allergies" value={formData.allergies} onChange={handleChange}
            type="text" placeholder="e.g. Grain, Beef" 
            className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Special Dietary Needs (Optional)</label>
          <input 
            name="specialNeeds" value={formData.specialNeeds} onChange={handleChange}
            type="text" placeholder="e.g. Sensitive stomach" 
            className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Medical Notes (Optional)</label>
          <textarea 
            name="medicalNotes" value={formData.medicalNotes} onChange={handleChange}
            placeholder="Any other health concerns we should know about?" rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:outline-none focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] transition-all placeholder-[#B0BEC5]" 
          />
        </div>
      </div>
    </div>
  );

  // --- Step 4: Lifestyle ---
  const Step4 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Lifestyle & Goals</h2>
      <p className="text-[#546E7A] mb-8">What are your primary goals for your pet's nutrition?</p>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Environment</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Indoor", "Outdoor", "Mixed"].map(opt => (
              <button 
                key={opt} onClick={() => handleSelect("lifestyle", opt)}
                className={`p-4 rounded-xl border-2 font-bold transition-all ${
                  formData.lifestyle === opt ? "border-[#1B6CA8] bg-[#D6E8F5]/30 text-[#1B6CA8]" : "border-[#E0E7EF] text-[#546E7A] hover:border-[#B0BEC5]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[#1A1A1A]">Primary Health Goal</label>
          <div className="flex flex-col gap-3">
            {[
              "Weight Management",
              "Healthy Coat & Skin",
              "Joint Support",
              "Digestive Health",
              "General Wellness"
            ].map(opt => (
              <label 
                key={opt} 
                className={`flex items-center justify-between p-4 cursor-pointer rounded-xl border-2 transition-all ${
                  formData.primaryGoal === opt ? "border-[#1B6CA8] bg-[#D6E8F5]/30" : "border-[#E0E7EF] hover:border-[#B0BEC5]"
                }`}
              >
                <span className={`font-bold ${formData.primaryGoal === opt ? "text-[#1B6CA8]" : "text-[#1A1A1A]"}`}>{opt}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  formData.primaryGoal === opt ? "border-[#1B6CA8] bg-[#1B6CA8]" : "border-[#B0BEC5]"
                }`}>
                  {formData.primaryGoal === opt && <Check className="w-4 h-4 text-white" />}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- Final Review ---
  const FinalReview = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Review Profile</h2>
      <p className="text-[#546E7A] mb-8">Please confirm the details below.</p>
      
      <div className="bg-white rounded-[16px] shadow-sm border border-[#E0E7EF] p-6 mb-8">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F0F4F8]">
          <div className="w-16 h-16 bg-[#D6E8F5] rounded-full flex items-center justify-center text-2xl border border-[#E0E7EF]">
            {formData.species === "Cat" ? "🐱" : formData.species === "Dog" ? "🐶" : "🐾"}
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">{formData.name || "Unnamed Pet"}</h3>
            <p className="text-[#546E7A] text-sm">{formData.species} • {formData.gender}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <div className="text-xs font-bold text-[#546E7A] uppercase tracking-wider mb-1">Physical</div>
            <div className="text-[#1A1A1A] font-medium">{formData.weight ? `${formData.weight} kg` : "-"} • {formData.bodyCondition || "-"}</div>
            <div className="text-[#546E7A] text-sm mt-0.5">{formData.activityLevel} Activity</div>
          </div>
          
          <div>
            <div className="text-xs font-bold text-[#546E7A] uppercase tracking-wider mb-1">Lifestyle & Goal</div>
            <div className="text-[#1A1A1A] font-medium">{formData.lifestyle || "-"} Environment</div>
            <div className="text-[#1B6CA8] font-bold text-sm mt-0.5">{formData.primaryGoal || "-"}</div>
          </div>

          <div className="sm:col-span-2">
            <div className="text-xs font-bold text-[#546E7A] uppercase tracking-wider mb-1">Dietary Notes</div>
            <div className="text-[#1A1A1A] font-medium text-sm">
              <span className="text-[#546E7A]">Preferences:</span> {formData.foodPreferences || "None specified"}
            </div>
            {(formData.allergies || formData.specialNeeds) && (
              <div className="text-[#1A1A1A] font-medium text-sm mt-1 flex flex-wrap gap-2">
                {formData.allergies && <span className="bg-[#FDDDD5] text-[#BF4A28] px-2 py-0.5 rounded text-xs font-bold">Allergies: {formData.allergies}</span>}
                {formData.specialNeeds && <span className="bg-[#D6E8F5] text-[#1B6CA8] px-2 py-0.5 rounded text-xs font-bold">Special: {formData.specialNeeds}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // --- Success State ---
  if (step === 6) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] font-sans flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-8 lg:p-12 text-center relative overflow-hidden animate-in zoom-in duration-500">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1B6CA8]"></div>
            
            <div className="w-20 h-20 bg-[#D6E8F5] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#1B6CA8]" />
            </div>

            <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-3">Your Pet Profile Is Ready!</h1>
            <p className="text-[#546E7A] text-lg mb-8">
              We are generating personalized nutrition, bundle, and subscription recommendations for {formData.name || "your pet"}.
            </p>

            <button 
              onClick={() => router.push('/shop/personalized')}
              className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-sm flex justify-center items-center gap-2 text-lg"
            >
              View Recommendations
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    );
  }

  // --- Main Render for Steps 1-5 ---
  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
        
        {/* Progress Header */}
        <div className="mb-8 lg:mb-12">
          <Link href="/shop/personalized" className="inline-flex items-center gap-2 text-[#546E7A] hover:text-[#1B6CA8] transition-colors mb-6 font-bold text-sm">
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </Link>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#1B6CA8] uppercase tracking-wider">
              {step === totalSteps ? "Final Review" : `Step ${step} of ${totalSteps - 1}`}
            </span>
          </div>
          
          <div className="w-full h-2 bg-[#E0E7EF] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1B6CA8] rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[24px] shadow-sm border border-[#E0E7EF] p-6 sm:p-8 lg:p-10 mb-8">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step === 5 && <FinalReview />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button 
              onClick={prevStep}
              className="px-6 py-3 rounded-xl border border-[#B0BEC5] text-[#546E7A] font-bold hover:bg-white transition-colors"
            >
              Back
            </button>
          ) : <div></div>}

          {step < totalSteps ? (
            <button 
              onClick={nextStep}
              className="bg-[#1B6CA8] hover:bg-[#124E7A] text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm flex items-center gap-2"
            >
              Next Step
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={completeProfile}
              className="bg-[#F26641] hover:bg-[#BF4A28] text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm flex items-center gap-2"
            >
              Create Pet Profile
              <CheckCircle2 className="w-5 h-5" />
            </button>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
