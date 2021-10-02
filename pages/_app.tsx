import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React from 'react';
// import MainLayout from "../layout/MainLayout";

// configuration of custom bootstrap on next.js
// https://www.mikealche.com/software-development/setting-up-bootstrap-sass-on-next-js
// https://www.ravsam.in/blog/setup-and-customize-bootstrap-in-nextjs/

// import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import '../styles/custom.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  // Place this in the pages/_app.js file
  React.useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <>
    <Head>
      <title>Eng</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    {/*<MainLayout title={'Wave optics'}>*/}
      <Component {...pageProps} />
    {/*</MainLayout>*/}
  </>;
}

export default MyApp;

// export default MyApp;
// // export default wrapper.withRedux(MyApp);
