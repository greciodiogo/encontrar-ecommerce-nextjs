import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createEmotionCache } from 'utils-mui';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './../styles/styles.css';
import { Banner, Footer, Header } from 'components';
import { store } from 'slices/store';

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
      <Provider store={store}>
        <CacheProvider value={clientSideEmotionCache}>
          <Banner />
          <Header />
          {page}
          <Footer />
        </CacheProvider>
      </Provider>
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
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>,
      )}
    </>
  );
};

export default App;
