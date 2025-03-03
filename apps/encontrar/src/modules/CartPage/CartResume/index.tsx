// import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from 'hooks/useAuth';
import { SubmitButton } from 'shared/components/SubmitButton';
import { FnService } from 'shared/utils/FnService';
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
  const fnService = new FnService();
  const DELIVERY_COST = 2000;
  const { isClient, selectedPrice } = useAuth();

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }

  return (
    <div className="box">
      <div className="price">
        <ul>
          <li className="priceTitle">Subtotal</li>
          <li>{fnService.numberFormat(total)}kz</li>
        </ul>
        <ul>
          <li className="priceTitle">Entrega:</li>
          <li>{fnService.numberFormat(DELIVERY_COST)}kz</li>
        </ul>
      </div>
      <div className="price">
        <ul>
          <li>Total ({totalProduct} items)</li>
          <li>{fnService.numberFormat(total + DELIVERY_COST)}kz</li>
        </ul>
      </div>
      <div className="price">
        <div className="cartButtons">
          <SubmitButton
            title={`PAGAR ${selectedPrice === 'CASH' ? 'em' : 'com'} ${selectedPrice}`}
            onClick={handleGoToCheckout}
          />
        </div>
      </div>
    </div>
  );
};
