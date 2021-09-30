import React from 'react';

import { Categories } from 'components';
const WAVE_OPTICS_NAME = 'ФИЗИКА | ВОЛНОВАЯ ОПТИКА';

export default function Navbar() {

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
