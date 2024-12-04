"use client"

import { useEffect, useRef, useCallback } from 'react';
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
        x: (clientX / innerWidth) * 2,
        y: (clientY / innerHeight) * 2
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
      const strength = (index + 1) * 5;
      const scrollStrength = (index + 1) * 0.5;

      // Use translate3d for GPU acceleration
      layer.style.transform = `translate3d(
        ${mousePosition.current.x * strength}px,
        ${mousePosition.current.y * strength - scrollPosition.current * scrollStrength}px,
        0
      )`;
    });
  }, []);

  const layers = 3;
  const starsPerLayer = 30;

  // Initial setup
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const fragment = document.createDocumentFragment();

    const layerContainers: HTMLDivElement[] = [];

    for (let layer = 0; layer < layers; layer++) {
      const layerContainer = document.createElement('div');
      layerContainer.className = styles.starLayer;
      const layerStyle = layerContainer.style;

      layerStyle.position = 'absolute';
      layerStyle.width = '100%';
      layerStyle.height = '200%';

      const sizeFactor = 2 - layer * 0.3;
      const starsFragment = document.createDocumentFragment();

      for (let i = 0; i < starsPerLayer; i++) {
        const star = document.createElement('div');
        const starStyle = star.style;
        const randomValue = Math.random();

        const size = 0.1 + randomValue * sizeFactor;
        const twinkleClass = randomValue > 0.5 ? styles.twinkle1 : styles.twinkle2;
        const randomLeft = Math.random() * 100;
        const randomTop = Math.random() * 130;

        star.className = `${styles.star} ${twinkleClass}`;

        starStyle.left = `${randomLeft}%`;
        starStyle.top = `${randomTop}%`;
        starStyle.width = `${size}px`;
        starStyle.height = `${size}px`;
        starStyle.willChange = 'opacity, transform';

        starsFragment.appendChild(star);
      }

      layerContainer.appendChild(starsFragment);
      fragment.appendChild(layerContainer);
      layerContainers.push(layerContainer);
    }

    container.innerHTML = '';
    container.appendChild(fragment);
    layerRefs.current = layerContainers;

    const shootingStarCount = 5;

    // Create shooting stars
    const shootingStarsFragment = document.createDocumentFragment();
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = styles.shootingStar;

      shootingStar.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 5px #fff,
                    -5px 0 8px #fff,
                    -10px 0 12px rgba(255,255,255,0.8),
                    -15px 0 15px rgba(255,255,255,0.6);
        width: 3px;
        height: 1px;
        opacity: 0.8;
        will-change: transform, opacity;
      `;

      shootingStarsFragment.appendChild(shootingStar);
    }

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