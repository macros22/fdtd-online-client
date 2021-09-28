import * as React from 'react';

import MainLayout from 'layout/MainLayout';
import {Sidebar} from "../components";

export default function Index() {
   return <MainLayout title={'Wave optics'}>

      {/*<div className="container">*/}
      {/*   <div className="row py-3">*/}
      {/*      <div className="col-2 bg-secondary mh-100 order-1" id="sticky-sidebar">*/}
      {/*         <div className="sticky-top">*/}
      {/*            <h1>asdasdasdasdasda</h1>*/}
      {/*            <h1>asdasdasdasdasda</h1>*/}
      {/*            <h1>asdasdasdasdasda</h1>*/}
      {/*            <h1>asdasdasdasdasda</h1>*/}
      {/*         </div>*/}
      {/*      </div>*/}
      {/*      <div className="col bg-dark" id="main">*/}
      {/*         <h1>Main Area</h1>*/}
      {/*         <p>asddddddddddddas*/}
      {/*         dasdasdasdasdasd*/}
      {/*         asdasdasdasdasdas*/}
      {/*         da*/}
      {/*         sda*/}
      {/*         sdasdasd*/}
      {/*         asd*/}
      {/*         asdas</p>*/}
      {/*      </div>*/}
      {/*   </div>*/}
      {/*</div>*/}


      <div className="container">
         <div className="row">
            <div className="col-xs-4">
               <div className="col-xs-12" style={{position:"fixed",maxWidth: "20%"}} id="sticky-sidebar">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               </div>
            </div>
            <div className="col-xs-8" id="main">
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
         </div>
      </div>


   </MainLayout>;
  // return <Sidebar/>
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
