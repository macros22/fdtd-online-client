import React from "react";
import cn from "clsx";
import styles from "./WithLabel.module.scss";
import { IWithLabelProps } from "./WithLabel.props";

export const WithLabel = ({
  children,
  className,
  labelText,
  ...props
}: IWithLabelProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <label className={styles.label}>{labelText}</label>
      {children}
    </div>
  );
};
