"use client";

import React, { useEffect, useRef, useCallback, memo, useState } from 'react';
import styles from '../styles/Home.module.css';

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute float a_size;
  attribute vec3 a_color;
  varying vec3 v_color;
  void main() {
    gl_PointSize = a_size;
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_color = a_color;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec3 v_color;
  uniform float u_time;
  void main() {
    float twinkle = abs(sin(u_time + gl_FragCoord.x * 0.1 + gl_FragCoord.y * 0.1));
    gl_FragColor = vec4(v_color * twinkle, 1.0);
  }
`;

const StarsBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef(0);
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1920, height: 1080 });

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
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const aPosition = gl.getAttribLocation(program, 'a_position');
    const aSize = gl.getAttribLocation(program, 'a_size');
    const aColor = gl.getAttribLocation(program, 'a_color');
    const uTime = gl.getUniformLocation(program, 'u_time');

    const stars = [];
    const staticStarsCount = 1000;

    for (let i = 0; i < staticStarsCount; i++) {
      const randomValue = Math.random();
      const size = 0.5;
      const color = randomValue > 0.2 ? [1.0, 1.0, 1.0] : [0.8, 0.8, 1.0];
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      stars.push({ x, y, size, color });
    }

    const positions = new Float32Array(stars.length * 2);
    const sizes = new Float32Array(stars.length);
    const colors = new Float32Array(stars.length * 3);

    stars.forEach((star, i) => {
      positions[i * 2] = star.x;
      positions[i * 2 + 1] = star.y;
      sizes[i] = star.size;
      colors[i * 3] = star.color[0];
      colors[i * 3 + 1] = star.color[1];
      colors[i * 3 + 2] = star.color[2];
    });

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aSize);
    gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aColor);
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);

    const render = (time: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.POINTS, 0, stars.length);
      setTimeout(() => requestAnimationFrame(render), 1000 / 15); // 15 FPS
    };

    gl.clearColor(0.0, 0.0, 0.0, 0.8);
    render(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(sizeBuffer);
      gl.deleteBuffer(colorBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
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
              animationDuration: `${1 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 5}s`,
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
          animationDuration: `${15 + Math.random() * 2}s`,
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
        <canvas
          className={styles.starsCanvas}
          ref={canvasRef}
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      </div>
      <div className={styles.nebula} />
    </>
  );
};

export default memo(StarsBackground);