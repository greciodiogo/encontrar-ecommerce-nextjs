/* eslint-disable no-array-reduce/no-reduce */
import moment from 'moment';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useAppSelector } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { FnService } from 'shared/utils/FnService';
import { RootState } from 'types/product';

export const ReviewStep = ({ handleNextStep }: { handleNextStep: () => void }) => {
  const fnService = new FnService();
  const { t } = useTranslation('checkout');
  const [subtotal, setSubtotal] = useState(0);
  const [atotal, setATotal] = useState(0);
  const repo = useAppSelector((state: RootState) => state.products);
  const cartItems = useAppSelector((state: RootState) => state.products.cart);

  const router = useRouter();
  const { selectedPrice } = useAuth();

  const transactionDate = repo.order?.created_at;
  const paymentMethod = selectedPrice;
  const shippingMethod = 'Transporte - Motociclo';
  const discount = 0;
  const shippingCost = 2000;
  const serviceCost = 150;

  const onCancel = () => {
    void router.push('/');
  };

  useEffect(() => {
    const total_ = cartItems.reduce((acc, item) => {
      // Verifica se o produto está em promoção e tem um preço promocional válido
      const validatePromotion = item.is_promotion && item.promotional_price !== undefined && item.promotional_price > 0;
      const activePrice = validatePromotion ? item.promotional_price : item.price;

      return acc + (activePrice ?? 0) * (item.qty ?? 0);
    }, 0);

    setSubtotal(total_);
    setATotal(total_ + serviceCost + discount + shippingCost);
  }, [cartItems, serviceCost, discount, shippingCost]); // Inclui dependências corretamente

  const onFinish = () => {
    handleNextStep();
  };

  return (
    <div className="order-review">
      <div className="details">
        <div className="row">
          <span className="label">{t('review.transaction_date')}</span>
          <span className="value">{moment(transactionDate).format('YYYY-MM-DD')}</span>
        </div>
        <div className="row">
          <span className="label">{t('review.payment_method')}</span>
          <span className="value">{paymentMethod}</span>
        </div>
        <div className="row">
          <span className="track-order">{t('review.order_history')}</span>
        </div>
        <div className="row">
          <span className="label">{t('review.shipping_method')}</span>
          <span className="value">{shippingMethod}</span>
        </div>
      </div>

      <div className="pricing">
        <div className="row">
          <span>{t('review.subtotal')}</span>
          <span>{fnService.numberFormat(subtotal)} Kz</span>
        </div>
        <div className="row">
          <span>{t('review.service_fee')}</span>
          <span>{fnService.numberFormat(serviceCost)} Kz</span>
        </div>
        <div className="row">
          <span>{t('review.discount')}</span>
          <span>{fnService.numberFormat(discount)} Kz</span>
        </div>
        <div className="row">
          <span>{t('review.shipping_cost')}</span>
          <span>{fnService.numberFormat(shippingCost)} Kz</span>
        </div>
      </div>

      <div className="total">
        <span>{t('review.total')}</span>
        <span>{fnService.numberFormat(atotal)} Kz</span>
      </div>

      <div className="buttons">
        <button onClick={onCancel} className="cancel-btn">
          {t('review.cancel')}
        </button>
        <button onClick={onFinish} className="finish-btn">
          {t('review.complete_purchase')} <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
