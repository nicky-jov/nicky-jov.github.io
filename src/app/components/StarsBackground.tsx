"use client"

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

const StarsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const layers = 2;
    const starsPerLayer = 100;
    const shootingStarCount = 10;

    container.innerHTML = '';

    for (let layer = 0; layer < layers; layer++) {
      const layerContainer = document.createElement('div');
      layerContainer.className = styles.starLayer;

      layerContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        transition: transform 0.2s ease-out;
      `;

      for (let i = 0; i < starsPerLayer; i++) {
        const star = document.createElement('div');
        const size = 0.1 + Math.random() * (2 - layer * 0.3);

        star.className = `${styles.star} ${Math.random() > 0.5 ? styles.twinkle1 : styles.twinkle2}`;

        star.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          background: rgb(${255 - Math.random() * 30}, ${255 - Math.random() * 30}, ${255});
          animation-delay: ${Math.random() * 2}s;
        `;

        layerContainer.appendChild(star);
      }

      container.appendChild(layerContainer);
    }

    // Shooting stars
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
      `;

      container.appendChild(shootingStar);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const layers = containerRef.current.getElementsByClassName(styles.starLayer);
    Array.from(layers).forEach((layer, index) => {
      const strength = (index + 1) * 10;
      const scrollStrength = (index + 1) * 0.1;

      (layer as HTMLElement).style.transform = `
        translate(
          ${mousePosition.x * strength}px,
          ${mousePosition.y * strength - scrollPosition * scrollStrength}px
        )
      `;
    });
  }, [mousePosition, scrollPosition]);

  return (
    <>
      <div ref={containerRef} className={styles.starsContainer} />
      <div className={styles.nebula} />
    </>
  );
};

export default StarsBackground;