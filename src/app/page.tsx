import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/app/styles/Home.module.css';
import Image from 'next/image';
import config from '../../next.config';
import CustomCursor from './components/CustomCursor';
import SmartVideo from './components/SmartVideo';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import StarsBackground from './components/StarsBackground';

const AboutMe = dynamic(() => import('./components/AboutMe'), { ssr: true });
const Projects = dynamic(() => import('./components/Projects'), { ssr: true });
const Skills = dynamic(() => import('./components/Skills'), { ssr: true });
const Contact = dynamic(() => import('./components/Contact'), { ssr: true });

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <CustomCursor />
      <StarsBackground />
      <SmartVideo 
        src={`${config.basePath}/assets/vid/blackhole.webm`} 
        className={styles.blackHole} 
      />
      <Navbar />

      <div className={styles.hero}>
        <Welcome />
      </div>

      <Suspense fallback={<div style={{ height: '100vh' }} />}>
        <AboutMe />
      </Suspense>

      <SmartVideo 
        src={`${config.basePath}/assets/vid/galaxy.webm`} 
        className={styles.galaxy} 
      />

      <Suspense fallback={<div style={{ height: '100vh' }} />}>
        <Projects />
      </Suspense>

      <div style={{ height: '50px' }} />

      <SmartVideo 
        src={`${config.basePath}/assets/vid/earth.webm`} 
        className={styles.earth} 
      />

      <Suspense fallback={<div style={{ height: '100vh' }} />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<div style={{ height: '100vh' }} />}>
        <Contact />
      </Suspense>

      <Image
        src={`${config.basePath}/assets/img/mars-surface.webp`}
        alt='Mars'
        className={styles.mars}
        width={1920}
        height={800}
        loading="lazy"
        priority={false}
      />
    </div>
  );
};

export default HomePage;