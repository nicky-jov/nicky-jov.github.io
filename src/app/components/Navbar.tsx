"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useTranslation } from '../contexts/LanguageContext';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const { language, setLanguage } = useTranslation();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.leftSection}>
        <Link
          href="/"
          className={styles.logo}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg
            className={styles.logoSvg}
            viewBox="0 0 100 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={styles.logoPath}
              d="M10 50V10h5l20 30V10h5v40h-5L15 20v30h-5z"
            />
            <path
              className={styles.logoPath}
              d="M60 10h15v30c0 10-8 12-15 12s-15-2-15-12v-5h5v5c0 5 5 7 10 7s10-2 10-7V10z"
            />
          </svg>
        </Link>
      </div>

      <div className={styles.centerSection}>
        <div className={styles.navLinks}>
          <Link href="#about">{t('navbar.about')}</Link>
          <Link href="#projects">{t('navbar.projects')}</Link>
          <Link href="#skills">{t('navbar.skills')}</Link>
          <Link href="#contact">{t('navbar.contact')}</Link>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.languageWrapper}>
          <FontAwesomeIcon icon={faGlobeAmericas} className={styles.globeIcon} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.languageSelect}
          >
            <option className={styles.languageSelectOption} value="en">EN</option>
            <option className={styles.languageSelectOption} value="ja">JA</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;