import * as React from 'react';
import styles from './paper.module.scss';

interface PaperProps {
  children?: React.ReactNode;
}

const Paper: React.FC<PaperProps> = ({ children }) => {
  return <div className={styles.paper}>{children}</div>;
};

export default Paper;
