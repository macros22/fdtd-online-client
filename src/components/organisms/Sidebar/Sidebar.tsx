import * as React from 'react';
// import classes from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.props';

const Sidebar: React.FC<SidebarProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={
        className + ' ' + ''
        // classes.sidebar +
        // ' .bg-white p-3 bd-highlight mh-100 shadow-sm'
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default Sidebar;
