// import * as React from 'react';
 import classes from './sidebar.module.scss';
//
// interface MainLayoutProps {
//   children?: React.ReactNode;
// }
//
// const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
//   return (
//     <div className={classes.sidebar}>
//       {children}
//     </div>
//   );
// };
//
// export default MainLayout;


import * as React from 'react';
import TextInput from "../TextInput";


interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className={classes.sidebar + " p-2 bd-highlight"} style={{backgroundColor: "#eee"}}>
      <TextInput/>
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
