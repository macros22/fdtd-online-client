import type { AppProps } from "next/app";

import Head from "next/head";
import React from "react";
import NextNProgress from "nextjs-progressbar";

// configuration of custom bootstrap on next.js
// https://www.mikealche.com/software-development/setting-up-bootstrap-sass-on-next-js
// https://www.ravsam.in/blog/setup-and-customize-bootstrap-in-nextjs/

// import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import "styles/global.scss";
// import '../styles/github-markdown.css';

import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Place this in the pages/_app.js file
  // React.useEffect(() => {
  //   //@ts-ignore
  //   import('bootstrap/dist/js/bootstrap');
  // }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <title>Eng</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />

            {/* //there's no way to disable mixed content using javascript but you can add this tag */}
            <meta
              httpEquiv="Content-Security-Policy"
              content="upgrade-insecure-requests"
            />
            {/* //to your HTML to allow mixed content */}

            <link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
              integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
              crossOrigin="anonymous"
            />
          </Head>
          <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
