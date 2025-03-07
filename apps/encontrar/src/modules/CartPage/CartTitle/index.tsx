import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { useAuth } from 'hooks/useAuth';

export const CartTitle = ({ qtdItems = 0 }) => {
  const { t } = useTranslation('cart');
  const { isClient } = useAuth();

  // Só renderiza a parte dependente do cliente se for no lado do cliente
  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }

  return (
    <div className="container_top">
      <h2>
        <span>{t('cart.your_cart')}</span>
        <i>
          <img src={`/assets_ecommerce/svg/cart.png`} alt="cart" />
        </i>
      </h2>
      <span>
        {t('cart.total_items')} ({qtdItems})
      </span>
    </div>
  );
};
