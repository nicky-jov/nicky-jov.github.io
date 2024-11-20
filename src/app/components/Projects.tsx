"use client"

import Image from 'next/image';
import { useTranslation } from '../contexts/LanguageContext';
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Projects.module.css';
import ScrollArrow from './ScrollArrow';

const Projects = () => {
    const { t } = useTranslation();
    
    return (
        <section id="projects" className={styles.projectsSection}>
            <div className={styles.content}>
                <h2 className={homeStyles.title}>{t('projects.title')}</h2>
                <div className={styles.projectsContainer}>
                    <a href={t('projects.project 1.link')} className={styles.projectCard} target="_blank" rel="noreferrer" data-aos="zoom-out-up">
                        <div className={styles.projectImageContainer}>
                            <Image
                                src="/assets/img/project-1.png"
                                alt="Hotel Reservation Website"
                                width={400}
                                height={300}
                                className={styles.projectImage}
                                priority
                            />
                        </div>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>{t('projects.project 1.title')}</h3>
                            <p className={styles.projectDescription}>
                                {t('projects.project 1.description')}
                                <br/><br/>
                                {t('projects.view')}
                            </p>
                        </div>
                    </a>
                    <a href={t('projects.project 2.link')} className={styles.projectCard} target="_blank" rel="noreferrer" data-aos="zoom-out-up">
                        <div className={styles.projectImageContainer}>
                            <Image
                                src="/assets/img/project-2.png"
                                alt="Project 2"
                                width={400}
                                height={300}
                                className={styles.projectImage}
                                priority
                            />
                        </div>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>{t('projects.project 2.title')}</h3>
                            <p className={styles.projectDescription}>
                                {t('projects.project 2.description')}
                                <br/><br/>
                                {t('projects.view')}
                            </p>
                        </div>
                    </a>
                    <a className={styles.projectCard} target="_blank" rel="noreferrer" data-aos="zoom-out-up">
                        <div className={styles.projectImageContainer}>
                            <Image
                                src="/assets/img/project-3.png"
                                alt="Project 3"
                                width={400}
                                height={300}
                                className={styles.projectImage}
                                priority
                            />
                        </div>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>{t('projects.project 3.title')}</h3>
                            <p className={styles.projectDescription}>
                                {t('projects.project 3.description')}
                            </p>
                        </div>
                    </a>
                </div>
                <ScrollArrow targetId="skills" />
            </div>
        </section>
    );
};

export default Projects