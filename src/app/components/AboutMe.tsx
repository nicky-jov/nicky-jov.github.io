"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/AboutMe.module.css';
import homeStyles from '../styles/Home.module.css';
import ScrollArrow from './ScrollArrow';
import { useTranslation } from '../contexts/LanguageContext';
import config from '../../../next.config';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="about" className={`${homeStyles.section} ${styles.aboutSection}`}>
      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.profileSection}>
          <div className={styles.imageContainer}>
            <div className={styles.telescopeFrame}>
              <Image
                src={`${config.basePath}/assets/img/profile-image.webp`}
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
              src={`${config.basePath}/assets/img/world-map.png`}
              alt="World Map"
              width={1200}
              height={600}
              className={styles.mapImage}
              priority
            />
          </div>
        </div>
        <div className={styles.textContent} data-aos="zoom-in-up">
          <h2 className={homeStyles.title}>{t('about.title')}</h2>
          <p className={styles.description}>
            {t('about.intro')} <span className={homeStyles.highlight}>{t('about.name')}</span>{t('about.location')}<br />
            {t('about.specialization')} <br />
            {t('about.experience')}
          </p>
        </div>
        <ScrollArrow targetId="projects" />
      </div>
    </section>
  );
};

export default AboutMe;