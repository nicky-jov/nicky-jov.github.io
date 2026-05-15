"use client";

import React, { useEffect, useRef, memo, useMemo, useCallback } from 'react';
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
    float twinkle = abs(sin(u_time * 1.5 + gl_FragCoord.x * 0.05 + gl_FragCoord.y * 0.05));
    gl_FragColor = vec4(v_color * (0.5 + 0.5 * twinkle), 1.0);
  }
`;

const FALLING_STAR_COUNT = 1;

const StarsBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef(0);

  const starsData = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const isBlue = Math.random() > 0.85;
      stars.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        size: 0.3 + Math.random() * 1.2,
        color: isBlue ? [0.7, 0.8, 1.0] : [0.95, 0.95, 1.0],
      });
    }
    return stars;
  }, []);

  const { layerStars, shootingStars, fallingStars } = useMemo(() => {
    const layers = [];
    for (let l = 0; l < 3; l++) {
      const layerStars = [];
      for (let i = 0; i < 80; i++) {
        const randomValue = Math.random();
        layerStars.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 130}%`,
          size: 0.5 + randomValue * (2.5 - l * 0.4),
          twinkle: randomValue > 0.5 ? styles.twinkle1 : styles.twinkle2,
          duration: `${1.5 + Math.random() * 2}s`,
          delay: `${Math.random() * 5}s`,
        });
      }
      layers.push(layerStars);
    }

    const shooting = Array.from({ length: 2 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${8 + Math.random() * 4}s`,
      delay: `${Math.random() * 12}s`,
    }));

    const falling = Array.from({ length: FALLING_STAR_COUNT }, (_, i) => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 60 + 20}%`,
      duration: `${3 + Math.random() * 2}s`,
      delay: `${i * 2.5 + Math.random() * 2}s`,
      angle: 25 + Math.random() * 10,
    }));

    return { layerStars: layers, shootingStars: shooting, fallingStars: falling };
  }, []);

  const updateLayers = useCallback(() => {
    const len = layerRefs.current.length;
    for (let i = 0; i < len; i++) {
      const layer = layerRefs.current[i];
      if (!layer) continue;
      const strength = (i + 1) * 20;
      const scrollStrength = (i + 1) * 0.2;
      layer.style.transform = `translate3d(${mousePos.current.x * strength}px, ${mousePos.current.y * strength - scrollPos.current * scrollStrength}px, 0)`;
    }
  }, []);

  const handleMouseMove = useCallback((e: { clientX: number; clientY: number }) => {
    const { innerWidth, innerHeight } = window;
    mousePos.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: (e.clientY / innerHeight) * 2 - 1,
    };
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        updateLayers();
        animationFrameRef.current = 0;
      });
    }
  }, [updateLayers]);

  const handleScroll = useCallback(() => {
    scrollPos.current = window.scrollY;
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        updateLayers();
        animationFrameRef.current = 0;
      });
    }
  }, [updateLayers]);

  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    onResize();
    window.addEventListener('resize', onResize, { passive: true });

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;
    glRef.current = gl;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertexShaderSource);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragmentShaderSource);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positions = new Float32Array(starsData.length * 2);
    const sizes = new Float32Array(starsData.length);
    const colors = new Float32Array(starsData.length * 3);

    starsData.forEach((star, i) => {
      positions[i * 2] = star.x;
      positions[i * 2 + 1] = star.y;
      sizes[i] = star.size;
      colors[i * 3] = star.color[0];
      colors[i * 3 + 1] = star.color[1];
      colors[i * 3 + 2] = star.color[2];
    });

    const createBuffer = (data: Float32Array, size: number) => {
      const buf = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, size === 2 ? 'a_position' : size === 1 ? 'a_size' : 'a_color');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return buf;
    };

    createBuffer(positions, 2);
    createBuffer(sizes, 1);
    createBuffer(colors, 3);

    const uTime = gl.getUniformLocation(program, 'u_time');
    gl.clearColor(0, 0, 0, 0);

    let running = true;
    const render = (time: number) => {
      if (!running) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.POINTS, 0, starsData.length);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      running = false;
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [starsData, handleMouseMove, handleScroll]);

    return (
      <>
        <div className={styles.starsContainer}>
          {layerStars.map((layer, l) => (
            <div
              key={l}
              ref={(el) => { layerRefs.current[l] = el; }}
              className={styles.starLayer}
            >
              {layer.map((star, i) => (
                <div
                  key={i}
                  className={`${styles.star} ${star.twinkle}`}
                  style={{
                    left: star.left,
                    top: star.top,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    animationDuration: star.duration,
                    animationDelay: star.delay,
                  }}
                />
              ))}
            </div>
          ))}
          {shootingStars.map((star, i) => (
            <div
              key={i}
              className={styles.shootingStar}
              style={{
                left: star.left,
                top: star.top,
                animationDuration: star.duration,
                animationDelay: star.delay,
              }}
            />
          ))}
          {fallingStars.map((star, i) => (
            <div
              key={i}
              className={styles.fallingStar}
              style={{
                left: star.left,
                top: star.top,
                animationDuration: star.duration,
                animationDelay: star.delay,
                '--angle': `${star.angle}deg`,
              } as React.CSSProperties}
            />
          ))}
          <canvas ref={canvasRef} className={styles.starsCanvas} />
        </div>
        <div className={styles.nebula} />
      </>
    );
});

StarsBackground.displayName = 'StarsBackground';

export default StarsBackground;