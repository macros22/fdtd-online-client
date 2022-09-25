import * as React from "react";
import cn from "clsx";
import styles from "./Sidebar.module.scss";
import { ISidebarProps } from "./Sidebar.props";

export const Sidebar = ({ children, className, ...props }: ISidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      {children}
    </div>
  );
};

