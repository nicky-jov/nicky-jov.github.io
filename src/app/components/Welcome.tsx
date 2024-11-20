"use client"

import { FC } from 'react';
import homeStyles from '../styles/Home.module.css';
import { useTranslation } from '../contexts/LanguageContext';
import ScrollArrow from './ScrollArrow';

interface WelcomeProps {
  mounted: boolean;
}

const Welcome: FC<WelcomeProps> = ({ mounted }) => {
  const { t } = useTranslation();

  return (
    <section className={homeStyles.section} id="welcome">
      <div className={homeStyles.welcomeContent}>
        <h1 className={homeStyles.title}>
          {t('welcome.greeting')} <span className={homeStyles.highlight}>{t('welcome.name')}</span>
          <br />
          {t('welcome.role')}
        </h1>
        <p className={homeStyles.subtitle}>
          {t('welcome.subtitle')} <span className={homeStyles.highlight}>{t('welcome.highlight')}</span> {t('welcome.cta')} 🚀
        </p>
        {mounted && <ScrollArrow targetId="about" />}
      </div>
    </section>
  );
};

export default Welcome;