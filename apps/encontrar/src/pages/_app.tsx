import { CacheProvider } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createEmotionCache } from 'utils-mui';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './../styles/styles.css';
import './../styles/menu-categories.css';
import './../styles/product-detail/slide.css';
// import './../styles/review.module.css';
import { Banner, Footer, Header } from 'components';
import { store } from 'slices/store';

import { AuthProvider } from '../contexts/AuthContext';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  // Verifica se a rota atual começa com "control-panel/"
  const isCheckoutRoute = router.pathname.startsWith('/checkout');
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('A variável de ambiente NEXT_PUBLIC_GOOGLE_CLIENT_ID não está definida.');
  }
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <AuthProvider>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={clientId}>
            <CacheProvider value={clientSideEmotionCache}>
              {!isCheckoutRoute && <Banner />}
              <Header hideItemsHeader={isCheckoutRoute} />
              {page}
              <Footer />
            </CacheProvider>
          </GoogleOAuthProvider>
        </Provider>
      </AuthProvider>
    ));

  return (
    <>
      {getLayout(
        <Provider store={store}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Provider>,
      )}
    </>
  );
};

export default App;
