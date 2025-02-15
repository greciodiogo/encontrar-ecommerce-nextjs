import React from 'react';

import { SubmitButton } from 'shared/components/SubmitButton';

export const CartResume = ({
  total = 0,
  subtotal = 0,
  totalProduct = 0,
  selectedPrice,
}: {
  total: number;
  subtotal: number;
  totalProduct: number;
  selectedPrice: string;
}) => {
  const DELIVERY_COST = 2000;
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
          <SubmitButton title={`PAGAR COM ${selectedPrice}`} />
        </div>
      </div>
    </div>
  );
};
