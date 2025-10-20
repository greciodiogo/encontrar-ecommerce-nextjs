import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const CheckoutInfo = () => {
  const { t } = useTranslation('common');

  return (
    <div className="info">
      <h2>{t('checkoutGuarantee')}</h2>
      <div className="payment_methods">
        {/* <i className="fasmapay">
          <img src="/assets_ecommerce/payments_methods/fasmapay.png" alt="Fasmapay" />
        </i> */}
        <i className="express">
          <img src="/assets_ecommerce/payments_methods/multicaixa.png" alt="Multicaixa" />
        </i>
        <i className="cash">
          <img src="/assets_ecommerce/payments_methods/CASH.png" alt="Cash Payment" />
        </i>
      </div>
    </div>
  );
};
