import * as React from "react";
import styles from "./Paper.module.scss";
import { PaperProps } from "./Paper.props";

const Paper: React.FC<PaperProps> = ({ children }) => {
  return <div className={styles.paper}>{children}</div>;
};

export default Paper;
