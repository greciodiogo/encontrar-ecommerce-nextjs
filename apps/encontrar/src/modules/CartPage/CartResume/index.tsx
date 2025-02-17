// import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from 'hooks/useAuth';
import { SubmitButton } from 'shared/components/SubmitButton';
export const CartResume = ({
  total = 0,
  subtotal = 0,
  totalProduct = 0,
  selectedPrice,
  handleGoToCheckout,
}: {
  total: number;
  subtotal: number;
  totalProduct: number;
  selectedPrice: string;
  handleGoToCheckout?: () => void;
}) => {
  const DELIVERY_COST = 2000;
  const { isClient } = useAuth();

  if (!isClient) {
    return null; // Ou retornar algo simples para renderizar enquanto o componente carrega
  }

  return (
    <div className="box">
      <div className="price">
        <ul>
          <li>Subtotal</li>
          <li>{subtotal}kz</li>
        </ul>
        <ul>
          <li>Entrega:</li>
          <li>{DELIVERY_COST}kz</li>
        </ul>
      </div>
      <div className="price">
        <ul>
          <li>Total ({totalProduct} items)</li>
          <li>{total + DELIVERY_COST}kz</li>
        </ul>
      </div>
      <div className="price">
        <div className="cartButtons">
          <SubmitButton title={`PAGAR COM ${selectedPrice}`} onClick={handleGoToCheckout} />
        </div>
      </div>
    </div>
  );
};
