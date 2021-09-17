import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { EmotionCache } from '@emotion/react';
import theme from 'src/theme';
// import createEmotionCache from 'src/createEmotionCache';
// import { wrapper } from 'store';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  //emotionCache = clientSideEmotionCache,
  const { Component, pageProps } = props;
  return (
    <>
      {/*<CacheProvider value={emotionCache}>*/}
      <Head>
        <title>Eng</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      {/*</CacheProvider>*/}
    </>
  );
}

export default MyApp;
// export default wrapper.withRedux(MyApp);
