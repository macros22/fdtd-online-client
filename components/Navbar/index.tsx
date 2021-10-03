import React from 'react';

import { Categories } from 'components';
const WAVE_OPTICS_NAME = 'ВОЛНОВАЯ ОПТИКА';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-primary p-1">
        <div className="container-fluid">
          <a className="navbar-brand text-light fs-5 text-uppercase">{WAVE_OPTICS_NAME}</a>
        </div>
      </nav>
      <Categories />
    </>
  );
}
