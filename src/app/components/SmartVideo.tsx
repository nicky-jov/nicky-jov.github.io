"use client";
import React, { useEffect, useRef, useState } from 'react';

interface SmartVideoProps {
  src: string;
  className?: string;
  type?: string;
}

const SmartVideo: React.FC<SmartVideoProps> = ({ src, className, type = "video/webm" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only render when the video is actually nearing the viewport
        // Unmount completely when it's far away to free up GPU/Decoder memory
        setShouldRender(entry.isIntersecting);
      },
      { 
        rootMargin: '200px', 
        threshold: 0.01 
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldRender]);

    return (
      <div 
        ref={containerRef} 
        className={className} 
        style={{ 
          willChange: 'transform', 
          contain: 'layout paint'
        }}
      >
        {shouldRender && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transform: 'translateZ(0)' 
            }}
          >
            <source src={src} type={type} />
          </video>
        )}
      </div>
    );
};

export default SmartVideo;

