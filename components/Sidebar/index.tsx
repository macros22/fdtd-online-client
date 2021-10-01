import * as React from 'react';
import classes from './sidebar.module.scss';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className={classes.sidebar + " .bg-white p-3 bd-highlight mh-100 shadow-sm"} >
      {children}
    </div>
  );
}

export default Sidebar;
