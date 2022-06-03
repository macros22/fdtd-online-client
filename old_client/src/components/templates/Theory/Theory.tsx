import React from 'react';
import styles from './Theory.module.scss';

const Theory: React.FC = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>;
    </div>
  );
};

export default Theory;
