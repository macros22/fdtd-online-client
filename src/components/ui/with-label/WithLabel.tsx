import styles from "./WithLabel.module.scss";
import { WithLabelProps } from "./WithLabel.props";
import React from "react";
import cn from "clsx";

const WithLabel = ({
  children,
  className,
  labelText,
  ...props
}: WithLabelProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <label className={styles.label}>{labelText}</label>
      {children}
    </div>
  );
};

export default WithLabel;
