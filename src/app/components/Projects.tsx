"use client"

import Image from 'next/image';
import styles from '../styles/Projects.module.css';

const Projects = () => {
    return (
        <section id="projects" className={styles.projectsSection}>
            <div style={{ height: '2rem' }} />
            <div className={styles.content}>
                <h2 className={styles.title}>Projects</h2>
                <div className={styles.projectsContainer}>
                    <div className={styles.projectCard}>
                        <div className={styles.projectImageContainer}>
                            <Image
                                src="/assets/img/project-1.jpg"
                                alt="Project 1"
                                width={400}
                                height={300}
                                className={styles.projectImage}
                                priority
                            />
                        </div>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>Project 1</h3>
                            <p className={styles.projectDescription}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel libero ferment
                            </p>
                        </div>
                    </div>
                    <div className={styles.projectCard}>
                        <div className={styles.projectImageContainer}>
                            <Image
                                src="/assets/img/project-2.jpg"
                                alt="Project 2"
                                width={400}
                                height={300}
                                className={styles.projectImage}
                                priority
                            />
                        </div>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>Project 2</h3>
                            <p className={styles.projectDescription}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel libero ferment
                            </p>
                        </div>
                    </div>
                    <div className={styles.projectCard}>
                        <div className={styles.projectImageContainer}>
                            <Image
                                src="/assets/img/project-3.jpg"
                                alt="Project 3"
                                width={400}
                                height={300}
                                className={styles.projectImage}
                                priority
                            />
                        </div>
                        <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>Project 3</h3>
                            <p className={styles.projectDescription}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel libero ferment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects