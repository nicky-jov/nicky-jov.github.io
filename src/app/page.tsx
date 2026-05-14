import React, { Suspense } from 'react';
import styles from '@/app/styles/Home.module.css';
import Image from 'next/image';
import config from '../../next.config';
import CustomCursor from './components/CustomCursor';
import SmartVideo from './components/SmartVideo';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import StarsBackground from './components/StarsBackground';

const AboutMe = React.lazy(() => import('./components/AboutMe'));
const Projects = React.lazy(() => import('./components/Projects'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));

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
      <div>
        <Welcome />
      </div>
      <div data-aos="zoom-in-up">
        <Suspense fallback={<></>}>
          <AboutMe />
        </Suspense>
      </div>
      <SmartVideo 
        src={`${config.basePath}/assets/vid/galaxy.webm`} 
        className={styles.galaxy} 
      />
      <div data-aos="zoom-in-up">
        <Suspense fallback={<></>}>
          <Projects />
        </Suspense>
      </div>
      <div style={{ height: '50px' }} />
      <SmartVideo 
        src={`${config.basePath}/assets/vid/earth.webm`} 
        className={styles.earth} 
      />
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