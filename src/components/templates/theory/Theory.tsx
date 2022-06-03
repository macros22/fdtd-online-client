import React from "react";
import styles from "./Theory.module.scss";
import { TheoryProps } from "./Theory.props";

const Theory: React.FC<TheoryProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>;
    </div>
  );
};

export default Theory;
