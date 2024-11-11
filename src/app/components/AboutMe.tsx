"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/AboutMe.module.css';
import homeStyles from '../styles/Home.module.css';
import ScrollArrow from './ScrollArrow';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.profileSection}>
          <div className={styles.imageContainer}>
            <div className={styles.telescopeFrame}>
              <Image
                src="/assets/img/profile-image.jpg"
                alt="Profile Picture"
                width={300}
                height={300}
                className={styles.profileImage}
                priority
              />
              <div className={styles.telescopeLine}></div>
            </div>
          </div>
          <div className={styles.mapContainer}>
            <Image
              src="/assets/img/world-map.png"
              alt="World Map"
              width={1200}
              height={600}
              className={styles.mapImage}
              priority
            />
          </div>
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.description}>
            Hi, I'm <span className={homeStyles.highlight}>Nicky Jovanus</span>. A passionate Software Developer based in <span className={homeStyles.highlight}>Indonesia</span>. <br />
            I specialize in developing exceptional digital experiences. <br/>
            With several years of experience in web and game development, I am always eager to learn new technologies
            and create innovative solutions.
          </p>
        </div>
        <ScrollArrow targetId="target-section-id" />
      </div>
    </section>
  );
};

export default AboutMe;