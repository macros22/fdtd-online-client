import * as React from "react";
import styles from "./Paper.module.scss";
import { IPaperProps } from "./Paper.props";

export const Paper = ({ children, ...props }: IPaperProps): JSX.Element => {
  return (
    <div className={styles.paper} {...props}>
      {children}
    </div>
  );
};
