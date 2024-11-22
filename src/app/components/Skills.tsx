import React from 'react';
import styles from '../styles/Skills.module.css';
import homeStyles from '../styles/Home.module.css';
import ScrollArrow from './ScrollArrow';
import Image from 'next/image';
import { useTranslation } from '../contexts/LanguageContext';
import config from '../../../next.config';

const Skills: React.FC = () => {
  const { t } = useTranslation();

  const skills = [
    { name: 'Unreal', logo: `${config.basePath}/assets/logo/unreal.png` },
    { name: 'Unity', logo: `${config.basePath}/assets/logo/unity.png` },
    { name: 'C++', logo: `${config.basePath}/assets/logo/cpp.png` },
    { name: 'C#', logo: `${config.basePath}/assets/logo/csharp.png` },
    { name: 'Vue.js', logo: `${config.basePath}/assets/logo/vuejs.png` },
    { name: 'Next.js', logo: `${config.basePath}/assets/logo/nextjs.png` },
    { name: 'Laravel', logo: `${config.basePath}/assets/logo/laravel.png` },
    { name: 'Kotlin', logo: `${config.basePath}/assets/logo/kotlin.png` },
  ];

  return (
    <>
    <section id="skills" className={`${homeStyles.section} ${styles.skillsSection}`}>
      <div className={styles.skillsContainer}>
        <h2 className={homeStyles.title}>{t('skills.title')}</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill.name} className={styles.skillCard} data-aos="zoom-in" data-aos-duration="200">
              <Image src={skill.logo} alt={`${skill.name} logo`} className={styles.skillLogo} width={200} height={200} />
              <p className={styles.skillName}>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
      <ScrollArrow targetId="contact" />
    </section>
    </>
  );
};

export default Skills;