import React from 'react';
import styles from '../styles/Skills.module.css';
import homeStyles from '../styles/Home.module.css';
import ScrollArrow from './ScrollArrow';
import { useTranslation } from '../contexts/LanguageContext';

const Skills: React.FC = () => {
  const { t } = useTranslation();

  const skills = [
    { name: 'Unreal', logo: '/assets/logo/unreal.png' },
    { name: 'Unity', logo: '/assets/logo/unity.png' },
    { name: 'C++', logo: '/assets/logo/cpp.png' },
    { name: 'C#', logo: '/assets/logo/csharp.png' },
    { name: 'Vue.js', logo: '/assets/logo/vuejs.png' },
    { name: 'Next.js', logo: '/assets/logo/nextjs.png' },
    { name: 'Laravel', logo: '/assets/logo/laravel.png' },
    { name: 'Kotlin', logo: '/assets/logo/kotlin.png' },
  ];

  return (
    <>
    <section id="skills" className={`${homeStyles.section} ${styles.skillsSection}`}>
      <div className={styles.skillsContainer}>
        <h2 className={homeStyles.title}>{t('skills.title')}</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill.name} className={styles.skillCard} data-aos="zoom-in" data-aos-duration="200">
              <img src={skill.logo} alt={`${skill.name} logo`} className={styles.skillLogo} />
              <p className={styles.skillName}>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
      <ScrollArrow targetId="contacts" />
    </section>
    </>
  );
};

export default Skills;