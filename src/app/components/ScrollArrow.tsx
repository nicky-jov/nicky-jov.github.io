import React from 'react';
import styles from '../styles/ScrollArrow.module.css';

interface ScrollArrowProps {
  targetId: string;
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ targetId }) => {
  const scrollToElement = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.arrowContainer} onClick={scrollToElement}>
      <svg className={`${styles.arrow} ${styles.arrow1}`} viewBox="0 0 24 24" width="24" height="24">
        <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <svg className={`${styles.arrow} ${styles.arrow2}`} viewBox="0 0 24 24" width="24" height="24">
        <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <svg className={`${styles.arrow} ${styles.arrow3}`} viewBox="0 0 24 24" width="24" height="24">
        <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default ScrollArrow;