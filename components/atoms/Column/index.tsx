import React from 'react';

import styles from './column.module.scss';

interface CenteredProps {
  children?: React.ReactNode;
}

const Column: React.FC<CenteredProps> = ({ children }) => {
  // return <div className="d-flex flex-column justify-content-center ">{children}</div>;
  return <div className={styles.parent}>{children}</div>;
};

export default Column;
