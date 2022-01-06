import * as React from 'react';
import Head from 'next/head';

import { Navbar } from 'components';

// import './style.scss';

import classes from './style.module.scss';

interface MainLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>{title || 'Wave optics'}</title>
        <meta name="description" content={`Wave optics.` + description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || 'physics, wave, optics'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <Navbar /> */}

      {/* <div className={classes.container}>
        <Navbar />
        <aside className={classes.aside}>MENU</aside>
        <main className={classes.main}>CONTENT</main>
        <aside className={classes.aside}>MENU</aside>
        <footer className={classes.footer}>FOOTER</footer>
      </div> */}
<main>{children}</main>
      {/* 
      <footer style={{ zIndex: 2000 }}>footer</footer> */}
    </>
  );
};

export default MainLayout;
