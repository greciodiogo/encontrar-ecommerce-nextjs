import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { useAuth } from 'hooks/useAuth';
import { SubmitButton } from 'shared/components/SubmitButton';
import { FnService } from 'shared/utils/FnService';
import { useAppSelector } from 'hooks';
import { RootState } from 'types/product';

export const CartResume = ({
  total = 0,
  totalProduct = 0,
  handleGoToCheckout,
}: {
  total: number;
  subtotal: number;
  totalProduct: number;
  handleGoToCheckout?: () => void;
}) => {
  const { t } = useTranslation('cart');
  const productCart = useAppSelector((state: RootState) => state.products.cart);

  const fnService = new FnService();
  const DELIVERY_COST = 2000;
  const { isClient, selectedPrice } = useAuth();

  if (!isClient) {
    return null;
  }

  const payButtonText =
    selectedPrice?.name === 'CASH'
      ? t('cart_resume.pay_button_cash')
      : t('cart_resume.pay_button_other', { method: selectedPrice?.name });

  return (
    <div className="box">
      <div className="price">
        <ul>
          <li className="priceTitle">{t('cart_resume.subtotal')}</li>
          <li>{fnService.numberFormat(total)}kz</li>
        </ul>
        <ul>
          <li className="priceTitle">{t('cart_resume.serviceFee')}</li>
          {/* <li>{fnService.numberFormat(service_fee )}kz</li> */}
        </ul>
        <ul>
          <li className="priceTitle">{t('cart_resume.delivery')}</li>
          <li>{fnService.numberFormat(DELIVERY_COST)}kz</li>
        </ul>
      </div>
      <div className="price">
        <ul>
          <li>{t('cart_resume.total_items', { count: totalProduct })}</li>
          <li>{fnService.numberFormat(total + DELIVERY_COST)}kz</li>
        </ul>
      </div>
      <div className="price">
        <ul>
          <li>{t('cart_resume.total_items', { count: totalProduct })}</li>
          <li>{fnService.numberFormat(total + DELIVERY_COST)}kz</li>
        </ul>
      </div>
      <div className="price">
        <div className="cartButtons">
          <SubmitButton title={payButtonText} onClick={handleGoToCheckout} />
        </div>
      </div>
    </div>
  );
};
