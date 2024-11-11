"use client";

import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import StarsBackground from '../components/StarsBackground';
import Navbar from '../components/Navbar';
import AboutMe from '../components/AboutMe';
import ScrollArrow from '../components/ScrollArrow';

const HomePage: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolling(true);
      setTimeout(() => setScrolling(false), 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`${styles.container} ${scrolling ? styles.scrolling : ''}`}>
      <StarsBackground />
      <video autoPlay muted loop playsInline preload="auto"className={styles.blackHole}>
        <source src="/assets/vid/blackhole.webm" type="video/webm" />
      </video>
      <Navbar />
      <section className={styles.section} id="welcome">
        <div className={styles.welcomeContent}>
          <h1 className={styles.title}>
            Hi, I'm <span className={styles.highlight}>Nicky</span>
            <br />
            Software Developer
          </h1>
          <p className={styles.subtitle}>
            Let's begin our journey to the <span className={styles.highlight}>galaxies</span> together and build something amazing with modern technologies.
          </p>
          {mounted && <ScrollArrow targetId="about" />}
        </div>
      </section>
      <div style={{ height: '5rem' }} />
      <AboutMe />
    </div>
  );
};

export default HomePage;