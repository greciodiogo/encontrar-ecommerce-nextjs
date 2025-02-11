import React from 'react';

export const CheckoutInfo = () => {
  return (
    <div className="info">
      <h2>100% Guarantee Safe Checkout</h2>
      <div className="payment_methods">
        <i className="fasmapay">
          <img src="/assets_ecommerce/payments_methods/fasmapay.png" alt="" />
        </i>
        <i className="express">
          <img src="/assets_ecommerce/payments_methods/multicaixa.png" alt="" />
        </i>
        <i className="cash">
          <img src="/assets_ecommerce/payments_methods/CASH.png" alt="" />
        </i>
      </div>
    </div>
  );
};
