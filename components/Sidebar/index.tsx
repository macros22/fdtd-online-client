import * as React from 'react';
import classes from './sidebar.module.scss';

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className={classes.sidebar + " p-2 bd-highlight"} style={{backgroundColor: "#eee"}}>

      {children}
    </div>
    // <div className="d-flex bg-light align-items-stretch h-100">
    //   <div className={classes.sidebar + " p-2 bd-highlight"} style={{backgroundColor: "#eee"}}>Flex item</div>
    //   <div className="p-2 bd-highlight">Flex item</div>
    //   <div className="p-2 bd-highlight">Third flex item</div>
    // </div>
  );
}

export default Sidebar;
