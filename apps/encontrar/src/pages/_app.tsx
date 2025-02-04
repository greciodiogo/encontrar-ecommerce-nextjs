import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { createEmotionCache } from 'utils-mui';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './../styles/styles.css';
import { Footer, Header } from 'components';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <CacheProvider value={clientSideEmotionCache}>
          <Header />
          {page}
          <Footer />
        </CacheProvider>
      </>
    ));

  return (
    <>
      <Head>
        <title>Encontrar - 2025</title>
        <meta name="description" content="Monorepo Encontrar - 2025" />
        <meta name="version" content="2.11.4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {getLayout(
        <>
          {/* <Header /> */}
          <Component {...pageProps} />
          {/* <Footer /> */}
        </>,
      )}
    </>
  );
};

export default App;
