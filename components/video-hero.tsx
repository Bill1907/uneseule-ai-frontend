"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoHeroProps {
  videoSrc: string;
  videoSrcWebM?: string;
  fallbackSrc?: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
}

export default function VideoHero({
  videoSrc,
  videoSrcWebM,
  fallbackSrc,
  className,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for play/pause on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay might be blocked by browser
              console.log("Autoplay blocked");
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // If there's an error and we have a fallback, show it
  if (hasError && fallbackSrc) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <img
          src={fallbackSrc}
          alt="Hero visual"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover",
          isLoading && "opacity-0"
        )}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        autoPlay={false} // We'll control this with Intersection Observer
        onLoadedData={handleLoadedData}
        onError={handleError}
      >
        {/* WebM source first for better compression */}
        {videoSrcWebM && <source src={videoSrcWebM} type="video/webm" />}
        {/* MP4 fallback for broader compatibility */}
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play/pause indicator for debugging (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
          {isInView ? "Playing" : "Paused"}
        </div>
      )}
    </div>
  );
}