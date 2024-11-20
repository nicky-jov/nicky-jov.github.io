"use client"

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '../styles/Home.module.css';

const StarsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef(0);
  const layerRefs = useRef<HTMLDivElement[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mousePosition.current = {
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2
      };
      updateLayers();
    });
  }, []);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      scrollPosition.current = window.scrollY;
      updateLayers();
    });
  }, []);

  // Update layer positions
  const updateLayers = useCallback(() => {
    layerRefs.current.forEach((layer, index) => {
      // Reduce strength multipliers
      const strength = (index + 1) * 5; // Reduced from 10
      const scrollStrength = (index + 1) * 0.05; // Reduced from 0.1

      // Use translate3d for GPU acceleration
      layer.style.transform = `translate3d(
        ${mousePosition.current.x * strength}px,
        ${mousePosition.current.y * strength - scrollPosition.current * scrollStrength}px,
        0
      )`;
    });
  }, []);

  // Initial setup
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const layers = 3;
    const starsPerLayer = 50;
    const shootingStarCount = 5;

    const fragment = document.createDocumentFragment();

    // Create layers
    for (let layer = 0; layer < layers; layer++) {
      const layerContainer = document.createElement('div');
      layerContainer.className = styles.starLayer;
      layerContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        transform: translate3d(0, 0, 0);
        will-change: transform;
        backface-visibility: hidden;
      `;

      // Create stars
      const starsFragment = document.createDocumentFragment();
      for (let i = 0; i < starsPerLayer; i++) {
        const star = document.createElement('div');
        const size = 0.1 + Math.random() * (2 - layer * 0.3);

        star.className = `${styles.star} ${Math.random() > 0.5 ? styles.twinkle1 : styles.twinkle2}`;
        star.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 300}%;
          width: ${size}px;
          height: ${size}px;
          background: rgb(${255 - Math.random() * 30}, ${255 - Math.random() * 30}, ${255});
          animation-delay: ${Math.random() * 2}s;
          will-change: opacity, transform;
        `;

        starsFragment.appendChild(star);
      }
      layerContainer.appendChild(starsFragment);
      fragment.appendChild(layerContainer);
      layerRefs.current.push(layerContainer);
    }

    // Create shooting stars
    const shootingStarsFragment = document.createDocumentFragment();
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = styles.shootingStar;
      const rotation = Math.random() * 45;

      shootingStar.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        transform: rotate(${rotation}deg);
        box-shadow: 0 0 5px #fff,
                    -5px 0 8px #fff,
                    -10px 0 12px rgba(255,255,255,0.8),
                    -15px 0 15px rgba(255,255,255,0.6);
        width: 3px;
        height: 1px;
        opacity: 0.8;
        background: linear-gradient(90deg, #fff, transparent);
        will-change: transform, opacity;
      `;

      shootingStarsFragment.appendChild(shootingStar);
    }

    container.innerHTML = '';
    container.appendChild(fragment);
    container.appendChild(shootingStarsFragment);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <>
      <div 
        ref={containerRef} 
        className={styles.starsContainer}
        style={{ willChange: 'transform' }}
      />
      <div className={styles.nebula} />
    </>
  );
};

export default StarsBackground;