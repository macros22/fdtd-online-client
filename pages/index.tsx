import * as React from 'react';

import MainLayout from 'layout/MainLayout';
import WebSocket from 'pages/lab3/temp';

export default function Index() {
  return (
    <MainLayout title={'Wave optics'}>
      {/*<Sidebar />*/}
      <WebSocket />
    </MainLayout>
  );
  // return (
  //   <div className="container p-3">
  //     <button className="btn btn-primary m-3">KindaCode.com</button>
  //     <button className="btn btn-warning m-3">Hello</button>
  //
  //     <div className="dropdown m-3">
  //       <button
  //         className="btn btn-secondary dropdown-toggle"
  //         type="button"
  //         data-bs-toggle="dropdown"
  //         id="dropdownMenuButton1"
  //         aria-expanded="false"
  //       >
  //         Dropdown button
  //       </button>
  //       <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  //         <li>
  //           <a className="dropdown-item" href="#">
  //             Option 1
  //           </a>
  //         </li>
  //         <li>
  //           <a className="dropdown-item" href="#">
  //             Option 2
  //           </a>
  //         </li>
  //         <li>
  //           <a className="dropdown-item" href="#">
  //             Option 3
  //           </a>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // );
}

//    "@emotion/cache": "latest",
//    "@emotion/react": "^11.1.4",
//    "@emotion/server": "latest",
//    "@emotion/styled": "^11.0.0",
//    "@material-ui/core": "^4.12.1",
//    "@material-ui/icons": "^4.11.2",
