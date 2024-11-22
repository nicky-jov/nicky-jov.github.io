"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.css';
import cursorStyles from '../styles/Cursor.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import StarsBackground from '../components/StarsBackground';
import Welcome from '../components/Welcome';
import Navbar from '../components/Navbar';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import config from '../../../next.config';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  const blackHoleRef = useRef<HTMLVideoElement>(null);
  const galaxyRef = useRef<HTMLVideoElement>(null);
  const earthRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  };

  const handleScroll = () => {
    const videos = [blackHoleRef, galaxyRef, earthRef];

    videos.forEach((videoRef) => {
      if (!videoRef.current || typeof window === 'undefined') return;

      const video = videoRef.current;
      const rect = video.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      const isInView = rect.top <= viewHeight && rect.bottom >= 0;

      if (isInView) {
        video.play();
      } else if (!video.paused) {
        video.pause();
      }
    });
  };

  useEffect(() => {
    const initAOS = async () => {
      AOS.init({
        offset: 200,
        duration: 1000,
        once: false,
        mirror: true
      });
    };

    setMounted(true);
    initAOS();

    const videos = [galaxyRef, earthRef];
    videos.forEach((videoRef) => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div ref={cursorRef} className={cursorStyles.customCursor} />
      <StarsBackground />
      <video
        ref={blackHoleRef}
        autoPlay muted loop playsInline preload="none"
        className={styles.blackHole}
      >
        <source src={`${config.basePath}/assets/vid/blackhole.webm`} type="video/webm" />
      </video>
      <Navbar />
      <div data-aos="zoom-in-up">
        <Welcome mounted={mounted}/>
      </div>
      <div data-aos="zoom-in-up">
        <AboutMe />
      </div>
      <video
        ref={galaxyRef}
        autoPlay muted loop playsInline preload="none"
        className={styles.galaxy}
      >
        <source src={`${config.basePath}/assets/vid/galaxy.webm`} type="video/webm" />
      </video>
      <div data-aos="zoom-in-up">
        <Projects />
      </div>
      <div style={{ height: '50px' }} />
      <video
        ref={earthRef}
        autoPlay muted loop playsInline preload="none"
        className={styles.earth}
      >
        <source src={`${config.basePath}/assets/vid/earth.webm`} type="video/webm" />
      </video>
      <div data-aos="zoom-in-up">
        <Skills />
      </div>
      <div data-aos="zoom-in-up">
        <Contact />
      </div>
      <Image src={`${config.basePath}/assets/img/mars-surface.jpg`} alt='Mars' className={styles.mars} width={1920} height={800} />
    </div>
  );
};

export default HomePage;