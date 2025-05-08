import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Container } from 'components/Container';

export const SuccessfulOrder = () => {
  const router = useRouter();
  const { t } = useTranslation('checkout');

  const handleStartBuying = () => {
    void router.push('/');
  };

  const handleSeeOrder = () => {
    void router.push('/control-panel/order-history');
  };

  return (
    <Container useStyle={false}>
      <div className="successfulOrder">
        <div className="successfulOrder__container">
          <div className="content">
            <div className="picture">
              <i>
                <img src={`/assets_ecommerce/svg/CheckCircle.png`} alt="cart" />
              </i>
            </div>
            <h2>
              <span>{t('success.title')}</span>
            </h2>
            <span>{t('success.description')}</span>
            <div className="btn__container">
              <button onClick={handleStartBuying}>{t('success.back_home')}</button>
              {/* <button className="outlined" onClick={handleSeeOrder}>
                {t('success.view_order')}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
