import * as React from "react";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "./Sidebar.props";
import cn from "clsx";

const Sidebar: React.FC<SidebarProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      {children}
    </div>
  );
};

export default Sidebar;
