import React from 'react';

import { Categories } from 'components';
import Link from "next/link";

const WAVE_OPTICS_NAME = 'ФИЗИКА | ВОЛНОВАЯ ОПТИКА';

export default function Navbar() {
  // const classes = useStyles();
  // return (
    // <>
    //   <AppBar className={classes.navbar} position="static" elevation={2}>
    //     <Toolbar variant="dense">
    //       <IconButton
    //         edge="start"
    //         className={classes.menuButton}
    //         color="inherit"
    //         aria-label="open drawer"
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Link href='/'>
    //         <Typography className={classes.title} variant="h5" noWrap>
    //           {WAVE_OPTICS_NAME}
    //         </Typography>
    //       </Link>
    //     </Toolbar>
    //   </AppBar>
    //
    // </>
    return(
      <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">{WAVE_OPTICS_NAME}</a>
          {/*<form className="d-flex">*/}
          {/*  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
          {/*    <button className="btn btn-outline-success" type="submit">Search</button>*/}
          {/*</form>*/}
        </div>
      </nav>
        <Categories />
        </>
    );

}
