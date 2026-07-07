"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function SupplierApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#1A1A1A] flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 md:px-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-[#E0E6EB] p-8 md:p-12">
          
          <Link href="/suplier-portal" className="inline-flex items-center text-[#546E7A] hover:text-[#1B6CA8] transition-colors mb-8 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Supplier Portal
          </Link>

          {isSubmitted ? (
            <div className="flex flex-col items-center text-center py-12">
              <div className="w-20 h-20 bg-[#D6E8F5] text-[#1B6CA8] rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold font-serif text-[#1A1A1A] mb-4">Application Received!</h2>
              <p className="text-[#546E7A] text-lg mb-8 max-w-md">
                Thank you for your interest in partnering with Paws&Fin. Our sourcing team will review your details and get back to you within 2 business days.
              </p>
              <Link href="/" className="bg-[#1B6CA8] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#124E7A] transition-colors">
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#1A1A1A] mb-2">Partner Application</h1>
              <p className="text-[#546E7A] mb-10">Fill out the form below and our sourcing team will reach out to discuss potential partnerships.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A1A]">Company / Fishery Name *</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] outline-none transition-all" placeholder="Ocean Catch Co." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A1A]">Contact Person *</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A1A]">Email Address *</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] outline-none transition-all" placeholder="jane@oceancatch.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A1A]">Phone Number *</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] outline-none transition-all" placeholder="+62 812 3456 7890" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A1A]">Type of Material *</label>
                    <select required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] outline-none transition-all bg-white">
                      <option value="" disabled>Select material type...</option>
                      <option value="Fish Skin">Fish Skin</option>
                      <option value="Fish Frames / Bones">Fish Frames / Bones</option>
                      <option value="Fish Oil / Trimmings">Fish Oil / Trimmings</option>
                      <option value="Mixed / Other">Mixed / Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A1A]">Est. Volume / Month (kg) *</label>
                    <input required type="number" min="0" className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] outline-none transition-all" placeholder="e.g. 500" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1A1A1A]">Additional Notes</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-[#B0BEC5] focus:border-[#1B6CA8] focus:ring-1 focus:ring-[#1B6CA8] outline-none transition-all resize-none" placeholder="Tell us more about your supply capabilities, certifications, or location..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#F26641] hover:bg-[#BF4A28] text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-md hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
