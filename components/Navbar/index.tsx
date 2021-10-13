import React from 'react';

import { Categories } from 'components';
const WAVE_OPTICS_NAME = 'ВОЛНОВАЯ ОПТИКА';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light  p-2">
        <div className="container-fluid">
          <a className="navbar-brand text-light bg-dark rounded-3 fs-5 text-uppercase p-2">
            {WAVE_OPTICS_NAME}
          </a>
        </div>
      </nav>
      <Categories />
    </>
  );
}
