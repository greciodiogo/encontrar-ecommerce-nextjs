import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { Auth } from 'components/Auth/SignIn';
import { Container } from 'components/Container';
import { useAuth } from 'hooks/useAuth';
import { PaymentStep } from 'modules/CheckoutPage/PaymentStep';
import { RootState } from 'types/product';

import { useAppSelector } from '../../hooks';

import { CartItem } from './CartItem';
import { CartResume } from './CartResume';
import { CartTitle } from './CartTitle';
import { EmptyCart } from './EmptyCart';

export const CartPage = () => {
  const productCart = useAppSelector((state: RootState) => state.products.cart);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const { isAuthenticated, isClient } = useAuth();
  const { t } = useTranslation('cart');

  const router = useRouter();

  const [showAuth, setShowAuth] = useState(false);

  const onCloseSignInForm = () => {
    setShowAuth(false);
  };

  const handleGoToCheckout = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
    } else {
      void router.push('/checkout');
    }
  };
  const TOTAL_ITEMS_CART: number = productCart.length;
  if (!TOTAL_ITEMS_CART)
    return (
      <>
        <EmptyCart />
        {/* <BestSelledProducts bannerText="Quer sugestões para o seu carrinho ? Escolha abaixo" /> */}
      </>
    );

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }

  return (
    <Container useStyle={false}>
      <div className="cart">
        <div className="cart_container">
          <CartTitle qtdItems={TOTAL_ITEMS_CART} />
          <div className="row">
            <div className="wrapper">
              {productCart.map((cartItem, index: number) => (
                <CartItem cart={cartItem} key={index} setTotal={setTotal} setSubtotal={setSubtotal} />
              ))}
            </div>
            <div>
              <h3 style={{ fontWeight: 500, color: '#191C1F', fontSize: '20px' }}>{t('cart.payment_method')}</h3>
              <PaymentStep />
              <CartResume
                totalProduct={TOTAL_ITEMS_CART}
                total={total}
                subtotal={subtotal}
                handleGoToCheckout={handleGoToCheckout}
              />
            </div>
          </div>
        </div>
      </div>
      <Auth showAuthPainel={showAuth} closeAuth={onCloseSignInForm} />
      {/* <CheapestProducts /> */}
    </Container>
  );
};
