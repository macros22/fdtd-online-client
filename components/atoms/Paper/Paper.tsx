import * as React from 'react';
import styles from './Paper.module.scss';

const Paper: React.FC = ({ children }) => {
  return <div className={styles.paper}>{children}</div>;
};

export default Paper;
