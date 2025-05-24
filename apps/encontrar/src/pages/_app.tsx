import { CacheProvider } from '@emotion/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createEmotionCache } from 'utils-mui';

import 'react-toastify/dist/ReactToastify.css';

import './../styles/styles.css';
import './../styles/reviewForm.css';
import './../styles/dropdown.css';
import './../styles/home/swiper.css';
import './../styles/CookieBanner.css';
import './../styles/menu-categories.css';
import './../styles/product-detail/slide.css';
import './../styles/faq.css';

import { Banner, Footer, Header } from 'components';
import { ProductProvider } from 'contexts/ProductContext';
import { store } from 'slices/store';
import { AuthProvider } from '../contexts/AuthContext';
import ChatBot from 'components/Whatsapp';
import { Loading } from 'components/Loading';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isCheckoutRoute = router.pathname.startsWith('/checkout');
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('A variável de ambiente NEXT_PUBLIC_GOOGLE_CLIENT_ID não está definida.');
  }

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <AuthProvider>
        <Provider store={store}>
          <ProductProvider>
            <GoogleOAuthProvider clientId={clientId}>
              <CacheProvider value={clientSideEmotionCache}>
                {!isCheckoutRoute && <Banner />}
                <Header hideItemsHeader={isCheckoutRoute} />
                <ChatBot />

                {loading && <Loading />}

                {page}
                <Footer />
              </CacheProvider>
            </GoogleOAuthProvider>
          </ProductProvider>
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
