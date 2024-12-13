"use client";

import React, { useEffect, useRef, useCallback, memo } from 'react';
import styles from '../styles/Home.module.css';

const StarsBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef(0);
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const updateLayers = useCallback(() => {
    layerRefs.current.forEach((layer, index) => {
      const strength = (index + 1) * 5;
      const scrollStrength = (index + 1) * 0.2;

      layer.style.transform = `translate3d(
        ${mousePosition.current.x * strength}px,
        ${mousePosition.current.y * strength - scrollPosition.current * scrollStrength}px,
        0
      )`;
    });
    animationFrameId.current = null;
  }, []);

  const requestUpdate = useCallback(() => {
    if (animationFrameId.current === null) {
      animationFrameId.current = requestAnimationFrame(updateLayers);
    }
  }, [updateLayers]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    mousePosition.current = {
      x: (clientX / innerWidth) * 2,
      y: (clientY / innerHeight) * 2,
    };
    requestUpdate();
  }, [requestUpdate]);

  const handleScroll = useCallback(() => {
    scrollPosition.current = window.scrollY;
    requestUpdate();
  }, [requestUpdate]);

  const layers = 3;
  const starsPerLayer = 90;

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleMouseMove, handleScroll]);

  const renderLayers = useCallback(() => {
    return Array.from({ length: layers }, (_, layer) => {
      const stars = Array.from({ length: starsPerLayer }, (_, i) => {
        const randomValue = Math.random();
        const sizeFactor = 2 - layer * 0.3;
        const size = 0.1 + randomValue * sizeFactor;
        const twinkleClass = randomValue > 0.5 ? styles.twinkle1 : styles.twinkle2;
        const randomLeft = Math.random() * 100;
        const randomTop = Math.random() * 130;

        return (
          <div
            key={`star-${layer}-${i}`}
            className={`${styles.star} ${twinkleClass}`}
            style={{
              left: `${randomLeft}%`,
              top: `${randomTop}%`,
              width: `${size}px`,
              height: `${size}px`,
              willChange: 'opacity, transform',
            }}
          />
        );
      });

      return (
        <div
          key={`layer-${layer}`}
          className={styles.starLayer}
          ref={(el) => {
            if (el) layerRefs.current[layer] = el;
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '200%',
          }}
        >
          {stars}
        </div>
      );
    });
  }, []);

  const renderShootingStars = useCallback(() => {
    const shootingStarCount = 10;

    return Array.from({ length: shootingStarCount }, (_, i) => (
      <div
        key={`shooting-star-${i}`}
        className={styles.shootingStar}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          boxShadow: `0 0 5px #fff,
                      -5px 0 8px #fff,
                      -10px 0 12px rgba(255,255,255,0.8),
                      -15px 0 15px rgba(255,255,255,0.6)`,
          width: '3px',
          height: '1px',
          opacity: 0.8,
          willChange: 'transform, opacity',
        }}
      />
    ));
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={styles.starsContainer}
        style={{ willChange: 'transform' }}
      >
        {renderLayers()}
        {renderShootingStars()}
      </div>
      <div className={styles.nebula} />
    </>
  );
};

export default memo(StarsBackground);