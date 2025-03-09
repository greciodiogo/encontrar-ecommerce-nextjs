import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useProductContext } from 'hooks/useProductContext';

export const EmptyCart = () => {
  const router = useRouter();
  const { t } = useTranslation('cart');

  const { setSelectedCategories } = useProductContext();

  const handleStartBuying = () => {
    setSelectedCategories([]);

    void router.push('/products');
  };

  // if (!isClient) {
  //   return null;
  // }

  return (
    <div className="emptyCart">
      <div className="emptyCart__container">
        <div className="content">
          <h2>
            <span>{t('empty_cart.title')}</span>
            <i>
              <img src={`/assets_ecommerce/svg/cart.png`} alt="cart" />
            </i>
          </h2>
          <span>{t('empty_cart.subtitle')}</span>
          <button onClick={handleStartBuying}>
            {t('empty_cart.button')}
            <i>
              <FaArrowRight size={12} fill="white" />
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};
