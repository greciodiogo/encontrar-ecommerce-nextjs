import React from 'react';

import { SubmitButton } from 'shared/components/SubmitButton';

export const CartResume = () => {
  return (
    <div className="box">
      <div className="price">
        <ul>
          <li>Subtotal</li>
          <li>2999Kz</li>
        </ul>
        <ul>
          <li>Entrega:</li>
          <li>2999Kz</li>
        </ul>
      </div>
      <div className="price">
        <ul>
          <li>Total (2 items)</li>
          <li>2999Kz</li>
        </ul>
      </div>
      <div className="price">
        <div className="cartButtons">
          <SubmitButton title="PAGAR EM CASH" />
        </div>
      </div>
    </div>
  );
};
