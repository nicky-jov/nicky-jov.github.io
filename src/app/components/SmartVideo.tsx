"use client";

import React, { useEffect, useRef } from 'react';

interface SmartVideoProps {
  src: string;
  className?: string;
  type?: string;
}

const SmartVideo: React.FC<SmartVideoProps> = ({ src, className, type = "video/webm" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Handle autoplay restrictions
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    >
      <source src={src} type={type} />
    </video>
  );
};

export default SmartVideo;
