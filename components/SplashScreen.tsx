"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    // Progress bar animation
    const duration = 1500; // 1.5 seconds loading
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsFadingOut(true);
        sessionStorage.setItem("hasSeenSplash", "true");
        
        // Remove from DOM after fade out completes
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // 500ms fade out duration
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#F7F9FC] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center max-w-md w-full px-6">
        {/* Logo Container */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-8 relative animate-pulse">
           <Image
            src="/images/pawsnfinlogo.png"
            alt="Paws&Fin Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Tagline */}
        <h2 className="text-[#0C3350] font-serif font-bold text-xl sm:text-2xl mb-2 text-center tracking-tight">
          Paws & Fin
        </h2>
        <p className="text-[#546E7A] text-sm sm:text-base font-medium tracking-widest uppercase mb-12 text-center">
          Sustainable Marine Nutrition
        </p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-[240px] h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
          {/* Animated Gradient Progress */}
          <div
            className="h-full bg-gradient-to-r from-[#F26641] via-[#7AB3D4] to-[#1B6CA8] rounded-full transition-all ease-out"
            style={{ 
              width: `${progress}%`,
              transitionDuration: "20ms" 
            }}
          />
        </div>
      </div>
    </div>
  );
}
