"use client"

import Image from 'next/image';
import { useTranslation } from '../contexts/LanguageContext';
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Projects.module.css';
import ScrollArrow from './ScrollArrow';
import config from '../../../next.config';

const Projects = () => {
    const { t } = useTranslation();

    const projects = [
        {
            link: t('projects.project 1.link'),
            imgSrc: `${config.basePath}/assets/img/project-1.webp`,
            imgAlt: "Hotel Reservation Website",
            title: t('projects.project 1.title'),
            description: t('projects.project 1.description'),
            view: t('projects.view')
        },
        {
            link: t('projects.project 2.link'),
            imgSrc: `${config.basePath}/assets/img/project-2.webp`,
            imgAlt: "Project 2",
            title: t('projects.project 2.title'),
            description: t('projects.project 2.description'),
            view: t('projects.view')
        },
        {
            imgSrc: `${config.basePath}/assets/img/project-3.webp`,
            imgAlt: "Project 3",
            title: t('projects.project 3.title'),
            description: t('projects.project 3.description')
        },
        {
            link: t('projects.project 4.link'),
            imgSrc: `${config.basePath}/assets/img/project-4.webp`,
            imgAlt: "Project 4",
            title: t('projects.project 4.title'),
            description: t('projects.project 4.description'),
            view: t('projects.view')
        }
    ];

    return (
        <section id="projects" className={styles.projectsSection}>
            <div className={styles.content}>
                <h2 className={homeStyles.title}>{t('projects.title')}</h2>
                <div className={styles.projectsContainer}>
                    {projects.map((project, index) => (
                        <a 
                            key={index}
                            className={styles.projectCard} 
                            target={project.link ? "_blank" : undefined} 
                            rel={project.link ? "noreferrer" : undefined} 
                            data-aos="zoom-out-up"
                            {...(project.link ? { href: project.link } : {})}
                        >
                            <div className={styles.projectImageContainer}>
                                <Image
                                    src={project.imgSrc}
                                    alt={project.imgAlt}
                                    width={400}
                                    height={300}
                                    className={styles.projectImage}
                                    priority
                                />
                            </div>
                            <div className={styles.projectContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDescription}>
                                    {project.description}
                                    {project.view && <><br/><br/>{project.view}</>}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
                <ScrollArrow targetId="skills" />
            </div>
        </section>
    );
};

export default Projects