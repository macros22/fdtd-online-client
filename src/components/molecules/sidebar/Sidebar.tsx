import * as React from "react";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "./Sidebar.props";

const Sidebar: React.FC<SidebarProps> = ({ children, className, ...props }) => {
  return (
    <div className={className + " " + styles.sidebar} {...props}>
      {children}
    </div>
  );
};

export default Sidebar;
