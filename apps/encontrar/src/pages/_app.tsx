import { CacheProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Version } from 'ui-mui';
import { createEmotionCache } from 'utils-mui';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './../styles/styles.css';

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
        <div className="wrapper">
          <CacheProvider value={clientSideEmotionCache}>
            <Version version="2.11.4" />
            <div className="content-wrapper">
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      {page}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </CacheProvider>
        </div>
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
          <Component {...pageProps} />
      )}
    </>
  );
};

export default App;
