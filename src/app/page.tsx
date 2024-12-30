"use server";

import React, { Suspense } from 'react';
import styles from '@/app/styles/Home.module.css';
import Image from 'next/image';
import config from '../../next.config';
import CustomCursor from './components/CustomCursor';

const Welcome = React.lazy(() => import('./components/Welcome'));
const Navbar = React.lazy(() => import('./components/Navbar'));
const AboutMe = React.lazy(() => import('./components/AboutMe'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));
const StarsBackground = React.lazy(() => import('./components/StarsBackground'));

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <CustomCursor />
      <Suspense fallback={<></>}>
        <StarsBackground />
      </Suspense>
      <video
        autoPlay muted loop playsInline preload="none"
        className={styles.blackHole}
      >
        <source src={`${config.basePath}/assets/vid/blackhole.webm`} type="video/webm" />
      </video>
      <Suspense fallback={<></>}>
        <Navbar />
      </Suspense>
      <div>
        <Welcome />
      </div>
      <div data-aos="zoom-in-up">
        <Suspense fallback={<></>}>
          <AboutMe />
        </Suspense>
      </div>
      <video
        autoPlay muted loop playsInline preload="none"
        className={styles.galaxy}
      >
        <source src={`${config.basePath}/assets/vid/galaxy.webm`} type="video/webm" />
      </video>
      <div data-aos="zoom-in-up">
        <Suspense fallback={<></>}>
          <Projects />
        </Suspense>
      </div>
      <div style={{ height: '50px' }} />
      <video
        autoPlay muted loop playsInline preload="none"
        className={styles.earth}
      >
        <source src={`${config.basePath}/assets/vid/earth.webm`} type="video/webm" />
      </video>
      <div data-aos="zoom-in-up">
        <Suspense fallback={<></>}>
          <Skills />
        </Suspense>
      </div>
      <div data-aos="zoom-in-up">
        <Suspense fallback={<></>}>
          <Contact />
        </Suspense>
      </div>
      <Suspense fallback={<></>}>
        <Image
          src={`${config.basePath}/assets/img/mars-surface.webp`}
          alt='Mars'
          className={styles.mars}
          width={1920}
          height={800}
          loading="lazy"
        />
      </Suspense>
    </div>
  );
};

export default HomePage;