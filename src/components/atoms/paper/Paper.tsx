import * as React from "react";
import styles from "./Paper.module.scss";
import { PaperProps } from "./Paper.props";

const Paper = ({ children }: PaperProps): JSX.Element => {
  return <div className={styles.paper}>{children}</div>;
};

export default Paper;
