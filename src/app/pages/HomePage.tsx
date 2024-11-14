"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.css';
import { useTranslation } from '../contexts/LanguageContext';
import StarsBackground from '../components/StarsBackground';
import Navbar from '../components/Navbar';
import AboutMe from '../components/AboutMe';
import ScrollArrow from '../components/ScrollArrow';
import Projects from '../components/Projects';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  const blackHoleRef = useRef<HTMLVideoElement>(null);
  const galaxyRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolling(true);
      setTimeout(() => setScrolling(false), 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => { });
            console.log('play');
          } else {
            video.pause();
            console.log('pause');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (blackHoleRef.current) observer.observe(blackHoleRef.current);
    if (galaxyRef.current) observer.observe(galaxyRef.current);

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`${styles.container} ${scrolling ? styles.scrolling : ''}`}>
      <StarsBackground />
      <video
        ref={blackHoleRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className={styles.blackHole}
      >
        <source src="/assets/vid/blackhole.webm" type="video/webm" />
      </video>
      <Navbar />
      <section className={styles.section} id="welcome">
        <div className={styles.welcomeContent}>
          <h1 className={styles.title}>
            {t('welcome.greeting')} <span className={styles.highlight}>{t('welcome.name')}</span>
            <br />
            {t('welcome.role')}
          </h1>
          <p className={styles.subtitle}>
            {t('welcome.subtitle')} <span className={styles.highlight}>{t('welcome.highlight')}</span> {t('welcome.cta')} 🚀
          </p>
          {mounted && <ScrollArrow targetId="about" />}
        </div>
      </section>
      <AboutMe />
      <div style={{ height: '15rem' }} />
      <video
        ref={galaxyRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className={styles.galaxy}
      >
        <source src="/assets/vid/galaxy.webm" type="video/webm" />
      </video>
      <Projects />
      <div style={{ height: '15rem' }} />
    </div>
  );
};

export default HomePage;