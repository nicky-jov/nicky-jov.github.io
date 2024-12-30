"use client"

import React from 'react';
import styles from '../styles/Contact.module.css';
import homeStyles from '../styles/Home.module.css';
import { useTranslation } from '../contexts/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const contacts = [
    {
      name: 'GitHub',
      icon: faGithub,
      link: 'https://github.com/nicky-jov'
    },
    {
      name: 'LinkedIn',
      icon: faLinkedin,
      link: 'https://linkedin.com/in/nicky-jovanus'
    },
    {
      name: 'Email',
      icon: faEnvelope,
      link: 'mailto:nickyjovanus@gmail.com'
    }
  ];

  return (
    <section id="contact" className={`${homeStyles.section} ${styles.contactSection}`}>
      <div className={styles.contactContainer}>
        <h2 className={homeStyles.title}>{t('contact.title')}</h2>
        <p className={styles.subtitle}>{t('contact.subtitle')}</p>
        <div className={styles.contactGrid}>
          {contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
              data-aos="zoom-in"
              data-aos-duration="200"
            >
              <FontAwesomeIcon icon={contact.icon as IconProp} className={styles.contactIcon} />
              <p className={styles.contactName}>{contact.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;