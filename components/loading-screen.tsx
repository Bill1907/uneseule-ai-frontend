"use client";

import React, { memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  text?: string;
  logoSize?: number;
  className?: string;
}

export const LoadingScreen = memo(function LoadingScreen({
  text = "Loading...",
  logoSize = 120,
  className,
}: LoadingScreenProps) {
  // Split text into individual characters for wave animation
  const characters = text.split("");

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm",
        className
      )}
    >
      {/* Logo */}
      <div className="relative mb-16">
        <div className="animate-pulse">
          <Image
            src="/images/uneseule_logo.png"
            alt="UneSeule Logo"
            width={logoSize}
            height={logoSize}
            priority
            className="drop-shadow-lg"
          />
        </div>
      </div>

      {/* Wave animated text */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="flex space-x-1">
          {characters.map((char, index) => (
            <span
              key={index}
              className="inline-block text-lg font-medium text-gray-600 animate-wave"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

// Export a simpler loading component for use in Suspense boundaries
export const LoadingSpinner = memo(function LoadingSpinner() {
  return <LoadingScreen text="Loading..." logoSize={80} />;
});

// Export a page loading component with custom text
export const PageLoadingScreen = memo(function PageLoadingScreen() {
  return (
    <LoadingScreen text="Preparing your learning journey..." logoSize={120} />
  );
});

